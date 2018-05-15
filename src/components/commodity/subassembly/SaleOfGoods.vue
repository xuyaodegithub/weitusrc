<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 特卖商品管理
      <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: 10px" @click="addGoods()"
                 v-if="title=='SeachList'">新增产品
      </el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" icon="el-icon-back"
                 @click="title='SeachList'" v-else>返回
      </el-button>
    </p>
    <p v-if="title=='SeachList'">
      <label>产品名称:</label>
      <el-input v-model="Gtitle" placeholder="请输入产品名称" size="mini"></el-input>
      <!-- <label>是否推荐:</label>&lt;!&ndash;<el-input v-model="GupGo" placeholder="请输入产品名称" size="mini"></el-input>&ndash;&gt;
       <el-radio-group v-model="isAudio">&lt;!&ndash;:disabled="classWh === '1'"&ndash;&gt;
         <el-radio :label=3 style="width: auto;">全部</el-radio>
         <el-radio :label=0 style="width: auto;">否</el-radio>
         <el-radio :label=1 style="width: auto;">是</el-radio>
       </el-radio-group>-->
      <label>状态:</label>
      <el-radio-group v-model="status"><!--:disabled="classWh === '1'"-->
        <el-radio :label=3 style="width: auto;">全部</el-radio>
        <el-radio :label=2 style="width: auto;">下架</el-radio>
        <el-radio :label=1 style="width: auto;">上架</el-radio>
      </el-radio-group>
      <label>特卖时间:</label>
      <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width:150px;" size="mini"
                      value-format="yyyy-MM-dd"></el-date-picker>
      <el-button type="primary" style="width:100px;margin-left: 20px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">搜索
      </el-button>
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
  import SeachList from '../page/seachSaleGoods.vue'
  import NewSaleGoods from '../page/newSaleGoods.vue'

  export default {
    name: 'SaleOfGoods',
    data () {
      return {
        title: 'SeachList',
        Gtitle: '',
        isAudio: '',
        status: '',
        seachMsg: {
          filter_S_productName_contains: '',
          filter_I_isRecommend: '',
          filter_I_status: '',
          sortField: 'sort',
          page: 1,
          rows: 10,
          sortOrder: 'asc',
          // filter_I_isStick:'',
          startTime: '',
        },
        date1: ''
      }
    },
    watch: {},
    computed: {
      ...mapGetters([])
    },
    components: {
      SeachList, NewSaleGoods
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'plusProductListActions'
      ]),
      changeTitle (val) {
        this.title = val
      },
      seachGoodsList () {
        let obj = {
          filter_S_productName_contains: this.Gtitle,
          sortField: 'sort',
          // filter_I_isStick:'',
          startTime: this.date1,
          page: 1,
          rows: 10,
          sortOrder: 'asc'
        }
        /*if(this.isAudio!==3){
          obj.filter_I_isRecommend=this.isAudio
        }*/
        if (this.status !== 3) {
          obj.filter_I_status = this.status
        }
        this.seachMsg = obj
        this.plusProductListActions(obj)

      },
      addGoods () {
        this.title = 'NewSaleGoods'
        let data = {
          type: 'add',
          item: {}
        }
        this.$store.commit('UPDATA_SALEGOODS', data)
      }

    }
  }
</script>

<style scoped lang="scss">
  #smalltitle p {
    .el-input {
      width: 150px;
    }
    & > label {
      margin: 0 15px;
      color: #E6A23C;
    }
    .el-radio + .el-radio {
      margin-left: 10px;
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

  #toindex .el-button--mini.is-round {
    float: right;
    width: 100px;
    margin-right: 30px;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
