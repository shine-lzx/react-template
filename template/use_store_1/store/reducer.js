import * as actionTypes from "./action-type";

const defaultState = {
  mapData: {},
  isShow: true,
  cityMsgList: [],
  projectMsgList: [],
  provinceMsgList: [],
  coverName: "",
  provinceId: "",
};

const reducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.SET_MPA_DATA:
      newState = {
        ...state,
        mapData: action.data,
      };
      break;
    case actionTypes.SET_PROVINCE_LIST:
      newState = {
        ...state,
        provinceMsgList: action.data,
      };
      break;
    case actionTypes.SET_CITY_LIST:
      newState = {
        ...state,
        cityMsgList: action.data,
      };
      break;
    case actionTypes.SET_PROGECT_LIST:
      newState = {
        ...state,
        projectMsgList: action.data,
      };
      break;
    case actionTypes.SET_COVER_NAME:
      newState = {
        ...state,
        coverName: action.data,
      };
      break;
    case actionTypes.SET_PROVINCE_ID:
      newState = {
        ...state,
        provinceId: action.data,
      };
      break;
    case actionTypes.IS_SHOW:
      newState = {
        ...state,
        isShow: action.data,
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;
