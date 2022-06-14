import { convertDateTimeToTime, convertDayToShortDay } from '../convertTime'

const handleWorksheetTableData = (data) => {
  const dataSource = data?.map((item, index) => {
    return {
      key: item.id,
      id: index + 1,
      work_date: convertDayToShortDay(item.work_date),
      checkin: item.checkin
        ? convertDateTimeToTime(item.checkin)
        : convertDateTimeToTime(item.checkin_original) && '--:--',
      checkout: item.checkout
        ? convertDateTimeToTime(item.checkout)
        : convertDateTimeToTime(item.checkout_original) && '--:--',
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
    }
  })
  return dataSource
}

export default handleWorksheetTableData
