export const getLast30Days = () => {
  const list = []
  const today = new Date()
  let i = 29
  while (i >= 0) {
    const priorDate = new Date().setDate(today.getDate() - i)
    const date = new Date(priorDate).toLocaleDateString('default', { day: 'numeric', month: 'short' })
    list.push(date)
    i--
  }
  return list
}

export const getLast7Days = () => {
  const list = []
  const today = new Date()
  let i = 6
  while (i >= 0) {
    const priorDate = new Date().setDate(today.getDate() - i)
    const date = new Date(priorDate).toLocaleDateString('default', { day: 'numeric', month: 'short' })
    list.push(date)
    i--
  }
  return list
}

export const getLast6Month = () => {
  const list = []
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const today = new Date()
  let d
  let month

  for (let i = 5; i >= 0; i -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    month = monthNames[d.getMonth()]
    list.push(month)
  }
  return list
}

export const getLastYear = () => {
  const list = []
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const today = new Date()
  let d
  let month

  for (let i = 11; i >= 0; i -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    month = monthNames[d.getMonth()]
    list.push(month)
  }
  return list
}

export const getLastWeek = () => {
  const today = new Date()
  const aWeekAgo = new Date().setDate(today.getDate() - 7)
  const year = new Date(aWeekAgo).getFullYear()
  const month = new Date(aWeekAgo).toLocaleDateString('default', { month: '2-digit' })
  const date = new Date(aWeekAgo).toLocaleDateString('default', { day: '2-digit' })
  return year + '-' + month + '-' + date
}

export const getLastMonth = () => {
  const today = new Date()
  const aWeekAgo = new Date().setDate(today.getDate() - 30)
  const year = new Date(aWeekAgo).getFullYear()
  const month = new Date(aWeekAgo).toLocaleDateString('default', { month: '2-digit' })
  const date = new Date(aWeekAgo).toLocaleDateString('default', { day: '2-digit' })
  return year + '-' + month + '-' + date
}

export const getLastSixMonthDate = () => {
  const today = new Date()
  const aWeekAgo = new Date().setDate(today.getDate() - 180)
  const year = new Date(aWeekAgo).getFullYear()
  const month = new Date(aWeekAgo).toLocaleDateString('default', { month: '2-digit' })
  const date = new Date(aWeekAgo).toLocaleDateString('default', { day: '2-digit' })
  return year + '-' + month + '-' + date
}

export const getLastYearDate = () => {
  const date = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  const year = new Date(date).getFullYear()
  const month = new Date(date).toLocaleDateString('default', { month: '2-digit' })
  const day = new Date(date).toLocaleDateString('default', { day: '2-digit' })
  return year + '-' + month + '-' + day
}
