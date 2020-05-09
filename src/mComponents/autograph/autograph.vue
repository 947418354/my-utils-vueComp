<template>
  <!-- 预览PDF弹窗 -->
  <div v-transfer-dom>
    <div class="m-pdfsign-container" v-if="isShowSignAutograph" id="dialog">
      <div
        v-if="!isInWechat"
        class="m-header-container vux-1px-b">{{ roleName }}签名</div>
      <!-- 显示签名区域-->
      <div class="m-title"> 请{{ roleName }} <span>{{ userName }}</span> 签字</div>
      <div class="m-sign-container">
        <div class="m-canvas-box" id="canvasContainer">
          <div v-show="!isSign" class="text-tips" >请横向签名</div>
          <canvas id="anysignCanvas" width="2" />
        </div>
      </div>
      <div class="m-sign-btns">
        <div class="m-btn-box">
          <div class="m-btn"
            @click="onMoveLeft">
            <i class="icon-01" />
            左移
          </div>
          <div class="m-btn"
            @click="onMoveRight">
            <i class="icon-02" />
            右移
          </div>
          <div class="m-btn"
            @click="clear">
            <i class="icon-03" />
            清屏
          </div>
          <div class="m-btn"
            @click="cancel">
            <i class="icon-04" />
            取消
          </div>
        </div>
        <div
          @click="save"
          class="m-submit-btn">确认签名</div>
      </div>
    </div>
  </div>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
import Draw from './draw'

export default {
  directives: {
    TransferDom,
  },
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: '',
    },
    roleName: {
      type: String,
      default: '申请人',
    },
  },
  data() {
    const ua = window.navigator.userAgent
    const isInWechat = /MicroMessenger/i.test(ua)
    return {
      draw: null,
      isShowSignAutograph: false,
      isInWechat,
      _disabled: false,
    }
  },
  computed: {
    isSign() {
      return this.draw && this.draw.isSign
    }
  },
  created() {
    this.isShowSignAutograph = this.value
  },
  mounted() {
    // if (this.isShowSignAutograph) this.initCanvas()
  },
  methods: {
    initCanvas() {
      this.draw = new Draw('anysignCanvas', 'canvasContainer');
      this.draw.init();
    },
    onMoveLeft() {
      this.draw.moveleft()
    },
    onMoveRight() {
      this.draw.moveright()
    },
    clear() {
      this.draw.clear();
    },
    save() {
      if (this._disabled) {
        return
      }
      var data = this.draw.save();
      this._disabled = true
      if (/^data:image\/(jpeg|jpg|png);base64,/.test(data)) {
        this.$emit('onComposeAutograph', data)
      } else {
        this.$vux.alert.show({
          title: '温馨提示',
          content: '请签名',
        })
        this._disabled = false
      }
    },
    cancel() {
      this.$emit('input', false)
    },
  },
  watch: {
    value(newValue) {
      this.isShowSignAutograph = newValue
      if(newValue) {
        this.$nextTick(() => {
          this.initCanvas()
        })
      }
    },
    disabled(newValue) {
      this._disabled = newValue
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/theme/colors';
@import '~@/theme/mixin';
@import '~@/theme/sprites/autograph/sprite';

.m-pdfsign-container{
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .m-header-container{
    height: 64px;
    padding: 20px 10px 0;
    text-align: center;
    line-height: 44px;
    font-size: 17px;
    font-weight: bolder;
  }
  .m-title{
    height: 60px;
    padding: 15px 0;
    font-size: 17px;
    line-height: 30px;
    text-align: center;
  }
  .m-sign-container {
    // position: relative;
    flex: 1;
    padding: 0 15px;
    width: 100%;
    display: flex;
    .m-canvas-box{
      position: relative;
      flex: 1;
      display: block;
      overflow: hidden;
      border: 1px solid #666;
      .text-tips{
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 34px;
        color: #C1CAD4;
      }
    }
  }
  .m-sign-btns{
    height: 145px;
    padding: 20px 20px 30px;
    .m-btn-box{
      display: flex;
      height: 32px;
      margin-bottom: 20px;
      >.m-btn {
        flex: 1;
        padding: 6px 0;
        margin-right: 12px;
        text-align: center;
        background: #F7F8F9;
        color: #37446B;
        border-radius: 100px;
        i{
          display: inline-block;
          width: 15px;
          height: 15px;
          margin:0 5px 0 0;
          vertical-align: -3px;
        }
        .icon-01{
          @include sprite($autograph_01);
        }
        .icon-02{
          @include sprite($autograph_02);
        }
        .icon-03{
          @include sprite($autograph_03);
        }
        .icon-04{
          @include sprite($autograph_04);
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .m-submit-btn{
      @include primary-submit-new;
    }
  }
}
</style>
