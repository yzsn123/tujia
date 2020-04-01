<template>
  <div class="collect">
    <div class="no-login" v-if="!login">
      <img src="../../../assets/collect.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: false
    };
  },

};
</script>

<style lang="scss" scoped>
.collect {
  .no-login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
}
</style>
