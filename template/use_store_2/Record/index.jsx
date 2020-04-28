import React from 'react'
import moduleCss from './record.module.scss'
import RenderTitle from './components/TitleBar'
import ImagePickerItem from './components/ImagePickerItem'
import InstallImgPickerItem from './components/InstallImgPickerItem'
import { Toast } from 'antd-mobile'
import {
  installRecords,
  selectDetailByDetailId
} from '@/assets/api/Record/index'
import _ from 'lodash'
import react_decorator from './components/react_decorator.js'
@react_decorator
class Record extends React.Component {
  constructor() {
    super()
    this.state = {
      detailId: '',
      branchId: '',
      active: '0',
      imgSrc: '',
      flag: '0',
      titleName: '施工照片',
      tabList: [
        {
          tabId: '0',
          tabName: '施工记录'
        },
        {
          tabId: '1',
          tabName: '安装记录'
        }
      ],
      detailList: [],
      installDetail: []
    }
  }

  componentDidMount() {
    const { DeviceDetailResp } = this.props
    if (DeviceDetailResp) {
      this.setState({
        branchId: DeviceDetailResp.branchId,
        detailId: DeviceDetailResp.detailId
      })
      this.selectDetailByDetailIdAsync(DeviceDetailResp.detailId)
    }
  }

  render() {
    const { titleName, flag } = this.state
    return (
      <div className={moduleCss.Main}>
        <div className={moduleCss.AppContain}>
          <div
            className={moduleCss.bodyAera}
            style={{
              position: 'relative'
            }}
          >
            <div>{this.renderTab()}</div>
            <div className={moduleCss.scroll}>
              {flag === '0' ? (
                <div>
                  {RenderTitle(titleName)}
                  {this.renderImgs()}
                </div>
              ) : (
                <div>
                  {RenderTitle(titleName)}
                  {this.renderInstallImgs()}
                </div>
              )}
              {flag === '0' ? (
                <div>{this.renderConstruction()}</div>
              ) : (
                <div>{this.renderInstall()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  cancelView = () => {
    this.setState({ imgSrc: '' })
  }

  renderTab() {
    const { tabList, active } = this.state
    return (
      <div className={moduleCss.tabBox}>
        {tabList.map(item => {
          return (
            <div
              className={moduleCss.tabs}
              style={
                item.tabId === active
                  ? {
                      color: '#E5C195',
                      borderBottom: '2px solid #E5C195',
                      transition: 'all 1s'
                    }
                  : null
              }
              key={item.tabId}
              onClick={() => {
                this.tabEvent(item.tabId)
              }}
            >
              {item.tabName}
            </div>
          )
        })}
      </div>
    )
  }

  tabEvent = tabId => {
    const { detailId, branchId } = this.state
    if (tabId === '0') {
      this.selectDetailByDetailIdAsync(detailId)
      this.setState({ titleName: '施工照片', flag: '0', active: tabId })
    } else if (tabId === '1') {
      this.installRecordsAsync(branchId)
      this.setState({ titleName: '安装照片', flag: '1', active: tabId })
    }
  }

  renderImgs() {
    const { detailList } = this.state
    let info = detailList.heatingAllotConstructDetailResps
    if (info) {
      return info.map(item => {
        return (
          <ImagePickerItem
            key={item.stepId}
            itemInfo={item}
            pfn={this.fn.bind(this)}
          />
        )
      })
    } else {
      return <ImagePickerItem />
    }
  }

  renderInstallImgs() {
    const { installDetail } = this.state
    let info = installDetail.macRocordResps
    if (info) {
      return info.map(item => {
        return (
          <InstallImgPickerItem
            key={item.stepId}
            itemInfo={item}
            pfn={this.fn.bind(this)}
          />
        )
      })
    } else {
      return <InstallImgPickerItem />
    }
  }

  fn(data) {
    this.setState({ imgSrc: data.url })
  }

  renderConstruction() {
    const { detailList } = this.state
    return (
      <div className={moduleCss.infoStyle}>
        <div className={moduleCss.infomation}>工程人员信息</div>
        <div className={moduleCss.personInfo}>
          <div>
            <div className={moduleCss.desc}>工程人员姓名：</div>
            <div className={moduleCss.desc}>工程人员电话：</div>
          </div>
          <div>
            <div className={moduleCss.showBox}>
              {detailList.constructName || '-'}
            </div>
            <div className={moduleCss.showBox}>
              {detailList.constructPhone || '-'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderInstall() {
    const { installDetail } = this.state
    return (
      <div className={moduleCss.infoStyle}>
        <div>
          <div className={moduleCss.infomation}>mac地址</div>
          <div className={moduleCss.showBox} style={{ width: '335px' }}>
            {installDetail.coreMacAddress || '-'}
          </div>
        </div>
        <div className={moduleCss.infomation} style={{ marginTop: '20px' }}>
          工程人员信息
        </div>
        <div className={moduleCss.personInfo}>
          <div>
            <div className={moduleCss.desc}>工程人员姓名：</div>
            <div className={moduleCss.desc}>工程人员电话：</div>
          </div>
          <div>
            <div className={moduleCss.showBox}>
              {installDetail.installerName || '-'}
            </div>
            <div className={moduleCss.showBox}>
              {installDetail.installerPhone || '-'}
            </div>
          </div>
        </div>
      </div>
    )
  }
  // 安装方详情
  async installRecordsAsync(branchRelaId) {
    await installRecords({ branchRelaId })
      .then(res => {
        const { getInstall } = this.props
        let arr = res.data.macRocordResps.map(item => {
          return {
            picFileResps: item.picFileResps
          }
        })
        let a = arr.map(i => {
          return i.picFileResps
        })
        getInstall(_.flattenDeep(a))
        this.setState({ installDetail: res.data })
      })
      .catch(err => {
        Toast.fail('暂无信息', 1)
      })
  }

  // 施工方详情
  async selectDetailByDetailIdAsync(detailId) {
    await selectDetailByDetailId({ detailId: detailId })
      .then(res => {
        const { getConstruction } = this.props
        let arr = res.data.heatingAllotConstructDetailResps.map(item => {
          return {
            heatingFiles: item.heatingFiles
          }
        })
        let a = arr.map(i => {
          return i.heatingFiles
        })
        let b = _.flattenDeep(a)
        getConstruction(b)
        this.setState({ detailList: res.data })
      })
      .catch(err => {
        Toast.fail('暂无信息', 1)
      })
  }
}

export default Record
