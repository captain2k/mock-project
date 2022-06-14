import moment from 'moment'

export const convertTimeToIso = (stringTime) => {
  return new Date(stringTime).toISOString()
}

export const convertMomentToString = (objMoment) => {
  return moment(objMoment).format('YYYY-MM-DD')
}

export const convertDayToShortDay = (day) => {
  return moment(day).format('DD/MM/YYYY ddd')
}

export const convertDateTimeToTime = (dateTime) => {
  return moment(dateTime).format('HH:mm')
}
