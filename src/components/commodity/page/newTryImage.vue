<template>
  <div class="seach-list" id="SaleNew">
    <div>
              <label>新品首发:</label>
              <el-upload
                class="upload-demo"
                :show-file-list="false"
                name="img"
                :on-success="upSuccessfirst2"
                action="apis/admin/buildblocks/uploadImage">
                <div  style="margin: 10px 0 0px 0px;">
                  <img :src="dialogImageUrl2" alt="" class="valign" v-if="dialogImageUrl2">
                  <el-button size="mini" plain >点击上传</el-button>
                  <span style="font-size: 12px;color: orange;">图标尺寸 71 : 28</span>
                </div>
              </el-upload>
    </div>
    <div>
        <label>试海外:</label>
         <el-upload
           class="upload-demo"
           :show-file-list="false"
           name="img"
           :on-success="upSuccessfirst"
           action="apis/admin/buildblocks/uploadImage">
           <div  style="margin: 10px 0 0px 0px;">
             <img :src="dialogImageUrl" alt="" class="valign" v-if="dialogImageUrl">
             <el-button size="mini" plain >点击上传</el-button>
             <span style="font-size: 12px;color: orange;">图标尺寸 71 : 28</span>
           </div>
         </el-upload>
    </div>
    <el-button type="primary" plain @click="saveProduct()" size="small">立即添加</el-button>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'newTryImage',
  data () {
    return {
      backTitle:'seachOnTrialGoods',
        classArr:[{title:'规格',which:'normalStr',width:'300'},
          {title:'销售价',which:'salePriceView',width:'110'},
          {title:'保证金',which:'salePrices',width:'110'},
          {title:'剩余库存',which:'store',width:'110'},
          {title:'试用库存',which:'normalStores',width:'110'}]
      ,
      dialogImageUrl:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/d1f57aba4fd8146ae10706ec919f23dc8bac8bfa',
      dialogImageUrl2:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/d1f57aba4fd8146ae10706ec919f23dc8bac8bfa',
    }
  },
  computed:{
    ...mapGetters([
'CouponWithGoodsResult'
    ]),
  },
  watch:{
//    FreeUseProductNormalsResult: {
//      handler (newVal,oldVal) {
//        let that=this
//       // console.log(newVal.title+','+oldVal.title)
//       if(newVal.title == oldVal.title){
//         that.priceListUpdata=[]
//         that.UpdataGoodsStore=[]
//         that.BondMoney=[]
//         newVal.item.forEach((val,index)=>{
//          that.priceListUpdata.push(val.store)
//          that.UpdataGoodsStore.push(val.store)
//          that.BondMoney.push(val.salePriceView)
//        })
//         //console.log(this.priceListUpdata)
//       }
//      },
//      deep: true
//    }
  },
  activated(){

  },
  mounted(){

  },
  methods: {
    ...mapActions([
      'popoverAlert',
    ]),
    saveProduct() {
      let data={
        sort:this.form.sort,
        status:this.isStatus,
        image:this.dialogImageUrl,
        type:this.typeTrial,
      }

    },
    upSuccessfirst(response, file, fileList){
      this.dialogImageUrl='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
    upSuccessfirst2(response, file, fileList){
      this.dialogImageUrl2='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },


  }
}
</script>

<style lang="scss" scoped>
  #SaleNew.seach-list{
    font-size: 16px;
    margin-top:16px;
    padding-left:30px;
      label {
        margin-top: 5px;
        display: inline-block;
        width: 120px;
        text-align: right;
        margin-right: 10px;
      }
    & > div{
      display:flex;
      margin-bottom: 30px;
    }
    img{
      display:inline-block;
      width:200px;
      height:160px;
    }
  }
    .el-button--small, .el-button--small.is-round{
      width:100px;
      margin:0 auto;
      display: block;
    }


</style>
