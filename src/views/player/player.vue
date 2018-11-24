<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal">
            <div class="normal-play" v-show="fullScreen">
                <div class="background">
                    <img
                            width="100%"
                            height="100%"
                            src="http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzJgRQMKJYlrCXiazaIaQFK62DicblDG7mFEg/600?n=1"
                    >
                </div>
                <div class="top">
                    <div class="hide">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title">老古董</h1>
                    <h2 class="subtitle">许嵩</h2>
                </div>
                <div
                        class="middle"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @touchend="touchend"
                >
                    <div class="middle-l" ref="cdWrapper">
                        <div class="cd-wrapper">
                            <div class="cd">
                                <img
                                        class="image"
                                        src="http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzJgRQMKJYlrCXiazaIaQFK62DicblDG7mFEg/600?n=1"
                                >
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">无影亦无踪</div>
                        </div>
                    </div>
                    <scroll class="middle-r" ref="lyricWrapper">
                        <div class="lyric-wrapper">
                            <div>
                                <p class="text current">我的一个道姑朋友 (原曲：《一番星》—タイナカ彩智) - LON</p>
                                <p class="text">词：陆菱纱</p>
                                <p class="text">那年长街春意正浓</p>
                                <p class="text">策马同游 烟雨如梦</p>
                                <p class="text">檐下躲雨</p>
                                <p class="text">望进一双 深邃眼瞳</p>
                                <p class="text">宛如华山夹着细雪的微风</p>
                                <p class="text">雨丝微凉</p>
                                <p class="text">风吹过暗香朦胧</p>
                                <p class="text">一时心头悸动 似你温柔剑锋</p>
                                <p class="text">过处翩若惊鸿</p>
                                <p class="text">是否情字写来都空洞</p>
                                <p class="text">一笔一画斟酌着奉送</p>
                                <p class="text">甘愿卑微换个笑容</p>
                                <p class="text">或沦为平庸</p>
                                <p class="text">而你撑伞拥我入怀中</p>
                                <p class="text">一字一句誓言多慎重</p>
                                <p class="text">你眼中有柔情千种</p>
                                <p class="text">如脉脉春风 冰雪也消融</p>
                                <p class="text">后来谁家喜宴重逢</p>
                                <p class="text">佳人在侧 烛影摇红</p>
                                <p class="text">灯火缱绻</p>
                                <p class="text">映照一双 如画颜容</p>
                                <p class="text">宛如豆蔻枝头温柔的旧梦</p>
                                <p class="text">对面不识</p>
                                <p class="text">恍然间思绪翻涌</p>
                                <p class="text">望你白衣如旧 神色几分冰冻</p>
                                <p class="text">谁知我心惶恐</p>
                                <p class="text">也许我应该趁醉装疯</p>
                                <p class="text">借你怀抱留一抹唇红</p>
                                <p class="text">再将旧事轻歌慢诵</p>
                                <p class="text">任旁人惊动</p>
                                <p class="text">可我只能假笑扮从容</p>
                                <p class="text">侧耳听那些情深意重</p>
                                <p class="text">不去看你熟悉脸孔</p>
                                <p class="text">只默默饮酒 多无动于衷</p>
                                <p class="text">山门外 雪拂过白衣</p>
                                <p class="text">又在指尖消融</p>
                                <p class="text">负长剑 试问江湖阔大</p>
                                <p class="text">该何去何从</p>
                                <p class="text">今生至此 像个笑话一样</p>
                                <p class="text">自己都嘲讽</p>
                                <p class="text">一厢情愿 有始无终</p>
                                <p class="text">若你早与他人两心同</p>
                                <p class="text">何苦惹我错付了情衷</p>
                                <p class="text">难道看我失魂落魄</p>
                                <p class="text">你竟然心动 竟然心动</p>
                                <p class="text">所幸经年漂浮红尘中</p>
                                <p class="text">这颗心已是千疮百孔</p>
                                <p class="text">怎惧你以薄情为刃</p>
                                <p class="text">添一道裂缝</p>
                                <p class="text">又不会痛</p>
                                <p class="text">不如将往事埋在风中</p>
                                <p class="text">以长剑为碑 以霜雪为冢</p>
                                <p class="text">此生若是错在相逢</p>
                                <p class="text">求一个善终 一个善终</p>
                                <p class="text">孤身打马南屏旧桥边过</p>
                                <p class="text">恰逢山雨来时雾蒙蒙</p>
                                <p class="text">想起那年伞下轻拥</p>
                                <p class="text">就像躺在桥索之上 做了一场梦</p>
                                <p class="text">梦醒后跌落 粉身碎骨</p>
                                <p class="text">无影亦无踪</p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'active': currentIndex === 'left'}"></span>
                        <span class="dot" :class="{'active': currentIndex === 'right'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">0:00</span>
                        <progressBar></progressBar>
                        <span class="time time-r">3:42</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon center">
                            <i class="needsclick icon-play"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini" v-show="!fullScreen">
            <div class="mini-player">
                <div class="icon">
                    <img
                            width="40"
                            height="40"
                            src="http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzJgRQMKJYlrCXiazaIaQFK62DicblDG7mFEg/600?n=1"
                    >
                </div>
                <div class="text">
                    <h2 class="name">Hero</h2>
                    <p class="desc">Chad Kroeger/Josey Scott</p>
                </div>
                <div class="control">
                    <progress-circle>
                        <i class="icon-mini icon-play-mini"></i>
                    </progress-circle>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import playList from '@/components/play-list/play-list.vue'
  import Scroll from '@/base/scroll/scroll.vue'
  import progressBar from '@/components/progress-bar/progress-bar.vue'
  import progressCircle from '@/components/progress-circle/progress-circle.vue'
  import {mapGetters} from 'vuex'

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
        currentIndex: 'left'
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList'
      ])
    },
    methods: {
      touchstart(e) {
        this.startX = e.changedTouches[0].pageX
        this.isTouch = false
      },
      touchmove(e) {
        let currentX = e.changedTouches[0].pageX
        if (this.startX - currentX > 50 && this.currentIndex === 'left') {
          this.isTouch = true
          this.lyricWrapper.style.transform = `translateX(-${this.startX -
          currentX}px)`
          this.cdWrapper.style.opacity = `${100 / (this.startX - currentX)}`
        } else if (
          this.startX - currentX < -50 &&
          this.currentIndex === 'right'
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
            if (this.currentIndex === 'left') {
              this.currentIndex = 'right'
              this.lyricWrapper.style.transform = `translateX(-${width}px)`
              this.cdWrapper.style.opacity = '0'
            } else {
              this.currentIndex = 'left'
              this.lyricWrapper.style.transform = 'none'
              this.cdWrapper.style.opacity = '1'
            }
          } else {
            this.isTouch = false
            if (this.currentIndex === 'left') {
              this.lyricWrapper.style.transform = 'none'
              this.cdWrapper.style.opacity = '1'
            } else {
              this.lyricWrapper.style.transform = `translateX(-${width}px)`
              this.cdWrapper.style.opacity = '0'
            }
          }
        }
      }
    },
    components: {
      playList,
      Scroll,
      progressBar,
      progressCircle
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
            transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
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
                        box-sizing: border-box;

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
