<template>
  <div ref="searchResult">
    <scroll
      ref="search"
      class="suggest"
      v-show="query"
      :data="searchList"
      :pullUpLoad="pullUpLoad"
      @pullingUp="pullingUp"
    >
      <ul class="suggest-list" v-show="query">
        <li class="item" v-for="(item, i) in searchList" :key="i" @click="selectItem(item);">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisPlayName(item)"></p>
          </div>
        </li>
        <li v-if="isMore">
          <div class="search-loading">
            <loading :title="''"></loading>
          </div>
        </li>
      </ul>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result/>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from "@/base/loading/loading.vue";
import Scroll from "@/base/scroll/scroll.vue";
import { ERR_OK } from "@/api/config.js";
import { getSearchList } from "@/api/search.js";
import { anSong, filterSinger } from "@/common/js/song.js";
import { mapActions } from 'vuex';
import { playListMixin } from '@/common/js/mixin.js';
import noResult from '@/base/no-result/no-result.vue'
const TYPE_SINGER = "singer";
const perPage = 20
export default {
  mixins: [playListMixin],
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    searchList: [],
    noResult: false,
    curPage: 0,
    pullUpLoad: true,
    isMore: true
  }),
  watch: {
    query() {
      this.curPage = 0;
      this.searchList = [];
      this.noResult = false;
      this.isMore = true;
      this._getSearchList(this.query);
    }
  },
  methods: {
    handelPlayList(playList) {
      let bottom = playList.length ? '60px' : ''
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.search.refresh()
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        this.$emit('selectSinger', item)
      } else {
        anSong(item).then(song => {
          this.insertSong(song)
        })
      }
      this.$emit('select')
    },
    async _getSearchList(val) {
      if (!val) {
        return;
      }
      this.curPage++;
      const { data: res } = await getSearchList(
        val,
        this.curPage,
        this.showSinger,
        perPage
      );
      if (res.code === ERR_OK) {
        if (!res.data.song.list.length) {
          if (!this.searchList.length) {
            this.noResult = true;
          }
          this.isMore = false;
          return
        }
        if (res.data.song.curnum + res.data.song.curpage * perPage > res.data.song.totalnum) {
          this.isMore = false;
        }
        let ret = this._genResult(res.data);
        this.searchList = this.searchList.concat(ret);
        this.curPage = res.data.song.curpage;
        this.$nextTick(() => {
          this.$refs.search.finishPullUp();
          this.$refs.search.refresh();
        });
      }
    },
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid && !this.searchList[0]) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        ret = ret.concat(data.song.list);
      }
      return ret;
    },
    pullingUp() {
      this._getSearchList(this.query);
    },
    getIconCls(item) {
      return item.type === TYPE_SINGER ? "icon-mine" : "icon-music";
    },
    getDisPlayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.songname}-${filterSinger(item.singer)}`;
      }
    },
    ...mapActions(['insertSong'])
  },
  components: {
    Loading,
    Scroll,
    noResult
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
@import "@/common/scss/mixin.scss";
.suggest {
  height: 100%;
  overflow: hidden;
  .no-result-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
  }
  .suggest-list {
    padding: 0 30px;
    .item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        .icon-music,
        .icon-mine {
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        @include no-wrap();
      }
    }
    .search-loading {
      position: relative;
      height: 36px;
    }
  }
}
</style>
