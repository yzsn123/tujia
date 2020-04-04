<template>
  <div class="set">
    <div class="header border-bottom">
      <van-icon name="arrow-left" @click="backAction"/>
      设置
    </div>
    <div class="content">
      <ul>
        <li>
          <span>账号安全</span>
          <van-icon name="arrow" />
        </li>
      </ul>

      <ul>
        <li class="border-bottom">
          <span>关于途家民宿</span>
          <van-icon name="arrow" />
        </li>
        <li class="border-bottom">
          <span>推荐给朋友</span>
          <van-icon name="arrow" />
        </li>
        <li class="border-bottom">
          <span>意见反馈</span>
          <van-icon name="arrow" />
        </li>
        <li>
          <span>APP版本</span>
          <i>当前版本8.13.0</i>
        </li>
      </ul>
      <ul>
        <li class="border-bottom">
          <span>房屋编号直达</span>
          <van-icon name="arrow" />
        </li>
        <li class="border-bottom">
          <span>给途家民宿好评</span>
          <van-icon name="arrow" />
        </li>
        <li>
          <span>放心消费声明</span>
          <van-icon name="arrow" />
        </li>
      </ul>

      <p @click="logoutAction">退出登录</p>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        backAction(){
            this.$router.back();
        },
        async logoutAction(){
          const res = await this.$store.dispatch('login/requestLogout');
          if(res){
            this.$router.push('/home')
          }
        }
    }
};
</script>

<style lang="scss" scoped>
.pages {
  .set {
    bottom: -50px;
    background: white;
    z-index: 999;
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    background: #f8f9fb;
  }
  .header {
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    background: white;
    i {
      position: absolute;
      left: 0;
      padding: 0 16px;
      top: 0;
      line-height: 44px;
      font-size: 20px;
    }
  }
  .content{
      top: 44px;
      bottom: 0;
  }
}
.set {
  ul {
    background: white;
    margin-top: 28px;
    padding: 0 35px;
    box-sizing: border-box;
    li {
      height: 122px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 40px;
      color: #666;
    }
  }
  p{
      margin-top: 82px;
      line-height: 122px;
      background: white;
      text-align: center;
      font-size: 40px;
  }
}
</style>
