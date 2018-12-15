<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag" @click.stop="hide">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
  export default {
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    },
    data: () => ({
      showFlag: false
    }),
    methods: {
      show() {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
          this.timer = null
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";

    .drop-enter-active,
    .drop-leave-active {
        transition: all 0.5s;
    }

    .drop-enter,
    .drop-leave-to {
        transform: translate3d(0, -100%, 0);
    }

    .top-tip {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 500;
        background-color: $color-dialog-background;
    }
</style>
