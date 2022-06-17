import { Avatar, Button, Form, message, Tooltip, Upload } from 'antd'
import { useState } from 'react'
import { storage } from '../../../firebase'
import { setLocalStorage } from '../../../utils/helpers/handleLocalStorageItems'

function UserInfo({ mail, memberCode, phoneNumber, fullName }) {
  const [avatarOfficial, setAvatarOfficial] = useState('')
  const [subAvatar, setSubAvatar] = useState('')
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const propsAvatarOfficial = {
    beforeUpload: (file) => {
      const isOverLimitSize = file.size < 4000000
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'
      const filename = new Date() + '-' + file.name
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
            setAvatarOfficial(reader.result)
          },
          false,
        )
        reader.readAsDataURL(file)
        const metaData = {
          contentType: file.type,
        }
        let uploadTask = storage.ref('avatars/' + filename).put(file, metaData)
        uploadTask.on(
          'state_change',
          (snapshot) => {
            switch (snapshot.state) {
              case 'paused':
                break
              case 'running':
                break
              default:
                break
            }
          },
          (error) => {
            alert(error.message)
          },
          () => {
            storage
              .ref('avatars/' + filename)
              .getDownloadURL()
              .then((url) => {
                setLocalStorage('officialAvatar', url)
              })
          },
        )
        message.success(`Upload successfully`)
      }
      return isOverLimitSize || isPNG || isJPG || Upload.LIST_IGNORE
    },
  }
  const propsAvatarSub = {
    beforeUpload: (file) => {
      const isOverLimitSize = file.size < 4000000
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'
      const filename = new Date() + '-' + file.name
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
            setSubAvatar(reader.result)
          },
          false,
        )
        reader.readAsDataURL(file)
        const metaData = {
          contentType: file.type,
        }
        let uploadTask = storage.ref('avatars/' + filename).put(file, metaData)
        uploadTask.on(
          'state_change',
          (snapshot) => {
            switch (snapshot.state) {
              case 'paused':
                break
              case 'running':
                break
              default:
                break
            }
          },
          (error) => {
            alert(error.message)
          },
          () => {
            storage
              .ref('avatars/' + filename)
              .getDownloadURL()
              .then((url) => {
                setLocalStorage('subAvatar', url)
              })
          },
        )
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
            <Avatar
              shape="square"
              size={100}
              src={
                avatarOfficial
                  ? avatarOfficial
                  : JSON.parse(getLocalStorageItem('officialAvatar'))
              }
            />
            <Form.Item
              name="avatar_official"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...propsAvatarOfficial}>
                <Button size="small" className="primary-button">
                  Upload avatar
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="user-info-sub-avatar">
            <Avatar
              shape="square"
              size={60}
              src={
                subAvatar
                  ? subAvatar
                  : JSON.parse(getLocalStorageItem('subAvatar'))
              }
            />
            <Form.Item
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...propsAvatarSub}>
                <Button size="small" className="outline-primary-button">
                  Upload
                </Button>
              </Upload>
            </Form.Item>
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
