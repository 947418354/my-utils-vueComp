/**
 * 字符串模板替换
 * @param {被处理的字符串} str "你好$name，欢迎到$home。这是你第$count次来$home"
 * @param {提供数据的对象} obj {
      name: 'jack',
      home: "wuhan",
      count: 3
    }
   '你好jack，欢迎到wuhan。这是你第3次来wuhan'
 */
export function strReplaceByKey(str, obj) {
  let output = str.replace(/\$[a-zA-Z]+/g, (ele) => {
    return obj[ele.slice(1)]
  })
  return output
}

/**
 * 字符串按照单词字典拆分
 * @param {待处理字符串} str "hellothisismyhomewelcometomyhome"
 * @param {参考单词字典} words ['my', 'home', 'welcome', 'this']
 * ["hello", "this", "is", "my", "home", "welcome", "to", "my", "home"]
 */
export function strSplitByWords(str, words) {
  let output = []
  let otherWord = ''
  for (let index = 0; index < str.length;) {
    let indexLetter = str.charAt(index)
    let firstMatch = []
    for (let i = 0; i < words.length; i++) {
      const first = words[i].charAt(0);
      if (first === indexLetter) {
        firstMatch.push(words[i])
      }
    }
    if (firstMatch.length > 0) {
      let isWord = false
      for (let j = 0; j < firstMatch.length; j++) {
        const element = firstMatch[j];
        let l = element.length
        let nWord = str.slice(index, index + l)
        if (nWord === element) {
          isWord = true
          if (otherWord) output.push(otherWord)
          output.push(nWord)
          otherWord = ''
          index += l
          break
        }
      }
      if (!isWord) {
        otherWord += str.charAt(index)
        index += 1
      }
    } else {
      otherWord += str.charAt(index)
      index += 1
    }
  }
  return output
}

/**
 * 返回一个数字字母组成的随机串
 * @param {随机长度起值} minL 
 * @param {随机长度终值} maxL 
 */
export function getRandomStr(minL, maxL) {
  if(!maxL) maxL = minL
  var str = "",
    range = minL, //min
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
  // 随机产生
  range = Math.round(Math.random() * (maxL - minL)) + minL;
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
