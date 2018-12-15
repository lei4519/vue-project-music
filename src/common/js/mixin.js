import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from '@/common/js/config'

export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  mounted() {
    this.handelPlayList(this.playList)
  },
  activated() {
    this.handelPlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handelPlayList(newVal)
    }
  },
  methods: {
    handelPlayList() {
      throw new Error('component must implement handelPlayList method')
    }
  }
}

export const toggleModeMixin = {
  computed: {
    modeIcon() {
      return `icon-${this.modeArr[this.mode]}`
    },
    ...mapGetters(['mode'])
  },
  created() {
    this.modeArr = Object.keys(playMode)
  },
  methods: {
    togglePlayMode() {
      let i = this.mode
      i = i + 1 >= this.modeArr.length ? 0 : i + 1
      this.setPlayMode(playMode[this.modeArr[i]])
    },
    ...mapMutations({setPlayMode: 'SET_PLAY_MODE'})
  }
}

export const searchListMixin = {
  data: () => ({query: ''}),
  computed: {...mapGetters(['searchHistory'])},
  methods: {
    setQuery(e) {
      let tag = e.target
      if (tag.tagName === 'SPAN' || tag.tagName === 'LI') {
        this.query = tag.innerText
        this.$refs.searchBox.setQuery(tag.innerText)
      }
    },
    ...mapActions(['delSearchHistory'])
  }
}

export const suggestMixin = {
  methods: {
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions(['saveSearchHistory'])
  }
}

export const favoriteListMixin = {
  data() {
    return {
      diff: this.currentSong || {}
    }
  },
  computed: {
    favoriteIdList() {
      const ids = new Map()
      this.favoriteList.forEach(song => ids.set(song.id, song.name))
      return ids
    },
    ...mapGetters(['favoriteList', 'currentSong'])
  },
  methods: {
    getFavoriteIcon(song) {
      let isFavorite = this.favoriteIdList.has(song.id)
      return isFavorite ? 'icon-favorite' : 'icon-not-favorite'
    },
    toggleFavorite(song) {
      let isFavorite = this.favoriteIdList.has(song.id)
      if (isFavorite) {
        this.delFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    ...mapActions(['saveFavoriteList', 'delFavoriteList'])
  }
}
