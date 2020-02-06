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
      <span>{{city}}</span>
      <span @click="getLocation">当前位置<em class="iconfont icon-iconset0397"></em></span>
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
        <span class="count" @click="popShow">
            <em>人数</em>
            <i>{{personCount}}</i>
        </span>
    </div>

    <div class="keyName">
      关键字/位置/民宿名
    </div>
    <button @click="searchAction">开始搜索</button>
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
    <van-popup 
    v-model="show" 
    get-container="#app" 
    position="bottom">
      <div class="person">
        <div class="popTitle border-bottom">
          <span @click="cancelAction">取消</span>
          <h2>选择人数</h2>
        </div>
        <ul>
          <li 
          :class='personCount===item ? "personActive" :"" ' 
          v-for="(item,index) in liList" 
          :key="index"
          @click="personAction(item)">{{item}}</li>
        </ul>
      </div>
    </van-popup>
    <div class="map-container" ref="map-container"></div>
  </div>
</template>

<script>
import { Popup } from 'vant';
import { location } from "./../../../../utils/location.js";
export default {
  components:{
    [Popup.name]:Popup
  },
  data() {
    return {
      //选择的地区 1国内·港澳台   2海外
      sel: 1,
      date:{},
      city:'赣州市',
      show: false,
      personCount:'不限',
      liList:['1人','2人','3人','4人','5人','6人','7人','8人','9人','10人+','不限']
    };
  },
  computed:{
    // 获取vuex的date数据
    start(){
      if(this.$store.state.home.date){
        this.date = this.$store.state.home.date;
        return this.$store.state.home.date;
      }else{
         this.date = {};
        return {count:0,start:'请选择入住时间',end:'请选择离店时间'};
      }
    }
  },
  methods: {
    // 国内，海外选择
    countryAction(id) {
      this.sel = id;
    },
    // 点击时间选择
    calenderAction(){
        this.$router.push('/home/calender');
    },
    // 显示弹出层
    popShow(){
      this.show = true;
    },
    // 隐藏弹出层
    cancelAction(){
      this.show = false;
    },
    // 选择人数
    personAction(item){
      this.personCount = item;
      this.$store.commit('home/setPersonCount',item);
      this.show = false;
    },
    // 点击搜索
    searchAction(){
      if(this.date.date){
        this.$router.push('/home/search');
      }else{
        this.$toast('请选择入住时间及离店时间');
      }
    },
    // 获取当前位置
    getLocation() {
      let _this = this;
      AMap.plugin("AMap.CitySearch", function() {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          _this.$toast.loading({message:'定位中',duration:500,position:'middle',className:"locationToast"});
          _this.city = result.city;
        }else{
          _this.$toast.fail({message:'定位失败',duration:500,position:'middle',className:"locationToast"});
        }
        });
      });
    },
  },
  created() {},
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
  .map-container{
    width: 0;
    height: 0;
    overflow: hidden;
  }
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
.person{
    width: 100%;
    height: 676px;
    background: white;
    .popTitle{
      width: 100%;
      height: 138px;
      position: relative;
      line-height: 138px;
      span{
        color: #676767;
        font-size: 36px;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 58px;
      }
      h2{
        font-size: 46px;
        color: #333;
        text-align: center;
      }
    }
    ul{
      box-sizing: border-box;
      padding: 60px 45px;
      display: flex;
      flex-wrap: wrap;
      li{
        background: #f8f8f8;
        color: #222;
        font-size: 33px;
        width: 220px;
        height: 78px;
        line-height: 78px;
        text-align: center;
        margin: 20px 13px;
        border-radius: 39px;
      }
      .personActive{
        background: #fff8f2;
        color: #ec9b5a;
        border: 1px solid #ec9b5a;
      }
    }
  }
</style>
