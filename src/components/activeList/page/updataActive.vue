<template>
  <div id="newActive">
    <p><label>活动名称:</label><el-input v-model="name" placeholder="请输入活动名称" size="small"></el-input></p>
    <p><label>活动编号:</label><el-input v-model="code" placeholder="请输入活动编号" size="small"></el-input></p>
    <p><label>活动时间:</label><el-date-picker
      size="small"
      v-model="value4Result"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    </p>
    <p><label>活动分享图片:</label><el-input v-model="shareImg" size="small" style="width: 400px;"></el-input>
      <el-upload
        class="upload-demo"
        ref="uploadfirst"
        name="img"
        action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
        :on-success="upSuccessfirst"
        :on-error="upErre"
        :file-list="fileList"
        list-type="picture"
        :auto-upload="false">
        <el-button slot="trigger" size="mini" type="success" plain>选取文件</el-button>
        <el-button style="margin-left: 10px;" size="mini" type="primary" @click="submitUploadfirst" plain>确认上传</el-button>
      </el-upload>
    </p>
    <p><label>活动分享标题:</label><el-input v-model="shareTitle" placeholder="请输入活动标题" size="small"></el-input></p>
    <p><label style="vertical-align: top">活动分享描述:</label><el-input type="textarea" v-model="memo" placeholder="请输入活动描述" size="small" style="font-size: 12px;"></el-input></p>
    <p  class="tep"><label>活动类型:</label>
      <el-radio-group v-model="input4">
        <el-radio :label=1>微信</el-radio>
        <el-radio :label=2>APP</el-radio>
        <el-radio :label=3>H5</el-radio>
        <el-radio :label=4>微信+APP+H5</el-radio>
      </el-radio-group>
    </p>
    <p class="tep"><label>状态:</label>
      <el-radio-group v-model="updata2">
        <el-radio :label=1>已开启</el-radio>
        <el-radio :label=0>未开启</el-radio>
      </el-radio-group>
    </p>
    <p>
    <el-button type="primary" size="small" plain style="margin-top: 10px" @click="upload()">确定</el-button></p>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'huodong',
  data () {
    return {
      name:'',
      shareImg:'',
      value4Result:'',
      code:'',
      shareTitle:'',
      memo:'',
      input4:'',
      updata2:'',
      fileList:[]
    }
  },
  activated(){
   this.updataShuju()
  },
  computed:{
    ...mapGetters([
        'pickerOptions2','activeChangeResult'
    ])
  },
  methods: {
    ...mapActions([
      'activeActions','updateActiveActions'
    ]),
    submitUploadfirst () {
      this.$refs.uploadfirst.submit();
    },
    upSuccessfirst (response, file, fileList) {
      this.$message({
        showClose: true,
        message:'上传成功',
        type: 'success'
      })
      this.shareImg=response.result
    },
    upErre (response, file, fileList) {
      this.$message({
        showClose: true,
        message:'上传失败，请重新上传',
        type: 'warning'
      })
    },
    upload(){
      let data={
        id:this.activeChangeResult.obj.id,
        code:this.code,
        endTime:this.value4Result[1]==this.activeChangeResult.obj.endTime ? this.activeChangeResult.obj.endTime : this.dateformat(this.value4Result[1]),
        memo:this.memo,
        name:this.name,
        shareImg:this.shareImg,
        shareTitle:this.shareTitle,
        startTime:this.value4Result[0]==this.activeChangeResult.obj.startTime ? this.activeChangeResult.obj.startTime : this.dateformat(this.value4Result[0]),
        type:this.input4,
        start:this.updata2
      }
      console.log(this.activeChangeResult)
     this.updateActiveActions(data)
    },
    dateformat(data) {
      if(data){
      let year=data.getFullYear()
      let month=data.getMonth()+1
      let day= data.getDate()
      let hour= data.getHours()
      let min=data.getMinutes()
      let sec=data.getSeconds()
      console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
      return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
    }
    },
    updataShuju(){
      if(this.activeChangeResult.item==='vUpdataActive'){
        let curVal=this.activeChangeResult
        this.name=curVal.obj.name
        this.code=curVal.obj.code
        this.shareImg=curVal.obj.shareImg
        this.shareTitle=curVal.obj.shareTitle
        this.memo=curVal.obj.memo
        this.input4=curVal.obj.type
        this.updata2=curVal.obj.start
        this.value4Result=[]
        this.value4Result.push(curVal.obj.startTime)
        this.value4Result.push(curVal.obj.endTime)
        this.fileList=[]
      }
    }
  }
}
</script>

<style scoped>
  #newActive{
    margin-top: 30px;
  }
#newActive > p .el-input{
  width:200px;
}
#newActive p{
  margin-bottom:20px;
}
#newActive .upload-demo{
  display:block;
  margin-left: 115px;
  margin-top: 15px;
  width:400px;
}
  #newActive label,#newActive .tep > label:first-child{
    width:100px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
 #newActive .el-textarea{
   width:80%;
 }
  .el-radio+.el-radio{
    margin-left:0;
  }
  #newActive .tep label{
    width:auto;
  }
  #newActive p:last-child{
    margin-left:100px;
  }
  #newActive p:last-child .el-button{
    width:100px;
  }
</style>
