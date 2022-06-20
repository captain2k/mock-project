import { FieldTimeOutlined, HomeOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import defaultAvatar from '../../../../layout/Header/defaultAvatar.png'
import './Header.scss'
const Header = () => {
  const [showAdminSubMenu, setShowAdminSubMenu] = useState(false)
  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <div className="header-item">
          <NavLink to="/">
            <Tooltip
              title="Home"
              color="black"
              arrowPointAtCenter={true}
              overlayInnerStyle={{ borderRadius: '5px' }}
            >
              <HomeOutlined className="admin-icon" />
            </Tooltip>
          </NavLink>
        </div>
        <div className="header-item">
          <NavLink to="/worksheet">
            <Tooltip
              title="Time sheet"
              color="black"
              arrowPointAtCenter={true}
              overlayInnerStyle={{ borderRadius: '5px' }}
            >
              <FieldTimeOutlined className="admin-icon" />
            </Tooltip>
          </NavLink>
        </div>
      </div>
      <div
        className="admin-header-right"
        onClick={() => setShowAdminSubMenu(!showAdminSubMenu)}
      >
        <div className="admin-name header-item">
          <div>
            {localStorage.getItem('full_name')
              ? localStorage.getItem('full_name')
              : 'Unknown'}
          </div>
          <div className="kind">Admin</div>
        </div>
        <div className="admin-avatar header-item">
          {localStorage.getItem('avatar') === 'null' ? (
            <img className="avatar" alt="avatar" src={defaultAvatar}></img>
          ) : (
            <img
              className="avatar"
              alt="avatar"
              src={localStorage.getItem('avatar')}
            ></img>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
