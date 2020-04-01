<template>
  <div class="list">
    <van-tabs v-model="active" swipeable animated>
      <van-tab v-for="item in foundData" 
      :title="item.tag" 
      :key="item.tag">
        <div class="listWrap">
          <div class="items" v-for="(ite, index) in item.list" :key="index">
            <div class="bgImg"><img :src="ite.img" alt="" /></div>
            <div class="message">
              <p>
                <van-icon name="location" />
                <span>{{ ite.address }}</span>
              </p>
              <h3>{{ ite.title }}</h3>
              <div class="user">
                <div class="userHead">
                  <img :src="ite.headImg" alt="" />
                  <span>{{ ite.username }}</span>
                </div>
                <div class="num">
                  <van-icon name="good-job-o" />
                  <span>{{ ite.num }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props: {
    foundData: Array
  },
  data() {
    return {
      active: 0
    };
  },
  mounted() {
    console.log(this.foundData);
  }
};
</script>

<style lang="scss">
.found {
  .list {
    margin-top: 80px;
    .van-tabs__wrap {
      height: 120px;
      .van-tab {
        line-height: 120px;
        font-size: 42px;
        color: #ababab;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__line {
        width: 25px;
        height: 10px;
        background-color: #ffa719;
      }
    }
    .listWrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .items {
        margin-top: 38px;
        width: 488px;
        overflow: hidden;
        border-radius: 16px;
        box-shadow: 0 0 15px #ddd;
        .message {
          width: 100%;
          padding: 0 26px;
          box-sizing: border-box;
        }
        .bgImg {
          width: 488px;
          height: 450px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          line-height: 80px;
          color: #666;
          font-size: 30px;
          span {
            margin-left: 20px;
          }
        }
        h3 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 38px;
          color: #333;
          line-height: 48px;
        }
        .user {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 125px;
          .userHead {
            display: flex;
            align-items: center;
            img {
              width: 64px;
              height: 64px;
              border-radius: 50%;
            }
            span {
              margin-left: 15px;
              color: #333;
              font-size: 24px;
            }
          }
          .num {
            color: #b1b1b1;
            font-size: 30px;
            display: flex;
            align-items: center;
            i {
              font-size: 40px;
            }
            span {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
