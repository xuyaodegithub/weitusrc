<template>
  <div class="seach-list" id="SaleNewone">
    <!--<label>会员账号:</label>-->
    <!--<el-input v-model="isName" placeholder="请输入" size="mini"></el-input>-->
    <!--<el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"-->
               <!--@click="seachGoodsList()">筛选-->
    <!--</el-button>-->
    <el-table
      v-loading="loading"
      :data="findMsgResult.result.rows"
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="light"
      :cell-style="{'height': '50px','padding': '6px 0'}"
      :header-cell-style="{'color':'#000000','fontWeight':'600'}">
       <!--<el-table-column-->
         <!--type="selection"-->
         <!--width="30">-->
       <!--</el-table-column>-->
      <el-table-column
        v-for="(item,index) in dataList"
        :label="item.title"
        :key="index"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="item.which==='logo'"><img :src="scope.row[item.which]" alt="" style="width: 76px;height: 76px;display: block;"></span>
          <span v-else-if="item.which==='status'">{{scope.row[item.which]===0 ? '未禁用' : '已禁用'}}</span>
          <span v-else>{{scope.row[item.which]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="450">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-sort"
            @click="changeStatus(scope.row)" plain>更改禁用状态
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteA(scope.row)" plain>删除
          </el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-zoom-in"
            @click="toList(scope.row)" plain>查看文章
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage5"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="findMsgResult.result.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    name: 'seachNumber',
    data () {
      return {
        isName:'',
        currentPage5:1,
        rows:10,
        dataList: [
          {title: '账号昵称', width: '120', which: 'name'},
          {title: '头像', width: '120', which: 'logo'},
//          {title: '姓名', width: '230', which: 'desc'},
          {title: '发现数量', width: '90', which: 'totalFindCount'},
          {title:'是否禁用',width:'100',which:'status'},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'loading','findMsgResult','findMsgListResult'
      ]),

    },
    watch: {
//      PproductgetByIdResult: {
//        handler (newVal, oldVal) {
//          let that = this
//          console.log(newVal.title + ',' + oldVal.title)
//          if (newVal.title == oldVal.title) {
//            that.priceListUpdata = []
//            that.activeUpdata = []
//            newVal.item.forEach((val, index) => {
//              that.priceListUpdata.push(val.commission)
//              that.activeUpdata.push(val.salePriceView)
//            })
//            //console.log(this.priceListUpdata)
//          }
//        },
//        deep: true
      //     },
    },
    mounted () {
//      this.getSeachList()
    },
    methods: {
      ...mapActions([
        'popoverAlert','findAccountActions','findAccountSaveActions','findMsgListActions','huiyuandeleteActions'
      ]),
      handleSizeChange (val) {
//        console.log(`每页 ${val} 条`)
        this.rows=val
        this.getSeachList()
      },
      deleteA(val){
        this.$confirm('确定要删除该条文章么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            id:val.id
          }
          this.huiyuandeleteActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCurrentChange (val) {
//        console.log(`当前页: ${val}`)
        this.currentPage5=val
        this.getSeachList()
      },
      changeStatus(item){
          let data={
            id:item.id,
            status:item.status===0 ? 1 : 0
          }
        this.findAccountSaveActions(data)
      },
      getSeachList(){
        let data={
          page:this.currentPage5,
          rows:this.rows,
          filter_I_type:2
        }
        this.findAccountActions(data)
      },
      toList(item){
        let data={
          filter_L_accountId:item.id,
          page:1,
          rows:10
        }
        this.findMsgListActions(data)
        this.popoverAlert('vOwnFind')
      },
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
   .listbtn .el-button--mini, .el-button--mini.is-round {
      padding: 4px 5px;
    }
  }
  .block{
    padding:30px;
    text-align: center;
    /*margin-left: 500px;*/
  }
</style>
