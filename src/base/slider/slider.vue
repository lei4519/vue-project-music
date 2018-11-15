<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots" v-if="showDots">
            <span class="dot" :class="{'active': currentPageIndex === i}" v-for="(item, i) in dots" :key="i"></span>
        </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from '@/common/js/dom'

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      },
      showDots: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      sliderScroll: {},
      children: {},
      dots: [],
      currentPageIndex: 0,
      timer: undefined
    }),
    methods: {
      _setSliderWidth(isReSize = false) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        const sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isReSize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },

      _initBetterScroll() {
        this.sliderScroll = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          stopPropagation: true,
          click: true
        })
        this.sliderScroll.on('scrollEnd', () => {
          let pageIndex = this.sliderScroll.getCurrentPage().pageX
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.sliderScroll.next()
        }, this.interval)
      }
    },
    mounted() {
      let throttle = null
      window.addEventListener('resize', () => {
        if (throttle) return
        throttle = setTimeout(() => {
          throttle = null
          if (!this.sliderScroll) return false
          this._setSliderWidth(true)
          this.sliderScroll.refresh()
        }, 200)
      })
      this.$nextTick(() => {
        this._setSliderWidth()
        this._initDots()
        this._initBetterScroll()
        if (this.autoPlay) {
          this._play()
        }
      })
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';

    .slider {
        min-height: 1px;
        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
        .dots {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 12px;
            text-align: center;
            font-size: 0;
            .dot {
                display: inline-block;
                margin: 0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: $color-text-l;
                &.active {
                    width: 20px;
                    border-radius: 5px;
                    background: $color-text-ll;
                }
            }
        }
    }
</style>
