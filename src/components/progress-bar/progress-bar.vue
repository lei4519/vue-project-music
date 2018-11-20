<template>
  <div class="progress-bar-wrapper">
    <div class="bar-inner">
      <div class="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.progress-bar-wrapper{
    height: 30px;
    .bar-inner{
        position: relative;
        top: 13px;
        height: 4px;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.5);
        .progress{
            position: absolute;
            height: 100%;
            border-radius: 2px;
            background: #ffcd32;
        }
        .progress-btn-wrapper{
            position: absolute;
            left: -8px;
            top: -13px;
            height: 30px;
            width: 30px;
            .progress-btn{
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid #fff;
                border-radius: 50%;
                background: #ffcd32;
            }
        }
    }
}
</style>
