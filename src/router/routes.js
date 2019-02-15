import Recommend from "@/views/recommend/recommend.vue";

export default [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      component: Recommend,
      children: [
        {
          path: ":id",
          component: () => import("@/views/disc/disc.vue")
        }
      ]
    },
    {
      path: "/singer",
      component: () => import("@/views/singer/singer.vue"),
      children: [
        {
          path: ":id",
          component: () => import("@/views/singer-detail/singer-detail.vue")
        }
      ]
    },
    {
      path: "/rank",
      component: () => import("@/views/rank/rank.vue"),
      children: [
        {
          path: ":id",
          component: () => import("@/views/top-list/top-list.vue")
        }
      ]
    },
    {
      path: "/search",
      component: () => import("@/views/search/search.vue"),
      children: [
        {
          path: ":id",
          component: () => import("@/views/singer-detail/singer-detail.vue")
        }
      ]
    },
    {
      path: '/user',
      component: () => import("@/views/user/user.vue")
    }
  ]