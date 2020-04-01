<template>
  <div id="myScroll" ref="myScroll">
    <div class="scrollWrap">
      <!-- 接收到的slot -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 从外面引入的iscroll-probe
import IScroll from "../lib/iscroll-probe";
export default {
  name: "myScroll",
  props: {
    refresh: Function,
    onload: Function,
    canLoad: Boolean
  },
  data() {
    return {
      myScroll: null
    };
  },
  methods: {
    // 控制滚动条的刷新
    fresh() {
      if(this.myScroll){
         this.myScroll.refresh();
      }
    }
  },
  mounted() {
    // 页面挂载完成初始化iscroll
    this.myScroll = new IScroll(this.$refs.myScroll, {
      bounce: true,
      tap: true,
      mouseWheel: true,
      probeType: 3,
      bounce: false
    });
    // 滚动条滚动前刷新
    this.myScroll.on("beforeScrollStart", ()=> {
      this.myScroll.refresh();
    });
    // 监测滚动条的变化，达到条件加载更多
    this.myScroll.on("scroll", () => {
      if (Math.abs(this.myScroll.maxScrollY - this.myScroll.y) < 500) {
        if (this.canLoad && this.onload) {
          this.onload();
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
// 该组件的样式
#myScroll {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
