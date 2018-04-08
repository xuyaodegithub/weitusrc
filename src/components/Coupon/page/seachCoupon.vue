<template>
  <div id="smalltitle">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <div class="seach-list">
            <el-button type="primary" plain @click="toggleSelection(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 50px">批量审核</el-button>
          <el-table
            v-loading="loading"
            :data="CouponListResult.rows"
            style="width: 100%"
            ref="multipleTable"
            tooltip-effect="light"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="30">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in dataList"
              :label="item.name"
              :width="item.width"
              :key="index"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="margin-left: 10px" v-if="item.which==='ct'">{{ scope.row[item.which] | changeTime}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='Time'">{{ scope.row.startTime | changeTime}}--{{ scope.row.endTime | changeTime}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='isAudit'">{{ scope.row[item.which]===0 ? '待审核' : '已审核'}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='creatorType'">{{ scope.row[item.which]===0 ? '平台' : scope.row.sellerName}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='price'">{{ scope.row[item.which]/100}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='limitReceived'">{{ scope.row[item.which]===0 ? '不限' : scope.row.limitReceived}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='isPublic'">{{ scope.row[item.which]===0 ? '否' : '是'}}</span>
                <span style="margin-left: 10px" v-else>{{ scope.row[item.which] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="linkTo(scope.$index, scope.row)" plain>审核</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleTwo({title:'VupDataCoupon',item:scope.row,Which:'first'},scope.row)" plain>修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="block">-->
            <!--<el-pagination-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="currentPage4"-->
              <!--:page-sizes="[10, 20, 30, 50]"-->
              <!--:page-size="value"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="CouponListResult.total">-->
            <!--</el-pagination>-->
          <!--</div>-->
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="second">
        <div>
          <el-table
            v-loading="loading"
            :data="CouponListResult.rows"
            style="width: 100%"
            tooltip-effect="light">
            <el-table-column
              v-for="(item,index) in dataListTwo"
              :label="item.name"
              :width="item.width"
              :key="index"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="margin-left: 10px" v-if="item.which==='ct'">{{ scope.row.ct | changeTime}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='Time'">{{ scope.row.startTime | changeTime}}--{{ scope.row.endTime | changeTime}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='isAudit'">{{ scope.row[item.which]===0 ? '待审核' : '已审核'}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='auditTime'">{{ scope.row[item.which] | changeTime}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='creatorType'">{{ scope.row[item.which]===0 ? '平台' : scope.row.sellerName}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='limitReceived'">{{ scope.row[item.which]===0 ? '不限' : scope.row.limitReceived}}</span>
                <span style="margin-left: 10px" v-else-if="item.which==='isPublic'">{{ scope.row[item.which]===0 ? '否' : '是'}}</span>
                <span style="margin-left: 10px" v-else>{{ scope.row[item.which] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleTwo({title:'VupDataCoupon',item:scope.row,Which:'second'},scope.row)" plain>修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChangeTWO"
        @current-change="handleCurrentChangeTWO"
        :current-page="currentPage5"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="CouponListResult.total">
      </el-pagination>
    </div>
    <transition name="slide-fade">
    <div class="demo incomingHistory" v-if="showOrClose">
      <div class="popover-head">
        <span class="title">审核确定</span><i @click=closed() class="el-icon-close"></i>
      </div>
      <div class="popover-main">
        <p class="tep"><label>领取等级:</label>
          <el-checkbox-group v-model="updataTwo" size="small">
            <el-checkbox :label="1">白领</el-checkbox>
            <el-checkbox :label="2">金领</el-checkbox>
            <el-checkbox :label="3">粉领</el-checkbox>
          </el-checkbox-group>
        </p>
        <p class="tep"><label>到期提醒时间:</label>
          <el-checkbox-group v-model="updataThree" size="small">
            <el-checkbox :label="3">到期前三天提醒</el-checkbox>
            <el-checkbox :label="1">到期前一天提醒</el-checkbox>
          </el-checkbox-group>
        </p>
        <el-button
          style="width:80px;margin-left:150px;"
          size="small"
          type="primary"
          @click="UpGo()" plain>确认审核</el-button>
      </div>
    </div>
    </transition>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
    props:["msg"],
  name: 'YHQList',
  data () {
    return {
      updataTwo:[],
      updataThree:[],
      ids:'',
      showOrClose:false,
      activeName2: 'first',
      input:'',
      currentPage4:1,
      currentPage5:1,
      value:10,
      value1:10,
      multipleSelection:[],
      dataList:[
        {
          name:'券标题', width:'110', which:'title'
        },{
          name:'有效期', width:'125', which:'Time'
        },{
          name:'券价值', width:'70', which:'price'
        },{
          name:'产品', width:'130', which:'productName'
        },{
          name:'券总数量', width:'70', which:'num'
        },{
          name:'限领数量', width:'70', which:'limitReceived'
        },{
          name:'状态', width:'80', which:'isAudit'
        },{
          name:'公开状态', width:'70', which:'isPublic'
        },{
          name:'供应商', width:'90', which:'creatorType'
        },{
          name:'创建时间', width:'120', which:'ct'
        }
      ],
       dataListTwo:[
        {
          name:'券标题', width:'100', which:'title'
        },{
          name:'有效期', width:'140', which:'Time'
        },{
          name:'产品', width:'140', which:'productName'
        },{
          name:'券总数量', width:'70', which:'num'
        },/*{
          name:'已领数量', width:'70', which:'receivedNum'
        },{
          name:'已使用', width:'70', which:'useNum'
        },*/{
          name:'限领数量', width:'70', which:'limitReceived'
        },{
          name:'状态', width:'80', which:'isAudit'
        },{
          name:'公开状态', width:'70', which:'isPublic'
        },{
          name:'供应商', width:'90', which:'creatorType'
        },{
          name:'创建时间', width:'130', which:'ct'
        },{
          name:'审核时间', width:'130', which:'auditTime'
        }
      ]
    }
  },
  watch: {
//    seachWhicheResult2(curVal,oldVal){
//          if(curVal===1){
//            this.activeName2='first'
//          }else{
//            this.activeName2='second'
//          }
//    }
    msg: {
      handler (curVal, oldVal) {
       if(curVal.trueOrFlas!==oldVal.trueOrFlas && curVal.statusOkOrNo==0){
         this.activeName2='first'
       }else{
         this.activeName2='second'
       }
      },
      deep: true
    }
  },
  computed:{
    ...mapGetters([
      'loading','CouponListResult','seachWhicheResult2'
    ])
  },
  mounted(){
        let data={
          filter_I_isAudit:0,
          page:1,
          rows:10
        }
        this.CouponListActions(data)
       // this.$store.commit('SEACHWHICHE2',1)
  },
  activated(){

  },
  methods: {
    ...mapActions([
   'popoverAlert','YHQonlyActions','CouponListActions','deleteCouponActions','doAuditCouponActions'
    ]),
    handleClick(tab, event) {
      //console.log(tab)
//          if(tab.name==='first'){
//            this.$store.commit('SEACHWHICHE2',1)
//          }else{
//            this.$store.commit('SEACHWHICHE2',2)
//          }
          //console.log(tab.name);
          let data={
           // filter_I_isAudit:'',
            page:1,
            rows:10
          }
          if(tab.name==='first'){
            data.filter_I_isAudit=0
          }else{
            data.filter_I_isAudit=1
          }
      this.CouponListActions(data)
    },
    linkTo(index,row){
          this.showOrClose=!this.showOrClose
          this.ids=row.id
    },
    handleDelete(index,row){
          this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteCouponActions(row.id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
    },
   /* handleSizeChange(val) {
          this.value=val
           let data={
             page:this.currentPage4,
             rows:val,
             filter_I_isAudit:0,
           }
          this.changeData(data,this.msg)
    },
    handleCurrentChange(val) {
          this.currentPage4=val
          let data={
            page:val,
            rows:this.value,
            filter_I_isAudit:0,
          }
          this.changeData(data,this.msg)
    },*/
     handleSizeChangeTWO(val) {
     // console.log(this.msg)
              this.value1=val
             let data={
               page:this.currentPage5,
               rows:val,
             }
          this.changeData(data,this.msg)
    },
    handleCurrentChangeTWO(val) {
          this.currentPage5=val
          let data={
            page:val,
            rows:this.value1,
            filter_I_isAudit:1,
          }
          this.changeData(data,this.msg)
    },
    toggleSelection(rows) {
      console.log(rows)
          let str=[]
      rows.forEach((val,index) => {
        str.push(val.id)
      })
      let data={
        ids:str.join(','),
        limitLevel:[1,2,3].join(','),
        expireNotifyDay:[1,3].join(',')
      }
          if(this.multipleSelection.length>0){
            this.$confirm('是否确认批量审核通过？', '提示', {
              confirmButtonText: '确认通过',
              cancelButtonText: '取消操作',
              type: 'warning'
            }).then(() => {
              this.doAuditCouponActions(data)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
          }else{
            this.$message({
              message:'请先选择优惠券',
              type:'warning'
            })
          }
    },
    handleSelectionChange(val) {
          this.multipleSelection = val;
    },
    handleTwo(item,row){
      let obj={
        togetherProductIds:row.togetherProductIds,
        productType:row.productType,
        productIds:row.productId,
        productName:row.productName
      }
      this.$store.commit('Coupon_With_Goods',obj)
      this.YHQonlyActions(item)
    },
    closed(){
          this.showOrClose=!this.showOrClose
    },
    UpGo(){
          let data={
            ids:this.ids,
            limitLevel:this.updataTwo.join(','),
            expireNotifyDay:this.updataThree.join(',')
          }
          if(this.updataThree.length>0 && this.updataTwo.length>0){
            this.doAuditCouponActions(data)
            this.showOrClose=!this.showOrClose
            this.updataThree=[]
            this.updataTwo=[]
          }else{
            this.$message({
              message:'待选项不可空缺',
              type:'warning'
            })
          }
    },
    changeData(data,msg){
      if(this.activeName2==='first'){
        data.filter_I_isAudit=0
      }else{
        data.filter_I_isAudit=1
      }
            console.log(msg)
            if(msg.input || msg.value || msg.filter_I_isPublic!==''){
              data.chose='chose'
            }
            if(msg.input){
              data.filter_S_title=msg.input
            }
            if(msg.value.length>0){
              data.limitLevels=msg.value.join(',')
            }
            if(msg.filter_I_isPublic!==''){
              data.filter_I_isPublic=msg.filter_I_isPublic
            }
            this.CouponListActions(data)
    }
  }
}
</script>

<style scoped>
   #smalltitle .el-button--mini,#smalltitle .el-button--mini.is-round{
    margin:0;
    padding:5px;
    font-size: 12px;
  }
  .block{
    text-align: right;
    margin-top: 20px;
    margin-right:40px;
  }
  #smalltitle{
    margin-top: 20px;
  }
   .el-table th>div.cell,.el-table .cell,.el-table{
     font-size: 12px;
   }
   .demo{
     width: 400px;
     height: 220px;
     background: #F0FAFF;
     margin-left: -100px;
     margin-top: -220px;
     border-radius: 5px;
     border: 1px solid #90CCE8;
     box-shadow: 0 0 10px rgba(0,0,0,0.2);
     overflow: hidden;
     color: #333333;
     position: fixed;
     left:46%;
     top:60%;
     z-index: 999;
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
     padding: 20px 12.5px;
     width: calc(100% - 25px);
   }
   .tep .el-checkbox-group{
     display: inline-block;
   }
   .el-checkbox+.el-checkbox{
     margin-left: 10px;
   }
  .popover-main p > label{
     width:80px;
     display: inline-block;
     text-align: right;
     margin-right: 15px;
   }
   .popover-main p{
     margin-bottom:30px;
   }
   .slide-fade-enter-active {
     transition: all .3s ease;
   }
   .slide-fade-leave-active {
     transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }
   .slide-fade-enter, .slide-fade-leave-to
     /* .slide-fade-leave-active for below version 2.1.8 */ {
     transform: translateX(10px);
     opacity: 0;
   }
</style>
