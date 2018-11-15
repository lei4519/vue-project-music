<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

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
      }
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          const me = this
          this.scroll.on('scroll', (e) => {
            me.$emit('scroll', e)
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    }
  }
</script>
