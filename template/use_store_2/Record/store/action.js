import * as actionTypes from './action-type'

const setInstallImgSrcArr = (data) => ({
  type: actionTypes.SET_INSTALL_IMG_SRC,
  data
})

const setConstructionImgSrcArr = (data) => ({
  type: actionTypes.SET_CONSTRUCTION_IMG_SRC,
  data
})

export const getInstall = data => {
  return dispatch => {
    dispatch(setInstallImgSrcArr(data))
  }
}

export const getConstruction = data => {
  return dispatch => {
    dispatch(setConstructionImgSrcArr(data))
  }
}