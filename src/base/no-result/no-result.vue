<template>
    <div>
        <div class="no-result-icon"></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '抱歉，暂无搜索结果'
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";
    @import "@/common/scss/mixin.scss";

    .no-result-icon {
        width: 86px;
        height: 90px;
        margin: 0 auto;
        @include bg-image("no-result");
        background-size: 86px 90px;
    }

    .no-result-text {
        margin-top: 30px;
        font-size: 14px;
        color: $color-text-d;
    }
</style>
