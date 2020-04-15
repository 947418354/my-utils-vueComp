/*
冒泡排序
*/
function bubble(arr) {
  for(var i=0; i < arr.length - 1 ; i++) {
    for(var j = 0; j < aar.length - 1-i; j++ ) {
      // 判断前一个数大于后一个数时候进行值交换
      if(arr[j] > arr[j+1]) {
        //借助第三方变量交换两个变量的值
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
}

/*
数组去重
*/
function removeDuplicate(arr) {
  var newArr = []
  newArr[0] = arr[0]
  for(var i=0; i< arr.length; i++) {
    //newArr中的每个元素
    for(var j=0; j< newArr.length; j++) {
      // 当原数组中的值和新数组中的值相同时候，就没有必要再继续比较了，跳出内循环
      if(newArr[j] === arr[i]) {
    	break;
      }
     //拿原数组中的某个元素比较新数组中的最后一个元素还没有重复
     if(j === newArr.length - 1) {
       //将数据插入新数组中
       newArr.push(arr[i])
     }
    }
  }
  return newArr
}

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
