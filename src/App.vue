<template>
  <div class="app" @click.once="iosTiggerPlayer">
    <header class="header">
      <m-header></m-header>
      <tab></tab>
    </header>
    <transition>
      <keep-alive> <router-view></router-view> </keep-alive>
    </transition>
    <player />
  </div>
</template>

<script>
import MHeader from "@/views/m-header/m-header.vue";
import Tab from "@/views/tab/tab.vue";
import Player from "@/views/player/player.vue";

export default {
  methods: {
    iosTiggerPlayer() {
      document.querySelector("audio").play();
    }
  },
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
