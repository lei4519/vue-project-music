<template>
    <div class="play">
        <!--<normal-play />-->
        <!--<mini-play />-->
        <play-list />
    </div>
</template>

<script>
  import normalPlay from '@/components/normal-play/normal-play.vue'
  import miniPlay from '@/components/mini-play/mini-play.vue'
  import playList from '@/components/play-list/play-list.vue'
  export default {
      components: {
        normalPlay,
        miniPlay,
        playList
      }
  }
</script>

<style lang="scss" scoped>

</style>
