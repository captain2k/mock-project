import {
  ControlOutlined,
  NodeIndexOutlined,
  NotificationOutlined,
  PaperClipOutlined
} from '@ant-design/icons'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../../layout/Header/logo.png'
import './AdminMenu.scss'
const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <div className="title">
        <img className="logo" src={logo} alt="logo"></img>
        <Link to="/">Relipa Portal</Link>
      </div>
      <div className="admin-wrap-link">
        <NavLink className="admin-link" to="request">
          <NodeIndexOutlined className="admin-icon" /> Request
        </NavLink>
      </div>
      <div className="admin-wrap-link">
        <NavLink className="admin-link" to="import">
          <PaperClipOutlined className="admin-icon" /> Import
        </NavLink>
      </div>
      <div className="admin-wrap-link">
        <NavLink className="admin-link" to="notice">
          <NotificationOutlined className="admin-icon" /> Notice
        </NavLink>
      </div>
      <div className="admin-wrap-link">
        <NavLink className="admin-link" to="nothing">
          <ControlOutlined className="admin-icon" /> Request
        </NavLink>
      </div>
    </div>
  )
}

export default AdminMenu
