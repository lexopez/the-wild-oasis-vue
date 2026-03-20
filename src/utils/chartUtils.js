// These represent the initial state of our data slices
export const startDataLight = [
  { duration: '1 night', value: 0, color: '#ef4444' },
  { duration: '2 nights', value: 0, color: '#f97316' },
  { duration: '3 nights', value: 0, color: '#eab308' },
  { duration: '4-5 nights', value: 0, color: '#84cc16' },
  { duration: '6-7 nights', value: 0, color: '#22c55e' },
  { duration: '8-14 nights', value: 0, color: '#14b8a6' },
  { duration: '15-21 nights', value: 0, color: '#3b82f6' },
  { duration: '21+ nights', value: 0, color: '#a855f7' },
]

export const startDataDark = [
  { duration: '1 night', value: 0, color: '#b91c1c' },
  { duration: '2 nights', value: 0, color: '#c2410c' },
  { duration: '3 nights', value: 0, color: '#a16207' },
  { duration: '4-5 nights', value: 0, color: '#4d7c0f' },
  { duration: '6-7 nights', value: 0, color: '#15803d' },
  { duration: '8-14 nights', value: 0, color: '#0f766e' },
  { duration: '15-21 nights', value: 0, color: '#1d4ed8' },
  { duration: '21+ nights', value: 0, color: '#7e22ce' },
]

export function prepareData(startData, stays) {
  // 1. Helper to increment the value of a specific duration bucket
  const incArrayValue = (arr, field) => {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj))
  }

  // 2. Process the stays and sort them into buckets
  const data = stays.reduce((acc, cur) => {
    const n = cur.numNights

    if (n === 1) return incArrayValue(acc, '1 night')
    if (n === 2) return incArrayValue(acc, '2 nights')
    if (n === 3) return incArrayValue(acc, '3 nights')
    if ([4, 5].includes(n)) return incArrayValue(acc, '4-5 nights')
    if ([6, 7].includes(n)) return incArrayValue(acc, '6-7 nights')
    if (n >= 8 && n <= 14) return incArrayValue(acc, '8-14 nights')
    if (n >= 15 && n <= 21) return incArrayValue(acc, '15-21 nights')
    if (n >= 21) return incArrayValue(acc, '21+ nights')

    return acc
  }, startData)

  // 3. Filter out categories that have 0 bookings so they don't show in the Legend
  return data.filter((obj) => obj.value > 0)
}
