import { VALIDATOR } from '@/utils'

// 检查对象是否有值为空
const checkObjectValues = (data) => {
  const values = Object.values(data);
  if (values && values.length) {
    const hasEmptyValue = values.includes('');
    return !hasEmptyValue;
  }
  return true;
}
// 检查信息是否填写齐全
const checkFormCompleted = (data) => {
  if (data) {
    let checkObject = null;
    if(Object.prototype.toString.call(data) === '[object Object]') {
      return checkObjectValues(data);
    } else if (Object.prototype.toString.call(data) === '[object Array]') {
      for (let i = 0; i < data.length; i++) {
        const isCompleted = checkObjectValues(data[i]);
        if (!isCompleted) {
          return isCompleted;
        }
      }
      return true;
    }
  }
  return true;
}
export default {
  // 是否为空字符串
  isNulls (str) {
    if (str == null || str == 'null' || str == '') {
      return true
    } else if (typeof str === 'string') {
      return str.trim() == ''
    } else {
      return false
    }
  },
  // 是否为空对象
  isEmptyObject(o) {
    var tmp
    for (tmp in o) {
      return false
    }
    return true
  },
  getUUid () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },
  /**
     * @see 比较app版本号
     * @param {*} version-a
     * @param {*} version-b
     * @return  a > b ? 1 : (a == b ? 0 : -1)
     */
  appVersionCompare (a, b) {
    let pa = String(a).split('.')
    let pb = String(b).split('.')
    for (let i = 0; i < 3; i++) {
      let na = parseInt(pa[i])
      let nb = parseInt(pb[i])
      if (na > nb) {
        return 1
      }
      if (na < nb) {
        return -1
      }
      if (!isNaN(na) && isNaN(nb)) {
        return 1
      }
      if (isNaN(na) && !isNaN(nb)) {
        return -1
      }
    }
    return 0
  },
  // 格式化日期 YYYY-MM-DD, date为时间戳
  formatDate (date) {
    var d = date ? new Date(date) : new Date()
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  },
  // 高德地图 获取城市名称
  getCity () {
    return new Promise((resolve) => {
      if (AMap && AMap.CitySearch) {
        new AMap.CitySearch().getLocalCity((status, result) => { // eslint-disable-line
          if (status === 'complete' && result.info === 'OK' && result.city) {
            resolve(result.city.replace('市', ''))
          } else {
            resolve('深圳')
          }
        })
      } else {
        resolve('深圳')
      }
    })
  },
  // 函数节流
  throttle (fn, delay, atleast) {
    /** 函数节流方法: fn 延时调用函数; dalay 延迟多长时间; atleast 至少多长时间触发一次; return function 延迟执行的方法;***/
    let timer = null
    let previous = null
    return function () {
      var now = +new Date()
      if (!previous) previous = now
      if (atleast && now - previous > atleast) {
        fn()
        // 重置上一次开始时间为本次结束时间
        previous = now
        clearTimeout(timer)
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn()
          previous = null
        }, delay)
      }
    }
  },
  // 价格取整
  integerPrice (num = '') {
    return String(num).replace(/\.00/g, '')
  },
  // 不足10数字前补零
  paddingZero (num) {
    if (num < 10) {
      return '0' + num
    }
    return num
  },
  // 小数减法
  accNumberSub(arg1, arg2) {
      if (isNaN(arg1)) {
          arg1 = 0;
      }
      if (isNaN(arg2)) {
          arg2 = 0;
      }
      arg1 = Number(arg1);
      arg2 = Number(arg2);

      var r1, r2, m, n;
      try {
          r1 = arg1.toString().split(".")[1].length;
      }
      catch (e) {
          r1 = 0;
      }
      try {
          r2 = arg2.toString().split(".")[1].length;
      }
      catch (e) {
          r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));  //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  // 获取第一个refs, 兼容ref为数组的情况下
  getFirstRef(ref) {
    return Array.isArray(ref) ? ref[0] : ref
  },
  checkObjectValues,
  checkFormCompleted,

  // 从身份证中提取出生日期 格式：2019-10-21
  getBirthdayFromIdCard(certificateNo) {
    if (certificateNo && VALIDATOR.isCardId(certificateNo)) {
      let birthday = certificateNo.length === 18 ? certificateNo.substring(6, 14) : `19${certificateNo.substring(6, 12)}`;
      birthday = `${birthday.substring(0, 4)}-${birthday.substring(4, 6)}-${birthday.substring(6, 8)}`;
      return birthday;
    }
    return '';
  }
}
