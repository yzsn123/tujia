<template>
  <nav class="tab-bar border-top" >
      <router-link class="tab-item" v-for="item in tabList" :key="item.id" :to="item.path">
          <span class="iconfont" :class="item.icon"></span>
          <span class="title">{{item.title}}</span>

      </router-link>
  </nav>
</template>

<script>
export default {
    name:'tab-bar',
    data(){
        return {
            tabList:[
                {id:1,path:'/home',title:'首页',icon:'icon-shouye'},
                {id:2,path:'/collect',title:'收藏',icon:'icon-aixin'},
                {id:3,path:'/found',title:'发现',icon:'icon-faxian'},
                {id:4,path:'/message',title:'消息',icon:'icon-tubiao313'},
                {id:5,path:'/mine',title:'我的',icon:'icon-wode'},
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    .tab-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        width: 100%;
        height: 49px;
        background: white;
        z-index: 8;

        .tab-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            text-align: center;
            color: #aaaaaa;
            .iconfont {
                font-size: 20px;
                margin-bottom: 5px;
            }

            .title {
                font-size: 12px;
            }

            &.router-link-active {
                color: orangered;
            }
        }
    }
</style>