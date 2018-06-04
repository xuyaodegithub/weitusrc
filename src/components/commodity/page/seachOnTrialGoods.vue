<template>
  <div id="smalltitle">
    <div class="seach-list">
      <el-button type="danger" icon="el-icon-delete" plain @click="toggleSelection(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 40px">批量删除
      </el-button>
      <el-button type="warning" icon="el-icon-sort" plain @click="ToAdoblemore(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 40px">批量上下架
      </el-button>
      <el-table
        v-loading="loading"
        :data="freeUseProductListResult.rows"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="Liststyle"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip="item.which!='sort' && item.which!='isSetTop'">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which==='price'"><el-button plain size="mini" @click="wactch(scope.$index,scope.row)">查看</el-button></span>
            <span style="margin-left: 10px" v-else-if="item.which==='type' && scope.row[item.which]=='1'"> 普通试用</span>
            <span style="margin-left: 10px" v-else-if="item.which==='type' && scope.row[item.which]=='2'"> 新品首发</span>
            <span style="margin-left: 10px" v-else-if="item.which==='type' && scope.row[item.which]=='3'"> 整点抢</span>
            <span style="margin-left: 10px" v-else-if="item.which==='type' && scope.row[item.which]=='4'"> 试海外</span>
            <span style="margin-left: 10px" v-else-if="item.which==='status'">{{scope.row[item.which] == '0' ? '下架' : '上架'}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='isSetTop' && scope.row[item.which]">
              <el-button plain size="mini" @click="ToSetUp(scope.$index,scope.row)">取消置顶</el-button>
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='isSetTop' && !scope.row[item.which]">
              <el-button plain size="mini" @click="ToSetUp(scope.$index,scope.row)">置顶</el-button>
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='sort'">
                  <el-input placeholder="请输入..." :value="scope.row.sort" size="mini" style="width: 90%;" @blur="changeSort($event,scope.row)" @change="changeValue"></el-input>
                </span>
            <span style="margin-left: 10px" v-else-if="item.which==='image'"><img :src="scope.row[item.which]" alt="" style="height: 72px;width: 72px;"></span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-search"
              @click="watchShare(scope.row)" plain>查看分享
            </el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-sort"
              @click="ToupDataStatus([scope.row])" plain>更改状态
            </el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="upData(scope.row)" plain>修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteProduct(scope.row.id)" plain>删除
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
        :total="freeUseProductListResult.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg'],
    name: 'seachOnTrialGoods',
    data () {
      return {
        showOrClose: false,
        currentPage5: 1,
        value1: 10,
        MsgSort: false,
        multipleSelection: [],
        dataList: [
          {
            name: '产品名称', width: '250', which: 'productName'
          }, {
            name: '图片', width: '100', which: 'image'
          }, {
            name: '保证金', width: '80', which: 'price'
          }, {
            name: '排序', width: '80', which: 'sort'
          }, {
            name: '类型', width: '90', which: 'type'
          }, {
            name: '置顶', width: '90', which: 'isSetTop'
          }, {
            name: '状态', width: '90', which: 'status'
          }
        ],
        Liststyle: {
          height: '50px',
          padding: '6px 0'
        }
      }
    },
    watch: {},
    computed: {
      ...mapGetters([
        'loading', 'freeUseProductListResult'
      ])
    },
    mounted () {
      let obj = {
        filter_S_productName: '',
        filter_I_type: '',
        sortField: 'sort',
        page: 1,
        rows: 10,
        sortOrder: 'asc'
      }
      this.freeUseProductListActions(obj)
      this.$store.commit('SET_PAGE_ROWS',obj)
    },
    activated () {

    },
    methods: {
      ...mapActions([
        'popoverAlert', 'freeUseProductListActions', 'productSetSortActions', 'deleteTryGoodsActions', 'productSetToTopActions', 'productDoAudit2Actions'
      ]),
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.msg.rows = val
        this.$store.commit('SET_PAGE_ROWS',this.msg)
        this.freeUseProductListActions(this.msg)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.msg.page = val
        this.$store.commit('SET_PAGE_ROWS',this.msg)
        this.freeUseProductListActions(this.msg)
      },
      wactch (key, row) {
        let data = {
          type: 'updata',
          item: row
        }
        this.$store.commit('UPDATA_SALEGOODS', data)
        this.popoverAlert(['OnTrialwatchPrice', row])
      },
      deleteProduct (id) {
        this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            ids: [id].toString()
          }
          this.deleteTryGoodsActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      upData (item) {
        let data = {
          type: 'updata',
          item: item
        }
        this.$emit('to-change', 'NewOntrial')
        this.$store.commit('UPDATA_SALEGOODS', data)
      },
      changeSort (e, row) {
        //console.log(e.target.value,row.id)
        let data = {
          id: row.id,
          sort: e.target.value,
        }
        if (this.MsgSort) {
          this.productSetSortActions(data)
          this.MsgSort = false
        }
      },
      changeValue (e) {
        this.MsgSort = true
      },
//      focusSort(e){
//        this.MsgSort=e.target.value
//      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      toggleSelection (data) {
        if (data.length > 0) {
          let str = []
          data.forEach((val, index) => {
            str.push(val.id)
          })
          let obj = {
            ids: str.toString()
          }
          this.$confirm('确定要批量删除这些产品么？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteTryGoodsActions(obj)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.$message({
            message: '请选择产品',
            type: 'warning'
          })
        }
      },
      ToSetUp (index, item) {
        let data = {
          id: item.id
        }
        this.productSetToTopActions(data)
      },
      ToAdoblemore (data) {
        if (data.length > 0) {
          let str = []
          data.forEach((val, index) => {
            str.push(val.id)
          })
          let obj = {
            ids: str.toString()
          }
          this.$confirm('确定要批量修改这些产品上下架状态么？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.productDoAudit2Actions(obj)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.$message({
            message: '请选择产品',
            type: 'warning'
          })
        }
      },
      ToupDataStatus (data) {
        let str = []
        data.forEach((val, index) => {
          str.push(val.id)
        })
        this.productDoAudit2Actions({
          ids: str.toString()
        })
      },
      watchShare (row) {
        this.$store.commit('activeIdchange', 'http://ol-site.olquan.cn/weixin/auth?view=http://ol-h5-preview.olquan.cn/demo/iscroll/id/' + row.id + '?isShare=1')
        this.popoverAlert('VactiveDress')
      }
    }
  }
</script>

<style scoped>
  #smalltitle .el-button--mini, #smalltitle .el-button--mini.is-round {
    margin: 0;
    padding: 5px;
    font-size: 12px;
  }

  .block {
    text-align: right;
    margin-top: 20px;
    margin-right: 40px;
  }

  #smalltitle {
    margin-top: 20px;
  }

  .el-table th > div.cell, .el-table .cell, .el-table {
    font-size: 12px;
  }

</style>
