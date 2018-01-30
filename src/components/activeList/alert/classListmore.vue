<template>
  <div>
    <el-table
      v-loading="loading"
      :height="250"
      ref="multipleTable"
      :data="freeUseListResult.rows"
      tooltip-effect="light"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      class="cu">
      <el-table-column
        fixed
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        label="商品名称"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.productName }}</template>
      </el-table-column>
      <el-table-column
        label="价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总库存"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.limitCount }}</span>
        </template>
      </el-table-column>
    <el-table-column
        label="每天库存量"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.dayLimitCount }}</span>
        </template>
      </el-table-column>
    <el-table-column
        label="每人限购数量"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.memberLimitCount }}</span>
        </template>
      </el-table-column>
    <el-table-column
        label="审核状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.status ? '已通过':'待审核' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0 0 10px;">
      <el-button type="primary" plain size="mini" @click="toggleSelection(freeUseListResult.rows)">批量选择</el-button>
      <el-button type="primary" plain size="mini" @click="morePull(multipleSelection)">批量添加</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 800px;
    height: 490px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -250px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
  }
  .popover-head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }
  .popover-head i{
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }
  .popover-head .title{
    margin-left: 15px;
    font-weight: bold;
  }
  .popover-main{
    padding: 15px 12.5px;
    padding-bottom: 0px;
    width: calc(100% - 25px);
    display: flex;
    flex-wrap: wrap;
       label{
             width:60px;
             display: inline-block;
             text-align: right;
             margin-right:10px;
       }
  }
  .popover-main p{
    margin-right: 10px;
  }
  .popover-main .el-input{
    width:160px;
  }
  .popover-main p{
    margin-bottom: 15px;
  }
  .popover-main .el-checkbox-group{
    display: inline-block;
    width:85%;
  }
  .el-checkbox+.el-checkbox:last-child{
    margin: 10px 0 0 0;
  }
  .demo > p:last-child{
    text-align: center;
  }
  .el-button{
    width: 100px;
  }
  .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }
  .el-button--mini, .el-button--mini.is-round{
    padding:7px;font-size: 12px;
  }
  .block{
    text-align: right;
    margin-top: 10px;
  }
  p .el-radio+.el-radio{
    margin-left: 0;
  }
 /* p .el-radio-group{
    width:160px;
  }*/
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        input:'',
        classGoods:1,
        input1:'',
        input2:'',
        currentPage4:1,
        value:10,
        multipleSelection:[],
        radio2:'普通商品',
        options: [{
          value: '1',
          label: '普通商品'
        }, {
          value: '2',
          label: '拼团商品'
        }, {
          value: '3',
          label: '积分试用商品'
        }, {
          value: '4',
          label: '更多试用商品'
        }],
        upGoods:1,
        table1:[
          {

          }
        ]
      };
    },
    components:{
    },
    created(){
      this.getDataListActions({
        filter_S_productName:'',
        page:this.currentPage4,
        rows:this.value
      })

    },
    computed:{
      ...mapGetters([
       'addDataNumResult','commodityResult','getDataListResulr','loading','productlistResult','freeUseListResult','scoreBuyListResult','radiosResult'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert','getDataListActions','productlistActions','freeUseListActions','scoreBuyListActions'
      ]),
      morePull(rows) {
        let keynum=0
        if(rows.length>0){
          for(let i=0;i<rows.length;i++){
            if(JSON.stringify(this.commodityResult.contents[this.addDataNumResult].dataList).indexOf(JSON.stringify(rows[i])) === -1){
           // if(this.commodityResult.contents[this.addDataNumResult].dataList.indexOf(rows[i]) === -1){
              let obj=rows[i]
//              if(this.radio2==='普通商品'){
//                obj.type=1
//              }else if(this.radio2==='拼团商品'){
//                obj.type=11
//              }else if(this.radio2==='积分试用商品'){
//                obj.type=8
//              }else if(this.radio2==='更多试用商品'){
                obj.type=4
//              }
              this.commodityResult.contents[this.addDataNumResult].dataList.push(obj)
            }else{
              keynum+=1
            }
          }
            if(keynum>0){
              this.$message({
                message:'重复商品已过滤',
                type:'success'
              })
            }else{
              this.$message({
                message:'添加成功',
                type:'success'
              })
            }
            this.$store.commit('GET_CLASS_DATA_LIST',this.commodityResult.contents[this.addDataNumResult].dataList)
        }else{
          this.$message({
            message: '请先选择商品',
            type: 'warning'
          });
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>
