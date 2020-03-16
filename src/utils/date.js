/**
 * 是否为闰年
 * @param {number} currentDay 
 */
const isLeapYear = (currentFullYear) => {
  let isLeapYear =  (currentFullYear % 100 !== 0 && currentFullYear % 4 === 0) 
                    || (currentFullYear % 400 === 0 && currentFullYear % 3200 !== 0) 
                    || (currentFullYear % 172800 === 0)
  return isLeapYear
}

 /**
  * 自然日期加法
  * @param {*} currentDay 
  * @param {*} n 
  */
 const getNextNNatureYear = (currentDay, n) => {
  let splitDate = currentDay.split('-')
  let year = splitDate[0]
  let month = splitDate[1]
  let day = splitDate[2]
  
  let targetYear = Number(year) + n
  if (isLeapYear(Number(year)) && month == 2 && day == 29) {
    if (isLeapYear(Number(targetYear))) {
      return [targetYear, month, day].join('-')
    } else {
      return [targetYear, month, Number(day) - 1].join('-')
    }
  } else {
    return [targetYear, month, day].join('-')
  }
}

export default {
  isLeapYear,
  getNextNNatureYear
}
