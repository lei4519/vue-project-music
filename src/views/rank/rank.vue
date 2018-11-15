<template>
    <scroll :data="rankList" class="rank">
        <ul class="rank-list">
            <li class="item"
                v-for="(item, i) in rankList" :key="i">
                <div class="avatar">
                    <img v-lazy="item.picUrl" width="100" height="100">
                </div>
                <ul class="song-list">
                    <li class="song-name"
                        v-for="(song, i) in item.songList">
                        <span>{{i+1}}.</span>
                        <span>{{`${song.songname} - ${song.singername}`}}.</span>
                    </li>
                </ul>
            </li>
        </ul>
        <loading v-if="!rankList.length"></loading>
    </scroll>
</template>

<script>
  import {getRankList} from '@/api/rank.js'
  import {ERR_OK} from '@/api/config.js'
  import Scroll from '@/base/scroll/scroll.vue'
  import Loading from '@/base/loading/loading.vue'

  export default {
    data: () => ({
      rankList: []
    }),
    created() {
      this._getRankList()
    },
    methods: {
      async _getRankList() {
        try {
          const res = await getRankList()
          if (res.code === ERR_OK) {
            this.rankList = res.data.topList
          }
        } catch (err) {
          console.error(err)
        }
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";

    .rank {
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .rank-list {
            padding: 20px;
            .item {
                display: flex;
                height: 100px;
                margin-bottom: 20px;
                &:last-child{
                    margin-bottom: 0;
                }
                .avatar {
                    flex: 0 0 100px;
                    width: 100px;
                }
                .song-list {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 20px;
                    overflow: hidden;
                    line-height: 26px;
                    background-color: $color-highlight-background;
                    font-size: $font-size-small;
                    color: $color-text-d;
                    .song-name {
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        line-height: 26px;
                    }
                }
            }
        }
    }
</style>
