<template>
  <div id="smalltitle">
    <!--<el-button  type="danger" icon="el-icon-delete" round @click="toggleSelection(multipleSelection)" size="mini" style="width: 100px;float: right;margin-right: 180px;margin-top: -28px">批量删除</el-button>-->
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="storeGiftBagListResult.rows"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="Liststyle">
        <!--<el-table-column
          type="selection"
          width="30">
        </el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which=='image'">
              <img :src="scope.row[item.which]" alt="" style="width: 78px;height: 78px;">
            </span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
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
        :total="storeGiftBagListResult.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:["msg"],
    name: 'giftBagList',
    data () {
      return {
        value1:10,
        currentPage5:1,
        multipleSelection:[],
        itemDetial:{
          title:'newGift',
          type:'updata',
          item:{}
        },
        dataList:[
          {
            name:'礼包名称', width:'300', which:'name'
          },{
            name:'产品名称', width:'400', which:'productName'
          },{
            name:'礼包图片', width:'200', which:'image'
          }
        ],
        Liststyle:{
          height:'50px',
          padding:'6px 0'
        }
      }
    },
    watch: {

     /* msg: {
        handler (curVal, oldVal) {
          this.currentPage5=1
          this.value1=10
        },
        deep: true
      }*/
    },
    computed:{
      ...mapGetters([
        'loading','storeGiftBagListResult'
      ])
    },
    activated(){
      let obj={
        page:1,
        rows:10,
        filter_I_type:2
      }
      this.storeGiftBagListActions(obj)

    },
    methods: {
      ...mapActions([
        'popoverAlert','storeGiftBagListActions','storeGiftBagDeleteActions'
      ]),
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.msg.rows=val
        this.freeUseProductListActions(this.msg)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.msg.page=val
        this.freeUseProductListActions(this.msg)
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
        this.storeGiftBagDeleteActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      upData(data){
        this.itemDetial.item=data
        this.$emit('to-up',this.itemDetial)
      }

    }
  }
</script>

<style scoped>
  #smalltitle .el-button--mini,#smalltitle .el-button--mini.is-round{
    margin:0;
    font-size: 12px;
  }
  .block{
    text-align: right;
    margin-top: 20px;
    margin-right:40px;
  }
  .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }

</style>
