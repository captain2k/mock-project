import { convertDateTimeToTime, convertDayToShortDay } from '../convertTime'

const handleWorksheetTableData = (data) => {
  const dataSource = data?.map((item, index) => {
    let checkin
    let checkout
    if (item.checkin || item.checkout) {
      checkin = convertDateTimeToTime(item.checkin)
      checkout = convertDateTimeToTime(item.checkout)
    }
    if (!item.checkin || !item.checkin_original) {
      checkin = convertDateTimeToTime(item.checkin_original)
      checkout = convertDateTimeToTime(item.checkout_original)
    }
    if (!item.checkin && !item.checkin_original) {
      checkin = '--:--'
    }

    if (!item.checkout && !item.checkout_original) {
      checkout = '--:--'
    }

    return {
      key: item.id,
      id: index + 1,
      work_date: convertDayToShortDay(item.work_date),
      checkin: checkin,
      checkout: checkout,
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
