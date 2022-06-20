import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, Divider, Table } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getLastPage,
  getParams,
  getWorksheetData,
  getWorksheetTotal,
  isFirstLoad,
  paramTimesheet,
  worksheetPagination,
} from '../../../store/reducer/worksheetSlice'
import { handleWorksheetTableData } from '../../../utils/helpers/handleTableData'
import useAxiosPrivate from '../../../utils/requests/useAxiosPrivate'
import LateEarly from '../popup/LateEarly/LateEarly'
import Leave from '../popup/Leave/Leave'
import RegisterForget from '../popup/RegisterForget/RegisterForget'
import TimeLog from '../TimeLog/TimeLog'

const TableWorksheet = () => {
  const worksheetData = useSelector(getWorksheetData)
  const paramTimesheetStore = useSelector(paramTimesheet)
  const [isLateEarlyVisible, setIsLateEarlyVisible] = useState(false)
  const [dataLateEarly, setDataLateEarly] = useState({})
  const [isLeaveVisible, setIsLeaveVisible] = useState(false)
  const [dataLeave, setDataLeave] = useState({})
  const [isRegisterForgetVisible, setIsRegisterForgetVisible] = useState(false)
  const [dataRegisterForget, setDataRegisterForget] = useState({})
  const [isShowTimeLog, setIsShowTimeLog] = useState(false)
  const [date, setDate] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const axiosPrivate = useAxiosPrivate()
  const totalRecordStore = useSelector(getWorksheetTotal)
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const [firstDataWorksheet, setFirstDataWorksheet] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const isFirstLoading = useSelector(isFirstLoad)
  const currentPageStore = useSelector(getCurrentPage)
  const lastPageStore = useSelector(getLastPage)
  const [pageSize, setPageSize] = useState(30)
  const dispatch = useDispatch()

  useEffect(() => {
    const getFirstData = async () => {
      const res = await axiosPrivate('/worksheet/my-timesheet', {
        params: {
          end_date: today,
          start_date: firstDayOfRecentMonth,
          work_date: 'asc',
          page: 1,
          per_page: 30,
        },
      })
      const { current_page, per_page, total, data } = res.data.worksheet
      setFirstDataWorksheet(
        handleWorksheetTableData(
          data,
          current_page,
          per_page,
          total,
          res.config.params.work_date,
        ),
      )
      setTotalRecord(res.data.worksheet.total)
    }
    getFirstData()
  }, [axiosPrivate, today, firstDayOfRecentMonth])

  useEffect(() => {
    if (currentPage !== 1) return
    dispatch(
      worksheetPagination({
        ...paramTimesheetStore,
        per_page: pageSize,
        page: currentPage,
      }),
    )
  }, [pageSize, currentPage, paramTimesheetStore, dispatch])

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
      width: '180px',
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '250px',
      render: (text, record, index) => {
        return (
          <div>
            <span onClick={() => showRegisterForget(record)}>Forget</span>
            <Divider type="vertical" />
            <span onClick={() => handleLateEarly(record.key)}>Late/Early</span>
            <Divider type="vertical" />
            <span onClick={() => handleLeave(record.key)}>Leave</span>
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

  const getDataLeaveByID = async (id) => {
    const res = await axiosPrivate.get(`/worksheet/${id}`, {
      params: {
        type: 3,
      },
    })
    setDataLeave(res.data)
  }
  const handleLateEarly = (id) => {
    getDataByID(id)
    setIsLateEarlyVisible(true)
  }

  const handleLeave = (id) => {
    getDataLeaveByID(id)
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
      onDoubleClick: () => {
        getDate(record.work_date)
        setIsShowTimeLog(true)
      },
    }
  }

  const handleHighlight = (record, index) => {
    const weekend = record.work_date.slice(11)
    if (weekend.includes('Sat') || weekend.includes('Sun')) {
      return 'bg-color-yellow'
    }
    return ''
  }

  const onShowSizeChange = (current, page) => {
    setPageSize(page)
    dispatch(
      getParams({
        ...paramTimesheetStore,
        per_page: page,
      }),
    )
  }

  const handlePagination = (page, pageSize) => {
    dispatch(
      worksheetPagination({
        ...paramTimesheetStore,
        per_page: pageSize,
        page: page,
      }),
    )
    setCurrentPage(page)
  }

  return (
    <>
      <div className="worksheet-table">
        <Table
          rowClassName={handleHighlight}
          dataSource={isFirstLoading ? firstDataWorksheet : worksheetData}
          columns={columns}
          bordered
          onRow={handleTimeLog}
          scroll={{ y: 240 }}
          pagination={{
            className: 'custom-pagination',
            position: ['bottomCenter', 'topCenter'],
            locale: { items_per_page: '' },
            pageSizeOptions: ['30', '50', '100'],
            pageSize: pageSize,
            current: currentPageStore,
            showSizeChanger: true,
            total: isFirstLoading ? totalRecord : totalRecordStore,
            showTotal: (total) => `Totals number of records: ${total}`,
            onChange: handlePagination,
            onShowSizeChange: onShowSizeChange,
            itemRender: (_, type, element) => {
              if (type === 'prev') {
                return (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        dispatch(
                          worksheetPagination({
                            ...paramTimesheetStore,
                            page: 1,
                          }),
                        )
                      }}
                    >
                      <DoubleLeftOutlined />
                    </Button>
                    <Button>
                      <LeftOutlined />
                    </Button>
                  </>
                )
              }
              if (type === 'next') {
                return (
                  <>
                    <Button>
                      <RightOutlined />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        dispatch(
                          worksheetPagination({
                            ...paramTimesheetStore,
                            page: lastPageStore,
                          }),
                        )
                      }}
                    >
                      <DoubleRightOutlined />
                    </Button>
                  </>
                )
              }
              return element
            },
          }}
        />
      </div>

      <LateEarly
        data={dataLateEarly}
        isLateEarlyVisible={isLateEarlyVisible}
        setIsLateEarlyVisible={setIsLateEarlyVisible}
      />

      <Leave
        isLeaveVisible={isLeaveVisible}
        data={dataLeave}
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
