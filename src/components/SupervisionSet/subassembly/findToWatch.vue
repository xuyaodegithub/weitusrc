<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 发现审核
    </p>
    <div class="topseach">
      <label>昵称:</label>
      <el-input v-model="isName" placeholder="请输入账号" size="mini"></el-input>
      <label>状态:</label>
      <el-radio-group v-model="isStatus"><!--:disabled="classWh === '1'"-->
        <el-radio :label="3" style="width: auto;">全部</el-radio>
        <el-radio :label="1" style="width: auto;">已通过</el-radio>
        <el-radio :label="2" style="width: auto;">已拒绝</el-radio>
        <el-radio :label="0" style="width: auto;">待审核</el-radio>
      </el-radio-group>
      <el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
      <!--<el-button v-if="activeName2==='third'"  type="success" icon="el-icon-printer" round @click="seachList()" size="mini" style="width: 100px;margin:0 20px;">批量发货</el-button>-->
      <!--<el-button  type="primary" icon="el-icon-info" round @click="allToallow(multipleSelection,1)" size="mini" style="width: 100px;">批量审核</el-button >-->
      <!--<el-button  type="primary" icon="el-icon-delete" round @click="allDelete(multipleSelection)" size="mini" style="width: 100px;">批量删除</el-button >-->
      <el-table
        v-loading="loading"
        :data="findMsgListResult.result.rows"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="{'height':'50px','padding':'6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.isTitle"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip ="item.which!='isImg'">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="item.which==='isAudit' && scope.row[item.which]===0">
             待审核
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && scope.row[item.which]===1">
             已通过
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='isAudit' && scope.row[item.which]===2">
             已拒绝
            </span>
            <span v-else-if="item.which==='isImg'">
              <el-button size="mini" type="success" @click="toDetial(scope.row)" style="padding: 6px;">查看详情</el-button>
            </span>
            <span style="margin-left: 10px" v-else-if="item.which==='isResult'">
              {{scope.row[item.which] === 0 ? '未通过' : '已通过'}}
            </span>
            <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-sort"
              @click="allToallow([scope.row],2)" plain style="padding: 4px 6px;">审核</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="allDelete([scope.row.id])" plain style="padding: 4px 6px;">删除</el-button>
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
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="findMsgListResult.result.total">
      </el-pagination>
    </div>
    <div v-if="isShow" class="detialAlert" v-drag>
      <div class="demo">
        <div class="popover-head">
          <span class="title">发现详情</span><i v-on:click="closeAlert" class="el-icon-close"></i>
        </div>
        <div class="main">
          <el-carousel :autoplay="false" height="460px" v-if="isClass===1">
            <el-carousel-item v-for="(item,index) in dialogImageUrl" :key="index">
              <img :src="item.linkUrl" alt="" style="display:block;height: 100%;margin: 0 auto;">
            </el-carousel-item>
          </el-carousel>
          <div v-else-if="isClass===2">
            <video id="playVideo" :src="dialogImageUrl[0].linkUrl"  controls  @click="toplay()" ref="video" class="cu" width="800" height="460">
              <source :src="dialogImageUrl[0].linkUrl" type="video/mp4">
              <source :src="dialogImageUrl[0].linkUrl" type="video/ogg">
              <source :src="dialogImageUrl[0].linkUrl" type="video/webm">
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <div v-else style="line-height: 460px;font-size: 24px;color: orange;text-align: center">
              此篇发现文章不包含图片或视频
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vFirst from '../pinkSet/bossList.vue'
  import vSecond from '../pinkSet/wantbossList.vue'
 // import vFirst from '../page/first.vue'
  var  XLSX= require('xlsx')
  export default {
  name: 'findWatch',
  data () {
    return {
      isClass:'',
      isShow:false,
      dialogImageUrl:[],
      isName:'',
      msg:false,
      isStatus:3,
      currentPage5:1,
      rows:10,
      multipleSelection:[],
      dataList:[
        {isTitle:'昵称',width:'150',which:'accountName'},
        {isTitle:'标题',width:'120',which:'title'},
        {isTitle:'状态',width:'80',which:'isAudit'},
        {isTitle:'内容',width:'250',which:'content'},
        {isTitle:'图片或视频',width:'90',which:'isImg'},
        {isTitle:'产品名',width:'250',which:'productName'},

      ],
      dataResult:[
        {isName:'小胖',isTitle:'小胖专用',isStatus:0,isContent:'此处省略三百字',isImg:'https://img14.360buyimg.com/n5/jfs/t19396/175/95617801/216799/65279e9d/5a5c7622N31780b66.jpg',isProductName:'小胖专用牙刷216358563'},
        {isName:'小鲜肉',isTitle:'小鲜肉专用',isStatus:1,isContent:'此处省略三百字',isImg:'https://img14.360buyimg.com/n5/jfs/t19396/175/95617801/216799/65279e9d/5a5c7622N31780b66.jpg',isProductName:'小鲜肉专用牙刷216358563'},
        {isName:'丫头娜娜',isTitle:'丫头娜娜专用',isStatus:2,isContent:'此处省略三百字',isImg:'https://img14.360buyimg.com/n5/jfs/t19396/175/95617801/216799/65279e9d/5a5c7622N31780b66.jpg',isProductName:'丫头娜娜专用牙刷216358563'},
        {isName:'糊糊',isTitle:'糊糊专用',isStatus:0,isContent:'此处省略三百字',isImg:'https://img14.360buyimg.com/n5/jfs/t19396/175/95617801/216799/65279e9d/5a5c7622N31780b66.jpg',isProductName:'糊糊专用牙刷216358563'},
        {isName:'蚂蚁',isTitle:'蚂蚁专用',isStatus:1,isContent:'此处省略三百字',isImg:'https://img14.360buyimg.com/n5/jfs/t19396/175/95617801/216799/65279e9d/5a5c7622N31780b66.jpg',isProductName:'蚂蚁专用牙刷216358563'},
      ]
    }
  },
  watch:{
//    seachWhicheResult2(curVal,oldVal){
//      if(curVal===1){
//        this.statusOkOrNo=0
//      }else{
//        this.statusOkOrNo=1
//      }
//    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','loading','findMsgListResult'
    ])
  },
  components:{
    vFirst,vSecond
  },
    activated(){
      this.getdataFindList()
    },
  methods: {
    ...mapActions([
'popoverAlert','findMsgListActions','findSaveMsgActions','deleteOnlyIdActions'
    ]),
    seachGoodsList(){
        this.getdataFindList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    allToallow(val,key){
        this.$confirm('此篇发现文章是否符合？', '提示', {
          distinguishCancelAndClose:true,
          confirmButtonText: '通过',
          cancelButtonText: '拒绝'
        }).then(() => {
          let data={
            id:val[0].id,
            isAudit:1
          }
        this.findSaveMsgActions(data)
        }).catch(action => {
          console.log(action)
          if(action==='cancel'){
            let data={
              id:val[0].id,
              isAudit:2
            }
            this.findSaveMsgActions(data)
          }
        });
    },
    allDelete(val){
      this.$confirm('确定要删除该篇文章么？, 是否继续?', '提示', {
        distinguishCancelAndClose: true,//区分取消和关闭
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:val.join(',')
        }
      this.deleteOnlyIdActions(data)
      }).catch((action) => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange (val) {
//        console.log(`每页 ${val} 条`)
      this.rows=val
      this.getdataFindList()
    },
    handleCurrentChange (val) {
//        console.log(`当前页: ${val}`)
      this.currentPage5=val
      this.getdataFindList()
    },
    getdataFindList(){
      let  data= {
          page:this.currentPage5,
          rows:this.rows,
//          filter_S_title:'',
          filter_S_accountName:this.isName,
        filter_I_isAudit:this.isStatus === 3 ? '': this.isStatus,
        teID:22
        }
        this.findMsgListActions(data)
    },
    toDetial(val){
      this.isShow=true
      this.$http.get(this.$store.state.editor.axiosUrl+'/admin/find/getById', {
        params: {id: val.id}
      }).then(res => {
        this.dialogImageUrl=res.data.result.fileDtos
//        this.isLength=res.data.result.fileDtos ? res.data.result.fileDtos.length : 0
        this.isClass = res.data.result.fileDtos.length>0 ? res.data.result.fileDtos[0].type : ''
//        this.dialogImageUrl2 = res.data.result.fileDtos
      })
    },
    toplay(){
      if(this.msg){
        this.$refs.video.pause()
        this.msg=false
      }else{
        this.$refs.video.play()
        this.msg=true
      }
    },
    closeAlert(){
      this.isShow=false
      this.dialogImageUrl=[]
      this.isClass=''
    }
  }
}
</script>

<style scoped lang="scss">
  #toindex{
    font: 16px/36px "微软雅黑";
    background:none;
    border:0;
    margin:0;
    color: #333;
    font-weight: 600;
    text-indent:0;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .topseach{
   & > label{
      margin: 0 15px;
      color: #E6A23C;
      margin-right: 0;
    }
    margin-bottom: 20px;
    .el-radio+.el-radio{
      margin-left:10px;
    }
  }
  .el-input{
    width:150px;
    margin: 0 15px;
  }
.block{
  text-align: right;
  margin-right: 150px;
}
.detialAlert{
  position: fixed;
  top:50%;
  left:50%;
  z-index:100;
  .demo{
    margin-top: -250px;
    margin-left: -400px;
    width:800px;
    height:500px;
    background: #F0FAFF;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
  }
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
</style>
