import { Divider, Table } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getWorksheetData } from '../../../store/reducer/worksheetSlice'
import LateEarly from '../popup/LateEarly/LateEarly'
import Leave from '../popup/Leave/Leave'

const TableWorksheet = () => {
  const worksheetData = useSelector(getWorksheetData)
  const [isLateEarlyVisible, setIsLateEarlyVisible] = useState(false)
  const [isLeaveVisible, setIsLeaveVisible] = useState(false)
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

  return (
    <>
      <Table
        rowClassName={handleHighlight}
        dataSource={worksheetData}
        columns={columns}
        bordered
        pagination={false}
      />
      <LateEarly
        isLateEarlyVisible={isLateEarlyVisible}
        setIsLateEarlyVisible={setIsLateEarlyVisible}
      />

      <Leave
        isLeaveVisible={isLeaveVisible}
        setIsLeaveVisible={setIsLeaveVisible}
      />
    </>
  )
}

export default TableWorksheet
