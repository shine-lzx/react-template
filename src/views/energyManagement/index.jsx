import React, { Component } from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/map";
import "echarts/map/js/china";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { chinaDatas, chinaGeoCoordMap } from "./config.js";
export default class EnergyManagement extends Component {
  constructor() {
    super();
    this.state = {
      markPointData: [
        {
          coord: ["118.850303", "31.942508"],
          pointColor: "red",
        },
        {
          coord: ["128.850303", "35.942508"],
          pointColor: "yellow",
        },
        {
          coord: ["98.850303", "39.942508"],
          pointColor: "red",
        },
        {
          coord: ["108.850303", "40.942508"],
          pointColor: "red",
        },
      ],
    };
  }

  componentDidMount() {
    this.initMap();
  }

  adapt(myChart) {
    myChart.resize();
    window.onresize = function () {
      myChart.resize();
    };
  }

  mapData = () => {
    const { markPointData } = this.state;
    return markPointData.map((item, i) => {
      return {
        type: "map",
        mapType: "china",
        zoom: 1.2,
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

  initMap() {
    const myCharts = echarts.init(document.getElementById("main"));
    this.adapt(myCharts);
    myCharts.setOption({
      tooltip: {
        show: true,
        formatter: "{b}",
      },
      backgroundColor: "#013954",
      geo: {},
      series: this.mapData(),
    });
  }

  render() {
    return <div id="main" style={{ height: "600px", width: "600px" }}></div>;
  }
}
