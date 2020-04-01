
import Http from '../utils/Http'
import API from '../utils/api'

const state = {}

const mutations = {}

const actions = {
    // 获取数据
    async requestData(){
        const { data } = await Http.get(API.FOUND_API);
        return data;
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}