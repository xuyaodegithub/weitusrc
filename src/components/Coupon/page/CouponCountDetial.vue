<template>
  <div class="demo incomingHistory">
    <el-button type="success" style="width:100px;float:right;" round size="mini" icon="el-icon-back" @click="GoBack()">返回</el-button>
    <el-table
          @row-click="addGoodsImg"
          v-loading="loading"
          :data="CouponListResult.rows"
          tooltip-effect="light"
          style="width: 100%;">
          <el-table-column
            v-for="(item,index) in GoodsType"
            :label="item.name"
            :key="index"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="item.which==='time'">{{ scope.row.startTime | changeTime}}--{{ scope.row.endTime | changeTime}}</span>
              <span v-else>{{ scope.row[item.which]}}</span>
            </template>
          </el-table-column>
        </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="CouponListResult.total">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block{
  text-align: right;
  margin-top: 10px;
}
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        currentPage4:1,
        value:10,
        GoodsType:[
          {name:'买家用户名', width:'70', which:'title'},
          {name:'订单编号', width:'70', which:'title'},
          {name:'创建时间', width:'70', which:'title'},
          {name:'订单状态', width:'70', which:'title'},
          {name:'订单类型', width:'70', which:'title'},
          {name:'订单总价', width:'70', which:'title'},
          ]
      };
    },
    components:{

    },
    mounted(){
//      let str=this.$route.params.id
      let str=this.$route.query.id
    },
    computed:{
      ...mapGetters([
      'loading','CouponListResult'
      ]),

    },
    methods: {
      ...mapActions([
        'popoverAlert',
      ]),
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val

      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val

      },
      GoBack(){
        this.$router.go(-1)
      },
      addGoodsImg(row,event,column){

      },

    }
  };
</script>
