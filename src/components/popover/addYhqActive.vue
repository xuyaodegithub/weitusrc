<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">优惠券活动列表</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
        <el-table
          @row-click="addActive"
          v-loading="loading"
          :height="320"
          :data="CouponActiveListResult.rows"
          tooltip-effect="light"
          style="width: 100%;"
          class="cu"
          :cell-style="{'padding':'0','height': '42px'}">
          <el-table-column
            v-for="(item,index) in dataList"
            :label="item.name"
            :key="index"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-if="item.which==='ct'">{{ scope.row[item.which] | changeTime}}</span>
              <span style="margin-left: 10px" v-else-if="item.which==='isEnable'">{{ scope.row[item.which]==0 ? '未启用':'已启用'}}</span>
              <span style="margin-left: 10px" v-else-if="item.which==='isPublic'">{{ scope.row[item.which]==0 ? '不公开':'公开'}}</span>
              <span style="margin-left: 10px" v-else>{{ scope.row[item.which]}}</span>
            </template>
          </el-table-column>
         <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                @click="chose(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>-->
        </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="CouponActiveListResult.total">
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
        currentPage4:1,
        value:10,
        upGoods:1,
        dataList:[
          {
            name:'活动名称',
            width:'150',
            which:'name'
          },{
            name:'添加时间',
            width:'200',
            which:'ct'
          },{
            name:'关联优惠券张数',
            width:'130',
            which:'couponCount'
          },{
            name:'是否启用',
            width:'130',
            which:'isEnable'
          },
          {
            name:'公开状态',
            width:'110',
            which:'isPublic'
          },
        ],
        classWh: '1'
      };
    },
    components:{

    },
    mounted(){
      this.getYhqActiveList()
    },
    computed:{
      ...mapGetters([
      'loading','CouponActiveListResult'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert','CouponActiveListActions'
      ]),
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val
        this.getYhqActiveList()
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val
        this.getYhqActiveList()
      },
      getYhqActiveList(){
        let data={
          page:this.currentPage4,
          rows:this.value,
          filter_I_isPublic:1
        }
        this.CouponActiveListActions(data)
      },
      addActive(row,event,column){
          let obj={
            togetherProductIds:'',
            productType:13,
            productIds:row.id,
            marketPriceView:'',
            price:'',
            productName:row.name,
            costPriceView:'',//成本价
            salePriceView:'',//销售价
            image:''//销售价
          }
          this.$store.commit('Coupon_With_Goods',obj)
          this.popoverAlert()
      }
    }
  };
</script>
