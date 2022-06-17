import { Button, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import {
  convertDateTimeToTime,
  convertDayToShortDay,
} from '../../../utils/helpers/convertTime'
import useAxiosPrivate from '../../../utils/requests/useAxiosPrivate'

const TimeLog = ({ isShowTimeLog, setIsShowTimeLog, date }) => {
  const [timeLog, setTimeLog] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    if (date) {
      const dateCutDay = date.slice(0, 10)
      const dateForm = dateCutDay.split('/').reverse().join('-')
      const getResource = async () => {
        const res = await axiosPrivate.get(
          `/worksheet/checkLogs?date=${dateForm}`,
        )
        if (res) {
          const dataSource = res.data.time_logs?.map((item, index) => {
            let checkTimeFormat = convertDateTimeToTime(item.checktime)
            let dateFormat = convertDayToShortDay(item.date)
            return {
              ...item,
              key: item.id,
              checktime: checkTimeFormat,
              date: dateFormat,
              no: index + 1,
            }
          })
          setTimeLog(dataSource)
        }
      }
      getResource()
    }
  }, [date, axiosPrivate])

  const columns = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Checktime',
      dataIndex: 'checktime',
      key: 'checktime',
    },
  ]

  return (
    <>
      <Modal
        width={750}
        visible={isShowTimeLog}
        footer={
          <>
            <Button
              onClick={() => setIsShowTimeLog(false)}
              className="outline-primary-button"
            >
              Close
            </Button>
          </>
        }
        title="Time Logs"
        onCancel={() => setIsShowTimeLog(false)}
      >
        <Table
          columns={columns}
          dataSource={timeLog}
          bordered
          pagination={false}
        />
      </Modal>
    </>
  )
}

export default TimeLog
