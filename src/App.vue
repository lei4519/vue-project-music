<template>
    <div class="app" ref="app">
        <m-header></m-header>
        <tab></tab>
        <transition :name="transitionName">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <play></play>
    </div>
</template>

<script>
  import MHeader from '@/views/m-header/m-header.vue'
  import Tab from '@/views/tab/tab.vue'
  import Play from '@/views/play/play.vue'
  import {touch} from '@/common/js/dom.js'

  const ROUTE_LENGTH = 4
  export default {
    created() {
      this.isTouch = false
      this.routeId = {
          '/recommend': 1,
          '/singer': 2,
          '/rank': 3,
          '/search': 4
        }
    },
    data() {
      return {
        transitionName: 'toRight'
      }
    },
    mounted() {
      touch(this.$refs.app, e => {
        let flag = e.$event.path.some(el => (el.className === 'slider' || el.className === 'play'))
        if (flag) return
        let width = e.el.offsetWidth / 3
        if (Math.abs(e.startX - e.endX) < width) return
        this.isTouch = true
        let direction = e.startX - e.endX > 0 ?  1 : -1
        let i = this.routeId[this.$route.path] + direction
        i = (i < 1) ? ROUTE_LENGTH : (i > ROUTE_LENGTH) ? 1 : i
        for (const route of Object.keys(this.routeId)) {
          if (i === this.routeId[route]) {
            this.$router.push(route)
            return
          }
        }
      })
    },
    watch: {
      $route(to, from) {
        if (!to.path || !from.path || from.path === '/') return
        let direction = this.routeId[to.path] - this.routeId[from.path]
        if (this.isTouch) {
          this.isTouch = false
          this.transitionName = (direction === 1 || direction === -3) ? 'toLeft' : 'toRight'
        } else {
          this.transitionName = direction < 0 ? 'toRight' : 'toLeft'
        }
      }
    },
    components: {
      MHeader,
      Tab,
      Play
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

