<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImg" :songs="songs"/>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDiscInfo } from '@/api/recommend.js'
import { ERR_OK } from '@/api/config.js'
import { creataSongs } from '@/common/js/song.js'
import musicList from '@/components/music-list/music-list.vue'

export default {
  async created() {
    if (!this.disc.dissid) {
      return this.$router.back()
    }
    this._getDiscInfo(this.disc.dissid)
  },
  methods: {
    async _getDiscInfo(id) {
      let { data: res } = await getDiscInfo(id)
      if (res.code === ERR_OK) {
        this._normalizeSongs(res.cdlist[0].songlist)
      }
    },
    _normalizeSongs(list) {
      let gen = creataSongs(list)
      this.songs = gen.next().value
      gen.next()
    }
  },
  data: () => ({
    songs: []
  }),
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImg() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
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
