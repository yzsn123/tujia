import Http from "../utils/Http";
import API from "../utils/api";

const state = {};

const mutations = {

};

const actions = {
  checkoutLogin(context) {},
  async requestLogin(context, { tel, pwd }) {
    const { data } = await Http.get(API.LOGIN_API, { tel, pwd });
    if (data.code === 0) {
      return true;
    } else {
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
