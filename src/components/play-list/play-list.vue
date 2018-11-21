<template>
	<transition name="list-fade">
		<div class="play-list">
			<div class="list-wrapper">
				<div class="list-header">
					<h1 class="title">
						<i class="icon icon-sequence"></i>
						<span class="text">顺序播放</span>
						<span class="clear">
							<i class="icon-clear"></i>
						</span>
					</h1>
				</div>
				<scroll class="list-content">
					<transition-group name="list" tag="ul">
						<li class="item" style="pointer-events: auto;">
							<i class="current"></i>
							<span class="text">寄我此生</span>
							<span class="like">
								<i class="icon-not-favorite"></i>
							</span>
							<span class="delete">
								<i class="icon-delete"></i>
							</span>
						</li>
					</transition-group>
				</scroll>
				<div class="list-operate">
					<div class="add">
						<i class="icon-add"></i>
						<div class="text">添加歌曲到队列</div>
					</div>
				</div>
				<div class="list-close">
					<span>关闭</span>
				</div>
			</div>
			<confirm/>
			<add-song />
		</div>
	</transition>
</template>

<script>
import confirm from '@/base/confirm/confirm.vue'
import addSong from '@/components/add-song/add-song.vue'

export default {
	components: {
		confirm,
		addSong
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';
.list-fade-enter-active,
.list-fade-leave-active {
	transition: opacity 0.3s;
	.list-wrapper {
		transition: all 0.3s;
	}
}

.list-fade-enter,
.list-fade-leave-to {
	opacity: 0;
	.list-wrapper {
		transform: translate3d(0, 100%, 0);
	}
}
.list-enter-active,
.list-leave-active {
	transition: all 0.1s;
}
.list-enter,
.list-leave-to {
	height: 0;
}
.play-list {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 200;
	background-color: $color-background-d;
	.list-wrapper {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: $color-highlight-background;
		.list-header {
			padding: 20px 30px 10px 20px;
			.title {
				display: flex;
				align-items: center;
				.icon {
					font-size: 30px;
					margin-right: 10px;
					color: $color-theme-d;
				}
				.text {
					flex: 1;
					font-size: 14px;
					color: $color-text-l;
				}
				.clear {
					@include extend-click();
					.icon-clear {
						font-size: 14px;
						color: $color-text-d;
					}
				}
			}
		}
		.list-content {
			max-height: 240px;
			overflow: hidden;
			.item {
				display: flex;
				align-items: center;
				height: 40px;
				overflow: hidden;
				padding: 0 30px 0 20px;
				.current {
					flex: 0 0 20px;
					width: 20px;
					font-size: 12px;
					color: $color-theme-d;
				}
				.text {
					flex: 1;
					font-size: 14px;
					@include no-wrap();
					color: $color-text-d;
				}
				.like {
					margin-right: 15px;
					font-size: 12px;
					color: #ffcd32;
					@include extend-click();
					.icon-favorite {
						color: $color-sub-theme;
					}
				}
				.delete {
					font-size: 12px;
					color: #ffcd32;
					@include extend-click();
				}
			}
		}
		.list-operate {
			width: 140px;
			margin: 20px auto 30px auto;
			.add {
				display: flex;
				align-items: center;
				padding: 8px 16px;
				border-radius: 100px;
				border: 1px solid $color-text-l;
				color: $color-text-l;
				.icon-add {
					font-size: 10px;
					margin-right: 5px;
				}
				.text {
					font-size: 12px;
				}
			}
		}
		.list-close {
			line-height: 50px;
			text-align: center;
			font-size: $font-size-medium-x;
			background-color: $color-background;
			color: $color-text-l;
		}
	}
}
</style>
