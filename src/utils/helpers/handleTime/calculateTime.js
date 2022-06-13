import changeTimeToMint from './changeTimeToMint'
import changeTimeNumberToHour from './changeTimeNumberToHour'

export default function calculateTime(firstTime, secondTime) {
  const firstTimeMint = changeTimeToMint(firstTime)
  const secondTimeMint = changeTimeToMint(secondTime)
  const result = firstTimeMint - secondTimeMint
  console.log(result)
  return changeTimeNumberToHour(result)
}
