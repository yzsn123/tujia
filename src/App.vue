<template>
  <div id="app">
    <router-view class="pages"></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import tabBar from "./components/tab-bar";
export default {
  components: {
    [tabBar.name]: tabBar
  },
  data() {
    return {};
  },
  methods:{
    async checkLogin(){
      let res = await this.$store.dispatch('login/checkoutLogin');
    }
  },
  created(){
    this.checkLogin();
  }
};
</script>

<style lang="scss">
#app,
html,
body {
  width: 100%;
  height: 100%;
  .pages {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 50px;
  }
  .header {
    width: 100%;
    height: 44px;
    left: 0;
    top: 0;
    line-height: 44px;
    position: absolute;
  }
  .content {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
.Toast{
  background:rgba(255,255,255);
  box-shadow: 0 0 25px #fb9727;
  font-size: 52px;
  margin-top: 100px;
  padding: 100px;
  border-radius: 25px;
  color: #fb9727
}
.locationToast{
  transform: scale(1.5);
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%
}
</style>
