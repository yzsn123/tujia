<template>
  <div id="app">
      <router-view class="pages"></router-view>
      <tab-bar></tab-bar>
  </div>
</template>

<script>
import tabBar from "./components/tab-bar";
export default {
    components:{
        [tabBar.name]:tabBar,

    },
    data(){
        return{

        }
    }
}
</script>

<style lang="scss">
#app,html,body{
    width: 100%;
    height: 100%;
    .pages{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 50px;
    }
}
</style>