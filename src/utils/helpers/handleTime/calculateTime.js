import changeTimeNumberToHour from './changeTimeNumberToHour'
import changeTimeToMint from './changeTimeToMint'

export default function calculateTime(firstTime, secondTime) {
  const firstTimeMint = changeTimeToMint(firstTime)
  const secondTimeMint = changeTimeToMint(secondTime)
  const result = firstTimeMint - secondTimeMint
  return changeTimeNumberToHour(result)
}
