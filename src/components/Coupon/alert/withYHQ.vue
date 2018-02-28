<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">关联优惠券</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <p><label>优惠券名称:</label>
        <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
      </p>
      <p style="line-height: 28px;"><label>使用等级:</label>
        <el-radio-group v-model="updataTwo" size="small">
          <el-radio :label="0">白领</el-radio>
          <el-radio :label="1">金领</el-radio>
          <el-radio :label="2">粉领</el-radio>
        </el-radio-group>
      </p>
      <p style="margin: 0"><el-button type="primary" plain size="mini" style="" @click="seachData()">搜索</el-button></p>
    </div>
      <el-button type="primary" plain @click="toggleSelection(listData)" size="small" style="width: 100px;float: right;margin-right: 50px">批量审核</el-button>
        <el-table
          @row-click="addGoodsImg"
          v-loading="loading"
          :height="260"
          :data="dataList"
          tooltip-effect="light"
          style="width: 100%;">
          <el-table-column
            v-for="(item,index) in GoodsType"
            :label="item.name"
            :width="item.width"
            :key="index"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-if="item.which!=='img' && item.which!=='status'">{{ scope.row[item.which]}}</span>
              <span style="margin-left: 10px" v-else-if="item.which!=='img' && item.which==='status'">{{ scope.row[item.which] ? '已审核' : '待审核'}}</span>
              <img :src="scope.row[item.which]" alt="" style="width: 100%;height: 52px;" v-else>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                @click="chose(scope.$index, scope.row)" plain>关联</el-button>
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
        :total="dataList.length">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 940px;
    height: 430px;
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
    padding: 15px 12.5px 0px;
    padding-bottom: 0px;
    width: calc(100% - 25px);
    display: flex;
    flex-wrap: wrap;
       label{
             margin-right:10px;
       }
  }
  .popover-main p{
    margin-right: 10px;
  }
  .popover-main .el-input{
    width:160px;
    margin-right: 20px;
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
        input:'',
        input1:'',
        input2:'',
        currentPage4:1,
        value:10,
        dataList:[
          {
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517312094397&di=dc91797bd10995cefa017bb65954fa68&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc5504829acb11728b471028fb.jpg',
            name:'OL圈产品反反复复付付付付付付付付付付付付付付',
            sale:'100',
            classF:'各种分类',
            upOrDown:'已上架',
            status:1,
            much:'1355',
            whoGet:'OL圈'
          },{
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517312094397&di=dc91797bd10995cefa017bb65954fa68&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc5504829acb11728b471028fb.jpg',
            name:'OL圈产品反反复复付付付付付付付付付付付付付付',
            sale:'100',
            classF:'各种分类',
            upOrDown:'已上架',
            status:0,
            much:'1355',
            whoGet:'OL圈'
          },{
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517312094397&di=dc91797bd10995cefa017bb65954fa68&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc5504829acb11728b471028fb.jpg',
            name:'OL圈产品反反复复付付付付付付付付付付付付付付',
            sale:'100',
            classF:'各种分类',
            upOrDown:'已上架',
            status:0,
            much:'1355',
            whoGet:'OL圈'
          },{
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517312094397&di=dc91797bd10995cefa017bb65954fa68&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc5504829acb11728b471028fb.jpg',
            name:'OL圈产品反反复复付付付付付付付付付付付付付付',
            sale:'100',
            classF:'各种分类',
            upOrDown:'已上架',
            status:0,
            much:'1355',
            whoGet:'OL圈'
          },{
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517312094397&di=dc91797bd10995cefa017bb65954fa68&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F71cf3bc79f3df8dc5504829acb11728b471028fb.jpg',
            name:'OL圈产品反反复复付付付付付付付付付付付付付付',
            sale:'100',
            classF:'各种分类',
            upOrDown:'已上架',
            status:0,
            much:'1355',
            whoGet:'OL圈'
          },
        ],
        GoodsType:[
          {
            name:'标题',
            width:'70',
            which:'img'
          },{
            name:'有效期',
            width:'70',
            which:'name'
          },{
            name:'券价值',
            width:'70',
            which:'sale'
          },{
            name:'产品',
            width:'70',
            which:'classF'
          },{
            name:'券总数量',
            width:'70',
            which:'upOrDown'
          },{
            name:'已领数量',
            width:'70',
            which:'status'
          },{
            name:'已使用',
            width:'70',
            which:'much'
          },{
            name:'限领数量',
            width:'70',
            which:'whoGet'
          },{
            name:'状态',
            width:'70',
            which:'whoGet'
          },{
            name:'供应商',
            width:'70',
            which:'whoGet'
          },{
            name:'创建时间',
            width:'70',
            which:'whoGet'
          },{
            name:'审核时间',
            width:'70',
            which:'whoGet'
          }
          ],
        updataTwo:''
      };
    },
    components:{

    },
    created(){


    },
    computed:{
      ...mapGetters([
      'loading',
      ]),

    },
    methods: {
      ...mapActions([
        'popoverAlert'
      ]),
      morePull(rows) {

      },
      seachData(){


      },
      chose(){

      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.value=val

      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.currentPage4=val

      },
      addGoodsImg(row,event,column){

      }
    }
  };
</script>
