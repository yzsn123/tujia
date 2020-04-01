<template>
  <div class="found">
    <div class="found-wrap">
      <div class="content">
        <myScroll>
          <div class="ban">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
            >
            <!-- 轮播图 -->
              <van-swipe-item v-for="(item,index) in Array(4)" :key="index">
                <img :src='"../../../assets/ban" +  (index + 1 ) + ".jpg"' alt="">
              </van-swipe-item> 
            </van-swipe>
          </div>
          <FoundList :foundData="foundData"/>
        </myScroll>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import { mapActions } from "vuex";
import FoundList from '../components/list'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    FoundList
  },
  data(){
    return {
      foundData:[]
    }
  },
  methods:{
    // 获取发现页面的数据
    ...mapActions("found", { requestData: "requestData" }),
    async getFound() {
      let  { data } = await this.requestData();
      this.foundData = data;
      console.log(data)
    }
  },
  created(){
    this.getFound();
  }
};
</script>

<style lang="scss" >
.found {
  .found-wrap {
    position: absolute;
    top: 0;
    left: 40px;
    right: 40px;
    bottom: 0;
  }
  .content {
    top: 0;
    bottom: 0;
  }
  .ban {
    width: 100%;
    margin-top: 40px;
    height: 502px;
    border-radius: 30px;
    overflow: hidden;
    .van-swipe__indicator{
      width: 20px;
      height: 20px;
      margin: 15px;
    }
    img {
      width: 100%;
      height: 502px;
    }
  }
}
</style>
