<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave">
            <div class="normal-play" v-show="fullScreen">
                <div class="background">
                    <img width="100%"
                         height="100%"
                         :src="currentSong.image">
                </div>
                <div class="top">
                    <div class="hide" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle"
                     @touchstart="touchstart"
                     @touchmove="touchmove"
                     @touchend="touchend">
                    <div class="middle-l" ref="cdWrapper">
                        <div class="cd-wrapper">
                            <div class="cd" :class="rotateCls">
                                <img class="image"
                                     :src="currentSong.image">
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric"></div>
                        </div>
                    </div>
                    <scroll class="middle-r" ref="lyricWrapper">
                        <div class="lyric-wrapper">
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'active': pageIndex === 'left'}"></span>
                        <span class="dot" :class="{'active': pageIndex === 'right'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{ currentTime | formatTime }} </span>
                        <progressBar :currentTime="currentTime"
                                     :durationTime="durationTime"
                                     @dragProgress="dragProgress"/>
                        <span class="time time-r">{{ durationTime | formatTime }} </span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon-prev" @click="prev"></i>
                        </div>
                        <div class="icon center" :class="disableCls">
                            <i class="needsclick"
                               :class="playIcon"
                               @click="togglePlaying"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i class="icon-next" @click="next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img width="40"
                         height="40"
                         :src="currentSong.image"
                         :class="rotateCls">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <progress-circle>
                        <i class="icon-mini icon-play-mini"
                           @click.stop="togglePlaying"
                           :class="`${playIcon}-mini`"></i>
                    </progress-circle>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio"
               :src="currentSong.url"
               @canplay="ready"
               @error="error"
               @timeupdate="timeupdate"></audio>
    </div>
</template>

<script>
  import playList from '@/components/play-list/play-list.vue'
  import Scroll from '@/base/scroll/scroll.vue'
  import progressBar from '@/components/progress-bar/progress-bar.vue'
  import progressCircle from '@/components/progress-circle/progress-circle.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from '@/common/js/dom'

  const transform = prefixStyle('transform')
  export default {
    created() {
      this.touchX = 0
    },
    mounted() {
      this.cdWrapper = this.$refs.cdWrapper
      this.lyricWrapper = this.$refs.lyricWrapper.$el
    },
    data() {
      return {
        pageIndex: 'left',
        songReady: false,
        currentTime: 0,
        durationTime: 0
      }
    },
    computed: {
      rotateCls() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex'
      ])
    },
    methods: {
      touchstart(e) {
        this.startX = e.changedTouches[0].pageX
        this.isTouch = false
      },
      touchmove(e) {
        let currentX = e.changedTouches[0].pageX
        if (this.startX - currentX > 50 && this.pageIndex === 'left') {
          this.isTouch = true
          this.lyricWrapper.style.transform = `translateX(-${this.startX -
          currentX}px)`
          this.cdWrapper.style.opacity = `${100 / (this.startX - currentX)}`
        } else if (
          this.startX - currentX < -50 &&
          this.pageIndex === 'right'
        ) {
          this.isTouch = true
          this.lyricWrapper.style.transform = `translateX(-${this.lyricWrapper
            .clientWidth +
          (this.startX - currentX)}px)`
          this.cdWrapper.style.opacity = `${100 /
          (this.lyricWrapper.clientWidth + (this.startX - currentX))}`
        }
      },
      touchend(e) {
        if (this.isTouch) {
          let endX = e.changedTouches[0].pageX
          let width = this.lyricWrapper.clientWidth
          if (Math.abs(this.startX - endX) > width / 2) {
            this.isTouch = false
            if (this.pageIndex === 'left') {
              this.pageIndex = 'right'
              this.lyricWrapper.style.transform = `translateX(-${width}px)`
              this.cdWrapper.style.opacity = '0'
            } else {
              this.pageIndex = 'left'
              this.lyricWrapper.style.transform = 'none'
              this.cdWrapper.style.opacity = '1'
            }
          } else {
            this.isTouch = false
            if (this.pageIndex === 'left') {
              this.lyricWrapper.style.transform = 'none'
              this.cdWrapper.style.opacity = '1'
            } else {
              this.lyricWrapper.style.transform = `translateX(-${width}px)`
              this.cdWrapper.style.opacity = '0'
            }
          }
        }
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: 'translate3d(0, 0, 0) scale(1.1)'
          },
          100: {
            transform: 'translate3d(0, 0, 0) scale(1)'
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        const cdWrapper = this.$refs.cdWrapper
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x, y, scale
        }
      },
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      prev() {
        if (!this.songReady) return
        !this.playing && this.togglePlaying()
        this.setCurrentIndex(this.currentIndex - 1)
        this.songReady = false
      },
      next() {
        if (!this.songReady) return
        !this.playing && this.togglePlaying()
        this.setCurrentIndex(this.currentIndex + 1)
        this.songReady = false
      },
      ready() {
        this.songReady = true
        this.durationTime = this.$refs.audio.duration
      },
      error() {
        this.songReady = true
      },
      timeupdate(el) {
        this.currentTime = this.$refs.audio.currentTime
      },
      togglePlaying() {
        if (!this.songReady) return
        this.setPlayState(!this.playing)
      },
      dragProgress(time) {
        this.$refs.audio.currentTime = time
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      playList,
      Scroll,
      progressBar,
      progressCircle
    },
    filters: {
      formatTime(val) {
        val = +val
        let m = ((val / 60 | 0) + '').padStart(2, 0)
        let s = ((val % 60 | 0) + '').padStart(2, 0)
        return `${m}:${s}`
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';
    @import '@/common/scss/mixin.scss';

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .normal-enter-active,
    .normal-leave-active {
        transition: all 0.4s;

        .top,
        .bottom {
            transition: all 0.4s cubic-bezier(1, -0.12, 0, 1.66);
        }
    }

    .normal-enter,
    .normal-leave-to {
        opacity: 0;

        .top {
            transform: translate3d(0, -100px, 0);
        }

        .bottom {
            transform: translate3d(0, 100px, 0);
        }
    }

    .mini-enter-active,
    .mini-leave-active {
        transition: all 0.4s;
    }

    .mini-enter,
    .mini-leave-to {
        opacity: 0;
    }

    .player {
        .normal-play {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 150;
            background-color: $color-background;

            .background {
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                width: 100%;
                height: 100%;
                opacity: 0.6;
                filter: blur(20px);
            }

            .top {
                position: relative;
                margin-bottom: 25px;

                .hide {
                    position: absolute;
                    top: 0;
                    left: 6px;
                    z-index: 50;

                    .icon-back {
                        display: block;
                        padding: 9px;
                        font-size: $font-size-large-x;
                        color: $color-theme;
                        transform: rotate(-90deg);
                    }
                }

                .title {
                    height: 40px;
                    width: 70%;
                    line-height: 40px;
                    margin: 0 auto;
                    font-size: $font-size-large;
                    text-align: center;
                    @include no-wrap();
                    color: $color-text;
                }

                .subtitle {
                    line-height: 20px;
                    text-align: center;
                    font-size: $font-size-medium;
                    color: $color-text;
                }
            }

            .middle {
                position: fixed;
                top: 80px;
                bottom: 170px;
                width: 100%;
                white-space: nowrap;
                font-size: 0;

                .middle-l {
                    position: relative;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                    height: 0;
                    padding-top: 80%;

                    .cd-wrapper {
                        position: absolute;
                        top: 0;
                        left: 10%;
                        width: 80%;
                        height: 100%;

                        .cd {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;

                            &.play {
                                animation: rotate 20s linear infinite;
                            }

                            &.pause {
                                animation-play-state: paused;
                            }

                            .image {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                box-sizing: border-box;
                                border: 10px solid rgba(255, 255, 255, 0.1);
                                border-radius: 50%;
                            }
                        }
                    }

                    .playing-lyric-wrapper {
                        margin: 30px auto 0 auto;
                        width: 80%;
                        overflow: hidden;
                        text-align: center;

                        .playing-lyric {
                            height: 20px;
                            line-height: 20px;
                            font-size: $font-size-medium;
                            color: $color-text-l;
                        }
                    }
                }

                .middle-r {
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;

                    .lyric-wrapper {
                        width: 80%;
                        margin: 0 auto;
                        text-align: center;
                        overflow: hidden;

                        .text {
                            line-height: 32px;
                            color: $color-text-l;
                            font-size: $font-size-medium;

                            &.current {
                                color: $color-text;
                            }
                        }
                    }
                }
            }

            .bottom {
                position: absolute;
                width: 100%;
                bottom: 50px;

                .dot-wrapper {
                    font-size: 0;
                    text-align: center;

                    .dot {
                        display: inline-block;
                        vertical-align: top;
                        width: 8px;
                        height: 8px;
                        margin: 0 4px;
                        border-radius: 50%;
                        background: $color-text-l;

                        &.active {
                            width: 20px;
                            border-radius: 5px;
                            background: $color-text-ll;
                        }
                    }
                }

                .progress-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80%;
                    margin: 0 auto;
                    padding: 10px 0;

                    .time {
                        flex: 0 0 30px;
                        width: 30px;
                        text-align: left;
                        font-size: $font-size-small;
                        line-height: 30px;
                        color: $color-text;

                        &.time-r {
                            text-align: right;
                        }
                    }

                    .progress-bar-wrapper {
                        flex: 1;
                        margin: 0 5px;
                    }
                }

                .operators {
                    display: flex;
                    align-items: center;

                    .icon {
                        flex: 1;
                        color: $color-theme;

                        &.disable {
                            color: $color-theme-d;
                        }

                        i {
                            font-size: 30px;
                        }
                    }

                    .i-left {
                        text-align: right;
                    }

                    .i-right {
                        text-align: left;
                    }

                    .center {
                        text-align: center;
                        padding: 0 20px;

                        i {
                            font-size: 40px;
                        }
                    }

                    .icon-favorite {
                        color: $color-sub-theme;
                    }
                }
            }
        }

        .mini-player {
            position: fixed;
            display: flex;
            align-items: center;
            left: 0;
            bottom: 0;
            z-index: 180;
            height: 60px;
            width: 100%;
            background-color: $color-highlight-background;

            .icon {
                flex: 0 0 40px;
                width: 40px;
                height: 40px;
                padding: 0 10px 0 20px;

                img {
                    border-radius: 50%;

                    &.play {
                        animation: rotate 10s linear infinite;
                    }

                    &.pause {
                        animation-play-state: paused;
                    }
                }
            }

            .text {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                line-height: 20px;
                overflow: hidden;

                .name {
                    margin-bottom: 2px;
                    font-size: 14px;
                    @include no-wrap();
                    color: #fff;
                }

                .desc {
                    font-size: 12px;
                    color: $color-text-l;
                    @include no-wrap();
                }
            }

            .control {
                flex: 0 0 30px;
                width: 30px;
                height: 30px;
                padding: 0 10px;

                .icon-play-mini,
                .icon-pause-mini,
                .icon-playlist {
                    font-size: 30px;
                    color: $color-theme-d;
                }

                .icon-mini {
                    font-size: 32px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
</style>
