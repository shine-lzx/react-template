import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/map";
import "echarts/map/js/china";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import Gmap from "./Gmap.jsx";
import { provinceList } from "@/assets/data/area.js";
import { action } from "../../store";
import { connect } from "react-redux";
import ModuleCss from "./maps.module.scss";
class NewMap extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isShow: true,
      provinceId: "",
    };
  }

  componentDidMount() {
    this.init();
  }

  adapt(myChart) {
    myChart.resize();
    window.onresize = function () {
      myChart.resize();
    };
  }

  disposePr(names) {
    let a = provinceList.filter((v) => v.text === names);
    return a[0].value;
  }

  seriesData = () => {
    const { provinceMsgList } = this.props;
    return provinceMsgList.map((item, i) => {
      return {
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 5, //图标大小
        },
        lineStyle: {
          normal: {
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: 0.3, //尾迹线条曲直度
          },
        },
        data: [],
        markPoint: {
          symbolSize: 30,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: item.isHave === "0" ? "yellow" : "red",
            },
          },
          data: [item], //标记点数据
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
          },
          hoverAnimation: true,
          zlevel: 1,
        },
      };
    });
  };

  createMap() {
    const { setCoverName } = this.props;
    const myCharts = echarts.init(document.getElementById("main"));
    this.adapt(myCharts);
    myCharts.setOption({
      tooltip: {
        show: true,
        formatter: "{b}",
      },
      geo: {
        map: "china",
        zoom: 1.2,
        label: {
          emphasis: {
            show: false,
          },
        },
        // roam: true, //是否允许缩放
        itemStyle: {
          normal: {
            areaColor: "#3a7fd5",
            borderColor: "#0a53e9", // 线
            shadowColor: "#092f8f", // 外发光
            shadowBlur: 20,
            label: {
              show: true,
              textStyle: { color: "white" },
            },
          },
          emphasis: {
            show: true, //对应的鼠标悬浮效果
            areaColor: "#0a2dae", // 悬浮区背景
            textStyle: { color: "#fff" },
          },
        },
      },
      series: this.seriesData(),
      // series: [
      //   {
      //     name: "中国",
      //     type: "map",
      //     mapType: "china",
      //     itemStyle: {
      //       normal: {
      //         areaColor: "#3a7fd5",
      //         borderColor: "#0a53e9", // 线
      //         shadowColor: "#092f8f", // 外发光
      //         shadowBlur: 20,
      //         label: {
      //           show: true,
      //           textStyle: { color: "white" },
      //         },
      //       },
      //       emphasis: {
      //         show: true, //对应的鼠标悬浮效果
      //         // areaColor: "#0a2dae", // 悬浮区背景
      //         areaColor: "#ffefd5", // 悬浮区背景
      //         textStyle: { color: "#fff" },
      //       },
      //     },
      //     markPoint: {
      //       symbolSize: 30,
      //       label: {
      //         normal: {
      //           show: true,
      //         },
      //         emphasis: {
      //           show: true,
      //         },
      //       },
      //       itemStyle: {
      //         normal: {
      //           color: "yellow",
      //         },
      //       },
      //       data: provinceMsgList, //标记点数据
      //       showEffectOn: "render",
      //       rippleEffect: {
      //         brushType: "stroke",
      //       },
      //       hoverAnimation: true,
      //       zlevel: 1,
      //     },
      //   },
      // ],
    });

    myCharts.on("click", (param) => {
      if (param.componentType === "markPoint" || param.name === "南海诸岛")
        return;
      let PName = this.nameDispose(param.name);
      let prId = this.disposePr(PName);
      setCoverName(this.nameDispose(param.name));
      this.setState({ provinceId: prId });
      this.setState({ isShow: false });
    });
  }

  nameDispose(names) {
    return names === "内蒙古"
      ? "内蒙古自治区"
      : names === "广西"
      ? "广西壮族自治区"
      : names === "西藏"
      ? "西藏自治区"
      : names === "宁夏"
      ? "宁夏回族自治区"
      : names === "新疆"
      ? "新疆维吾尔自治区"
      : names === "北京"
      ? "北京市"
      : names === "天津"
      ? "天津市"
      : names === "上海"
      ? "上海市"
      : names + "省";
  }

  init() {
    const { getMapData } = this.props;
    const fn = () => {
      this.createMap();
    };
    getMapData("", 0, fn);
  }

  render() {
    const { isShow, provinceId } = this.state;
    return (
      <div>
        {isShow ? (
          <div id="main" className={ModuleCss.mapBox}></div>
        ) : (
          <Gmap provinceId={provinceId} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { provinceMsgList } = state.mapReducerData;
  return { provinceMsgList };
};
const mapDispatchToProps = (dispatch) => ({
  setCoverName(coverName) {
    dispatch(action.setCoverName(coverName));
  },
  getMapData(positionId = "", status = "", fn) {
    dispatch(action.getMapData(positionId, status, fn));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMap);
