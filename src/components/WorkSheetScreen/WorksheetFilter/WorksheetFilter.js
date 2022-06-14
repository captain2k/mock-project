import { Button, DatePicker, Form, Radio, Select, Space } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getWorksheet,
  getWorksheetLoading,
} from '../../../store/reducer/worksheetSlice'
import { convertMomentToString } from '../../../utils/helpers/convertTime'

const { Option } = Select

const WorkSheetFilter = ({ page, perPage }) => {
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

  const handleSearch = (value) => {
    console.log(page, perPage)
    let { radio_filter, select_filter, ...newParam } = value
    let paramTimesheet
    if (radio_filter === 1) {
      if (select_filter === 1) {
        paramTimesheet = {
          ...newParam,
          start_date: firstDayOfRecentMonth,
          end_start: today,
          page: page,
          per_page: perPage,
        }
      }
      if (select_filter === 2) {
        paramTimesheet = {
          ...newParam,
          start_date: firstDayOfPreviousMonth,
          end_start: lastDayOfPreviousMonth,
          page: page,
          per_page: perPage,
        }
      }
      if (select_filter === 3) {
        paramTimesheet = {
          ...newParam,
          start_date: firstDayOfYear,
          end_start: today,
          page: page,
          per_page: perPage,
        }
      }
      if (select_filter === 4) {
        const { start_date, end_start, ...workByDate } = newParam
        paramTimesheet = { ...workByDate, page: page, per_page: perPage }
      }
    }
    if (radio_filter === 2) {
      console.log(convertMomentToString(value.start_date))
      console.log(value.start_date)
      console.log({
        ...newParam,
        start_date: convertMomentToString(value.start_date),
        end_start: convertMomentToString(value.end_start),
      })
    }
    console.log(paramTimesheet)
    dispatch(getWorksheet(paramTimesheet))
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
                    <Form.Item
                      name="start_date"
                      rules={[
                        {
                          pattern: new RegExp(
                            /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])dd$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)*$)/,
                          ),
                          message: 'DD/MM/YYYY',
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        disabled={radioValue === 1}
                        // onChange={handleChange}
                      />
                    </Form.Item>
                    <span style={{ marginLeft: 20, marginRight: 20 }}>to</span>
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
                    className="primary-button"
                    htmlType="submit"
                    loading={isLoading}
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
