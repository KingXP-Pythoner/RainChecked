import React, {useState} from 'react'

export default function Loader({classStyle, addContent, contentWidth, contentHeight}) {
 



  return (
    <div style={{height: "120px", width: "100%"}}className={classStyle}>
    <div className={'loader-element'}>
    </div>
    </div>
  )
}
