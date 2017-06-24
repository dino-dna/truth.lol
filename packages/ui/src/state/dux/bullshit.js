import { apiXhr as apiXhrEpicFactory } from '../../util/epic-factory'
import { fsaIdentityActionCreator } from '../../util/action-creator'
import { API_ROOT } from '../../globals'

// actions
export const GET_BULLSHIT = 'GET_BULLSHIT'
export const SET_BULLSHIT = 'SET_BULLSHIT'

// reducer
export default function reducer (state = [], { type, payload }) {
  switch (type) {
    case SET_BULLSHIT:
      return payload
    default:
      return state
  }
}

// action creators
export const get = fsaIdentityActionCreator(GET_BULLSHIT)
export const set = fsaIdentityActionCreator(SET_BULLSHIT)

// epics
const fetchEpic = apiXhrEpicFactory({
  onAction: GET_BULLSHIT,
  actionCreator: bs => set(bs),
  ajax: action => ({ method: 'GET', url: `${API_ROOT}/bullshit` })
})

export const epics = [
  fetchEpic
]
