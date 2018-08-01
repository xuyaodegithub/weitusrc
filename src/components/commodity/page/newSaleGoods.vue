<template>
  <div class="seach-list" id="SaleNewone">
    <!--<div>-->
    <!--<lebal>产品名称</lebal>-->
    <!--</div>-->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="产品名称:">
        <!--<p style="width: auto;display: inline-block;text-indent: 10px">{{CouponWithGoodsResult.productName}}</p>-->
        <el-input placeholder="请输入内容" size="small" :value="CouponWithGoodsResult.productName"
                  style="width: 40%;display: inline-block;text-indent: 10px" @change="changeRng"></el-input>
        <!--<el-input v-model="CouponWithGoodsResult.productName" size="small" disabled></el-input>-->
        <el-button type="success" size="mini" round style="margin-left: 15px;" v-if="upDataSaleGoodsResult.type==='add'"
                   @click="popoverAlert(['VchoseGoods','one'])">选择产品
        </el-button>
      </el-form-item>
      <el-form-item label="产品信息:">
        <!--<el-input v-model="form.name" size="small"></el-input>-->
        <!--<el-button type="success" size="mini" round>选择产品</el-button>-->
        <el-table
          :data="priceList"
          style="width: 830px;border:1px solid #dcdfe6;border-bottom: none;"
          :cell-style="cellObj"
          :header-cell-style="headerStyle"
          tooltip-effect="light"><!--:cell-style="styleObj"-->
          <el-table-column
            v-for="(item,index) in form.classArr"
            :label="item.title"
            :key="index"
            :width="item.width"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <!--<span style="margin-left: 10px" v-if="item.which=='normalStr'">{{scope.row[item.which]? scope.row[item.which] : '无规格'}}</span>-->
              <span style="margin-left: 10px" v-if="item.which=='momey'">
               <el-input placeholder="请输入佣金" class="GetPrice" value="" size="mini" style="width: 90%;"
                         v-if="getProductNormalsResult.length>0 && upDataSaleGoodsResult.type==='add'"></el-input>
               <el-input placeholder="请输入佣金" v-model="priceListUpdata[scope.$index]" size="mini" style="width: 90%;"
                         v-else-if="PproductgetByIdResult.item.length>0 && upDataSaleGoodsResult.type==='updata'"></el-input>
               <el-input placeholder="请输入佣金" v-model="form.namePrice" size="mini" style="width: 90%;" v-else></el-input>
             </span>
              <span style="margin-left: 10px" v-else-if="item.which=='salePriceView'">
               <el-input placeholder="请输入特卖价" class="activePrice" :value="salePriceViewPush[scope.$index]" size="mini"
                         style="width: 90%;"
                         v-if="getProductNormalsResult.length>0 && upDataSaleGoodsResult.type==='add'"></el-input>
               <el-input placeholder="请输入特卖价" v-model="activeUpdata[scope.$index]" value="" size="mini"
                         style="width: 90%;"
                         v-else-if="PproductgetByIdResult.item.length>0 && upDataSaleGoodsResult.type==='updata'"></el-input>
               <el-input placeholder="请输入特卖价" v-model="activePrice" size="mini" style="width: 90%;" v-else></el-input>
             </span>
              <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
            </template>
            >
          </el-table-column>
        </el-table>
      </el-form-item>
      <!--<el-form-item label="佣金:">-->
      <!--<el-input v-model="form.name" size="small"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="特卖时间:">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width:200px;" size="small"
                          :picker-options="{
            disabledDate:disData
           }">

          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="销售时间:">
        <el-select v-model="value8" placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in timeList"
            :key="index"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述:">
        <el-input type="textarea" v-model="form.desc" style="width: 700px;" :maxlength="140"
                  placeholder="最多140个字符"></el-input>
      </el-form-item>
      <el-form-item label="Tip:">
        <el-input type="textarea" v-model="form.trip" style="width: 700px;" :maxlength="70"
                  placeholder="最多70个字符"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否推荐:">
         <el-radio-group v-model="isAudio">&lt;!&ndash;:disabled="classWh === '1'"&ndash;&gt;
           <el-radio :label=1 style="width: auto;">是</el-radio>
           <el-radio :label=0 style="width: auto;">否</el-radio>
         </el-radio-group>
       </el-form-item>-->
      <el-form-item label="是否置顶:">
        <el-radio-group v-model="isSetTop"><!--:disabled="classWh === '1'"-->
          <el-radio :label=1 style="width: auto;">是</el-radio>
          <el-radio :label=0 style="width: auto;">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核状态:">
        <el-radio-group v-model="isStatus"><!--:disabled="classWh === '1'"-->
          <el-radio :label=1 style="width: auto;">上架</el-radio>
          <el-radio :label=0 style="width: auto;">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" required>
        <el-input v-model="form.sort" size="small" style="width: 250px;"></el-input>
        <span style="font-size: 12px;color: orange;margin-left: 10px;">（带 * 的为必填项）</span>
      </el-form-item>
      <el-form-item label="大图:" required>
        <div style="display: flex;">
          <img :src="dialogImageUrl" alt="" style="height: 78px;width: 78px;" class="valign" v-if="dialogImageUrl">
          <el-button size="mini" plain @click="upLoad()" style="height: 30px;margin: 25px 0 0 10px;">上传图片</el-button>
        </div>
        <el-upload
          action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
          name="img"
          :multiple=true
          :show-file-list=false
          list-type="picture-card"
          :on-success="upSuccessfirst"
          :on-preview="handlePictureCardPreview">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
    name: 'newGoods',
    data() {
      return {
        oDiv: '',
        backTitle: 'SeachList',
        imgShow: false,
        isStatus: '',
        priceListUpdata: [],
        salePriceViewPush: [],
        activeUpdata: '',
        activePrice: '',
        cellObj: {
          padding: '6px 0'
        },
        form: {
          sort: '',
          name: '',
          region: '',
          date: '',
          desc: '',
          trip: '',
          namePrice: '',
          classArr: [{title: '规格', which: 'normalStr', width: '300'}, {
            title: '市场价',
            which: 'marketPriceView',
            width: '130'
          }, {title: '成本', which: 'costPriceView', width: '130'}, {
            title: '特卖价',
            which: 'salePriceView',
            width: '130'
          }, {title: '佣金', which: 'momey', width: '130'}]
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
        dialogVisible: false,
        isSetTop: '',
        value8: 3,
        timeList: [{label: '1天', id: 1}, {label: '2天', id: 2}, {label: '3天', id: 3}]
      }
    },
    computed: {
      ...mapGetters([
        'CouponWithGoodsResult', 'getProductNormalsResult', 'upDataSaleGoodsResult', 'PproductgetByIdResult'
      ]),
      priceList() {
        console.log(this.getProductNormalsResult)
        // console.log(this.getProductNormalsResult)
        // if(this.upDataSaleGoodsResult.type==='add') {
        if (this.CouponWithGoodsResult.productName) {
          if (this.getProductNormalsResult.length > 0 && this.upDataSaleGoodsResult.type === 'add') {
            return this.getProductNormalsResult
          } else if (this.PproductgetByIdResult.item.length > 0 && this.upDataSaleGoodsResult.type === 'updata') {
            return this.PproductgetByIdResult.item
          } else if (this.PproductgetByIdResult.item.length == 0 && this.upDataSaleGoodsResult.type === 'updata') {
            return [{
              normalStr: '无规格',
              salePriceView: this.upDataSaleGoodsResult.item.price,
              costPriceView: this.upDataSaleGoodsResult.item.costPriceView,
              marketPriceView: this.upDataSaleGoodsResult.item.marketPrice
            }]
          } else {
            return [{
              normalStr: '无规格',
              salePriceView: this.CouponWithGoodsResult.salePriceView,
              costPriceView: this.CouponWithGoodsResult.costPriceView,
              marketPriceView: this.CouponWithGoodsResult.marketPriceView,
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
      PproductgetByIdResult: {
        handler(newVal, oldVal) {
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
      },
      getProductNormalsResult: {
        handler(newVal, oldVal) {
          let that = this
          //console.log(newVal.title+','+oldVal.title)
          if (this.upDataSaleGoodsResult.type === 'add' && newVal.length > 0) {
            that.salePriceViewPush = []
            newVal.forEach((val, index) => {
              that.salePriceViewPush.push(val.salePriceView)
            })
          } else if (this.upDataSaleGoodsResult.type === 'add' && newVal.length == 0) {
            this.activePrice = this.CouponWithGoodsResult.salePriceView
          }
        },
        deep: true
      },
    },
    activated() {
//    alert(1)
      //this.dialogImageUrl=''
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
        this.activePrice = ''
        this.dialogImageUrl = ''
        this.isAudio = ''
        this.isStatus = 1
        this.value8 = 3
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
        // console.log(1111)
        this.form.sort = this.upDataSaleGoodsResult.item.sort
        this.form.date = this.upDataSaleGoodsResult.item.startDate
        this.form.desc = this.upDataSaleGoodsResult.item.desc
        this.form.trip = this.upDataSaleGoodsResult.item.trip
        this.form.namePrice = this.upDataSaleGoodsResult.item.commission ? this.upDataSaleGoodsResult.item.commission : ''
        this.activePrice = this.upDataSaleGoodsResult.item.price ? this.upDataSaleGoodsResult.item.price : ''
        this.dialogImageUrl = this.upDataSaleGoodsResult.item.indexImage
        this.isAudio = this.upDataSaleGoodsResult.item.isRecommend
        this.isStatus = this.upDataSaleGoodsResult.item.status
        this.value8 = this.upDataSaleGoodsResult.item.plusDate
        this.isSetTop = this.upDataSaleGoodsResult.item.isStick
        this.PproductgetByIdActions(this.upDataSaleGoodsResult.item.id)
        //let oInArr=$('.GetPrice input')
      }

    },
    mounted() {
      this.oDiv = document.getElementsByClassName('el-upload--picture-card')[0]
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'plusProductSaveActions', 'PproductgetByIdActions'
      ]),
      saveProduct() {
        //console.log(this.CouponWithGoodsResult.marketPriceView)
        let data = {
          // id:'',//特卖id
          //appPrices:'',//app售价集合，有规格要传
          // commission:'',//佣金无规格要传
          // commissiones:'',//佣金集合
          // costPrices:'',//成本价集合
          desc: this.form.desc,//描述
          image: this.CouponWithGoodsResult.image,//产品主图链接
          // indexImage:this.dialogImageUrl,//大图
          isRecommend: 1,//是否推荐
          // marketPrice:this.CouponWithGoodsResult.marketPriceView,//原价
          //normalIds:'',//产品库产品上的规格id集合
          // plusProductNormalIds:'',//特卖产品的规格id集合
          //price:this.CouponWithGoodsResult.salePriceView,//售价、、
          // salePrices:'',//售价集合,有规格传
//       productId:this.CouponWithGoodsResult.productIds,//产品库产品id
//       productName:this.CouponWithGoodsResult.productName,//产品名称
          sort: this.form.sort,//排序
          startDate: this.form.date == this.upDataSaleGoodsResult.item.startDate ? this.form.date : this.dateformat(this.form.date),//如:2018-04-12
          trip: this.form.trip,//产品标签
//       normalStrs:''
          status: this.isStatus,
          isStick: this.isSetTop,//是否置顶
          plusDate: this.value8//销售时间
        }
        if (this.dialogImageUrl) {
          data.indexImage = this.dialogImageUrl
          this.imgShow = true
        } else {
          this.imgShow = false
        }
        if (this.upDataSaleGoodsResult.type === 'add') {
          data.productName = this.CouponWithGoodsResult.productName//产品名称
          data.productId = this.CouponWithGoodsResult.productIds//产品库产品id
          data.price = this.CouponWithGoodsResult.salePriceView
          data.marketPrice = this.CouponWithGoodsResult.marketPriceView
          if (this.getProductNormalsResult.length > 0) {
            // let oInput=document.getElementsByClassName('GetPrice')
            let oInArr = $('.GetPrice input')
            let oInArr2 = $('.activePrice input')
            console.log(oInArr[0])
            data.commissiones = this.changePriceApp(Array.prototype.slice.call(oInArr), 5)
            data.appPrices = this.changePriceApp(this.getProductNormalsResult, 1)
            data.normalIds = this.changePriceApp(this.getProductNormalsResult, 2)
            data.salePrices = this.changePriceApp(Array.prototype.slice.call(oInArr2), 5)
            data.costPrices = this.changePriceApp(this.getProductNormalsResult, 4)
            data.normalStrs = this.changePriceApp(this.getProductNormalsResult, 6)
            data.marketePrices = this.changePriceApp(this.getProductNormalsResult, 10)//市场价
            data.costPrice = this.CouponWithGoodsResult.costPriceView

          } else {
            data.commission = this.form.namePrice
            data.price = this.activePrice
            data.marketPrice = this.CouponWithGoodsResult.marketPriceView//市场价
            data.costPrice = this.CouponWithGoodsResult.costPriceView
          }
        } else {
          data.productName = this.CouponWithGoodsResult.productName,//产品名称
            data.productId = this.upDataSaleGoodsResult.item.productId//产品库产品id
          console.log(this.form.date, this.upDataSaleGoodsResult.item.startDate)
          //data.marketPrice=this.upDataSaleGoodsResult.item.marketPrice
          data.price = this.upDataSaleGoodsResult.item.price
          data.marketPrice = this.upDataSaleGoodsResult.item.marketPrice
          data.id = this.upDataSaleGoodsResult.item.id
          if (this.PproductgetByIdResult.item.length > 0) {
            data.plusProductNormalIds = this.changePriceApp(this.PproductgetByIdResult.item, 2)
            // let oInput=document.getElementsByClassName('GetPrice')
//         data.commissiones=this.changePriceApp(Array.prototype.slice.call(oInArr),5)
            data.commissiones = this.priceListUpdata.join(',')
            data.salePrices = this.activeUpdata.join(',')
            data.appPrices = this.changePriceApp(this.PproductgetByIdResult.item, 1)
            data.normalIds = this.changePriceApp(this.PproductgetByIdResult.item, 7)
            // data.salePrices=this.changePriceApp(this.PproductgetByIdResult.item,3)
            data.costPrices = this.changePriceApp(this.PproductgetByIdResult.item, 4)
            data.costPrice = this.upDataSaleGoodsResult.item.costPrice
            data.normalStrs = this.changePriceApp(this.PproductgetByIdResult.item, 6)
            data.marketePrices = this.changePriceApp(this.PproductgetByIdResult.item, 10)
          } else {
            data.commission = this.form.namePrice
            data.price = this.activePrice
            data.marketPrice = this.upDataSaleGoodsResult.item.marketPrice
            data.costPrice = this.upDataSaleGoodsResult.item.costPrice
          }
        }
        if (this.imgShow) {
          this.plusProductSaveActions(data)
          this.$emit('to-change', this.backTitle)
        } else {
          this.$message({
            message: '特卖大图不可不传',
            type: 'warning'
          })
        }

//      this.$message({
//        message:'操作成功',
//        type:'success'
//      })
      },
//    updataGoodsData(){
//      let oInArr=$('.GetPrice input')
//      let data={
//        id:this.upDataSaleGoodsResult.item.id,
//        startDate:this.dateformat(this.form.date),
//        desc:this.form.desc,
//        trip:this.form.trip,
//        isRecommend:this.isAudio,
//        sort:this.form.sort,
//        indexImage:this.dialogImageUrl
//      }
//      if(this.PproductgetByIdResult.length >0){
//        data.normalStrs=this.changePriceApp(this.PproductgetByIdResult,6)
//        data.normalIds=this.changePriceApp(this.PproductgetByIdResult,2)
//        data.commissiones=this.changePriceApp(Array.prototype.slice.call(oInArr),5)
//      }else{
//        data.commission=this.form.namePrice
//      }
//      this.plusProductSaveActions(data)
//      this.$emit('to-change',this.backTitle)
//    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      upSuccessfirst(response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      upLoad() {
        this.oDiv.click()
      },
      dateformat(data) {
        if (data) {
          let year = data.getFullYear()
          let month = data.getMonth() + 1
          let day = data.getDate()
          // let hour= data.getHours()
          // let min=data.getMinutes()
          // let sec=data.getSeconds()
          //console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
          return year + '-' + month + '-' + day
        }
      },
      changePriceApp(arr, key) {
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
      disData(time) {
        return time.getTime() < Date.now() - 24 * 3600 * 1000
      }

    }
  }
</script>

<style lang="scss">
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
    .el-input {
      width: 60%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-form-item__label {
      color: #000000
    }
  }

  #SaleNewone div.el-upload--picture-card {
    position: relative;
    display: none;
  }
</style>
