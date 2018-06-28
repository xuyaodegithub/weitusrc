<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 发现列表管理
     <!-- <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: 10px;float: right;margin-right: 50px;" @click="addGoods()"
                 v-if="title=='vSeachmsg'">新增文章
      </el-button>-->
      <el-button type="success" size="mini" round style="margin-top: 10px;float: right;margin-right: 50px;" icon="el-icon-back"
                 @click="title='vSeachmsg'" v-if="title!=='vSeachmsg'">返回
      </el-button>
    </p>
    <div style="margin-bottom: 20px;" v-if="title==='vSeachmsg'">
      <label>账号昵称:</label>
      <el-input v-model="isName" placeholder="请输入产品名称" size="mini"></el-input>
      <label style="margin-left: 30px;">标题:</label>
      <el-input v-model="isNametitle" placeholder="请输入产品名称" size="mini"></el-input>
      <el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="title" v-on:to-change="changeTitle" :msg="seachMsg" :msgData="msgData"></component>
      </keep-alive>
    </div>
    <!--<div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>-->
      <!--<v-popover></v-popover>-->
    <!--</div>-->
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vNewmsg from '../page/newMsg.vue'
  import vSeachmsg from '../page/seachFindMsg.vue'
//  import vPopover from '../../popover/popover.vue'

  export default {
    name: 'findMsg',
    data () {
      return {
        title: 'vSeachmsg',
        isName: '',
        isNametitle:'',
        seachMsg: {
          page:1,
          rows:10,
          filter_S_title:'',
          filter_S_accountName:''
        },
        msgData:{
          type: '',
          item: '',
          id: '',
          which: ''
        }
      }
    },
    watch: {
//    seachWhicheResult2(curVal,oldVal){
//      if(curVal===1){
//        this.statusOkOrNo=0
//      }else{
//        this.statusOkOrNo=1
//      }
//    }
    },
    computed: {
      ...mapGetters([
        'popoverAlive',
      ])
    },
    components: {
      vNewmsg,vSeachmsg
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert','findMsgListActions'
      ]),
      seachGoodsList () {
        this.seachMsg.filter_S_title=this.isNametitle
        this.seachMsg.filter_S_accountName=this.isName
        this.findMsgListActions(this.seachMsg)
      },
      changeTitle (data) {
        this.msgData.type = data.type
        this.msgData.item = data.data
        this.msgData.which = data.which
        if (data.id) {
          this.msgData.id = data.id
        }
        this.title = data.title
      },

    }
  }
</script>

<style scoped lang="scss">
  #smalltitle{
    font-size: 14px;
    .el-input{
      display: inline-block;width:150px;
    }
    label{
      margin-right: 15px;
    }
  }
  #toindex {
    font: 16px/36px "微软雅黑";
    background: none;
    border: 0;
    margin: 0;
    color: #333;
    font-weight: 600;
    text-indent: 0;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .alertshow {
     position: fixed;
     left: 50%;
     top: 50%;
     z-index: 1000;
   }

</style>
