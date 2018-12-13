<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" :placeholder="placeholder" class="box" v-model="query" v-focus>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from "@/common/js/util.js";
export default {
  created() {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    }
  },
  directives: {
    focus(el) {
      el.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 6px;
  border-radius: 6px;
  background-color: $color-highlight-background;
  .icon-search {
    font-size: 24px;
    color: $color-background;
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
  .box {
    flex: 1;
    color: #fff;
    margin: 0 5px;
    font-size: 14px;
    line-height: 18px;
    background-color: $color-highlight-background;
    font-size: $font-size-medium;
    &::placeholder {
      color: $color-text-d;
    }
  }
}
</style>
