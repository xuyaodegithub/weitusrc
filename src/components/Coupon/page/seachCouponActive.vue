<template>
  <div id="smalltitle">
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="listData"
        style="width: 100%">
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
              @click="linkTo(scope.$index, scope.row)" plain>链接</el-button>
             <el-button
               type="primary"
               plain
              size="mini"
              @click="lookOut(scope.$index, scope.row)" plain>预览</el-button>
            <el-button
              size="mini"
              type="success"
              @click="bianji(scope.$index, scope.row)" plain>关联优惠券</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="Updata(scope.$index, scope.row)" plain>编辑</el-button>
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
        :total="listData.length">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'YHQActiveList',
  data () {
    return {
      input:'',
      currentPage4:1,
      value:10,
      dataList:[
        {
          name:'活动名称',
          width:'180',
          which:'name'
        },{
          name:'分享标题',
          width:'100',
          which:'timer'
        },{
          name:'领取等级',
          width:'100',
          which:'Grade'
        },{
          name:'关联产品',
          width:'150',
          which:'data'
        },{
          name:'关联优惠券张数',
          width:'120',
          which:'allnum'
        },{
          name:'是否启用',
          width:'100',
          which:'status'
        },
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
   'popoverAlert','YHQwhichActions'
    ]),
    linkTo(index,row){

    },
    bianji(index,row){
      this.popoverAlert('VwithYHQ')
    },
    Updata(index,row){
this.YHQwhichActions('VupDataCouponActive')
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
    lookOut(){

    }
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
