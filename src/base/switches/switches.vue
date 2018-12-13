<template>
  <div class="switches">
    <div class="switch-item" @click="selectLeft" :class="{'active': active === 'left'}">
      <span>最近播放</span>
    </div>
    <div class="switch-item" @click="selectRight" :class="{'active': active === 'right'}">
      <span>搜索历史</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 'left'
  }),
  methods: {
    selectLeft() {
      this.active = 'left'
      this.$emit('selectLeft')
    },
    selectRight() {
      this.active = 'right'
      this.$emit('selectRight')
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid #333;
  border-radius: 5px;
  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;
    &.active {
      color: #fff;
      background-color: $color-highlight-background;
    }
  }
}
</style>
