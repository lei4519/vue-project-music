<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImg" :songs="songs"/>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, getPlayUrl } from '@/api/singer.js'
import { ERR_OK } from '@/api/config.js'
import { creataSongs } from '@/common/js/song.js'
import musicList from '@/components/music-list/music-list.vue'

export default {
  created() {
    if (!this.singer.id) {
      return this.$router.back()
    }
    this._getSingerDetail(this.singer.id)
  },
  data: () => ({
    songs: []
  }),
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImg() {
      return this.singer.avatar
    }
  },
  methods: {
    async _getSingerDetail(id) {
      const res = await getSingerDetail(id)
      if (res.code === ERR_OK) {
        let arr = res.data.list.map(s => s.musicData)
        this._normalizeSongs(arr)
      }
    },
    async _normalizeSongs(list) {
      let gen = creataSongs(list)
      this.songs = gen.next().value
      gen.next()
    }
  },
  components: {
    musicList
  }
}
</script>

<style lang="scss" scoped>
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
</style>
