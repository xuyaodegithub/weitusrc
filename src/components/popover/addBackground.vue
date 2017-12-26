<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">添加背景</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p style="text-align: center">
        <el-radio v-model="radio" label="1">背景图片</el-radio>
        <el-radio v-model="radio" label="2">背景颜色</el-radio>
      </p>
      <p v-if="radio==1" style="text-align: center">
        <i style="display: inline-block;width: 200px;height: 100px;margin-bottom: 15px;">
        <img :src="img | ToUrl" alt="" style="width: 200px;height: 100px;" v-if="img">
        </i>
        <el-upload
          class="upload-demo"
          ref="upload"
          name="img"
          :show-file-list=false
          action="/apis/uploadImage"
          :on-success="upSuccess"
          :on-error="upErre"
          :file-list="fileList"
          list-type="picture">
          <el-button slot="trigger" size="mini" type="success" plain>添加图片</el-button>
        </el-upload>
      </p>
      <div v-if="radio==2" style="text-align: center">
        <el-color-picker v-model="color"></el-color-picker>
        <p style="margin-top: 20px;"><label> 背景颜色:</label><el-input v-model="color" size="mini"></el-input></p>
      </div>
    </div>
    <p style="text-align: right;padding-right: 30px;">
    <el-button type="primary" plain size="mini" @click="addColor()">确定</el-button>
    </p>
  </div>
</template>

<style scoped>
  .demo{
    width: 400px;
    height: 300px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -220px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
    position: relative;
  }
  .popover-head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }
  .popover-head i{
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }
  .popover-head .title{
    margin-left: 15px;
    font-weight: bold;
  }
  .popover-main{
    padding: 20px 12.5px;
    padding-bottom: 0px;
    width: calc(100% - 25px);
  }
  .popover-main .el-input{
    width:200px;
  }
  .popover-main p{
    margin-bottom: 15px;
  }
  .popover-main label{
    margin-right:10px;
  }
  .demo > p:last-child .el-button{
    position: absolute;
    right: 30px;
    bottom:20px;
  }
  .el-button{
    width: 100px;
  }
  .el-checkbox+.el-checkbox:nth-child(4){
    margin-left: 0;
  }
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        input: '',
        checkList: [],
        radio:'',
        img:'',
        color:'#409EFF',
        fileList:[]

      }
    },
    computed: {
      ...mapGetters([
        'popoverAlive'
      ])
    },
    methods: {
      ...mapActions([
        'popoverAlert','addCommodityActions','backColorActions'
      ]),
      addColor () {
       let obj={}
        obj.name='背景设置'
        if(this.radio=='1'){
          obj.modelSampleCode='imgUrl'
        }
        if(this.radio=='2'){
          obj.modelSampleCode='color'
        }
        obj.contents= this.radio=='1' ? 'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+this.img : this.color
        console.log(JSON.stringify(obj))
        this.backColorActions(obj)
      },
      upSuccess (response) {
        this.$message({
          message:'上传成功',
          type:'warning'
        })
        this.img=response.result
      },
      upErre () {

      }
    }
  };
</script>
