import {
  CaretDownOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { saveUserProfile } from '../../store/reducer/userProfileSlice'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'
import avatar from './avatar.png'
import ChangePassPopup from './ChangePassPopup/ChangePassPopup'
import './Header.scss'
import logo from './logo.png'
const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  console.log(useSelector((state) => state.userProfileSlice))
  useEffect(() => {
    async function getProfileUser() {
      const res = await axiosPrivate.get('/member/profile')
      const userProfile = res.data.member
      if (res.status === 200) {
        dispatch(saveUserProfile(userProfile))
      }
    }
    getProfileUser()
  }, [])
  const handleLogOut = async () => {
    const res = await axiosPrivate.delete('/auth/logout')
    if (res.status === 200) {
      localStorage.clear()
      navigate('/login')
    }
  }

  const handleClickChangePass = () => {
    alert('clicked')
    setShowSubMenu(false)
    setToggleModal(true)
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link className="logo-link" to="/edit-profile">
          <div className="logo">
            <img src={logo} alt="logo" className="logo-image"></img>
            <div className="logo-name">Relipa Portal</div>
          </div>
        </Link>
        <div className="nav-links">
          <div className="wrap-link">
            <NavLink className="link" to="/">
              <span>Home</span>
              <div className="underline-link"></div>
            </NavLink>
          </div>
          <div className="wrap-link">
            <NavLink className="link" to="/edit-profile">
              <span>Timesheet</span>
              <div className="underline-link"></div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-item">
          <div
            className="user-function"
            onClick={() => setShowSubMenu(!showSubMenu)}
          >
            <div className="user-avatar">
              <img className="avatar" alt="avatar" src={avatar}></img>
            </div>
            <div className="down-arrow">
              <CaretDownOutlined />
            </div>
          </div>
          <div className={showSubMenu ? 'sub-menu show' : 'sub-menu hide'}>
            <div className="sub-menu-items">
              <div className="sub-menu-item" onClick={handleClickChangePass}>
                <FormOutlined className="icon" />
                Change pass
              </div>
              <div className="sub-menu-item" onClick={handleLogOut}>
                <LogoutOutlined className="icon" />
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePassPopup
        setToggleModal={setToggleModal}
        toggleModal={toggleModal}
      />
    </div>
  )
}

export default Header
