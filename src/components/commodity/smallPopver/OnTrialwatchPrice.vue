<template>
  <div class="seach-list demo incomingHistory">
    <div class="popover-head">
      <span class="title">产品价格信息：</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <!-- <div class="popover-main">
       <p><label>销售价：</label> <el-input v-model="salePrice" size="small"></el-input></p>
       <p><label>成本价：</label> <el-input v-model="salePrice" size="small"></el-input></p>
       <p><label>佣金：</label> <el-input v-model="salePrice" size="small"></el-input></p>
     </div>-->
    <div class="popover-main">
      <el-table
        v-loading="loading"
        :max-height="300"
        :data="priceList"
        style="border:1px solid #dcdfe6;border-bottom: none;"
        :header-cell-style="headerStyle"
        :cell-style="objStyle"
        tooltip-effect="light"><!--:cell-style="styleObj"-->
        <el-table-column
          v-for="(item,index) in classArr"
          :label="item.title"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip="item.which!=='salePrices' && item.which!=='normalStores'">
          <template slot-scope="scope">
              <span style="margin-left: 10px" v-if="item.which=='salePrices'">
               <el-input placeholder="请输入..." class="GetPrice" v-model="BondMoney[scope.$index]" size="mini"
                         style="width: 90%;" v-if="FreeUseProductNormalsResult.item.length>0"></el-input>
               <el-input placeholder="请输入..." v-model="salePrice0" size="mini" style="width: 90%;" v-else></el-input>
             </span>
            <span style="margin-left: 10px" v-else-if="item.which=='normalStores'">
              <el-input placeholder="请输入..." class="Getnormal" v-model="priceListUpdata[scope.$index]" size="mini"
                        style="width: 90%;" v-if="FreeUseProductNormalsResult.item.length>0"></el-input>
               <el-input placeholder="请输入..." v-model="salePrice" size="mini" style="width: 90%;" v-else></el-input>
            </span>
            <span style="margin-left: 10px"
                  v-else-if="item.which=='store' && upDataSaleGoodsResult.type ==='updata'">{{FreeUseProductNormalsResult.item.length > 0 ? scope.row.basicStore : scope.row[item.which]
              }}</span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" plain @click="onSubmit" size="small">确定</el-button>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    name: 'newGoods',
    data () {
      return {
        salePrice: '',
        upDataPrice: '',
        changeNum: true,
        name: '',
        objStyle: {
          'font-size': '12px',
          padding: '6px 0'
        },
        salePrice0: '',
        BondMoney: [],
        priceListUpdata: [],
        UpdataGoodsStore: [],
        headerStyle: {'padding': '6px 0', 'line-height': '30px'},
        classArr: [{title: '规格', which: 'normalStr', width: '150'},
          {title: '销售价', which: 'salePriceView', width: '90'},
          {title: '保证金', which: 'salePrices', width: '105'},
          {title: '剩余库存', which: 'store', width: '90'},
          {title: '试用库存', which: 'normalStores', width: '90'}]
        // priceList:[{muchG:"规格一",sale:'109.00',ownPrice:'100'},{muchG:"规格二",sale:'199.00',ownPrice:'200'},{muchG:"规格三",sale:'1999.00',ownPrice:'300'},],
        // classArr:[{title:'规格',which:'normalStr',width:'150'},{title:'销售价',which:'salePriceView',width:'90'},{title:'保证金',which:'costPriceView',width:'90'},{title:'库存',which:'momey',width:'120'},{title:'试用库存',which:'momey',width:'120'}]
      }
    },
    computed: {
      ...mapGetters([
        'loading', 'popoverAlive', 'FreeUseProductNormalsResult', 'upDataSaleGoodsResult'
      ]),
      priceList () {
        if (this.FreeUseProductNormalsResult.item.length > 0) {
          return this.FreeUseProductNormalsResult.item
        } else {
          return [{
            normalStr: '无规格',
            salePriceView: this.popoverAlive.SSSnum.price,
            costPriceView: this.popoverAlive.SSSnum.costPriceView,
            store: this.popoverAlive.SSSnum.basicStore/* - this.popoverAlive.SSSnum.limitCount*/
          }]
        }
      }
    },
    created () {
      let data = {
        freeUseProductId: this.popoverAlive.SSSnum.id,
        type: 1
      }
      this.FreeUseProductNormalsActions(data)
    },
    mounted () {
//    this.PproductgetByIdResult.item.forEach((val,index) => {
//      this.priceListUpdata.push(val.commission)
//    })
      this.salePrice = this.popoverAlive.SSSnum.limitCount
      this.upDataPrice = this.popoverAlive.SSSnum.limitCount
      this.salePrice0 = this.popoverAlive.SSSnum.price
    },
    watch: {
      FreeUseProductNormalsResult: {
        handler (newVal, oldVal) {
          let that = this
          // console.log(newVal.title+','+oldVal.title)
          if (newVal.title == oldVal.title) {
            that.priceListUpdata = []
            that.UpdataGoodsStore = []
            that.BondMoney = []
            newVal.item.forEach((val, index) => {
              that.priceListUpdata.push(val.store)
              that.UpdataGoodsStore.push(val.store)
              that.BondMoney.push(val.salePriceView)
            })
            //console.log(this.priceListUpdata)
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'addFreeUseProductActions', 'FreeUseProductNormalsActions'
      ]),
      onSubmit () {
        let data = {
          sort: this.popoverAlive.SSSnum.sort,
          status: this.popoverAlive.SSSnum.status,
          // salePrices:'',//保证金
          //productName:'',
          // productId:,
          //  normalIds:'',
          indexImage: this.popoverAlive.SSSnum.indexImage,
          type: this.popoverAlive.SSSnum.type,
          //countryId:'',
          // dailyStartDate:this.value9,//场次
          //dayLimitCount:this.everyNum,//每日开放数量
          description: this.popoverAlive.SSSnum.description,
          isSetTop: this.popoverAlive.SSSnum.isSetTop,
          // normalStores:'',//试用库存
          tip: this.popoverAlive.SSSnum.tip,
          freeUseDays:this.popoverAlive.SSSnum.freeUseDays,
          buyCount:this.popoverAlive.SSSnum.buyCount
          // startDate:,
          //endDate:'',
        }
        if (this.popoverAlive.SSSnum.type == 3) {
          data.startDate = this.popoverAlive.SSSnum.startDate
          data.endDate = this.popoverAlive.SSSnum.endDate
          data.dayLimitCount = this.popoverAlive.SSSnum.dayLimitCount
          data.dailyStartDate = this.popoverAlive.SSSnum.dailyStartDate
          data.countryId = this.popoverAlive.SSSnum.countryId
          data.isOverSeasProduct = this.popoverAlive.SSSnum.isOverSeasProduct
        }
        data.productName = this.popoverAlive.SSSnum.productName
        data.productId = this.popoverAlive.SSSnum.productId
        data.id = this.popoverAlive.SSSnum.id
        if (this.FreeUseProductNormalsResult.item.length > 0) {
//          let Oinput=$('.GetsalePrices')
//          let Oinput2=$('.GetnormalStores')
          data.salePrices = /*JSON.stringify(this.BondMoney)*/this.BondMoney.toString()
          data.normalIds = this.changePriceApp(this.FreeUseProductNormalsResult.item, 10)
          data.normalStores = /*JSON.stringify(this.priceListUpdata)*/this.priceListUpdata.toString()
        } else {
          data.salePrices = /*JSON.stringify([this.form.TryPrice])*/[this.salePrice0].toString()
          data.normalIds = /*JSON.stringify([0])*/[0].toString()
          data.normalStores = /*JSON.stringify([this.form.namePrice])*/[this.salePrice].toString()
        }
        if (this.upDataSaleGoodsResult.type == 'updata' && this.FreeUseProductNormalsResult.item.length > 0) {
          for (let i = 0; i < data.normalStores.split(',').length; i++) {
            if (data.normalStores.split(',')[i] > (this.FreeUseProductNormalsResult.item[i].basicStore + this.UpdataGoodsStore[i]) || data.normalStores.split(',')[i] === '' || data.normalStores.split(',')[i] < 0) {
              this.changeNum = false
              break
            } else {
              this.changeNum = true
            }
          }
        } else {
          if (Number(data.normalStores) > (Number(this.upDataSaleGoodsResult.item.basicStore) + this.upDataPrice) || data.normalStores === '' || Number(data.normalStores) < 0) {
            this.changeNum = false
          } else {
            this.changeNum = true
          }
        }
        if (this.changeNum) {
          this.addFreeUseProductActions(data)
          this.popoverAlert()
        } else {
          this.$message({
            message: '库存数量错误',
            type: 'warning'
          })
        }
//      this.addFreeUseProductActions(data)
//      this.popoverAlert()
      },
      dateformat (data) {
        if (data) {
          let year = data.getFullYear()
          let month = data.getMonth() + 1
          let day = data.getDate()
          return year + '-' + month + '-' + day
        }
      },
      changePriceApp (arr, key) {
        let newArr = []
        arr.forEach((val, index) => {
          if (key == 1) {
            newArr.push(val.appPriceView)
          } else if (key == 2) {
            newArr.push(val.id)
          } else if (key == 10) {
            newArr.push(val.normalId)
          } else if (key == 3) {
            newArr.push(val.salePriceView)
          } else if (key == 4) {
            newArr.push(val.costPriceView)
          } else if (key == 5) {
            newArr.push(val.value)
          } else if (key == 6) {
            newArr.push(val.normalStr)
          } else {
            newArr.push(val.normalId)
          }
        })
        return /*JSON.stringify(newArr)*/newArr.toString()
      }

    }
  }
</script>

<style scoped lang="scss">
  .demo {
    // width: 400px;
    /*height: 220px;*/
    background: #F0FAFF;
    margin-left: -250px;
    margin-top: -200px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    color: #333333;
    position: fixed;
    p:first-child .el-input {
      margin: 0;
    }
    label {
      width: 60px;
      display: inline-block;
    }
    .el-button {
      margin: 0 auto;
      display: block;
      margin-bottom: 15px;
    }
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

  .popover-head .small-title {
    font-size: 12px;
    color: #999999;
    font-weight: normal;
  }

  .popover-main {
    padding: 20px 12.5px;
    width: calc(100% - 25px);
  }

  .popover-main .box-top {
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid #C5E2F0;
  }

</style>
