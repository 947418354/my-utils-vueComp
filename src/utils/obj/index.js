//浅拷贝函数
function shallowCopy(target){
	var obj;
	var str = Object.prototype.toString.call(target);
	if(str == '[object Array]'){
		obj = [];
		for (var i = 0; i < target.length; i++) {
			obj.push(target[i]);
		}
	}else if(str == '[object Object]'){
		obj = {};
		for(var i in target){
			obj[i] = target[i];
		}
	}else{
		return target;
	}
	return obj;
}

//深拷贝函数
function deepCopy (obj) {
	if (obj === null || typeof obj !== 'object') return obj;
	var cpObj = obj instanceof Array ? [] : {};
	for (var key in obj) cpObj[key] = deepCopy(obj[key]);
	return cpObj;
}

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

export {
  shallowCopy,
  deepCopy
}

export default {
  shallowCopy,
  deepCopy
}
