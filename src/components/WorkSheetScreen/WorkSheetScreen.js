import TableWorksheet from './TableWorksheet/TableWorksheet'
import WorkSheetFilter from './WorksheetFilter/WorksheetFilter'
import './WorkSheetScreen.scss'

const WorkSheet = () => {
  return (
    <div className="worksheet">
      <div className="worksheet-filter">
        <WorkSheetFilter />
      </div>

      <TableWorksheet />
    </div>
  )
}

export default WorkSheet
