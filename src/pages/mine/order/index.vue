<template>
  <div class="order">
    <div class="header">
      <van-icon name="arrow-left" @click="backAction" />
      我的订单
    </div>
    <div class="content">
      <myScroll>
        <div class="wrap" v-for="(item, index) in infos" :key="item.id">
          <div class="detailInfo">
            <img :src="details[index].img" alt="" />
            <div class="message">
              <h2>{{ details[index].title }}</h2>
              <p>
                整套出租 | {{ details[index].room }}室1厅 |
                {{ details[index].bed }}床 | 宜住{{
                  details[index].personCount
                }}人
              </p>
            </div>
          </div>
          <ul class="userInfo">
            <li>
              <h3>
                <em>登记人：</em> <span>{{ item.name }}</span>
              </h3>
              <h3>
                <em>联系电话：</em> <span>{{ item.name }}</span>
              </h3>
            </li>
            <li>
              <h3>
                <em>订房套数：</em> <span>{{ item.houseNum }}</span>
              </h3>
              <h3>
                <em>入住人数：</em> <span>{{ item.personNum }}</span>
              </h3>
            </li>
          </ul>
        </div>
      </myScroll>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: [],
      infos: []
    };
  },
  computed: {
    //计算总价
    totalPrice() {
      if (this.detail && this.houseNum) {
        return this.detail.newPrice * this.houseNum;
      } else {
        return " --";
      }
    }
  },
  methods: {
    //返回按钮
    backAction() {
      this.$router.back();
    },
    //获取全部订单的信息
    async requestOrder() {
      let res = await this.$store.dispatch("home/requestOrder");
      console.log(res);
      res.data.map(item => {
        this.details.push(item.detail);
        this.infos.push({
          houseNum: item.houseNum,
          name: item.name,
          personNum: item.personNum,
          tel: item.tel,
          id: item._id
        });
      });
    }
  },
  created() {
    this.requestOrder();
  }
};
</script>

<style lang="scss" scoped>
.pages {
  .order {
    position: absolute;
    z-index: 999;
    top: 0;
    bottom: 0;
    background: white;
    width: 100%;
    left: 0;
    .header {
      font-size: 16px;
      text-align: center;
      i {
        position: absolute;
        left: 0;
        line-height: 44px;
        padding: 0 12px;
        color: #999;
      }
    }
    .content {
      top: 44px;
      bottom: -50px;
      background: #f7f8fa;
    }
  }
}
.order {
  .wrap {
    padding: 25px 0;
  }
  .detailInfo {
    padding: 52px 33px;
    background: white;
    box-sizing: border-box;
    display: flex;
    img {
      width: 165px;
      height: 165px;
      border-radius: 25px;
      margin-right: 23px;
    }
    .message {
      width: 760px;
      h2 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #333;
        font-size: 40px;
        line-height: 100px;
      }
      p {
        font-size: 28px;
        color: #aaa;
        letter-spacing: 3px;
      }
    }
  }
  ul {
    background: white;
    padding: 0 33px 33px 33px;
    
    li {
      display: flex;
      justify-content: space-between;
      line-height: 52px;
      font-size: 35px;
      color: #999;
      h3 {
        flex: 1;
        span {
          color: orange;
        }
        em {
          display: inline-block;
          width: 200px;
        }
      }
    }
  }
}
</style>
