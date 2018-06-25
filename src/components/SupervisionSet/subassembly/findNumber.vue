<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 发现账号管理
      <el-button type="success" round size="mini" icon="el-icon-plus"
                 style="margin-top: 10px;float: right;margin-right: 50px;" @click="addGoods()"
                 v-if="title=='vSeach'">新增账号
      </el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px;float: right;margin-right: 50px;"
                 icon="el-icon-back"
                 @click="title='vSeach'" v-else>返回
      </el-button>
    </p>
    <div style="margin-bottom: 20px;" v-if="title==='vSeach'">
      <label>账号昵称:</label>
      <el-input v-model="isName" placeholder="请输入产品名称" size="mini"></el-input>
      <el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="title" v-on:to-change="changeTitle" :msg="seachMsg" :msgData="msgData"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vNew from '../page/newNumber.vue'
  import vSeach from '../page/seachNumber.vue'
  import vNewmsg from '../page/newMsg.vue'

  export default {
    name: 'findNumber',
    data () {
      return {
        title: 'vSeach',
        isName: '',
        seachMsg: {},
        msgData: ''
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
      vNew, vSeach, vNewmsg
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert'
      ]),
      seachGoodsList () {

      },
      changeTitle (data) {
        this.title = data.title
        this.msgData = data.data
      },
      addGoods () {
        this.title = 'vNew'
      }

    }
  }
</script>

<style scoped lang="scss">
  #smalltitle {
    font-size: 14px;
    .el-input {
      display: inline-block;
      width: 150px;
    }
    label {
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
</style>
