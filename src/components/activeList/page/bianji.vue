<template>
  <div>
  <div id="bianji">
    <div class="left">
      <p>
        <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="popoverAlert('vAddSubass')">添加活动组件</el-button>
        <el-button type="primary" plain size="mini" @click="popoverAlert('VaddBackground')">添加背景</el-button>
        <el-button type="success" plain size="mini" @click="watch()">预览<i class="el-icon-d-arrow-right"></i></el-button>
      </p>
      <div class="left-btn">
        <div class="divP">
        <div v-for="(item,index) in addCommodityResult"  :class="{redborder : key===index}"  @click="otherSub(item,index)" class="cu" style="min-height: 40px;position: relative;">
          <!--轮播-->
          <el-carousel indicator-position="none"  :interval="1000"  height="150px" v-if="item.modelSampleCode=='advertisingFigure' && item.contents.length>0">
            <el-carousel-item v-for="(items,index) in item.contents" :key="index">
              <img :src="items.image | ToUrl" alt=""  style="width: 100%;height: 160px;">
            </el-carousel-item>
          </el-carousel>
          <!--能滑动的-->
          <ul class="touchImg" v-if="item.modelSampleCode=='titleproducttouch'">
            <li v-for="itemSons in item.contents" style="height: 72px;width: 72px;"><img :src="itemSons.image | ToUrl" style="height: 100%;width: 100%;"/></li>
          </ul>
          <!--等分-->
          <div style="width:100%;display: flex;flex-wrap: nowrap;" v-if="item.modelSampleCode === 'f5'"><!--{{item.name}}-->
            <div  v-if="item.contents.length===1" v-for="(itenSon,key) in item.contents" style="width: 100%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===2" v-for="(itenSon,key) in item.contents" style="width: 50%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===3" v-for="(itenSon,key) in item.contents" style="width: 33.3%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===4" v-for="(itenSon,key) in item.contents" style="width: 25%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===5" v-for="(itenSon,key) in item.contents" style="width: 20%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
          </div>
          <!--<div class="list-top" v-show="addCommodityResult[addCommodityResult.length-1].contents.length>0 && addCommodityResult[addCommodityResult.length-1].modelSampleCode ==='catlist1'">
            <ul>
              &lt;!&ndash;<li v-for="(itemsSon,index) in addCommodityResult[addCommodityResult.length-1].contents" style="width: auto;line-height: 40px;background: #409EFF;margin-right: 10px;border: 1px solid #333;">{{itemsSon.title}}</li>&ndash;&gt;
              <li
                class="cu"
                v-for="(itemsSon,key) in addCommodityResult[addCommodityResult.length-1].contents"
                type="primary"
                plain
                :key="key"
                size="mini"
                style="margin: 0;padding: 6px;font-weight: 600;color: #999999;"
                :class="{background : keyNum===key}"
                @click="changeKey(key)"
              >{{itemsSon.title}}</li>
            </ul>
          </div>-->
          <div v-if="item.contents.length===0 || item.modelSampleCode=='catlist1'">
            {{item.name}}
          </div>
          <i class="el-icon-close" style="position:absolute;top:0;right: 0;color: #097CF4;font-size: 18px;z-index:999;" @click="remove(index)"></i>
        </div>
        </div>
        <p class="Plast"><i class="iconfont icon-gupiaojiangicon cu" @click="up()"></i><br>
          <i class="iconfont icon-gupiaojiangicon1 cu" @click="down()"></i>
        </p>
      </div>
      <p style="display: flex;margin-top: 10px;">
        <label class="over" style="width: 120px;margin-right: 10px;line-height: 32px;">组件名：{{title}}</label><el-input v-model="input" placeholder="请输入位置" size="small" style="width: 70px;margin-right: 10px;"></el-input>
        <el-button type="success" plain size="mini" @click="UpGoTo()">确认位置</el-button>
      </p>
      <p style="color:#666666;">(组件调到某个位置：先选择组件，在输入位置确认即可)</p>
    </div>
    <div class="right">
      <p class="btnOver">
        <label style="margin-right: 230px">组件数据：</label>
      </p>
      <div class="right-btn">
        <v-zujiandata/>
      </div>
      <p style="text-align: right;padding-right: 100px;margin-top: 20px">
        <el-button type="primary" size="small" plain style="width: 100px;" @click="upOk()">提交</el-button></p>
    </div>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vZujiandata from './zujiandata.vue'
export default {
  name: 'huodong',
  data () {
    return {
    input:'',
      title:'',
      key:-1

    }
  },
  activated(){
    this.title=''
    this.key=-1
  },
  computed:{
    ...mapGetters([
      'addCommodityResult','backColorResult','activeChangeResult'
    ]),
    WidthImg:function(val){
      let obj={}
      if(this.addCommodityResult[val].contents.length===1){
        obj={
          width:'100%'
        }
      }else if(this.addCommodityResult[val].contents.length===2){
        obj={
          width:'50%'
        }
      }else if(this.addCommodityResult[val].contents.length===3){
        obj={
          width:'33.3%'
        }
      }else if(this.addCommodityResult[val].contents.length===4){
        obj={
          width:'25%'
        }
      }else if(this.addCommodityResult[val].contents.length===5){
        obj={
          width:'20%'
        }
      }
    }
  },
  components:{
    vZujiandata
  },
  methods: {
    ...mapActions([
      'activeActions','addCommodityActions','popoverAlert','commodityActions','uploadDataToOSSActions'
    ]),
    watch(){
      console.log(this.addCommodityResult)
      if(this.addCommodityResult.length>0){
      if(this.addCommodityResult[0].contents.length>0){
        this.popoverAlert('Vdetail')
      }else{
        this.$message({
          message:"请先添加组件内容",
          type:"warning"
        })
      }
      }else{
        this.$message({
          message:"请先添加组件",
          type:"warning"
        })
      }

    },
    up(){
      if(this.key>=0){
      let item=this.addCommodityResult[this.key]
      if(this.key != 0){
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.splice(this.key-1,0,item)
        this.key--
      }else{
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.push(item)
        this.key=this.addCommodityResult.length-1
      }
      }else{
        this.$message({
          message:'请先选择组件',
          type:'warning'
        })
      }
    },
    down(){
      if(this.key>=0){
      let item=this.addCommodityResult[this.key]
      if(this.key == this.addCommodityResult.length-1){
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.unshift(item)
        this.key=0
      }else{
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.splice(this.key+1,0,item)
        this.key++
      }
      }else{
        this.$message({
          message:'请先选择组件',
          type:'warning'
        })
      }

    },
    Updata(){

    },
    remove(index,event){
      if ( event && event.stopPropagation ) {
        event.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
      this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addCommodityResult.splice(index,1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upOk(){
      let obj={
        subassembly: this.addCommodityResult,
        background: this.backColorResult
      }
      let data={
        id:this.activeChangeResult.obj.id,
        data:JSON.stringify(obj)
      }
      console.log(data)
      this.uploadDataToOSSActions(data)
    },
    otherSub(item,key){
      //alert(key)
      this.title=item.name
      this.key=key
      this.commodityActions(item)
    },
    UpGoTo(){
      console.log(this.addCommodityResult)
      if(this.title!==''){
        if(this.input>0 && this.input<this.addCommodityResult.length){
          let obj=this.addCommodityResult[this.key]
          this.addCommodityResult.splice(this.key,1)
          this.addCommodityResult.splice(this.input-1,0,obj)
          this.key=this.input-1
        }else if(this.input>=this.addCommodityResult.length){
          let obj=this.addCommodityResult[this.key]
          this.addCommodityResult.splice(this.key,1)
          this.addCommodityResult.push(obj)
          this.key=this.addCommodityResult.length-1
        }else{
          this.$message({
            message:'请输入正确位置',
            type:'warning'
          })
        }
      }else{
        this.$message({
          message:'请选择组件',
          type:'warning'
        })
      }

    }

  }
}
</script>

<style scoped>
  #bianji {
    margin-top: 30px;
    display: flex;
    padding:0 40px;
    justify-content: space-between;
  }
    #bianji .left{
      width:300px;
    }
  #bianji .left > p:first-child{
    display: flex;
    justify-content:space-between;
  }
    .left .left-btn{
    border:1px solid #333333;
      position: relative;
    padding:10px;
    margin-top: 5px;
    height:461px;
    overflow: auto;
      display: flex;
      justify-content: space-between;
  }
  .left .left-btn .divP{
    /*height:461px;*/
    overflow: auto;
    width:85%;
  }
  .left .left-btn .divP > div{
    text-align: center;
   /*height: 100px;*/
    width:99%;
    border:1px solid #333333;
  }
  .left .left-btn .divP img{
    display: block;
    width:100%;
  }
  .left .left-btn .Plast{
width: 12%;
    margin:auto;
    padding-left: 10px;
  }
  .left .left-btn .Plast:last-child .iconfont{
    font-size:24px;
  }

  #bianji .right{
    /*margin-left: 100px;*/
    flex:0.9;
    height:100%;
    /*padding-right:40px;*/
  }
  #bianji .right > label{
    font:14px/28px "微软雅黑";
  }
  .right .right-btn{
    border:1px solid #333333;
    height:450px;
    padding:18px;
    overflow: auto;
    height:100%;
  }
  .btnOver{
    margin-bottom: 5px;
    padding-right: 50px;
  }
.btnOver .el-button{
  margin-left: 20px;
  width:100px;
}
  #bianji .left .left-btn .redborder{
   opacity: 0.5;
   /*border-color: red;*/
    background-color:skyblue;
    color: #ffffff;
  }
  .touchImg{
    width:100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space:nowrap;
  }
  .touchImg li{
    display: inline-block;
  }
  .touchImg li img{
    display: block;
    width: 100%;
    height:100%;
  }
</style>
