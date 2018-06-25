<template>
  <div class="seach-list" id="SaleNewone">
    <el-form>
      <el-form-item label="账号昵称:">
        <el-input v-model="isName" placeholder="请输入昵称" size="mini" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="头像:">
        <!--<el-input v-model="isHeader" placeholder="请输入昵称" size="mini"></el-input>-->
        <el-upload
          class="upload-demo"
          action="apis/admin/buildblocks/uploadImage"
          :show-file-list="false"
          name="img"
          :on-success="upSuccessfirst">
          <div style="margin: 10px 0 0px 10px;">
            <img :src="dialogImageUrl" alt="" style="height: 100px;width: 100px;margin-right: 15px;border-radius: 50%;"
                 class="valign" v-if="dialogImageUrl">
            <el-button size="small" type="primary">点击上传</el-button>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号说明:">
        <el-input v-model="isMsg" placeholder="请输入昵称" size="mini" style="width: 300px;" :maxlength="30"></el-input>
        <span style="font-size: 12px;color: orange;">（30个字符，后台可见）</span>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain style="width:100px;margin-left: 50px;margin-top: 50px;" size="small"
               @click="upOk()">保存
    </el-button>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    name: 'newNumber',
    data () {
      return {
        isName: '',
        dialogImageUrl: '',
        isMsg: ''
      }
    },
    computed: {
      ...mapGetters([]),

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

    },
    mounted () {
      this.findAccountActions()
    },
    methods: {
      ...mapActions([
        'popoverAlert','findAccountActions'
      ]),
      upSuccessfirst (response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      upOk () {
          this.$router.push('1-4')
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
