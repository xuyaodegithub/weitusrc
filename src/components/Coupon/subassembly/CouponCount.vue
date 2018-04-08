<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 优惠券统计
    </p>
    <div class="logo-list">
      <label>标题:</label><el-input v-model="input" placeholder="请输入标题" size="small"></el-input>
      <el-button type="primary" style="width:100px" round size="mini" icon="el-icon-search" @click="seachCoupon(input)">搜索</el-button>
      <span style="color:#E45C18; margin-left: 10px">输入框为空，则默认搜索全部</span>
    </div>
    <div class="footer-list">
      <el-table
        v-loading="loading"
        :data="couponoCuntResult.rows"
        style="width: 100%"
        tooltip-effect="light">
        <el-table-column
          v-for="(item,index) in dataListTwo"
          :label="item.name"
          :width="item.width"
          :key="index"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which==='ct'">{{ scope.row.ct | changeTime}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='Time'">{{ scope.row.startTime | changeTime}}--{{ scope.row.endTime | changeTime}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='isAudit'">{{ scope.row[item.which]===0 ? '待审核' : '已审核'}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='auditTime'">{{ scope.row[item.which] | changeTime}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='creatorType'">{{ scope.row[item.which]===0 ? '平台' : scope.row.sellerName}}</span>
            <span style="margin-left: 10px" v-else-if="item.which==='detial'"><el-button size="mini" type="primary" @click="couponDetial(scope.row)" plain>查看详情</el-button></span>
            <span style="margin-left: 10px" v-else-if="item.which==='totalSellPrice'">{{scope.row.totalSellPrice ? scope.row.totalSellPrice : '0'}}</span>
            <span style="margin-left: 10px" v-else>{{ scope.row[item.which] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChangeTWO"
          @current-change="handleCurrentChangeTWO"
          :current-page="currentPage5"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="value1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="couponoCuntResult.total">
        </el-pagination>
      </div>
    </div>
   <!-- <div id="detial">
      <iframe id="oldWindow" :src="iframeSrc"></iframe>
    </div>-->
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'CouponCount',
  data () {
    return {
      input:'',
      value:'',
      inputTwo:'',
      value1:10,
      currentPage5:1,
      iframeSrc:'',
      options: [{
        value: '0',
        label: '全部'
      },{
        value: '1',
        label: '白领'
      }, {
        value: '2',
        label: '金领'
      }, {
        value: '3',
        label: '粉领'
      }],
      dataListTwo:[
        {
          name:'券标题', width:'110', which:'title'
        },{
          name:'券价值', width:'70', which:'price'
        },{
          name:'产品', width:'130', which:'productName'
        },{
          name:'销售价', width:'70', which:'salePrice'
        },{
          name:'券总数量', width:'70', which:'num'
        },{
          name:'已领数量', width:'70', which:'receivedNum'
        },{
          name:'已使用', width:'70', which:'useNum'
        },{
          name:'限领数量', width:'80', which:'limitReceived'
        },{
          name:'供应商', width:'130', which:'creatorType'
        },{
          name:'总销售额', width:'110', which:'totalSellPrice'
        },{
          name:'使用详情', width:'110', which:'detial'
        }
      ]
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','couponoCuntResult','loading'
    ])
  },
  mounted(){
    let obj={
      filter_S_title:'',
      page:1,
      rows:10
    }
    this.couponoCuntActions(obj)
  },
  components:{

  },
  methods: {
    ...mapActions([
'couponoCuntActions'
    ]),
    seachCoupon(item){
//        let str='sdvfdf'
//      let rag=/^[^ ]+$/
//      alert(rag.test(str))
      let obj={
        filter_S_title:this.input,
        page:1,
        rows:10
      }
      this.couponoCuntActions(obj)
    },
    handleSizeChangeTWO(val) {
      this.value1=val
      this.couponoCuntActions({filter_S_title:this.input,page:this.currentPage5,rows:this.value1})
    },
    handleCurrentChangeTWO(val) {
      this.currentPage5=val
      this.couponoCuntActions({filter_S_title:this.input,page:this.currentPage5,rows:this.value1})
    },
    couponDetial(row){
      //this.iframeSrc='https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstoragesynckeydata?id='+1
//      this.$router.push('/Coupon-countDetial/'+row.id)
      this.$router.push('10-5?id='+row.id)
    }

  }
}
</script>

<style scoped>
  .logo-list{
    font-size:14px;
    margin-top:16px;
  }
  .logo-list .el-input{
    width:150px;
    font-size:14px;
    margin-right:26px;
  }
  .logo-list label{
    margin-right:14px;
  }
  #toindex{
    font: 16px/36px "微软雅黑";
    background:none;
    border:0;
    margin:0;
    color: #333;
    font-weight: 600;
    text-indent:0;
  }
  #toindex .el-button--mini.is-round{
    float: right;
    width:100px;
    margin-right:30px;
  }
  .block{
    text-align: right;
    margin-top: 20px;
    margin-right:40px;
  }
  .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }
  .footer-list .el-button--mini{
    padding:7px 8px;
  }
  #detial iframe{
    width:100%;
    height:auto;
  }
</style>
