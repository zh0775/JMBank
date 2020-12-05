<template>
  <div id="followProgress">
    <div v-show="topLeftSelected" class="show_select_container">
      <div class="tree_view">
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="treeNodeClick"
          :render-content="renderContent">
        </el-tree>
      </div>
      <div class="buttons">
        <div @click="topServiceClick">取消</div>
        <el-button type="primary" class="clean_button" @click="resetTreeChecked">
          <img src="~@/assets/icon/icon_clean.png" alt="">
          <span>清空</span>
        </el-button>
        <el-button type="primary" class="confirm_button" @click="confirmClick">确认</el-button>
      </div>
    </div>
    <div class="top_bar">
      <div class="service_select top_select" @click="topServiceClick">
        <span :class="{normal_span:!topLeftSelected , select_span:topLeftSelected}">{{'服务点' + '(' + serviceCount + ')'}}</span>
        <img :class="{normal:!topLeftSelected , select:topLeftSelected}" src="~@/assets/icon/icon_arrow_down.png" alt="">
      </div>
       <DatePicker
          class="time_select top_select"
          v-if="!topLeftSelected"
          :open="topRightSelected"
          :value="selectTime"
          type="date"
          @on-change="topTimeValueChange">
          <a href="javascript:void(0)" @click="topTimeClick">
              <!-- <Icon type="ios-calendar-outline"></Icon>
              <template v-if="value3 === ''">Select date</template>
              <template v-else>{{ value3 }}</template> -->
              <span :class="{normal_span:!topRightSelected , select_span:topRightSelected}">{{selectTime}}</span>
               <img :class="{normal:!topRightSelected , select:topRightSelected}" src="~@/assets/icon/icon_arrow_down.png" alt="">
          </a>
      </DatePicker>

      <DatePicker
        v-if="topLeftSelected"
        class="select_time"
        :open="startEndTimeSelected"
        type="daterange"
        transfer-class-name="select_time_transfer"
        @on-change="topDateRangeValueChange">
        <a href="javascript:void(0)" @click="selectStartEndtime" style="display: flex;
      flex-direction: row;align-items: center; height: 50px;">
          <span :class="{normal_span:!startEndTimeSelected , select_span:startEndTimeSelected}" class="select_time_span">{{startTime ? (startTime + '-' + endTime) : '请选择时间'}}</span>
          <img :class="{normal:!startEndTimeSelected , select:startEndTimeSelected}" src="~@/assets/icon/icon_arrow_down.png" alt="">
        </a>
      </DatePicker>
      <!-- <div v-if="topLeftSelected" class="select_time" @click="selectStartEndtime">
        <span :class="{normal_span:!startEndTimeSelected , select_span:startEndTimeSelected}" class="select_time_span">{{startTime + '-' + endTime}}</span>
        <img :class="{normal:!startEndTimeSelected , select:startEndTimeSelected}" src="~@/assets/icon/icon_arrow_down.png" alt="">
      </div> -->
      <span v-if="topLeftSelected" class="tj_count">{{'统计数量' + '(' + statisticalCount +')'}}</span>
    </div>
    <div class="list_title">
      <span>服务点</span><span>客户跟进进度</span><span>未跟进/总人数</span>
    </div>
    <div v-for="(item, index) in followData" :key="index" class="follow_cell" @click="toFollowDetail(index, item)">
      <span>{{item.organizationName}}</span>
      <div class="progress_content">
        <p>{{(Number(item.falseCount) / Number(item.count) * 100).toFixed(0) + '%'}}</p>
        <div class="progress progress_all"></div>
        <div class="progress progress_umfollow" :style="{width:getPx((Number(item.falseCount) / Number(item.count)).toFixed(2))}"></div>
      </div>
      <span>{{item.falseCount + '/' + item.count}}</span>
    </div>
    <div class="empty" v-if="!followData.length || !followData">暂无记录</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { USER_TOKEN } from '@/store/mutation-types';
import { setDocumentTitle } from '@/utils/domUtil'
import { getFollowByDep, getUnFollowPeople, getDep } from '@/api/follow'
export default {
  data() {
    return {
      data: [],
      // followData:[{ title: '清秀万达服务点', umFollowCount: '16', allFollowCount: '20' },
      // { title: '台北中心服务点', umFollowCount: '12', allFollowCount: '20' },
      // { title: '台北中心服务点', umFollowCount: '12', allFollowCount: '20' },
      // { organizationName: '这是一个名称较长的服务点', falseCount: '6', count: '20' },],
      followData:[],
      selectTime: '2020-11-09',
      startTime:'',
      endTime:'',
      statisticalCount:4,
      serviceCount: 0,
      serviceSelected: [],
      startEndTimeSelected: false,
      topLeftSelected: false,
      topRightSelected: false,
      depts: []
    }
  },
  created () {
    title.postMessage('跟进进度');
    jump.postMessage('follow');
    var yesterday = new Date();
    yesterday.setTime(yesterday.getTime());
    yesterday.setTime(yesterday.getTime()-24*60*60*1000);
    var yesterdayStr = yesterday.getFullYear()+"-" + ((yesterday.getMonth()+1) > 9 ? (yesterday.getMonth()+1) : ('0' + (yesterday.getMonth()+1))) + "-" + (yesterday.getDate() > 9 ? yesterday.getDate() : ('0' + yesterday.getDate()));
    this.selectTime = yesterdayStr;
    this.getDep();
  },
  mounted () {
    window.setParams = this.setParams;
    setDocumentTitle('跟进进度');
    // currentTitle.postMessage('跟进进度');
  },
  methods: {
    setParams(token, deptId){
      if (token && deptId) {
        Vue.ss.set(USER_TOKEN, token);
        this.getFollowByDep(this.selectTime, deptId);
      }
    },
    topServiceClick(e){
      this.$refs.tree.setCheckedKeys([]);
      this.topLeftSelected = !this.topLeftSelected;
      if (this.topLeftSelected) {
        this.topRightSelected = false;
      } else {
        this.startEndTimeSelected = false;
      }
    },
    topTimeValueChange (e) {
      this.selectTime = e;
      this.getFollowByDep(this.selectTime, this.depts);
      this.topRightSelected = !this.topRightSelected;
    },
    topDateRangeValueChange (e) {
      if (e && e.length > 1) {
        this.startTime = e[0];
        this.endTime = e[1];
      }
      this.startEndTimeSelected = !this.startEndTimeSelected;
    },
    topTimeClick(e){
      this.topRightSelected = !this.topRightSelected;
      if (this.topRightSelected) {
        this.topLeftSelected = false;
      }
    },
    selectStartEndtime(e) {
      this.startEndTimeSelected = !this.startEndTimeSelected;
    },
    getPx(scale) {
      return this.$getPX(250 * 0.8 * Number(scale)) + 'px';
    },
    
    selectNode (node, data) {
      // node.checked = !node.checked; 
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-checkbox value={node.checked} on-change={ () => { this.selectNode(node, data);} }></el-checkbox>
          </span>
        </span>);
    },
    toFollowDetail (index, item) {
      this.$router.push({name: 'followProgressDetail', params: {ids: this.depts, date: this.selectTime}});
      // console.log('object === ', arguments);
    },
    treeNodeClick(data, node, com) {
      node.checked = !node.checked;
      // console.log('this.$refs.tree.getCheckedNodes([]); === ', this.$refs.tree.getCheckedNodes());
      // console.log(`treeNodeClick === `, arguments);
    },
    async getFollowByDep (date, deptIds) {
      this.depts = deptIds;
      const params = {date: date,ids: deptIds};
      const { data } = await getFollowByDep (params);      
      if (data.code === 200) {
        console.log('getFollowByDep === ', data);  
        this.followData = data.data;
        if(!this.followData.length) {
        this.followData = [{ organizationName: '这是一个名称较长的服务点', falseCount: '6', count: '20' }];
        }
      }
      
    },
    async getDep () {
      const { data } = await getDep ();
      console.log('res === ', data.data);
      if (data.code === 200) {
        this.data = data.data;
        this.serviceCount = 0;
        this.getServiceCount(data.data);
      }
    },
    getServiceCount(array) {
      array.forEach((data) => {
        this.serviceCount++;
        if(data.children && data.children.length > 0) {
          this.getServiceCount(data.children);
        }
      });
    },
    resetTreeChecked() {
      this.$refs.tree.setCheckedKeys([202],true);
    },
    confirmClick () {
      const list =  this.$refs.tree.getCheckedNodes();
      const depts = [];
      list.forEach((value) => {
        depts.push(value.id);
      });
      this.getFollowByDep(this.selectTime, depts);
      this.topLeftSelected = false;
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/css/common.scss';
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: px2rem(30);
  width: 100%;
  height: 100%;
}
.ivu-date-picker-with-range .ivu-picker-panel-body {
  min-width: px2rem(750);
  
}
// .ivu-picker-panel-body, .ivu-picker-panel-body-date {
//   width: px2rem(750);
// }
// .ivu-date-picker-cells {
//   width: px2rem(750);
// }
.ivu-picker-panel-content{
  width: px2rem(750);
}
.el-tree-node__expand-icon{
  font-size: px2rem(30);
}
</style>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.empty {
  widows: px2rem(750);
  height: px2rem(750);
  line-height: px2rem(750);
  text-align: center;
  font-size: px2rem(40);
  color: $jm_text_gray;
}
#followProgress{
  width: px2rem(750);
  height: 100%;
  background-color: white;
  .show_select_container {
    position: fixed;
    top: 41px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: white;
    transition: all .5s;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-between;
    .tree_view {
      padding-top: px2rem(30);
      // background-color: red;
      width: px2rem(650);
      height: 80vh;
      overflow: auto;
      margin-left: px2rem(50);
    }
    .buttons {
      margin-bottom: px2rem(50);
      display: flex;
      flex-direction: row;
      // align-items: center;
      justify-content: flex-start;
      div {
        margin-left: px2rem(50);        
        line-height: px2rem(100);
        text-align: center;
        font-size:px2rem(35);
        color: $jm_text_black;
        width: px2rem(150);
        background-color: #fff;
        height: px2rem(100);
      }
      .clean_button {
        position: relative;
        background-color: rgb(240,242,245);
        border: none;
        margin-left: px2rem(30);
        width: px2rem(150);
        height: px2rem(100);
        img {
          position: absolute;
          width: px2rem(50);
          height: px2rem(50);
          left: px2rem(50);
          top: px2rem(10);
        }
        span {
          position: absolute;
          left: px2rem(45);
          top: px2rem(60);
          font-size:px2rem(25);
          color: $jm_text_black;
        }
      }
      .confirm_button {
        color: white;
        font-size: px2rem(35);
        border: none;
        margin-left: px2rem(30);
        width: px2rem(295);
        background-color: $app_theme;
        height: px2rem(100);
      }
    }
  }
  .top_bar {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .tj_count {
      color: $jm_text_black;
      font-size: px2rem(25);
      margin-right: px2rem(50);
      line-height: 50px;
      // background-color: orangered;
    }
    .select_time {
      font-size: px2rem(25);
      // background-color: red;
      position: relative;
      right: px2rem(20);
      width: px2rem(400);
      height: 100%;
      z-index: 1000;
      align-items: center;
      display: flex;
      flex-direction: column;
      
      .select_time_span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:1; // 行数
        font-size: px2rem(25);
        // color: white;
        // background-color: blue;
      }
      img {
        // background-color: yellow;
        width: px2rem(40);
        height: px2rem(40);
        // margin: 0;
        // padding: 0;
      }

    }
    .top_select {
      width: px2rem(250);
      height: 100%;
      color: black;
      align-items: center;
      display: flex;
      flex-direction: row;
      font-size: px2rem(23);
      img {
        width: px2rem(40);
        height: px2rem(40);
      }
  }
    .service_select {
      span {
        margin-left: px2rem(40);
      }
    }
    .time_select {
      display: flex;
      align-items: center;
      // background-color: red;
      justify-content: flex-end;
      img {
        position: relative;
        top:px2rem(12);
        margin-right: px2rem(40);
      }
      span {
        line-height: 30px;
      }
    }
  }
  .list_title {
    width: px2rem(750);
    height: 40px;
    line-height: 40px;
    display: flex;
    font-size: px2rem(25);
    justify-content: space-between;
    color: $jm_text_gray;
    border-top: 0.5px $jm_line_color solid;
    border-bottom: 0.5px $jm_line_color solid;
    margin-bottom: px2rem(30);
    span {
      &:nth-child(1) {
        margin-left: px2rem(40);
      }
      &:nth-child(2) {
        position: relative;
        left: px2rem(40);
      }
      &:nth-child(3) {
        margin-right: px2rem(50);
      }
    }
  }
  .follow_cell {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: space-between;
    color: $jm_text_black;
    line-height: px2rem(40);
    font-size: px2rem(25);
    span {
      &:nth-child(1) {
        display: inline-block;
        margin-left: px2rem(40);
        width: px2rem(200);
        // background-color: orange;
        max-lines: 2;
      }
      // &:nth-child(2) {
      //   margin-right: px2rem(150);
      // }
      &:nth-child(3) {
        position: relative;
        left: px2rem(100);
        // text-align: center;
      }
    }
    .progress_content {
      position: relative;
      // right: px2rem(50);
      left: px2rem(20);
      height: px2rem(110);
      width: px2rem(250);
      // background-color:red;
      p {
        position: absolute;
        left: px2rem(30);
        top: px2rem(10);
      }
      .progress {
        position: absolute;
        width: px2rem(200);
        height: px2rem(12);
        background-color: $jm_text_gray;
        left: px2rem(30);
        top: px2rem(50);
      }
      .progress_umfollow {
        width: px2rem(180);
        background-color: $app_theme;
        transition: all 1.5s ease-in-out;
      }
    }
  }
}

.normal {
  transform: rotate(0deg);
  transition: transform .5s;
}

.select {
  transform: rotate(180deg);
  transition: transform .5s;
}
.normal_span {
  color: $jm_text_black;
  // transition: all .5s;
}

.select_span {
  color: $app_theme;
  // transition: all .5s;
}
</style>