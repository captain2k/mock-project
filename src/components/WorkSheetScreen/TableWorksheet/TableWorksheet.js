import { Divider, Select, Table } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getWorksheetData,
  getWorksheetTotal,
  isFirstLoad,
} from '../../../store/reducer/worksheetSlice'
import { handleWorksheetTableData } from '../../../utils/helpers/handleTableData'
import useAxiosPrivate from '../../../utils/requests/useAxiosPrivate'
import LateEarly from '../popup/LateEarly/LateEarly'
import Leave from '../popup/Leave/Leave'
import RegisterForget from '../popup/RegisterForget/RegisterForget'
import TimeLog from '../TimeLog/TimeLog'

const { Option } = Select

const TableWorksheet = () => {
  const worksheetData = useSelector(getWorksheetData)
  const [isLateEarlyVisible, setIsLateEarlyVisible] = useState(false)
  const [dataLateEarly, setDataLateEarly] = useState()
  const [isLeaveVisible, setIsLeaveVisible] = useState(false)
  const [isRegisterForgetVisible, setIsRegisterForgetVisible] = useState(false)
  const [dataRegisterForget, setDataRegisterForget] = useState({})
  const [isShowTimeLog, setIsShowTimeLog] = useState(false)
  const [date, setDate] = useState()
  // const [perPage, setPerPage] = useState(30)
  const axiosPrivate = useAxiosPrivate()
  const totalRecordStore = useSelector(getWorksheetTotal)
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const [firstDataWorksheet, setFirstDataWorksheet] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const isFirstLoading = useSelector(isFirstLoad)
  useEffect(() => {
    const getFirstData = async () => {
      const res = await axiosPrivate('/worksheet/my-timesheet', {
        params: {
          end_date: today,
          start_date: firstDayOfRecentMonth,
          work_date: 'asc',
          page: 1,
        },
      })
      setFirstDataWorksheet(handleWorksheetTableData(res.data.worksheet.data))
      setTotalRecord(res.data.worksheet.total)
    }
    getFirstData()
  }, [axiosPrivate, today, firstDayOfRecentMonth])

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
      render: (late) => {
        if (late) {
          return <span className="color-red">{late}</span>
        } else {
          return ''
        }
      },
    },
    {
      title: 'Early',
      dataIndex: 'early',
      key: 'early',
      render: (early) => {
        if (early) {
          return <span className="color-red">{early}</span>
        } else {
          return ''
        }
      },
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
      render: (text, record, index) => {
        return (
          <div className="flex">
            <span onClick={() => showRegisterForget(record)}>Forget</span>
            <Divider type="vertical" />
            <span onClick={() => handleLateEarly(record.key)}>Late/Early</span>
            <Divider type="vertical" />
            <span onClick={showLeave}>Leave</span>
            <Divider type="vertical" />
            <span>OT</span>
          </div>
        )
      },
    },
  ]

  const getDataByID = async (id) => {
    const res = await axiosPrivate.get(`/worksheet/${id}`, {
      params: {
        type: 4,
      },
    })
    setDataLateEarly(res.data)
  }

  const handleLateEarly = (id) => {
    getDataByID(id)
    setIsLateEarlyVisible(true)
  }

  const showLeave = () => {
    setIsLeaveVisible(true)
  }

  const showRegisterForget = (data) => {
    const id = data.key
    axiosPrivate
      .get(`worksheet/${id}?type=1`)
      .then((res) => res.data)
      .then((dataAPI) => {
        if (dataAPI.status === undefined) {
          setDataRegisterForget(data)
        }
        if (dataAPI.status === 0) {
          const checkin_original = data.checkin_original
          const checkout_original = data.checkout_original
          setDataRegisterForget({
            ...dataAPI,
            checkin_original,
            checkout_original,
          })
        }
      })
      .then(() => setIsRegisterForgetVisible(true))
  }

  const getDate = (date) => {
    setDate(date)
  }

  const handleTimeLog = (record, index) => {
    return {
      onClick: () => {
        getDate(record.work_date)
        setIsShowTimeLog(true)
      },
    }
  }

  const handleHighlight = (record, index) => {}
  return (
    <>
      <div className="worksheet-per-page">
        <h3>{`Totals number of records: ${
          isFirstLoading ? totalRecord : totalRecordStore
        }`}</h3>
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
          dataSource={isFirstLoading ? firstDataWorksheet : worksheetData}
          columns={columns}
          bordered
          pagination={false}
          onRow={handleTimeLog}
        />
      </div>

      <LateEarly
        data={dataLateEarly}
        isLateEarlyVisible={isLateEarlyVisible}
        setIsLateEarlyVisible={setIsLateEarlyVisible}
      />

      <Leave
        isLeaveVisible={isLeaveVisible}
        setIsLeaveVisible={setIsLeaveVisible}
      />

      <RegisterForget
        dataRegisterForget={dataRegisterForget}
        setDataRegisterForget={setDataRegisterForget}
        isRegisterForgetVisible={isRegisterForgetVisible}
        setIsRegisterForgetVisible={setIsRegisterForgetVisible}
      />
      <TimeLog
        isShowTimeLog={isShowTimeLog}
        setIsShowTimeLog={setIsShowTimeLog}
        date={date}
      />
    </>
  )
}

export default TableWorksheet
