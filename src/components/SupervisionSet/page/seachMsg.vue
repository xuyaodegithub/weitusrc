<template>
  <div class="seach-list" id="SaleNewone">
    <el-button type="success" round size="mini" icon="el-icon-plus"
               style="margin-top: -17px;float: right;margin-right: 50px;" @click="putMsg()">新增发布
    </el-button>
    <el-table
      v-loading="loading"
      :data="findMsgListResult.result.rows"
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="light"
      :cell-style="{'height': '50px','padding': '6px 0'}"
      :header-cell-style="{'color':'#000000','fontWeight':'600'}">
      <!-- <el-table-column
         type="selection"
         width="30">
       </el-table-column>-->
      <el-table-column
        v-for="(item,index) in dataList"
        :label="item.title"
        :key="index"
        :width="item.width"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <!--<span style="margin-left: 10px" v-if="item.which==='isHeader'">-->
          <!--<img :src="scope.row[item.which]" alt="" style="height: 78px;width: 78px;">-->
          <!--</span>-->
          <span v-if="item.which==='isStick'">
            <!--{{scope.row[item.which] === 0 ? '已禁用' : '未禁用'}}-->
            <el-button type="info" plain size="mini" v-if="!scope.row[item.which]" @click="changeStutas(scope.row,1)">置顶</el-button>
            <el-button type="info" plain size="mini" v-else @click="changeStutas(scope.row,2)">取消置顶</el-button>
          </span>
          <!--<span v-else-if="item.which==='isNum'">-->
          <!--<el-button type="info" plain size="mini">查看文章</el-button>-->
          <!--</span>-->
          <span v-else>{{scope.row[item.which]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="updata(scope.row)" plain>编辑
          </el-button>
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="warning"-->
          <!--icon="el-icon-sort"-->
          <!--@click="watchShare(scope.row)" plain>更改禁用状态-->
          <!--</el-button>-->
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteNumber(scope.row)" plain>删除
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
        :total="findMsgListResult.result.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg','msgData'],
    name: 'seachMsg',
    data () {
      return {
        currentPage5: 1,
        rows: 10,
        dataList: [
          {title: '标题', width: '200', which: 'title'},
          {title: '发布帐号', width: '250', which: 'accountName'},
          {title: '关联产品', width: '260', which: 'productName'},
          {title: '置顶', width: '120', which: 'isStick'},
//          {title: '是否禁用', width: '120', which: 'isStutas'},
//          {title:'账号昵称',width:'100',which:'isN'},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'loading','findMsgListResult'
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
    activated () {

      this.getOnlyListMsg()
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert','findMsgListActions','deleteOnlyIdActions','findSaveMsgActions'
      ]),
      handleSizeChange (val) {
//        console.log(`每页 ${val} 条`)
        this.rows=val
        this.getOnlyListMsg()
      },
      handleCurrentChange (val) {
//        console.log(`当前页: ${val}`)
        this.currentPage5=val
        this.getOnlyListMsg()
      },
      updata (item) {
        let data = {
          title:'vNewmsg',
          type:'updata',
          data:item,
          id:this.msgData.id,
          which:2
        }
        this.$emit('to-change',data)
      },
      deleteNumber(item){
        this.$confirm('确定要删除该条文章么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
           id:item.id
          }
          this.deleteOnlyIdActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getOnlyListMsg(){
        let data={
          filter_L_accountId:this.msgData.id,
          page:this.currentPage5,
          rows:this.rows
        }
        this.findMsgListActions(data)
      },
      changeStutas(val,key){
        if(key===1){
          let data={
            id:val.id,
            isStick:1
          }
          this.findSaveMsgActions(data)
        }else{
          let data={
            id:val.id,
            isStick:0
          }
          this.findSaveMsgActions(data)
        }
      },
      putMsg(){
        let data={
          title:'vNewmsg',
          data:this.msgData.item,
          type:'add',
          id:this.msgData.id,
          which:2
        }
        this.$emit('to-change',data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
   .el-table .el-button--mini,.el-table .el-button--mini.is-round {
      padding: 4px 5px;
    }
  }

  .block {
    padding: 30px;
    text-align: center;
    /*margin-left: 500px;*/
  }

</style>
