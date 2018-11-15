<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
@import '@/common/scss/mixin.scss';

.m-header {
	position: relative;
	height: 44px;
	text-align: center;
	font-size: 0;
	color: $color-theme;
	.icon {
		display: inline-block;
		vertical-align: top;
		margin-top: 6px;
		margin-right: 9px;
		width: 30px;
		height: 32px;
		@include bg-image('logo');
		background-size: 30px 32px;
	}
	.text {
		display: inline-block;
		vertical-align: top;
		line-height: 44px;
		font-size: $font-size-large;
	}
}
</style>

