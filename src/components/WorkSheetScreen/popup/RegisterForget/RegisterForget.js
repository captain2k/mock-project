import { Button, Checkbox, Form, Input, message, Modal, TimePicker } from 'antd'
import moment from 'moment'
import { useRef } from 'react'
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
  let registerForDate
  let checkinForm
  let checkoutForm
  let reasonForm
  let specialReasonForm
  const status = dataRegisterForget.status
  const error_count = dataRegisterForget.error_count

  // Chưa gửi request
  if (status === undefined) {
    registerForDate = dataRegisterForget.work_date

    if (registerForDate) {
      registerForDate = registerForDate.slice(0, 10)
      registerForDate = registerForDate.split('/').join('-')
    }

    checkinForm = moment('08:00', format)
    checkoutForm = moment('17:00', format)
    reasonForm = ''
  }

  // Đã gửi request
  if (status === 0) {
    registerForDate = dataRegisterForget.request_for_date
    registerForDate = registerForDate.split('-').reverse().join('-')
    checkinForm = dataRegisterForget.checkin
    checkinForm = moment(checkinForm).format('HH:mm')
    checkinForm = moment(checkinForm, format)
    checkoutForm = dataRegisterForget.checkout
    checkoutForm = moment(checkoutForm).format('HH:mm')
    checkoutForm = moment(checkoutForm, format)
    reasonForm = dataRegisterForget.reason
    switch (error_count) {
      case 1:
        specialReasonForm = ['Check-in not counted as error']
        break
      case 2:
        specialReasonForm = ['Check-out not counted as error']
        break
      case 3:
        specialReasonForm = [
          'Check-in not counted as error',
          'Check-out not counted as error',
        ]
        break
      default:
        specialReasonForm = ['']
        break
    }
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
    request_for_date = request_for_date.split('-').reverse().join('-')
    let checkin = value.checkin.format('HH:mm')
    let checkout = value.checkout.format('HH:mm')
    let reason = value.reason
    let special_reason = value.special_reason
    let error_count
    if (special_reason === undefined) {
      error_count = 0
    } else {
      if (
        special_reason[0] === 'Check-in not counted as error' &&
        special_reason[1] === 'Check-out not counted as error'
      ) {
        error_count = 3
      } else if (special_reason[0] === 'Check-out not counted as error') {
        error_count = 2
      } else if (special_reason[0] === 'Check-in not counted as error') {
        error_count = 1
      }
    }

    if (status === undefined) {
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
    if (status === 0) {
      axiosPrivate.put('/worksheet/request/forget/update', {
        request_for_date: request_for_date,
        checkin: checkin,
        checkout: checkout,
        reason: reason,
        error_count: error_count,
      })
      message.success('Updated')
    }
    setIsRegisterForgetVisible(false)
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
              registration_date: moment(new Date()).format('DD-MM-YYYY HH:mm '),
              register_for_date: registerForDate,
              checkin: checkinForm,
              checkout: checkoutForm,
              reason: reasonForm,
              special_reason: specialReasonForm,
            }}
            labelCol={{ sm: { span: 9 }, lg: { span: 6 }, md: { span: 7 } }}
            labelAlign={'left'}
          >
            <Form.Item label="Registration date" name="registration_date">
              <Input className="enableFocus" bordered={false} />
            </Form.Item>
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
            <div className="checkin-oringinal">
              {`( ${dataRegisterForget.checkin_original} )`}
            </div>
            <Form.Item
              label="Checkout:"
              name="checkout"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TimePicker format={format} />
            </Form.Item>

            <div className="checkout-original">
              {`( ${dataRegisterForget.checkout_original} )`}
            </div>
            <Form.Item label="Special reason:" name="special_reason">
              <Checkbox.Group
                options={[
                  {
                    label: 'Check-in not counted as error',
                    value: 'Check-in not counted as error',
                  },
                  {
                    label: 'Check-out not counted as error',
                    value: 'Check-out not counted as error',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Reason:" name="reason">
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 7 }} />
            </Form.Item>
            <div className="button">
              <Button
                htmlType="submit"
                className={
                  status === 0 || status === 1 || status === 2
                    ? ' primary-button hide'
                    : 'primary-button'
                }
              >
                Register
              </Button>

              {status === 0 ? (
                <Button className="primary-button" htmlType="submit">
                  Update
                </Button>
              ) : (
                <></>
              )}
              <Button
                className="cancel outline-primary-button"
                onClick={handleCancel}
              >
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
