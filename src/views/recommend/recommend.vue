<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div class="slider-wrapper" v-if="recommends.length">
                    <slider>
                        <div v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item" v-for="item in discList" :key="item.dissid" @click="initMusicList(item.dissid, item.imgurl)">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <loading v-show="!discList.length"/>
        <transition>
            <music-list v-if="isShow"
                        @close="close"
                        :data="cdInfoData"
                        :logo="logo"/>
        </transition>
    </div>
</template>

<script>
  import MusicList from '@/components/music-list/music-list.vue'
  import Slider from '@/base/slider/slider.vue'
  import Scroll from '@/base/scroll/scroll.vue'
  import Loading from '@/base/loading/loading.vue'
  import {getRecommend, getDiscList, getCDInfo} from '@/api/recommend.js'
  import {ERR_OK} from '@/api/config.js'

  export default {
    components: {
      Slider,
      Scroll,
      Loading,
      MusicList
    },
    data: () => ({
      recommends: [],
      discList: [],
      isShow: false,
      dissId: 0,
      logo: '',
      cdInfoData: {}
    }),
    methods: {
      async _initDataList() {
        try {
          const [recRes, {data: discRes}] = await Promise.all([getRecommend(), getDiscList()])

          if (recRes.code === ERR_OK) {
            this.recommends = recRes.data.slider
          }
          if (discRes.code === ERR_OK) {
            this.discList = discRes.data.list
          }
        } catch (err) {
          console.error(err)
        }
      },
      loadImage() {
        if (!this.loadImage.refresh) {
          this.$refs.scroll.refresh()
          this.loadImage.refresh = true
        }
      },
      async initMusicList(dissid, imgurl) {
        this.isShow = true
        this.logo = imgurl
        const {data: res} = await getCDInfo(dissid)
        if (res.code === ERR_OK) {
          this.cdInfoData = res.cdlist[0]
        }
      },
      close() {
        this.isShow = false
      }
    },
    created() {
      this._initDataList()
    }
  }
</script>

<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';

    .v-enter,
    .v-leave-to {
        transform: translateX(100%);
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.3s;
    }

    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        .recommend-content {
            height: 100%;
            overflow: hidden;
            .slider-wrapper {
                position: relative;
                width: 100%;
                overflow: hidden;
            }
            .recommend-list {
                .list-title {
                    height: 65px;
                    line-height: 65px;
                    text-align: center;
                    font-size: $font-size-medium;
                    color: $color-theme;
                }
            }
            .item {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px;
                .icon {
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: $font-size-medium;
                    .name {
                        margin-bottom: 10px;
                        color: $color-text;
                    }
                    .desc {
                        color: $color-text-d;
                    }
                }
            }
        }
    }
</style>
