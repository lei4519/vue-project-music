<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array | Object,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Boolean | Object,
      default: false
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad
      });
      if (this.listenScroll) {
        const me = this;
        this.scroll.on("scroll", e => {
          me.$emit("scroll", e);
        });
      }
      if (this.pullUpLoad) {
        const me = this;
        this.scroll.on("pullingUp", () => {
          me.$emit("pullingUp");
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.refresh();
      });
    }
  }
};
</script>
