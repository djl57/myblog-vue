import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "",
      component: () => import("@/views/home.vue"),
      meta: {
        requiresAuth: false
      },
    },
    {
      path: "/manageBlog",
      name: "manageBlog",
      component: () => import("@/views/manageBlog.vue"),
      redirect: "/manageBlog/atricle",
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "atricle",
          name: "atricle",
          component: () => import("@/views/atricle.vue"),
          meta: {
            title: "文章管理",
            requiresAuth: true,
            isSide: true
          }
        },
        {
          path: "tag",
          name: "tag",
          component: () => import("@/views/tag.vue"),
          meta: {
            title: "标签管理",
            requiresAuth: true,
            isSide: true
          }
        },
        {
          path: "catagory",
          name: "catagory",
          component: () => import("@/views/catagory.vue"),
          meta: {
            title: "分类管理",
            requiresAuth: true,
            isSide: true
          }
        },
      ]
    },
    {
      path: "/myIntro",
      name: "myIntro",
      component: () => import("@/views/myIntro.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/addAtricle",
      name: "addAtricle",
      component: () => import("@/views/addAtricle.vue"),
      meta: {
        requiresAuth: false
      },
    },
    {
      path: "*",
      name: "notFound",
      component: () => import("@/views/notFound.vue"),
      meta: {
        requiresAuth: false
      },
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('passSave')) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
