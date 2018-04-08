<template>
  <div id="smalltitle">
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="CouponActiveListResult.rows"
        style="width: 100%">
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :width="item.width"
          :key="index">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which==='ct'">{{ scope.row[item.which] | changeTime}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='isEnable'">{{ scope.row[item.which]==0 ? '未启用':'已启用'}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='isPublic'">{{ scope.row[item.which]==0 ? '不公开':'公开'}}</span>
            <span style="margin-left: 10px" v-else>{{ scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-message"
              @click="linkTo(scope.$index, scope.row)" plain>链接</el-button>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-star-off"
              @click="watchOld(scope.$index, scope.row)" plain>查看已关联</el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-star-off"
              @click="bianji(scope.$index, scope.row)" plain>关联优惠券</el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="Updata(scope.$index, scope.row)" plain>编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
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
        :total="CouponActiveListResult.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
    props:['msg'],
  name: 'YHQActiveList',
  data () {
    return {
      input:'',
      currentPage4:1,
      value:10,
      dataList:[
        {
          name:'活动名称',
          width:'150',
          which:'name'
        },{
          name:'添加时间',
          width:'200',
          which:'ct'
        },{
          name:'关联优惠券张数',
          width:'130',
          which:'couponCount'
        },{
          name:'是否启用',
          width:'130',
          which:'isEnable'
        },
      {
          name:'公开状态',
          width:'110',
          which:'isPublic'
        },
      ]
    }
  },
  computed:{
    ...mapGetters([
      'loading','CouponActiveListResult'
    ])
  },
  mounted(){
    let data={
      page:1,
      rows:10
    }
this.CouponActiveListActions(data)
  },
  methods: {
    ...mapActions([
   'popoverAlert','YHQwhichActions','CouponActiveListActions','deleteCouponActiveActions'
    ]),
    linkTo(index,row){
      this.$store.commit('activeIdchange','http://ol-site.olquan.com/weixin/auth?view=http://ol-h5-preview.olquan.cn/coupon/getcoupon/id/'+row.id)
      this.popoverAlert('VactiveDress')
    },
    bianji(index,row){
      this.popoverAlert(['VwithYHQ','second'])
      this.YHQwhichActions({title:'VseachCouponActive',item:row})
    },
    Updata(index,row){
this.YHQwhichActions({title:'VupDataCouponActive',item:row})
    },
    handleDelete(index,row){
      this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCouponActiveActions(row.id)
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
       if(this.msg.title){
        data.filter_S_name=this.msg.title
       }
      if(this.msg.status==0 || this.msg.status==1){
        data.filter_I_isPublic=this.msg.status
       }
      this.CouponActiveListActions(data)
    },
    handleCurrentChange(val) {
      this.currentPage4=val
      let data={
        page:val,
        rows:this.value
      }
      if(this.msg.title){
        data.filter_S_name=this.msg.title
      }
      if(this.msg.status==0 || this.msg.status==1){
        data.filter_I_isPublic=this.msg.status
      }
      this.CouponActiveListActions(data)
    },
    watchOld(index,row){
      this.popoverAlert(['VwithYHQ','first'])
      this.YHQwhichActions({title:'VseachCouponActive',item:row})
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
