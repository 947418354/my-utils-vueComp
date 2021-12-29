/* eslint-disable */

// 是否为空对象
export function isEmptyObject(o) {
  var tmp
  for (tmp in o) {
    return false
  }
  return true
}

// 检查对象是否有值为空
export function checkObjectValues(data) {
  const values = Object.values(data);
  if (values && values.length) {
    const hasEmptyValue = values.includes('');
    return !hasEmptyValue;
  }
  return true;
}

const objectUtils = {
	/**
	 * 对象指定属性叶子结点数量
	 */
	leafNum(obj, prop) {
		let leafNum = 0
		function leafNum1(obj, prop) {
			if (obj[prop] && obj[prop].length) {
				obj[prop].forEach(obj1 => {
					if (obj1[prop] && obj1[prop].length) {
						leafNum1(obj1, prop)
					} else {
						leafNum++
					}
				})
			}
		}
		leafNum1(obj, prop)
		return leafNum
	},
}

export default objectUtils

