import Http from '../utils/Http'
import API from '../utils/api'
const state = {
    // 首页种草数据
    grass:null,

}

const mutations = {
    // 设置种草数据
    setGrass(value){
        state.grass = value;
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

export default{
    namespaced:true,
    state,
    mutations,
    actions
}