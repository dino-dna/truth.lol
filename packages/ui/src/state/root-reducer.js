import { combineReducers } from 'redux'

import background from './dux/background'
import bullshit from './dux/bullshit'
import lie from './dux/lie'

export default combineReducers({
  background,
  bullshit,
  lie
})
