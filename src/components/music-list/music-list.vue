<template>
    <div class="music-list" ref="singerDetail">
        <h1 class="title" v-html="title"></h1>
        <div class="cover"
             ref="cover"
             :style="bgStyle"
             :class="{'fixed': !isPlayShow}">
            <div class="random-play">
                <div class="play" v-show="isPlayShow&&isSongShow">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="bgLayer"></div>
        <scroll :data="songs"
                @scroll="scroll"
                :listenScroll="listenScroll"
                :probeType="probeType"
                class="list"
                ref="list"
                :style="{'top': `${coverHeight}px`}">
            <div class="song-list-wrapper">
                <song-list @select="selectItem" :songs="songs"/>
            </div>
        </scroll>
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <loading v-show="!isSongShow"></loading>
    </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'
  import songList from '@/components/song-list/song-list.vue'
  import Loading from '@/base/loading/loading.vue'
  import {touch, prefixStyle} from '@/common/js/dom.js'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.coverHeight = this.$refs.cover.clientHeight
      this.minTranslateY = -this.coverHeight + RESERVED_HEIGHT
      touch(this.$refs.singerDetail, e => {
        let width = e.el.clientWidth / 2
        if (Math.abs(e.startX - e.endX) < width) {
          return
        }
        if (e.startX - e.endX < 0) {
          this.back()
        }
      })
    },
    data: () => ({
      scrollY: 0,
      isPlayShow: true,
      coverHeight: 0
    }),
    computed: {
      isSongShow() {
        return Object.keys(this.songs).length
      },
      bgStyle() {
        return `background-image: url(${this.bgImg})`
      }
    },
    watch: {
      scrollY(newY) {
        let zIndex = 0
        let blur = 0
        let y = Math.max(this.minTranslateY, newY)
        this.$refs.bgLayer.style[transform] = `translateY(${y}px)`
        const percent = Math.abs(newY / this.coverHeight)
        if (newY >= this.minTranslateY) {
          this.isPlayShow = true
        } else {
          zIndex = 10
          this.isPlayShow = false
        }
        if (newY > 0) {
          zIndex = 10
          this.$refs.cover.style[transform]= `scale(${1 + percent})`
        } else{
          blur = Math.min(20*percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        this.$refs.cover.style.zIndex = zIndex
      }
    },
    methods: {
      scroll(e) {
        this.scrollY = e.y
      },
      back() {
        this.$router.back()
      },
      selectItem(song, i) {
        this.selectPlay({
          list: this.songs,
          index: i
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    components: {
      Scroll,
      songList,
      Loading
    }
  }
</script>

<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';
    @import '@/common/scss/mixin.scss';

    .music-list {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        background-color: $color-background;

        .title {
            position: absolute;
            top: 0;
            left: 10%;
            z-index: 40;
            width: 80%;
            @include no-wrap();
            line-height: 40px;
            text-align: center;
            font-size: $font-size-large;
            color: $color-text;
        }

        .cover {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform: scale(1);
            transform-origin: top;
            background-size: cover;
            &.fixed {
                height: 40px;
                padding-top: 0;
            }
            .random-play {
                position: absolute;
                width: 100%;
                bottom: 20px;
                z-index: 50;

                .play {
                    box-sizing: border-box;
                    margin: 0 auto;
                    width: 135px;
                    padding: 7px 0;
                    text-align: center;
                    border: 1px solid $color-theme;
                    border-radius: 100px;
                    font-size: 0;
                    color: $color-theme;

                    .icon-play {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 6px;
                        font-size: $font-size-medium-x;
                    }

                    .text {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: $font-size-small;
                    }
                }
            }

            .filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(7, 17, 27, 0.4);
            }
        }

        .bg-layer {
            position: relative;
            height: 100%;
            transform: translateY(0);
            background-color: $color-background;
        }

        .list {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            background: $color-background;

            .song-list-wrapper {
                padding: 20px 30px;
            }
        }

        .back {
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 50;

            .icon-back {
                display: inline-block;
                padding: 10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }
    }
</style>
