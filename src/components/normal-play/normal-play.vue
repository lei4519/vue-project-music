<template>
    <div class="normal-play">
        <div class="background">
            <img width="100%" height="100%"
                 src="http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzJgRQMKJYlrCXiazaIaQFK62DicblDG7mFEg/600?n=1">
        </div>
        <div class="top">
            <div class="hide">
                <i class="icon-back"></i>
            </div>
            <h1 class="title">老古董</h1>
            <h2 class="subtitle">许嵩</h2>
        </div>
        <div class="middle"
             @touchstart="touchstart"
             @touchmove="touchmove"
             @touchend="touchend">
            <div class="middle-l">
                <div class="cd-wrapper">
                    <div class="cd">
                        <img class="image"
                             src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002BMEC42fM8S3.jpg?max_age=2592000">
                    </div>
                </div>
                <div class="playing-lyric-wrapper">
                    <div class="playing-lyric">无影亦无踪</div>
                </div>
            </div>
            <scroll class="middle-r">
                <div class="lyric-wrapper">
                    <p class="text current">
                        我的一个道姑朋友 (原曲：《一番星》—タイナカ彩智) - LON</p>
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
            </scroll>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'

  export default {
    created() {
      this.touchX = 0
    },
    methods: {
      touchstart(e) {
        e.stopPropagation()
        this.touchX = e.changedTouches[0].pageX
      },
      touchmove(e) {
        e.stopPropagation()
        let currentX = e.changedTouches[0].pageX
        if (this.touchX - currentX < 0) return
        console.log(1)

      },
      touchend(e) {
        e.stopPropagation()

      }

    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";

    .normal-play {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
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
            .hide {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
                .icon-back {
                    display: block;
                    padding: 9px;
                    font-size: 22px;
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
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: #fff;
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
                        .image {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border-radius: 50%;
                            border: 10px solid hsla(0, 0%, 100%, .1);
                        }
                    }
                }
                .playing-lyric-wrapper {
                    margin: 30px auto 0;
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
                    .text {
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: 14px;
                        &.current {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>
