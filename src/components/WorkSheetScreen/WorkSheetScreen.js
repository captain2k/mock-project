import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import { useState } from 'react'
import TableWorksheet from './TableWorksheet/TableWorksheet'
import WorkSheetFilter from './WorksheetFilter/WorksheetFilter'
import './WorkSheetScreen.scss'

const WorkSheet = () => {
  const [page, setPage] = useState(1)

  const handlePaginate = (page) => {
    setPage(page)
  }

  return (
    <div className="worksheet">
      <div className="worksheet-filter">
        <WorkSheetFilter page={page} />
      </div>

      <TableWorksheet />
      <div className="worksheet-pagination">
        <div className="worksheet-pagination-wrap">
          <Button
            disabled={page === 1}
            className="outline-secondary-button mr-12"
          >
            <DoubleLeftOutlined />
          </Button>
          <Pagination onChange={handlePaginate} total={30} />
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
