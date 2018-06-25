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
        <el-upload
          class="upload-demo"
          action="apis/admin/buildblocks/uploadImage"
          :show-file-list="false"
          name="img"
          :on-success="upSuccessfirst1">
          <div style="margin: 10px 0 0px 10px;">
            <img :src="dialogImageUrl" alt="" style="height: 100px;width: 100px;margin-right: 15px;" class="valign"
                 v-if="dialogImageUrl">
            <el-button size="small" type="primary">点击上传</el-button>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频:" label-width="100px" v-else>
        <!--<el-input v-model="isHeader" placeholder="请输入昵称" size="mini"></el-input>-->
        <el-upload
          class="upload-demo"
          action="apis/admin/buildblocks/uploadImage"
          :show-file-list="false"
          name="img"
          :on-success="upSuccessfirst2">
          <div style="margin: 10px 0 0px 10px;">
            <video :src="dialogImageUrl2" style="height: 100px;width: 100px;margin-right: 15px;vertical-align: middle;"
                   v-if="dialogImageUrl2"></video>
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
        <el-input v-model="isSort" placeholder="请输入内容" size="mini" style="width: 400px;"></el-input>
        <el-button size="mini" type="success" @click="alertAddGoods(1)">关联试用商品</el-button>
        <el-button size="mini" type="success" @click="alertAddGoods(2)">关联特卖商品</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain size="small" style="margin:50px 100px 50px;">确认提交</el-button>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    name: 'newMsg',
    data () {
      return {
        isName: '',
        dialogImageUrl: '',
        dialogImageUrl2: '',
        isMsg: '',
        isClass: 1,
        isSetTop: 1,
        isSort: '',
      }
    },
    computed: {
      ...mapGetters([
        'CouponWithGoodsResult'
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
    activated () {
      this.isName = ''
      this.dialogImageUrl = ''
      this.dialogImageUrl2 = ''
      this.isMsg = ''
      this.isClass = 1
      this.isSetTop = 1
      this.isSort = ''
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert',
      ]),
      upSuccessfirst1 (response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      upSuccessfirst2 (response, file, fileList) {
        this.dialogImageUrl2 = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      alertAddGoods (key) {
        if (key === 1) {
          this.$store.commit('changeRadios', '试用商品')
          this.popoverAlert(['vAddGoods', 'find'])
        } else {
          this.$store.commit('changeRadios', '专享商品')
          this.popoverAlert(['vAddGoods', 'find'])
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
