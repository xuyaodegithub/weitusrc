<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 优惠券活动
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="YHQwhichActions('VcouponActive')" style="margin-top: 10px">新增活动</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" @click="YHQwhichActions('VseachCouponActive')" v-if="YHQwhichResult !== 'VseachCouponActive'">返回</el-button>
    </p>
    <div class="logo-list">
      <label>活动ID</label><el-input v-model="input" placeholder="请输入活动ID" size="small"></el-input>
      <el-button type="primary" style="width:100px" round size="mini" icon="el-icon-search" @click="seachCoupon(input)">搜索</el-button>
    </div>
    <div class="footer-list">
      <keep-alive>
        <component :is="YHQwhichResult"></component>
      </keep-alive>
    </div>
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
export default {
  name: 'YHQActive',
  data () {
    return {
      input:'',

    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','YHQwhichResult'
    ])
  },
  components:{
    Vcoupon,VseachCouponActive,VcouponActive,VupDataCouponActive
  },
  methods: {
    ...mapActions([
'YHQwhichActions'
    ]),
    seachCoupon(item){

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
  }
  #toindex .el-button--mini.is-round{
    float: right;
    width:100px;
    margin-right:30px;
  }
</style>
