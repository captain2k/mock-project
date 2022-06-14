import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { Button, Pagination, Select } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getWorksheet } from '../../store/reducer/worksheetSlice'
import TableWorksheet from './TableWorksheet/TableWorksheet'
import WorkSheetFilter from './WorksheetFilter/WorksheetFilter'
import './WorkSheetScreen.scss'

const { Option } = Select

const WorkSheet = () => {
  const today = moment().format('YYYY-MM-DD')
  const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(30)

  const dispatch = useDispatch()

  useEffect(() => {
    const paramTimesheet = {
      start_date: firstDayOfRecentMonth,
      end_start: today,
      work_date: 'asc',
      page: 1,
      per_page: 30,
    }
    dispatch(getWorksheet(paramTimesheet))
  }, [dispatch, firstDayOfRecentMonth, today])

  const handlePaginate = (page) => {
    setPage(page)
  }

  return (
    <div className="worksheet">
      <div className="worksheet-filter">
        <WorkSheetFilter page={page} perPage={perPage} />
      </div>
      <div className="worksheet-per-page">
        <h3>Totals number of records:0</h3>
        <div className="per-page-select">
          <label>Items per page</label>
          <Select defaultValue={30} onChange={(value) => setPerPage(value)}>
            <Option value={30}>30</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
        </div>
      </div>
      <div className="worksheet-table">
        <TableWorksheet />
      </div>
      <div className="worksheet-pagination">
        <div className="worksheet-pagination-wrap">
          <Button
            disabled={page === 1}
            className="outline-secondary-button mr-12"
          >
            <DoubleLeftOutlined />
          </Button>
          <Pagination onChange={handlePaginate} />
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
