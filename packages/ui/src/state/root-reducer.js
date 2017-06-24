import { combineReducers } from 'redux'

import background from './dux/background'
import bullshit from './dux/bullshit'

export default combineReducers({
  background,
  bullshit
})
