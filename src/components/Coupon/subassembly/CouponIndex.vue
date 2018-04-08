<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 优惠券管理
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="YHQonlyActions({title:'Vcoupon',item:''})" style="margin-top: 10px" v-if="YHQonlyResult.title === 'VseachCoupon'">新增优惠券</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" icon="el-icon-back" @click="YHQonlyActions({title:'VseachCoupon',item:''})" v-if="YHQonlyResult.title !== 'VseachCoupon'">返回</el-button>
    </p>
    <div class="logo-list" v-if="YHQonlyResult.title === 'VseachCoupon'">
      <label>标题:</label><el-input v-model="input" placeholder="请输入标题" size="small"></el-input> <!--autofocus自动获取焦点属性 页面只能有一个-->
      <label>领取等级:</label><!--<el-select v-model="value" placeholder="请选择等级类型" size="small" style="width: 160px;margin-right: 26px;">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>-->
      <el-checkbox-group v-model="value" size="small" style="margin-right: 20px;" @change="changeLebal(value)">
        <el-checkbox :label="0">全部</el-checkbox>
        <el-checkbox :label="1">白领</el-checkbox>
        <el-checkbox :label="2">金领</el-checkbox>
        <el-checkbox :label="3">粉领</el-checkbox>
      </el-checkbox-group>
      <label>状态:</label>
      <el-radio-group v-model="statusOkOrNo" size="small"><!--@change="changeTo(statusOkOrNo)"-->
        <el-radio :label="0">待审核</el-radio>
        <el-radio :label="1">已审核</el-radio>
      </el-radio-group>
      <label style="margin-left: 15px">公开状态:</label>
      <el-radio-group v-model="openOrClo" size="small"><!--@change="changeTo(statusOkOrNo)"-->
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
      <!--<label>使用时间:</label><el-input v-model="inputTwo" placeholder="请输入整天时间" size="small"></el-input>-->
      <el-button type="primary" style="width:100px;margin-left: 20px;" round size="mini" icon="el-icon-search" @click="seachCoupon(input)">搜索</el-button>
    </div>
    <div class="footer-list">
      <keep-alive>
        <component :is="YHQonlyResult.title" :msg="obj0"></component>
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
  import Vcoupon from '../page/newCoupon.vue'
  import VupDataCoupon from '../page/upDataCoupon.vue'
  import VseachCoupon from '../page/seachCoupon.vue'
  import vPopover from '../../popover/popover.vue'
  export default {
  name: 'CouponIndex',
  data () {
    return {
      obj0:{
        value:[]
      },
      input:'',
      value:[],
      inputTwo:'',
      statusOkOrNo:0,
      trueOrFlas:true,
      openOrClo:'',
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
//    seachWhicheResult2(curVal,oldVal){
//      if(curVal===1){
//        this.statusOkOrNo=0
//      }else{
//        this.statusOkOrNo=1
//      }
//    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','YHQonlyResult','seachWhicheResult2'
    ])
  },
  components:{
    Vcoupon,VupDataCoupon,VseachCoupon,vPopover
  },
    mounted(){
//      this.obj0={
//        input:this.input,
//        value:this.value,
//        statusOkOrNo:this.statusOkOrNo
//      }
    },
  methods: {
    ...mapActions([
'YHQonlyActions','CouponListActions','popoverAlert'
    ]),
    seachCoupon(){
      this.trueOrFlas=!this.trueOrFlas
          this.obj0={
            input:this.input,
            value:this.value,
            statusOkOrNo:this.statusOkOrNo,
            trueOrFlas:this.trueOrFlas,
            filter_I_isPublic:this.openOrClo
          }
          let str=''
          let obj={
            page:1,
            rows:10,
            chose:'chose',
            filter_I_isAudit:this.statusOkOrNo,
          }
          if(this.input){
            obj.filter_S_title=this.input
          }
      if(this.openOrClo!==''){
        obj.filter_I_isPublic=this.openOrClo
      }
          if(this.value.length>0){
            this.value.forEach(function(val,index){
              if(index===0){
                str=val
              }else{
                str=str+','+val
              }
            })
            if(str===0){
              this.CouponListActions(obj)
            }else{

              obj.limitLevels=str
              this.CouponListActions(obj)
            }
          }else{
            this.CouponListActions(obj)
          }
    },
    changeLebal(item){
          let that=this
//      if(item[item.length-1]==0){
//            this.value=[0]
//      }else{
//        this.value=item.sort(function(a,b){return a-b;})[0]==0 ? item.sort(function(a,b){return a-b;}).splice(0,1) : item
//      }
          item.forEach(function(val,index){
            if(val===0){
              that.value=[0]
              that.openOrClo=''
            }
          })
    },
//    changeTo(item){
//          let data={
//            page:1,
//            rows:10
//          }
//          if(item===0){
//            this.$store.commit('SEACHWHICHE2',1)
//            data.filter_I_isAudit=0
//            this.CouponListActions(data)
//          }else{
//            data.filter_I_isAudit=1
//            this.CouponListActions(data)
//            this.$store.commit('SEACHWHICHE2',2)
//          }
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
    margin-right:20px;
  }
  .logo-list > label{
    margin-right:10px;
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
    left:50%;
    top:50%;
    z-index:1000;
  }
 /* .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }*/
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
