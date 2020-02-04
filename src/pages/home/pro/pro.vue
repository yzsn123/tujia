<template>
  <div class="pro">
    <div class="header">
      <span class="back" @click="backAction">
        <van-icon name="arrow-left" />
      </span>
      <h2>优选PRO</h2>
    </div>
    <div class="content">
        <myScroll>
            <div class="imgWrap" v-for="(item,index) in imgArray" :key="index">
                <img :src='"./../../../assets/pro"+(index+1)+".jpg"' alt="">
            </div>
        </myScroll>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            imgArray:Array(10).fill(1)
        }
    },
    methods:{
        backAction(){
            this.$router.back();
        }
    }
};
</script>

<style lang="scss" scoped>
.pages {
  .pro {
    position: absolute;
    left: 0;
    top: 0;
    bottom: -50px;
    width: 100%;
    background: white;
    z-index: 99;
  }
  .header {
    background: white;
    color: #666;
    font-size: 16px;
    .back {
      position: absolute;
      padding: 0 15px;
    }
    h2 {
      text-align: center;
    }
  }
  .content{
      
      top: 44px;
      bottom: 0;
      img{
          width: 100%;
      }
  }
}
</style>
