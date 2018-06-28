<template>
  <div class="seach-list" id="SaleNewone">
    <el-form>
      <el-form-item label="标题:" label-width="100px">
        <el-input v-model="isName" placeholder="请输入标题" size="mini" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="资源类型:" label-width="100px">
        <el-radio-group v-model="isClass">
          <el-radio :label="1">图片</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片:" v-if="isClass===1" label-width="100px">
        <div style="display: flex;flex-wrap: wrap;">
          <div v-for="(item,index) in dialogImageUrl" v-if="dialogImageUrl.length>0" style="position: relative;">
            <i class="el-icon-close cu" style="position: absolute;right:0;z-index:100;font-size: 16px;color: red;"
               @click="deleteImg(item,index)"></i>
            <img :src="item.linkUrl" alt="" style="height: 100px;width: 100px;" class="valign">
          </div>
        </div>
        <el-upload
          class="upload-demo"
          action="apis/admin/buildblocks/uploadImage"
          :show-file-list="false"
          name="img"
          multiple
          :on-success="upSuccessfirst1">
          <div style="margin: 10px 0 0px 10px;">
            <div style="margin-left: 15px;">
              <el-button size="small" type="primary">点击上传</el-button> <span style="font-size: 12px;color: orange;">（图片最多9张）</span>
            </div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频:" label-width="100px" v-else>
        <!--<el-input v-model="isHeader" placeholder="请输入昵称" size="mini"></el-input>-->
        <div style="display: flex;flex-wrap: wrap;">
          <div style="position: relative;" v-if="dialogImageUrl2.length>0">
            <i class="el-icon-close cu" style="position: absolute;right:0;z-index:100;font-size: 16px;color: red;"
               @click="deleteImg(dialogImageUrl2[0],0)"></i>
            <video :src="dialogImageUrl2[0].linkUrl" style="height: 100px;width: 100px;margin-right: 15px;vertical-align: middle;"></video>
          </div>
        </div>
        <el-upload
          class="upload-demo"
          action="apis/admin/buildblocks/uploadImage"
          :show-file-list="false"
          name="img"
          :on-success="upSuccessfirst2">
          <div style="margin: 10px 0 0px 10px;">
            <el-button size="small" type="primary">点击上传</el-button>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容:" label-width="100px">
        <el-input v-model="isMsg" placeholder="请输入内容" size="mini" style="width: 600px;" :maxlength="300" type="textarea"
                  :rows="5"></el-input>
        <span style="font-size: 12px;color: orange;">（最多300个字符）</span>
      </el-form-item>
      <el-form-item label="是否置顶:" label-width="100px">
        <el-radio-group v-model="isSetTop">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" label-width="100px">
        <el-input v-model="isSort" placeholder="请输入内容" size="mini" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="关联产品:" label-width="100px">
        <el-input v-model="CouponWithGoodsResult.productName" placeholder="请输入内容" size="mini"
                  style="width: 400px;"></el-input>
        <el-button size="mini" type="success" @click="alertAddGoods(1)">关联试用商品</el-button>
        <el-button size="mini" type="success" @click="alertAddGoods(2)">关联特卖商品</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain size="small" style="margin:50px 100px 50px;" @click="addMsg()">确认提交</el-button>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    props: ['msg', 'msgData'],
    name: 'newMsg',
    data() {
      return {
        isName: '',
        dialogImageUrl: [],
        newImg: [],
        newVideo: [],
        dialogImageUrl2: [],
        isMsg: '',
        isClass: 1,
        isSetTop: 1,
        isSort: '',
        isLength:0
      }
    },
    computed: {
      ...mapGetters([
        'CouponWithGoodsResult', 'CouponWithGoodsResult'
      ]),

    },
    watch: {
//      PproductgetByIdResult: {
//        handler (newVal, oldVal) {
//          let that = this
//          console.log(newVal.title + ',' + oldVal.title)
//          if (newVal.title == oldVal.title) {
//            that.priceListUpdata = []
//            that.activeUpdata = []
//            newVal.item.forEach((val, index) => {
//              that.priceListUpdata.push(val.commission)
//              that.activeUpdata.push(val.salePriceView)
//            })
//            //console.log(this.priceListUpdata)
//          }
//        },
//        deep: true
      //     },
    },
    activated() {
      this.newImg = []
      this.isLength = 0
      if (this.msgData.type === 'add') {
        this.isName = ''
        this.dialogImageUrl = []
        this.dialogImageUrl2 = ''
        this.isMsg = ''
        this.isClass = 1
        this.isSetTop = 1
        this.isSort = ''
        let obj = {
          togetherProductIds: '',
          productType: '',
          productIds: '',
          marketPriceView: '',
          price: '',
          productName: '',
          costPriceView: '',//成本价
          salePriceView: '',//销售价
          image: ''//销售价
        }
        this.$store.commit('Coupon_With_Goods', obj)
      } else {
        this.dialogImageUrl=[]
        this.$http.get('http://test-admin.olquan.cn/admin/find/getById', {
          params: {id: this.msgData.item.id}
        }).then(res => {
//          res.data.result.fileDtos.forEach((val, key) => {
//            this.dialogImageUrl.push(val.linkUrl)
//          })
          this.dialogImageUrl=res.data.result.fileDtos
          this.isLength=res.data.result.fileDtos.length
          this.isClass = res.data.result.fileDtos[0].type
          this.dialogImageUrl2 = res.data.result.fileDtos
        })
        this.isName = this.msgData.item.title
//        this.dialogImageUrl = this.msgData.item.linkUrls.split(',')//资源链接集合
        this.isMsg = this.msgData.item.content
//        this.isClass = this.msgData.item.type//资源类型
        this.isSetTop = this.msgData.item.isStick
        this.isSort = this.msgData.item.sort
        let obj = {
          togetherProductIds: '',
          productType: this.msgData.item.productType,
          productIds: this.msgData.item.productId,
          marketPriceView: '',
          price: '',
          productName: this.msgData.item.productName,
          costPriceView: '',//成本价
          salePriceView: '',//销售价
          image: ''//销售价
        }
        this.$store.commit('Coupon_With_Goods', obj)
      }
    },
    mounted() {

    },
    methods: {
      ...mapActions([
        'popoverAlert', 'findSaveMsgActions','deleteOnlyfileIdActions'
      ]),
      upSuccessfirst1(response, file, fileList) {
        if(this.dialogImageUrl.length<9){
          this.dialogImageUrl.push({linkUrl:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result})
          this.newImg.push('https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result)
        }else{
          this.$message({
            message:'图片最多9张',
            type:'warning'
          })
        }

      },
      upSuccessfirst2(response, file, fileList) {
        this.dialogImageUrl2=[]
        this.newVideo=[]
        this.dialogImageUrl2.push({linkUrl:'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result})
        this.newVideo.push('https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result)
      },
      alertAddGoods(key) {
        if (key === 1) {
          this.$store.commit('changeRadios', '试用商品')
          this.popoverAlert(['vAddGoods', 'find'])
        } else {
          this.$store.commit('changeRadios', '专享商品')
          this.popoverAlert(['vAddGoods', 'find'])
        }
      },
      deleteImg(val,key) {
        if(val.fileId){
          this.deleteOnlyfileIdActions(val)
        }
        if(this.isClass===1){
          this.dialogImageUrl.splice(key, 1)
          this.newImg.splice(key-this.isLength, 1)
        }else{
          this.dialogImageUrl2.splice(0, 1)
          this.newVideo.splice(0, 1)
        }

      },
      addMsg() {
        let obj = {
//          accountId: '',
//          id:'',
          content: this.isMsg,
          isStick: this.isSetTop,
//          linkUrls: this.dialogImageUrl.join(','),
          productId: this.CouponWithGoodsResult.productIds,
          productName: this.CouponWithGoodsResult.productName,
          productType: this.CouponWithGoodsResult.productType,
          sort: this.isSort,
          title: this.isName,
          type: this.isClass
        }
        if(this.isClass===1){
          obj.linkUrls=this.newImg.join(',')
        }else{
          obj.linkUrls=this.newVideo.join(',')
        }
        if (this.msgData.type === 'add') {
//          alert(this.msgData.item.id)
          obj.accountId = this.msgData.id
//          console.log(this.CouponWithGoodsResult)
//          console.log(obj)
          this.findSaveMsgActions(obj)
          let data = {
            title: 'vSeach',
            data: '',
            id: '',
            which:1
          }
          if(this.msgData.which===2){
            data.title='vListmsg'
          }
          this.$emit('to-change', data)
        } else {
//          obj.accountId = this.msgData.item.id
          obj.id = this.msgData.item.id
          this.findSaveMsgActions(obj)
          let data = {
            title: 'vListmsg',
            data: '',
            id: this.msgData.id,
            which:1
          }
          if(this.msgData.which===5){
            data.title='vSeachmsg'
          }
          this.$emit('to-change', data)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
  }

</style>
