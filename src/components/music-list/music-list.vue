<template>
    <div class="music-list" ref="musicList">
        <h1 class="title">{{data.dissname}}</h1>
        <div
            class="cover"
            ref="cover"
            :style="{backgroundImage: `url(${this.logo})`}"
            :class="{'fixed': !isPlayShow}"
        >
            <div class="random-play">
                <div class="play" v-show="isPlayShow&&isCdInfoList">
                    <i class="icon icon-play-mini"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter"></div>
        </div>
        <div class="bg-layer" ref="bgLayer"></div>
        <div class="music-wrapper" :style="{'top': `${coverHeight}px`}">
            <scroll
                class="song-list"
                ref="scroll"
                :data="data"
                :probeType="probeType"
                :listenScroll="listenScroll"
                @scroll="scroll"
            >
                <ul>
                    <li class="music-item" v-for="(song, i) in data.songlist" :key="i">
                        <div class="content">
                            <h2 class="music-title">{{song.songname}}</h2>
                            <p class="music-desc">{{`${song.singer[0].name}·${song.albumname}`}}</p>
                        </div>
                    </li>
                </ul>
            </scroll>
        </div>
        <div class="back" @click="$emit('close')">
            <i class="icon icon-back"></i>
        </div>
        <loading v-show="!isCdInfoList"></loading>
    </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
import { touch } from '@/common/js/dom.js'
export default {
	created() {
		this.probeType = 3
		this.listenScroll = true
	},
	mounted() {
		this.coverHeight = this.$refs.cover.clientHeight
		touch(this.$refs.musicList, e => {
			let width = e.el.clientWidth / 4
			if (Math.abs(e.startX - e.endX) < width) {
				return
			}
			if (e.startX - e.endX < 0) {
				this.$emit('close')
			}
		})
	},
	props: {
		data: {
			type: Object,
			default: {}
		},
		logo: {
			type: String,
			default: ''
		}
	},
	data: () => {
		return {
			scrollY: 0,
			isPlayShow: true,
			coverHeight: 0
		}
	},
	computed: {
		filterFixedHeight() {
			return -(this.coverHeight - 40)
		},
		isCdInfoList() {
			return Object.keys(this.data).length
		}
	},
	methods: {
		scroll(e) {
			this.scrollY = e.y
			this._setStyle(e.y)
		},
		_setStyle(y) {
			const layer = this.$refs.bgLayer
			const cover = this.$refs.cover
			if (y >= this.filterFixedHeight) {
				layer.style.transform = `translateY(${y}px)`
				this.isPlayShow = true
			} else {
				this.isPlayShow = false
			}
			if (y > 0) {
				cover.style.transform = `scale(${1 + y / 250})`
			}
		}
	},
	components: {
		Scroll,
		Loading
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';

.music-list {
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 100;
	width: 100%;
	overflow: hidden;
	background-color: $color-background;
	.title {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 10%;
		z-index: 40;
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: $font-size-large;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.cover {
		position: relative;
		z-index: 0;
		width: 100%;
		padding-top: 70%;
		transform: scale(1);
		transform-origin: top;
		background-size: cover;
		&.fixed {
			height: 40px;
			z-index: 10;
			padding-top: 0;
		}
		.random-play {
			position: absolute;
			width: 100%;
			bottom: 20px;
			z-index: 1;
			.play {
				box-sizing: border-box;
				margin: 0 auto;
				width: 135px;
				height: 32px;
				padding: 7px 0;
				text-align: center;
				border: 1px solid $color-theme;
				border-radius: 100px;
				font-size: 0;
				color: $color-theme;
				.icon {
					display: inline-block;
					vertical-align: middle;
					margin-right: 6px;
					font-size: $font-size-medium-x;
				}
				.text {
					display: inline-block;
					vertical-align: middle;
					font-size: $font-size-small;
				}
			}
		}
		.filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(7, 17, 27, 0.4);
		}
	}
	.bg-layer {
		position: relative;
		height: 100%;
		transform: translateY(0);
		background-color: $color-background;
	}
	.music-wrapper {
		box-sizing: border-box;
		position: absolute;
		top: 224px;
		width: 100%;
		height: 100%;
		padding: 20px 30px;
		.song-list {
			width: 100%;
			height: 100%;
			.music-item {
				display: flex;
				align-items: center;
				height: 64px;
				box-sizing: border-box;
				font-size: $font-size-medium;
				.content {
					flex: 1;
					line-height: 20px;
					overflow: hidden;
					.music-title {
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						color: #fff;
					}
					.music-desc {
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						margin-top: 4px;
						color: $color-text-d;
					}
				}
			}
		}
	}
	.back {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 50;
		.icon {
			display: inline-block;
			padding: 9px;
			font-size: $font-size-large-x;
			color: $color-theme;
		}
	}
}
</style>
