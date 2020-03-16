import { AREA_INFO } from './areaInfo'
import { COMMON } from '@utils/index'

/*
* 获取身份证校验码
*/
function getVerify(id17) {
  if (typeof (id17) === 'string') {
    id17 = id17.split('')
  }
  var power = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  for (var i = 0, sum = 0; i < id17.length; i++) {
    sum += id17[i] * power[i];
  }
  var t = sum % 11;
  var checknum = '';
  if (t == 0) checknum = "1";
  else if (t == 1) checknum = "0";
  else if (t == 2) checknum = "x";
  else if (t == 3) checknum = "9";
  else if (t == 4) checknum = "8";
  else if (t == 5) checknum = "7";
  else if (t == 6) checknum = "6";
  else if (t == 7) checknum = "5";
  else if (t == 8) checknum = "4";
  else if (t == 9) checknum = "3";
  else if (t == 10) checknum = "2";
  return checknum
}
/**
 * 生成身份证
 * @opt? {areaCode,areaName,
 *  birthCode,dateRange []:string
 *  sexCode,sexName}
 */
function generateID(opt) {
  let startDate = opt && opt.dateRange && opt.dateRange[0] || '1960-01-01'
  let endDate = opt && opt.dateRange && opt.dateRange[1] || '2000-01-01'
  let startDateNum = new Date(startDate).getTime()
  let areaCode, birthCode, sexCode
  if (opt && opt.areaCode) {
    areaCode = opt.areaCode
  } else if (opt && opt.areaName) {
    let found = false
    for (const key in AREA_INFO) {
      if (AREA_INFO.hasOwnProperty(key) && opt.areaName === AREA_INFO[key]) {
        areaCode = key
        found = true
        break
      }
    }
    if (!found) throw Error('地区名传递错误!')
  } else {
    let areaArr = Object.keys(AREA_INFO)
    areaCode = areaArr[Math.floor(Math.random() * areaArr.length)]
  }
  if (opt && opt.birthCode) {
    birthCode = opt.birthCode
  } else {
    let dec = new Date(endDate).getTime() - startDateNum
    let birthDate = new Date(Math.floor(Math.random() * dec) + startDateNum)
    birthCode = COMMON.formatDate(birthDate)
  }
  let qeueCode = (Math.floor(Math.random() * 90) + 10) + ''
  if (opt && opt.sexCode) {
    sexCode = opt.sexCode
  } else if (opt && opt.sexName) {
    switch (opt.sexName) {
      case '男':
        sexCode = Math.floor(Math.random() * 5) * 2 + 1
        break;
      case '女':
        sexCode = Math.floor(Math.random() * 5) * 2
        break;
      default:
        throw Error('性别名传递错误!')
    }
  } else {
    sexCode = opt && opt.sexCode || Math.floor(Math.random() * 10)
  }

  let id17 = areaCode + birthCode + qeueCode + sexCode
  let checknum = getVerify(id17)
  return id17 + checknum
}
/**
 * 得到身份证相关信息
 */
function getAgeByID(id) {
  const birth8 = id.slice(6, 8)
  let y = birth8.slice(0, 4)
  let m = birth8.slice(4, 2)
  let d = birth8.slice(6, 2)
  let now = new Date()
  let ny = now.getFullYear()
  let nm = now.getMonth() + 1
  let nd = now.getDate()
  let dy = ny - y
  let dm = nm - m
  let dd = nd - d
  if (dm > 0 || (dm === 0 && dd >= 0)) {
    return dy + 1
  } else {
    return dy
  }
}
function getBirthByID(id, join) {
  let birth8 = id.slice(6, 8)
  if (join) {
    let y = birth8.slice(0, 4)
    let m = birth8.slice(4, 2)
    let d = birth8.slice(6, 2)
    return y + join + m + join + d
  } else {
    return birth8
  }
}
function getSexCodeByID(id) {
  let sexCode = parseInt(id.slice(id.length - 2, 1))
  if (sexCode % 2 === 0) {
    return 0
  } else {
    return 1
  }
}

export default {
  generateID,
  getAgeByID,
  getBirthByID,
  getSexCodeByID,
}
