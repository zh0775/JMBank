<template>
  <div id="followTrack">
    <div :style="{height: getPx(40)}"></div>
     <div v-for="(item, index) in followTrackData" :key="index" class="cell">
       <div v-if="index != followTrackData.length - 1" class="cell_content_line" id="cell_content_line">
          
       </div>
       <!-- <div v-if="index != followTrackData.length - 1" class="cell_content_line" id="cell_content_line">
          
       </div> -->
       <div class="cell_content_ball"></div>
       <div class="cell_content">
          <span>{{item.result}}</span>
          <span>{{item.visitDate}}</span>
       </div>
     </div>
  </div>  
</template>

<script>
export default {
  data () {
    return {
      followTrackData:[]
    }
  },
  created () {
    title.postMessage('客户跟进');
  },
  mounted () {
    window.setParams = this.setParams;
  },
  methods: {
    setParams (json) {
      this.followTrackData = JSON.parse(json);
    },
    getPx(px) {
      return this.$getPX(px) + 'px';
    },
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
#followTrack{
  width: px2rem(750);
  height: 100%;
  background-color: #f7f8fb;
  overflow: auto;
  .cell {
    position: relative;
    width: px2rem(750);
    height: px2rem(200);
    .cell_content {
      position: absolute;
      right: px2rem(30);
      top: 0;
      width: px2rem(600);
      height: px2rem(160);
      border-top-right-radius:px2rem(20);
      border-bottom-right-radius:px2rem(20);
      border-bottom-left-radius:px2rem(20);
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        line-height: px2rem(50);
        padding-left: px2rem(36);  
        &:nth-child(1) {
          color: $jm_text_black;
          font-size: px2rem(33);
          
        }
        &:nth-child(2) {
          color: $jm_text_gray;
          font-size: px2rem(29);
        }
      }
    }
    .cell_content_line {
      position: absolute;
      width: px2rem(1);
      top: 0;
      bottom: 0;
      left: px2rem(58.2);
      border: px2rem(2) dashed $jm_line_color;
      // background-color: $jm_line_color;
    }
    .cell_content_ball {
      position: absolute;
      top: -px2rem(10);
      left: px2rem(51);
      width: px2rem(18);
      height: px2rem(18);
      border-radius: px2rem(9);
      background-color: $app_theme;
    }
  }
}
</style>