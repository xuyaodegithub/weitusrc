<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 试用广告设置
      <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: 10px" @click="addGoods()" v-if="title=='seachAdvertiseMent'">添加广告</el-button>
      <el-button type="success" round size="mini" icon="el-icon-setting" style="margin-top: 10px" @click="title='newTryImage'" v-if="title=='seachAdvertiseMent'">试用入口图设置</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" icon="el-icon-back" @click="title='seachAdvertiseMent'" v-if="title!=='seachAdvertiseMent'">返回</el-button>
    </p>
    <p v-if="title=='seachAdvertiseMent'">
      <label>名称:</label><el-input v-model="Gtitle" placeholder="请输入产品名称" size="mini"></el-input>
      <label>类型:</label>
       <el-radio-group v-model="status">
        <el-radio :label="0" style="width: auto;">全部</el-radio>
        <el-radio :label="1" style="width: auto;">普通试用</el-radio>
        <el-radio :label="2" style="width: auto;">新品首试</el-radio>
        <el-radio :label="3" style="width: auto;">整点抢</el-radio>
        <el-radio :label="4" style="width: auto;">试海外</el-radio>
      </el-radio-group>
      <el-button type="primary" style="width:100px;margin-left: 20px;" round size="mini" icon="el-icon-search" @click="seachGoodsList()">搜索</el-button>
    </p>
    <div class="footer-list">
      <keep-alive>
        <component :is="title" v-on:to-change="changeTitle" :msg="seachMsg"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import seachAdvertiseMent from '../page/seachAdvertiseMent.vue'
  import newTryImage from '../page/newTryImage.vue'
  import newAdvertisementSet from '../page/newAdvertisementSet.vue'
  export default {
  name: 'advertisementSet',
  data () {
    return {
      title:'seachAdvertiseMent',
      Gtitle:'',
      isAudio:'',
      status:'',
      seachMsg:{
        filter_S_productName:'',
       // filter_I_isRecommend:'',
        filter_I_type:'',
        sortField:'sort',
        page:1,
        rows:10
      }
    }
  },
  watch:{

  },
  computed:{
    ...mapGetters([

    ])
  },
  components:{
    seachAdvertiseMent,newTryImage,newAdvertisementSet
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'freeUseProductListActions'
    ]),
    changeTitle(val){
      this.title=val
    },
    seachGoodsList(){
      let obj={
        filter_S_productName:this.Gtitle,
        //filter_I_isRecommend:this.isAudio,//推荐首页
        sortField:'sort',
        filter_I_type:this.status===0 ? '' : this.status,
        page:1,
        rows:10
      }
//      if(this.isAudio!==3){
//        obj.filter_I_isRecommend=this.isAudio
//      }
//      if(this.status!==3){
//        obj.filter_I_status=this.status
//      }
      this.seachMsg=obj
      this.freeUseProductListActions(obj)

    },
    addGoods(){
      this.title='newAdvertisementSet'
      let  data={
        type:'add',
        item:{}
      }
      this.$store.commit('UPDATA_SALEGOODS',data)
    }
  }
}
</script>

<style scoped lang="scss">
  #smalltitle p{
    .el-input{
      width:150px;
    }
    &>label{
      margin:0 15px;
      color: #E6A23C;
    }
    .el-radio+.el-radio{
      margin-left:10px;
    }
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
    margin-bottom: 15px;
  }
  #toindex .el-button--mini.is-round{
    float: right;
    min-width:100px;
    margin-right:30px;
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
