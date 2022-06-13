import { Form, Input } from 'antd'
import React from 'react'
import { MESSAGE_REQUIRED } from '../../../utils/helpers/message'

function FormThirdRight() {
  return (
    <Form.Item>
      <Form.Item
        label="Emergency Contact Name"
        name="emergency_contact_name"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 70,
            message: "Can't more than 70 digits!",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Emergency Contact Relationship"
        name="emergency_contact_relationship"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 50,
            message: "Can't more than 50 digits!",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Emergency Contact Number"
        name="emergency_contact_number"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          () => ({
            validator(_, value) {
              if (isNaN(value)) {
                return Promise.reject('Should be number!')
              }
              if (value.length > 20) {
                return Promise.reject("Can't be more than 20 digits!")
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item label="Start Date" name="start_date_official">
        <Input readOnly className="input-primary" />
      </Form.Item>
    </Form.Item>
  )
}

export default FormThirdRight
