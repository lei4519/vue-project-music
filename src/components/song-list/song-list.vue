<template>
    <div class="song-list">
        <ul>
            <li class="music-item"
                v-for="(song, i) in songs"
                :key="i"
                @click="selectItem(song, i)">
                <div class="content">
                    <h2 class="music-title">{{song.name}}</h2>
                    <p class="music-desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      getDesc(song) {
        return `${song.singer}·${song.album}`
      },
      selectItem(song, i) {
        this.$emit('select', song, i)
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';

    .song-list {
        width: 100%;
        height: 100%;

        .music-item {
            display: flex;
            align-items: center;
            height: 64px;
            box-sizing: border-box;
            font-size: $font-size-medium;

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
