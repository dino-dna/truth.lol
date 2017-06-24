import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import reducer from './root-reducer'
import rootEpic from './epics'
import { createLogger } from 'redux-logger'

const middleware = [
  process.env.NODE_ENV === 'development' ? createLogger({ collapsed: true }) : null,
  createEpicMiddleware(rootEpic)
].filter(i => i)

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  {}, // preloadedState
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
