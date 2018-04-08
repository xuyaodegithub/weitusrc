<template>
  <div id="newActive">
    <p><label v-if="YHQwhichResult.item==='1'">优惠券活动名称:</label><label v-else>优惠券礼包名称:</label><el-input v-model="input" placeholder="请输入活动名称" size="small"></el-input></p>
    <p><label v-if="YHQwhichResult.item==='1'">活动分享标题:</label><label v-else>礼包分享标题:</label><el-input v-model="input3" placeholder="请输入活动标题" size="small"></el-input></p>
    <p><label style="vertical-align: top" v-if="YHQwhichResult.item==='1'">活动分享描述:</label><label style="vertical-align: top" v-else>礼包分享描述:</label><el-input type="textarea" v-model="input1" placeholder="请输入活动描述" size="small" style="font-size: 12px;"></el-input></p>
    <p><label>分享图标:</label><el-input v-model="input0" size="small" style="width: 400px;"></el-input>
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
    <p><label v-if="YHQwhichResult.item==='1'">页面主图:</label><label v-else>礼包主图:</label><el-input v-model="input2" size="small" style="width: 400px;"></el-input>
      <el-upload
        class="upload-demo"
        ref="uploadTWO"
        name="img"
        action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
        :on-success="upSuccessTwo"
        :on-error="upErre"
        :file-list="fileListTWO"
        list-type="picture"
        :auto-upload="false">
        <el-button slot="trigger" size="mini" type="success" plain>选取文件</el-button>
        <el-button style="margin-left: 10px;" size="mini" type="primary" @click="submitUploadTWO" plain>确认上传</el-button>
      </el-upload>
    </p>
    <p class="tep"><label>是否启用:</label>
      <!--<el-radio v-model="updata2" label=0>不启用</el-radio>-->
      <!--<el-radio v-model="updata2" label=1>启用</el-radio>-->
      <el-radio-group v-model="updata2" size="small">
        <el-radio :label="0">不启用</el-radio>
        <el-radio :label="1">启用</el-radio>
      </el-radio-group>
    </p>
    <p class="tep"><label>是否对外公开:</label>
      <!--<el-radio v-model="updata2" label=0>不启用</el-radio>-->
      <!--<el-radio v-model="updata2" label=1>启用</el-radio>-->
      <el-radio-group v-model="outKnow" size="small" disabled>
        <el-radio :label="0">不对外公开</el-radio>
        <el-radio :label="1">对外公开</el-radio>
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
  name: 'YHQActive',
  data () {
    return {
      outKnow:1,
      input:'',
      input0:'',
      input1:'',
      input2:'',
      input3:'',
      updata2:'',
      fileList:[],
      fileListTWO:[],
    }
  },
  activated(){
    this.input='';
    this.input1='';
    this.updata2='';
    this.fileList=[];
    this.fileListTWO=[];
    this.input0='';
    this.input2='';
    this.input3='';
    if(this.YHQwhichResult.item==='1'){
      this.outKnow=1
    }else{
      this.outKnow=0
    }
  },
  computed:{
    ...mapGetters([
'YHQwhichResult'
    ]),
  },
  methods: {
    ...mapActions([
     'popoverAlert','saveCouponActiveActions','YHQwhichActions'
    ]),
    submitUploadfirst () {
      this.$refs.uploadfirst.submit();
    },
    submitUploadTWO () {
      this.$refs.uploadTWO.submit();
    },
    upSuccessfirst (response, file, fileList) {
      this.$message({
        showClose: true,
        message:'上传成功',
        type: 'success'
      })
      this.input0='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+response.result
    },
    upErre (response, file, fileList) {
      this.$message({
        showClose: true,
        message:'上传失败，请重新上传',
        type: 'warning'
      })
    },
    upSuccessTwo (response, file, fileList) {
      this.$message({
        showClose: true,
        message:'上传成功',
        type: 'success'
      })
      this.input2='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+response.result
    },

    upload(){
      let obj={
        mainImg:this.input2,
        isEnable:this.updata2,
        name:this.input,
        shareDescription:this.input1,
        shareIcon:this.input0,
        shareTitle:this.input3,
        isPublic:this.outKnow
      }
    this.saveCouponActiveActions(obj)
    this.YHQwhichActions({title:'VseachCouponActive',item:''})
    },
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
  #newActive label,#newActive .tep label:first-child{
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
