import Http from "../utils/Http";
import API from "../utils/api";

const state = {};

const mutations = {

};

const actions = {
  //检查登录
  async checkoutLogin(context) {
    const { data } = await Http.get(API.CHECK_LOGIN);
    //如果登录了
    if(data.code === 0){
      localStorage.setItem('isLogin',true)
      localStorage.setItem('tel',data.tel)
    } else {
      localStorage.setItem('isLogin',false)
      localStorage.setItem('tel','')
    }

    return data.code === 0;
  },
  //登录
  async requestLogin(context, { tel, pwd }) {
    const { data } = await Http.get(API.LOGIN_API, { tel, pwd });
    if (data.code === 0) {
      return true;
    } else {
      return false;
    }
  },
  //退出登录
  async requestLogout(context){
    const { data } = await Http.get(API.LOGOUT_API);
    if(data.code === 0){
      localStorage.setItem('isLogin',false);
    }
    return data.code === 0;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
