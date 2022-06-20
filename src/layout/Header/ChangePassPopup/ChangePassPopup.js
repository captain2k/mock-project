import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import XIcon from '../../../common/XIcon/XIcon'
import {
  changePass,
  getChangePassLoading,
} from '../../../store/reducer/changePassSlice'
import './ChangePassPopup.scss'

const ChangePassPopup = ({ toggleModal, setToggleModal }) => {
  const [form] = Form.useForm()
  const loading = useSelector(getChangePassLoading)

  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(changePass(values))
    setToggleModal(false)
    form.setFieldsValue({
      oldPassword: '',
      confirmPassword: '',
      newPassword: '',
    })
  }
  const handleCancel = () => {
    setToggleModal(false)
    form.setFieldsValue({
      oldPassword: '',
      confirmPassword: '',
      newPassword: '',
    })
  }

  const onFill = () => {
    form.setFieldsValue({
      oldPassword: '',
      confirmPassword: '',
      newPassword: '',
    })
  }

  const onFinishFailed = () => {
    message.error('Submit failed!')
  }

  return (
    <Modal
      className="modalChangePass"
      title="Change Password"
      visible={toggleModal}
      onCancel={handleCancel}
      closeIcon={<XIcon />}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        className="formChangePass"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Old password"
          name="oldPassword"
          validateFirst={true}
          rules={[
            {
              warningOnly: true,
            },
            {
              required: true,
              message: 'Please input your old password!',
            },
            {
              min: 8,
              message: 'Password must be between 8 and 32 characters',
            },
            {
              max: 32,
              message: 'Password must be between 8 and 32 characters',
            },
            {
              pattern: /(^\S*$)/g,
              message: 'Passwords do not contain spaces',
            },
          ]}
        >
          <Input.Password className="input-primary" />
        </Form.Item>
        <Form.Item
          label="New password"
          name="newPassword"
          validateFirst={true}
          rules={[
            {
              warningOnly: true,
            },
            {
              required: true,
              message: 'Please input your new password!',
            },
            {
              min: 8,
              message: 'Password must be between 8 and 32 characters',
            },
            {
              max: 32,
              message: 'Password must be between 8 and 32 characters',
            },
            {
              pattern: /(^\S*$)/g,
              message: 'Passwords do not contain spaces',
            },
          ]}
        >
          <Input.Password className="input-primary" />
        </Form.Item>
        <Form.Item
          label="Confirm new password"
          name="confirmPassword"
          validateFirst={true}
          rules={[
            {
              warningOnly: true,
            },
            {
              required: true,
              message: 'Please input confirmation password!',
            },
            {
              min: 8,
              message: 'Password must be between 8 and 32 characters',
            },
            {
              max: 32,
              message: 'Password must be between 8 and 32 characters',
            },
            {
              pattern: /(^\S*$)/g,
              message: 'Passwords do not contain spaces',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password className="input-primary" />
        </Form.Item>
        <Row className="button-group">
          <Col className="mr-20">
            <Form.Item>
              <Button
                className="primary-button"
                htmlType="submit"
                loading={loading}
              >
                OK
              </Button>
            </Form.Item>
          </Col>
          <Col className="mr-20">
            <Form.Item>
              <Button
                className="outline-secondary-button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button className="outline-primary-button" onClick={onFill}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

// ChangePassPopup.propTypes = {
//   toggleModal: PropTypes.bool.isRequired,
//   setToggleModal: PropTypes.func.isRequired,
// }

export default ChangePassPopup
