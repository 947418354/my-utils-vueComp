function addChildren(arr, treeArr) {
  let ifFind = false
  let destinIndex
  for (let j = 0; j < treeArr.length; j++) {
    if (treeArr[j].name === arr[0]) {
      ifFind = true
      destinIndex = j
      break
    }
  }
  if (ifFind) {
    if (arr.length != 1) {
      addChildren(arr.slice(1), treeArr[destinIndex].children)
    }
  } else {
    for (let jj = 0, b; jj < arr.length; jj++) {
      let a = {
        name: arr[jj],
        children: []
      }
      if (jj === 0) {
        treeArr.push(a)
      } else {
        b.children.push(a)
      }
      b = a
    }
  }
}
/**
 * 二维数组转树杈
 * let input = [
  ["新闻", "体育", "网球", "国外"],
  ["产品", "互联网", "金融"],
  ["新闻", "房产", "深圳"],
  ["新闻", "体育", "羽毛球"],
  ["产品", "互联网", "保险"]
]
let ouput = [{
  "name": "新闻",
  "children": [{
    "name": "体育",
    "children": [{
      "name": "网球",
      "children": [{
        "name": "国外"
      }]
    }, {
      "name": "羽毛球"
    }]
  }, {
    "name": "房产",
    "children": [{
      "name": "深圳"
    }]
  }]
}, {
  "name": "产品",
  "children": [{
    "name": "互联网",
    "children": [{
      "name": "金融"
    }, {
      "name": "保险"
    }]
  }]
}]
 * @param {二维数组} twoArr 
 */
export function testFive(twoArr) {
  let tree = []
  twoArr.forEach((ele, i) => {
    addChildren(ele, tree)
  })
  return tree
}
