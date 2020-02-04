<template>
  <div class="calender">
    <div class="header">
      <van-icon name="cross" class="cancel" @click="cancelAction" />
    </div>
    <div class="title">
      <div class="start">
        <span>入住日期</span>
        <p>{{ start }}</p>
      </div>
      <em><i>共0晚</i></em>
      <div class="end">
        <span>离店日期</span>
        <p>{{ end }}</p>
      </div>
    </div>
    <div class="content-calender">
      <van-calendar
        type="range"
        title=" "
        color="#fb9727"
        :poppable="false"
        :show-confirm="true"
        :formatter="formatter"
        @select="selectAction"
        @confirm="onConfirm"
        confirm-disabled-text="请选择离店时间"
      />
    </div>
  </div>
</template>

<script>
import { Calendar } from "vant";
export default {
  components: {
    [Calendar.name]: Calendar
  },
  data() {
    return {
      start: null,
      end: null
    };
  },
  methods: {
    // 取消
    cancelAction() {
      this.$router.back();
    },
    // 确认按钮
    onConfirm(date) {
      console.log(date);
    },
    // 日期格式化
    formatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const D = new Date();
      const m = D.getMonth() + 1;
      const d = D.getDate();
      if (m === month && d === date) {
        day.text = "今天";
      }
      day.bottomInfo = "";
      if (day.type === "start") {
        day.topInfo = "入住";
      } else if (day.type === "end") {
        day.topInfo = "离店";
      }
      return day;
    },
    // 日期选中
    selectAction(date) {
      const time1 = new Date(date[0]);
      this.start = `${time1.getMonth() + 1}月${time1.getDate()}日`;
      if (date[1]) {
        const time2 = new Date(date[1]);
        this.end = `${time2.getMonth() + 1}月${time2.getDate()}日`;
      } else {
        this.end = " ";
      }
    }
  },
  created() {
    const time = new Date();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    this.start = `${m}月${d}日`;
    this.end = `${m}月${d + 1}日`;
  }
};
</script>

<style lang="scss">
.pages {
  .calender {
    position: absolute;
    left: 0;
    top: 0;
    bottom: -50px;
    width: 100%;
    background: white;
    z-index: 99;
    .title {
      position: absolute;
      left: 0;
      top: 44px;
      width: 100%;
      display: flex;
      height: 90px;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      color: #999;
      p {
        text-align: center;
        color: #333;
        font-size: 15px;
        margin: 5px 0;
      }
      span {
        font-size: 12px;
        color: #999;
        margin: 5px 0;
      }
      em {
        flex: 1;
        text-align: center;
        i {
          font-size: 12px;
          padding: 12px 36px;
          border-bottom: 1px solid #999;
        }
      }
    }
  }
  .header {
    .cancel {
      color: #888;
      font-size: 15px;
      position: absolute;
      padding: 0 15px;
      line-height: 44px;
    }
  }

  .content-calender {
    position: absolute;
    left: 0;
    width: 100%;
    top: 134px;
    bottom: 0;
  }
}
.calender {
  .van-calendar__header-title {
    height: 0;
  }
  .van-calendar__month-title {
    line-height: 160px;
    font-size: 36px;
    color: #333;
    height: 160px;
  }
  .van-calendar__weekdays {
    height: 72px;
    font-size: 32px;
    color: #888;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    .van-calendar__weekday {
      line-height: 72px;
    }
  }
  .van-calendar__day {
    font-size: 32px;
    height: 150px;
    line-height: 200px;
    display: block;
    .van-calendar__top-info {
      font-size: 24px;
      height: 24px;
      padding: 25px 0;
    }
  }
  .van-calendar {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .van-calendar__footer {
    position: absolute;
    background: white;
    width: 100%;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    .van-button {
      height: 130px;
      line-height: 130px;
      font-size: 36px;
    }
  }
}
</style>
