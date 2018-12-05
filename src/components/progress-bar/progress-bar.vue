<template>
    <div class="progress-bar-wrapper">
        <div class="bar-inner"
             ref="barInner"
             @click.stop="barClick">
            <div class="progress" ref="progressBg"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.stop.prevent="progressTouchStart"
                 @touchmove.stop.prevent="progressTouchMove"
                 @touchend.stop="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import {prefixStyle} from '@/common/js/dom'

  const BTN_WIDTH = 16
  const sliding = Symbol('sliding')
  const transform = prefixStyle('transform')
  export default {
    created() {
      this.touch = {
        x: 0,
        [sliding]: false,
        bgWidth: 0
      }
    },
    mounted() {
      this.bg = this.$refs.progressBg
      this.btn = this.$refs.progressBtn
    },
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent() {
        if (this[sliding]) return
        if (!this.barWidth) {
          this.barWidth = this.$refs.barInner.clientWidth - BTN_WIDTH
        }
        let width = this.barWidth * this.percent
        this.bg.style.width = `${width}px`
        this.btn.style[transform] = `translate3d(${width}px, 0, 0)`
      }
    },
    methods: {
      barClick(e) {
        let percent = (e.layerX - BTN_WIDTH) / this.barWidth
        percent = Math.min(1, percent)
        this.$emit('dragProgress', percent)
      },
      progressTouchStart(e) {
        this[sliding] = true
        this.touch.x = e.touches[0].pageX
        this.touch.bgWidth = this.bg.clientWidth
      },
      progressTouchMove(e) {
        if (!this[sliding]) return
        let dragX = e.touches[0].pageX
        let barWidth = this.barWidth
        let width = dragX - this.touch.x + this.touch.bgWidth
        width = Math.min(barWidth, Math.max(0, width))
        this.bg.style.width = `${width}px`
        this.btn.style[transform] = `translate3d(${width}px, 0, 0)`
      },
      progressTouchEnd(e) {
        let bgWidth = this.bg.clientWidth
        let percent = bgWidth / this.barWidth
        this.$emit('dragProgress', percent)
        this[sliding] = false
      }
    }
  }
</script>

<style lang="scss" scoped>
    .progress-bar-wrapper {
        height: 30px;

        .bar-inner {
            position: relative;
            top: 13px;
            height: 4px;
            border-radius: 2px;
            background-color: rgba(0, 0, 0, 0.5);

            .progress {
                position: absolute;
                height: 100%;
                border-radius: 2px;
                background: #ffcd32;
            }

            .progress-btn-wrapper {
                position: absolute;
                left: -8px;
                top: -13px;
                height: 30px;
                width: 30px;

                .progress-btn {
                    position: relative;
                    top: 7px;
                    left: 7px;
                    box-sizing: border-box;
                    width: 16px;
                    height: 16px;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    background: #ffcd32;
                }
            }
        }
    }
</style>
