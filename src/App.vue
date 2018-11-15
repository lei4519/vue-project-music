<template>
    <div>
        <m-header></m-header>
        <tab></tab>
        <transition>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
  import MHeader from '@/views/m-header/m-header.vue'
  import Tab from '@/views/tab/tab.vue'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="scss" scoped>
    .v-enter {
        transform: translateX(100%);
    }
    .v-leave-to{
        transform: translateX(-100%);
    }
    .v-enter-active,
    .v-leave-active{
        transition: all .3s;
    }
</style>

