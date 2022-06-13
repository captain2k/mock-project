import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
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
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWorksheetLoading } from '../../store/reducer/worksheetSlice'
import {
  convertDateTimeToTime,
  convertDayToShortDay,
  convertMomentToString,
} from '../../utils/helpers/convertTime'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'
import './workSheetScreen.scss'

const { Option } = Select

const WorkSheet = () => {
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const firstDayOfPreviousMonth = moment()
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD')
  const lastDayOfPreviousMonth = moment()
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD')
  const firstDayOfYear = moment().startOf('year').format('YYYY-MM-DD')

  const axiosPrivate = useAxiosPrivate()
  const [radioValue, setRadioValue] = useState(1)
  const [paramTimesheet, setParamTimesheet] = useState({
    start_date: firstDayOfRecentMonth,
    end_start: today,
    work_date: 'asc',
  })
  const [worksheetDataTable, setWorksheetDataTable] = useState([])
  const [page, setPage] = useState(1)
  const [totalItem, setTotalItem] = useState(0)
  // const dispatch = useDispatch()
  // const worksheetData = useSelector(getWorksheetData)
  let isLoading = useSelector(getWorksheetLoading)
  const [form] = Form.useForm()

  useEffect(() => {
    const getDataWorksheet = async () => {
      const res = await axiosPrivate.get('/worksheet/my-timesheet', {
        params: { ...paramTimesheet, page: page, per_page: 10 },
      })
      setTotalItem(res.data.worksheet.total)
      let result = res.data.worksheet.data.map((item) => {
        return {
          key: item.id,
          id: item.id,
          work_date: convertDayToShortDay(item.work_date),
          checkin: item.checkin
            ? convertDateTimeToTime(item.checkin)
            : convertDateTimeToTime(item.checkin_original),
          checkout: item.checkout
            ? convertDateTimeToTime(item.checkout)
            : convertDateTimeToTime(item.checkout_original),
          late: item.late,
          early: item.early,
          in_office: item.in_office,
          ot_time: item.ot_time,
          work_time: item.work_time,
          lack: item.lack,
          compensation: item.compensation,
          paid_leave: item.paid_leave,
          unpaid_leave: item.unpaid_leave,
          note: item.note,
          checkin_original: convertDateTimeToTime(item.checkin_original),
          checkout_original: convertDateTimeToTime(item.checkout_original),
          action: (
            <div className="flex">
              <span>Forget</span>
              <Divider type="vertical" />
              <span>Late</span>/<span>Early</span>
              <Divider type="vertical" />
              <span>Leave</span>
            </div>
          ),
        }
      })
      result.push({
        key: 27,
        id: 27,
        work_date: '27/03/2000|Mon',
        checkin: '27:03',
        checkout: '',
        late: '27:03',
        early: '27:03',
        in_office: '27:03',
        ot_time: '27:03',
        work_time: '27:03',
        lack: '27:03',
        compensation: '27:03',
        paid_leave: '27:03',
        unpaid_leave: '27:03',
        note: '27:03',
        checkin_original: '27:03',
        checkout_original: '27:03',
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
      setWorksheetDataTable(result)
    }
    getDataWorksheet()
    // dispatch(getWorksheet(paramTimesheet))
  }, [paramTimesheet, axiosPrivate, page, totalItem])

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'work_date',
      key: 'work_date',
      width: '20%',
    },
    {
      title: 'Check-in',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Check-out',
      dataIndex: 'checkout',
      key: 'checkout',
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
      dataIndex: 'ot_time',
      key: 'ot_time',
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
      dataIndex: 'compensation',
      key: 'compensation',
    },
    {
      title: 'PLeave',
      dataIndex: 'paid_leave',
      key: 'paid_leave',
    },
    {
      title: 'ULeave',
      dataIndex: 'unpaid_leave',
      key: 'unpaid_leave',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: '60%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ]

  const handleChange = (date, dateString) => {
    console.log(date)
    // setStartDate(date)
  }

  const handleSearch = (value) => {
    setPage(1)
    let { radio_filter, select_filter, ...newParam } = value
    if (radio_filter === 1) {
      if (select_filter === 1) {
        setParamTimesheet({
          ...newParam,
          start_date: firstDayOfRecentMonth,
          end_start: today,
        })
      }
      if (select_filter === 2) {
        setParamTimesheet({
          ...newParam,
          start_date: firstDayOfPreviousMonth,
          end_start: lastDayOfPreviousMonth,
        })
      }
      if (select_filter === 3) {
        setParamTimesheet({
          ...newParam,
          start_date: firstDayOfYear,
          end_start: today,
        })
      }
      if (select_filter === 4) {
        const { start_date, end_start, ...noParam } = newParam
        setParamTimesheet(noParam)
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
  }

  const handleReset = () => {
    form.resetFields()
    setRadioValue(1)
  }

  const handleHighlight = (record) => {
    let color
    if (!record.checkin) {
      color = 'color-red-late'
    }
    if (!record.checkout) {
      color = 'color-red-early'
    }
    if (!record.checkin && !record.checkout) {
      color = 'color-red-late color-red-early'
    }
    return color
  }

  const handlePaginate = (page) => {
    setPage(page)
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
      </div>
      <div className="worksheet-per-page">
        <h3>Totals number of records: {totalItem}</h3>
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
          rowClassName={handleHighlight}
          dataSource={worksheetDataTable}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
      <div className="worksheet-pagination">
        <div className="worksheet-pagination-wrap">
          <Button
            disabled={page === 1}
            className="outline-secondary-button mr-12"
          >
            <DoubleLeftOutlined />
          </Button>
          <Pagination onChange={handlePaginate} total={totalItem} />
          <Button
            // disabled={page === totalItem / 10}
            className="outline-secondary-button ml-12"
          >
            <DoubleRightOutlined />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WorkSheet
