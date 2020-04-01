import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from "./home";
import messageRouter from './message';
import foundRouter from './found';
import mineRouter from './mine';
import collectRouter from "./collect";
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path:'/login',
    component:()=> import('../pages/mine/login/login.vue')
  },
  homeRouter,
  collectRouter,
  messageRouter,
  mineRouter,
  foundRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router