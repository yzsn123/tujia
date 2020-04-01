export default {
  path: "/collect",
  component: () => import("./../pages/collect/root/collect.vue"),
  //路由内守卫
  beforeEnter(to, from, next) {
    let isLogin = localStorage.getItem("isLogin");
    if (isLogin && isLogin === "true") {
      next();
    } else {
      localStorage.setItem("to", to.path);
      next({ path: "/login" });
    }
  }
};
