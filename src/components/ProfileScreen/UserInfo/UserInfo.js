import { Avatar, Button, Form, message, Tooltip, Upload } from 'antd'
import React, { useState } from 'react'

function UserInfo({ mail, memberCode, phoneNumber, fullName }) {
  const [src, setSrc] = useState('')

  const props = {
    beforeUpload: (file) => {
      const isOverLimitSize = file.size < 4000000
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'
      if (!isOverLimitSize) {
        message.error(`This file greater than 4MB`)
      }
      if (!isPNG && !isJPG) {
        message.error(`${file.name} should be a PNG or JPG file!`)
      }
      if (isOverLimitSize && (isPNG || isJPG)) {
        let reader = new FileReader()
        reader.addEventListener(
          'load',
          function () {
            setSrc(reader.result)
          },
          false,
        )
        reader.readAsDataURL(file)
        message.success(`Upload successfully`)
      }
      return isOverLimitSize || isPNG || isJPG || Upload.LIST_IGNORE
    },
  }
  return (
    <Form.Item>
      <div className="user-info">
        <div className="user-info-avatar">
          <div className="user-info-avatar-official">
            {/* <Form.Item
              name="avatar_official"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            > */}
            <Avatar shape="square" size={100} src={src ? src : null} />
            {/* </Form.Item> */}
            <Upload {...props}>
              <Button size="small" className="primary-button">
                Upload avatar
              </Button>
            </Upload>
          </div>
          <div className="user-info-sub-avatar">
            {/* <Form.Item name="avatar"> */}
            <Avatar shape="square" size={60} src={src ? src : null} />
            {/* </Form.Item> */}
            <Upload {...props}>
              <Button size="small" className="outline-primary-button">
                Upload
              </Button>
            </Upload>
          </div>
        </div>
        <div className="user-info-detail">
          <div>
            <label>Member Code:</label>
            <span>{memberCode}</span>
          </div>
          <div>
            <label>Email:</label>
            <Tooltip title={mail}>
              <span>{mail}</span>
            </Tooltip>
          </div>
          <div>
            <label>Name:</label>
            <span>{fullName}</span>
          </div>
          <div>
            <label>Phone number:</label>
            <span>{phoneNumber}</span>
          </div>
        </div>
      </div>
    </Form.Item>
  )
}

export default UserInfo
