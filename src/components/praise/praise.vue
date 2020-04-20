<template>
  <div class="comp-praise">
    <!-- <div class="container">
      <h2>CSS3:</h2>
      <div class="praise_bubble" id="praise_bubble"></div>
    </div>-->
    <div class="container">
      <h2>Canvas:</h2>
      <canvas :id="id" width="200" height="400" style="width:100px;height:200px"></canvas>
      <div style="text-align: center">
        <button class="praise" @click="clickPraise()">赞</button>
      </div>
    </div>
  </div>
</template>

<script>
import ThumbsUpAni from "./canvas";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      thumbsUpAni: null
    };
  },
  mounted() {
    this.thumbsUpAni = new ThumbsUpAni(this.id);
  },
  methods: {
    clickPraise() {
      this.thumbsUpAni.start();
    }
  }
};
</script>

<style lang="less">
.comp-praise {
  .container {
    display: inline-block;
    vertical-align: top;
  }

  .praise {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 0;
  }
}
</style>
