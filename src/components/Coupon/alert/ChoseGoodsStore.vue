<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">关联商品</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p><label>商品名称:</label>
        <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p><label style="width:30px;">品牌:</label>
        <el-input v-model="input1" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p><label style="width:65px;">推荐到首页:</label>
        <el-radio-group v-model="upGoods" disabled><!--:disabled="classWh === '1'"-->
          <el-radio :label=0 style="width: auto;">否</el-radio>
          <el-radio :label=1 style="width: auto;">是</el-radio>
        </el-radio-group>
      </p>
      <p><label>分类:</label>
        <el-input v-model="input2" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p><label>商品类型:</label>
        <el-select v-model="classWh" placeholder="请选择类型" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p>
      <p style="margin: 0"><el-button type="primary" plain size="mini" style="" @click="seachData(currentPage4,value)">搜索</el-button></p>
    </div>
        <el-table
          @row-click="addGoodsImg"
          v-loading="loading"
          :height="320"
          :data="dataList.rows"
          tooltip-effect="light"
          style="width: 100%;"
          :cell-style="objStyle">
          <el-table-column
            v-for="(item,index) in GoodsType"
            :label="item.name"
            :width="item.width"
            :key="index"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-if="item.which==='status' && classWh==='1'">{{ scope.row[item.which]===0 ? '上架' : '下架'}}</span>
              <span style="margin-left: 10px" v-else-if="item.which==='status' && classWh==='2'"></span>
              <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && classWh==='2'">{{ scope.row.status===0 ? '待审核' : '已通过'}}</span>
              <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && classWh==='1'">{{ scope.row.isAudit===0 ? '待审核' : '已通过'}}</span>
              <span style="margin-left: 10px" v-else-if="item.which==='status' && classWh==='3'"></span>
              <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && classWh!=='3'">{{ scope.row[item.which] ? '已通过' : '待审核'}}</span>
              <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && classWh==='3' && scope.row.status=='0'">待审核</span>
              <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && classWh==='3' && scope.row.status=='1'">已通过</span>
              <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && classWh==='3' && scope.row.status=='2'">已结束</span>
              <span style="margin-left: 10px" v-else-if="item.which==='salePrice'">{{scope.row.price}}</span>
              <img :src="scope.row[item.which]" alt="" style="width: 100%;height: 42px;" v-else-if="item.which==='image'">
              <span style="margin-left: 10px" v-else>{{ scope.row[item.which]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                @click="chose(scope.$index, scope.row)" plain>选择</el-button>
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
        :total="dataList.total">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 800px;
    height: 500px;
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
             margin-right:5px;
       }
  }

  .popover-main .el-input,.popover-main .el-select{
    width:160px;
    margin-right: 20px;
  }
  .popover-main p{
    margin-bottom: 10px;
  }
  .demo > p:last-child{
    text-align: center;
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
        GoodsType:[
          {name:'主图', width:'80', which:'image'},
          {name:'产品名称', width:'150', which:'productName'},
          {name:'销售价', width:'70', which:'salePrice'},
          {name:'分类', width:'80', which:'catName'},
          {name:'上下架状态', width:'80', which:'status'},
          {name:'审核状态', width:'80', which:'isAudit'},
          {name:'库存', width:'80', which:'store'},
          {name:'供应商', width:'80', which:'sellerName'}
          ],
        options: [{
          value: '1',
          label: '普通产品'
        }, {
          value: '2',
          label: '拼团产品'
        }, {
          value: '3',
          label: '专享产品'
        }],
        classWh: '1'
      };
    },
    components:{

    },
    mounted(){
      let obj={
        filter_S_productName:this.input,
        //filter_I_isRecommend:this.upGoods,//推荐首页
        filter_S_productName_contains:this.input,
        sortField:'sort',
        page:1,
        rows:10,
        filter_I_sellerId:this.sellIDResult
      }
      this.getDataListActions(obj)

    },
    computed:{
      ...mapGetters([
      'loading','CouponWithGoodsResult','getDataListResulr','productlistResult','plusProductListResult','sellIDResult'
      ]),
      dataList:function(){
        if(this.classWh==='1'){
          return this.getDataListResulr
        }else if(this.classWh==='2'){
          return this.productlistResult
        }else{
          return this.plusProductListResult
        }
      }

    },
    methods: {
      ...mapActions([
        'popoverAlert','getDataListActions','productlistActions','plusProductListActions'
      ]),
      morePull(rows) {

      },
      seachData(pages,rowss){
        console.log(this.classWh)
        let obj={
          filter_S_productName:this.input,
         // filter_I_isRecommend:this.upGoods,//推荐首页
          filter_S_productName_contains:this.input,
          sortField:'sort',
          page:pages,
          rows:rowss,
          filter_I_sellerId:this.sellIDResult
        }
        if(this.classWh==='1'){
          this.getDataListActions(obj)
        }else if(this.classWh==='2'){
          this.productlistActions(obj)
        }else{
          this.plusProductListActions(obj)
        }

      },
      chose(index,row){
//        let str=this.CouponWithGoodsResult
          if(this.classWh==='1'){
            let obj={
              togetherProductIds:'',
              productType:1,
              productIds:row.id,
              price:row.price,
              productName:row.productName
            }
            this.$store.commit('Coupon_With_Goods',obj)
          }else if(this.classWh==='2'){
           let obj={
             togetherProductIds:row.id,
             productType:2,
             productIds:row.productId,
             price:row.price,
             productName:row.productName
           }
            this.$store.commit('Coupon_With_Goods',obj)
          }else{
            let obj={
              togetherProductIds:'',
              productType:3,
              productIds:row.productId,
              price:row.price,
              productName:row.productName
            }
            this.$store.commit('Coupon_With_Goods',obj)
          }
          this.$message({
            message:'关联成功',
            type:'success'
          })
          this.popoverAlert()

      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val
        this.seachData(this.currentPage4,this.value)
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val
        this.seachData(this.currentPage4,this.value)
      },
      addGoodsImg(row,event,column){

      }
    }
  };
</script>
