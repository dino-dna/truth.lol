import './css/normalize.css'
import './css/skeleton.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import store from './state/store'

function render () {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}
render()
registerServiceWorker()
