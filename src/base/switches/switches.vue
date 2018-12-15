<template>
    <ul class="switches">
        <li v-for="(title, i) in switches"
            :key="i"
            class="switch-item"
            @click="switchItem(i)"
            :class="{'active': currentIndex === i}">
            <span>{{title}}</span>
        </li>

    </ul>
</template>

<script>
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switchItem', index)
      }
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
