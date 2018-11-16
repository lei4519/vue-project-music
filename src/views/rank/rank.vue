<template>
    <div class="rank">
        <scroll :data="rankList" class="rank-content">
            <ul class="rank-list">
                <li class="item" v-for="(item, i) in rankList" :key="i">
                    <div class="avatar">
                        <img v-lazy="item.picUrl" width="100" height="100">
                    </div>
                    <ul class="song-list">
                        <li
                            class="song-name"
                            v-for="(song, i) in item.songList"
                            :key="song.id"
                            @click="initRankInfo(item.id)"
                        >
                            <span>{{i+1}}.</span>
                            <span>{{`${song.songname} - ${song.singername}`}}.</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
        <loading v-if="!rankList.length"></loading>
        <transition>
            <music-list v-if="isShow" :data="rankInfoData" :logo="logo" @close="close"/>
        </transition>
    </div>
</template>

<script>
import { getRankList, getRankInfo } from '@/api/rank.js'
import { ERR_OK } from '@/api/config.js'
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
import MusicList from '@/components/music-list/music-list.vue'

export default {
	data: () => ({
		rankList: [],
		isShow: false,
		rankInfoData: {},
		logo: ''
	}),
	created() {
		this._getRankList()
	},
	methods: {
		async _getRankList() {
			try {
				const res = await getRankList()
				if (res.code === ERR_OK) {
					this.rankList = res.data.topList
				}
			} catch (err) {
				console.error(err)
			}
		},
		async initRankInfo(id) {
			this.isShow = true
			const res = await getRankInfo(id)
			this.rankInfoData = this.normalizeRankData(res)
			this.logo = res.topinfo.pic_album
		},
		normalizeRankData(rankInfo) {
			let songlist = []
			rankInfo.songlist.forEach(song => {
				songlist.push(song.data)
			})
			return {
				dissname: rankInfo.topinfo.ListName,
				songlist
			}
		},
		close() {
			this.isShow = false
			this.logo = ''
			this.rankInfoData = {}
		}
	},

	components: {
		Scroll,
		Loading,
		MusicList
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.v-enter,
.v-leave-to {
	transform: translateX(100%);
}

.v-enter-active,
.v-leave-active {
	transition: all 0.3s;
}
.rank {
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
	.rank-content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.rank-list {
			padding: 20px;
			.item {
				display: flex;
				height: 100px;
				margin-bottom: 20px;
				&:last-child {
					margin-bottom: 0;
				}
				.avatar {
					flex: 0 0 100px;
					width: 100px;
				}
				.song-list {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 0 20px;
					overflow: hidden;
					line-height: 26px;
					background-color: $color-highlight-background;
					font-size: $font-size-small;
					color: $color-text-d;
					.song-name {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						line-height: 26px;
					}
				}
			}
		}
	}
}
</style>
