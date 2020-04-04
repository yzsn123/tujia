<template>
  <div class="home">
    <!-- 首页搜索部分 -->
    <div class="content">
      <myScroll :onload="loadAction" :canLoad="canload" ref="myScroll">
        <div class="bg"></div>
        <div class="search-wrap">
          <div class="title">
            <h2>途家民宿全面升级</h2>
            <h2>疫情退改保障政策</h2>
          </div>
          <!-- 搜索框组件 -->
          <Search />
        </div>
        <!-- 新人专享 -->
        <div class="new">
          <img src="./../../../assets/home_03.jpg" alt />
        </div>

        <!-- 超值特惠 -->
        <div class="discount-wrap">
          <h2>超值特惠</h2>
          <p>限时折扣，手快有，手慢无</p>
          <div class="discount" @click="searchAction">
            <div class="left">
              <img src="./../../../assets/home_07.jpg" alt />
            </div>
            <div class="right">
              <div class="top">
                <img src="./../../../assets/home_09.jpg" alt />
              </div>
              <div class="bottom">
                <img src="./../../../assets/home_11.jpg" alt />
                <img src="./../../../assets/home_13.jpg" alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 首页大图 -->
        <router-link class="plan" to="/home/pro"
          ><img src="../../../assets/home_17.jpg"
        /></router-link>
        <div class="safe">
          <img src="../../../assets/home_18.jpg" alt="" />
        </div>

        <!-- 美宿种草机 -->
        <Grass :grassList="grassList" />
        <!-- 没有更多了 -->
        <p v-if="noMore" class="foot">没有更多了</p>
      </myScroll>
    </div>
    <transition class enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Grass from "./component/grass";
import Search from "./component/search";
import { mapActions } from "vuex";
export default {
  components: {
    Search,
    Grass
  },
  data() {
    return {
      canload: true,
      noMore: false,
      grassList: []
    };
  },
  methods: {
    //触发加载更多的请求
    loadAction() {
      this.canload = false;
      this.getGrass();
    },
    // 获取种草数据
    ...mapActions("home", { requestGrass: "requestGrass"}),
    async getGrass() {
      // 如果没有更多了就
      if (this.noMore) return;

      let { data } = await this.requestGrass();
      // 如果是第一次请求
      if (this.grassList.length === 0) {
        this.grassList = data.list;
      } else {
        // 不是第一次请求
        this.grassList = this.grassList.concat(data.list);
        if (this.grassList.length >= data.count) {
          this.noMore = true;
        }
      }
      // 渲染完dom进行的操作，防抖
      this.$nextTick(() => {
        this.$refs.myScroll.fresh();
        this.canload = true;
      });
    },
    searchAction(){
      this.$router.push(`/home/searchList/${this.$store.state.home.city}`);
    }
  },
  created() {
    // 请求种草数据
    this.getGrass();
  }
};
</script>

<style lang="scss" scoped>
.home {
  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 1000px;
    background: -webkit-linear-gradient(#ff8d1d, #fc5300);
    z-index: -1;
  }
  .search-wrap {
    width: 100%;

    .title {
      font-size: 90px;
      color: white;
      text-align: center;
      font-weight: bold;
      padding: 130px 0;
      h2 {
        line-height: 110px;
      }
    }
  }
  .new {
    width: 100%;
    margin-top: 43px;
    display: flex;
    justify-content: center;
    img {
      width: 966px;
      height: 146px;
    }
  }
  .discount-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 100px 52px 0 52px;
    h2 {
      font-size: 58px;
      // font-weight: bold;
      color: black;
    }
    p {
      font-size: 28px;
      color: #999;
      margin: 16px 0 30px 0;
    }
    .discount {
      display: flex;
      justify-content: space-between;
    }
    .left,
    .right {
      width: 473px;
      height: 438px;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        img {
          height: 208px;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        img {
          width: 225px;
          height: 208px;
        }
      }
    }
  }
  .plan {
    width: 100%;
    img {
      padding: 105px 0;
      width: 100%;
    }
  }
  .safe {
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 978px;
      height: 370px;
      border-radius: 25px;
      overflow: hidden;
      box-shadow: 0 0 15px #aaa;
    }
  }
  .foot {
    font-size: 24px;
    letter-spacing: 5px;
    color: #666;
    text-align: center;
    padding-bottom: 52px;
  }
}
</style>
