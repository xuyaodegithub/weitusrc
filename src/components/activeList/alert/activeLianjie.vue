<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">注意：</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p>活动链接生成步骤：</p>

       <p> 1、先到活动列表（先提交数据后在返回活动列表）</p>
      <p>2、复制活动链接</p>
       <p> 3、粘贴到链接输入框，点击生成链接即可</p>
    </div>
  </div>
</template>

<style scoped>
  .demo{
    width: 500px;
    /*height: 120px;*/
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
            arr.push(obj)
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
