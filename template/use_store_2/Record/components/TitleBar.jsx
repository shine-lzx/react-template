import React from 'react'

const RenderTitle = (title = '') => {
  return (
    <div
      style={{
        height: '20px',
        lineHeight: '20px',
        color: '#909399',
        fontSize: '16px',
        borderLeft: '3px solid #AE9478',
        paddingLeft: '6px',
        marginLeft: '5px',
        marginBottom: '10px'
      }}
    >
      {title}
    </div>
  )
}

export default RenderTitle
