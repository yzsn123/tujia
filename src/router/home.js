
export default {
  path: "/home",
  component: () => import("./../pages/home/root/home.vue"),
  children: [
    {
      path: "pro",
      component: () => import("../pages/home/pro/pro.vue")
    },
    {
        path:'calender',
        component:()=> import('../pages/home/root/component/calendar .vue')
    }
  ]
};
