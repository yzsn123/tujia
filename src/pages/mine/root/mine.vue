<template>
  <div class="mine">
    <img src="../../../assets/mineBg.jpg" alt="" class="bg" />
    <!-- 头部 -->
    <div class="header">
      <span>{{username.name}}</span>
      <i class="iconfont icon-icon-test" @click="setAction"></i>
    </div>
    <div class="content">
      <!-- 个人信息 -->
      <div class="usermessage">
        <img src="../../../assets/headImg.jpeg" alt="" />
        <div class="edit" @click="editAction">
          <span class="iconfont icon-bianji"></span>
        </div>
      </div>
      <!-- 查看订单 -->
      <h2 @click="orderAction">
        <span>我的订单</span>
        <em>查看全部<van-icon name="arrow"/></em>
      </h2>
      <!-- 我的内容展示 -->
      <div class="mycontent">
        <div
          class="items"
          v-for="(item, index) in contentArray"
          :key="item.title"
        >
          <img :src="require('../../../assets/mine' + index + '.jpg')" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>

    <transition
      class
      enter-active-class="slideInRight"
      leave-active-class="slideOutRight"
    >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentArray: [
        { title: "内容管理" },
        { title: "浏览历史" },
        { title: "常用信息" },
        { title: "开具发票" },
        { title: "邀请好友" },
        { title: "在线客服" },
        { title: "卡包" },
        { title: "安全中心" },
        { title: "托管加盟" }
      ]
    };
  },
  computed:{
    username(){
      return this.$store.state.mine.userInfo;
    }
  },
  methods: {
    setAction() {
      this.$router.push("/mine/setting");
    },
    editAction(){
      this.$router.push('/mine/edit')
    },
    async requestUserInfo(){
      let { data } = await this.$store.dispatch('mine/requestUserInfo');
      if(data){
        this.$store.commit('mine/setUserInfo',data[0]);
      }
    },
    //跳转到订单页
    orderAction(){
      this.$router.push('mine/order');
    }
  },
  created(){
    this.requestUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.mine {
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .header {
    color: white;
    font-size: 16px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: bold;
      font-family: "楷体";
      margin-left: 15px;
    }
    i {
      padding: 0 10px;
    }
  }
  .content {
    top: 152px;
    bottom: 0;
    background: #f8f9fb;
  }
  .usermessage {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 50px;
    background: white;
    box-sizing: border-box;
    img {
      width: 216px;
      height: 216px;
      border-radius: 50%;
      border: 1px solid #333;
      position: relative;
      top: -88px;
    }
    .userNickname {
      width: 552px;
      margin-left: 52px;
      p {
        font-size: 28px;
        line-height: 52px;
        color: #999;
        margin: 35px 0 15px 0;
      }
      span {
        color: #333;
        font-size: 36px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .edit {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-top: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #374049;
      span {
        color: white;
        font-size: 52px;
      }
    }
  }
  h2 {
    height: 80px;
    padding: 0 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    span {
      color: black;
      font-size: 45px;
    }
    em {
      color: #999;
      font-size: 30px;
      i {
        margin-left: 15px;
      }
    }
  }
  .mycontent {
    margin-top: 30px;
    padding: 0 52px 152px 52px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background: white;
    .items {
      width: 280px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 52px;
      img {
        width: 52px;
        margin-bottom: 29px;
      }
      span {
        color: #333;
        font-size: 38px;
      }
    }
  }
}
</style>
