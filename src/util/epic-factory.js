import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import defaultsDeep from "lodash/defaultsDeep";

export const DEFAULT_AJAX_CONFIG = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
  method: "GET",
};

/**
 * Creates a redux-observable epic, pairing a REDUX_ACTION to an API call, then
 * dispatching a _new_ REDUX_ACTION with the API's response.
 *
 * Huh?  In simpler words, enable the following workflow:
 * - Dispatch a REDUX_ACTION
 * - Let redux-observable launch the ajax call (side effect)
 * - map the XHR response to a FSA (Flux Standard Action), which will be dispatched. Woohoo!
 *
 * Does this deserve a dedeciated utility function? **Yes**, as this workflow is
 * very common.  It also keeps `dux` files concise.
 * @param {*} opts
 * @param {string} opts.onAction REDUX_ACTION to trigger the epic
 * @param {function} opts.actionCreator function to pipe the xhr response payload into
 * @param {object|function} [opts.ajax] object or function to define the xhr. if
 *  passed a function, receives the REDUX_ACTION. if nothing provided, `opts.url`
 *  is required, and method defaults to GET.  the shape of must conform to the
 *  .ajax(...) API. {@link http://reactivex.io/rxjs/class/es6/observable/dom/MiscJSDoc.js~AjaxRequestDoc.html}.
 * @param {string} [opts.url] url of api endpoint.  required if `opts.ajax` missing.
 *   not provide url.
 * @param {function} [opts.ajaxObservable] function to add functionality to the
 *   ajax observable. receives the ajax observable  as input, expects an Obsevable out
 * @param {function} [opts.epicObservable] function to add functionality to the
 *   observable epic. receives the epic as input, expects an Observable out
 * @param {Observable} [opts.mockObservableAjax] enable stubbing out of Observable.ajax.
 *   Although nock could work, JSDOM doesn't play nice, & Observable.ajax is not
 *   particularly polished.
 * @returns {Observable}
 */
export function apiXhr(opts) {
  const {
    onAction,
    actionCreator,
    ajax,
    url,
    mockObservableAjax,
    ajaxObservable,
    epicObservable,
  } = opts;
  if (!onAction)
    throw new Error(
      "missing `onAction`. provide an action like GET_STATUS, or similar"
    );
  if (!actionCreator) throw new Error("missing actionCreator");
  if (!url && !ajax) throw new Error("`url` or `ajax` must be provided");
  if (ajax && !isObject(ajax) && !isFunction(ajax))
    throw new Error("invalid ajax parameter");
  return (actions$) => {
    var epic = actions$.ofType(onAction).switchMap((action) => {
      var ajaxConfig = (isFunction(ajax) ? ajax(action) : ajax) || {};
      ajaxConfig.url = ajaxConfig.url || url;
      ajaxConfig = defaultsDeep(ajaxConfig, DEFAULT_AJAX_CONFIG);
      if (!ajaxConfig.url)
        throw new Error("epic factory missing ajax or url property");
      var ajaxObs =
        mockObservableAjax ||
        Observable.ajax(
          isFunction(ajaxConfig) ? ajaxConfig(action) : ajaxConfig
        );
      ajaxObs = ajaxObs.map(({ response }) => actionCreator(response));
      if (ajaxObservable) ajaxObs = ajaxObservable(ajaxObs, Observable, action);
      return ajaxObs;
    });
    if (epicObservable) epic = epicObservable(epic, Observable);
    if (!(epic instanceof Observable))
      throw new Error("epic factory `observable` must return an Observable");
    return epic;
  };
}
