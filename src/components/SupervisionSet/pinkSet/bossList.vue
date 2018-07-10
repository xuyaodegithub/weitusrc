<template>
  <div id="smalltitle">
    <!--<el-button  type="danger" icon="el-icon-delete" round @click="toggleSelection(multipleSelection)" size="mini" style="width: 100px;float: right;margin-right: 180px;margin-top: -28px">批量删除</el-button>-->
    <div class="seach-list">
      <el-table
        v-loading="loading"
        :data="seachList"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="{'height':'50px','padding':'6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <!--<el-table-column
          type="selection"
          width="30">
        </el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which=='image'">
              <img :src="scope.row[item.which]" alt="" style="width: 78px;height: 78px;">
            </span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
       <!-- <el-table-column label="操作">
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
        </el-table-column>-->
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
        :total="seachList.length">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:["msg"],
    name: 'bossList',
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
            name:'账户', width:'300', which:'number'
          },{
            name:'昵称', width:'400', which:'name'
          },{
            name:'图像', width:'200', which:'image'
          },{
            name:'购买时间', width:'200', which:'buyTime'
          },{
            name:'价格', width:'200', which:'price'
          }
        ],
        seachList:[
          { number:'36842523',
            name:'小小胖',
            image:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/6cb6ba8ebdc24fd8f86f23607ba1b5c1100a272a',
            buyTime:'2018-07-09',
            price:'99'
          },{ number:'99864243',
            name:'小小鲜肉',
            image:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/6cb6ba8ebdc24fd8f86f23607ba1b5c1100a272a',
            buyTime:'2018-06-09',
            price:'19'
          },{ number:'55342817',
            name:'小小瓜子',
            image:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/6cb6ba8ebdc24fd8f86f23607ba1b5c1100a272a',
            buyTime:'2018-05-09',
            price:'29'
          },{ number:'1346785',
            name:'小小二的',
            image:'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/6cb6ba8ebdc24fd8f86f23607ba1b5c1100a272a',
            buyTime:'2018-02-09',
            price:'33'
          },
        ]
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
        'loading'
      ])
    },
    activated(){

    },
    methods: {
      ...mapActions([
        'popoverAlert'
      ]),
      seachGoodsList(){

      },
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);

      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);

      },
      deleteProduct(id){
        this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      upData(data){

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
