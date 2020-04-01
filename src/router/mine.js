export default {
  path: "/mine",
  component: () => import("./../pages/mine/root/mine.vue"),
  children: [
    {
      path: "setting",
      component: () => import("../pages/mine/set/set.vue")
    }
  ],
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
