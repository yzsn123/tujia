<template>
  <div class="searchList">
    <div class="header">
      <van-icon name="arrow-left" class="back" @click="backAction" />
      <div class="search">
        <span>{{ city }}</span>
        <span>搜索{{ city }}的景点，地标、房源</span>
      </div>
      <van-icon name="location" class="location" />
    </div>
    <!-- 筛选 -->
    <Sort :list="list" :res="res" @listChange="changeAction"/>

    <div class="content">
      <myScroll>
        <div class="list">
          <img src="../../../assets/discount.jpg" alt="" />

          <div class="item" 
            v-for="(item, index) in list" 
            :key="index"
            @click="detailAction(item)"
          >
            <div class="img"><img v-lazy="item.img" /></div>
            <div class="message">
              <h2>{{ item.title }}</h2>
              <p>
                整套·{{ item.room }}居{{ item.bed }}床{{
                  item.personCount
                }}人·{{ item.grade }}分/{{ item.num }}点评
              </p>
              <div class="typical">
                <span v-for="ite in item.discount" :key="ite">{{ ite }}</span>
                <span v-for="ite in item.suggest" :key="ite">{{ ite }}</span>
                <em v-for="ite in item.trip" :key="ite">{{ ite }}</em>
              </div>
              <div class="price">
                <span class="newPrice">￥{{ item.newPrice }}</span>
                <em class="odlPrice">￥{{ item.oldPrice }}</em>
                <span class="more" v-for="ite in item.discount" :key="ite">
                  <i class="wz" v-if="ite === '任性价5折'">任性砍5折</i>
                  <i class="lj" v-if="ite === '新手立减'">
                    <van-icon name="volume" class="icon" />
                    <em>立减24</em>
                  </i>
                </span>
              </div>
            </div>
          </div>
          <p>下载app查看更多</p>
        </div>
      </myScroll>
    </div>
  </div>
</template>

<script>
import Sort from "./sort";
export default {
  props: {
    city: String
  },
  components:{
    Sort
  },
  data() {
    return {
      list: [],
      res: [],
    };
  },

  methods: {
    //获取搜索searchlist的数据
    async getSearchList() {
      let res = await this.$store.dispatch("home/requestSearchList", {
        city: this.city
      });
      for (let i in res.list) {
        res.list[i].newPrice += res.list[i].oldPrice;
        this.res.push(res.list[i]);
      }
      this.list = res.list;
    },
    // 点击返回
    backAction() {
      this.$router.back();
    },
    // 改变list的方法
    changeAction(list){
      if(list === 'res'){
        this.list = [...this.res];
      }else{
         this.list = [...list];
      }
    },
    // 点击进入详情页
    detailAction(item){
      localStorage.setItem('detail',JSON.stringify(item));
      this.$router.push('/home/detail');
    }
  },
  created() {
    this.getSearchList();
  }
};
</script>

<style lang="scss" scoped>
.pages {
  .searchList {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: -50px;
    background: white;
    z-index: 99;
    .header {
      color: #4f4f4f;
      display: flex;
      align-items: center;
      .back,
      .location {
        font-size: 20px;
        padding: 0 13px;
      }
      .search {
        flex: 1;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        height: 32px;
        span {
          font-size: 14px;
          padding: 0px 12px;
          line-height: 32px;
          width: 42px;
          background: #f3f4f6;
          &:nth-of-type(2) {
            flex: 1;
            font-size: 12px;
            color: #989898;
            margin-left: 2px;
          }
        }
      }
    }
    .content {
      top: 84px;
      bottom: 0;
    }
  }
}
.searchList {
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 0 52px;
    & > img {
      width: 100%;
      height: 100px;
      margin: 38px 0 72px 0;
    }
    & > p {
      font-size: 45px;
      padding: 125px;
      text-align: center;
      color: #ff8339;
    }
    .item {
      border-radius: 15px;
      box-shadow: 0 10px 15px #aaa;
      overflow: hidden;
      margin-bottom: 50px;
      width: 100%;
      .img {
        height: 653px;
        width: 100%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .message {
        width: 100%;
        padding: 32px 38px;
        box-sizing: border-box;
        h2 {
          font-size: 48px;
          line-height: 52px;
          color: black;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        p {
          font-size: 30px;
          letter-spacing: 3px;
          color: #666666;
          margin: 32px 0;
        }
        .typical {
          font-size: 28px;
          span,
          em {
            display: inline-block;
            text-align: center;
            line-height: 50px;
            width: 136px;
            height: 50px;
            border-radius: 6px;
            margin-top: 13px;
          }
          span {
            background: #fff5e1;
            color: #ff8339;
            margin-right: 13px;
            border: 2px solid #fff5e1;
          }
          em {
            color: #666;
            margin-right: 13px;
            border: 2px solid #666;
          }
        }
        .price {
          margin-top: 33px;
          .newPrice {
            color: #ff8339;
            font-weight: bold;
            font-size: 40px;
            margin-right: 15px;
          }
          .odlPrice {
            text-decoration: line-through;
            color: #666;
            font-size: 28px;
          }
          .more {
            .lj,
            .wz {
              margin-left: 25px;
              display: inline-block;
            }
            .lj {
              color: white;
              background: red;
              padding: 12px;
              font-size: 26px;
              border-radius: 25px;
              line-height: 26px;
              display: inline-block;
              .icon {
                position: relative;
                top: 3px;
              }
              em {
                margin: 0 10px;
              }
            }
            .wz {
              color: #ff8339;
              font-size: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
