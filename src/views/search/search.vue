<template>
    <div class="search-wrapper">
        <div class="search-box">
            <i class="icon-search"></i>
            <input type="text" placeholder="搜索歌曲、歌手" class="box" v-model="searchVal">
            <i class="icon-dismiss" v-show="searchVal" @click="searchVal=''"></i>
        </div>
        <div class="shortcut-wrapper" v-show="!searchVal">
            <scroll class="shortcut">
                <div>
                    <div class="hot-key">
                        <h2 class="title">热门搜索</h2>
                        <ul @click="searchHotKey">
                            <li class="item" v-for="(item, i) in hotKey" :key="i">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history">
                        <h2 class="title">
                            <span class="text">搜索历史</span>
                            <span class="icon">
                                <i class="icon-clear"></i>
                            </span>
                        </h2>
                        <ul>
                            <li class="item">
                                <span class="text">1</span>
                                <span class="icon">
                                    <i class="icon-delete"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </scroll>
        </div>
        <scroll
            ref="search"
            class="search-result"
            v-show="searchVal"
            :pullUpLoad="pullUpLoad"
            @pullingUp="pullingUp"
        >
            <ul class="suggest-list" v-show="searchVal">
                <li class="item" v-for="(item, i) in searchList" :key="i">
                    <div class="icon">
                        <i class="icon-music"></i>
                    </div>
                    <p
                        class="name"
                    >{{item.songname}}{{item.singer[0].name && `-${item.singer[0].name}`}}</p>
                </li>
                <li v-if="isMore">
                    <div class="search-loading">
                        <loading :title="''"></loading>
                    </div>
                </li>
            </ul>
            <div class="no-result-wrapper" v-show="noResult">
                <div class="no-result-icon"></div>
                <p class="no-result-text">抱歉，暂无搜索结果</p>
            </div>
        </scroll>
    </div>
</template>
searchVal
<script>
import Loading from '@/base/loading/loading.vue'
import Scroll from '@/base/scroll/scroll.vue'
import { getHotKey, getSearchList } from '@/api/search.js'
import { ERR_OK } from '@/api/config.js'
export default {
	data() {
		return {
			searchList: [],
			searchVal: '',
			hotKey: [],
			curPage: 0,
			noResult: false,
			isMore: true
		}
	},
	created() {
		this._getHotKey()
		this.pullUpLoad = true
	},
	methods: {
		async _getHotKey() {
			const res = await getHotKey()
			if (res.code === ERR_OK) {
				this.hotKey = res.data.hotkey.splice(0, 10)
			}
		},
		async _getSearchList(val) {
			this.curPage++
			const { data: res } = await getSearchList(val, this.curPage)
			if (res.code === ERR_OK) {
				if (!res.data.song.list.length) {
					if (!this.searchList.length) {
						this.noResult = true
						this.isMore = false
					} else {
						this.isMore = false
					}
					return
				}
				this.searchList = this.searchList.concat(res.data.song.list)
				this.curPage = res.data.song.curpage
				this.$nextTick(() => {
					this.$refs.search.finishPullUp()
					this.$refs.search.refresh()
				})
			}
		},
		pullingUp() {
			this._getSearchList(this.searchVal)
		},
		searchHotKey(e) {
			let tag = e.target
			if (tag.tagName === 'SPAN' || tag.tagName === 'LI') {
				this.searchVal = tag.innerText
			}
		}
	},
	watch: {
		searchVal() {
			this.curPage = 0
			this.searchList = []
			this.noResult = false
			this.isMore = true
			this._getSearchList(this.searchVal)
		}
	},
	components: {
		Loading,
		Scroll
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';
.search-wrapper {
	.search-box {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px;
		height: 40px;
		line-height: 40px;
		padding: 0 6px;
		border-radius: 6px;
		background-color: $color-highlight-background;
		color: $color-background;
		.icon-search {
			font-size: 24px;
			flex: 0 0 24px;
		}
		.icon-dismiss {
			font-size: 16px;
			flex: 0 0 16px;
		}
		.box {
			flex: 1;
			outline: none;
			color: #fff;
			margin: 0 5px;
			font-size: 14px;
			line-height: 18px;
			background-color: $color-highlight-background;
		}
	}
	.shortcut-wrapper {
		position: fixed;
		top: 178px;
		bottom: 0;
		width: 100%;
		.shortcut {
			height: 100%;
			overflow: hidden;
			.hot-key {
				font-size: 0;
				margin: 0 20px 20px;
				color: $color-text-l;
				.title {
					margin-bottom: 20px;
					color: $color-text-l;
					font-size: $font-size-medium;
				}
				.item {
					display: inline-block;
					font-size: $font-size-medium;
					padding: 5px 10px;
					margin: 0 20px 10px 0;
					border-radius: 6px;
					color: $color-text-d;
					background-color: $color-highlight-background;
				}
			}
			.search-history {
				margin: 0 20px;
				color: $color-text-l;
				font-size: $font-size-medium;
				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 40px;
					color: $color-text-l;
					.text {
						flex: 1;
					}
					.icon {
						position: relative;
						color: $color-text-d;
						&::before {
							position: absolute;
							top: -10px;
							bottom: -10px;
							left: -10px;
							right: -10px;
							content: '';
						}
					}
				}
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 40px;
					font-size: $font-size-medium-x;
					color: $color-text-l;
					.text {
						flex: 1;
					}
					.icon {
						position: relative;
						font-size: $font-size-small;
						color: $color-text-d;
						&::before {
							position: absolute;
							top: -10px;
							bottom: -10px;
							left: -10px;
							right: -10px;
							content: '';
						}
					}
				}
			}
		}
	}
	.search-result {
		position: fixed;
		top: 178px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.no-result-wrapper {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 100%;
			text-align: center;
			.no-result-icon {
				width: 86px;
				height: 90px;
				margin: 0 auto;
				@include bg-image('no-result');
				background-size: 86px 90px;
			}
			.no-result-text {
				margin-top: 30px;
				font-size: 14px;
				color: $color-text-d;
			}
		}
		.suggest-list {
			padding: 0 30px;
			.item {
				display: flex;
				align-items: center;
				padding-bottom: 20px;
				.icon {
					flex: 0 0 30px;
					width: 30px;
					.icon-music {
						font-size: $font-size-medium;
						color: $color-text-d;
					}
				}
				.name {
					flex: 1;
					font-size: $font-size-medium;
					color: $color-text-d;
				}
			}
			.search-loading {
				position: relative;
				height: 36px;
			}
		}
	}
}
</style>
