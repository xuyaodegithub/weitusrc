<template>
      <el-table
        @row-click="addGoodsImg"
        v-loading="loading"
        :height="280"
        :data="productlistResult.rows"
        tooltip-effect="light"
        style="width: 100%"
        class="cu">
        <el-table-column
          prop="productName"
          label="商品名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
         <el-table-column
          prop="successValue"
          label="成团人数">
        </el-table-column>
        <el-table-column
          prop="soldCount"
          label="已售数量">
        </el-table-column>
        <el-table-column
          prop="limitBuyCount"
          label="限购数量">
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态">
          <template slot-scope="scope">{{scope.row.status ? '已通过':'待审核'}}</template>
        </el-table-column>
      </el-table>
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
    created(){
    },
    computed:{
      ...mapGetters([
         'ImgnumKeyResult','addDataNumResult','commodityResult','getDataListResulr','loading','productlistResult','freeUseListResult','scoreBuyListResult',
        'pintuanResult'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert','getDataListActions','productlistActions','freeUseListActions','scoreBuyListActions'
      ]),
      addGoodsImg(row,event,column){
        //console.log(JSON.stringify(row))
        console.log(row)
        let obj={}
        obj.type=2
        obj.productId=row.productId
        obj.image=this.commodityResult.contents[this.ImgnumKeyResult].image
        obj.width=this.commodityResult.contents[this.ImgnumKeyResult].width
        obj.height=this.commodityResult.contents[this.ImgnumKeyResult].height
        obj.isTrue=this.commodityResult.contents[this.ImgnumKeyResult].isTrue
        if(this.pintuanResult===1){
          obj.url='https://ol-h5-preview.olquan.cn/index/goodsDetali/id/' + row.id + '?isLimit=0'
          obj.indexId=1
        }
        if(this.pintuanResult===7){
          obj.url='https://ol-h5-preview.olquan.cn/index/goodsDetali/id/' + row.id + '?isLimit=1'
          obj.indexId=7
        }
        this.$store.commit('OtherImgUrl',obj.url)
        this.commodityResult.contents[this.ImgnumKeyResult]=obj
        this.popoverAlert()
        console.log(this.commodityResult.contents[this.ImgnumKeyResult])
        /*  if(this.commodityResult.contents[this.num].id) {
               this.input = 'http://ol-h5-preview.olquan.cn/index/goodsDetali/id/' + this.commodityResult.contents[this.num].id + '?isLimit=0'
               this.addType(2)
               //this.addProcuteId(this.commodityResult.contents[this.num].id)
               this.$set(this.commodityResult.contents[this.num], 'indexId', 1)
             }else{
               this.$message({
                 message:'请先关联商品后再添加类型',
                 type:'error'
               })
               this.radio2=''
             }*/
      }
    }
  };
</script>
