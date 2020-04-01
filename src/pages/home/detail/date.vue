<template>
  <div class="date border-bottom" @click="dateAction">
    <div>
      <em>入住</em>
      <span>{{start.start}}</span>
    </div>
    <em class="d">共{{start.count}}晚</em>
    <div>
      <em>离店</em>
      <span>{{start.end}}</span>
    </div>
    <van-icon name="arrow" class="icon" />
  </div>
</template>

<script>
export default {
    computed:{
        start(){
            return this.$store.state.home.date;
        }
    },
    methods:{
        dateAction(){
           this.$router.push('/home/calender');
        }
    }
};
</script>

<style lang="scss" scoped>
.date{
    width:100%;
    display: flex;
    position: relative;
    .d,div{
        flex: 1;
        display: flex;
    }
    .d,.icon{
         align-items:center;    
    }
    em{
        color: #999;
        font-size: 28px;
    }
    span{
        font-size: 38px;
        color:#333;
        margin: 28px 0;
    }
    div{
        justify-content: center;
        flex-direction: column;
    }
    .icon{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        font-size: 26px;
        color: #666;
        display: flex;
    }
}
</style>
