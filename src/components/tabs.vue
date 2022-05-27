<template>
  <div class="compTabs">
    <ul class="compTabs-ul">
      <li
        class="compTabs-li"
        :class="{ active: value === item.value }"
        v-for="(item, i) of list"
        :key="item.valur"
        @click="handleClickTabsItem(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    value: [String, Number],
  },
  methods: {
    handleClickTabsItem(value) {
      this.$emit("update:value", value);
    },
  },
};
</script>

<style>
.compTabs {
}
.compTabs-ul {
  display: flex;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  list-style: none;
  margin: 0;
}
.compTabs-li {
  position: relative;
  width: 366px;
  text-align: center;
  line-height: 80px;
}
.compTabs-li:hover {
  color: #ffffff;
}
.compTabs-li.active {
  font-weight: 600;
  color: #ffffff;
}
.compTabs-li.active::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background: #ffffff;
  left: 0;
  bottom: 0;
}
</style>