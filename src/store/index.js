import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import found from './found'
import login from './login'
import mine from './mine'
Vue.use(Vuex)
export default new Vuex.Store({
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    found,
    login,
    mine
  }
})
