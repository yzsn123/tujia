<template>
  <div class="grass">
    <h2>美宿种草机</h2>
    <p>民宿达人“墙裂”推荐</p>
    <div class="grasslist">
      <div class="item" v-for="(item, index) in grassList" :key="index" @click="detailAction(item)">
        <img  v-lazy="item.img" />
        <div class="message">
          <p><van-icon name="location" class="icon"/>{{ item.address }}</p>
          <h2>{{ item.title }}</h2>
          <span>整套 {{ item.room }}居{{ item.bed }}床{{ item.person }}人</span>
          <em>￥{{ item.price }}</em>
        </div>

        <i>{{ item.discount }}</i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    grassList:Array
  },
  methods:{
    detailAction(item){
      console.log(item);
      const obj = {
        bed:item.bed,
        discount:item.discount,
        newPrice:item.price,
        room:item.room,
        personCount:item.person,
        title:item.title,
        grade:item.count,
        img:item.img
      }
      localStorage.setItem('detail',JSON.stringify(obj));
      this.$router.push('/home/detail');
    }
  }
};
</script>

<style lang="scss" scoped>
.grass {
  width: 100%;
  padding: 78px 58px;
  box-sizing: border-box;
  & > h2 {
    color: black;
    font-size: 68px;
    // font-weight: bold;
  }
  & > p {
    font-size: 30px;
    color: #999;
    margin: 24px 0;
  }
  .grasslist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 462px;
      border-radius: 25px;
      overflow: hidden;
      padding-bottom: 48px;
      box-shadow: 0 0 25px #aaa;
      margin-bottom: 40px;
      position: relative;
      img {
        width: 100%;
        height: 308px;
      }
      .message{
          width: 100%;
          box-sizing: border-box;
          padding:0 30px;
      }
      p {
        font-size: 28px;
        color: #999;
        margin: 26px 0;
      }
      h2 {
        font-size: 36px;
        line-height: 58px;
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      span {
        display: block;
        font-size: 26px;
        margin: 26px 0;
        color: #999;
      }
      em {
        font-size: 36px;
        color: #fc9749;
      }
      &>i{
          position: absolute;
          left: 28px;
          top: 240px;
          font-size: 26px;
          padding: 10px 25px;
          background: white;
          border-radius: 25px;
      }
      .icon{
          color: #666;
          font-size: 32px;
          margin-right: 5px;
      }
    }
  }
}
</style>
