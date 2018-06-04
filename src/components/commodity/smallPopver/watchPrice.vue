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
        :data="priceList"
        style="border:1px solid #dcdfe6;border-bottom: none;"
        :max-height="300"
        :header-cell-style="headerStyle"
        :cell-style="objStyle"
        tooltip-effect="light"><!--:cell-style="styleObj"-->
        <el-table-column
          v-for="(item,index) in classArr"
          :label="item.title"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip="item.which!== 'momey' && item.which !== 'salePriceView'">
          <template slot-scope="scope">
              <span style="margin-left: 10px" v-if="item.which=='momey'">
               <el-input placeholder="请输入佣金" class="GetPrice" v-model="priceListUpdata[scope.$index]" size="mini"
                         style="width: 90%;" v-if="PproductgetByIdResult.item.length>0"></el-input>
               <el-input placeholder="请输入佣金" v-model="salePrice" size="mini" style="width: 90%;" v-else></el-input>
             </span>
            <span style="margin-left: 10px" v-else-if="item.which=='salePriceView'">
               <el-input placeholder="请输入特卖价" v-model="activeUpdata[scope.$index]" value="" size="mini"
                         style="width: 90%;" v-if="PproductgetByIdResult.item.length>0"></el-input>
               <el-input placeholder="请输入特卖价" v-model="activePrice" size="mini" style="width: 90%;" v-else></el-input>
            </span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
          >
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
        name: '',
        activePrice: '',
        objStyle: {
          'font-size': '12px',
          padding: '6px 0'
        },
        priceListUpdata: [],
        activeUpdata: [],
        headerStyle: {'padding': '6px 0', 'line-height': '30px'},
        // priceList:[{muchG:"规格一",sale:'109.00',ownPrice:'100'},{muchG:"规格二",sale:'199.00',ownPrice:'200'},{muchG:"规格三",sale:'1999.00',ownPrice:'300'},],
        classArr: [{title: '规格', which: 'normalStr', width: '230'}, {
          title: '市场价',
          which: 'marketPriceView',
          width: '100'
        }, {title: '成本', which: 'costPriceView', width: '100'}, {
          title: '特卖价',
          which: 'salePriceView',
          width: '100'
        }, {title: '佣金', which: 'momey', width: '100'}]
      }
    },
    computed: {
      ...mapGetters([
        'loading', 'popoverAlive', 'PproductgetByIdResult'
      ]),
      priceList () {
        if (this.PproductgetByIdResult.item.length > 0) {
          return this.PproductgetByIdResult.item
        } else {
          return [{
            normalStr: '无规格',
            salePriceView: this.popoverAlive.SSSnum.price,
            costPriceView: this.popoverAlive.SSSnum.costPrice,
            marketPriceView: this.popoverAlive.SSSnum.marketPrice
          }]
        }
      }
    },
    created () {
      this.PproductgetByIdActions(this.popoverAlive.SSSnum.id)
    },
    mounted () {
//    this.PproductgetByIdResult.item.forEach((val,index) => {
//      this.priceListUpdata.push(val.commission)
//    })
      this.salePrice = this.popoverAlive.SSSnum.commission
      this.activePrice = this.popoverAlive.SSSnum.price
    },
    watch: {
      PproductgetByIdResult: {
        handler (newVal, oldVal) {
          let that = this
          console.log(newVal.title + ',' + oldVal.title)
          if (newVal.title == oldVal.title) {
            that.priceListUpdata = []
            that.activeUpdata = []
            newVal.item.forEach((val, index) => {
              that.priceListUpdata.push(val.commission)
              that.activeUpdata.push(val.salePriceView)
            })
            //console.log(this.priceListUpdata)
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'PproductgetByIdActions', 'plusProductSaveActions'
      ]),
      onSubmit () {
        let data = {
          id: this.popoverAlive.SSSnum.id,//特卖id
          //appPrices:'',//app售价集合，有规格要传
          // commission:'',//佣金无规格要传
          // commissiones:'',//佣金集合
          // costPrices:'',//成本价集合
          desc: this.popoverAlive.SSSnum.desc,//描述
          image: this.popoverAlive.SSSnum.image,//产品主图链接
          indexImage: this.popoverAlive.SSSnum.indexImage,//大图
          isRecommend: this.popoverAlive.SSSnum.isRecommend,//是否推荐
          // marketPrice:this.CouponWithGoodsResult.marketPriceView,//原价
          //normalIds:'',//产品库产品上的规格id集合
          // plusProductNormalIds:'',//特卖产品的规格id集合
          //price:this.CouponWithGoodsResult.salePriceView,//售价、、
          // salePrices:'',//售价集合,有规格传
          productId: this.popoverAlive.SSSnum.productId,//产品库产品id
          productName: this.popoverAlive.SSSnum.productName,//产品名称
          sort: this.popoverAlive.SSSnum.sort,//排序
          startDate: this.popoverAlive.SSSnum.startDate,
          trip: this.popoverAlive.SSSnum.trip,//产品标签
//       normalStrs:''
          status: this.popoverAlive.SSSnum.status,
          isStick: this.popoverAlive.SSSnum.isStick,//是否置顶
          plusDate: this.popoverAlive.SSSnum.plusDate//销售时间
        }
        data.marketPrice = this.popoverAlive.SSSnum.marketPrice
        data.price = this.popoverAlive.SSSnum.price
        if (this.PproductgetByIdResult.item.length > 0) {
          data.plusProductNormalIds = this.changePriceApp(this.PproductgetByIdResult.item, 2)
          // let oInput=document.getElementsByClassName('GetPrice')
//         data.commissiones=this.changePriceApp(Array.prototype.slice.call(oInArr),5)
          data.commissiones = this.priceListUpdata.join(',')
          data.salePrices = this.activeUpdata.join(',')
          data.appPrices = this.changePriceApp(this.PproductgetByIdResult.item, 1)
          data.normalIds = this.changePriceApp(this.PproductgetByIdResult.item, 7)
          //data.salePrices=this.changePriceApp(this.PproductgetByIdResult.item,3)
          data.costPrices = this.changePriceApp(this.PproductgetByIdResult.item, 4)
          data.normalStrs = this.changePriceApp(this.PproductgetByIdResult.item, 6)
          data.marketePrices = this.changePriceApp(this.PproductgetByIdResult.item, 10)
        } else {
          data.commission = this.salePrice
          data.price = this.activePrice
        }
        this.plusProductSaveActions(data)
        this.popoverAlert()
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
          } else if (key == 3) {
            newArr.push(val.salePriceView)
          } else if (key == 4) {
            newArr.push(val.costPriceView)
          } else if (key == 5) {
            newArr.push(val.value)
          } else if (key == 6) {
            newArr.push(val.normalStr)
          } else if (key == 10) {
            newArr.push(val.marketPriceView)
          } else {
            newArr.push(val.normalId)
          }
        })
        return newArr.join(',')
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
    p:first-child .el-input {
      margin: 0;
    }
    .el-input {
      width: 70%;
      /*margin-top: 15px;*/
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
