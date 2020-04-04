<template>
  <div id="edit">
    <!-- 头部 -->
    <div class="header border-bottom">
      <van-icon name="cross" @click="backAction" />
      <span>编辑个人资料</span>
      <i @click="confimAction">保存</i>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 头像 -->
      <div class="headImg">
        <UploadImg/>
      </div>
      <!-- 要填的选项 -->
      <ul>
        <li class="border-bottom">
          <label><em>昵称</em><input type="text" v-model="name"/></label>
          <van-icon name="arrow" />
        </li>
        <li class="border-bottom" @click="sexAction(null)">
          <em>性别</em><span>{{ sex }}</span>
          <van-icon name="arrow" />
        </li>
        <li class="border-bottom" @click="birdthShowAction(null)">
          <em>生日</em><span>{{ birth }}</span>
          <van-icon name="arrow" />
        </li>
        <li class="border-bottom" @click="areaFlagAction('hometown')">
          <em>家乡</em><span>{{ hometown }}</span>
          <van-icon name="arrow" />
        </li>
        <li @click="areaFlagAction('oftenLive')">
          <em>所在城市</em><span>{{ oftenLive }}</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <!-- 性别选择 -->
    <van-popup v-model="sexShow" position="bottom" :style="{ height: '30%' }">
      <div class="sex">
        <span class="iconfont icon-nan" @click="sexAction('男')"></span>
        <span class="iconfont icon-nv" @click="sexAction('女')"></span>
      </div>
    </van-popup>

    <!-- 生日选择 -->
    <van-popup
      v-model="birdthShow"
      position="bottom"
      :style="{ height: '35%' }"
    >
      <div class="birdth">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="birdthAction"
          @cancel="birdthShowAction"
        />
      </div>
    </van-popup>
    <!-- 家乡 -->
    <!-- 所在城市 -->
    <areaCom :showArea="showArea" :onArea="AreaAction"></areaCom>
  </div>
</template>

<script>
import areaCom from "./area.vue";
import { Popup, DatetimePicker } from "vant";
import UploadImg from './upload'
export default {
  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    areaCom,
    UploadImg
  },
  data() {
    return {
      sexShow: false, //显示性别
      birdthShow: false, //显示生日
      showArea: false, // 显示地址
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 11, 31),
      currentDate: new Date(),

      name: null,
      sex: null,
      birth: null,
      hometown: null,
      oftenLive: null,
      areaFlag: null
    };
  },
  methods: {
    //性别选择
    sexAction(sex) {
      if (sex) {
        this.sex = sex;
      }
      this.sexShow = !this.sexShow;
    },
    //生日选择
    birdthAction(val) {
      let date = new Date(val);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      this.birth = `${y} / ${m} / ${d}`;

      this.birdthShow = !this.birdthShow;
    },
    //生日显示
    birdthShowAction() {
      this.birdthShow = !this.birdthShow;
    },
    //地址选择
    AreaAction(val) {
      if (val) {
        //清空之前的城市选项
        let area = "";
        //组合选中的地址数据
        for (var k in val) {
          if (val[k]) {
            area += `${val[k].name} `;
          }
        }
        //如果选中的是家乡
        if (this.areaFlag == "hometown") {
          this.hometown = area;
        }
        //如果选中的是常居地
        else if (this.areaFlag == "oftenLive") {
          this.oftenLive = area;
        }
      }
      this.showArea = !this.showArea;
    },
    //选择是家乡还是居住地
    areaFlagAction(flag) {
      this.areaFlag = flag;
      this.showArea = !this.showArea;
    },
    //返回
    backAction() {
      this.$router.back();
    },
    //保存
    async confimAction() {
      let obj = {
        name: this.name,
        sex: this.sex,
        birth: this.birth,
        hometown: this.hometown,
        oftenLive: this.oftenLive,
        img: this.$store.state.mine.userInfo.img
      };
      await this.$store.dispatch("mine/updateUserInfo", obj);
      this.$router.back();
    },
    //初始化信息
    initUserInfo(){
        if(this.$store.state.mine.userInfo){
            const userInfo = this.$store.state.mine.userInfo;
            this.name = userInfo.name;
            this.sex = userInfo.sex;
            this.birth = userInfo.birth;
            this.hometown = userInfo.hometown;
            this.oftenLive = userInfo.oftenLive;
        }
    }
  },
  created(){
    this.initUserInfo();
  }
};
</script>

<style lang="scss">
.pages {
  #edit {
    background: #f8f9fb;
    position: absolute;
    left: 0;
    top: 0;
    bottom: -50px;
    width: 100%;
    z-index: 999;
    .header {
      display: flex;
      align-items: center;
      background: white;
      span {
        flex: 1;
        text-align: center;
        font-size: 16px;
      }
      i {
        padding: 0 12px;
        font-size: 14px;
        color: #666;
      }
    }
  }

  .content {
    top: 44px;
    bottom: 0;
  }
}
#edit {
  .headImg {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
    }
  }
  ul {
    padding: 0 55px;
    background: white;
    li {
      height: 169px;
      font-size: 42px;
      color: #666;
      display: flex;
      align-items: center;
      position: relative;
      label {
        flex: 1;
        height: 169px;
        line-height: 169px;
      }
      em {
        display: inline-block;
        width: 200px;
      }
      input,
      span {
        margin-left: 52px;
        color: #999;
      }
      i {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 25px;
        line-height: 169px;
        color: #aaa;
      }
    }
  }
  .sex {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconfont {
      font-size: 125px;
    }
    .icon-nan {
      color: skyblue;
      padding: 52px;
    }
    .icon-nv {
      color: orchid;
    }
  }
  .van-picker__toolbar {
    height: 152px;
    .van-picker__confirm,
    .van-picker__cancel {
      font-size: 40px;
      padding: 0 35px;
    }
    .van-picker__cancel {
      color: #666;
    }
    .van-picker__confirm {
      color: orange;
    }
  }
  .van-picker-column__item {
    justify-content: center;
  }
}
</style>
