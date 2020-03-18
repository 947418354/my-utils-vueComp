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