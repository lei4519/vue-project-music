<template>
    <div class="play">
        <normal-play />
        <mini-play />
    </div>
</template>

<script>
  import normalPlay from '@/components/normal-play/normal-play.vue'
  import miniPlay from '@/components/mini-play/mini-play.vue'
  export default {
      components: {
        normalPlay,
        miniPlay
      }
  }
</script>

<style lang="scss" scoped>

</style>
