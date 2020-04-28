import { connect } from 'react-redux'
import { action } from '../store'
const { getInstall, getConstruction } = action
export default connect(
  state => ({
    installImgSrcArr: state.getIn(['Record', 'installImgSrcArr']),
    constructionImgSrcArr: state.getIn(['Record', 'constructionImgSrcArr']),
    DeviceDetailResp: state.getIn(['deviceManageDetail', 'DeviceDetailResp'])
  }), {
    getInstall,
    getConstruction
  }
)