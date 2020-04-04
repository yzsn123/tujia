
import Http from '../utils/Http'
import API from '../utils/api'

const state = {
    userInfo:{
        name: localStorage.getItem('tel')
    }
}

const mutations = {
    setUserInfo(state,val){
        state.userInfo = {
            birth: val.birth,
            name: val.name,
            sex: val.sex,
            hometown: val.hometown,
            oftenLive: val.oftenLive,
            img:val.img
        }
    },
    setUserInfoImg(state,val){
        state.userInfo.img = val;
    }
}

const actions = {
    // 获取个人信息
    async requestUserInfo(){
        const { data } = await Http.get(API.GET_USERINFO_API);
        return data;
    },
    //设置个人信息
    async updateUserInfo(context,info){
        const { data } = await Http.get(API.SET_USERINFO_API,{info});
        if(data.code === 0){
            context.commit('setUserInfo',info);
        }
        return data;
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}