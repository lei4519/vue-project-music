<template>
    <transition name="mini">
        <div class="mini-player">
            <div class="icon">
                <img
                    width="40"
                    height="40"
                    src="http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzJgRQMKJYlrCXiazaIaQFK62DicblDG7mFEg/600?n=1"
                >
            </div>
            <div class="text">
                <h2 class="name">Hero</h2>
                <p class="desc">Chad Kroeger/Josey Scott</p>
            </div>
            <div class="control">
                <progress-circle>
                    <i class="icon-mini icon-play-mini"></i>
                </progress-circle>
            </div>
            <div class="control">
                <i class="icon-playlist"></i>
            </div>
        </div>
    </transition>
</template>

<script>
import progressCircle from '@/components/progress-circle/progress-circle.vue'
export default {
	components: {
		progressCircle
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';
.mini-enter-active,
.mini-leave-active {
	transition: all 0.4s;
}
.mini-enter,
.mini-leave-to {
	opacity: 0;
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
</style>
