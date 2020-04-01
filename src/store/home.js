import Http from "../utils/Http";
import API from "../utils/api";
const state = {
  // 首页种草数据
  grass: null,
  date: null,
  personCount: "不限"
};

const mutations = {
  // 设置种草数据
  setGrass(state, value) {
    state.grass = value;
  },
  // 设置日期
  setDate(state, value) {
    state.date = value;
  },
  // 设置人数
  setPersonCount(state, value) {
    state.personCount = value;
  }
};

const actions = {
  //获取种草数据
  async requestGrass(context) {
    const { data } = await Http.get(API.HOME_GRASS_API);
    context.commit("setGrass", data);
    return data;
  },
  // 获取搜索searchlist的数据
  async requestSearchList(context, value) {
    const { data } = await Http.get(API.HOME_SEARCHLIST_API, value);
    for (let k in data.list) {
      data.list[k].img += ".jpg";
    }
    return data;
  },
   // 对获取的日期进行处理
  datematter(context,dat) {
    const date = new Date(dat);
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = m >= 10 ? m : `0${m}`;
    d = d >= 10 ? d : `0${d}`;
    return `${m}月${d}日`;
  }
};
const getters = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
