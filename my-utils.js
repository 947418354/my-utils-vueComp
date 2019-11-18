/**
 * 得到url中指定的参数值
 * @param {参数名 String} name 
 */
export function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var reg = new RegExp("[\\?&]" + name + "=([^&#\/]*)"), results = reg.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1]);
}

// 节流函数
export function throttle(fn, delay, atleast) {
  /** 函数节流方法: fn 延时调用函数; delay 延迟多长时间; atleast 至少多长时间触发一次; return function 延迟执行的方法;***/
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
}