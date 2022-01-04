import arrayUtils from '../utils/arr'
import objectUtils from '../utils/obj'

// console.log(arrayUtils.objArrLevels([{}]))
console.log(arrayUtils.objArrLevels([{
  childs: [
    {},
    {}
  ]
}]))
// console.log(objectUtils.leafNum({}, 'childs'), 0)
/* console.log(objectUtils.leafNum({
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
}, 'childs'), 3) */