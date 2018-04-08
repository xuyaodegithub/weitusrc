<template>
  <div id="smalltitle">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <div class="seach-list">
          <!--<el-button type="primary" plain @click="toggleSelection(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 50px">批量审核</el-button>-->
          <el-table
            v-loading="loading"
            :data="StoreYHQListResult.rows"
            style="width: 100%"
            ref="multipleTable"
            tooltip-effect="light">
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
                  @click="firstUpdata({title:'VupDataStoreCoupon',item:scope.row,trueOrfalse:false},scope.row)" plain>修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)" plain>删除</el-button>
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
              :total="StoreYHQListResult.total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="second">
        <div>
          <el-table
            v-loading="loading"
            :data="StoreYHQListResult.rows"
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
                  type="primary"
                  @click="firstUpdata({title:'VupDataStoreCoupon',item:scope.row,trueOrfalse:true},scope.row)" plain>修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChangeTWO"
              @current-change="handleCurrentChangeTWO"
              :current-page="currentPage5"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="value1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="StoreYHQListResult.total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

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
        sessionId:4,
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
            name:'有效期', width:'140', which:'Time'
          },{
            name:'券价值', width:'80', which:'price'
          },{
            name:'产品', width:'140', which:'productName'
          },{
            name:'券总数量', width:'90', which:'num'
          },{
            name:'限领数量', width:'80', which:'limitReceived'
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
            name:'券标题', width:'90', which:'title'
          },{
            name:'有效期', width:'120', which:'Time'
          },{
            name:'产品', width:'130', which:'productName'
          },{
            name:'券价值', width:'60', which:'price'
          },{
            name:'券总数量', width:'70', which:'num'
          },/*{
            name:'已领数量', width:'70', which:'receivedNum'
          },{
            name:'已使用', width:'60', which:'useNum'
          },*/{
            name:'限领数量', width:'70', which:'limitReceived'
          },{
            name:'状态', width:'70', which:'isAudit'
          },{
            name:'公开状态', width:'70', which:'isPublic'
          },{
            name:'供应商', width:'80', which:'creatorType'
          },{
            name:'创建时间', width:'130', which:'ct'
          },{
            name:'审核时间', width:'130', which:'auditTime'
          }
        ]
      }
    },
    watch:{
//      seachWhicheResult(curVal,oldVal){
//        if(curVal===1){
//          this.activeName2='first'
//        }else{
//          this.activeName2='second'
//        }
//      }
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
        'loading','StoreYHQListResult','seachWhicheResult','sellIDResult'
      ])
    },
    activated(){

    },
    mounted(){
          let data={
            filter_I_isAudit:0,
            page:1,
            rows:10,
            sellerId:this.sellIDResult
          }
          this.StoreYHQListActions(data)
        //  this.$store.commit('SEACHWHICHE',1)
         // console.log(this.CouponListResult.noGo)
    },
    methods: {
      ...mapActions([
        'popoverAlert','StoreYHQAction','StoreYHQListActions','StoreDeleteYHQActions'
      ]),
      handleClick(tab, event) {
             // console.log(tab, event);
//              if(tab.name==='first'){
//                this.$store.commit('SEACHWHICHE',1)
//              }else{
//                this.$store.commit('SEACHWHICHE',2)
//              }
        this.$emit('to-parse',this.activeName2)
              let data={
                filter_I_isAudit:'',
                page:1,
                rows:10,
                sellerId:this.sellIDResult
              }
              if(tab.name==='first'){
                data.filter_I_isAudit=0
                this.StoreYHQListActions(data)
              }else{
                data.filter_I_isAudit=1
                this.StoreYHQListActions(data)
              }
      },
      handleDelete(index,row){
            this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let data={
                id:row.id,
                sellerId:this.sellIDResult
              }
              this.StoreDeleteYHQActions(data)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
      },
      handleSizeChange(val) {
            this.value=val
            let data={
              page:this.currentPage4,
              rows:val,
              sellerId:this.sellIDResult,
              filter_I_isAudit:0
            }
            this.changeData(data,this.msg)
      },
      handleCurrentChange(val) {
            this.currentPage4=val
            let data={
              page:val,
              rows:this.value,
              sellerId:this.sellIDResult,
              filter_I_isAudit:0
            }
            this.changeData(data,this.msg)
      },
      handleSizeChangeTWO(val) {
            this.value1=val
            let data={
              page:this.currentPage5,
              rows:val,
              sellerId:this.sellIDResult,
              filter_I_isAudit:1
            }
            this.changeData(data,this.msg)
      },
      handleCurrentChangeTWO(val) {
            this.currentPage5=val
            let data={
              page:val,
              rows:this.value1,
              sellerId:this.sellIDResult,
              filter_I_isAudit:1
            }
            this.changeData(data,this.msg)
      },
      firstUpdata(item,row){
            let obj={
              togetherProductIds:row.togetherProductIds,
              productType:row.productType,
              productIds:row.productId,
              productName:row.productName
            }
            this.$store.commit('Coupon_With_Goods',obj)
        this.StoreYHQAction(item)
      },
      changeData(data,msg){
            if(msg.input){
              data.filter_S_title=msg.input
            }
           if(msg.filter_I_isPublic===1 || msg.filter_I_isPublic===0){
              data.filter_I_isPublic=msg.filter_I_isPublic
            }
           /* if(msg.value.length>0 && data.filter_I_isAudit==1){
              data.limitLevels=msg.value.join(',')
            }*/
            this.StoreYHQListActions(data)
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
</style>
