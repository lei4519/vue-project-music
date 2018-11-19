<template>
    <div class="mini-player">
        <div class="icon">
            <div class="imgWrapper">
                <img width="100%" height="100%"
                     src="http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzJgRQMKJYlrCXiazaIaQFK62DicblDG7mFEg/600?n=1">
            </div>
        </div>
        <div class="text">
            <h2 class="name">Hero</h2>
            <p class="desc">Chad Kroeger/Josey Scott</p></div>
        <div class="control">
            <div class="progress-circle">
                <svg width="32" height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle r="50" cx="50" cy="50" fill="transparent" class="progress-background"></circle>
                    <circle r="50" cx="50" cy="50" fill="transparent" stroke-dasharray="314.1592653589793"
                            stroke-dashoffset="297.29172919176193" class="progress-bar"></circle>
                </svg>
                <i class="icon-mini icon-play-mini"></i>
            </div>
        </div>
        <div class="control">
            <i class="icon-playlist"></i>
        </div>
    </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';

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
            height: 40px;
            width: 40px;
            padding: 0 10px 0 20px;
            .imgWrapper {
                width: 100%;
                height: 100%;
                img {
                    border-radius: 50%;
                }
            }
        }
        .text{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            line-height: 20px;
            overflow: hidden;
            .name{
                margin-bottom: 2px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                color: #fff;
            }
            .desc{
                font-size: 12px;
                color: $color-text-l;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .control{
            flex: 0 0 30px;
            width: 30px;
            padding: 0 10px;
            .progress-circle{
                position: relative;
                .icon-mini{
                    font-size: 32px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    color: $color-theme-d;
                }
            }
            .icon-playlist{
                font-size: 30px;
                color: $color-theme-d;
            }
        }
    }
</style>
