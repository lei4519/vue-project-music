import {mapGetters} from 'vuex';
export const playListMixin = {
  computed:{
    ...mapGetters([
      'playList'
    ])
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