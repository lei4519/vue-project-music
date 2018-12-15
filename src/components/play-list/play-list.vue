<template>
    <transition name="list-fade">
        <div class="play-list" v-show="isShowPlayList" @click="hidePlayList">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="modeIcon" @click="togglePlayMode"></i>
                        <span class="text">{{getModeText}}</span>
                        <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
                    </h1>
                </div>
                <scroll ref="scroll" class="list-content" :data="playList">
                    <transition-group name="list" tag="ul" ref="songList">
                        <li class="item" v-for="(item, i) in playList" :key="item.id" @click="selectSong(i)">
                            <i class="current" :class="[currentIndex === i ? curPlayIcon : '']"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
                            <span class="delete" @click.stop="delOne(i)">
                <i class="icon-delete"></i>
              </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-operate">
                    <div class="add">
                        <i class="icon-add"></i>
                        <div class="text" @click="showAddSong">添加歌曲到队列</div>
                    </div>
                </div>
                <div class="list-close" @click="hidePlayList">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" @consent="clearList"/>
            <add-song ref="addSong"/>
        </div>
    </transition>
</template>

<script>
  import confirm from '@/base/confirm/confirm.vue'
  import scroll from '@/base/scroll/scroll.vue'
  import addSong from '@/components/add-song/add-song.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playMode} from '@/common/js/config'
  import {toggleModeMixin, favoriteListMixin} from '@/common/js/mixin.js'

  const modeText = {
    [playMode.sequence]: '顺序播放',
    [playMode.loop]: '循环播放',
    [playMode.random]: '随机播放'
  }

  export default {
    mixins: [toggleModeMixin, favoriteListMixin],
    data: () => ({
      isShowPlayList: false
    }),
    computed: {
      getModeText() {
        return modeText[this.mode]
      },
      curPlayIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      ...mapGetters([
        'playList',
        'currentIndex',
        'playing'
      ])
    },
    methods: {
      showPlayList() {
        this.isShowPlayList = true
        setTimeout(() => {
          this.$refs.scroll.refresh()
          this.scrollToCurrent()
        }, 20)
      },
      hidePlayList() {
        this.isShowPlayList = false
      },
      showAddSong() {
        this.$refs.addSong.showAddSong()
      },
      clearList() {
        this.clearPlayList()
        this.$emit('closeList')
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      scrollToCurrent() {
        let el = this.$refs.songList.$el.children[this.currentIndex]
        this.$refs.scroll.scrollToElement(el, 300)
      },
      delOne(i) {
        this.delSong(i)
        if (!this.playList.length) {
          this.hidePlayList()
        }
      },
      selectSong(i) {
        if (this.currentIndex === i) {
          return this.setPlayingState(!this.playing)
        }
        this.setCurrentIndex(i)
        this.setPlayingState(true)
      },
      ...mapMutations({
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayingState: 'SET_PLAYING_STATE'
      }),
      ...mapActions(['clearPlayList', 'delSong'])
    },
    watch: {
      currentIndex() {
        if (this.isShowPlayList) {
          this.scrollToCurrent()
        }
      }
    },
    components: {
      confirm,
      scroll,
      addSong
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";
    @import "@/common/scss/mixin.scss";

    .list-fade-enter-active,
    .list-fade-leave-active {
        transition: opacity 0.3s;

        .list-wrapper {
            transition: all 0.3s;
        }
    }

    .list-fade-enter,
    .list-fade-leave-to {
        opacity: 0;

        .list-wrapper {
            transform: translate3d(0, 100%, 0);
        }
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.1s linear;
    }

    .list-enter,
    .list-leave-to {
        height: 0;
        transform: translateX(-100px);
    }

    .play-list {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: $color-background-d;

        .list-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: $color-highlight-background;

            .list-header {
                padding: 20px 30px 10px 20px;

                .title {
                    display: flex;
                    align-items: center;

                    .icon {
                        font-size: 30px;
                        margin-right: 10px;
                        color: $color-theme-d;
                    }

                    .text {
                        flex: 1;
                        font-size: 14px;
                        color: $color-text-l;
                    }

                    .clear {
                        @include extend-click();

                        .icon-clear {
                            font-size: 14px;
                            color: $color-text-d;
                        }
                    }
                }
            }

            .list-content {
                max-height: 240px;
                overflow: hidden;

                .item {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    overflow: hidden;
                    padding: 0 30px 0 20px;

                    .current {
                        flex: 0 0 20px;
                        width: 20px;
                        font-size: 12px;
                        color: $color-theme-d;
                    }

                    .text {
                        flex: 1;
                        font-size: 14px;
                        @include no-wrap();
                        color: $color-text-d;
                    }

                    .like {
                        margin-right: 15px;
                        font-size: 12px;
                        color: #ffcd32;
                        @include extend-click();

                        .icon-favorite {
                            color: $color-sub-theme;
                        }
                    }

                    .delete {
                        font-size: 12px;
                        color: #ffcd32;
                        @include extend-click();
                    }
                }
            }

            .list-operate {
                width: 140px;
                margin: 20px auto 30px auto;

                .add {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    border-radius: 100px;
                    border: 1px solid $color-text-l;
                    color: $color-text-l;

                    .icon-add {
                        font-size: 10px;
                        margin-right: 5px;
                    }

                    .text {
                        font-size: 12px;
                    }
                }
            }

            .list-close {
                line-height: 50px;
                text-align: center;
                font-size: $font-size-medium-x;
                background-color: $color-background;
                color: $color-text-l;
            }
        }
    }
</style>
