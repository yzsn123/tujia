<template>
  <div class="message">
    <div class="header border-bottom">消息</div>
    <img src="../../../assets/message.jpg" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.message{
  background: #f8f9fb;
  .header{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    background: white;
  }
}
.pages{
  img{
    position: absolute;
    top: 50px;
    width:100%;
    left: 0;
  }
}
</style>