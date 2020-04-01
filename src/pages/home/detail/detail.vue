<template>
  <div class="detail">
    <div class="header">
      <van-icon name="arrow-left" @click="backAction"/>
      <i>
        <em class="iconfont icon-fenxiang"></em>
        <em class="iconfont icon-aixin1"></em>
        <em class="iconfont icon-xiaoxi"></em>
      </i>
    </div>
    <div class="bg">
      <img :src="detail.img" alt="" />
    </div>
    <div class="content">
      <myScroll>
        <div class="message-wrap">
          <div class="message-head">
            <div class="head-title">
              <h2>{{ detail.title }}</h2>
              <span v-for="(item, index) in detail.trip" :key="index">
                {{ item }}
              </span>
            </div>
            <div class="head-grade">
              <span class="iconfont icon-dianzan"> 超赞</span>
              <em>{{ detail.grade }}</em>
            </div>
          </div>

          <div class="icon">
            <div class="icon-item">
              <em class="iconfont icon-fangwu"></em>
              <span>整套普通公寓</span>
            </div>
            <div class="icon-item">
              <em class="iconfont icon-chugui"></em>
              <span>{{ detail.room }}室1厅1卫1厨</span>
            </div>
            <div class="icon-item">
              <em class="iconfont icon-chuang"></em>
              <span>宜住{{ detail.personCount }}人</span>
            </div>
            <div class="icon-item">
              <em class="iconfont icon-chuang1"></em>
              <span>{{ detail.bed }}床：大床x{{ detail.bed }}</span>
            </div>
          </div>

          <Date />
          <div class="discount">
            <img src="../../../assets/discount_03.jpg" alt="" />
            <span v-for="(item, index) in detail.discount" :key="index">
              {{ item }}
            </span>
          </div>
        </div>
        <div class="bigImg">
            <img class="bigImg" src="../../../assets/detail.jpg" alt="" />
        </div>
        
      </myScroll>
    </div>
    <div class="foot border-top">
        <span><i>￥{{detail.newPrice}}</i>/晚</span>
        <em>立即预定</em>
    </div>
  </div>
</template>

<script>
import Date from "./date";
export default {
  components: {
    Date
  },
  data() {
    return {
      detail: {}
    };
  },
  methods:{
      backAction(){
          this.$router.back();
      }
  },
  activated() {
    if (localStorage.getItem("detail")) {
      this.detail = JSON.parse(localStorage.getItem("detail"));
    }
  }
};
</script>

<style lang="scss" scoped>
.pages {
  .detail {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: -50px;
    z-index: 99;
    background: white;
  }
  .foot{
      position: absolute;
      left: 0;
      height: 49px;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding:0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
          flex: 1;
          font-size: 12px;
          i{
              color: orangered;
              font-size: 16px;
          }
      }
      em{
          width: 100px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 14px;
          color: white;
          background: orangered;
          border-radius: 10px;
      }

  }
}
.detail {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    i {
      padding: 0 10px;
      font-size: 20px;
      display: flex;
      color: white;
      em {
        font-size: 20px;
        padding: 0 8px;
      }
    }
  }
  .bg {
    position: absolute;
    width: 100%;
    top: 0;
    img {
      width: 100%;
    }
  }
  .content {
    top: 44px;
    bottom: 50px;
    z-index: 101;
  }
  .message-wrap {
    margin: 450px auto 0 auto;
    width: 996px;
    background: white;
    box-sizing: border-box;
    border-radius: 34px;
    padding: 12px 34px 0 34px;
    box-shadow: 0 0 25px #fcc;
    .message-head {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .head-title {
        flex: 1;
        h2 {
          font-size: 62px;
          color: #333;
          line-height: 80px;
          margin-bottom: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        span {
          background: #f3f4f6;
          color: #666;
          margin-right: 15px;
          padding: 8px 20px;
          font-size: 24px;
          border-radius: 25px;
        }
      }
      .head-grade {
        width: 146px;
        height: 146px;
        border-radius: 25px;
        box-shadow: 0 0 20px #fcc;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span {
          margin-bottom: 20px;
          font-size: 26px;
          padding: 12px 15px;
          background: orange;
          border-radius: 15px;
          color: white;
        }
        em {
          font-size: 46px;
          color: #333;
          font-weight: bold;
        }
      }
    }
    .icon {
      width: 100%;
      margin: 35px 0;
      padding: 12px 0;
      display: flex;
      flex-wrap: wrap;
      background: #f8f9fb;
      border-radius: 25px;
      .icon-item {
        width: 50%;
        font-size: 34px;
        margin: 18px 0;
        display: flex;
        align-items: center;
        em {
          margin: 0 32px;
          color: #dbdbdb;
        }
        span {
          color: #666;
        }
      }
    }
    .discount {
      height: 100px;
      display: flex;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        margin-right: 28px;
      }
      span {
        font-size: 30px;
        color: #333;
        margin-right: 28px;
      }
    }
  }
  .bigImg {
    padding: 25px 0 252px 0;
    width: 100%;
    img{
        width: 100%;
    }
  }
  
}
</style>
