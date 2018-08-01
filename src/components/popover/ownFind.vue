<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">个人文章列表</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <el-table
        v-loading="loading"
        :data="findMsgListResult.result.rows"
        style="width: 100%"
        ref="multipleTable"
        :max-height="350"
        tooltip-effect="light"
        :cell-style="{'height': '50px','padding': '6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.title"
          :key="index"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="item.which==='isStick'">
            <el-button type="info" plain size="mini" v-if="!scope.row[item.which]" @click="changeStutas(scope.row,1)">置顶</el-button>
            <el-button type="info" plain size="mini" v-else @click="changeStutas(scope.row,2)">取消置顶</el-button>
          </span>
            <span v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteNumber(scope.row)" plain>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage5"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="findMsgListResult.result.total">
        </el-pagination>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 800px;
    background: #F0FAFF;
    margin-left: -400px;
    margin-top: -245px;
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
  }

  .popover-main .el-input,.popover-main .el-select{
    width:160px;
    margin-right: 20px;
  }
  .popover-main .el-button{
    width: 100px;
  }
  .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }
 .demo .el-table td{
    padding:5px 0;
  }
  .el-button--mini, .el-button--mini.is-round{
    padding:7px;font-size: 12px;
  }
  .block{
    text-align: right;
    margin-top: 30px;
    margin-bottom: 30px;
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
        objStyle:{
          padding:'0',
          height: '42px'
        },
        input:'',
        input1:'',
        input2:'',
        currentPage5:1,
        rows:10,
        upGoods:1,
        dataList: [
          {title: '标题', width: '200', which: 'title'},
          {title: '发布帐号', width: '250', which: 'accountName'},
          {title: '关联产品', width: '260', which: 'productName'},
          {title: '置顶', width: '120', which: 'isStick'},
//          {title: '是否禁用', width: '120', which: 'isStutas'},
//          {title:'账号昵称',width:'100',which:'isN'},
        ],
        classWh: '1'
      };
    },
    components:{

    },
    mounted(){

    },
    computed:{
      ...mapGetters([
        'loading','findMsgListResult'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert','findMsgListActions','deleteOnlyIdActions','findSaveMsgActions'
      ]),
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.rows=val
        this.getOwnList()
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage5=val
        this.getOwnList()
      },
      changeStutas(val,key){
        if(key===1){
          let data={
            id:val.id,
            isStick:1
          }
          this.findSaveMsgActions(data)
        }else{
          let data={
            id:val.id,
            isStick:0
          }
          this.findSaveMsgActions(data)
        }
      },
      getOwnList(){
        let data={
//          filter_L_accountId:,
          page:this.currentPage5,
          rows:this.rows
        }
        this.findMsgListActions(data)
      },
      deleteNumber(item){
        this.$confirm('确定要删除该条文章么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            id:item.id
          }
          this.deleteOnlyIdActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  };
</script>
