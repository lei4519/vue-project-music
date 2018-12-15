<template>
  <transition-group tag="ul" name="list" class="search-list" v-show="searches.length">
      <li class="item" v-for="(item, i) in searches" :key="item">
        <span class="text" @click="select($event)">{{item}}</span>
        <span class="delete" @click="deleteOne(item)">
        <i class="icon-delete"></i>
      </span>
      </li>
  </transition-group>
</template>

<script>
export default {
  props: {
    searches: {
      type: Array,
      default: []
    }
  },
  methods: {
    select(e) {
      this.$emit('select', e)
    },
    deleteOne(item) {
      this.$emit('deleteOne', item)

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.list-enter-active,
.list-leave-active {
  transition: all 0.1s linear;
}
.list-enter,
.list-leave-to {
  height: 0;
  transform: translateX(-100px);
}
.search-list {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: $font-size-medium-x;
    color: $color-text-l;
    .text {
      flex: 1;
    }
    .delete {
      position: relative;
      font-size: $font-size-small;
      color: $color-text-d;
      &::before {
        position: absolute;
        top: -10px;
        bottom: -10px;
        left: -10px;
        right: -10px;
        content: "";
      }
    }
  }
}
</style>
