import { combineEpics } from 'redux-observable'
import { epics as bullshitEpics } from './dux/bullshit'

export default combineEpics.apply(null, [ // eslint-disable-line
  ...bullshitEpics
])
