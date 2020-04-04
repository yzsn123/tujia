<template>
  <div class="order">
    <div class="header">
      <van-icon name="arrow-left" @click="backAction" />
      订单填写
    </div>
    <div class="content">
      <div class="detailInfo">
        <img :src="detail.img" alt="" />
        <div class="message">
          <h2>{{ detail.title }}</h2>
          <p>
            整套出租 | {{ detail.room }}室1厅 | {{ detail.bed }}床 | 宜住{{
              detail.personCount
            }}人
          </p>
        </div>
      </div>

      <div class="userInfo">
        <!-- 日期 -->
        <div @click="dateAction">
          <p>
            <span>入离日期</span>
            <em>修改日期<van-icon name="arrow"/></em>
          </p>
          <div class="date">
            <div class="start">
              <h3>{{ date.start }}</h3>
              <em>周六11:00后入住</em>
            </div>
            <div class="count">共{{ date.count }}晚</div>
            <div class="end">
              <h3>{{ date.end }}</h3>
              <em>周日12:00前离开</em>
            </div>
          </div>
        </div>
        <!-- 数据 -->
        <ul>
          <li class="border-top">
            <label>
              <span>房屋套数</span>
              <input
                type="text"
                placeholder="请输入房屋套数 (套)"
                v-model="houseNum"
              />
            </label>
          </li>
          <li class="border-top">
            <label>
              <span>入住人数</span>
              <input
                type="text"
                placeholder="请输入入住人数 (人)"
                v-model="personNum"
              />
            </label>
          </li>
          <li class="border-top">
            <label>
              <span>入住人</span>
              <input
                type="text"
                placeholder="添加入住人(下单人)"
                v-model="name"
              />
            </label>
          </li>
          <li class="border-top">
            <label>
              <span>联系电话 +86</span>
              <input type="text" placeholder="接收订单信息" v-model="tel" />
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer border-top">
      <span>￥{{ totalPrice }}</span>
      <button @click="confirmAction">提交订单</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      name: null,
      personNum: null,
      tel: null,
      houseNum: null
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
    },
    //展示日期
    date() {
      return this.$store.state.home.date;
    }
  },
  methods: {
    //返回按钮
    backAction() {
      this.$router.back();
    },
    //点击提交订单
    async confirmAction() {
      if (this.personNum && this.name && this.tel && this.houseNum) {
        this.$toast.loading({
          message: "支付中",
          duration: 1000,
          position: "middle",
          className: "locationToast"
        });

        let res = await this.$store.dispatch("home/addOrder", this._data);
        if (res.code === 0) {
          setTimeout(() => {
            this.$toast("支付成功");
            this.$router.back();
          }, 1000);
        }
      } else {
        this.$toast("请补全所有信息");
      }
    },
    //跳转到选择日期
    dateAction() {
      this.$router.push("../calender");
    }
  },
  activated() {
    this.detail = JSON.parse(localStorage.getItem("detail"));
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
      bottom: 50px;
      background: #f7f8fa;
    }
    .footer {
      height: 49px;
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.order {
  .detailInfo {
    margin: 32px 0;
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
  .userInfo {
    width: 1006px;
    margin: 37px;
    border-radius: 25px;
    padding: 0 44px;
    box-sizing: border-box;
    background: white;
    p {
      line-height: 134px;
      height: 134px;
      display: flex;
      justify-content: space-between;
      font-size: 40px;
      span {
        color: black;
      }
      em {
        display: flex;
        height: 134px;
        align-items: center;
        color: #666;
        i {
          padding-left: 0 15px;
        }
      }
    }
    .date {
      width: 100%;
      background: #f8f9fb;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 50px 0;
      .start,
      .end {
        padding: 0 52px;
        h3 {
          font-size: 40px;
          color: black;
          line-height: 70px;
        }
        em {
          color: #aaa;
          font-size: 26px;
        }
      }
      .count {
        font-size: 30px;
        color: #666;
        padding: 10px;
        background: #edeef0;
        border-radius: 25px;
        width: 100px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border: 2px solid #333;
      }
    }
  }
  ul {
    margin-top: 52px;
    li {
      label {
        display: flex;
        height: 146px;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 42px;
          color: black;
        }
        input {
          width: 430px;
          color: orange;
          font-size: 36px;
        }
        ::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
  .footer {
    span {
      color: orangered;
      font-size: 42px;
    }
    button {
      width: 318px;
      height: 96px;
      color: white;
      font-size: 46px;
      line-height: 96px;
      text-align: center;
      border-radius: 25px;
      background: #ff9621;
    }
  }
}
</style>
