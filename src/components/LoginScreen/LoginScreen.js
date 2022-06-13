import { Button, Col, Form, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getLoginError,
  getLoginLoading,
  login,
} from '../../store/reducer/loginSlice'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems/index'
import LoginImage from './LoginImage.png'
import './LoginScreen.scss'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(getLoginLoading)
  const error = useSelector(getLoginError)
  const handleLogin = () => {
    dispatch(login({ email, password }))
  }
  useEffect(() => {
    document.title = 'Login'
  }, [])
  const accessToken = getLocalStorageItem('accessToken')
  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [navigate, accessToken])
  return (
    <Row className="loginScreen">
      <Col
        xs={{ span: 0 }}
        md={{ span: 14 }}
        lg={{ span: 16 }}
        className="loginImg"
      >
        <div>
          <img src={LoginImage} alt="LoginImage" />
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 10 }}
        lg={{ span: 8 }}
        className="loginFormArea"
      >
        <div className="wrapForm">
          <h3>Welcome to Relipa Portal! &#128075;</h3>
          <p>Please login to your account and get started</p>
          {error && <p className="warning-message">{error}</p>}
          <Form layout="vertical" labelAlign="left">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Email is not valid',
                },
              ]}
            >
              <Input
                className="input-primary"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 8,
                  message: 'Password contains at least 8 characters',
                },
                {
                  max: 32,
                  message: 'Password contains at most 32 characters',
                },
                {
                  pattern: /(^\S*$)/g,
                  message: 'Passwords do not contain spaces',
                },
              ]}
            >
              <Input.Password
                className="input-primary"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                block
                className="primary-button"
                size="large"
                loading={loading}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default LoginScreen
