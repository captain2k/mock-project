import {
  Button,
  DatePicker,
  Divider,
  Form,
  Pagination,
  Radio,
  Select,
  Space,
  Table,
} from 'antd'
import React, { useState } from 'react'
import './workSheetScreen.scss'

const { Option } = Select

const WorkSheet = () => {
  const [radioValue, setRadioValue] = useState(1)
  const [dateTest, setDateTest] = useState()
  const [form] = Form.useForm()

  const dataSource = []
  for (let i = 0; i < 10; i++) {
    dataSource.push({
      key: i,
      id: i,
      date: '27/03/2000 Mon',
      check_in: '08:00',
      check_out: '17:30',
      late: '',
      early: '',
      in_office: '09:30',
      ot: '',
      work_time: '08:00',
      lack: '00:08',
      comp: '',
      pleave: '',
      uleave: '',
      note: 'Leave:Confirm',
      action: (
        <div className="flex">
          <span>Forget</span>
          <Divider type="vertical" />
          <span>Late</span>/<span>Early</span>
          <Divider type="vertical" />
          <span>Leave</span>
        </div>
      ),
    })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Check-in',
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: 'Check-out',
      dataIndex: 'check_out',
      key: 'check_out',
    },
    {
      title: 'Late',
      dataIndex: 'late',
      key: 'late',
    },
    {
      title: 'Early',
      dataIndex: 'early',
      key: 'early',
    },
    {
      title: 'In Office',
      dataIndex: 'in_office',
      key: 'in_office',
    },
    {
      title: 'OT',
      dataIndex: 'ot',
      key: 'ot',
    },
    {
      title: 'Work time',
      dataIndex: 'work_time',
      key: 'work_time',
    },
    {
      title: 'Lack',
      dataIndex: 'lack',
      key: 'lack',
    },
    {
      title: 'Comp',
      dataIndex: 'comp',
      key: 'comp',
    },
    {
      title: 'PLeave',
      dataIndex: 'pleave',
      key: 'pleave',
    },
    {
      title: 'ULeave',
      dataIndex: 'uleave',
      key: 'uleave',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ]

  const handleChange = (date, dateString) => {}

  const handleSearch = (value) => {
    console.log(value)
  }

  const handleReset = () => {
    form.resetFields()
    setRadioValue(1)
  }

  return (
    <div className="worksheet">
      <div className="worksheet-filter">
        <fieldset>
          <legend>My Timesheet</legend>
          <div className="worksheet-filter-form">
            <Form
              form={form}
              initialValues={{
                radio_filter: 1,
                select_filter: 1,
                work_date: 0,
              }}
              onFinish={handleSearch}
            >
              <div className="worksheet-filter-wrap">
                <div className="worksheet-filter-left">
                  <div className="worksheet-filter-left-radio">
                    <Form.Item name="radio_filter">
                      <Radio.Group
                        onChange={(e) => setRadioValue(e.target.value)}
                        value={radioValue}
                      >
                        <Space direction="vertical" size={32}>
                          <Radio value={1}>Choose from list</Radio>
                          <Radio value={2}>Choose start, end</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="worksheet-filter-left-by-month">
                    <Form.Item name="select_filter">
                      <Select disabled={radioValue !== 1}>
                        <Option value={1}>This month</Option>
                        <Option value={2}>Last month</Option>
                        <Option value={3}>This year</Option>
                        <Option value={4}>All</Option>
                      </Select>
                    </Form.Item>
                    <div className="worksheet-filter-left-by-day">
                      <Form.Item name="start_date">
                        <DatePicker
                          placeholder="DD/MM/YYYY"
                          format="DD/MM/YYYY"
                          disabled={radioValue === 1}
                          onChange={handleChange}
                        />
                      </Form.Item>
                      <span style={{ marginLeft: 20, marginRight: 20 }}>
                        to
                      </span>
                      <Form.Item name="end_start">
                        <DatePicker
                          placeholder="DD/MM/YYYY"
                          disabled={radioValue === 1}
                          disabledDate={(d) => d.isAfter(new Date())}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="worksheet-filter-right">
                  <Form.Item label="Sort by work date" name="work_date">
                    <Select>
                      <Option value={0}>Ascending</Option>
                      <Option value={1}>Descending</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="worksheet-filter-button">
                <Form.Item>
                  <Space size="large">
                    <Button className="primary-button" htmlType="submit">
                      Search
                    </Button>
                    <Button
                      className="outline-secondary-button"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Form>
          </div>
        </fieldset>
      </div>
      <div className="worksheet-per-page">
        <h3>Totals number of records: 30</h3>
        <div className="per-page-select">
          <label>Items per page</label>
          <Select defaultValue={30}>
            <Option value={30}>30</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
        </div>
      </div>
      <div className="worksheet-table">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
      <div className="worksheet-pagination">
        <Pagination total={85} showSizeChanger showQuickJumper />
      </div>
    </div>
  )
}

export default WorkSheet
