<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 优惠券活动
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="YHQwhichActions({title:'VcouponActive',item:'1'})" style="margin-top: 10px" v-if="YHQwhichResult.item!=='2' && YHQwhichResult.title === 'VseachCouponActive'">新增活动</el-button>
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="YHQwhichActions({title:'VcouponActive',item:'2'})" style="margin-top: 10px" v-if="YHQwhichResult.item!=='1' && YHQwhichResult.title === 'VseachCouponActive'">新增礼包</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" icon="el-icon-back" @click="YHQwhichActions({title:'VseachCouponActive',item:''})" v-if="YHQwhichResult.title !== 'VseachCouponActive'">返回</el-button>
    </p>
    <div class="logo-list" v-if="YHQwhichResult.title === 'VseachCouponActive'">
      <label>活动名称</label><el-input v-model="input" placeholder="请输入活动名称" size="small"></el-input>
      <label>类型:</label>
      <el-radio-group v-model="statusOkOrNo" size="small">
        <el-radio :label="3">全部</el-radio>
        <el-radio :label="0">不公开</el-radio>
        <el-radio :label="1">公开</el-radio>
      </el-radio-group>
      <el-button type="primary" style="width:100px" round size="mini" icon="el-icon-search" @click="seachCoupon(input)">搜索</el-button>
      <!--<span style="color:#E45C18; margin-left: 10px">搜索框为空，则默认搜索全部</span>-->
    </div>
    <div class="footer-list">
      <keep-alive>
        <component :is="YHQwhichResult.title" :msg="objData"></component>
      </keep-alive>
    </div>
    <!--<transition name="slide-fade">
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
  import VcouponActive from '../page/newCouponActive.vue'
  import VseachCouponActive from '../page/seachCouponActive.vue'
  import VupDataCoupon from '../page/upDataCoupon.vue'
  import VupDataCouponActive from '../page/updataCouponActive.vue'
  import vPopover from '../../popover/popover.vue'
export default {
  name: 'CouponActiveIndex',
  data () {
    return {
      input:'',
      statusOkOrNo:'',
      objData:{}
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','YHQwhichResult'
    ])
  },
  components:{
    Vcoupon,VseachCouponActive,VcouponActive,VupDataCouponActive,vPopover
  },
  mounted(){
    //this.popoverAlert()
  },
  methods: {
    ...mapActions([
'YHQwhichActions','popoverAlert','CouponActiveListActions'
    ]),
    seachCoupon(item){
      this.objData={
        title:this.input,
        status:this.statusOkOrNo
      }
      let obj={
        page:1,
        rows:10
      }
      if(this.input){
        obj.filter_S_name=this.input
      }
      if(this.statusOkOrNo==0 || this.statusOkOrNo==1){
        obj.filter_I_isPublic=this.statusOkOrNo
      }
      console.log(obj)
      this.CouponActiveListActions(obj)
    },

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
  .logo-list label{
    margin-right:14px;
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
  .alertshow{
    position: absolute;
    left:36%;
    top:50%;
    z-index:1000;
  }
  .el-radio+.el-radio{
    margin-left:0;
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
