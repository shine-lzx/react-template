import * as actionTypes from "./action-type";
import { controlCenter } from "@/assets/api/controlCenter";
const setMapData = (data) => ({
  type: actionTypes.SET_MPA_DATA,
  data,
});

// const getShow = (data) => ({
//   type: actionTypes.IS_SHOW,
//   data,
// });

const getProvinceData = (data) => ({
  type: actionTypes.SET_PROVINCE_LIST,
  data,
});

const getCityData = (data) => ({
  type: actionTypes.SET_CITY_LIST,
  data,
});

const getProjectData = (data) => ({
  type: actionTypes.SET_PROGECT_LIST,
  data,
});

const getCoverName = (data) => ({
  type: actionTypes.SET_COVER_NAME,
  data,
});

const getProvinceId = (id) => ({
  type: actionTypes.SET_PROVINCE_ID,
  id,
});

// 标记点处理
const disposePoint = (data) => {
  const N =
    "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png";
  const Y =
    "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
  return data.map((item) => {
    return {
      position: item.location.split(","),
      icon: item.isHave === "0" ? N : Y,
    };
  });
};

const disposeProvince = (data) => {
  return data.map((item) => {
    return {
      coord: item.location.split(","),
      isHave: item.isHave,
    };
  });
};

const dataProcessing = {
  cityMsgList(data) {
    if (data.cityMsgList !== null) {
      return disposePoint(data.cityMsgList);
    }
    return [];
  },

  projectMsgList(data) {
    if (data.projectMsgList !== null) {
      return disposePoint(data.projectMsgList);
    }
    return [];
  },

  provinceMsgList(data) {
    if (data.provinceMsgList !== null) {
      return disposeProvince(data.provinceMsgList);
    }
    return [];
  },
};

const info = (tag, data) => {
  return dataProcessing[tag](data);
};

export const getMapData = (positionId = "", status = "", callback) => {
  return async (dispatch) => {
    const { data } = await controlCenter({
      positionId,
      status,
    });
    dispatch(setMapData(data));
    let cityMsgList = info("cityMsgList", data);
    let projectMsgList = info("projectMsgList", data);
    let provinceList = info("provinceMsgList", data);
    dispatch(getProvinceData(provinceList));
    dispatch(getCityData(cityMsgList));
    dispatch(getProjectData(projectMsgList));
    callback && callback();
  };
};

export const setShow = (data) => {
  return (dispatch) => {};
};

export const setCoverName = (coverName) => {
  return (dispatch) => {
    dispatch(getCoverName(coverName));
  };
};

export const setProvinceId = (id) => {
  return (dispatch) => {
    dispatch(getProvinceId(id));
  };
};
