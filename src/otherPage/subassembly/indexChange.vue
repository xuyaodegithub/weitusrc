<template>
  <div id="indexchange">
    <div class="header" v-if="isTitle==='vSeach'">
      <label>类型:</label>
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <label>跳转类型:</label>
      <el-select v-model="value2" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="width:100px;margin-left: 10px;" round size="mini" icon="el-icon-search" @click="seachGoodsList()">搜索</el-button>
    </div>
    <div>
      <el-button type="success" round size="mini" icon="el-icon-back" v-if="isTitle!=='vSeach'" style="float:right;margin-right: 80px;" @click="goback()">返回</el-button>
      <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: -50px;float:right;margin-right: 80px;" @click="addGoods()" v-else>新增数据</el-button>
    </div>
      <div class="content">
        <keep-alive>
          <component :is="isTitle" :msg="item" v-on:toParese="changeTitle"></component>
        </keep-alive>
    </div>
    <div class="block" v-if="isTitle==='vSeach'">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage5"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="indexListLunResult.total">
      </el-pagination>
    </div>
    <transition name="slide-fade">
      <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
        <v-popover></v-popover>
      </div>
    </transition>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vPopover from '../../popover/popover.vue'
  import  vSeach from '../page/seachLindex.vue'
  import  vNew from '../page/newLindex.vue'
  export default {
  name: 'indexchange',
  data () {
    return {
      currentPage5:1,
      rows:10,
      isTitle:'vSeach',
      item:{
        val:{},
        type:'',
        linkType:'',
        page:1,
        rows:10,
        addOrup:''
      },
      options: [
        {value: '', label: '全部'},
        {value: 4, label: '店主特权轮播图'},
        {value: 6, label: '试用中心轮播图'},
        {value: 7, label: '店主特权广告图'},
        ],
      options2: [
        {value: '', label: '全部'},
        {value: 3, label: '无'},
        {value: 9, label: '活动'},
        {value: 10, label: '特卖 '},
        {value: 13, label: '试用中心'},
        {value: 15, label: '特卖详情'},
        {value: 16, label: '精品详情'},
        {value: 17, label: '整点抢商品详情'}
        ],
      value: '',
      value2: ''
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
     'popoverAlive','indexListLunResult','loading'
    ])
  },
  components:{
    vPopover,vSeach,vNew
  },
    mounted(){
      this.getListSome()
    },
  methods: {
    ...mapActions([
'popoverAlert','indexListLunActions','deleteindexLunActions','addOrUpdataActions'
    ]),
    seachGoodsList(){
      this.item.type=this.value
      this.item.linkType=this.value2
      this.rows=10
      this.currentPage5=1
      this.getListSome()
    },
    addGoods(){
      this.isTitle='vNew'
      this.item.addOrup='add'
      this.item.val={}
    },
    getListSome(){
      let data={
        filter_I_type:this.value,
        filter_I_linkType:this.value2,
        page:this.currentPage5,
        rows:this.rows,
        sortField:'sort'
      }
      this.indexListLunActions(data)
    },
    goback(){
      this.isTitle='vSeach'
    },
    changeTitle(val){
      this.isTitle=val.title
      this.item.addOrup=val.type
      this.item.val=val.item
    },
    handleSizeChange(val) {
//      console.log(`每页 ${val} 条`);
      this.rows=val
      this.getListSome()
    },
    handleCurrentChange(val) {
//      console.log(`当前页: ${val}`);
      this.currentPage5=val
      this.getListSome()
    },
  }
}
</script>

<style scoped lang="scss">
#toindex{
font-size: 18px;
  font-weight: 600;
}
  .header {
    margin-top: 20px;
    margin-bottom: 20px;
    .el-select{
      width:150px;
    }
    label{
      margin:0 5px 0 30px;
      color: orange;
    }
  }
  .block{
    text-align: right;
    padding-right: 100px;
    margin-top: 15px;
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
.alertshow{
  position: fixed;
  left:50%;
  top:50%;
  z-index:1000;
}
</style>
