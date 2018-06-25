<template>
  <div id="smalltitle">
    <div class="seach-list">
      <el-button type="danger" icon="el-icon-delete" plain @click="toggleSelection(multipleSelection)" size="small"
                 style="width: 100px;float: right;margin-right: 40px">批量删除
      </el-button>
      <el-button type="warning" icon="el-icon-sort" plain @click="ToAdoblemore(multipleSelection,1)" size="small"
                 style="width: 100px;float: right;margin-right: 40px">批量上架
      </el-button>
      <el-button type="warning" icon="el-icon-sort" plain @click="ToAdoblemore(multipleSelection,2)" size="small"
                 style="width: 100px;float: right;margin-right: 40px">批量下架
      </el-button>
      <el-table
        v-loading="loading"
        :data="plusProductListResult.rows"
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
          :show-overflow-tooltip="item.which!='sort' && item.which!='isStick'">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which==='price'"><el-button plain size="mini"
                                                                                   @click="wactch(scope.$index,scope.row)">查看</el-button></span>
            <span style="margin-left: 10px"
                  v-else-if="item.which==='isRecommend'">{{scope.row[item.which] == '0' ? '否' : '是'}}</span>
            <span style="margin-left: 10px"
                  v-else-if="item.which==='status'">{{scope.row[item.which] == '1' ? '上架' : '下架'}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='sort'">
                  <el-input placeholder="请输入佣金" :value="scope.row.sort" size="mini" style="width: 90%;"
                            @blur="changeSort($event,scope.row)" @change="changeValue"></el-input>
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='isStick'">
                 <el-button plain size="mini"
                            @click="ToSetUp(scope.$index,scope.row)">{{scope.row[item.which] == 0 ? '置顶' : '取消置顶'}}</el-button>
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='indexImage'"><img :src="scope.row[item.which]"
                                                                                       alt=""
                                                                                       style="height: 72px;width: 72px;"></span>
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
              @click="ToSetUpData(scope.row)" plain>更改状态</el-button>
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
        :total="plusProductListResult.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg'],
    name: 'seachSaleGoods',
    data () {
      return {
        showOrClose: false,
        currentPage5: 1,
        value1: 10,
        MsgSort: false,
        multipleSelection: [],
        dataList: [
          {
            name: '产品名称', width: '190', which: 'productName'
          }, {
            name: '产品大图', width: '90', which: 'indexImage'
          }, {
            name: '价格', width: '90', which: 'price'
          }, {
            name: '排序', width: '90', which: 'sort'
          }, /*{
            name: '是否推荐', width: '90', which: 'isRecommend'
          },*/ {
            name: '置顶', width: '90', which: 'isStick'
          }, {
            name: '状态', width: '90', which: 'status'
          }, {
            name: '特卖时间', width: '120', which: 'startDate'
          }
        ],
        Liststyle: {
          height: '50px',
          padding: '6px 0'
        }
      }
    },
    watch: {

      msg: {
        handler (curVal, oldVal) {
          this.currentPage5 = 1
          this.value1 = 10
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters([
        'loading', 'plusProductListResult'
      ])
    },
    mounted () {
      let obj = {
        filter_S_productName: this.input,
        //filter_I_isRecommend:this.upGoods,//推荐首页
        filter_S_productName_contains: this.input,
        sortField: 'sort',
        page: 1,
        rows: 10,
        sortOrder: 'asc'
      }
      this.plusProductListActions(obj)
    },
    activated () {

    },
    methods: {
      ...mapActions([
        'popoverAlert', 'plusProductListActions', 'deleteProductSave', 'plusProductSaveActions', 'batchdeleteProductSave', 'ProductDoStickActions', 'plusDoAuditActions'
      ]),
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.msg.rows = val
        this.plusProductListActions(this.msg)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.msg.page = val
        this.plusProductListActions(this.msg)
      },
      wactch (key, row) {
        this.popoverAlert(['WatchPrice', row])
      },
      deleteProduct (id) {
        this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: id
          }
          this.deleteProductSave(data)
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
        this.$emit('to-change', 'NewSaleGoods')
        this.$store.commit('UPDATA_SALEGOODS', data)
      },
      changeSort (e, row) {
        //console.log(e.target.value,row.id)
        let data = {
          id: row.id,
          sort: e.target.value,
          startDate: row.startDate,
          isStick:row.isStick,
          plusDate:row.plusDate
//        desc:row.desc,//描述
//        image:row.image,//产品主图链接
//        indexImage:row.indexImage,//大图
//        isRecommend:row.isRecommend,//是否推荐
//        productId:row.productId,//产品库产品id
//        productName:row.productName,//产品名称
//        sort:row.sort,//排序
//        startDate:row.startDate,//如:2018-04-12
//        trip:row.trip,//产品标签
//        status:row.status
        }
//      data.marketPrice=row.marketPrice
//      data.price=row.price
//      data.id=row.id
//      if(this.PproductgetByIdResult.item.length>0){
//        data.plusProductNormalIds=this.changePriceApp(this.PproductgetByIdResult.item,2)
//        // let oInput=document.getElementsByClassName('GetPrice')
////         data.commissiones=this.changePriceApp(Array.prototype.slice.call(oInArr),5)
//        data.commissiones=this.priceListUpdata.join(',')
//        data.appPrices=this.changePriceApp(this.PproductgetByIdResult.item,1)
//        data.normalIds=this.changePriceApp(this.PproductgetByIdResult.item,7)
//        data.salePrices=this.changePriceApp(this.PproductgetByIdResult.item,3)
//        data.costPrices=this.changePriceApp(this.PproductgetByIdResult.item,4)
//        data.normalStrs=this.changePriceApp(this.PproductgetByIdResult.item,6)
//      }else{
//        data.commission=this.form.namePrice
//      }
        if (this.MsgSort) {
          this.plusProductSaveActions(data)
//          this.$message({
//            message:'操作成功',
//            type:'success'
//          })
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
          this.$confirm('确定要删除这些产品么？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let obj = {
              ids: str.join(',')
            }
            this.batchdeleteProductSave(obj)
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
      watchShare (row) {
        this.$store.commit('activeIdchange', 'https://ol-site.olquan.cn/weixin/auth?view=http://ol-h5-preview.olquan.cn/demo/iscroll/id/' + row.id + '?isShare=1')
        this.popoverAlert('VactiveDress')
      },
      ToSetUp (index, row) {
        let data = {
          id: row.id
        }
        this.ProductDoStickActions(data)
      },
      ToAdoblemore (data, key) {
        if (data.length > 0) {
          let str = []
          data.forEach((val, index) => {
            str.push(val.id)
          })
          let obj = {
            ids: str.toString()
          }
          if (key == 1) {
            obj.status = 1
          } else {
            obj.status = 2
          }
          this.$confirm('确定要批量修改这些产品上下架状态么？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.plusDoAuditActions(obj)
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
      ToSetUpData(value){
        let data={
          ids:[value.id].toString(),
          status:2
        }
        if(value.status==1){
          this.plusDoAuditActions(data)
        }else{
          data.status=1
          this.plusDoAuditActions(data)
        }
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
