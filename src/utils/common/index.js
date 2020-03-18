
/**
 * 深拷贝函数
 * @param {对象 数组} obj 
 */
export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  var cpObj = obj instanceof Array ? [] : {};
  for (var key in obj) cpObj[key] = deepCopy(obj[key]);
  return cpObj;
}

function deepCopy1(data) {
  if (!data || !(data instanceof Object) || (typeof data == "function")) {
    return data || undefined;
  }
  var constructor = data.constructor;
  var result = new constructor();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      result[key] = deepCopy1(data[key]);
    }
  }
  return result;
}

/**
 * 防抖函数
 * @param {被防抖函数} handler 
 * @param {防抖延时} delay 
 */
export function debounce(handler, delay) {
  let timer = null //利用闭包保存同一个timer
  return function () {
    let _self = this //取debounce执行作用域的this
    let _arg = arguments //利用闭包保存参数数组
    clearTimeout(timer) //不断的执行函数不断的清除定时器
    timer = setTimeout(() => {
      handler.apply(_self, _arg) //用apply指向调用debounce的对象，相当于_this.handler(args);
    }, delay)
  }
}

/**
 * 节流函数
 * @param {被节流函数} handler 
 * @param {节流时间间隔} time 
 * @param {节流模式:是否 立即模式} immediately 
 */
export function throttle(handler, time, immediately) {
  if (immediately === undefined) {
    immediately = true //判断需要先立即执行
  }
  if (immediately) {
    let t
    return () => {
      let _self = this //取throttle 执行作用域的this
      let _arg = arguments //利用闭包保存参数数组
      if (!t || Date.now() - t >= time) {
        handler.apply(_self, _arg);
        t = Date.now(); //得到的当前时间戳
      }
    }
  }
  else {
    let timer
    return () => {
      if (timer) {
        return //判断如果有计时器不清零直接返回啥也不做
      }
      let _self = this //取throttle 执行作用域的this
      let _arg = arguments //利用闭包保存参数数组
      timer = setTimeout(() => {
        handle.apply(_self, _arg)
        timer = null
      }, time)
    }
  }
}

export default {
  /**
     * @see 比较app版本号
     * @param {*} version-a
     * @param {*} version-b
     * @return  a > b ? 1 : (a == b ? 0 : -1)
     */
  appVersionCompare(a, b) {
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

  // 价格取整
  integerPrice(num = '') {
    return String(num).replace(/\.00/g, '')
  },
  // 不足10数字前补零
  paddingZero(num) {
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
