<template>
  <div class="compMenu">
      <ul class="compMenu-ul">
          <li class="compMenu-li" :class="{active: active === item.value}" v-for="(item, i) of list" :key="item.valur">{{item.label}}</li>
      </ul>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {return []}
        },
        active: [String, Number]
    }
}
</script>

<style>
.compMenu {

}
.compMenu-ul {
    display: flex;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.65);
    line-height: 22px;
    letter-spacing: 1px;
    list-style: none;
    margin: 0;
}
.compMenu-li {
    position: relative;
    padding: 37px 40px;
    flex-shrink: 0;
}
.compMenu-li:hover{
    color: #FFFFFF;
}
.compMenu-li.active {
    font-weight: 600;
    color: #FFFFFF;
}
.compMenu-li.active::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background: #FFFFFF;
    left: 0;
    bottom: 0;
}
</style>