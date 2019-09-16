import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "",
      component: () => import("@/views/home.vue")
    },
    {
      path: "/manageBlog",
      name: "manageBlog",
      component: () => import("@/views/manageBlog.vue"),
      redirect: "/manageBlog/atricle",
      children: [
        {
          path: "atricle",
          name: "atricle",
          component: () => import("@/views/atricle.vue")
        },
        {
          path: "tag",
          name: "tag",
          component: () => import("@/views/tag.vue")
        },
        {
          path: "catagory",
          name: "catagory",
          component: () => import("@/views/catagory.vue")
        }
      ]
    },
    {
      path: "/addAtricle",
      name: "addAtricle",
      component: () => import("@/views/addAtricle.vue")
    },
  ]
});
