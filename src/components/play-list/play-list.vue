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
            <confirm />
        </div>
    </transition>
</template>

<script>
import confirm from '@/base/confirm/confirm.vue'
export default {
	components: {
		confirm
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';

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
					position: relative;
					&::before {
						position: absolute;
						top: -10px;
						bottom: -10px;
						left: -10px;
						right: -10px;
						content: '';
					}
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
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: $color-text-d;
				}
				.like {
					position: relative;
					margin-right: 15px;
					font-size: 12px;
					color: #ffcd32;
					&::before {
						content: '';
						position: absolute;
						top: -10px;
						left: -10px;
						right: -10px;
						bottom: -10px;
					}
				}
				.delete {
					position: relative;
					font-size: 12px;
					color: #ffcd32;
					&::before {
						content: '';
						position: absolute;
						top: -10px;
						left: -10px;
						right: -10px;
						bottom: -10px;
					}
				}
			}
		}
		.list-operate {
			width: 140px;
			margin: 20px auto 30px;
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
			font-size: 16px;
			background-color: $color-background;
			color: $color-text-l;
		}
	}
}
</style>
