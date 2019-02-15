<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"/>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h2 class="title">热门搜索</h2>
            <ul @click="setQuery">
              <li class="item" v-for="(item, i) in hotKey" :key="i">
                <span>{{ item.k }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h2 class="title">
              <span class="text">搜索历史</span>
              <span class="icon" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h2>
            <search-list
              @select="setQuery"
              @deleteOne="delSearchHistory"
              :searches="searchHistory"
            />
          </div>
        </div>
      </scroll>
    </div>
    <suggest
      class="search-result"
      v-show="query"
      @select="saveSearch"
      @selectSinger="selectSinger"
      :query="query"
    />
    <confirm ref="confirm" title="是否清空搜索历史" confirmBtnText="清空" @consent="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import Scroll from "@/base/scroll/scroll.vue";
import searchBox from "@/components/search-box/search-box.vue";
import suggest from "@/views/suggest/suggest.vue";
import searchList from '@/components/search-list/search-list.vue';
import { playListMixin, searchListMixin, suggestMixin } from '@/common/js/mixin.js';
import { getHotKey } from "@/api/search.js";
import { ERR_OK } from "@/api/config.js";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import confirm from '@/base/confirm/confirm.vue';
import Singer from '@/common/js/singer.js'

export default {
  mixins: [playListMixin, searchListMixin, suggestMixin],
  data() {
    return {
      hotKey: [],
    };
  },
  created() {
    this._getHotKey();
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20);
      }
    }
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters(['searchHistory'])
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.show()
    },
    handelPlayList(playList) {
      let bottom = playList.length ? '60px' : ''
      this.$refs.shortcut.$el.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    selectSinger(item) {
      const singer = new Singer({
        id: item.singermid,
        name: item.singername
      })
      this.setSinger(singer)
      this.$router.push({
        path: `/search/${singer.id}`
      });
    },
    async _getHotKey() {
      const res = await getHotKey();
      if (res.code === ERR_OK) {
        this.hotKey = res.data.hotkey.splice(0, 10);
      }
    },
    onQueryChange(val) {
      this.query = val;
    },
    ...mapActions(['clearSearchHistory']),
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Scroll,
    searchBox,
    suggest,
    searchList,
    confirm
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
@import "@/common/scss/mixin.scss";
.search {
  .search-box-wrapper {
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    margin: 20px;
  }
  .shortcut-wrapper {
    .shortcut {
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      .hot-key {
        font-size: 0;
        margin: 0 20px 20px;
        color: $color-text-l;
        .title {
          margin-bottom: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
        .item {
          display: inline-block;
          font-size: $font-size-medium;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          color: $color-text-d;
          background-color: $color-highlight-background;
        }
      }
      .search-history {
        margin: 0 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .icon {
            position: relative;
            color: $color-text-d;
            &::before {
              position: absolute;
              top: -10px;
              bottom: -10px;
              left: -10px;
              right: -10px;
              content: "";
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
  }
}
</style>
