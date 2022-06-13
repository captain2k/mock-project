import { AutoComplete, Form, Input, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BANK_LIST } from '../../../services/apiBankList'
import { MESSAGE_REQUIRED } from '../../../utils/helpers/message'

const { Option } = Select

function FormFirstRight() {
  const [bankList, setBankList] = useState([])

  useEffect(() => {
    const getBankList = async () => {
      await axios.get(API_BANK_LIST).then((res) => {
        if (res) {
          const bankNameList = res?.data?.data?.map((item) => item.short_name)
          const bankNameListUnique = [...new Set(bankNameList)]
          const result = bankNameListUnique.map((bankName) => {
            return {
              value: bankName,
            }
          })
          setBankList(result)
        }
      })
    }
    getBankList()
  }, [])

  return (
    <Form.Item>
      <Form.Item label="Nick name" name="nick_name">
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Other email"
        name="other_email"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'email',
            message: 'Should be a email!',
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Skype"
        name="skype"
        rules={[
          {
            type: 'string',
            max: 30,
            message: "Can't be more than 30 digits",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item label="Facebook" name="facebook">
        <Input className="input-primary" />
      </Form.Item>
      <Form.Item
        label="Bank Name"
        name="bank_name"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
          {
            type: 'string',
            max: 70,
            message: "Can't be more than 70 digits!",
          },
        ]}
      >
        <AutoComplete
          className="input-primary"
          options={bankList}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        {/* <Input className="input-primary" /> */}
      </Form.Item>
      <Form.Item
        label="Bank Account"
        name="bank_account"
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
      <Form.Item
        label="Marital Status"
        name="marital_status"
        rules={[
          {
            required: true,
            message: MESSAGE_REQUIRED,
          },
        ]}
      >
        <Select>
          <Option value={1}>Single</Option>
          <Option value={2}>Married</Option>
          <Option value={3}>Divorced</Option>
          <Option value={4}>Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Academic Level"
        name="academic_level"
        rules={[
          {
            type: 'string',
            max: 50,
            message: "Can't be more than 50 digits!",
          },
        ]}
      >
        <Input className="input-primary" />
      </Form.Item>
    </Form.Item>
  )
}

export default FormFirstRight
