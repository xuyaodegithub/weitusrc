<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">添加商品</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p><label>商品名称:</label>
        <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p><label>品牌:</label>
        <el-input v-model="input1" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p><label>分类:</label>
        <el-input v-model="input2" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p><el-button type="primary" plain size="mini" style="margin-left: 30px" @click="seachData()">搜索</el-button></p>
    </div>
    <el-table
      v-loading="loading"
      :height="210"
      ref="multipleTable"
      :data="getDataListResulr.rows"
      tooltip-effect="light"
      style="width: 100%"
      @selection-change="handleSelectionChange">
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
          <span>{{ scope.row.salePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="库存">
        <template slot-scope="scope">
          <span>{{ scope.row.store }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.sellerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品牌"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.brandCode }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0 0 10px;">
      <el-button type="primary" plain size="mini" @click="toggleSelection(getDataListResulr.rows)">批量选择</el-button>
      <el-button type="primary" plain size="mini" @click="morePull(multipleSelection)">批量添加</el-button>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getDataListResulr.total">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 800px;
    height: 440px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -220px;
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
    padding: 20px 12.5px;
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
    margin-right: 30px;
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
  }
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        input:'',
        input1:'',
        input2:'',
        currentPage4:1,
        value:10,
        multipleSelection:[],
      };
    },
    computed:{
      ...mapGetters([
       'addDataNumResult','commodityResult','getDataListResulr','loading'
      ])
    },
    activated(){

    },
    methods: {
      ...mapActions([
        'popoverAlert','getDataListActions'
      ]),
      morePull(rows) {
        let keynum=0
        if(rows.length>0){
          for(let i=0;i<rows.length;i++){
            if(JSON.stringify(this.commodityResult.contents[this.addDataNumResult].dataList).indexOf(JSON.stringify(rows[i])) === -1){
           // if(this.commodityResult.contents[this.addDataNumResult].dataList.indexOf(rows[i]) === -1){
              this.commodityResult.contents[this.addDataNumResult].dataList.push(rows[i])
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
      },
      handleEdit(index, row){
        if(this.addDataNumResult !== ''){
          this.commodityResult.contents[this.addDataNumResult].dataList.push(row)
        }

      },
      seachData(){
        let data={
          filter_S_productName:this.input,
          page:this.currentPage4,
          rows:this.value
        }
        this.getDataListActions(data)
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val
        this.seachData()
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val
        this.seachData()
      },
    }
  };
</script>
