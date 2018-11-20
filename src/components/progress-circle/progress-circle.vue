<template>
  <div class="progress-circle">
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="50" cx="50" cy="50" fill="transparent" class="progress-background"></circle>
      <circle
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        stroke-dasharray="314.1592653589793"
        stroke-dashoffset="297.29172919176193"
        class="progress-bar"
      ></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';

.progress-circle {
	position: relative;
	circle {
		stroke-width: 8px;
		transform-origin: center;
		&.progress-background {
			transform: scale(0.9);
			stroke: $color-theme-d;
		}
		&.progress-bar {
			transform: scale(0.9) rotate(-90deg);
			stroke: $color-theme;
		}
	}
}
</style>
