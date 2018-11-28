<template>
    <div class="progress-bar-wrapper">
        <div class="bar-inner" ref="barInner">
            <div class="progress" ref="progressBg"></div>
            <div class="progress-btn-wrapper"
                 @touchstart.stop="touchstart"
                 @touchmove.stop="touchmove"
                 @touchend.stop="touchend">
                <div class="progress-btn" ref="progressBtn"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import {prefixStyle} from '@/common/js/dom'

  const BTN_WIDTH = 16
  const transform = prefixStyle('transform')
  export default {
    created() {
      this.touchX = 0
      this.touched = false
    },
    mounted() {
      this.bg = this.$refs.progressBg
      this.btn = this.$refs.progressBtn
    },
    props: {
      currentTime: {
        type: Number,
        default: 0
      },
      durationTime: {
        type: Number,
        default: 0
      }
    },
    watch: {
      currentTime() {
        if (this.touched) return
        if(!this.barWidth) {
          this.barWidth = this.$refs.barInner.clientWidth - BTN_WIDTH
        }
        let percent = this.currentTime / this.durationTime * 100
        this.bg.style.width = `${percent}%`
        let width = this.bg.offsetWidth
        this.btn.style[transform] = `translate3d(${width}px, 0, 0)`
      }
    },
    methods: {
      touchstart(e) {
        this.touched = true
        this.touchX = e.changedTouches[0].clientX
        this.bgWidth = this.bg.offsetWidth
      },
      touchmove(e) {
        let dragX = e.changedTouches[0].clientX
        let barWidth = this.barWidth
        let width = dragX - this.touchX + this.bgWidth
        width = width <= 0 ? 0 : width >= barWidth ? barWidth : width
        this.bg.style.width = `${width}px`
        this.btn.style[transform] = `translate3d(${width}px, 0, 0)`
      },
      touchend(e) {
        let bgWidth = this.bg.offsetWidth
        let percent = bgWidth / this.barWidth
        let curTime = this.durationTime * percent
        this.$emit('dragProgress', curTime)
        this.touched = false
        this.touchX = 0
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
