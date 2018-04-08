<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title" v-if="popoverAlive.SSSnum==='first'" >预览已关联优惠券</span>
      <span class="title" v-if="popoverAlive.SSSnum==='second'">关联优惠券</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p><label>优惠券名称:</label>
        <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p style="line-height: 28px;"><label>使用等级:</label>
        <!--<el-radio-group v-model="updataTwo" size="small">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">白领</el-radio>
          <el-radio :label="2">金领</el-radio>
          <el-radio :label="3">粉领</el-radio>
        </el-radio-group>-->
        <el-checkbox-group v-model="updataTwo" size="small" @change="changeLebal(updataTwo)">
          <el-checkbox :label="0">全部</el-checkbox>
          <el-checkbox :label="1">白领</el-checkbox>
          <el-checkbox :label="2">金领</el-checkbox>
          <el-checkbox :label="3">粉领</el-checkbox>
        </el-checkbox-group>
      </p>
      <p style="margin: 0"><el-button type="primary" plain size="mini" style="" @click="seachData()">搜索</el-button></p>
    </div>
      <el-button type="primary" plain @click="toggleSelection(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 50px" v-if="popoverAlive.SSSnum==='second'">批量关联</el-button>
        <el-table
          @row-click="addGoodsImg"
          v-loading="loading"
          :data="CouponListResult.rows"
          tooltip-effect="light"
          style="width: 100%;"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :cell-style="styleH">
          <el-table-column
            v-if="popoverAlive.SSSnum==='second'"
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            v-for="(item,index) in GoodsType"
            :label="item.name"
            :width="item.width"
            :key="index"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <!--<span style="margin-left: 10px" v-if="item.which!=='img' && item.which!=='status'">{{ scope.row[item.which]}}</span>-->
              <!--<span style="margin-left: 10px" v-if="item.which==='status'">{{ scope.row[item.which] ? '已审核' : '待审核'}}</span>-->
              <span v-if="item.which==='time'">{{ scope.row.startTime | changeTime}}--{{ scope.row.endTime | changeTime}}</span>
              <span v-else-if="item.which==='ct'">{{ scope.row.ct | changeTime}}</span>
              <span v-else-if="item.which==='auditTime'">{{ scope.row.auditTime | changeTime}}</span>
              <span v-else-if="item.which==='sellerName'">{{ scope.row.sellerName ? scope.row.sellerName : '平台'}}</span>
              <span v-else-if="item.which==='price'">{{ scope.row.price/100}}</span>
              <span v-else>{{ scope.row[item.which]}}</span>
              <!--<img :src="scope.row[item.which]" alt="" style="width: 100%;height: 52px;" v-else>-->
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="popoverAlive.SSSnum==='first'"
                size="mini"
                plain
                @click="choseDown(scope.$index, scope.row)" plain>取消关联</el-button>
            <el-button
              v-if="popoverAlive.SSSnum==='second'"
                size="mini"
                plain
                @click="chose(scope.$index, scope.row)" plain>关联</el-button>
            </template>
          </el-table-column>
        </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="CouponListResult.total">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 940px;
    height: auto;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -250px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
  }
  .popover-head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }
  .popover-head i{
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }
  .popover-head .title{
    margin-left: 15px;
    font-weight: bold;
  }
  .popover-main{
    padding: 15px 12.5px 0px;
    padding-bottom: 0px;
    width: calc(100% - 25px);
    display: flex;
    flex-wrap: wrap;
       label{
             margin-right:10px;
       }
  }
  .popover-main p{
    margin-right: 10px;
  }
  .popover-main .el-input{
    width:160px;
    margin-right: 20px;
  }
  .demo > p:last-child{
    text-align: center;
  }
  .popover-main .el-button{
    width: 100px;
  }
  .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }
 .demo .el-table td{
    padding:5px 0;
  }
  .el-button--mini, .el-button--mini.is-round{
    padding:7px;font-size: 12px;
  }
  .block{
    text-align: right;
    margin: 5px 0;
  }
  p .el-radio+.el-radio{
    margin-left: 0;
  }
  p .el-checkbox-group{
    display: inline-block;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        styleH:{
          padding:'6px 0'
        },
        input:'',
        input1:'',
        input2:'',
        currentPage4:1,
        value:10,
        multipleSelection:[],
        GoodsType:[
          {
            name:'标题',
            width:'70',
            which:'title'
          },{
            name:'有效期',
            width:'90',
            which:'time'
          },{
            name:'券价值',
            width:'60',
            which:'price'
          },{
            name:'产品',
            width:'120',
            which:'productName'
          },{
            name:'券总数量',
            width:'70',
            which:'num'
          },{
            name:'已领数量',
            width:'70',
            which:'receivedNum'
          },{
            name:'已使用',
            width:'70',
            which:'useNum'
          },{
            name:'限领数',
            width:'60',
            which:'limitReceived'
          }/*,{
            name:'状态',
            width:'70',
            which:'whoGet'
          }*/,{
            name:'供应商',
            width:'70',
            which:'sellerName'
          },{
            name:'创建时间',
            width:'75',
            which:'ct'
          },{
            name:'审核时间',
            width:'75',
            which:'auditTime'
          }
          ],
        updataTwo:[]
      };
    },
    components:{

    },
    computed:{
      ...mapGetters([
      'loading','CouponListResult','YHQwhichResult','popoverAlive'
      ]),
    },
    mounted(){
      if(this.popoverAlive.SSSnum==='first'){
        this.CouponListActions({page:1,rows:10,chose:'chose',filter_I_isAudit:1,conponActivityId:this.YHQwhichResult.item.id})
      }else {
        if(this.YHQwhichResult.item.isPublic===0){
          this.CouponListActions({page:1,rows:10,chose:'chose',filter_I_isAudit:1,filter_I_isPublic:0})
        }else{
          this.CouponListActions({page:1,rows:10,chose:'chose',filter_I_isAudit:1,filter_I_isPublic:1})
        }
      }
    },
    methods: {
      ...mapActions([
        'popoverAlert','CouponListActions','ActivelinkCouponActions','changelinkCouponActions'
      ]),
      toggleSelection(data) {
        if(data.length>0){
        let str=[]
          data.forEach((val,index) => {
          str.push(val.id)
          })
        let obj={
          activityId:this.YHQwhichResult.item.id,
          couponIds:str.join(',')
        }
        this.ActivelinkCouponActions(obj)
         this.popoverAlert()
        }else{
          this.$message({
            message:'请选择优惠券',
            type:'warning'
          })
        }
      },
      seachData(){
        let str=''
        let obj={
          page:1,
          rows:10,
          chose:'chose',
          filter_I_isAudit:1
        }
          if(this.input){
            obj.filter_S_title=this.input
          }

          if(this.updataTwo.length>0){
              obj.limitLevels= this.updataTwo.join(',')
          }
            if(this.popoverAlive.SSSnum==='first'){
              obj.conponActivityId=this.YHQwhichResult.item.id
            }else{
              if(this.YHQwhichResult.item.isPublic===0){
                obj.filter_I_isPublic=0
              }else{
                obj.filter_I_isPublic=1
              }
            }
            this.CouponListActions(obj)
         /* else{
            if(this.popoverAlive.SSSnum==='first'){
              obj.filter_L_conponActivityId=this.YHQwhichResult.item.id
            }
            this.CouponListActions(obj)
          }*/

      },
      chose(index,row){
          let obj={
            activityId:this.YHQwhichResult.item.id,
            couponIds:row.id
          }
          this.ActivelinkCouponActions(obj)
          this.popoverAlert()
      },
      choseDown(index,row){
          let obj={
            activityId:this.YHQwhichResult.item.id,
            couponId:row.id
          }
          this.changelinkCouponActions(obj)
        this.popoverAlert()
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val
        let obj={
          page:1,
          rows:this.value,
          chose:'chose',
          filter_I_isAudit:1
        }
        if(this.input){
          obj.filter_S_title=this.input
        }
        if(this.updataTwo){
          obj.limitLevels=this.updataTwo.join(',')
        }
        if(this.popoverAlive.SSSnum==='first'){
          obj.conponActivityId=this.YHQwhichResult.item.id
        }else{
          if(this.YHQwhichResult.item.isPublic===0){
            obj.filter_I_isPublic=0
          }else{
            obj.filter_I_isPublic=1
          }
        }
        this.CouponListActions(obj)
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val
        let obj={
          page:this.currentPage4,
          rows:10,
          chose:'chose',
          filter_I_isAudit:1
        }
        if(this.input){
          obj.filter_S_title=this.input
        }
        if(this.updataTwo){
          obj.limitLevels=this.updataTwo.join(',')
        }
        if(this.popoverAlive.SSSnum==='first'){
          obj.conponActivityId=this.YHQwhichResult.item.id
        }else{
          if(this.YHQwhichResult.item.isPublic===0){
            obj.filter_I_isPublic=0
          }else{
            obj.filter_I_isPublic=1
          }
        }
        this.CouponListActions(obj)

      },
      addGoodsImg(row,event,column){

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changeLebal(item){
        let that=this
        item.forEach(function(val,index){
          if(val===0){
            that.updataTwo=[0]
          }
        })
      }
    }
  };
</script>
