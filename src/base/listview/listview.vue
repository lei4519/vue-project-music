<template>
    <scroll ref="scroll"
            :data="data"
            class="listview"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll">
        <ul ref="listScroll">
            <li class="list-group"
                v-for="(item, i) in data"
                :key="i">
                <h2 class="list-group-title">{{item.title}}</h2>
                <ul>
                    <li class="list-group-item"
                        v-for="(items, index) in item.items"
                        :key="index"
                        @click="selectItem(items)">
                        <img v-lazy="items.avatar" width="50" height="50" class="avatar">
                        <span class="name">{{ items.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="list-shortcut needsclick"
            ref="listShortcut"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove">
            <li class="item"
                :class="{'active': currentIndex === i}"
                v-for="(item, i) in shortcutList" :key="i"
                :data-index="i">{{ item }}
            </li>
        </ul>
        <div class="fixed" v-text="fixedTitle" v-show="isFixedShow" ref="fixed"></div>
    </scroll>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'
  import {getData} from '@/common/js/dom.js'

  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18
  export default {
    created() {
      this.touch = {}
      this.scrollHeightArr = []
      this.probeType = 3
      this.listenScroll = true
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data: () => ({
      currentIndex: 0,
      isFixedShow: false,
      scrollY: 0
    }),
    computed: {
      shortcutList() {
        return this.data.map(group => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }

    },
    watch: {
      data() {
        this.$nextTick(() => {
          this._getScrollHeightArr()
        })
      },
      scrollY() {
        this.isFixedShow = this.scrollY <= 0
        let y = Math.abs(this.scrollY)
        let i = this.scrollHeightArr.findIndex(item => y >= item.start && y < item.end)
        this.currentIndex = i < 0 ? 0 : i
        this._setFixedTransfrom(y)
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        let i = getData(e.target, 'index')
        if (!i) {
          return
        } else {
          i = +i
        }
        this.touch.y1 = e.touches[0].pageY
        this.touch.i = i
        this.currentIndex = i
        this._scrollToElement(i)
      },
      onShortcutTouchMove(e) {
        this.touch.y2 = e.touches[0].pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let len = this.shortcutList.length - 1
        let i = delta + this.touch.i
        i = i < 0 ? 0 : i > len ? len : i
        this.currentIndex = i
        this._scrollToElement(i)
      },
      scroll(e) {
        this.scrollY = e.y
      },
      _getScrollHeightArr() {
        this.children = this.$refs.listScroll.children
        Array.from(this.children).forEach((item, i, arr) => {
          let start, end
          start = item.offsetTop
          if (i !== arr.length - 1) {
            end = arr[i + 1].offsetTop
          } else {
            end = item.offsetTop + item.offsetHeight
          }
          this.scrollHeightArr.push({
            start,
            end
          })
        })
      },
      _setFixedTransfrom(y) {
        let item = this.scrollHeightArr[this.currentIndex]
        let diff = y + TITLE_HEIGHT - item.end
        diff = y + TITLE_HEIGHT - item.end >= 0 ? `-${diff}px` : '0'
        if (this._setFixedTransfrom.cacheDiff === diff) return
        this._setFixedTransfrom.cacheDiff = diff
        let fixedStyle = this.$refs.fixed.style
        fixedStyle.transform = `translate3d(0, ${diff}, 0)`
      },
      _scrollToElement(i) {
        let el = this.$refs.listScroll.children[i]
        this.$refs.scroll.scrollToElement(el, 300)
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";

    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: $color-background;

        .list-group {
            padding-bottom: 20px;

            .list-group-title {
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: $font-size-small;
                color: $color-text-l;
                background-color: $color-highlight-background;
            }

            .list-group-item {
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;
                width: 100%;
                height: 50px;

                .avatar {
                    border-radius: 50%;
                }

                .name {
                    margin-left: 20px;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                }
            }
        }

        .list-shortcut {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 30;
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            font-size: $font-size-small;
            color: $color-text-l;
            background-color: $color-background-d;

            .item {
                padding: 3px;

                &.active {
                    color: $color-theme;
                }
            }
        }

        .fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background-color: $color-highlight-background;
        }
    }
</style>
