import { Button, DatePicker, Form, message, Radio, Select, Space } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getParams,
  getWorksheet,
  getWorksheetLoading,
  paramTimesheet,
} from '../../../store/reducer/worksheetSlice'
import { convertMomentToString } from '../../../utils/helpers/convertTime'

const { Option } = Select

const WorkSheetFilter = () => {
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfPreviousMonth = moment()
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD')
  const lastDayOfPreviousMonth = moment()
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD')
  const firstDayOfYear = moment().startOf('year').format('YYYY-MM-DD')
  const [form] = Form.useForm()
  const [radioValue, setRadioValue] = useState(1)
  const isLoading = useSelector(getWorksheetLoading)
  const dispatch = useDispatch()
  let paramTimesheetStore = useSelector(paramTimesheet)

  const handleSearch = (value) => {
    let { radio_filter, select_filter, ...newParam } = value
    if (radio_filter === 1) {
      if (select_filter === 1) {
        paramTimesheetStore = {
          ...paramTimesheetStore,
          ...newParam,
          start_date: firstDayOfRecentMonth,
          end_date: today,
          page: 1,
        }
      }
      if (select_filter === 2) {
        paramTimesheetStore = {
          ...paramTimesheetStore,
          ...newParam,
          start_date: firstDayOfPreviousMonth,
          end_date: lastDayOfPreviousMonth,
          page: 1,
        }
      }
      if (select_filter === 3) {
        paramTimesheetStore = {
          ...paramTimesheetStore,
          ...newParam,
          start_date: firstDayOfYear,
          end_date: today,
          page: 1,
        }
      }
      const { start_date, end_date, work_date, ...workByDateStore } =
        paramTimesheetStore
      if (select_filter === 4) {
        const { start_date, end_date, ...workByDate } = newParam
        paramTimesheetStore = { ...workByDate, ...workByDateStore, page: 1 }
      }
    }
    if (radio_filter === 2) {
      if (newParam.start_date.isAfter(newParam.end_date)) {
        message.warning('Invalid date')
        return
      }
      paramTimesheetStore = {
        ...paramTimesheetStore,
        ...newParam,
        start_date: convertMomentToString(value.start_date),
        end_date: convertMomentToString(value.end_date),
        page: 1,
      }
    }
    dispatch(getParams(paramTimesheetStore))
    dispatch(getWorksheet(paramTimesheetStore))
  }

  const handleReset = () => {
    form.resetFields()
    setRadioValue(1)
  }

  return (
    <>
      <fieldset>
        <legend>My Timesheet</legend>
        <div className="worksheet-filter-form">
          <Form
            form={form}
            initialValues={{
              radio_filter: 1,
              select_filter: 1,
              work_date: 'asc',
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
                      />
                    </Form.Item>
                    <span style={{ marginLeft: 20, marginRight: 20 }}>to</span>
                    <Form.Item name="end_date">
                      <DatePicker
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
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
                    <Option value={'asc'}>Ascending</Option>
                    <Option value={'desc'}>Descending</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="worksheet-filter-button">
              <Form.Item>
                <Space size="large">
                  <Button
                    loading={isLoading}
                    className="primary-button"
                    htmlType="submit"
                  >
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
    </>
  )
}
export default WorkSheetFilter
