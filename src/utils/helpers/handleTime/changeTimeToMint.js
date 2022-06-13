export default function changeTimeToMint(time) {
  const [hours, minutes] = time.split(':')
  return Number(hours) * 60 + Number(minutes)
}
