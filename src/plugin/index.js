import { Icon,Lazyload,Toast  } from 'vant'

import myScroll from './../components/my-scroll.vue'

Toast.setDefaultOptions({ duration: 2000 ,className:'Toast'});

export default {
  install(Vue){
    // 使用vant的插件
    Vue.use(Icon);
    Vue.use(Lazyload, {
      lazyComponent: true
    });
    Vue.use(Toast);
    // 使用自定义的滚动组件
    Vue.component(myScroll.name, myScroll);
  }
}