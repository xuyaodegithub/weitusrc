<template>
  <div id="smalltitle">
    <!--<el-button  type="danger" icon="el-icon-delete" round @click="toggleSelection(multipleSelection)" size="mini" style="width: 100px;float: right;margin-right: 180px;margin-top: -28px">批量删除</el-button>-->
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="applySupervisorList.rows"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="{'height':'50px','padding':'6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}"
        @selection-change="handleSelectionChange">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which=='logo'">
              <img :src="scope.row[item.which]" alt="" style="width: 78px;height: 78px;">
            </span>
            <span v-else-if="item.which==='status' && scope.row[item.which]===0" style="margin-left: 10px">待审核</span>
            <span v-else-if="item.which==='status' && scope.row[item.which]===1" style="margin-left: 10px">已审核</span>
            <span v-else-if="item.which==='status' && scope.row[item.which]===2" style="margin-left: 10px">已拒绝</span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button
               size="mini"
               type="primary"
               icon="el-icon-edit"
               @click="upData(scope.row)" plain>修改</el-button>
             <el-button
               size="mini"
               type="danger"
               icon="el-icon-delete"
               @click="deleteProduct(scope.row.id)" plain>删除</el-button>
           </template>
         </el-table-column>-->
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage5"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="applySupervisorList.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg'],
    name: 'bossList',
    data () {
      return {
        value1: 10,
        currentPage5: 1,
        multipleSelection: [],
        itemDetial: {
          title: 'newGift',
          type: 'updata',
          item: {}
        },
        dataList: [
          {
            name: '账号', width: '300', which: 'accountNo'
          }, {
            name: '昵称', width: '400', which: 'nickName'
          }, {
            name: '图像', width: '200', which: 'logo'
          }, {
            name: '申请时间', width: '200', which: 'createTime'
          }, {
            name: '上级总监', width: '200', which: 'inviteMemberName'
          }/*,{
            name:'价格', width:'200', which:'price'
          }*/, {
            name: '审核状态', width: '200', which: 'status'
          }
        ],
      }
    },
    watch: {

      /* msg: {
         handler (curVal, oldVal) {
           this.currentPage5=1
           this.value1=10
         },
         deep: true
       }*/
    },
    computed: {
      ...mapGetters([
        'loading', 'applySupervisorList'
      ])
    },
    activated () {

    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert', 'applySupervisorListActions'
      ]),
      seachGoodsList () {

      },
      handleSizeChange (val) {
//        console.log(`每页 ${val} 条`);
        this.msg.rows = val
        this.applySupervisorListActions(this.msg)
      },
      handleCurrentChange (val) {
//        console.log(`当前页: ${val}`);
        this.msg.page = val
        this.applySupervisorListActions(this.msg)

      },
      deleteProduct (id) {
        this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      upData (data) {

      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },

    }
  }
</script>

<style scoped>
  #smalltitle .el-button--mini, #smalltitle .el-button--mini.is-round {
    margin: 0;
    font-size: 12px;
  }

  .block {
    text-align: right;
    margin-top: 20px;
    margin-right: 40px;
  }

  .el-table th > div.cell, .el-table .cell, .el-table {
    font-size: 12px;
  }

</style>
