// const objectUtils = require('../utils/obj')
import objectUtils from '../utils/obj'

// console.log(objectUtils.leafNum({}, 'childs'), 0)
console.log(objectUtils.leafNum({
  childs: [
    {prop: 'prop1'},
    {prop: 'prop2'}
  ]
}, 'childs'), 2)
console.log(objectUtils.leafNum({
  childs: [
    {
      childs:[
        {},
        {},
      ]
    },
    {}
  ]
}, 'childs'), 3)