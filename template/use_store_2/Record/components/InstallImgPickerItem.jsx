import React from 'react'
import { ImagePicker } from 'antd-mobile'
import react_decorator from './react_decorator.js'
import ImageCarousel from '@/components/ImageCarousel'
import Notification from 'rc-notification'
@react_decorator
class InstallImgPickerItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  notification = null

  componentWillUnmount() {
    if (this.notification) {
      this.notification.destroy()
    }
  }

  componentDidMount() {
    this.dataProcessing()
  }

  dataProcessing() {
    const { itemInfo } = this.props
    if (itemInfo) {
      const { picFileResps } = itemInfo
      if (picFileResps.length) {
        const newArr = picFileResps.map(item => {
          return {
            url: item.fileUrl,
            id: item.fileId
          }
        })
        this.setState({
          files: newArr
        })
      }
    }
  }

  render() {
    const { files } = this.state
    const { itemInfo } = this.props
    return (
      <div
        style={{
          borderBottom: '1px solid #313437',
          marginBottom: '6px'
        }}
      >
        {itemInfo ? (
          <div
            style={{
              color: '#909399',
              fontSize: '12px',
              padding: '5px 0 0 5px'
            }}
          >
            {itemInfo.stepDesc}
          </div>
        ) : null}
        {itemInfo ? (
          <ImagePicker
            length="4"
            onImageClick={(index, fs) => {
              this.bigPicture(index, fs)
            }}
            disableDelete={true}
            selectable={false}
            files={files}
            multiple={true}
          />
        ) : null}
      </div>
    )
  }

  bigPicture = (index, fs) => {
    // const src = fs[index].url
    // ImagePreviewer(src)
    const { installImgSrcArr } = this.props
    const id = fs[index].id
    let currentIndex = ''
    installImgSrcArr.forEach((item, index) => {
      if (item.fileId === id) {
        currentIndex = index
      }
    })
    if (currentIndex || currentIndex === 0) {
      Notification.newInstance({}, n => (this.notification = n))
      ImageCarousel(this.notification, installImgSrcArr, currentIndex)
    }
  }
}

export default InstallImgPickerItem
