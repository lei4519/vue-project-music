<template>
  <div class="song-list">
    <ul>
      <li class="music-item" v-for="(song, i) in songs" :key="i" @click="selectItem(song, i)">
        <div class="rank" v-if="isRank">
          <span :class="getClass(i)">{{i > 2 ? i+1 : ''}}</span>
        </div>
        <div class="content">
          <h2 class="music-title">{{song.name}}</h2>
          <p class="music-desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPlayUrl } from '@/common/js/song.js'
const classList = {
  '0': 'icon icon0',
  '1': 'icon icon1',
  '2': 'icon icon2',
  'other': 'text'
}
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    isRank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`
    },
    selectItem(song, i) {
      if (!song.url) {
        this._getPlayUrl(song)
      }
      this.$emit('select', song, i)
    },
    async _getPlayUrl(song) {
      const { url_mid: res } = await getPlayUrl({ songmids: [song.mid] })
      const domain = res.data.sip[0];
      const playUrlList = res.data.midurlinfo;
      song.url = `${domain}${playUrlList[i].purl}`
    },
    getClass(num) {
      return classList[num] || classList['other']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
@import "@/common/scss/mixin.scss";

.song-list {
  width: 100%;
  height: 100%;

  .music-item {
    display: flex;
    align-items: center;
    height: 64px;
    box-sizing: border-box;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image("first");
        }
        &.icon1 {
          @include bg-image("second");
        }
        &.icon2 {
          @include bg-image("third");
        }
      }
      .text {
        color: #ffcd32;
        font-size: 18px;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .music-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #fff;
      }

      .music-desc {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
