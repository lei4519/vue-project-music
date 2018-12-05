<template>
  <div class="singer" ref="singer">
    <listview :data="singerList" @select="selectSinger" ref="list"/>
    <loading v-if="!singerList.length"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import singerDetail from "@/views/singer-detail/singer-detail.vue";
import Loading from "@/base/loading/loading.vue";
import Listview from "@/base/listview/listview.vue";
import { getSingerList } from "@/api/singer.js";
import { ERR_OK } from "@/api/config.js";
import Singer from "@/common/js/singer.js";
import { mapMutations } from "vuex";
import { playListMixin } from "@/common/js/mixin.js";

const HOT_SINGER_LEN = 10;
const HOT_TITLE = "热门";

export default {
  mixins: [playListMixin],
  created() {
    this._getSingerList();
  },
  data: () => ({
    singerList: [],
    isShow: false
  }),
  methods: {
    handelPlayList(playList) {
      let bottom = playList.length > 0 ? "60px" : ""
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    async _getSingerList() {
      try {
        const res = await getSingerList();
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list);
        }
      } catch (err) {
        console.error(err);
      }
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };
      list.forEach((item, i) => {
        if (i < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      let hot = [];
      let ret = [];
      hot.push(map.hot);
      let key;
      for (key of Object.keys(map)) {
        if (key === "hot" || key === "9") continue;
        ret.push(map[key]);
      }
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      return hot.concat(ret);
    },
    async selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  components: {
    Loading,
    Listview,
    singerDetail
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
