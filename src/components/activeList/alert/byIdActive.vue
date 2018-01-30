<template>
  <div id="newActive">
    <p><label>活动名称:</label><span>{{getByIdActiveResult.name}}</span></p>
    <p><label>活动编号:</label><span>{{getByIdActiveResult.code}}</span></p>
    <p><label>活动时间:</label><span>{{getByIdActiveResult.startTime}}</span><i style="margin: 0 10px;">至</i><span>{{getByIdActiveResult.endTime}}</span>

    </p>
    <p><label>活动分享图片:</label><span>{{getByIdActiveResult.shareImg}}</span>
    </p>
    <p><label>活动分享标题:</label><span>{{getByIdActiveResult.shareTitle}}</span></p>
    <p><label style="vertical-align: top">活动分享描述:</label><el-input type="textarea" v-model="getByIdActiveResult.memo" placeholder="请输入活动描述" size="small" style="font-size: 12px;"></el-input></p>
    <p  class="tep"><label>活动类型:</label>
      <span v-if="getByIdActiveResult.type==1">微信</span>
      <span v-if="getByIdActiveResult.type==2">APP</span>
      <span v-if="getByIdActiveResult.type==3">H5</span>
      <span v-if="getByIdActiveResult.type==4">微信+APP+H5</span>
    </p>
    <p class="tep"><label>状态:</label><span>{{getByIdActiveResult.start==0 ? '未开启' : '已开启'}}</span>
    </p>
    <p>
    <el-button type="primary" size="small" plain style="margin-top: 10px" @click="upload()">编辑</el-button>
    <el-button type="primary" size="small" plain style="margin-top: 10px" @click="changeActiveList()">编辑活动数据</el-button>
    <el-button type="danger" size="small" plain style="margin-top: 10px" @click="DeleteOne()">删除</el-button>
    </p>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'huodong',
  data () {
    return {
      fileList:[]
    }
  },
  activated(){

  },
  computed:{
    ...mapGetters([
        'pickerOptions2','getByIdActiveResult'
    ])
  },
  methods: {
    ...mapActions([
      'activeActions','deleteActiveActions','clearAllActions','OssListActions'
    ]),
    upload(){
      let data={
        obj:this.getByIdActiveResult,
        item:'vUpdataActive'
      }
      this.activeActions(data)
    },
    DeleteOne(){
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:this.getByIdActiveResult.id,
          item:{
            page:1,
            rows:10
          }
        }
        this.deleteActiveActions(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    changeActiveList(){
      console.log(this.getByIdActiveResult.ossDataId)
      let data={
        obj:this.getByIdActiveResult,
        item:'vBianji'
      }
      if(this.getByIdActiveResult.ossDataId){
        this.OssListActions(this.getByIdActiveResult.ossDataId)
      }else{
        this.clearAllActions()
      }
      this.activeActions(data)
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
  background: #F0FAFF;
  color:#666666;
  line-height:40px;
  font-size: 14px;
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
    font-size: 12px;
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
    background: none;
  }
  #newActive p:last-child .el-button{
    width:100px;
  }
</style>
