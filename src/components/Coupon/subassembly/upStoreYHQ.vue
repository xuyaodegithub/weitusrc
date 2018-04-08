<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 优惠券管理
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="StoreYHQAction({title:'VStorecoupon',item:''})" style="margin-top: 10px" v-if="StoreYHQResult.title === 'VseachStoreCoupon'">新增优惠券</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" icon="el-icon-back" @click="StoreYHQAction({title:'VseachStoreCoupon',item:''})" v-if="StoreYHQResult.title !== 'VseachStoreCoupon'">返回</el-button>
    </p>
    <div class="logo-list" v-if="StoreYHQResult.title === 'VseachStoreCoupon'">
      <label>标题:</label><el-input v-model="input" placeholder="请输入标题" size="small"></el-input>
      <!--<label>领取等级:</label><el-select v-model="value" placeholder="请选择等级类型" size="small" style="width: 160px;margin-right: 26px;">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>-->
     <!-- <el-checkbox-group v-model="value" size="small" style="margin-right: 35px;" @change="changeLebal(value)" :disabled="opacity===0">
        <el-checkbox :label="0">全部</el-checkbox>
        <el-checkbox :label="1">白领</el-checkbox>
        <el-checkbox :label="2">金领</el-checkbox>
        <el-checkbox :label="3">粉领</el-checkbox>
      </el-checkbox-group>-->
      <label>状态:</label>
      <el-radio-group v-model="statusOkOrNo" size="small"><!-- @change="changeTo(statusOkOrNo)"-->
        <el-radio :label="0">待审核</el-radio>
        <el-radio :label="1">已审核</el-radio>
      </el-radio-group>
      <label style="margin-left: 15px">公开状态:</label>
      <el-radio-group v-model="openOrClo" size="small"><!--@change="changeTo(statusOkOrNo)"-->
        <el-radio :label="3">全部</el-radio>
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
      <el-button type="primary" style="width:100px;margin-left: 20px;" round size="mini" icon="el-icon-search" @click="seachCoupon(input)">搜索</el-button>
    </div>
    <div class="footer-list">
      <keep-alive>
        <component :is="StoreYHQResult.title" :msg="obj0" v-on:to-parse="getStateMsg"></component>
      </keep-alive>
    </div>
   <!-- <transition name="slide-fade">
    <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
      <v-popover></v-popover>
    </div>
    </transition>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import VStorecoupon from '../page/newStoreCoupon.vue'
  import VupDataStoreCoupon from '../page/upDataStoreCoupon.vue'
  import VseachStoreCoupon from '../page/seachStoreCoupon.vue'
  import vPopover from '../../popover/popover.vue'
export default {
  name: 'upStoreYHQ',
  data () {
    return {
      obj0:{},
      input:'',
      value:[],
      inputTwo:'',
      statusOkOrNo:0,
      opacity:0,
      openOrClo:'',
      trueOrFlas:true,
      options: [{
        value: '0',
        label: '全部'
      },{
        value: '1',
        label: '白领'
      }, {
        value: '2',
        label: '金领'
      }, {
        value: '3',
        label: '粉领'
      }],
    }
  },
  watch:{
//    seachWhicheResult(curVal,oldVal){
//      if(curVal===1){
//        this.statusOkOrNo=0
//      }else{
//        this.statusOkOrNo=1
//      }
//    }
  },
  created(){
    //this.saveSeccion()
    //sessionStorage.setItem("si",4)
    this.getSellerId()
  },
  mounted(){
//    this.obj0={
//      input:this.input,
//      value:this.value,
//      statusOkOrNo:this.statusOkOrNo
//    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','StoreYHQResult','seachWhicheResult','sellIDResult'
    ])
  },
  components:{
    VStorecoupon,VupDataStoreCoupon,VseachStoreCoupon,vPopover
  },
  methods: {
    ...mapActions([
'StoreYHQAction','StoreYHQListActions','popoverAlert'
    ]),
    //获取商家id
    getSellerId(){
      let sellID=sessionStorage.getItem('si')
      this.$store.commit("sellID",sellID)
    },
    getStateMsg(value){
      if(value==='first'){
        this.opacity=0
      }else{
        this.opacity=1
      }
    },
    seachCoupon(item){
      this.trueOrFlas=!this.trueOrFlas
      this.obj0={
        input:this.input,
        //value:this.value,
        statusOkOrNo:this.statusOkOrNo,
        trueOrFlas:this.trueOrFlas,
        filter_I_isPublic:this.openOrClo
      }
          let obj={
            page:1,
            rows:10,
            sellerId:this.sellIDResult,
            filter_I_isAudit:this.statusOkOrNo
          }
        if(this.input){
          obj.filter_S_title=this.input
        }
      if(this.openOrClo === 1 || this.openOrClo === 0){
        obj.filter_I_isPublic=this.openOrClo
      }
      this.StoreYHQListActions(obj)
       /* let str=''
        if(this.value.length>0 && this.statusOkOrNo===1){
          str=this.value.join(',')
          if(str==0){
            this.StoreYHQListActions(obj)
          }else{
            if(this.openOrClo == 1 || this.openOrClo == 0){
              obj.filter_I_isPublic=this.openOrClo
            }
            obj.limitLevels=str
            this.StoreYHQListActions(obj)
          }
        }else{
          this.StoreYHQListActions(obj)
        }*/

    },
   /* changeLebal(item){
      let that=this
      item.forEach(function(val,index){
        if(val===0){
          that.value=[0]
          that.openOrClo=''
        }
      })
    },*/
//    changeTo(item){
//      let data={
//        page:1,
//        rows:10,
//        sellerId:this.sellIDResult
//      }
//      if(item===0){
//        this.$store.commit('SEACHWHICHE',1)
//        data.filter_I_isAudit=0
//        this.StoreYHQListActions(data)
//      }else{
//        data.filter_I_isAudit=1
//        this.StoreYHQListActions(data)
//        this.$store.commit('SEACHWHICHE',2)
//      }
//    },
//    saveSeccion(){
//      let str='YHSID'
//      sessionStorage.setItem("name",str);
//    }
  }
}
</script>

<style scoped>
  .logo-list{
    font-size:14px;
    margin-top:16px;
  }
  .logo-list .el-input{
    width:150px;
    font-size:14px;
    margin-right:26px;
  }
  .logo-list > label{
    margin-right:14px;
    color:red;
  }
  #toindex{
    font: 16px/36px "微软雅黑";
    background:none;
    border:0;
    margin:0;
    color: #333;
    font-weight: 600;
    text-indent:0;
    overflow: hidden;
  }
  #toindex .el-button--mini.is-round{
    float: right;
    width:100px;
    margin-right:30px;
  }
  .el-radio+.el-radio{
    margin-left:0;
  }
  .el-checkbox-group{
    display: inline-block;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 10px;
  }
  .alertshow{
    position: absolute;
    left:40%;
    top:50%;
    z-index:1000;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
