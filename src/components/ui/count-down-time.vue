<template>
  <div class="activity-bar groupon-price">
    <div class="time-content activity-bar__timer">
      <p>距结束还剩</p>
      <!-- 不足 1 天的情况-->
      <p v-if="d < 1" class="time-unit-wrap">
        <span>{{ h }}</span>&nbsp;:&nbsp;
        <span>{{ m }}</span>&nbsp;:&nbsp;
        <span>{{ s }}</span>
      </p>
      <p v-else class="counter-timer">{{d}}天{{h}}小时</p>
    </div>
  </div>
</template>
<script>
import { COMMON } from "@/utils";

export default {
  props: {
    activityEndTime: {
      type: Number
    },
    hasMonthPrice: {
      type: Boolean,
      default: false
    },
    // 扩展字段
    extend: {
      type: Object,
      default: value => {
        return {
          ...value
        };
      }
    },
    isInsureIndexPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      d: 0, // 倒计时 天
      h: "00", // 声明倒计时 时
      m: "00", // 声明倒计时 分
      s: "00", // 声明倒计时 秒
      timer: null
    };
  },
  created() {},
  mounted() {
    this.endTime && this.countDownTime(this.endTime);
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  },
  computed: {
    priceUnit() {
      return this.hasMonthPrice
        ? this.isInsureIndexPage
          ? "元/月"
          : "元/月起"
        : this.isInsureIndexPage
        ? "元"
        : "元起";
    },
    discountResult() {
      return COMMON.accNumberSub(this.oldPrice, this.price);
    },
    // 活动结束时间
    endTime() {
      return this.activityEndTime;
    }
  },
  watch: {
    endTime(value) {
      this.countDownTime(value);
    }
  },
  methods: {
    integer(price) {
      return COMMON.integerPrice(price);
    },
    getTimeObject(timestamp) {
      //计算出相差天数
      var days = Math.floor(timestamp / (24 * 3600 * 1000));
      //计算出小时数
      var leave1 = timestamp % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      return {
        d: days,
        h: hours,
        m: minutes,
        s: seconds
      };
    },
    // nav 拼团倒计时
    countDownTime(endTime = new Date().getTime()) {
      this.timer && window.clearInterval(this.timer);
      let now = Date.now();
      let countDown = endTime - now > 0 ? endTime - now : 0;
      if (countDown > 0) {
        const dayObj = this.getTimeObject(countDown);
        let d = dayObj.d;
        let h = dayObj.h;
        let m = dayObj.m;
        let s = dayObj.s;
        this.timer = window.setInterval(() => {
          if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
            this.d = 0;
            this.h = "00";
            this.m = "00";
            this.s = "00";
            this.timer && window.clearInterval(this.timer);
          } else {
            s--;
            if (s < 0) {
              m--;
              s = 59;
            }
            if (m < 0) {
              h--;
              m = 59;
            }
            if (h < 0) {
              h = 0;
            }
            this.d =
              countDown > 86400000 ? Math.floor(countDown / 86400000) : 0;
            this.h = COMMON.paddingZero(h);
            this.m = COMMON.paddingZero(m);
            this.s = COMMON.paddingZero(s);
          }
        }, 1000);
      } else {
        this.d = 0;
        this.h = "00";
        this.m = "00";
        this.s = "00";
        this.timer && window.clearInterval(this.timer);
      }
    }
  }
};
</script>
<style lang="less">
// flex 垂直水平居中
.flex-vh-center() {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.activity-bar {
  font-family: PingFangSC-Medium;
  padding: 0 0.64rem;
  width: 100%;
  line-height: 2.13rem;
  color: #fff;
  background-size: cover;
  letter-spacing: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-sizing: border-box;

  .activity-bar__info {
    height: 2.13rem;
    line-height: 2.13rem;
    flex: 3;
    .price {
      font-family: PingFangSC-Semibold;
      font-size: 1.024rem;
    }
    .discount-detail {
      margin-left: 8px;
      display: inline-block;
      // 文字底部对齐 ugly-fix
      & > .pos-fix {
        position: relative;
        font-style: normal;
        top: -2px;
        padding: 2px 12px;
        border-radius: 60px;
        font-size: 22px;
        border: solid 0.7px #fff;
      }
    }
  }
  .time-content {
    background: orange;
  }
  .activity-bar__timer {
    min-width: 0;
    text-align: center;
    .flex-vh-center();
    flex-wrap: wrap;
    flex: 1.2;
    font-size: 0.4693rem;
    color: #ffffff;

    .time-unit-wrap {
      .flex-vh-center();
      & > span {
        .flex-vh-center();
        width: 0.93867rem;
        height: 0.64rem;
        font-size: 0.4693rem;
        color: #fd924e;
        background-color: #fff;
        border-radius: 0.1rem;
      }
    }
    & > p {
      width: 100%;
      flex-shrink: 0;
      line-height: 1.5;
    }
    .counter-timer {
      font-size: 24px;
    }
  }
}
.margin-left-4 {
  margin-left: 4px;
}
</style>
