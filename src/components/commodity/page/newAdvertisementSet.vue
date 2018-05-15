<template>
  <div class="seach-list" id="SaleNewTwo">
    <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="名称:">
        <el-input v-model="isName" size="small" ></el-input>
        <!--<el-button type="success" size="mini" round style="margin-left: 15px;" @click="popoverAlert(['VchoseGoods','one'])" v-if="upDataSaleGoodsResult.type==='add'">选择产品</el-button>-->
      </el-form-item>
      <el-form-item label="图片:">
        <div style="display: flex;">
          <img :src="dialogImageUrl" alt="" style="height: 78px;width: 78px;" class="valign" v-if="dialogImageUrl">
          <el-button size="mini" plain @click="upLoad()" style="height: 30px;margin: 25px 0 0 10px;">上传图片</el-button>
        </div>
        <el-upload
          action="apis/admin/buildblocks/uploadImage"
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
      <el-form-item label="类型:">
        <el-radio-group v-model="isType"><!--:disabled="classWh === '1'"-->
          <el-radio :label=1>试用频道轮播</el-radio>
          <el-radio :label=2>拼团频道轮播</el-radio>
          <el-radio :label=3>特卖频道轮播</el-radio>
          <el-radio :label=4>试用频道banner</el-radio>
          <el-radio :label=5>特卖频道banner</el-radio>
          <el-radio :label=6>拼团频道banner</el-radio>
          <el-radio :label=7>试用弹窗</el-radio>
          <el-radio :label=8>特卖弹窗</el-radio>
          <el-radio :label=9>拼团弹窗</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接:">
        <div style="">
        <el-radio-group v-model="radio2" @change="choseGoods(radio2)">
          <el-radio :label="item.which" v-for="(item,index) in labelList" :key="index">{{item.title}}</el-radio>
        </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="活动选择:" v-if="radio2===29">
        <el-select v-model="value" placeholder="请选择活动" size="mini" @change="addImgUrl(value)">
          <el-option
            v-for="item in listActiveResult.result"
            :key="item.id? item.id : ''"
            :label="item.name ? item.name : ''"
            :value="item.name ? item.name : ''">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排期:">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="isDate" style="width:200px;" size="small"></el-date-picker>
          </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="saveProduct()" size="small">立即添加</el-button>
        <!--<el-button type="primary" plain @click="saveProduct()" size="small" v-else>提交修改</el-button>-->
        <!--<el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'newAdvertisementSet',
  data () {
    return {
      backTitle:'SeachList',
      isType:'',
      isSort:'',
      isName:'',
      input:'',
      value:'',
      isDate:'',
      dialogImageUrl:'',
      dialogVisible: false,
      form:{},
      labelList:[
        {title:'拼团首页', which:2},
        {title:'拼团秒杀列表', which:6},
        {title:'拼团秒杀产品详情', which:7},
        {title:'正常拼团产品详情', which:1},
        {title:'超值拼列表', which:8},
//          {title:'普通产品详情', which:9},
        {title:'拼洋货列表', which:10},
        {title:'拼大牌列表', which:11},
        {title:'清仓拼列表', which:12},
        {title:'保险', which:4},
        {title:'开通粉领', which:3},
        {title:'粉领续费', which:32},
        {title:'粉领专享', which:5},
        //{title:'积分试用列表', which:13},
        {title:'试用产品详情', which:14},
        {title:'全球购列表', which:15},
        {title:'家居日用首页', which:16},
        {title:'品牌馆', which:17},
        {title:'试用', which:19},
        {title:'产品详情', which:20},
        {title:'品牌特卖', which:21},
        {title:'限时购', which:22},
        {title:'自营超市', which:23},
        {title:'美妆首页', which:26},
        {title:'今日上新', which:27},
        {title:'活动', which:29},
        {title:'小金库充值', which:30},
        {title:'无链接', which:31},
      ],
      radio2:''
    }
  },
  computed:{
    ...mapGetters([
'CouponWithGoodsResult','upDataSaleGoodsResult','listActiveResult'
    ]),

  },
  activated(){

  },
  mounted(){
    this.oDiv=document.getElementsByClassName('el-upload--picture-card')[0]
  },
  methods: {
    ...mapActions([
      'popoverAlert','listActiveActions'
    ]),
    saveProduct() {

    },
    change () {
      if(this.radio2===17){
        let index=this.input.indexOf('=')
        //this.$set(this.commodityResult.contents[this.num],'typeId',parseInt(this.input.substring(index+1)))
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upSuccessfirst(response, file, fileList){
      this.dialogImageUrl='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
    upLoad(){
      this.oDiv.click()
    },
    dateformat(data) {
      if(data){
        let year=data.getFullYear()
        let month=data.getMonth()+1
        let day= data.getDate()
       // let hour= data.getHours()
       // let min=data.getMinutes()
       // let sec=data.getSeconds()
        //console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
        return year+'-'+month+'-'+day
      }
    },
//    addType(type){
//      this.$set(this.commodityResult.contents[this.num],'type',type)
//    },
//    addTypeId(id){
//      this.$set(this.commodityResult.contents[this.num],'typeId',id)
//    },
    choseGoods(key){
      if(key===1){//............
        this.$store.commit('changeRadios','拼团商品')
        this.$store.commit('pinTuanOr',1)
        this.popoverAlert('vAddGoods')
      }else if(key===2){
        this.input='http://ol-h5-preview.olquan.cn/index/newIndex'
       // this.addType(10)
      }else if(key===3){
        this.input='http://ol-site.olquan.com/weixin/member/openStore'
       // this.addType(11)
      }else if(key===32){
        this.input='http://ol-site.olquan.com/weixin/member/renewConfirmOrder'
        //this.addType(19)
      }else if(key===4){
        this.input='http://www.ins-box.com/channelcps?channelCode=966262c61960ed971942347b443c7743&to=http://www.ins-box.com/pagecontent?pageContentId=100044'
       // this.addType(16)
      }else if(key===5){
        this.input='http://ol-h5-preview.olquan.cn/mine/index'
        //this.addType(13)
      }else if(key===6){
        this.input='http://ol-h5-preview.olquan.cn/index/hotsale'
        //this.addType(14)
      }else if(key===7){//...........
        this.$store.commit('changeRadios','拼团商品')
        this.$store.commit('pinTuanOr',7)
        this.popoverAlert('vAddGoods')
      }else if(key===8){
        this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/1'
        //this.addType(15)
       // this.addTypeId(1)
      }else if(key===10){
        this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/4'
        //this.addType(15)
        //this.addTypeId(4)
      }else if(key===11){
        this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/2'
        //this.addType(15)
       // this.addTypeId(2)
      }else if(key===12){
        this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/5'
       // this.addType(15)
       // this.addTypeId(5)
      }else if(key===14){//.............
        this.$store.commit('changeRadios','积分试用商品')
        this.popoverAlert('vAddGoods')
      }else if(key===15){
        this.input='http://ol-site.olquan.com/weixin/auth?view=/weixin/globalShopping/vm'
        //this.addType(7)
      }else if(key===16){
        this.input='http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse?districtId=330185'
        //this.addType(6)
      }else if(key===17){
        this.input='http://ol-site.olquan.com/weixin/product/product?brandCode='
        //this.addType(17)
        this.popoverAlert('VclassSell')
      }else if(key===19){
        this.input='http://ol-h5-preview.olquan.cn/try/moretry'
        //this.addType(1)
      }else if(key===20){//..................
        this.$store.commit('changeRadios','普通商品')
        this.popoverAlert('vAddGoods')
      }else if(key===21){
        this.input='http://ol-site.olquan.com/ol/weixin/index/indexRecommendBrand'
        //this.addType(3)
      }else if(key===22){
        this.input='http://ol-site.olquan.com/weixin/limitBuy/limitBuy'
       // this.addType(4)
      }else if(key===23){
        this.input='http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse'
       // this.addType(5)
      }else if(key===26){
        this.input='http://ol-site.olquan.com/weixin/auth?view=http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse?districtId=330104'
        //this.addType(8)
      }else if(key===27){
        this.input='http://ol-site.olquan.com/weixin/product/product?isNew=1'
        //this.addType(9)
      }else if(key===29){
        this.input=''
        //this.addType(18)
        this.listActiveActions()
      }else if(key===30){
        this.input='http://ol-site.olquan.com/weixin/member/coffersRecharge'
       // this.addType(12)
      }else if(key===31){
        this.input='#'
       // this.addType(0)
      }
    },
    addImgUrl(){

    }
  }
}
</script>

<style lang="scss">
  #SaleNewTwo.seach-list{
    margin-top:16px;
    padding-left:30px;
    .el-input{
      width:250px;
    }
    .el-form-item{
      margin-bottom: 15px;
    }
    .el-radio-group{
      display: flex;flex-wrap: wrap;
      background: rgba(242, 242, 242, 1);
      padding:10px 10px 0 10px;
      width:750px;
      .el-radio+.el-radio{
        margin:0 0 10px 0;
      }
      label.el-radio{
       display: inline-block; width:150px;
      }
    }
  }
  #SaleNewTwo div.el-upload--picture-card{
    position: relative;
    display: none;
  }
</style>
