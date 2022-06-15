import { Button, Checkbox, Form, Input, message, Modal, TimePicker } from 'antd'
import moment from 'moment'
import { useRef } from 'react'
import changeFormatDate from '../../../../utils/helpers/handleTime/changeFormatDate'
import { MESSAGE_REQUIRED } from '../../../../utils/helpers/message'
import useAxiosPrivate from '../../../../utils/requests/useAxiosPrivate'
import './RegisterForget.scss'
const RegisterForget = ({
  isRegisterForgetVisible,
  setIsRegisterForgetVisible,
  dataRegisterForget,
  setDataRegisterForget,
}) => {
  const format = 'HH:mm'
  const axiosPrivate = useAxiosPrivate()
  const registerForgetForm = useRef()
  console.log('data Register: ', dataRegisterForget)
  let registerForDate
  let checkinForm
  let checkoutForm

  // Chưa gửi request
  if (dataRegisterForget.status === undefined) {
    registerForDate = dataRegisterForget.work_date
    console.log('register Date:', registerForDate)

    if (registerForDate) {
      registerForDate = registerForDate.slice(0, 10)
    }

    checkinForm = moment('08:00', format)
    checkoutForm = moment('17:00', format)
  }

  // Đã gửi request
  if (dataRegisterForget.status === 0) {
    registerForDate = dataRegisterForget.request_for_date
    checkinForm = dataRegisterForget.checkin
    checkinForm = moment(checkinForm).format('HH:mm')
    checkoutForm = dataRegisterForget.checkout
    checkoutForm = moment(checkoutForm).format('HH:mm')
    console.log(checkinForm, checkoutForm)
  }

  // Xử lí sự kiện của FORM
  const handleOk = () => {
    setIsRegisterForgetVisible(false)
  }

  const handleCancel = () => {
    setIsRegisterForgetVisible(false)
    setDataRegisterForget({})
  }

  const onFinish = (value) => {
    let request_for_date = value.register_for_date
    request_for_date = changeFormatDate(request_for_date)
    let checkin = value.checkin.format('HH:mm')
    let checkout = value.checkout.format('HH:mm')
    let reason = value.reason
    let special_reason = value.special_reason
    let error_count
    if (special_reason !== undefined) {
      error_count = 1
    } else {
      error_count = 0
    }
    // Chưa gửi request
    if (dataRegisterForget.status === undefined) {
      axiosPrivate.post('/worksheet/request/forget/create', {
        request_for_date: request_for_date,
        checkin: checkin,
        checkout: checkout,
        reason: reason,
        error_count: error_count,
      })
      registerForgetForm.current.resetFields()
      message.success('Request sent')
    }
    // Đã gửi request
    if (dataRegisterForget.status === 0) {
      // axiosPrivate.put('/worksheet/request/forget/update', {
      //   request_for_date: request_for_date,
      //   checkin: checkin,
      //   checkout: checkout,
      //   reason: reason,
      //   error_count: error_count,
      // })
      message.success('Updated')
    }
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <div className="register-forget">
      {registerForDate && (
        <Modal
          width={'60%'}
          title="Register Forget Check-in/Check-out"
          visible={isRegisterForgetVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            ref={registerForgetForm}
            className="register-forget-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              register_for_date: registerForDate,
              // checkin: moment('08:00', format),
              // checkout: moment('17:00', format),
              checkin: moment('08:00', format),
              checkout: moment('17:00', format),
              reason: '',
            }}
            labelCol={{ sm: { span: 9 }, lg: { span: 6 }, md: { span: 7 } }}
            labelAlign={'left'}
          >
            <Form.Item label="Register for date:" name="register_for_date">
              <Input bordered={false} readOnly className="enableFocus" />
            </Form.Item>
            <Form.Item
              label="Checkin:"
              name="checkin"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TimePicker format={format} />
            </Form.Item>
            <div>{dataRegisterForget.checkin_original}</div>
            <Form.Item
              label="Checkout:"
              name="checkout"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TimePicker format={format} />
            </Form.Item>

            <span>{dataRegisterForget.checkout_original}</span>
            <Form.Item label="Special reason:" name="special_reason">
              <Checkbox.Group
                options={[
                  'Check-in not counted as error',
                  'Check-out not counted as error',
                ]}
              />
            </Form.Item>
            <Form.Item label="Reason:" name="reason">
              <Input.TextArea />
            </Form.Item>
            <div className="button">
              <Button
                type="primary"
                htmlType="submit"
                className={
                  dataRegisterForget.status === 0
                    ? ' register-button hide'
                    : 'register-button'
                }
              >
                Register
              </Button>

              {dataRegisterForget.status === 0 ? (
                <Button
                  className="update-button"
                  type="primary"
                  htmlType="submit"
                >
                  Update
                </Button>
              ) : (
                <></>
              )}
              <Button className="cancel" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default RegisterForget
