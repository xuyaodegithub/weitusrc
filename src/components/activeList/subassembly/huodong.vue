<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 活动管理
      <el-button type="success" round size="mini" icon="el-icon-plus" @click="newPush()" style="margin-top: 10px" v-if="activeChangeResult.item==='vSeachActive'">新增</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" @click="activeActions({obj:{},item:'vSeachActive'})" v-if="activeChangeResult.item!=='vSeachActive'">返回</el-button>
    </p>
    <div class="logo-list" v-if="activeChangeResult.item==='vSeachActive'">
      <label>活动ID</label><el-input v-model="input" placeholder="请输入活动ID" size="small"></el-input>
      <el-button type="primary" style="width:100px" round size="mini" icon="el-icon-search" @click="seachActive(input)">搜索</el-button>
    </div>
    <div class="footer-list">
      <keep-alive>
        <component :is="activeChangeResult.item"></component>
      </keep-alive>
    </div>
    <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
      <v-popover></v-popover>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vSeachActive from '../page/seachActive.vue'
  import vNewActive from '../page/newActive.vue'
  import vBianji from '../page/bianji.vue'
  import vUpdataActive from '../page/updataActive.vue'
  import vByIdActive from '../alert/byIdActive.vue'
  import vPopover from '../../popover/popover.vue'
export default {
  name: 'huodong',
  data () {
    return {
      input:''
    }
  },
  computed:{
    ...mapGetters([
      'activeChangeResult','getByIdActiveResult','popoverAlive','addCommodityResult','backColorResult'
    ])
  },
  components:{
    vSeachActive,vNewActive,vBianji,vUpdataActive,vByIdActive,vPopover
  },
  methods: {
    ...mapActions([
      'activeActions','getByIdActiveActions','uploadDataToOSSActions'
    ]),
    seachActive(item){
      if(item){
      this.getByIdActiveActions(item)
      }else{
        this.$message({
          message:"请输入活动名称",
          type:"warning"
        })
      }
    },
    newPush(){
      let data={
        obj:{},
        item:'vNewActive'
      }
      this.activeActions(data)
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
  }
}
</script>

<style scoped>
  .logo-list{
    font-size:14px;
    margin-top: 16px;
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
    overflow:hidden;
  }
  #toindex > p .el-button--mini,#toindex .el-button--mini.is-round{
    float: right;
    width:100px;
    margin-right:30px;
  }
  .alertshow{
    position: absolute;
    left:46%;
    top:60%;
    z-index:1000;
  }
</style>
