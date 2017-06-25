import { fsaIdentityActionCreator } from '../../util/action-creator'

// actions
export const SET_LIE = 'SET_LIE'
export const SET_RANDOM_LIE = 'SET_RANDOM_LIE'

// reducer
export default function reducer (state = {}, { type, payload }) {
  switch (type) {
    case SET_LIE:
      return { index: payload.index, fade: payload.fade || 'down' }
    case SET_RANDOM_LIE:
      const { min = 0, max } = payload
      if (!max) throw new Error('expected max')
      return {
        index: Math.floor(Math.random() * (max - min + 1)) + min,
        fade: payload.fade || 'down'
      }
    default:
      return state
  }
}

// action creators
export const set = fsaIdentityActionCreator(SET_LIE)
export const setRandom = fsaIdentityActionCreator(SET_RANDOM_LIE)
