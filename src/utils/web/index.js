/**
 * 获取浏览器窗口url查询字符串
 * 返回查询字符串对象
 */
export function getQuery() {
  const args = {}
  const query = location.search.slice(1)
  const items = query.length > 0 ? query.split('&') : []
  for (let index = 0, key, value; index < items.length; index++) {
    const item = items[index].split('=');
    key = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    args[key] = value
  }
}

/**
 * 检查元素是否在当前视区
 * @param element dom对象
 */
export function checkElementInView(element) {
  const eleRect = element.getBoundingClientRect();
  const eleTop = eleRect.top;
  const eleBottom = eleRect.bottom;
  const viewHeight = document.documentElement.clientHeight;
  const halfViewHeight = viewHeight / 2;
  // 区域高度超过半屏，当前视区超过半屏为区域 -> 在，未超过半屏 -> 不在  
  const isMoreThanHalf = eleRect.height >= halfViewHeight;
  const isInHalfView = eleTop > halfViewHeight || eleBottom < halfViewHeight;
  if ((isMoreThanHalf && isInHalfView)) {
    return false;
  }
  // 区域高度不足半屏，超过一半的内容在当前视区 -> 在， 未超过一半 -> 不在
  if (!isMoreThanHalf) {
    let isContentInview = false;
    if (0 <= eleTop && eleTop <= viewHeight) {
      isContentInview = ((viewHeight - eleTop) / eleRect.height) > 1 / 2;
    } else if (0 <= eleBottom && eleBottom <= viewHeight) {
      isContentInview = eleBottom / eleRect.height > 1 / 2;
    }
    return isContentInview;
  }
  return true;
}

/**
 * 缩放指定容器下的文本 以达到不换行又能在固定容器下显示完整的文案
 * @param ele dom对象 文本的容器
 */
export function textCScale(ele) {
  const inlineBlockDiv = document.createElement('div')
  inlineBlockDiv.style.display = 'inline-block'
  inlineBlockDiv.style.whiteSpace = 'nowrap'
  inlineBlockDiv.style.transformOrigin = 'left center'
  const text = ele.innerText
  inlineBlockDiv.innerHTML = text
  ele.innerHTML = ''
  ele.appendChild(inlineBlockDiv)
  if (inlineBlockDiv.clientWidth <= ele.clientWidth) {
    inlineBlockDiv.style.transform = 'none';
  } else {
    let r = ele.clientWidth / inlineBlockDiv.clientWidth;
    inlineBlockDiv.style.transform = 'scale(' + r + ')';
  }
}
