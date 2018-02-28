<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 优惠券管理
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="YHQonlyActions({title:'Vcoupon',item:''})" style="margin-top: 10px">新增优惠券</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" @click="YHQonlyActions({title:'VseachCoupon',item:''})" v-if="YHQonlyResult.title !== 'VseachCoupon'">返回</el-button>
    </p>
    <div class="logo-list">
      <label>标题:</label><el-input v-model="input" placeholder="请输入标题" size="small"></el-input>
      <label>领取等级:</label><el-select v-model="value" placeholder="请选择等级类型" size="small" style="width: 160px;margin-right: 26px;">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
      <label>使用时间:</label><el-input v-model="inputTwo" placeholder="请输入整天时间" size="small"></el-input>
      <el-button type="primary" style="width:100px" round size="mini" icon="el-icon-search" @click="seachCoupon(input)">搜索</el-button>
    </div>
    <div class="footer-list">
      <keep-alive>
        <component :is="YHQonlyResult.title"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import Vcoupon from '../page/newCoupon.vue'
  import VupDataCoupon from '../page/upDataCoupon.vue'
  import VseachCoupon from '../page/seachCoupon.vue'
export default {
  name: 'YHQList',
  data () {
    return {
      input:'',
      value:'',
      inputTwo:'',
      options: [{
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
  computed:{
    ...mapGetters([
     'popoverAlive','YHQonlyResult'
    ])
  },
  components:{
    Vcoupon,VupDataCoupon,VseachCoupon
  },
  methods: {
    ...mapActions([
'YHQonlyActions'
    ]),
    seachCoupon(item){
        let str='sdvfdf'
      let rag=/^[^ ]+$/
      alert(rag.test(str))
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
