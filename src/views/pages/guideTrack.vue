<template>
  <div id="guideTrack">
    <div v-for="(item, index) in guideTrackData" :key="index" class="cell">
      <div class="cell_content">
        <div class="name">
          <span class="name_span">{{item.name}}</span>
          <span class="name_span">{{item.phone}}</span>
        </div>
        <div v-for="(title, index) in titles" :key="index" class="cell_texts">
          <span>{{title}}</span>
          <span v-if="index === 0" >{{item.project}}</span>
          <span v-else-if="index === 1">{{item.value4}}</span>
          <span v-else-if="index === 2" :style="{color:getStatusColor(item.value5)}">{{item.value5}}</span>
          <span v-else-if="index === 3">{{item.value6}}</span>
          <span v-else-if="index === 4">{{item.value7}}</span>
          <span v-else-if="index === 5">{{item.value8}}</span>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
const data = [{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'},
{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'},
{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'},
{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'},
{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'},
{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'},
{name: '王超', phone: '13424567890', project: '世贸金科薄脆江山项目', value4: '-', value5: '已带看', value6: '金幕', value7: '金小幕', value8: '132****8798'}];
export default {
  
  data () {
    return {
      titles: ['报备项目','报备保护期','报备状态','报备公司','员工名称','员工号码'],
      guideTrackData: data
    }
  },
  created () {
    title.postMessage('带看轨迹');
  },
  mounted () {
    window.setParams = this.setParams;
  },
  methods: {
    setParams (json) {
      // this.guideTrackData = JSON.parse(json);
    },
    getPx(px) {
      return this.$getPX(px) + 'px';
    },
    getStatusColor(status) {
      if (status === '已带看') {
        return 'green';
      } else {
        return '#000';
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
#guideTrack{
  width: px2rem(750);
  height: 100%;
  background-color: #f7f8fb;
  overflow: auto;
  .cell {
    position: relative;
    width: px2rem(750);
    height: px2rem(500);
    .cell_content {
      position: absolute;
      left: px2rem(30);
      right: px2rem(30);
      top: px2rem(30);
      bottom: 0;
      border-radius: px2rem(20);
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .cell_texts {
        padding-left: px2rem(40);
        line-height: px2rem(50);
        span {
          &:nth-child(1) {
            color: $jm_text_gray;
            font-size: px2rem(26);
            display: inline-block;
            width: px2rem(156);
          }
          &:nth-child(2) {
            padding-left: px2rem(20);  
            color: $jm_text_black;
            font-size: px2rem(28);
          }
        }
      }
      .name {
        margin-bottom: px2rem(15);
        .name_span {
          line-height: px2rem(50);
          padding-left: px2rem(40);  
          &:nth-child(1) {
            color: $jm_text_black;
            font-size: px2rem(35);
          }
          &:nth-child(2) {
            padding-left: px2rem(20);  
            color: $jm_text_black;
            font-size: px2rem(35);
          }
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