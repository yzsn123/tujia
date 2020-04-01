<template>
  <div class="sort">
    <div class="date" @click="dateAction">
      <span>{{ date.start }}-{{ date.end }}</span>
      <em></em>
    </div>
    <div class="sugSort" @click="sugSortAction">
      <span>{{ sug }}</span>
      <em></em>
    </div>
    <div class="discount" @click="discountAction">
      <span>优惠</span>
      <em></em>
    </div>
    <div class="filter" @click="filterAction">
      <span>筛选</span>
      <em></em>
    </div>
    <div class="popSug" :class="popSug ? 'show' : ''">
      <p
        v-for="item in sugSort"
        :key="item"
        :class="sug === item ? 'active' : ''"
        @click="sugAction(item)"
      >
        {{ item }}
      </p>
    </div>
    <div class="popTypcial" :class="popTypcial ? 'show' : ''">
      <p
        v-for="item in typicalSort"
        :key="item"
        :class="typ === item ? 'active' : ''"
        @click="typAction(item)"
      >
        {{ item }}
      </p>
    </div>
    <div class="popFil" :class="popFil ? 'show' : ''">
      <h2>价格区间</h2>
      <van-slider
        class="slider"
        v-model="slidevalue"
        active-color="#ff8339"
        :min="0"
        :max="7"
        bar-height="4px"
        @change="slideChange"
      >
        <div slot="button" class="custom-button">
          <div class="slidButton"><em></em><em></em><em></em></div>
        </div>
      </van-slider>
      <p class="priceArea">
        <em v-for="(item, index) in priceArr" :key="index">
          {{ item }}
        </em>
      </p>
      <h2>人数</h2>
      <div class="Num">
        <em
          v-for="(ite, index) in Array(10)"
          :key="index"
          @click="filterItem('person', index + 1)"
          :class="pIndex === index ? 'active' : ''"
        >
          {{ index + 1 }}</em
        >
      </div>
      <h2>床数</h2>
      <div class="Num">
        <em
          v-for="(ite, index) in Array(10)"
          :key="index"
          @click="filterItem('bed', index + 1)"
          :class="bIndex === index ? 'active' : ''"
          >{{ index + 1 }}</em
        >
      </div>
      <h2>户型</h2>
      <div class="Num">
        <em
          v-for="(ite, index) in Array(4)"
          :key="index"
          @click="filterItem('room', index + 1)"
          :class="rIndex === index ? 'active' : ''"
          >{{ index + 1 }}居{{ index === 3 ? "+" : "" }}</em
        >
      </div>

      <button class="confim" @click="confimAction">查看房屋</button>
    </div>
  </div>
</template>

<script>
import { Slider } from "vant";
export default {
  props: {
    list: Array,
    res: Array
  },
  components: {
    [Slider.name]: Slider
  },
  computed: {
    date() {
      let res = this.$store.state.home.date;
      let start = res.start;
      let end = res.end;
      start = start.substr(0, 2) + "." + start.substr(3, 2);
      end = end.substr(0, 2) + "." + end.substr(3, 2);
      return { start, end };
    }
  },
  data() {
    return {
      // 控制隐藏
      popSug: false,
      popFil: false,
      popTypcial: false,

      sug: "推荐排序",
      typ: "",

      sugSort: ["推荐排序", "好评优先", "低价优先", "高价优先"],
      typicalSort: ["新手立减", "新房特惠", "今日甩卖", "连住优惠"],
      slidevalue: 7,
      priceArr: [
        "￥0",
        "￥150",
        "￥300",
        "￥400",
        "￥500",
        "￥800",
        "￥1500",
        "不限"
      ],
      filterArr: {
        price: "不限",
        person: "",
        bed: "",
        room: ""
      },
      pIndex: "",
      bIndex: "",
      rIndex: ""
    };
  },
  methods: {
    // 点击日期
    dateAction() {
      this.popSug = false;
      this.popFil = false;
      this.popTypcial = false;
      this.$router.push("/home/calender");
    },
    // 点击推荐排序
    sugSortAction() {
      this.popSug = !this.popSug;
      this.popTypcial = false;
      this.popFil = false;
    },
    sugfilter(kind, direction) {
      let arr = [...this.list];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (direction === "up") {
            if (arr[j][kind] < arr[j + 1][kind]) {
              let tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          } else {
            if (arr[j][kind] > arr[j + 1][kind]) {
              let tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          }
        }
      }
      this.changeList(arr);
    },
    //点击推荐排序子选项
    sugAction(item) {
      this.sug = item;
      if (item === "好评优先") {
        this.sugfilter("grade", "up");
      } else if (item === "低价优先") {
        this.sugfilter("newPrice", "low");
      } else if (item === "高价优先") {
        this.sugfilter("newPrice", "up");
      } else {
        this.changeList("res");
      }
      this.popSug = !this.popSug;
    },

    // 点击优惠
    discountAction() {
      this.popSug = false;
      this.popFil = false;
      this.popTypcial = !this.popTypcial;
    },
    // 点击优惠的子选项
    typAction(item) {
      this.typ = item;
      let arr = [...this.res];
      arr = arr.filter(
        (item, index) => item.discount && item.discount.indexOf(this.typ) !== -1
      );
      this.changeList(arr);
      this.popTypcial = !this.popTypcial;
    },

    // 点击筛选
    filterAction() {
      this.popFil = !this.popFil;
      this.popSug = false;
      this.popTypcial = false;
    },
    // 滑动条
    slideChange(val) {
      switch (val) {
        case 0:
          this.filterArr.price = 0;
          break;
        case 1:
          this.filterArr.price = 150;
          break;
        case 2:
          this.filterArr.price = 300;
          break;
        case 3:
          this.filterArr.price = 400;
          break;
        case 4:
          this.filterArr.price = 500;
          break;
        case 5:
          this.filterArr.price = 800;
          break;
        case 6:
          this.filterArr.price = 1500;
          break;
        case 7:
          this.filterArr.price = "不限";
          break;
        default:
          break;
      }
    },
    // 点击筛选的子选项
    filterItem(kind, count) {
      if (kind === "person") {
        this.filterArr.person = count;
        // 改变选中的选项
        this.pIndex = count - 1;
      } else if (kind === "bed") {
        this.filterArr.bed = count;
        // 改变选中的选项
        this.bIndex = count - 1;
      } else if (kind === "room") {
        this.filterArr.room = count;
        // 改变选中的选项
        this.rIndex = count - 1;
      }
    },
    // 点击查看房屋按钮
    confimAction() {
      let arr = [...this.res];
      if (this.filterArr.price) {
        if (this.filterArr.price !== "不限") {
          arr = arr.filter(
            (item, index) => item.newPrice >= this.filterArr.price
          );
        }
      }
      if (this.filterArr.person) {
        arr = arr.filter(
          (item, index) => item.personCount >= this.filterArr.person
        );
      }
      if (this.filterArr.bed) {
        arr = arr.filter((item, index) => item.bed >= this.filterArr.bed);
      }
      if (this.filterArr.room) {
        arr = arr.filter((item, index) => item.room >= this.filterArr.room);
      }
      this.changeList(arr);
      this.popFil = !this.popFil;
    },
    // 改变父组件的list
    changeList(list) {
      this.$emit("listChange", list);
    }
  }
};
</script>

<style lang="scss" scped>
.pages {
  .sort {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    height: 40px;
    position: absolute;
    left: 0;
    top: 44px;
    background: -webkit-linear-gradient(#f2f6f9, #ffffff);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .date,
    .sugSort,
    .discount,
    .filter {
      background: white;
      box-shadow: 0 1px 5px #aaa;
      border-radius: 10px;
      font-size: 12px;
      color: #ff8339;
      padding: 3px 8px;
      text-align: center;
      em {
        width: 0;
        height: 0;
        display: inline-block;
        border: 3px solid transparent;
        border-top: 3px solid #ff8339;
        margin-left: 5px;
        position: relative;
        top: 1px;
      }
    }
    .filter {
      color: #333;
      em {
        border-top: 3px solid #333;
      }
    }
    .popSug,
    .popFil,
    .popTypcial {
      position: absolute;
      top: 40px;
      background: white;
      z-index: 99;
      width: 100%;
      display: none;
      background: white;
      color: #333;
      box-sizing: border-box;
    }
    .popSug,
    .popTypcial {
      padding-bottom: 12px;
      p {
        box-sizing: border-box;
        padding: 0 18px;
        font-size: 14px;
        line-height: 35px;
      }
    }
    .popFil {
      padding: 15px;
      .slider {
        width: 90%;
        margin: 25px auto 20px auto;
      }
      h2 {
        font-size: 14px;
        color: black;
      }
      .slidButton {
        background: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 5px #aaa;
        em {
          height: 10px;
          border-right: 2px solid #ff8339;
          margin: 0 2px;
        }
      }
      .priceArea {
        width: 90%;
        margin: 0 auto 25px auto;
        display: flex;
        font-size: 12px;
        color: #333;
        em {
          flex: 1;
          transform: scale(0.8);
          &:nth-of-type(1),
          &:nth-of-type(8) {
            flex: 0.5;
            white-space: nowrap;
            color: #ff8339;
          }
        }
      }
      .Num {
        width: 100%;
        margin-bottom: 25px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        em {
          width: 17%;
          text-align: center;
          font-size: 12px;
          background: #f6f6f6;
          margin-top: 12px;
          color: #333;
          line-height: 25px;
          border-radius: 10px;
        }
        .active {
          color: #ff8339;
          background: #fff5e1;
        }
      }
    }
    .active {
      color: #ff8339;
      background: #fff5e1;
    }
    .show {
      display: block;
    }
    .confim {
      width: 50%;
      margin: 12px auto 0 auto;
      background: #ff8339;
      color: white;
      font-size: 16px;
      display: block;
      line-height: 32px;
      border-radius: 16px;
    }
  }
}
</style>
