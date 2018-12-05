<template>
  <transition name="slide">
    <music-list :isRank="isRank" :title="title" :bgImg="bgImg" :songs="songs"/>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRankInfo } from '@/api/rank.js'
import { ERR_OK } from '@/api/config.js'
import { creataSongs } from '@/common/js/song.js'
import musicList from '@/components/music-list/music-list.vue'

export default {
  async created() {
    if (!this.rank.id) {
      return this.$router.back()
    }
    this.getRankInfo(this.rank.id)
  },
  methods: {
    async getRankInfo(id) {
      let res = await getRankInfo(id)
      if (res.code === ERR_OK) {
        const arr = res.songlist.map(s => s.data)
        this._normalizeSongs(arr)
      }
    },
    _normalizeSongs(list) {
      let gen = creataSongs(list)
      this.songs = gen.next().value
      gen.next()
    }
  },
  data: () => ({
    songs: [],
    isRank: true
  }),
  computed: {
    title() {
      return this.rank.topTitle
    },
    bgImg() {
      return this.rank.picUrl
    },
    ...mapGetters([
      'rank'
    ])
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
