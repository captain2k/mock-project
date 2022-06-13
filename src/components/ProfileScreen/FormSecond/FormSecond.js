import { Form, Input } from 'antd'
import React from 'react'
import { MESSAGE_REQUIRED } from '../../../utils/helpers/message'
function FormSecond() {
  return (
    <Form.Item>
      <Form.Item
        label="Permanent Address"
        name="permanent_address"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 255,
            message: "Can't be more than 255 digits!",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Temporary Address"
        name="temporary_address"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 255,
            message: "Can't be more than 255 digits!",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
    </Form.Item>
  )
}

export default FormSecond
