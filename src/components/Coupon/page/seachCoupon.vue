<template>
  <div id="smalltitle">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <div class="seach-list">
            <el-button type="primary" plain @click="toggleSelection(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 50px">批量审核</el-button>
          <el-table
            v-loading="loading"
            :data="CouponListResult.noGo"
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
              :total="CouponListResult.noGo.length">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="second">
        <div>
          <el-table
            v-loading="loading"
            :data="CouponListResult.okGo"
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
                <span style="margin-left: 10px" v-else>{{ scope.row[item.which] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleTwo(scope.$index, scope.row)" plain>修改</el-button>
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
              :total="CouponListResult.okGo.length">
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
  name: 'YHQList',
  data () {
    return {
      timer:'',
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
          name:'券总数量', width:'80', which:'num'
        },{
          name:'限领数量', width:'80', which:'limitReceived'
        },{
          name:'状态', width:'80', which:'isAudit'
        },{
          name:'供应商', width:'100', which:'creatorType'
        },{
          name:'创建时间', width:'110', which:'ct'
        }
      ],
       dataListTwo:[
        {
          name:'券标题', width:'100', which:'title'
        },{
          name:'有效期', width:'130', which:'Time'
        },{
          name:'产品', width:'110', which:'productName'
        },{
          name:'券总数量', width:'70', which:'num'
        },{
          name:'已领数量', width:'70', which:'receivedNum'
        },{
          name:'已使用', width:'70', which:'useNum'
        },{
          name:'限领数量', width:'70', which:'limitReceived'
        },{
          name:'状态', width:'80', which:'isAudit'
        },{
          name:'供应商', width:'80', which:'creatorType'
        },{
          name:'创建时间', width:'110', which:'ct'
        },{
          name:'审核时间', width:'80', which:'auditTime'
        }
      ]
    }
  },
  computed:{
    ...mapGetters([
      'loading','CouponListResult'
    ])
  },
  activated(){

  },
  mounted(){
    let data={
      page:1,
      rows:10
    }
this.CouponListActions(data)
  },
  methods: {
    ...mapActions([
   'popoverAlert','YHQonlyActions','CouponListActions','deleteCouponActions','doAuditCouponActions'
    ]),
    handleClick(tab, event) {
      console.log(tab, event);
    },
    linkTo(index,row){
      this.$confirm('是否确认审核通过？', '提示', {
        confirmButtonText: '确认通过',
        cancelButtonText: '取消操作',
        type: 'warning'
      }).then(() => {
        let str=row.id.toString()
        this.doAuditCouponActions(str)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    bianji(index,row){
      this.popoverAlert('VwithYHQ')
    },
    Updata(index,row){
this.YHQonlyActions('VupDataCoupon')
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
    handleSizeChange(val) {
      this.value=val
     let data={
       page:this.currentPage4,
       rows:val
     }
     this.CouponListActions(data)
    },
    handleCurrentChange(val) {
      this.currentPage4=val
      let data={
        page:val,
        rows:this.value
      }
      this.CouponListActions(data)
    },
     handleSizeChangeTWO(val) {
      this.value1=val
     let data={
       page:this.currentPage5,
       rows:val
     }
       this.CouponListActions(data)
    },
    handleCurrentChangeTWO(val) {
      this.currentPage5=val
      let data={
        page:val,
        rows:this.value1
      }
      this.CouponListActions(data)
    },
    toggleSelection(rows) {
      let str=''
      rows.forEach(function(val,index){
        if(str.length>0){
          str = str + ',' + val.id
        }else{
          str = str + val.id
        }
      })
      if(this.multipleSelection.length>0){
        this.$confirm('是否确认批量审核通过？', '提示', {
          confirmButtonText: '确认通过',
          cancelButtonText: '取消操作',
          type: 'warning'
        }).then(() => {
          this.doAuditCouponActions(str)
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
    handleTwo(index,rows){
      this.YHQonlyActions({title:'VupDataCoupon',item:rows})
      this.$store.commit('Coupon_With_Goods',rows.productId)
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
