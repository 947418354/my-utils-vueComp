/*
短杠命名转驼峰命名
*/
function shortToCamel(foo) {
	var arr = foo.split('-');
  //获取每个元素中的第一个字符并转换成大写
  for(var i = 1; i < arr.length; i++) {
  arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1, arr[i].length-1)
  }
  return arr.join('')
}
