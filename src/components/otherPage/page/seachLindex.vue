<template>
  <div>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="indexListLunResult.rows"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="{height:'50px',padding:'6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.title"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip ="item.which!='sort' && item.which!='isRecommend' && item.which!='image'">
          <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.which==='image'">
            <img :src="scope.row[item.which]" alt="" style="width: 78px;height: 78px;display: inline-block;">
          </span>
          <span style="margin-left: 10px" v-else-if="item.which==='type'">{{scope.row[item.which] === 4 ? '店主特权轮播图' : '试用中心轮播图' }}</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 3">无</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 2">升级店主</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 10">特卖</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 9">活动</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 13">试用中心</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 15">特卖详情</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 16">精品详情</span>
          <span style="margin-left: 10px" v-else-if="item.which==='linkType' && scope.row[item.which] === 17">整点抢详情</span>
          <span style="margin-left: 10px" v-else-if="item.which==='isRecommend'">{{scope.row[item.which] === 0 ? '否' : '是' }}</span>
          <span style="margin-left: 10px" v-else-if="item.which==='index'">{{scope.$index+1}}</span>
          <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="upData(scope.row)" plain>修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteProduct(scope.row)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<el-row :gutter="10">-->
      <!--<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content bg-purple"></div></el-col>-->
      <!--<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content bg-purple-light"></div></el-col>-->
      <!--<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content bg-purple"></div></el-col>-->
      <!--<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content bg-purple-light"></div></el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vPopover from '../../popover/popover.vue'
  export default {
  name: 'indexchange',
    props:['msg'],
  data () {
    return {
      currentPage5:1,
      rows:10,
      dataList:[
        {title:'序号',width:'60',which:'index'},
        {title:'类型',width:'140',which:'type'},
        {title:'图片',width:'110',which:'image'},
        {title:'跳转链接',width:'',which:'url'},
        {title:'跳转类型',width:'100',which:'linkType'},
        {title:'排序',width:'60',which:'sort'},
        {title:'名称',width:'170',which:'name'},
//        {title:'价格',width:'',which:'price'},
        {title:'是否推荐至首页(品牌)',width:'170',which:'isRecommend'}
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
    vPopover
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert','indexListLunActions','deleteindexLunActions','addOrUpdataActions'
    ]),
    upData(val){
        this.$emit('toParese',{title:'vNew',item:val,type:'updata'})
    },
    deleteProduct(val){
      this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:val.id
        }
        this.deleteindexLunActions(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getListSome(){
      let data={
        filter_I_type:this.msg.type,
        filter_I_linkType:this.msg.linkType,
        page:this.msg.page,
        rows:this.msg.rows,
        sortField:'sort'
      }
      this.indexListLunActions(data)
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
