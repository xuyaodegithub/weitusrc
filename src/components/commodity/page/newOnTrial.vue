<template>
  <div class="seach-list" id="SaleNewOntry">
    <!--<div>-->
    <!--<lebal>产品名称</lebal>-->
    <!--</div>-->
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="产品名称:">
        <!--<p style="width: auto;display: inline-block;text-indent: 10px">{{CouponWithGoodsResult.productName}}</p>-->
        <el-input placeholder="请输入内容" size="small" :value="CouponWithGoodsResult.productName"
                  style="width: 40%;display: inline-block;text-indent: 10px" @change="changeRng"></el-input>
        <el-button type="success" size="mini" round style="margin-left: 15px;"
                   @click="popoverAlert(['VchoseGoods','one'])" v-if="upDataSaleGoodsResult.type ==='add'">选择产品
        </el-button>
      </el-form-item>
      <el-form-item label="描述:">
        <el-input type="textarea" v-model="form.desc" style="width: 700px;" :maxlength="140"
                  placeholder="最多140个字符"></el-input>
      </el-form-item>
      <el-form-item label="Tip:">
        <el-input type="textarea" v-model="form.trip" style="width: 700px;" :maxlength="70"
                  placeholder="最多70个字符"></el-input>
      </el-form-item>
      <el-form-item label="产品信息:">
        <!--<el-input v-model="form.name" size="small"></el-input>-->
        <!--<el-button type="success" size="mini" round>选择产品</el-button>-->
        <el-table
          :data="priceList"
          style="width: 745px;border:1px solid #dcdfe6;border-bottom: none;"
          :cell-style="cellObj"
          :header-cell-style="headerStyle"
          tooltip-effect="light"><!--:cell-style="styleObj"-->
          <el-table-column
            v-for="(item,index) in form.classArr"
            :label="item.title"
            :key="index"
            :width="item.width"
            :show-overflow-tooltip="item.which!=='salePrices' && item.which!=='normalStores'">
            <template slot-scope="scope">
              <!--<span style="margin-left: 10px" v-if="item.which=='normalStr'">{{scope.row[item.which]? scope.row[item.which] : '无规格'}}</span>-->
              <span style="margin-left: 10px" v-if="item.which=='normalStores'">
               <el-input placeholder="请输入..." :value="scope.row.store" class="GetnormalStores" size="mini"
                         style="width: 90%;"
                         v-if="getProductNormalsResult.length>0 && upDataSaleGoodsResult.type==='add'"></el-input>
               <el-input placeholder="请输入..." v-model="priceListUpdata[scope.$index]" size="mini" style="width: 90%;"
                         v-else-if="FreeUseProductNormalsResult.item.length>0 && upDataSaleGoodsResult.type==='updata'"></el-input>
               <el-input placeholder="请输入..." v-model="form.namePrice" size="mini" style="width: 90%;"
                         :value="scope.row.store" v-else></el-input>
             </span>
              <span style="margin-left: 10px" v-else-if="item.which=='salePrices'">
               <el-input placeholder="请输入..." value="" class="GetsalePrices" size="mini" style="width: 90%;"
                         v-if="getProductNormalsResult.length>0 && upDataSaleGoodsResult.type==='add'"></el-input>
               <el-input placeholder="请输入..." v-model="BondMoney[scope.$index]" size="mini" style="width: 90%;"
                         v-else-if="FreeUseProductNormalsResult.item.length>0 && upDataSaleGoodsResult.type==='updata'"></el-input>
              <el-input placeholder="请输入..." v-model="form.TryPrice" size="mini" style="width: 90%;" v-else></el-input>
             </span>
              <span style="margin-left: 10px" v-else-if="item.which=='store' && upDataSaleGoodsResult.type ==='updata'">{{FreeUseProductNormalsResult.item.length > 0 ? scope.row.basicStore : scope.row[item.which]
                }}</span>
              <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
            </template>
            >
          </el-table-column>
        </el-table>
        <p style="padding-left: 432px;"
           v-if="(getProductNormalsResult.length>0 && upDataSaleGoodsResult.type=='add') || (FreeUseProductNormalsResult.item.length>0 && upDataSaleGoodsResult.type=='updata')">
          <el-input placeholder="请输入..." v-model="changeAll" size="mini" style="width: 81px"></el-input>
          <el-button type="success" size="mini" style="margin-left: 15px;width: 60px;"
                     @click="changePromise(changeAll)">批量
          </el-button>
        </p>
      </el-form-item>
      <el-form-item label="试用时间:" required>
        <el-input v-model="tryTime" size="small"></el-input>
        <span style="font-size: 12px;color: orange;margin-left: 10px;">（试用周期，关系到退款时间）</span>
      </el-form-item>
      <el-form-item label="试用类型:" required>
        <el-radio-group v-model="typeTrial"><!--:disabled="classWh === '1'"-->
          <el-radio :label=1 style="width: auto;">普通试用</el-radio>
          <!--<el-radio :label=2 style="width: auto;">新品首发</el-radio>-->
          <el-radio :label=3 style="width: auto;">整点抢</el-radio>
          <el-radio :label=5 style="width: auto;">付邮试</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="添加场次:" v-if="typeTrial==3">
        <div class="typeClass">
          <p>
            <label>试用时间:</label>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy - MM - dd "
              value-format="yyyy-MM-dd"
              size="mini">
            </el-date-picker>
          </p>
          <p>
            <label>场次时间:</label>
            <el-select v-model="value9" placeholder="请选择" size="mini">
              <el-option
                v-for="(item,index) in timerList"
                :key="index"
                :label="item.timer"
                :value="item.timer">
              </el-option>
            </el-select>
          </p>
          <p>
            <label>每场放量:</label>
            <el-input v-model="everyNum" size="mini"></el-input>
          </p>
          <p>
            <label>是否是海外产品:</label>
            <el-radio-group v-model="isOutCountry">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </p>
          <p v-if="isOutCountry==1">
            <label>选择国家</label>
            <el-select v-model="value8" placeholder="请选择" size="mini">
              <el-option
                v-for="(item,index) in countryListResult.rows"
                :key="index"
                :label="item.countryName"
                :value="item.id">
              </el-option>
            </el-select>
            <el-button @click="addCountry()" icon="el-icon-plus" size="mini">添加其他国家</el-button>
          </p>
        </div>
      </el-form-item>
      <!-- <el-form-item label="首页图片:" v-if="typeTrial!==3">
         <el-upload
           class="upload-demo"
           :show-file-list="false"
           name="img"
           :on-success="upSuccessfirst2"
           action="apis/admin/buildblocks/uploadImage">
           <div  style="margin: 10px 0 0px 10px;">
             <img :src="dialogImageUrl2" alt="" style="height: 78px;width: 78px;" class="valign" v-if="dialogImageUrl2">
             <el-button size="mini" plain >点击上传</el-button>
             <span style="font-size: 12px;color: orange;">图标尺寸 71 : 28</span>
           </div>
           &lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;
         </el-upload>
       </el-form-item>-->
      <el-form-item label="商品大图:">
        <div style="display: flex;">
          <!--<el-button size="mini" plain @click="upLoad()" style="height: 30px;margin: 25px 0 0 10px;">上传图片</el-button><span style="color: orange;font-size: 12px;margin: 25px 0 0 10px;">比例  71:28</span>-->
        </div>
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          name="img"
          :on-success="upSuccessfirst"
          action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage">
          <div style="margin: 10px 0 0px 10px;">
            <img :src="dialogImageUrl" alt="" style="height: 84px;width: 213px;" class="valign" v-if="dialogImageUrl">
            <el-button size="mini" plain>点击上传</el-button>
            <span style="font-size: 12px;color: orange;">图标尺寸 71 : 28</span>
          </div>
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </el-form-item>
      <el-form-item label="推广奖励:" required v-if="typeTrial!==3">
        <el-input v-model="promotionAward" size="small"></el-input>
        <span style="font-size: 12px;color: orange;margin-left: 10px;">（单位元）</span>
      </el-form-item>
      <el-form-item label="排序:" required>
        <el-input v-model="form.sort" size="small"></el-input>
        <span style="font-size: 12px;color: orange;margin-left: 10px;">（带 * 的为必填项）</span>
      </el-form-item>
      <el-form-item label="是否置顶:">
        <el-radio-group v-model="isSetTop"><!--:disabled="classWh === '1'"-->
          <el-radio :label=1 style="width: auto;">是</el-radio>
          <el-radio :label=0 style="width: auto;">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上下架状态:">
        <el-radio-group v-model="isStatus"><!--:disabled="classWh === '1'"-->
          <el-radio :label=1 style="width: auto;">上架</el-radio>
          <el-radio :label=0 style="width: auto;">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上架时间:" v-if="isStatus===1 && typeTrial!==3">
        <el-date-picker
          size="mini"
          v-model="isUpTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="saveProduct()" size="small" v-if="upDataSaleGoodsResult.type==='add'">
          立即添加
        </el-button>
        <el-button type="primary" plain @click="saveProduct()" size="small" v-else>提交修改</el-button>
        <!--<el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    name: 'newOnTrial',
    data() {
      return {
        tryTime: '',
        promotionAward: '',
//      isTypeTrial:false,
        tryDay: [{title: '1天', val: 1}, {title: '2天', val: 2}, {title: '3天', val: 3}],
        timerList: [
          {timer: '00:00'}, {timer: '01:00'}, {timer: '02:00'}, {timer: '03:00'}, {timer: '04:00'}, {timer: '05:00'}, {timer: '06:00'}, {timer: '07:00'},
          {timer: '08:00'}, {timer: '09:00'}, {timer: '10:00'}, {timer: '11:00'}, {timer: '12:00'}, {timer: '13:00'}, {timer: '14:00'},
          {timer: '15:00'}, {timer: '16:00'}, {timer: '17:00'}, {timer: '18:00'}, {timer: '19:00'}, {timer: '20:00'}, {timer: '21:00'},
          {timer: '22:00'}, {timer: '23:00'},
        ],
        changeNum: true,
        typeTrial: '',
        changeAll: '',
        backTitle: 'seachOnTrialGoods',
        isStatus: '',
        priceListUpdata: [],
        UpdataGoodsStore: [],
        BondMoney: [],
        cellObj: {
          padding: '6px 0'
        },
        isOutCountry: '',
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        isSetTop: '',
        everyNum: '',
        activeNum: true,
        form: {
          sort: '',
          name: '',
          region: '',
          date: '',
          desc: '',
          trip: '',
          namePrice: '',
          upDataPrice: '',
          TryPrice: '',
          classArr: [{title: '规格', which: 'normalStr', width: '300'},
            {title: '销售价', which: 'salePriceView', width: '110'},
            {title: '保证金', which: 'salePrices', width: '110'},
            {title: '剩余库存', which: 'store', width: '110'},
            {title: '试用库存', which: 'normalStores', width: '110'}]
        },
        // priceList:[{muchG:"规格一",sale:'109.00',ownPrice:'100'},{muchG:"规格二",sale:'199.00',ownPrice:'200'},{muchG:"规格三",sale:'1999.00',ownPrice:'300'},],
        styleObj: {
          'border-left': '1px solid #dcdfe6',
          'border-right': '1px solid #dcdfe6',
          'line-height': '30px'
        },
        headerStyle: {'padding': '6px 0', 'line-height': '30px', 'color': '#000000'},
        isAudio: '',
        dialogImageUrl: '',
        dialogImageUrl2: '',
        isUpTime:''
      }
    },
    computed: {
      ...mapGetters([
        'CouponWithGoodsResult', 'getProductNormalsResult', 'upDataSaleGoodsResult', 'FreeUseProductNormalsResult', 'countryListResult'
      ]),
      priceList() {
        //console.log(this.getProductNormalsResult)
        // console.log(this.getProductNormalsResult)
        // if(this.upDataSaleGoodsResult.type==='add') {
        if (this.CouponWithGoodsResult.productName) {
          if (this.getProductNormalsResult.length > 0 && this.upDataSaleGoodsResult.type === 'add') {
            return this.getProductNormalsResult
          } else if (this.FreeUseProductNormalsResult.item.length > 0 && this.upDataSaleGoodsResult.type === 'updata') {
            return this.FreeUseProductNormalsResult.item
          } else if (this.FreeUseProductNormalsResult.item.length == 0 && this.upDataSaleGoodsResult.type === 'updata') {
            return [{
              normalStr: '无规格',
              salePriceView: this.upDataSaleGoodsResult.item.price,
              costPriceView: this.upDataSaleGoodsResult.item.costPriceView,
              store: this.upDataSaleGoodsResult.item.basicStore /*- this.upDataSaleGoodsResult.item.limitCount,*/
            }]
          } else {
            return [{
              normalStr: '无规格',
              salePriceView: this.CouponWithGoodsResult.salePriceView,
              costPriceView: this.CouponWithGoodsResult.costPriceView,
              store: this.CouponWithGoodsResult.price,
            }]
          }
        } else {
          return []
        }
//      }else{
//
//      }
      }
    },
    watch: {
      FreeUseProductNormalsResult: {
        handler(newVal, oldVal) {
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
      },
      getProductNormalsResult: {
        handler(newVal, oldVal) {
          if (newVal.length < 1 && this.upDataSaleGoodsResult.type === 'add') {
            this.form.namePrice = this.CouponWithGoodsResult.price
          }
        },
        deep: true
      }
    },
    activated() {
      if (this.upDataSaleGoodsResult.type === 'add') {
        let obj = {
          togetherProductIds: '',
          productType: 1,
          productIds: '',
          marketPrice: '',
          price: '',
          productName: '',
          costPriceView: '',//成本价
          salePriceView: '',//销售价
          image: ''//销售价
        }
        this.$store.commit('Coupon_With_Goods', obj)
        this.$store.commit('clearGoodsData')
        this.form.sort = ''
        this.form.date = ''
        this.form.desc = ''
        this.form.trip = ''
        this.form.namePrice = ''
        this.form.TryPrice = ''
        this.dialogImageUrl = ''
        this.dialogImageUrl2 = ''
        this.isAudio = ''
        this.value6 = []
        this.value8 = ''
        this.isOutCountry = ''
        this.value9 = ''
        this.everyNum = ''
        this.typeTrial = ''
        this.isSetTop = 1
        this.isStatus = 1
        this.tryTime = '',
        this.promotionAward=''
        this.isUpTime=''
      } else {
        let obj = {
          togetherProductIds: '',
          productType: 1,
          productIds: this.upDataSaleGoodsResult.item.id,
          marketPrice: this.upDataSaleGoodsResult.item.marketPrice,
          price: this.upDataSaleGoodsResult.item.price,
          productName: this.upDataSaleGoodsResult.item.productName,
          costPriceView: '',//成本价
          salePriceView: '',//销售价
          image: this.upDataSaleGoodsResult.item.image//主图
        }
        this.$store.commit('Coupon_With_Goods', obj)
        //console.log(1111)
        this.form.sort = this.upDataSaleGoodsResult.item.sort
        this.isSetTop = this.upDataSaleGoodsResult.item.isSetTop
        this.form.date = this.upDataSaleGoodsResult.item.startDate
        this.form.desc = this.upDataSaleGoodsResult.item.description
        this.form.trip = this.upDataSaleGoodsResult.item.tip
        this.form.namePrice = this.upDataSaleGoodsResult.item.limitCount
        this.form.upDataPrice = this.upDataSaleGoodsResult.item.limitCount
        this.form.TryPrice = this.upDataSaleGoodsResult.item.price
        this.dialogImageUrl = this.upDataSaleGoodsResult.item.indexImage
        this.dialogImageUrl2 = this.upDataSaleGoodsResult.item.indexImage
        this.isAudio = this.upDataSaleGoodsResult.item.isRecommend
        this.isStatus = this.upDataSaleGoodsResult.item.status
        this.typeTrial = this.upDataSaleGoodsResult.item.type
        this.value6 = [this.upDataSaleGoodsResult.item.startDate, this.upDataSaleGoodsResult.item.endDate]
        this.value8 = this.upDataSaleGoodsResult.item.countryId
        this.value9 = this.upDataSaleGoodsResult.item.dailyStartTime
        this.everyNum = this.upDataSaleGoodsResult.item.dayLimitCount
        this.isOutCountry = this.upDataSaleGoodsResult.item.isOverSeasProduct
        this.tryTime = this.upDataSaleGoodsResult.item.freeUseDays
        this.promotionAward=this.upDataSaleGoodsResult.item.promotionAward
        this.isUpTime=this.changeTime(new Date(this.upDataSaleGoodsResult.item.startTime))
        console.log(this.isUpTime)
        let data = {
          freeUseProductId: this.upDataSaleGoodsResult.item.id,
          type: 1
        }
        this.FreeUseProductNormalsActions(data)
        //let oInArr=$('.GetPrice input')
      }

    },
    mounted() {
      // alert( null== undefined)

      this.getCountryActions()
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'addFreeUseProductActions', 'FreeUseProductNormalsActions', 'AddNewCountryActions', 'getCountryActions'
      ]),
      saveProduct() {
        let data = {
          sort: this.form.sort,
          status: this.isStatus,
          // salePrices:'',//保证金
          //productName:'',
          // productId:,
          //  normalIds:'',
          indexImage: this.dialogImageUrl,
          type: this.typeTrial,
          //countryId:'',
          // dailyStartDate:this.value9,//场次
          //dayLimitCount:this.everyNum,//每日开放数量
          description: this.form.desc,
          isSetTop: this.isSetTop,
          // normalStores:'',//试用库存
          tip: this.form.trip,
          freeUseDays: this.tryTime,
//          filter_S_promotionAward:this.promotionAward
          // startDate:,
          //endDate:'',
        }
        if (this.typeTrial == 3) {
//        this.isTypeTrial=true
          data.startDate = this.value6[0]
          data.endDate = this.value6[1]
          if (this.everyNum) {
            this.activeNum = true
            data.dayLimitCount = this.everyNum
          } else {
            this.activeNum = false

          }
          data.dailyStartDate = this.value9
          data.isOverSeasProduct = this.isOutCountry
          data.countryId = this.value8
        } else {
//         this.isTypeTrial=false
          data.startDate = this.isUpTime
          console.log(data.startDate)
          data.filter_S_promotionAward=this.promotionAward
          if(!data.indexImage){
            this.$message({
              message: '商品大图不可为空',
              type: 'warning'
            })
            return
          }
        }
        if (this.upDataSaleGoodsResult.type === 'add') {
          data.productName = this.CouponWithGoodsResult.productName
          data.productId = this.CouponWithGoodsResult.productIds
          if (this.getProductNormalsResult.length > 0) {
            let oInput = $('.GetsalePrices input')
            let oInput2 = $('.GetnormalStores input')
            console.log(oInput)
            data.salePrices = this.changePriceApp(Array.prototype.slice.call(oInput), 5)
            data.normalIds = this.changePriceApp(this.getProductNormalsResult, 2)
            data.normalStores = this.changePriceApp(Array.prototype.slice.call(oInput2), 5)
          } else {
            data.salePrices = /*JSON.stringify([this.form.TryPrice])*/[this.form.TryPrice].toString()
            data.normalIds = /*JSON.stringify([0])*/[0].toString()
            data.normalStores = /*JSON.stringify([this.form.namePrice])*/[this.form.namePrice].toString()
          }
        } else {
          data.productName = this.CouponWithGoodsResult.productName
          data.productId = this.upDataSaleGoodsResult.item.productId
          data.id = this.upDataSaleGoodsResult.item.id
          data.buyCount = this.upDataSaleGoodsResult.item.buyCount
          if (this.FreeUseProductNormalsResult.item.length > 0) {
            data.salePrices = /*JSON.stringify(this.BondMoney)*/this.BondMoney.toString()
            data.normalIds = this.changePriceApp(this.FreeUseProductNormalsResult.item, 10)
            data.normalStores = /*JSON.stringify(this.priceListUpdata)*/this.priceListUpdata.toString()
          } else {
            data.salePrices = /*JSON.stringify([this.form.TryPrice])*/[this.form.TryPrice].toString()
            data.normalIds = /*JSON.stringify([0])*/[0].toString()
            data.normalStores = /*JSON.stringify([this.form.namePrice])*/[this.form.namePrice].toString()
          }
        }
        // alert(data.normalStores)
        if (this.upDataSaleGoodsResult.type == "add" && this.getProductNormalsResult.length > 0) {
          for (let i = 0; i < data.normalStores.split(',').length; i++) {
            if (data.normalStores.split(',')[i] > this.getProductNormalsResult[i].store || data.normalStores.split(',')[i] === '' || data.normalStores.split(',')[i] < 0) {
              this.changeNum = false
              break
            } else {
              this.changeNum = true
            }
          }
        } else if (this.upDataSaleGoodsResult.type == "add" && this.getProductNormalsResult.length == 0) {
          if (Number(data.normalStores) > Number(this.CouponWithGoodsResult.price) || data.normalStores === '' || Number(data.normalStores) < 0) {
            this.changeNum = false
          } else {
            this.changeNum = true
          }
        } else if (this.upDataSaleGoodsResult.type == "updata" && this.FreeUseProductNormalsResult.item.length > 0) {
          for (let i = 0; i < data.normalStores.split(',').length; i++) {
            console.log(data.normalStores.split(',')[i], this.FreeUseProductNormalsResult.item[i].basicStore, this.UpdataGoodsStore[i])
            if (data.normalStores.split(',')[i] > (this.FreeUseProductNormalsResult.item[i].basicStore + this.UpdataGoodsStore[i]) || data.normalStores.split(',')[i] === '' || data.normalStores.split(',')[i] < 0) {
              this.changeNum = false
              break
            } else {
              this.changeNum = true
            }
          }
        } else {
          if (Number(data.normalStores) > (Number(this.upDataSaleGoodsResult.item.basicStore) + this.form.upDataPrice) || data.normalStores === '' || Number(data.normalStores) < 0) {
            this.changeNum = false
          } else {
            this.changeNum = true
          }
        }
        if (this.changeNum && this.activeNum && data.freeUseDays) {
          this.addFreeUseProductActions(data)
          this.$emit('to-change', this.backTitle)
        } else {
          this.$message({
            message: '库存数量或销售时间或每场放量填写有误',
            type: 'warning'
          })
        }
      },
      upSuccessfirst(response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      upSuccessfirst2(response, file, fileList) {
        this.dialogImageUrl2 = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      addCountry() {
        this.popoverAlert('addCountry')
      },
      changePriceApp(arr, key) {
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
      },
      changePromise(val) {
        // alert(val)
        let arr = []
        if (this.upDataSaleGoodsResult.type == "add") {
          let oInput = $('.GetsalePrices input')
          for (let i = 0; i < oInput.length; i++) {
            oInput[i].value = val
          }
        } else {
          for (let i = 0; i < this.BondMoney.length; i++) {
            arr.push(val)
          }
          this.BondMoney = arr
        }
      },
      changeRng(e) {
        console.log(e)
        let obj = {
          togetherProductIds: this.CouponWithGoodsResult.togetherProductIds,
          productType: this.CouponWithGoodsResult.productType,
          productIds: this.CouponWithGoodsResult.productIds,
          marketPrice: this.CouponWithGoodsResult.marketPrice,
          price: this.CouponWithGoodsResult.price,
          productName: e,
          costPriceView: this.CouponWithGoodsResult.costPriceView,//成本价
          salePriceView: this.CouponWithGoodsResult.salePriceView,//销售价
          image: this.CouponWithGoodsResult.image//主图
        }
        this.$store.commit('Coupon_With_Goods', obj)
      },
      changeTime(val){
        let data=val
        let year=data.getFullYear()
        let month=data.getMonth()+1
        let day= data.getDate()
        let hour= data.getHours()
        let min=data.getMinutes()
        let sec=data.getSeconds()
        if(month.length<2){
          month='0'+month
        }
        //console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
        // return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
        if(month<10){
          month='0'+month
        }
        if(day<10){
          day='0'+day
        }
        if(hour<10){
          hour='0'+hour
        }
        if(min<10){
          min='0'+min
        }
        if(sec<10){
          sec='0'+sec
        }
        return year+'-'+month+'-'+day +' '+hour+':'+min+':'+sec
      }

    }
  }
</script>

<style lang="scss">
  #SaleNewOntry {
    margin-top: 16px;
    padding-left: 30px;
    .el-input, .el-select {
      width: 150px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-form-item__label {
      color: #000000;
    }
    .typeClass {
      border: 1px solid #ebeef5;
      padding: 15px 0 20px 0;
      width: 700px;
      display: inline-block;
      vertical-align: middle;
      p > label {
        margin-top: 5px;
        display: inline-block;
        width: 120px;
        text-align: right;
        margin-right: 10px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        margin: 3px 10px 0 0;
        border: 1px solid #409EFF;
        padding: 6px 3px;
        &:last-child {
          border: none;
        }
        img {
          display: inline-block;
          height: 38px;
          width: 60px;
        }
      }
    }
    .el-button--mini, .el-button--mini.is-round {
      padding: 7px;
    }
  }

</style>
