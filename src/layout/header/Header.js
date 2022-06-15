import { EditOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import ProfileScreen from '../../components/ProfileScreen/ProfileScreen'
import { saveUserProfile } from '../../store/reducer/userProfileSlice'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'
import ChangePassPopup from './ChangePassPopup/ChangePassPopup'
import defaultAvatar from './defaultAvatar.png'
import './Header.scss'
import logo from './logo.png'
const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const [showProFileScreen, setShowProfileScreen] = useState(false)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()

  const dispatch = useDispatch()
  useEffect(() => {
    async function getProfileUser() {
      const res = await axiosPrivate.get('/member/profile')
      const userProfile = res.data.member
      if (res.status === 200) {
        dispatch(saveUserProfile(userProfile))
      }
    }
    getProfileUser()
  }, [axiosPrivate, dispatch])

  const handleLogOut = async () => {
    const res = await axiosPrivate.delete('/auth/logout')
    if (res.status === 200) {
      localStorage.clear()
      navigate('/login')
    }
  }

  const handleClickChangePass = () => {
    setShowSubMenu(false)
    setToggleModal(true)
  }

  const handleShowProfileScreen = () => {
    setShowSubMenu(false)
    setShowProfileScreen(true)
  }

  const handleHideProfileScreen = () => {
    setShowProfileScreen(false)
  }

  return (
    <div className="navbar" id="header">
      <div className="navbar-left">
        <Link className="logo-link" to="/">
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
            <NavLink className="link" to="/worksheet">
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
            <div className="user-name">
              {localStorage.getItem('full_name')
                ? localStorage.getItem('full_name')
                : 'Unknown'}
            </div>
            <div className="user-avatar">
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
          <div className={showSubMenu ? 'sub-menu show' : 'sub-menu hide'}>
            <div className="sub-menu-items">
              <div className="sub-menu-item" onClick={handleClickChangePass}>
                <FormOutlined className="icon" />
                Change pass
              </div>
              <div className="sub-menu-item" onClick={handleShowProfileScreen}>
                <EditOutlined className="icon" />
                Edit Profile
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
      {showSubMenu && (
        <div
          className="header-mask"
          onClick={() => setShowSubMenu(false)}
        ></div>
      )}
      <ProfileScreen
        showProFileScreen={showProFileScreen}
        handleHideProfileScreen={handleHideProfileScreen}
      />
    </div>
  )
}

export default Header
