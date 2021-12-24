/**
 * 
 * 浮点数的加减乘除
 */
function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
};

function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

Number.prototype.sub = function (arg) {
  return accMul(arg, this);
};
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
};
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) { }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) { }
  with (Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};

/*
            解题思路：将数字每四个拆分一次，每次后面加万，亿，万亿，亿亿作为节权位
            然后单独将每四个数按情况转化为汉字，其他情况按下标即可转化，主要考虑为0的情况，
            当零为后面出现时，直接去除，当在两个大于零的数字中间出现时，将多个零合并为一个零
        */
let numChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
let numUnit = ['', '十', '百', '千']         //权位
let numSection = ['', '万', '亿', '万亿', '亿亿']     //节权位
const formatSection = (num) => {
  let arr = (num + '').split('').reverse();
  let str = ''
  for (let i = 0; i < arr.length; i++) {          //将0-9转化为零到九
    let char = arr[i] == 0 ? numChar[0] : numChar[arr[i]] + numUnit[i]   //当数字为0时不加权位，非零加权位 
    str = char + str;
  }
  let s = str.replace(/零+/g, '零').replace(/零+$/, '')       //将多个零合并为一个零，并剔除尾端的零
  return s;
}
const formatNum = (num, str) => {      //将字符串按个数拆分
  let len = Math.ceil(str.length / num);
  let arr = []
  for (let i = 0; i < len; i++) {
    let reverseStr = str.split('').reverse().join('')
    let s = reverseStr.slice(i * num, i * num + num).split('').reverse().join('')
    arr.unshift(s)
  }
  return arr
}
const numberTranToCN = (num) => {
  let arr = formatNum(4, num + '')         //将数字每四个拆分一次
  let list = []
  for (let i = 0; i < arr.length; i++) {
    let str = formatSection(arr[i])
    list.push(str)

  }
  let reverseList = list.reverse();
  for (let j = 0; j < reverseList.length; j++) {
    reverseList[j] += numSection[j]
  }
  // 以十开头很特殊 前面一省略
  return reverseList.reverse().join('').replace(/^一十/, '十')
}

export default {
  numberTranToCN,
}
