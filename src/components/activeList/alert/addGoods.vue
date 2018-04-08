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
      <p style="line-height: 28px;" v-if="commodityResult.modelSampleCode !=='catlist1'">
        <label  style="width: 70px;">推荐到首页:</label><el-radio-group v-model="upGoods" disabled><!--:="radiosResult !== '拼团商品'"-->
        <el-radio :label=1 style="width: auto;">是</el-radio>
        <el-radio :label=0 style="width: auto;">否</el-radio>
      </el-radio-group></p>
      <p style="line-height: 28px;"  v-if="commodityResult.modelSampleCode !=='catlist1'">
        <label>产品类型:</label><el-radio-group v-model="classGoods" disabled><!--:="radiosResult !== '积分试用商品'"-->
        <el-radio :label=0 style="width: auto;">待审核</el-radio>
        <el-radio :label=1 style="width: auto;">已通过</el-radio>
      </el-radio-group></p>
      <p style="line-height: 28px;" v-if="commodityResult.modelSampleCode ==='catlist1'">
        <label  style="width: 70px;">推荐到首页:</label><el-radio-group v-model="upGoods" disabled><!--:disabled="radio2 !== '拼团商品'"-->
        <el-radio :label=1 style="width: auto;">是</el-radio>
        <el-radio :label=0 style="width: auto;">否</el-radio>
      </el-radio-group></p>
      <p style="line-height: 28px;"  v-if="commodityResult.modelSampleCode ==='catlist1'">
        <label>产品类型:</label><el-radio-group v-model="classGoods" disabled><!--:disabled="radio2 !== '积分试用商品'"-->
        <el-radio :label=0 style="width: auto;">待审核</el-radio>
        <el-radio :label=1 style="width: auto;">已通过</el-radio>
      </el-radio-group></p>
      <P v-if="commodityResult.modelSampleCode !=='catlist1'"><label>商品类型:</label>
        <el-select v-model="radiosResult" placeholder="请选择" size="mini" style="width: 160px;"  :disabled="radiosResult!=='积分试用商品'" v-if="radiosResult!=='积分试用商品' && radiosResult!=='更多试用商品'">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      <el-select v-model="table1" placeholder="请选择" size="mini" style="width: 160px;" @change="changeradioJFC(table1)" v-if="radiosResult==='积分试用商品' || radiosResult==='更多试用商品'" disabled>
          <el-option
            v-for="item in arrResult"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </P>
      <P v-if="commodityResult.modelSampleCode ==='catlist1'"><label>商品类型:</label>
        <el-select v-model="radio2" placeholder="请选择" size="mini" style="width: 160px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </P>
      <p style="margin: 0" v-if="commodityResult.modelSampleCode !=='catlist1'"><el-button type="primary" plain size="mini" style="" @click="seachData()">搜索</el-button></p>
      <p style="margin: 0"  v-if="commodityResult.modelSampleCode ==='catlist1'"><el-button type="primary" plain size="mini" style="" @click="seachDataTwo()">搜索</el-button></p>
    </div>
    <div v-if="commodityResult.modelSampleCode !=='catlist1'">
      <div v-if="radiosResult==='普通商品'">
        <el-table
          @row-click="addGoodsImg"
          v-loading="loading"
          :height="280"
          :data="getDataListResulr.rows"
          tooltip-effect="light"
          style="width: 100%"
          class="cu">
          <el-table-column
            prop="productName"
            label="商品名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="salePrice"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="store"
            label="库存">
          </el-table-column>
          <el-table-column
            prop="sellerName"
            label="供应商">
          </el-table-column>
          <el-table-column
            prop="brandCode"
            label="品牌">
          </el-table-column>
        </el-table>
      </div>
    <div v-else-if="radiosResult==='拼团商品'">
      <Vpintuan></Vpintuan>
    </div>
    <div v-else-if="radiosResult==='积分试用商品'">
      <!--<Vjifen></Vjifen>-->
      <Vmore></Vmore>
    </div>
    <div v-else-if="radiosResult==='更多试用商品'">
      <Vmore></Vmore>
    </div>
    </div>
    <div v-else>
      <VclassListpintuan v-if="radio2==='拼团商品'"></VclassListpintuan>
      <!--<VclassListjifen v-else-if="radio2==='积分试用商品'"></VclassListjifen>-->
      <VclassListmore v-else-if="radio2==='更多试用商品' || radio2==='积分试用商品'"></VclassListmore>
      <div  v-else-if="radio2==='普通商品'">
        <el-table
          v-loading="loading"
          :height="250"
          ref="multipleTable"
          :data="getDataListResulr.rows"
          tooltip-effect="light"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          class="cu">
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
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="value"
        layout="total, sizes, prev, pager, next, jumper"
        :total="objNum">
      </el-pagination>
    </div>
  </div>
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
  import Vpintuan from './pintuan.vue'
  import Vmore from './more.vue'
  import Vjifen from './jifen.vue'
  import VclassListpintuan from './classListpintuan.vue'
  import VclassListjifen from './classListjifen.vue'
  import VclassListmore from './classListmore.vue'
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
        }/*, {
          value: '3',
          label: '积分试用商品'
        }*/, {
          value: '4',
          label: '更多试用商品'
        }],
        arrResult:[{
          value: '1',
          label: '积分试用商品'
        }, {
          value: '2',
          label: '更多试用商品'
        }],
        upGoods:1,
        table1:'更多试用商品'
      };
    },
    components:{
      Vpintuan,Vmore,Vjifen,VclassListpintuan,VclassListjifen,VclassListmore
    },
    created(){
      this.getDataListActions({
        filter_S_productName:'',
        page:this.currentPage4,
        rows:this.value
      })

    },
    computed:{
      ...mapGetters([
       'radiosResult','ImgnumKeyResult','addDataNumResult','commodityResult','getDataListResulr','loading','productlistResult','freeUseListResult','scoreBuyListResult'
      ]),
      objNum:function(){
        if(this.commodityResult.modelSampleCode !=='catlist1' && this.radiosResult==='普通商品'){
          return this.getDataListResulr.total
        }else if(this.commodityResult.modelSampleCode !=='catlist1' && this.radiosResult==='拼团商品'){
          return this.productlistResult.total
        }else if(this.commodityResult.modelSampleCode !=='catlist1' && this.radiosResult==='积分试用商品'){
          return this.freeUseListResult.total
        }else if(this.commodityResult.modelSampleCode !=='catlist1' && this.radiosResult==='更多试用商品'){
          return this.freeUseListResult.total
        }else if(this.commodityResult.modelSampleCode ==='catlist1' && this.radio2==='普通商品'){
          return this.getDataListResulr.total
        }else if(this.commodityResult.modelSampleCode ==='catlist1' && this.radio2==='拼团商品'){
          return this.productlistResult.total
        }else if(this.commodityResult.modelSampleCode ==='catlist1' && this.radio2==='积分试用商品'){
          return this.freeUseListResult.total
        }else if(this.commodityResult.modelSampleCode ==='catlist1' && this.radio2==='更多试用商品'){
          return this.freeUseListResult.total
        }
      },
      whichObj:function(){

      }
    },
    methods: {
      ...mapActions([
        'popoverAlert','getDataListActions','productlistActions','freeUseListActions','scoreBuyListActions'
      ]),
      morePull(rows) {
        //console.log(rows())
        let keynum=0
        if(rows.length>0){
          for(let i=0;i<rows.length;i++){
            if(JSON.stringify(this.commodityResult.contents[this.addDataNumResult].dataList).indexOf(JSON.stringify(rows[i])) === -1){
           // if(this.commodityResult.contents[this.addDataNumResult].dataList.indexOf(rows[i]) === -1){
              let obj=rows[i]
//              if(this.radio2==='普通商品'){
                obj.type=1
              obj.productId=rows[i].id
//              }else if(this.radio2==='拼团商品'){
//                obj.type=11
//                obj.together=rows[i].id
//              }else if(this.radio2==='积分试用商品'){
//                obj.type=8
//              }else if(this.radio2==='更多试用商品'){
//                obj.type=4
//              }
              this.commodityResult.contents[this.addDataNumResult].dataList.push(obj)
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
          filter_S_productName_contains:this.input,
          page:this.currentPage4,
          rows:this.value,
          //filter_I_isRecommend:this.upGoods,
          sortField:'sort',
          //filter_I_status:this.classGoods
        }
        if(this.radiosResult==='普通商品'){
          this.getDataListActions(data)
        }else if(this.radiosResult==='拼团商品'){
          this.productlistActions(data)
        }else if(this.radiosResult==='积分试用商品'){
          //this.scoreBuyListActions(data)
          this.freeUseListActions(data)
        }else{
          this.freeUseListActions(data)
        }

      },
      seachDataTwo(){
        let data={
          filter_S_productName:this.input,
          filter_S_productName_contains:this.input,
          page:this.currentPage4,
          rows:this.value,
          filter_I_isRecommend:this.upGoods,
          sortField:'sort',
          filter_I_status:this.classGoods
        }
        if(this.radio2==='普通商品'){
          this.getDataListActions(data)
        }else if(this.radio2==='拼团商品'){
          this.productlistActions(data)
        }else if(this.radio2==='积分试用商品'){
          //this.scoreBuyListActions(data)
          this.freeUseListActions(data)
        }else{
          this.freeUseListActions(data)
        }

      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val
        this.seachData()
        this.seachDataTwo()
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val
        this.seachData()
        this.seachDataTwo()
      },
      addGoodsImg(row,event,column){
        //console.log(JSON.stringify(row))
        let obj={}
        obj.type=2
        obj.productId=row.id
        obj.indexId=20
        obj.url='http://ol-site.olquan.com/weixin/product/newProductDetail?productId='+row.id
        obj.image=this.commodityResult.contents[this.ImgnumKeyResult].image
        obj.width=this.commodityResult.contents[this.ImgnumKeyResult].width
        obj.height=this.commodityResult.contents[this.ImgnumKeyResult].height
        obj.isTrue=this.commodityResult.contents[this.ImgnumKeyResult].isTrue
        this.$store.commit('OtherImgUrl',obj.url)
        this.commodityResult.contents[this.ImgnumKeyResult]=obj
        this.popoverAlert()
        console.log(obj)
        /* if(this.commodityResult.contents[this.num].id){
         this.input='http://ol-site.olquan.com/weixin/product/newProductDetail?productId='+this.commodityResult.contents[this.num].id
         this.addType(2)
         this.addProcuteId(this.commodityResult.contents[this.num].id)
         this.$set(this.commodityResult.contents[this.num],'indexId',20)
         }else{
           this.$message({
             message:'请先关联商品后再添加类型',
             type:'error'
           })
           this.radio2=''
         }*/
       /* let key=0
        if (this.commodityResult.contents) {
          this.commodityResult.contents.forEach(function(val,index){
            if(val.id===row.id){
              key+=1
            }
          })
          if(key===0){
            console.log(row)
            let obj=row
           /!* if(!obj.image){
              obj.image='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/23c31d63de867f568af9d1b8a3d193573b456a41'
            }*!/
           // obj.productId=''
            obj.type=''
            obj.typeId=''
            obj.width=''
            obj.height=''
            obj.isTrue=false
            this.commodityResult.contents.push(obj)
            this.$message({
              message:'商品添加成功',
              type:'success'
            })
          }else{
            this.$message({
              message:'商品已存在',
              type:'warning'
            })
          }
        }*/
      },
      changeradioJFC(key){
        this.$store.commit('changeRadios',key)
      }
    }
  };
</script>
