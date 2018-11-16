import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend/recommend.vue'

Vue.use(Router)
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: () => import('@/views/singer/singer.vue')
    },
    {
      path: '/rank',
      component: () => import('@/views/rank/rank.vue')
    },
    {
      path: '/search',
      component: () => import('@/views/search/search.vue')
    }
	]
})
