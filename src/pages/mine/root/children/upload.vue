<template>
  <div class="upload">
    <van-uploader :after-read="afterRead" >
        <img :src="imgSrc" alt="" />
    </van-uploader>
  </div>
</template>

<script>
import { Uploader } from "vant";
export default {
  components: {
    [Uploader.name]: Uploader
  },
  data(){
      return {
          imgSrc:require('../../../../assets/headImg.jpeg')
      }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.imgSrc = file.content;
      this.$store.commit('mine/setUserInfoImg',this.imgSrc);
      console.log(file);
    },
    created(){
        const userInfo = this.$store.state.mine.userInfo;
        if(userInfo && userInfo.img){
            this.imgSrc = userInfo.img;
        }
    }
  }
};
</script>

<style></style>
