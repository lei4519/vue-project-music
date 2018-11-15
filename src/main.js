import Vue from 'vue'
import App from '@/App.vue'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import router from '@/router/router'
import store from '@/store/store'
import '@/common/scss/index.scss'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
