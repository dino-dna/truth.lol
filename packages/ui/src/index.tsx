import './css/normalize.css'
import './css/skeleton.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import State from './types/State'
import BgDim from './types/BgDim'
import { memoize } from 'lodash'

// micro state tree props injection
const getProps = (function createGetProps () {
  let state: State = {
    bgMode: 2,
    bgDim: {
      height: 0,
      width: 0
    },
    handlers: null
  }
  const updateState = function (key: string, value: any) {
    state = Object.assign({}, state, { [key]: value })
    render()
    return state
  }
  const handlers = {
    setBgMode (mode: string, dim: BgDim): void {
      updateState('bgMode', mode)
      updateState('bgDim', dim)
    }
  }
  return function getProps () {
    return {
      ...state,
      handlers
    }
  }
})()

const getRoot = memoize(function _getRoot () { return document.getElementById('root') })
function render () {
  const props = getProps()
  ReactDOM.render(<App {...props} />, getRoot())
}
render()
registerServiceWorker()
