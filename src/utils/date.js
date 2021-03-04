export const monthList = [
  'January,',
  'February,',
  'March,',
  'April,',
  'May,',
  'June,',
  'July,',
  'August,',
  'September,',
  'October,',
  'November,',
  'December,'
]
export const isDay = (elDate, newDate) => elDate.getDate() === newDate.getDate()
export const isMonth = (elDate, newDate) => elDate.getMonth() === newDate.getMonth()
export const isYear = (elDate, newDate) => elDate.getFullYear() === newDate.getFullYear()

export const isYesterdayDay = (elDate, newDate) =>
  isMonth(elDate, newDate) && isYear(elDate, newDate) && newDate.getDate() - elDate.getDate() === 1

export const isToday = (elDate, newDate) =>
  isMonth(elDate, newDate) && isYear(elDate, newDate) && isDay(elDate, newDate)

export const getDate = elDate => {
  const date = new Date(elDate)
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0')
  const month = monthList[date.getMonth()]
  const year = date.getFullYear()
  const newDate = new Date()
  if (isToday(date, newDate)) {
    return 'Today'
  }
  if (isYesterdayDay(date, newDate)) {
    return 'Yesterday'
  }
  return [day, month, year].join(' ')
}
