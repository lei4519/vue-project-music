<template>
    <transition name="slide">
        <div class="add-song" v-show="isShowAddSong" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close">
                    <i class="icon-close" @click.self="hideAddSong"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"/>
            </div>
            <div class="shortcut" v-show="!query">
                <switches @switchItem="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
                <div class="list-wrapper">
                    <scroll ref="listScroll" v-if="currentIndex === 0" class="list-scroll" :data="playHistory">
                        <div class="list-inner">
                            <song-list @select="selectSong" :songs="playHistory"/>
                        </div>
                    </scroll>
                    <scroll ref="searchScroll" v-if="currentIndex === 1" class="list-scroll" :data="searchHistory">
                        <div class="list-inner">
                            <search-list
                                    @select="setQuery"
                                    @deleteOne="delSearchHistory"
                                    :searches="searchHistory"
                            />
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest @select="selectSuggest" :query="query" :showSinger="showSinger"/>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已被添加入播放队列</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@/base/scroll/scroll.vue'
  import searchBox from '@/components/search-box/search-box.vue'
  import suggest from '@/views/suggest/suggest.vue'
  import switches from '@/base/switches/switches.vue'
  import searchList from '@/components/search-list/search-list.vue'
  import songList from '@/components/song-list/song-list.vue'
  import {searchListMixin, suggestMixin} from '@/common/js/mixin.js'
  import {mapGetters, mapActions} from 'vuex'
  import topTip from '@/base/top-tip/top-tip.vue'

  export default {
    mixins: [searchListMixin, suggestMixin],
    data: () => ({
      isShowAddSong: false,
      showSinger: false,
      switches: ['最近播放', '搜索历史'],
      currentIndex: 0
    }),
    computed: {
      ...mapGetters(['playHistory'])
    },
    methods: {
      hideAddSong() {
        this.isShowAddSong = false
      },
      showAddSong() {
        this.isShowAddSong = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.listScroll.refresh()
          } else {
            this.$refs.searchScroll.refresh()
          }
        }, 20)
      },
      switchItem(index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index
        }
      },
      onQueryChange(newQuery) {
        this.query = newQuery
      },
      selectSong(song, i) {
        if (i === 0) return
        this.showTip()
        this.insertSong(song)
      },
      selectSuggest() {
        this.saveSearch()
        this.showTip()
      },
      showTip() {
        this.$refs.topTip.show()
      },
      ...mapActions(['insertSong'])
    },
    components: {
      Scroll,
      searchBox,
      suggest,
      switches,
      searchList,
      songList,
      topTip
    }
  }
</script>

<style scoped lang="scss">
    @import "@/common/scss/variable.scss";
    @import "@/common/scss/mixin.scss";

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .add-song {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 200;
        background: $color-background;

        .header {
            position: relative;
            height: 44px;
            text-align: center;

            .title {
                line-height: 44px;
                font-size: $font-size-large;
                color: $color-text;
            }

            .close {
                position: absolute;
                top: 0;
                right: 8px;
            }

            .icon-close {
                display: block;
                padding: 12px;
                font-size: 20px;
                color: $color-theme;
            }
        }

        .search-box-wrapper {
            margin: 20px;
        }

        .shortcut {
            .list-wrapper {
                position: absolute;
                top: 165px;
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
        }

        .search-result {
            position: fixed;
            top: 124px;
            bottom: 0;
            width: 100%;
        }

        .tip-title {
            text-align: center;
            padding: 18px 0;
            font-size: 0;

            .icon-ok {
                font-size: $font-size-medium;
                color: $color-theme;
                margin-right: 4px;
            }

            .text {
                font-size: $font-size-medium;
                color: $color-text;
            }
        }
    }
</style>
