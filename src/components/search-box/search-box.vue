<template>
  <div class="search-box">
            <i class="icon-search"></i>
            <input type="text" :placeholder="placeholder" class="box" v-model="searchVal">
            <i class="icon-dismiss" v-show="searchVal" @click="searchVal=''"></i>
        </div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: '搜索歌曲、歌手'
		}
	},
	data() {
		return {
			searchVal: ''
		}
	},
	watch: {
		searchVal() {
			this.$emit('query', this.searchVal)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.search-box {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	padding: 0 6px;
	border-radius: 6px;
	background-color: $color-highlight-background;
	.icon-search {
		font-size: 24px;
		color: $color-background;
	}
	.icon-dismiss {
		font-size: 16px;
		color: $color-background;
	}
	.box {
		flex: 1;
		color: #fff;
		margin: 0 5px;
		font-size: 14px;
		line-height: 18px;
		background-color: $color-highlight-background;
		font-size: $font-size-medium;
		&::placeholder {
			color: $color-text-d;
		}
	}
}
</style>
