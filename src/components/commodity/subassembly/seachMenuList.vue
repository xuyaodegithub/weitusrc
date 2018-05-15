<template>
  <div id="MuneList">
    <el-button type="success" plain size="small" icon="el-icon-plus" @click="addNewMune(1,'new')" style="margin:10px 20px 10px 0;float: right;">新增菜单</el-button>
    <div class="seach-list">
      <el-table
        style="width: 100%;border-right: none"
        :default-expand-all="false"
        :border="true"
        v-loading="loading"
        :data="menuListResult"
        tooltip-effect="light"
        :cell-style="Liststyle">
        <el-table-column
          type="expand"
          width="30">
          <template slot-scope="scope">
            <el-table
              :show-header="false"
              :border="false"
              :data="scope.row.sonList"
              style="">
              <el-table-column
                label="序列号"
                width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="menuName"
                label="名称"
                width="250">
              </el-table-column>
              <el-table-column
                prop="url"
                label="url"
                width="340">
              </el-table-column>
              <el-table-column
                prop="menuClass"
                label="菜单样式"
                width="150">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="addNewMune(scope.row,'updata')" ></el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    style="margin-left: 10px"
                    @click="deleteMune(scope.row)" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.name"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip ="item.which!='sort'">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="border-right: none;">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="addNewMune(scope.row,'updata')" plain>修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteMune(scope.row)" plain>删除</el-button>
          <el-button type="success"  size="mini" icon="el-icon-plus" @click="addNewMune(scope.row,'new')" plain>新增子菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transition name="slide-fade">
    <div class="demo incomingHistory" v-if="alertShow.showOrClose">
    <div class="popover-head">
    <span class="title">菜单管理</span><i @click=closed() class="el-icon-close"></i>
    </div>
    <div class="popover-main">
          <p><label>菜单名称:</label><el-input v-model="title" placeholder="请输入名称" size="mini"></el-input></p>
          <p><label>sort排序:</label><el-input v-model="sort" placeholder="请输入排序" size="mini"></el-input></p>
          <p><label>url链接:</label><el-input v-model="urlResult" placeholder="请输入链接" size="mini"></el-input></p>
          <p><label>菜单样式:</label><el-input v-model="typeClass" placeholder="请输入菜单样式" size="mini"></el-input></p>
      <el-button style="width:80px;margin: 15px 0 0 100px;" size="small" type="primary" @click="pushNew()" plain>确认提交</el-button>
      <el-button style="width:80px;" size="small" type="primary" @click="newStart()" plain>重置</el-button>
    </div>
    </div>
    </transition>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:["msg"],
    name: 'seachSaleGoods',
    data () {
      return {
        alertShow:{
          showOrClose:false,
          title:""
        },
        title:'',
        sort:'',
        id:'',
        parentId:'',
        urlResult:'',
        typeClass:'',
        dataList:[
          {
            name:'名称', width:'300', which:'menuName'
          },{
            name:'url', width:'340', which:'url'
          },{
            name:'菜单样式', width:'150', which:'menuClass'
          }
        ],
        Liststyle:{
          height:'50px',
          padding:'6px 0'

        }
      }
    },
    watch: {

      msg: {
        handler (curVal, oldVal) {
          this.currentPage5=1
          this.value1=10
        },
        deep: true
      }
    },
    computed:{
      ...mapGetters([
        'loading','menuListResult'
      ])
    },
    mounted(){
      this.menuListActions({})
    },
    activated(){

    },
    methods: {
      ...mapActions([
        'popoverAlert','menuListActions','menuSaveNewActions','menuDeleteNewActions'
      ]),
      deleteMune(row){
        this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            id:row.id
          }
      this.menuDeleteNewActions(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addNewMune(obj,str){
        this.alertShow.showOrClose=true
        this.alertShow.title=str
        if(str==='new' && obj===1){
         // alert(1)
          this.title=''
          this.sort=''
          this.urlResult=''
          this.typeClass=''
          this.id=0
          this.parentId=0
        }else if(str==='new' && obj !==1){
          //alert(obj.parentId)
          this.title=''
          this.sort=''
          this.urlResult=''
          this.typeClass=''
          this.id=0
          this.parentId=obj.id
        }else{
          this.title=obj.menuName
          this.sort=obj.sort
          this.urlResult=obj.url
          this.typeClass=obj.menuClass
          this.id=obj.id
          this.parentId=obj.parentId
        }
      },
      pushNew(){
          let data={
            menuClass:this.typeClass,
            menuName:this.title,
            sort:this.sort,
            url:this.urlResult
          }
          if(this.alertShow.title==='new' &&  this.parentId===0){
            data.parentId=0
            data.id=0
            //this.menuSaveNewActions(data)
          }else if(this.alertShow.title==='new' &&  this.parentId!==0){
            data.id=0
            data.parentId=this.parentId
          }else{
            data.id=this.id
            data.parentId=this.parentId
          }
          console.log(data)
        this.menuSaveNewActions(data)
        this.alertShow.showOrClose=false
      },
      newStart(){
        this.title=''
        this.sort=''
        this.urlResult=''
        this.typeClass=''
      },
      closed(){
        this.alertShow.showOrClose=false
      },

    }
  }
</script>

<style lang="scss">
  #MuneList .el-button--mini,#smalltitle .el-button--mini.is-round{
    margin:0;
    padding:5px;
    font-size: 12px;
  }
  #MuneList .el-table--border td:last-child{
    border-right: none;
  }
  #MuneList .el-table__expanded-cell[class*=cell]{
    padding:0 0 0 30px;
  }
  #MuneList .el-table td, .el-table th{
    padding:6px 0;
  }
  #MuneList .block{
    text-align: right;
    margin-top: 20px;
    margin-right:40px;
  }
  #MuneList{
   // margin-top: 20px;
  }
  #MuneList .el-table th>div.cell,.el-table .cell,.el-table{
    font-size: 12px;
  }
  #MuneList .demo{
    width: 400px;
   // height: 220px;
    background: #F0FAFF;
    margin-left: -100px;
    margin-top: -220px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
    position: fixed;
    left:46%;
    top:60%;
    z-index: 999;
    label{
      margin-top: 15px;
      display:inline-block;
      width:70px;
      text-align: right;
    }
    .el-input{
      width:70%;
      margin-left: 15px;
    }
  }
  #MuneList .popover-head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }
  #MuneList .popover-head i{
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }
  #MuneList .popover-head .title{
    margin-left: 15px;
    font-weight: bold;
  }
  #MuneList .popover-main{
    padding: 20px 12.5px;
    width: calc(100% - 25px);
  }
  #MuneList .slide-fade-enter-active {
    transition: all .3s ease;
  }
  #MuneList .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  #MuneList .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
