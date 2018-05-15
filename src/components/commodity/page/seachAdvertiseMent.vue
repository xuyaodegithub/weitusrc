<template>
  <div id="smalltitle">
    <div class="seach-list">
      <el-button  type="danger" icon="el-icon-delete" plain @click="toggleSelection(multipleSelection)" size="small" style="width: 100px;float: right;margin-right: 40px">批量删除</el-button>
      <el-table
        v-loading="loading"
        :data="[]"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="Liststyle">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip ="item.which!='sort'">
          <template slot-scope="scope">
           <span style="margin-left: 10px" >{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
              @click="deleteProduct(scope.row.id)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage5"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="0">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:["msg"],
    name: 'seachAdvertiseMent',
    data () {
      return {
        showOrClose:false,
        currentPage5:1,
        value1:10,
        MsgSort:false,
        multipleSelection:[],
        dataList:[
          {
            name:'名称', width:'300', which:'productName'
          },{
            name:'图片', width:'150', which:'indexImage'
          },{
            name:'类型', width:'120', which:'price'
          },{
            name:'链接', width:'120', which:'sort'
          },{
            name:'排序', width:'90', which:'isRecommend'
          },{
            name:'排期', width:'90', which:'status'
          }
        ],
        Liststyle:{
          height:'50px',
          padding:'6px 0'
        }
      }
    },
    watch: {

    },
    computed:{
      ...mapGetters([
        'loading'
      ])
    },
    mounted(){
      let obj={
        filter_S_productName:this.input,
        //filter_I_isRecommend:this.upGoods,//推荐首页
        filter_S_productName_contains:this.input,
        sortField:'sort',
        page:1,
        rows:10
      }

    },
    activated(){

    },
    methods: {
      ...mapActions([
        'popoverAlert',
      ]),
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.msg.rows=val

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.msg.page=val

      },
      wactch(key,row){
       // this.popoverAlert(['WatchPrice',row])
      },
      deleteProduct(id){
        this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            id:id
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      upData(item){
        let data={
          type:'updata',
          item:item
        }
        this.$emit('to-change','NewSaleGoods')
        this.$store.commit('UPDATA_SALEGOODS',data)
      },
      changeSort(e,row){
        let data={
          id:row.id,
          sort:e.target.value,
          startDate:row.startDate
        }
        if(this.MsgSort){
          this.MsgSort=false
        }
      },
      changeValue(e){
     this.MsgSort=true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      toggleSelection(data) {
        if(data.length>0){

        }else{
          this.$message({
            message:'请选择产品',
            type:'warning'
          })
        }
      },
    }
  }
</script>

<style scoped>
  #smalltitle .el-button--mini,#smalltitle .el-button--mini.is-round{
    margin:0;
    padding:5px;
    font-size: 12px;
  }
  .block{
    text-align: right;
    margin-top: 20px;
    margin-right:40px;
  }
  #smalltitle{
    margin-top: 20px;
  }
  .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }
</style>
