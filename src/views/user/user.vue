<template>
    <transition name="slide">
        <div class="user-content">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches @switchItem="switchItem" :switches="switches" :currentIndex="currentIndex"/>
            </div>
            <div class="play-btn" @click="random">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll ref="favoriteScroll" v-if="currentIndex === 0" class="list-scroll" :data="favoriteList">
                    <div class="list-inner">
                        <song-list @select="selectSong" :songs="favoriteList"/>
                    </div>
                </scroll>
                <scroll ref="historyScroll" v-if="currentIndex === 1" class="list-scroll" :data="playHistory">
                    <div class="list-inner">
                        <song-list @select="selectSong" :songs="playHistory"/>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper" v-show="noResult">
                <no-result :title="noResultTitle"/>
            </div>
        </div>
    </transition>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import switches from '@/base/switches/switches.vue'
  import Scroll from '@/base/scroll/scroll.vue'
  import songList from '@/components/song-list/song-list.vue'
  import {playListMixin} from '@/common/js/mixin.js'
  import noResult from '@/base/no-result/no-result.vue'

  export default {
    mixins: [playListMixin],
    data: () => ({
      switches: ['我喜欢的', '最近听的'],
      currentIndex: 0
    }),
    computed: {
      noResult() {
        return !this.songs.length
      },
      noResultTitle() {
        return this.currentIndex === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
      },
      songs() {
        return this.currentIndex === 0 ? this.favoriteList : this.playHistory
      },
      ...mapGetters(['playHistory', 'favoriteList'])
    },
    methods: {
      handelPlayList(playList) {
        let bottom = playList.length > 0 ? '60px' : ''
        this.$refs.listWrapper.style.bottom = bottom
        this.$refs.favoriteScroll && this.$refs.favoriteScroll.refresh()
        this.$refs.historyScroll && this.$refs.historyScroll.refresh()
      },
      back() {
        this.$router.back()
      },
      switchItem(index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index
        }
      },
      random() {
        if (!this.songs.length) return
        this.randomPlay({list: this.songs})
      },
      selectSong(song, i) {
        this.insertSong(song)
      },
      ...mapActions(['randomPlay', 'insertSong'])
    },
    components: {
      switches,
      Scroll,
      songList,
      noResult
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .user-content {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        background-color: $color-background;

        .back {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 50;

            .icon-back {
                display: block;
                padding: 10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }

        .switches-wrapper {
            margin: 10px 0 30px 0;
        }

        .play-btn {
            box-sizing: border-box;
            margin: 0 auto;
            width: 135px;
            padding: 7px 0;
            text-align: center;
            border: 1px solid $color-text-l;
            border-radius: 100px;
            font-size: 0;
            color: $color-text-l;

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

        .list-wrapper {
            position: absolute;
            top: 110px;
            bottom: 0;
            width: 100%;

            .list-scroll {
                height: 100%;
                overflow: hidden;

                .list-inner {
                    padding: 20px 30px;
                }
            }
        }

        .no-result-wrapper {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
        }
    }
</style>
