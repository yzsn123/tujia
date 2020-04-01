// 管理api
// export const HOST = 'http://192.168.1.113:8080';
export const HOST = 'http://localhost:8080';
/* 
#### 注册
**method:** post
**参数:** tel      password
*/
const REGIESTER_API = '/api/user/regiester';

/* 
#### 登录
**method:** post
**参数:** tel   type('code',  'password' )  value 
*/
const LOGIN_API = '/api/user/login';

/*
检查登录
参数：无
*/
const CHECK_LOGIN = '/api/user/check_login'

/*
退出登录
参数：无
*/
const LOGOUT_API = '/api/user/logout';

/*
首页种草达人数据
*/
const HOME_GRASS_API = '/api/home/grass';

/*
searchList的数据
*/
const HOME_SEARCHLIST_API = '/api/home/searchList'

// 发现页面的数据
const FOUND_API = '/api/found'

export default {
    REGIESTER_API,
    LOGIN_API,
    CHECK_LOGIN,
    LOGOUT_API,
    HOME_GRASS_API,
    HOME_SEARCHLIST_API,
    FOUND_API
}