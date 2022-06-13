export default function changeTimeNumberToHour(time) {
  const hour = Math.floor(time / 60)
  const hourTime = hour > 9 ? `${hour}` : `0${hour}`
  const minute = time % 60
  const minuteTime = minute > 9 ? minute : `0${minute}`
  return `${hourTime}:${minuteTime}`
}
