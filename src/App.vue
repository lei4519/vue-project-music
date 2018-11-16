<template>
    <div class="app" ref="app">
        <m-header></m-header>
        <tab></tab>
        <transition :name="transitionName">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
  import MHeader from '@/views/m-header/m-header.vue'
  import Tab from '@/views/tab/tab.vue'
  import {touch} from '@/common/js/dom.js'


  export default {
    created() {
      this.searchRoute = /\/(\w+)|\//
    },
    data() {
      return {
        transitionName: 'toRight',
        routeId: {
          'recommend': 1,
          'singer': 2,
          'rank': 3,
          'search': 4
        },
        routeList: this.$router.options.routes
      }
    },
    mounted() {
      touch(this.$refs.app, e => {
        let width = e.el.offsetWidth / 4
        if (Math.abs(e.startX - e.endX) < width) return
        this.transitionName = e.startX - e.endX > 0 ?  'toLeft' : 'toRight'
        let route = this.searchRoute.exec(this.$route.path)[1]
        let i = this.transitionName === 'toRight' ? this.routeId[route] - 1 : this.routeId[route] + 1
        i = i === 0 ? this.routeList.length - 1 : i > this.routeList.length - 1 ? 1 : i
        this.$router.push(this.routeList[i])
      })
    },
    watch: {
      $route(to, from) {
        let toPath = this.searchRoute.exec(to.path)[1]
        let fromPath = this.searchRoute.exec(from.path)[1]
        if (!toPath || !fromPath) return
        let direction = this.routeId[toPath] - this.routeId[fromPath]
        this.transitionName = (direction >= 1 && direction <= 2 || direction === -3) ? 'toLeft' : 'toRight'
      }
    },
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="scss" scoped>
    .toLeft-enter {
        transform: translateX(100%);
    }

    .toLeft-leave-to {
        transform: translateX(-100%);
    }

    .toRight-enter {
        transform: translateX(-100%);
    }

    .toRight-leave-to {
        transform: translateX(100%);
    }

    .toLeft-enter-active,
    .toLeft-leave-active,
    .toRight-enter-active,
    .toRight-leave-active {
        transition: all .3s;
    }
</style>

