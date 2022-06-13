import { DatePicker, Form, Input, Select } from 'antd'
import { MESSAGE_REQUIRED } from '../../../utils/helpers/message'

const { Option } = Select

function FormFirstLeft() {
  return (
    <Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <Select className="selectPrimary">
          <Option value={0}>Female</Option>
          <Option value={1}>Male</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Birth Date"
        name="birth_date"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        label="Identity Number"
        name="identity_number"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          () => ({
            validator(_, value) {
              if (value?.length > 12) {
                return Promise.reject("Can't be more than 12 digits")
              }
              if (isNaN(value)) {
                return Promise.reject('Should be number!')
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Date of issue identity"
        name="identity_card_date"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        label="Place of Issue Identity"
        name="identity_card_place"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          () => ({
            validator(_, value) {
              if (value?.length > 50) {
                return Promise.reject("Can't be more than 50 digits")
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Passport number"
        name="passport_number"
        rules={[
          {
            type: 'string',
            max: 20,
            message: "Can't be more than 20 digits",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item label="Passport Expiration" name="passport_expiration">
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        label="Nationality"
        name="nationality"
        rules={[
          {
            required: true,
            message: 'Required',
          },
          {
            type: 'string',
            max: 50,
            message: "Can't be more than 50 digits",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
    </Form.Item>
  )
}

export default FormFirstLeft
