import { DatePicker } from 'antd'
import './Request.scss'
const Request = () => {
  const { RangePicker } = DatePicker
  return (
    <div className="request">
      <RangePicker size="small" />
      <div className="list-request"></div>
    </div>
  )
}

export default Request
