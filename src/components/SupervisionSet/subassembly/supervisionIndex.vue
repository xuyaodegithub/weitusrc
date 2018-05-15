<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 督导设置
    </p>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="开通督导页面设置" name="first">
        <v-first></v-first>
      </el-tab-pane>
     <!-- <el-tab-pane label="邀请督导" name="second">
        <v-first></v-first>
      </el-tab-pane>-->
      <el-tab-pane label="礼包设置" name="third">
        <v-second></v-second>
      </el-tab-pane>
      <el-tab-pane label="价格及收益设置" name="fourth">
        <v-priceAndProfitSet></v-priceAndProfitSet>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vFirst from '../page/first.vue'
  import vSecond from '../page/giftBagIndex.vue'
  import vPriceAndProfitSet from '../page/priceAndProfitSet.vue'
 // import vFirst from '../page/first.vue'
  export default {
  name: 'supervisionIndex',
  data () {
    return {
      activeName2:'first'
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
     'popoverAlive',
    ])
  },
  components:{
    vFirst,vSecond,vPriceAndProfitSet
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert'
    ]),
    handleClick(tab, event) {
    //  console.log(tab, event);
    },
    changeLebal(item){

    },


  }
}
</script>

<style scoped>
  #toindex{
    font: 16px/36px "微软雅黑";
    background:none;
    border:0;
    margin:0;
    color: #333;
    font-weight: 600;
    text-indent:0;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .alertshow{
    position: fixed;
    left:50%;
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
