import { Button, Checkbox, Form, Input, Modal, TimePicker } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import MESSAGE_REQUIRED from '../../../common/message'
import './RegisterForget.scss'
function RegisterForget() {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const registrationDate = moment(new Date()).format('DD-MM-YYYY HH:mm')
  const registerForDate = moment(new Date()).format('DD-MM-YYYY')
  const format = 'HH:mm'
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <Modal
        width={'60%'}
        title="Register Forget Check-in/Check-out"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          className="register-forget"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            registration_date: registrationDate,
            register_for_date: registerForDate,
            checkin: moment('08:00', format),
            checkout: moment('17:00', format),
          }}
          labelCol={{ sm: { span: 9 }, lg: { span: 6 }, md: { span: 7 } }}
          labelAlign={'left'}
        >
          <Form.Item label="Registration date:" name="registration_date">
            <Input bordered={false} readOnly />
          </Form.Item>
          <Form.Item label="Register for date:" name="register_for_date">
            <Input bordered={false} readOnly />
          </Form.Item>
          <Form.Item
            label="Checkin:"
            name="checkin"
            rules={[{ required: true, message: MESSAGE_REQUIRED }]}
          >
            <TimePicker format={format} />
          </Form.Item>
          <Form.Item
            label="Checkout:"
            name="checkout"
            rules={[{ required: true, message: MESSAGE_REQUIRED }]}
          >
            <TimePicker format={format} />
          </Form.Item>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default RegisterForget
