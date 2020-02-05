<template>
  <div class="search">
    <div class="select">
      <span @click="countryAction(1)" :class="sel === 1 ? 'selactive' : ''"
        >国内·港澳台</span
      >
      <span @click="countryAction(2)" :class="sel === 2 ? 'selactive' : ''"
        >海外</span
      >
    </div>
    <div class="city border-bottom">
      <span>赣州</span>
      <span>当前位置<em class="iconfont icon-iconset0397"></em></span>
    </div>
    <div class="date border-bottom">
      <div class="time" @click="calenderAction" :class='start.count ? "" : "isTime"'>
            <span>
                <em>入住</em>
                <i>{{start.start}}</i>
            </span>
            <span class="night" v-if="start.count">{{start.count}}晚</span>
            <span>
                <em>离店</em>
                <i>{{start.end}}</i>
            </span>
        </div>
        <span class="count">
            <em>人数</em>
            <i>不限</i>
        </span>
    </div>

    <div class="keyName">
      关键字/位置/民宿名
    </div>
    <button>开始搜索</button>
    <div class="add">
      <span>
        <em class="iconfont icon-xinyongqia"></em>
        <i>信用免押金</i>
      </span>
      <span>
        <em class="iconfont icon-anquanbaozhang"></em>
        <i>24小时房客</i>
      </span>
      <span>
        <em class="iconfont icon-shouye1"></em>
        <i>房源房东真实认证</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      //选择的地区 1国内·港澳台   2海外
      sel: 1,
      date:{},
    };
  },
  computed:{
    start(){
      if(this.$store.state.home.date){
        return this.$store.state.home.date;
      }else{
        return {count:0,start:'请选择入住时间',end:'请选择离店时间'};
      }
    }
  },
  methods: {
    countryAction(id) {
      this.sel = id;
    },
    calenderAction(){
        this.$router.push('/home/calender');
    },

  },
  created() {
    //如果vuex里面有date数据
    if(this.$store.state.home.date){
        const date = this.$store.state.home.date;
        this.start = date.start;
        this.end = date.end;
        this.count = date.count;
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  background: white;
  width: 970px;
  height: 660px;
  margin: 0 55px;
  border-radius: 25px;
  box-shadow: 0 0 10px #aaaaaa;
  overflow: hidden;
  .select {
    width: 100%;
    span {
      display: inline-block;
      width: 50%;
      font-size: 40px;
      height: 98px;
      line-height: 98px;
      text-align: center;
      color: #999;
    }
    .selactive {
      background: #f3f4f6;
      color: black;
    }
  }
  .city {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: space-between;
    span {
      line-height: 110px;
      padding: 0 58px;
      &:nth-of-type(1) {
        flex: 1;
        font-size: 40px;
        color: #333;
      }
      &:nth-of-type(2) {
        font-size: 32px;
        color: #666;
      }
      em {
        color: #fd9647;
        margin-left: 32px;
        font-weight: bold;
      }
    }
  }
  .date {
    width: 100%;
    height: 120px;
    display: flex;
    .time,
    .count {
      padding: 0 58px;
    }
    .time {
      flex: 1;
      display: flex;
      .night{
        text-align: center;
        font-size: 36px;
        letter-spacing: 5px;
        color: #666;
      }
      span {
        flex: 1;
      }
    }
    .isTime{
      i{
        color: #aaa;
        font-size: 24px;
      }
      
    }
    .count {
      width: 116px;
    }
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 30px;
      color: #666;
      em {
        font-size: 24px;
        color: #c4c4c4;
        margin: 10px 0;
      }
      i {
        color: #333;
        font-size: 36px;
      }
    }
  }
  .keyName {
    line-height: 116px;
    padding: 0 58px;
    color: #999;
    font-size: 36px;
    letter-spacing: 5px;
  }
  button {
    width: 846px;
    height: 106px;
    line-height: 106px;
    text-align: center;
    border-radius: 53px;
    font-size: 46px;
    color: white;
    background: #fb9727;
    margin: 0 62px;
  }
  .add {
    width: 100%;
    margin-top: 35px;
    display: flex;
    span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      em {
        font-size: 36px;
      }
      i {
        font-size: 26px;
        margin: 0 8px;
      }
    }
  }
}
</style>
