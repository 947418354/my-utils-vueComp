<template>
  <div class="my-table-box">
    <table class="my-table" cellspacing="0">
      <slot></slot>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>
.my-table-box {
  border-bottom: 1px solid #888;
}
.my-table {
  border-right: 1px solid #888;
  
}
.my-table td {
  border-left: 1px solid #888;
  border-top: 1px solid #888;
  padding: 5px;
}
</style>
