<template>
    <div class="singer">
        <listview :data="singerList" @initSingerList="initSingerList"></listview>
        <loading v-if="!singerList.length"></loading>
        <music-list v-if="isShow"
                    :data="singerInfoData"
                    :logo="logo"
                    @close="close"></music-list>
    </div>
</template>

<script>
  import MusicList from '@/components/music-list/music-list.vue'
  import Loading from '@/base/loading/loading.vue'
  import Listview from '@/base/listview/listview.vue'
  import {getSingerList, getSingerInfo} from '@/api/singer.js'
  import {ERR_OK} from '@/api/config.js'
  import Singer from '@/common/js/singer.js'

  const HOT_SINGER_LEN = 10
  const HOT_TITLE = '热门'

  export default {
    created() {
      this._getSingerList()
    },
    data: () => ({
      singerList: [],
      isShow: false,
      singerInfoData: {}
    }),
    methods: {
      async _getSingerList() {
        try {
          const res = await getSingerList()
          if (res.code === ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list)
          }
        } catch (err) {
          console.error(err)
        }
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_TITLE,
            items: []
          }
        }
        list.forEach((item, i) => {
          if (i < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        let hot = []
        let ret = []
        hot.push(map.hot)
        let key
        for (key of Object.keys(map)) {
          if (key === 'hot' || key === '9') continue
          ret.push(map[key])
        }
        ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
        return hot.concat(ret)
      },
      async initSingerList(id, logo) {
        this.isShow = true
        this.logo = logo
        const {data: res} = await getSingerInfo(id)
        this.singerInfoData = res
      },
      close() {
        this.isShow = false
      }
    },
    components: {
      Loading,
      Listview,
      MusicList
    }
  }
</script>

<style lang="scss" scoped>
    .singer {
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
    }
</style>
