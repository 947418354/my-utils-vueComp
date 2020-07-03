/**
 * 有关时间的常用方法
 */

const MILLSECONDS_OF_DAY = 86400000
const MILLSECONDS_OF_HOUR = 3600000

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
 * 得到格式化后的日期字符串
 * @param date 任何支持 new Date(date) 的参数,包括日期对象 时间戳 日期字符串
 * @param join 日期拼接符
 */
function formatDate(date, join) {
  var d = date ? new Date(date) : new Date()
  var month = '' + (d.getMonth() + 1)
  var day = '' + d.getDate()
  var year = d.getFullYear()

  if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day
	switch (join) {
		case '年':
			return `${year}年${month}月${day}日`
			break;
		case '-':
			return [year, month, day].join(join)
			break;
		case '/':
			return [year, month, day].join(join)
			break;
		default:
			return year + month + day
			break;
	}
}

/**
 * 获取某个月的天数
 * @param {*} month 
 * @param {*} isLeap 
 * 
 */
const getMonthDays = (month, isLeap) => {
  let month31 = [1,3,5,7,8,10,12]
  if (month31.indexOf(+month)) {
    return 31
  } else if (+month === 2) {
    return isLeap ? 29 : 28
  } else {
    return 30
  }
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


const getDaysBetween = (start, end) => {
  return Math.round(Math.abs(end.getTime() - start.getTime()) / MILLSECONDS_OF_DAY)
}

/**
 * 将日期字符串转换为 iOS 兼容
 * 2018-09-11 12:00:00 ===> 2018/09/11 12:00:00
 * @param {*} datestr 
 */
const getIOSAdapterDateString = (datestr) => {
  return datestr.replace(/-/g, '/')
}

/** 
 *  是否是合法的日期字符串
 */
const isDateString = (datestr) => {
  return isNaN(datestr) && !isNaN(Date.parse(datestr))
}

// 时间搓转日期时间
// 格式化日期 YYYY-MM-DD HH:MM:SS
const formatDateTime = (dateTime) => {
  let now = dateTime ? new Date(dateTime) : new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds() + ''
  if (second.length === 1) second = '0' + second
  return [year, month, date].join('-') + ' ' + [hour, minute, second].join(':')
}

/**
 * 根据时间戳返回本地会话聊天记录时间,今天某时某分 昨天 之前
 * @param {时间戳} timestamp 
 */
export function timestampToConversation(timestamp) {
  const now = Date.now()
  if(now - timestamp < MILLSECONDS_OF_DAY) {
    const exp = /[\u4E00-\u9FA5]+[0-9]+:[0-9]+/
    const localeString = new Date(timestamp).toLocaleString()
    return exp.exec(localeString)[0]
  } else if (MILLSECONDS_OF_DAY <= now - timestamp < 2 * MILLSECONDS_OF_DAY) {
    return '昨天'
  } else {
    return new Date(timestamp).toLocaleDateString
  }
}

export {
  isLeapYear,
  formatDate,
  getMonthDays,
  getNextNNatureYear,
  getDaysBetween,
  getIOSAdapterDateString,
  isDateString,
  formatDateTime
}

export default {
  isLeapYear,
  formatDate,
  getMonthDays,
  getNextNNatureYear,
  getDaysBetween,
  getIOSAdapterDateString,
  isDateString,
  formatDateTime
}
