<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">添加组件</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p><label>组件名称:</label>
        <el-input v-model="input" placeholder="请输入组件名称" size="mini"></el-input>
      </p>
      <p><label style="vertical-align: top;">组件类型:</label>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="轮播图"></el-checkbox>
          <el-checkbox label="BANNER"></el-checkbox>
          <el-checkbox label="等分（最多5等分）"></el-checkbox>
          <el-checkbox label="滑动的"></el-checkbox>
          <el-checkbox label="产品列表"></el-checkbox>
        </el-checkbox-group>
      </p>
    </div>
    <p>
    <el-button type="primary" plain size="mini" @click="addSub()">添加</el-button>
    </p>
  </div>
</template>

<style scoped>
  .demo{
    width: 500px;
    height: 220px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -220px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
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
  .popover-main .el-checkbox-group{
    display: inline-block;
    width:86%;
  }
  .el-checkbox+.el-checkbox:last-child{
    margin-top: 10px;
  }
  .demo > p:last-child{
    text-align: center;
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
        checkList: []
      }
    },
    computed: {
      ...mapGetters([
        'popoverAlive','addCommodityResult'
      ])
    },
    methods: {
      ...mapActions([
        'popoverAlert','addCommodityActions','popoverAlert'
      ]),
      addSub () {
        //console.log(this.checkList)
        let arr = []
        let that=this
        this.checkList.forEach(function(item,index){
          if (item == '产品列表') {
            let obj = {}
            obj.name = that.input ? that.input : item
            obj.modelSampleCode = 'catlist1'
            obj.marginData=''
            obj.contents = []
//            console.log(this.addCommodityResult)
//            arr.push(obj)
            if(JSON.stringify(that.addCommodityResult).indexOf(JSON.stringify('产品列表')) === -1){
              arr.push(obj)
            }else{
              that.$message({
                message:'产品列表只能一个',
                type:'warning'
              })
            }
          }
          if(item=='轮播图'){
            let obj={}
            obj.name = that.input ? that.input : item
            obj.modelSampleCode = 'advertisingFigure'
            obj.marginData=''
            obj.contents=[]
            arr.push(obj)
          }
          if(item=="等分（最多5等分）" || item=='BANNER'){
            let obj={};
            obj.name = that.input ? that.input : item
            obj.modelSampleCode="f5"
            obj.marginData=''
            obj.contents=[]
            arr.push(obj)
          }
          if(item=="滑动的"){
            let obj={}
            obj.name = that.input ? that.input : item
            obj.modelSampleCode="titleproducttouch"
            obj.marginData=''
            obj.contents=[]
            arr.push(obj)
          }
        })
       /* let  arr2=this.addCommodityResult
        for(let i=0;i<arr.length;i++){
          arr2.push(arr[i])
        }*/

        this.addCommodityActions(arr)
        this.popoverAlert()
      }
    }
  };
</script>
