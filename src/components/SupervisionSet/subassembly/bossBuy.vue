<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 经理购买记录
    </p>
    <div class="topseach">
      <label>账号:</label>
      <el-input v-model="isName" placeholder="请输入账号" size="mini"></el-input>
      <label style="margin-right: 15px;">购买时间:</label>
      <!--<el-input v-model="isTime" placeholder="请输入账号" size="mini"></el-input>-->
      <el-date-picker
        v-model="isTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        size="mini">
      </el-date-picker>
      <!--<el-button  type="danger" icon="el-icon-delete" round @click="seachList()" size="mini" style="width: 100px;">搜索</el-button>-->
      <el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
      <!--<el-button v-if="activeName2==='third'"  type="success" icon="el-icon-printer" round @click="seachList()" size="mini" style="width: 100px;margin:0 20px;">批量发货</el-button>-->
      <el-button  type="warning" icon="el-icon-download" round @click="export2Excel()" size="mini" style="width: 100px;">导出</el-button >
    </div>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <!--<el-tab-pane label="购买记录" name="first">-->
        <!--<v-first></v-first>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="申请记录" name="third">
        <v-second :msg="seachMsg"></v-second>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vFirst from '../pinkSet/bossList.vue'
  import vSecond from '../pinkSet/wantbossList.vue'
 // import vFirst from '../page/first.vue'
  export default {
  name: 'bossBuy',
  data () {
    return {
      activeName2:'third',
      isName:'',
      isTime:[],
      seachMsg:{
        page:1,
        rows:10
      }
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
     'popoverAlive','applySupervisorList'
    ])
  },
  components:{
    vFirst,vSecond
  },
    mounted(){
      let data={
        page:1,
        rows:10,
      }
      this.applySupervisorListActions(data)
    },
  methods: {
    ...mapActions([
'popoverAlert','applySupervisorListActions'
    ]),
    handleClick(tab, event) {
    //  console.log(tab, event);

    },
    seachGoodsList(){
      this.seachMsg={
        accountNo:this.isName,
        endTime:this.isTime ? this.isTime[1] : '',
        startTime:this.isTime ? this.isTime[0] : '',
        page:1,
        rows:10
      }
      this.applySupervisorListActions(this.seachMsg)
    },
    //导出方法
    export2Excel() {
//      let arr=Object.keys(this.tableData[0])

      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel');
        if(this.activeName2==='first'){
          const tHeader = ['账户', '昵称', '图像', '购买时间', '价格'];
          const filterVal =['number', 'name', 'image', 'buyTime', 'price'];
          const list = this.seachList;
          const data = this.formatJson(filterVal,list);
          export_json_to_excel(tHeader, data, '列表excel');
        }else{
          const tHeader = ['账号', '昵称', '图像', '申请时间', '上级总监','发货状态'];
          const filterVal =['accountNo', 'nickName', 'logo', 'createTime','inviteMemberName','status'];
          const list = this.applySupervisorList.rows;
          const data = this.formatJson(filterVal,list);
          export_json_to_excel(tHeader, data, '列表excel');
        }
      })
    },
    formatJson(filterVal,list) {
      return list.map(v => filterVal.map(j => v[j]))
    },

  }
}
</script>

<style scoped lang="scss">
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
  .topseach{
    margin-bottom: 20px;
  }
  .el-input{
    width:150px;
    margin: 0 15px;
  }
  label{
    margin: 0 15px;
    color: #E6A23C;
    margin-right: 0;
  }

</style>
