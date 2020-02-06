import Http from '../utils/Http'
import API from '../utils/api'
const state = {
    // 首页种草数据
    grass:null,
    date:null,
    personCount:'不限'
}

const mutations = {
    // 设置种草数据
    setGrass(state,value){
        state.grass = value;
    },
    // 设置日期
    setDate(state,value){
        state.date = value;
    },
    // 设置人数
    setPersonCount(state,value){
        state.personCount = value;
    }
}

const actions = {
    //获取种草数据
    async requestGrass(context){
        const {data} = await Http.get(API.HOME_GRASS_API);
        context.commit('setGrass',data);
        return data;
    }
}
const getters = {
    
}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}