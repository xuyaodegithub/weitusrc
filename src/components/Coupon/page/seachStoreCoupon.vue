<template>
  <div id="smalltitle">
    <div class="seach-list">
      <div style="margin-top: 20px">
        <div style="width: 100px;display: inline-block;line-height: 32px;font-size: 14px;color:red;">待审核:</div>
        <el-button type="primary" plain @click="toggleSelection(listData)" size="small" style="width: 100px;float: right;margin-right: 50px">批量审核</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="listData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :width="item.width"
          :key="index">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="linkTo(scope.$index, scope.row)" plain>修改</el-button>
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
          :total="listData.length">
        </el-pagination>
      </div>
    </div>
    <div>
        <div style="width: 100px;display: inline-block;line-height: 32px;font-size: 14px;margin-top: 10px;color:red;">已审核:</div>
        <el-table
          v-loading="loading"
          :data="listData"
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in dataListTwo"
            :label="item.name"
            :width="item.width"
            :key="index">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.which]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="linkTo(scope.$index, scope.row)" plain>修改</el-button>
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
          :total="listData.length">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'YHQList',
  data () {
    return {
      input:'',
      currentPage4:1,
      currentPage5:1,
      value:10,
      value1:10,
      dataList:[
        {
          name:'券标题', width:'110', which:'name'
        },{
          name:'有效期', width:'80', which:'timer'
        },{
          name:'券价值', width:'80', which:'Grade'
        },{
          name:'产品', width:'140', which:'data'
        },{
          name:'券总数量', width:'80', which:'allnum'
        },{
          name:'已使用', width:'80', which:'status'
        },{
          name:'限领数量', width:'80', which:'status'
        },{
          name:'状态', width:'80', which:'status'
        },{
          name:'供应商', width:'100', which:'status'
        },{
          name:'创建时间', width:'80', which:'status'
        }
      ],
       dataListTwo:[
        {
          name:'券标题', width:'100', which:'name'
        },{
          name:'使用时间', width:'80', which:'timer'
        },{
          name:'有效期', width:'80', which:'Grade'
        },{
          name:'产品', width:'110', which:'data'
        },{
          name:'券总数量', width:'70', which:'allnum'
        },{
          name:'已领数量', width:'70', which:'allnum'
        },{
          name:'已使用', width:'70', which:'status'
        },{
          name:'限领数量', width:'70', which:'status'
        },{
          name:'状态', width:'80', which:'status'
        },{
          name:'供应商', width:'80', which:'status'
        },{
          name:'创建时间', width:'80', which:'status'
        },{
          name:'审核时间', width:'80', which:'status'
        }
      ],
      listData:[{
        name:'年货优惠券',
        timer:'30天',
        data:'dlam',
        allnum:'100',
        status:'待审核',
        Grade:'白领'
      },{
        name:'年货优惠券',
        timer:'30天',
        data:'dlam',
        allnum:'100',
        status:'待审核',
        Grade:'金领'
      },{
        name:'年货优惠券',
        timer:'30天',
        data:'dlam',
        allnum:'100',
        status:'待审核',
        Grade:'粉领'
      },{
        name:'年货优惠券',
        timer:'30天',
        data:'dlam',
        allnum:'100',
        status:'待审核',
        Grade:'粉领'
      }]
    }
  },
  computed:{
    ...mapGetters([
      'loading',
    ])
  },
  mounted(){
    let data={
      page:1,
      rows:10
    }

  },
  methods: {
    ...mapActions([
   'popoverAlert','YHQonlyActions'
    ]),
    linkTo(index,row){
    this.$store.commit('SET_STORE_YHQ','VupDataStoreCoupon')
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
    },
    handleCurrentChange(val) {
      this.currentPage4=val
      let data={
        page:val,
        rows:this.value
      }
    },
     handleSizeChangeTWO(val) {
      this.value1=val
     let data={
       page:this.currentPage5,
       rows:val
     }
    },
    handleCurrentChangeTWO(val) {
      this.currentPage5=val
      let data={
        page:val,
        rows:this.value1
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
