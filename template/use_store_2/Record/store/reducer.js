import { fromJS } from 'immutable'
import * as actionTypes from './action-type'

const defaultState = fromJS({
  installImgSrcArr: [],
  constructionImgSrcArr: [],
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_INSTALL_IMG_SRC:
      return state.merge({
        installImgSrcArr: action.data
      })
    case actionTypes.SET_CONSTRUCTION_IMG_SRC:
      return state.merge({
        constructionImgSrcArr: action.data
      })
    default:
      return state
  }
}

export default reducer