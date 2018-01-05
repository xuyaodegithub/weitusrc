<template>
  <div id="smalltitle">
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="listActiveResult.result"
        style="width: 100%">
        <el-table-column
          label="活动名称"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px;">{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.start=='0'">未开启</span>
            <span style="margin-left: 10px" v-if="scope.row.start=='1'">已开启</span>
            <!--<img src="http://www.quanjing.com/image/2017index/jj2.png" alt="">-->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="linkTo(scope.$index, scope.row)" plain>链接</el-button>
            <el-button
              size="mini"
              type="success"
              @click="bianji(scope.$index, scope.row)" plain>编辑</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="Updata(scope.$index, scope.row)" plain>编辑活动数据</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listActiveResult.count">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'huodong',
  data () {
    return {
      input:'',
      currentPage4:1,
      value:10,
    }
  },
  computed:{
    ...mapGetters([
      'loading','listActiveResult'
    ])
  },
  mounted(){
    let data={
      page:1,
      rows:10
    }
    this.listActiveActions(data)
  },
  methods: {
    ...mapActions([
      'activeActions','deleteActiveActions','listActiveActions','getByIdActiveActions','OssListActions','clearAllActions'
    ]),
    linkTo(index,row){

    },
    bianji(index,row){
      let data={
        obj:row,
        item:'vUpdataActive'
      }
      this.activeActions(data)
    },
    Updata(index,row){
      console.log(row)
      let data={
        obj:row,
        item:'vBianji'
      }
      if(row.ossDataId){
        this.clearAllActions()
        this.OssListActions(row.ossDataId)
      }else{
        this.clearAllActions()
      }
      this.activeActions(data)
    },
    handleDelete(index,row){
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:row.id,
          item:{
            page:this.currentPage4,
            rows:this.value
          }
        }
        this.deleteActiveActions(data)
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
      this.listActiveActions(data)
    },
    handleCurrentChange(val) {
      this.currentPage4=val
      let data={
        page:val,
        rows:this.value
      }
      this.listActiveActions(data)
    },
  }
}
</script>

<style scoped>
  .seach-list .el-button--mini,.seach-list .el-button--mini.is-round{
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
</style>
