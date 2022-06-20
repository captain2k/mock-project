import { Outlet } from 'react-router-dom'
import './Admin.scss'
import AdminMenu from './components/AdminMenu/AdminMenu'
import Header from './components/Header/Header'
const Admin = () => {
  document.title = 'Admin'
  return (
    <div className="admin">
      <AdminMenu />
      <div className="admin-content">
        <div className="content">
          <Header />

          <div className="admin-function">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
