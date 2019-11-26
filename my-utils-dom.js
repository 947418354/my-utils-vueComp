/**
 * 得到指定元素到根元素的上边界的距离
 * @param {dom对象,Object-dom} element 
 * 返回Number,单位px
 */
export function getElementTop(element) {
  var actualTop = element.offsetTop
  var current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}