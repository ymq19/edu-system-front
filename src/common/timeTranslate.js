export function timeTranslate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() 
    date= year + '/' + month + '/' + day + ' ' + hour + ':' + minute
  return date
}