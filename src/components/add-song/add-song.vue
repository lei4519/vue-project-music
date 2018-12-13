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
        <switches @selectLeft="selectPlayHistory" @selectRight="selectSearchHistory"></switches>
        <div class="list-wrapper">
          <scroll ref="listScroll" v-if="isPlayHistory" class="list-scroll" :data="playHistory">
            <div class="list-inner">
              <song-list @select="selectItem" :songs="playHistory"/>
            </div>
          </scroll>
          <scroll v-if="!isPlayHistory" class="list-scroll" :data="searchHistory">
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
        <suggest @select="saveSearch" :query="query" :showSinger="showSinger"/>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll.vue'
import searchBox from '@/components/search-box/search-box.vue';
import suggest from '@/views/suggest/suggest.vue';
import switches from '@/base/switches/switches.vue';
import searchList from '@/components/search-list/search-list.vue'
import songList from '@/components/song-list/song-list.vue';
import { searchListMixin, suggestMixin } from '@/common/js/mixin.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  mixins: [searchListMixin, suggestMixin],
  data: () => ({
    isShowAddSong: false,
    isPlayHistory: true,
    showSinger: false
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
        this.$refs.listScroll.refresh()
      }, 20);
    },
    selectPlayHistory() {
      this.isPlayHistory = true
    },
    selectSearchHistory() {
      this.isPlayHistory = false
    },
    onQueryChange(newQuery) {
      this.query = newQuery
    },
    selectItem(song) {
      this.insertSong(song);
    },
    ...mapActions(['insertSong'])
  },
  components: {
    Scroll,
    searchBox,
    suggest,
    switches,
    searchList,
    songList
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
