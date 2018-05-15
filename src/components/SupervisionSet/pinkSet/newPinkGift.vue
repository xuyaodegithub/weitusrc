<template>
  <div id="newGift">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="礼包名称:">
        <el-input v-model="isName" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="产品名称:">
        <el-input v-model="CouponWithGoodsResult.productName" size="small" disabled style="width: 350px;" v-if="msg.type==='create'"></el-input>
        <el-input v-model="isProductName" size="small" disabled style="width: 350px;" v-else></el-input>
        <el-button type="success" round @click="choseGoods()" size="mini" v-if="msg.type=='create'">选择产品</el-button>
      </el-form-item>
      <el-form-item label="礼包图片:">
        <div style="display: flex;">
          <img :src="dialogImageUrl" alt="" style="height: 78px;width: 78px;" class="valign" v-if="dialogImageUrl">
          <el-upload
            class="upload-demo"
            action="apis/admin/buildblocks/uploadImage"
            name="img"
            :show-file-list="false"
            :on-success="upSuccessfirst">
            <el-button size="small" type="primary" style="margin: 25px 0 0 10px">点击上传</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="saveProduct()" size="small" style="margin-top: 35px">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:['msg'],
  name: 'newPinkGift',
  data () {
    return {
      isName:'',
      dialogImageUrl:'',
      isProductName:'',
      form:{}
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','CouponWithGoodsResult'
    ])
  },
  components:{

  },
    activated(){
      if(this.msg.type==='create'){
        this.isName=''
        this.isProductName=''
        this.dialogImageUrl=''
      }else{
        this.isName=this.msg.item.name
        this.isProductName=this.msg.item.productName
        this.dialogImageUrl=this.msg.item.image
      }
    },
  methods: {
    ...mapActions([
'popoverAlert','storeGiftBagSave1Actions'
    ]),
    saveProduct(){
      let data={
        //id:'',
        image:this.dialogImageUrl,
        name:this.isName,
        type:1
       // productId:this.CouponWithGoodsResult.productIds,
       // productImage:this.CouponWithGoodsResult.image,
        //productName:this.CouponWithGoodsResult.productName
      }
      if(this.msg.type==='create'){
        data.productId=this.CouponWithGoodsResult.productIds
        data.productImage=this.CouponWithGoodsResult.image
        data.productName=this.CouponWithGoodsResult.productName
      }else{
        data.id=this.msg.item.id
      }
      this.storeGiftBagSave1Actions(data)
      this.$emit('to-up',{title:'giftList'})
    },
    choseGoods(){
      this.popoverAlert(['VchoseGoods','one'])
    },
    upSuccessfirst(response, file, fileList){
      this.dialogImageUrl='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
  }
}
</script>

<style scoped lang="scss">
  #newGift{
   // margin-top:26px;
    padding-left:15px;
  .el-input{
    width:250px;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
    .el-button{
      width:100px;
    }
  }
</style>
