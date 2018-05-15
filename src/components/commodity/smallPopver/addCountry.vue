<template>
  <div class="seach-list demo incomingHistory">
    <div class="popover-head">
      <span class="title">新增国家：</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <!-- <div class="popover-main">
       <p><label>销售价：</label> <el-input v-model="salePrice" size="small"></el-input></p>
       <p><label>成本价：</label> <el-input v-model="salePrice" size="small"></el-input></p>
       <p><label>佣金：</label> <el-input v-model="salePrice" size="small"></el-input></p>
     </div>-->
    <div class="popover-main">
      <p><label>国家：</label>
        <el-input v-model="name" size="mini"></el-input>
      </p>
      <div style="display: flex;margin: 20px 0">
        <label>国家图标：</label>
        <img :src="ImageUrl" alt="" style="height: 78px;width: 78px;" class="valign" v-if="ImageUrl">
        <!--<el-button size="mini" plain @click="upLoad()" style="height: 30px;margin: 25px 0 0 10px;">上传图片</el-button>-->
      </div>
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        name="img"
        :on-success="upSuccessfirst"
        action="apis/admin/buildblocks/uploadImage"
        :on-preview="handlePreview"
        :on-remove="handleRemove">
        <div style="margin: 0 0 30px 100px;">
          <el-button size="mini" type="primary">点击上传</el-button>
          <span style="font-size: 12px;color: orangered;">图标尺寸：14 : 9</span>
        </div>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
      <el-button type="primary" plain @click="onSubmit" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    name: 'newGoods',
    data () {
      return {
        name: '',
        ImageUrl: '',
        oDiv: '',
        fileList2: []
      }
    },
    computed: {
      ...mapGetters([
        'loading', 'popoverAlive'
      ]),

    },
    created () {

    },
    mounted () {
      this.oDiv = document.getElementsByClassName('upLoadImgCountry')[0]
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'AddNewCountryActions'
      ]),
      upSuccessfirst (response, file, fileList) {
        this.ImageUrl = 'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      upLoad () {
        this.oDiv.click()
      },
      onSubmit () {
        let data = {
          countryIcon: this.ImageUrl,
          countryName: this.name
        }
        if (data.countryIcon && data.countryName) {
          this.AddNewCountryActions(data)
          this.popoverAlert()
        } else {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          })
        }
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      dateformat (data) {
        if (data) {
          let year = data.getFullYear()
          let month = data.getMonth() + 1
          let day = data.getDate()
          return year + '-' + month + '-' + day
        }
      },

    }
  }
</script>

<style scoped lang="scss">
  .demo {
    // position: fixed;
    width: 300px;
    /*height: 220px;*/
    background: #F0FAFF;
    margin-left: -150px;
    margin-top: -220px;
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
      margin-top: 15px;
    }
    label {
      width: 60px;
      display: inline-block;
    }
    .el-button {
      margin: 0 auto;
      display: block;
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
    label {
      text-align: right;
    }
  }

  .popover-main .box-top {
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid #C5E2F0;
  }
</style>
