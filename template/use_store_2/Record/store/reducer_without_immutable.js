import * as actionTypes from './action-type'

const defaultState = {
  installImgSrcArr: [],
  constructionImgSrcArr: [],
}

const reducer = (state = defaultState, action) => {
  let newState
  switch (action.type) {
    case actionTypes.SET_INSTALL_IMG_SRC:
      newState = {
        ...state,
        installImgSrcArr: action.data
      }
      break
    case actionTypes.SET_CONSTRUCTION_IMG_SRC:
      newState = {
        ...state,
        constructionImgSrcArr: action.data
      }
      break
    default:
      newState = state
      break
  }
  return newState
}

export default reducer