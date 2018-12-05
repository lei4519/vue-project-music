<template>
  <div class="player" v-show="playList.length>0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-play" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="hide" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
          <div class="middle-l" ref="cdWrapper">
            <div class="cd-wrapper">
              <div class="cd" :class="rotateCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper" v-if="currentLyric">
              <div class="playing-lyric">{{ currentLyric.lines[currentLineNum].txt }}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricWrapper" :data="currentLyric">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  v-for="(line, i) in currentLyric.lines"
                  :key="i"
                  :class="{'current': currentLineNum === i}"
                  class="text"
                >{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ currentTime | formatTime }}</span>
            <progress-bar :percent="percent" @dragProgress="dragProgress"/>
            <span class="time time-r">{{ durationTime | formatTime }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="modeIcon" @click="togglePlayMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon center" :class="disableCls">
              <i class="needsclick" :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" :class="rotateCls">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle radius="32" :percent="percent">
            <i
              class="icon-mini icon-play-mini"
              @click.stop="togglePlaying"
              :class="`${playIcon}-mini`"
            ></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="ready"
      @error="error"
      @ended="ended"
      @timeupdate="timeupdate"
    ></audio>
  </div>
</template>

<script>
import { playMode } from "@/common/js/config";
import playList from "@/components/play-list/play-list.vue";
import Scroll from "@/base/scroll/scroll.vue";
import progressBar from "@/components/progress-bar/progress-bar.vue";
import progressCircle from "@/components/progress-circle/progress-circle.vue";
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "@/common/js/dom";
import LyricParser from "lyric-parser";

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  created() {
    this.touch = {};
    this.modeArr = Object.keys(playMode);
  },
  mounted() {
    this.cdWrapper = this.$refs.cdWrapper;
    this.lyricWrapper = this.$refs.lyricWrapper.$el;
  },
  data() {
    return {
      currentShow: "cd",
      songReady: false,
      currentTime: 0,
      durationTime: 0,
      currentLyric: null,
      currentLineNum: 0
    };
  },
  computed: {
    percent() {
      return this.currentTime / this.durationTime;
    },
    rotateCls() {
      return this.playing ? "play" : "play pause";
    },
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    modeIcon() {
      let iconName = "icon-sequence";
      if (this.mode === playMode.loop) {
        iconName = "icon-loop";
      }
      if (this.mode === playMode.random) {
        iconName = "icon-random";
      }
      return iconName;
    },
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex",
      "mode"
    ])
  },
  methods: {
    touchstart(e) {
      this.touch.initiated = true;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    touchmove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const detailX = touch.pageX - this.touch.startX;
      const detailY = touch.pageY - this.touch.startY;
      let currentX = e.changedTouches[0].pageX;
      if (Math.abs(detailY) > Math.abs(detailX)) {
        return;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + detailX)
      );
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.cdWrapper.style[transitionDuration] = `0ms`;
      this.cdWrapper.style.opacity = 1 - this.touch.percent;
      this.lyricWrapper.style[transitionDuration] = `0ms`;
      this.lyricWrapper.style[transform] = `translateX(${offsetWidth}px)`;
    },
    touchend(e) {
      let offsetWidth, opacity;
      if (this.currentShow === "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          opacity = 1;
          this.currentShow = "cd";
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      const time = 300;
      this.cdWrapper.style[transitionDuration] = `${time}ms`;
      this.cdWrapper.style.opacity = opacity;
      this.lyricWrapper.style[transitionDuration] = `${time}ms`;
      this.lyricWrapper.style[transform] = `translateX(${offsetWidth}px)`;
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: "translate3d(0, 0, 0) scale(1.1)"
        },
        100: {
          transform: "translate3d(0, 0, 0) scale(1)"
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      const cdWrapper = this.$refs.cdWrapper;
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    prev() {
      if (!this.songReady) return;
      !this.playing && this.togglePlaying();
      this.songReady = false;
      if (this.playList.length === 1) {
        return this.loop();
      }
      let i = this.currentIndex - 1;
      if (this.mode === playMode.random) {
        i = Math.ceil(Math.random() * this.playList.length);
      }
      this.setCurrentIndex(i);
    },
    next() {
      if (!this.songReady) return;
      !this.playing && this.togglePlaying();
      this.songReady = false;
      if (this.playList.length === 1) {
        return this.loop();
      }
      let i = this.currentIndex + 1;
      if (this.mode === playMode.random) {
        i = Math.ceil(Math.random() * this.playList.length);
      }
      this.setCurrentIndex(i);
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.setPlayState(true);
    },
    ready() {
      this.songReady = true;
      this.durationTime = this.$refs.audio.duration;
    },
    error() {
      this.songReady = true;
    },
    ended() {
      this.togglePlaying();
      switch (this.mode) {
        case playMode.sequence:
          this.next();
          break;
        case playMode.loop:
          this.loop();
          break;
        case playMode.random:
          if (!this.songReady) return;
          !this.playing && this.togglePlaying();
          this.songReady = false;
          let randomIndex = Math.ceil(Math.random() * this.playList.length);
          this.setCurrentIndex(randomIndex);
          break;
      }
    },
    timeupdate(el) {
      this.currentTime = this.$refs.audio.currentTime;
      if (this.currentLyric) {
        let i = this.currentLyric.lines.findIndex(
          line => line.time >= this.currentTime * 1000
        );
        if (i === -1) {
          i = this.currentLyric.lines.length - 1;
        } else {
          i = Math.max(0, i - 1);
        }
        if (this.currentLineNum !== i) {
          this.currentLineNum = i;
          if (i > 5) {
            let el = this.$refs.lyricLine[i - 5];
            this.$refs.lyricWrapper.scrollToElement(el, 1000);
          } else {
            this.$refs.lyricWrapper.scrollTo(0, 0, 1000);
          }
        }
      }
    },
    togglePlaying() {
      if (!this.songReady) return;
      this.setPlayState(!this.playing);
    },
    dragProgress(percent) {
      this.$refs.audio.currentTime = this.durationTime * percent;
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    togglePlayMode() {
      let i = this.mode;
      i = i + 1 >= this.modeArr.length ? 0 : i + 1;
      this.setPlayMode(playMode[this.modeArr[i]]);
    },
    async getLyric() {
      await this.currentSong.setLyric();
      this.currentLyric = new LyricParser(this.currentSong.lyric);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode: "SET_PLAY_MODE",
      setSongLyric: "SET_CURRENT_SONG_LYRIC"
    })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return;
      }
      this.getLyric();
      setTimeout(() => {
        if (this.playing) {
          this.$refs.audio.play();
        }
      }, 1000);
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  },
  components: {
    playList,
    Scroll,
    progressBar,
    progressCircle
  },
  filters: {
    formatTime(val) {
      val = +val;
      let m = (val / 60) | 0;
      let s = ((val % 60 | 0) + "").padStart(2, 0);
      return `${m}:${s}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
@import "@/common/scss/mixin.scss";

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.normal-enter-active,
.normal-leave-active {
  transition: all 0.4s;

  .top,
  .bottom {
    transition: all 0.4s cubic-bezier(1, -0.12, 0, 1.66);
  }
}

.normal-enter,
.normal-leave-to {
  opacity: 0;

  .top {
    transform: translate3d(0, -100px, 0);
  }

  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}

.mini-enter-active,
.mini-leave-active {
  transition: all 0.4s;
}

.mini-enter,
.mini-leave-to {
  opacity: 0;
}

.player {
  .normal-play {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 150;
    background-color: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .hide {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        height: 40px;
        width: 70%;
        line-height: 40px;
        margin: 0 auto;
        font-size: $font-size-large;
        text-align: center;
        @include no-wrap();
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
        @include no-wrap();
      }
    }

    .middle {
      position: fixed;
      top: 80px;
      bottom: 170px;
      width: 100%;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          top: 0;
          left: 10%;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper {
          margin: 30px auto 0 auto;
          width: 80%;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          overflow: hidden;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      width: 100%;
      bottom: 50px;

      .dot-wrapper {
        font-size: 0;
        text-align: center;

        .dot {
          display: inline-block;
          vertical-align: top;
          width: 8px;
          height: 8px;
          margin: 0 4px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;

        .time {
          flex: 0 0 30px;
          width: 30px;
          text-align: left;
          font-size: $font-size-small;
          line-height: 30px;
          color: $color-text;

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
          margin: 0 5px;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-right {
          text-align: left;
        }

        .center {
          text-align: center;
          padding: 0 20px;

          i {
            font-size: 40px;
          }
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
  }

  .mini-player {
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    bottom: 0;
    z-index: 180;
    height: 60px;
    width: 100%;
    background-color: $color-highlight-background;

    .icon {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        font-size: 14px;
        @include no-wrap();
        color: #fff;
      }

      .desc {
        font-size: 12px;
        color: $color-text-l;
        @include no-wrap();
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      height: 30px;
      padding: 0 10px;

      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }

      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
