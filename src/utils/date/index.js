/**
 * 有关时间的常用方法
 */

import COMMON from '../common'

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
 * 是否为闰年
 * @param {number} currentDay 
 */
export const isLeapYear = (currentFullYear) => {
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
export const getNextNNatureYear = (currentDay, n) => {
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

/**
 * 得到格式化后的日期字符串
 * @param date 任何支持 new Date(date) 的参数,包括日期对象 时间戳 日期字符串
 * @param join 日期拼接符
 */
export function formatDate(date, join) {
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
  * 获取第N天
  * @param {*} date 
  */
const getNextNDay = (date, n = 1) => {
  let currentDay = date ? new Date(date).getTime() : Date.now()
  return COMMON.formatDate(currentDay + n * MILLSECONDS_OF_DAY)
}

 /**
  * 获取前N天
  * @param {*} date 
  */
 const getBeforeNDay = (date, n = 1) => {
  let currentDay = date ? new Date(date).getTime() : Date.now()
  return COMMON.formatDate(currentDay - n * MILLSECONDS_OF_DAY)
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
  let second = now.getSeconds()
  return [year, month, date].join('-') + ' ' + [hour, minute, second].join(':')
}
export {
  isLeapYear,
  formatDate,
  getMonthDays,
  getNextNDay,
  getBeforeNDay,
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
  getNextNDay,
  getBeforeNDay,
  getNextNNatureYear,
  getDaysBetween,
  getIOSAdapterDateString,
  isDateString,
  formatDateTime
}
