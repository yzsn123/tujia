import { Icon,Lazyload  } from 'vant'
import { Toast } from 'vant';

Toast.setDefaultOptions({ duration: 2000 ,className:'Toast'});
export default {
  install(Vue){
    // 使用vant的插件
    Vue.use(Icon);
    Vue.use(Lazyload);
    Vue.use(Toast);
    // 使用自定义的滚动组件
  }
}