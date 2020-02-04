<template>
  <div id="myScroll" ref="myScroll">
    <div class="scrollWrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
    fresh() {
      if(this.myScroll){
         this.myScroll.refresh();
      }
    }
  },
  mounted() {
    this.myScroll = new IScroll(this.$refs.myScroll, {
      bounce: true,
      tap: true,
      mouseWheel: true,
      probeType: 3,
      bounce: false
    });
    this.myScroll.on("beforeScrollStart", ()=> {
      this.myScroll.refresh();
    });

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
#myScroll {
  width: 100%;
  // height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
