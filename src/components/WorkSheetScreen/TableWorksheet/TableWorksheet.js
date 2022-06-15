import { Divider, Table } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWorksheetData } from '../../../store/reducer/worksheetSlice'
import changeFormatDate from '../../../utils/helpers/handleTime/changeFormatDate'
import useAxiosPrivate from '../../../utils/requests/useAxiosPrivate'
import LateEarly from '../popup/LateEarly/LateEarly'
import Leave from '../popup/Leave/Leave'
import TimeLog from '../TimeLog/TimeLog'

const TableWorksheet = () => {
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const worksheetData = useSelector(getWorksheetData)
  const [isLateEarlyVisible, setIsLateEarlyVisible] = useState(false)
  const [isLeaveVisible, setIsLeaveVisible] = useState(false)
  const [isShowTimeLog, setIsShowTimeLog] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [date, setDate] = useState()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const firstGetDate = async () => {
      const res = await axiosPrivate.get(`/worksheet/my-timesheet`, {
        params: {
          start_date: firstDayOfRecentMonth,
          end_start: today,
          work_date: 'asc',
          page: 1,
          per_page: 30,
        },
      })
      setDataSource(res.data.worksheet.data)
    }

    firstGetDate()
  }, [axiosPrivate, firstDayOfRecentMonth, today])

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
      render: () => {
        return (
          <div className="flex">
            <span>Forget</span>
            <Divider type="vertical" />
            <span onClick={showLateEarly}>Late/Early</span>
            <Divider type="vertical" />
            <span onClick={showLeave}>Leave</span>
            <Divider type="vertical" />
            <span>OT</span>
          </div>
        )
      },
    },
  ]

  const showLateEarly = () => {
    setIsLateEarlyVisible(true)
  }

  const showLeave = () => {
    setIsLeaveVisible(true)
  }

  const getDate = (date) => {
    setDate(date)
  }

  const handleTimeLog = (record, index) => {
    return {
      onDoubleClick: () => {
        getDate(record.work_date)
        setIsShowTimeLog(true)
      },
    }
  }

  const handleHighlight = (record, index) => {
    const formatDate = changeFormatDate(record.work_date.slice(0, 10))
    if (moment(formatDate).day() === 0 || moment(formatDate).day() === 6) {
      return 'bg-color-yeloww'
    }
    return ''
  }

  return (
    <>
      <Table
        rowClassName={handleHighlight}
        dataSource={dataSource.length > 0 ? dataSource : worksheetData}
        columns={columns}
        bordered
        pagination={false}
        onRow={handleTimeLog}
      />
      <LateEarly
        isLateEarlyVisible={isLateEarlyVisible}
        setIsLateEarlyVisible={setIsLateEarlyVisible}
      />

      <Leave
        isLeaveVisible={isLeaveVisible}
        setIsLeaveVisible={setIsLeaveVisible}
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
