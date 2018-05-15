<template>
  <div id="smalltitle">
    <!--<el-button  type="danger" icon="el-icon-delete" round @click="toggleSelection(multipleSelection)" size="mini" style="width: 100px;float: right;margin-right: 180px;margin-top: -28px">批量删除</el-button>-->
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="canUpToStarResult"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="Liststyle">
        <!--<el-table-column
          type="selection"
          width="30">
        </el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which=='image'">
              <img :src="scope.row[item.which]" alt="" style="width: 78px;height: 78px;">
            </span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="aDouiat(scope.row)" plain>审核
            </el-button>
          </template>
        </el-table-column>
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
        :total="canUpToStarResult.length">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg'],
    name: 'pinkgiftList',
    data () {
      return {
        value1: 10,
        currentPage5: 1,
        itemDetial: {
          title: 'newGift',
          type: 'updata',
          item: {}
        },
        dataList: [
          {
            name: '昵称', width: '200', which: 'nickName'
          }, {
            name: '会员账号', width: '150', which: 'accountNo'
          }, {
            name: '会员ID', width: '120', which: 'memberId'
          }, {
            name: '高级督导数量', width: '120', which: 'highSupervisorCount'
          }, {
            name: '粉领数量', width: '120', which: 'storeCount'
          }, {
            name: '总收益', width: '140', which: 'supervisorAmount'
          }
        ],
        Liststyle: {
          height: '50px',
          padding: '6px 0'
        }
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
        'loading','canUpToStarResult'
      ])
    },
    mounted () {
      let data={
        page:1,
        rows:10
      }
      this.canUpToStarMemberActions(data)
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'canUpToStarMemberActions','setMemberLevelActions'
      ]),
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.msg.rows = val
        this.freeUseProductListActions(this.msg)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.msg.page = val
        this.freeUseProductListActions(this.msg)
      },
      aDouiat (row) {
        this.$confirm('确定要审核通过该会员么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: row.memberId,
            levelCode:'starSupervisor'
          }
          this.setMemberLevelActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
.el-button--mini{
  padding:5px 8px;
}
</style>
