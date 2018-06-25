<template>
  <el-table
    @row-click="addGoodsImg"
    v-loading="loading"
    :height="280"
    :data="freeUseListResult.rows"
    tooltip-effect="light"
    style="width: 100%"
    class="cu">
    <el-table-column
      prop="productName"
      label="商品名称"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="startDate"
      label="开始时间">
    </el-table-column>
    <el-table-column
      prop="endDate"
      label="结束时间">
    </el-table-column>
    <el-table-column
      prop="limitCount"
      label="总库存">
    </el-table-column>
    <el-table-column
      prop="dayLimitCount"
      label="每天库存量">
    </el-table-column>
    <el-table-column
      prop="memberLimitCount"
      label="每人限购数量">
    </el-table-column>
    <el-table-column
      prop="status"
      label="审核状态">
      <template slot-scope="scope">{{scope.row.status ? '已通过' : '待审核'}}</template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
  .demo {
    width: 800px;
    height: 490px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -250px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    color: #333333;
  }

  .popover-head {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }

  .popover-head i {
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }

  .popover-head .title {
    margin-left: 15px;
    font-weight: bold;
  }

  .popover-main {
    padding: 15px 12.5px;
    padding-bottom: 0px;
    width: calc(100% - 25px);
    display: flex;
    flex-wrap: wrap;
    label {
      width: 60px;
      display: inline-block;
      text-align: right;
      margin-right: 10px;
    }
  }

  .popover-main p {
    margin-right: 10px;
  }

  .popover-main .el-input {
    width: 160px;
  }

  .popover-main p {
    margin-bottom: 15px;
  }

  .popover-main .el-checkbox-group {
    display: inline-block;
    width: 85%;
  }

  .el-checkbox + .el-checkbox:last-child {
    margin: 10px 0 0 0;
  }

  .demo > p:last-child {
    text-align: center;
  }

  .el-button {
    width: 100px;
  }

  .el-table th > div.cell, .el-table .cell, .el-table {
    font-size: 12px;
  }

  .el-button--mini, .el-button--mini.is-round {
    padding: 7px;
    font-size: 12px;
  }

  .block {
    text-align: right;
    margin-top: 10px;
  }

  p .el-radio + .el-radio {
    margin-left: 0;
  }

  /* p .el-radio-group{
     width:160px;
   }*/
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    created () {

    },
    computed: {
      ...mapGetters([
        'popoverAlive', 'ImgnumKeyResult', 'addDataNumResult', 'commodityResult', 'getDataListResulr', 'loading', 'productlistResult', 'freeUseListResult', 'scoreBuyListResult'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'getDataListActions', 'productlistActions', 'freeUseListActions', 'scoreBuyListActions'
      ]),
      addGoodsImg (row, event, column) {
        if (this.popoverAlive.SSSnum === 'find') {
          let obj={
            togetherProductIds:'',
            productType:1,
            productIds:row.id,
            marketPriceView:row.marketPriceView,
            price:row.store,
            productName:row.productName,
            costPriceView:row.costPriceView,//成本价
            salePriceView:row.salePriceView,//销售价
            image:row.image//销售价
          }
          this.$store.commit('Coupon_With_Goods',obj)
        } else {
          console.log(row)
          let obj = {}
          obj.type = 2
          obj.productId = row.productId
          obj.indexId = 14
          obj.url = 'https://ol-h5-preview.olquan.cn/try/trygoods/id/' + row.productId
          obj.image = this.commodityResult.contents[this.ImgnumKeyResult].image
          obj.width = this.commodityResult.contents[this.ImgnumKeyResult].width
          obj.height = this.commodityResult.contents[this.ImgnumKeyResult].height
          obj.isTrue = this.commodityResult.contents[this.ImgnumKeyResult].isTrue
          this.$store.commit('OtherImgUrl', obj.url)
          this.commodityResult.contents[this.ImgnumKeyResult] = obj
          this.popoverAlert()
        }
      }
    }
  }
</script>
