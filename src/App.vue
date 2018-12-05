<template>
  <div class="app" @click.once="iosTiggerPlayer">
    <m-header></m-header>
    <tab></tab>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player/>
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
