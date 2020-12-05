<template>
  <div id="followProgressDetail">
    <div class="title">
      <span>{{date}}</span>
    </div>
    <div class="cell" v-for="(item, index) in cellData" :key="index">
      <div class="cell_left">
        <!-- <img src="" alt=""> -->
        <div class="cell_left_name">
          <span>{{item.userName}}</span>
          <span>{{item.organizationName}}</span>
        </div>
      </div>
      <div class="cell_right">
        <span>跟进完成进度</span>
        <span>{{item.visit + '/' + item.expect}}</span>
      </div>
    </div>
    <div v-if="!cellData.length || !cellData" class="empty">暂无记录</div>
  </div>
</template>

<script>
import { getUnFollowPeople } from '@/api/follow'
import { setDocumentTitle } from '@/utils/domUtil';
export default {
  data() {
    return {
      date: '2020-11-19',
      cellData: [],
      // cellData: [{icon:'',name:'姜维',currentFollow:'3',allFollow:'5'},
      // {icon:'',name:'姜维',currentFollow:'3',allFollow:'5'},
      // {icon:'',name:'姜维',currentFollow:'3',allFollow:'5'},
      // {icon:'',name:'姜维',currentFollow:'3',allFollow:'5'},
      // {icon:'',name:'姜维',currentFollow:'3',allFollow:'5'}],
      // serviceLocation: ''
    }
  },
  created() {
    title.postMessage('跟进进度详情');
    jump.postMessage('followDetail');
    // this.serviceLocation = this.$route.params.title;
    this.date = this.$route.params.date;
    console.log('this.$route.params === ',this.$route.params);
    this.getUnFollowPeople(this.$route.params.ids);
  },
  mounted() {
    setDocumentTitle('跟进进度详情');
    // console.log('this.serviceLocation == ', this.serviceLocation);
  },
  methods: {
    async getUnFollowPeople (ids) {
      const { data } = await getUnFollowPeople({ids,date: this.date});
      // console.log('data === ' ,data);
      if (data.code === 200) {
        console.log('getUnFollowPeople === ', data);
        // this.cellData = data.data;
        // console.log('cellData ===', this.cellData);
        // console.log('cellData ===', this.cellData.length);
      }
     }

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
#followProgressDetail{
  width: px2rem(750);
  height: 100%;
  background-color:#fff;
  .empty {
    width: px2rem(750);
    height: px2rem(750);
    line-height: px2rem(750);
    text-align: center;
    font-size: px2rem(40);
    color: $jm_text_gray;
  }
  .title {
    width: px2rem(750);
    height: px2rem(80);
    font-size: px2rem(26);
    color: $jm_text_black;
    line-height: px2rem(80);
    border-bottom: 0.5px $jm_line_color solid;
    span {
      padding-left: px2rem(50);
    }
  }
  .cell {
    width: px2rem(700);
    height: px2rem(200);
    margin-left: px2rem(50);
    border-bottom: 0.5px $jm_line_color solid;
    font-size: px2rem(20);
    line-height: px2rem(50);
    color: $jm_text_black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .cell_left {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: px2rem(100);
        height: px2rem(100);
        background-color: gray;
        border-radius: px2rem(50);
      }
      .cell_left_name {
        margin-left: px2rem(20);
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        span {
          &:nth-child(1) {
            font-size: px2rem(33);
            font-weight: bold;
            color: $jm_text_black;
          }
          &:nth-child(2) {
            font-size: px2rem(25);
            // font-weight: bold;
            color: $jm_text_gray;
          }
          
        }
      }
    }
    .cell_right {
      margin-right: px2rem(50);
      display: flex;
      flex-direction: column;
      // align-items: center;
      text-align: end;
      span {
        &:nth-child(1) {
          font-size: px2rem(24);
          // font-weight: bold;
          color: $jm_text_gray;
        }
        &:nth-child(2) {
          font-size: px2rem(33);
          font-weight: bold;
          color: $jm_text_black;
        }
      }
    }
  }
}
</style>