<template>
  <div id="login">
    <div class="header">
      <van-icon name="cross" @click="backAction" />
    </div>
    <div class="content">
      <h1>登录途家</h1>
      <p>登录以使用更多的服务</p>
      <label>
        <span>账 号：</span>
        <input type="text" v-model="tel" />
      </label>
      <label>
        <span>密 码：</span>
        <input type="text" v-model="pwd" />
      </label>

      <button class="confim" @click="confimAction">登录</button>
      <p>第一次登录默认为注册</p>

      <div class="agreement">
        <input type="checkbox" v-model="agree" />
        <p>
          登录即同意
          <span>中国移动认证服务条款</span>
          和
          <span>《途家网服务协议》</span>、
          <span>《隐私政策》</span>
          并使用本机号码登录
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      pwd: "",
      agree: true
    };
  },
  methods: {
    backAction() {
      this.$router.back();
    },
    async confimAction() {
      //判断是否输入手机号及密码
      if (this.tel && this.pwd) {
        //如果手机号不正确
        if (!/^1[3456789]\d{9}$/.test(this.tel)) {
          this.$toast("请输入正确的手机号码");
          return false;
        }
        const res = await this.$store.dispatch("login/requestLogin", {
          tel: this.tel,
          pwd: this.pwd
        });
        if(res){
            localStorage.setItem('isLogin',true)
            let path = localStorage.getItem('to');
            if( path ) {
              this.$router.push(path);
            } else {
              this.$router.push('/home');
            }
            
        } else {
            this.$toast("密码错误");
        }
      } else {
          this.$toast("请输入手机号及密码");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  bottom: 0px;
  z-index: 999;
  background: white;
  .header {
    color: #999;
    i {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 20px;
      padding: 0 16px;
      line-height: 44px;
    }
  }
  .content {
    top: 44px;
    bottom: 0;
    padding: 0 25px;
    box-sizing: border-box;
  }
  h1 {
    margin-top: 125px;
    font-size: 82px;
    color: black;
  }
  p {
    margin: 40px 0 100px 0;
    font-size: 30px;
    color: #999;
  }
  label {
    display: block;
    color: #333;
    font-size: 48px;
    margin: 25px 0;
    text-align: center;
    input {
      border: 2px solid #ff9645;
      height: 90px;
      line-height: 90px;
      width: 450px;
      padding: 0 25px;
      border-radius: 25px;
      margin-left: 35px;
      color: #666;
    }
  }
  .confim {
    width: 838px;
    text-align: center;
    line-height: 96px;
    margin: 125px auto 0 auto;
    background: #ff9645;
    border-radius: 25px;
    color: white;
    font-size: 40px;
    display: block;
    & + p {
      text-align: center;
    }
  }
  .agreement {
    position: absolute;
    bottom: 52px;
    left: 0;
    right: 0;
    display: flex;
    width: 750px;
    line-height: 40px;
    margin: 0 auto;
    p {
      margin: 0;
    }
    span {
      color: #333;
    }
  }
}
</style>
