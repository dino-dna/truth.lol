/**
 * Create a FSA action creator, given an action.
 * Very often, redux devs write the same boiler plate code over and over--a
 * function that takes a payload, and returns a POJO with the action `type` &
 * `payload` keys.  Albeit it meta, this utility creates a standard action
 * creator, where whatever the AC is called with gets passed as the paload.
 * @example
 * // old way
 * export function setBananas (bananas) {
 *   return {
 *     type: SET_BANANAS,
 *     payload: bananas
 *   }
 * }
 *
 * // new way
 * export function setBananas = FSAIdentity(SET_BANANAS)
 *
 * @see {@link https://github.com/acdlite/flux-standard-action#example}
 * @param {*} type redux action identifier. e.g. GET_WIDGETS
 * @returns {function}
 */
export function fsaIdentityActionCreator(type) {
  return function FSAIdentityActionCreator(payload) {
    return { type, payload };
  };
}
