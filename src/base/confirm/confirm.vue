<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="text" v-text="title"></div>
          <div class="operate">
            <div class="operate-btn left" @click="cancel" v-text="cancelBtnText"></div>
            <div class="operate-btn" @click="consent" v-text="confirmBtnText"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    showFlag: false
  }),
  props: {
    title: {
      type: String,
      default: '是否清空播放列表'
    },
    confirmBtnText: {
      type: String,
      default: '确认'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    cancel() {
      this.hide()
      this.$emit('cancel')
    },
    consent() {
      this.hide()
      this.$emit('consent')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.confirm-fade-enter-active {
  animation: confirm-fadein 0.3s;
}

.confirm-content-leave-active {
  animation: confirm-zoom 0.3s;
}

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: #333;

      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: 18px;
        color: $color-text-l;
      }

      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 18px;

        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid $color-background-d;
          color: $color-text-d;

          &.left {
            border-right: 1px solid $color-background-d;
          }
        }
      }
    }
  }
}
</style>
