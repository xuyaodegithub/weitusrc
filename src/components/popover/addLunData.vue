<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">新增数据</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">
      <div>
        <label>类型:</label>
        <el-select v-model="type" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
     <div>
       <label>排序:</label>
       <el-input v-model="sort" placeholder="请输入内容" size="mini"></el-input>
     </div>
      <div>
        <label>跳转类型:</label>
        <el-select v-model="linkType" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <label>跳转链接:</label>
        <el-input v-model="url" placeholder="请输入内容" size="mini"></el-input>
      </div>
     <div>
       <label>标题:</label>
       <el-input v-model="title" placeholder="请输入内容" size="mini"></el-input>
     </div>
      <!--<div>-->
        <!--<label>价格:</label>-->
        <!--<el-input v-model="price" placeholder="请输入内容" size="mini"></el-input>-->
      <!--</div>-->
     <!--<div>
       <label>是否推荐至首页(品牌团):</label>
       <el-radio-group v-model="isAudio">&lt;!&ndash;:disabled="classWh === '1'"&ndash;&gt;
         <el-radio :label=0 style="width: auto;">否</el-radio>
         <el-radio :label=1 style="width: auto;">是</el-radio>
       </el-radio-group>
     </div>-->
     <!--<div>
       <label>日期:</label>
       <el-date-picker
         size="mini"
         v-model="dataTime"
         type="daterange"
         range-separator="至"
         start-placeholder="开始日期"
         end-placeholder="结束日期"
         format="yyyy-MM-dd"
         value-format="yyyy-MM-dd">
       </el-date-picker>
     </div>-->
     <div style="display: flex">
       <label>图片</label>
       <div style="display: flex">
         <img :src="dialogImageUrl" alt="" v-if="dialogImageUrl" style="width: 100px;height: 100px;">
         <el-upload
           class="upload-demo"
           name="img"
           action="/apis/admin/buildblocks/uploadImage"
           :on-success="upSuccessfirst"
           :show-file-list="false">
           <el-button size="mini" type="primary" style="margin-top: 30px;margin-left: 15px;" >点击上传</el-button>
         </el-upload>
       </div>
     </div>
      <el-button type="primary" plain @click="saveProduct()" size="small">
        保存
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 600px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -240px;
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
    width: calc(100% - 25px);
    .el-input{
      display: inline-block;
    }
    &>div:first-child{
      margin-top: 0;
    }
    &>div{
      margin-top: 20px;
    }
    label{
      display: inline-block;
      width:140px;
      text-align: right;
      margin-right:20px;
    }
  }

  .popover-main .el-input,.popover-main .el-select{
    width:200px;
  }
  .popover-main > .el-button{
    width: 100px;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .el-button--mini, .el-button--mini.is-round{
    padding:7px;font-size: 12px;
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
        type:'',
        sort:'',
        linkType:'',
        url:'',
        title:'',
        price:'',
        isAudio:'',
        dataTime:'',
        dialogImageUrl:'',
        options: [
          {value: 4, label: '店主特权轮播图'},
          {value: 6, label: '试用中心轮播图'}
        ],
        options2: [
          {value: 3, label: '无'},
          {value: 2, label: '升级店主'},
          {value: 10, label: '特卖 '},
          {value: 13, label: '试用中心'},
          {value: 15, label: '特卖详情'},
          {value: 16, label: '精品详情'},
          {value: 17, label: '整点抢商品详情'}
        ]
      };
    },
    components:{

    },
    mounted(){
      if(this.popoverAlive.SSSnum !==1){
        this.type=this.popoverAlive.SSSnum.type
        this.sort=this.popoverAlive.SSSnum.sort
        this.linkType=this.popoverAlive.SSSnum.linkType
        this.url=this.popoverAlive.SSSnum.url
        this.title=this.popoverAlive.SSSnum.name
        this.dialogImageUrl=this.popoverAlive.SSSnum.image
      }
    },
    computed:{
      ...mapGetters([
      'loading','popoverAlive'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert','addOrUpdataActions'
      ]),
      upSuccessfirst(response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      saveProduct(){
        let data={
          type:this.type,
          sort:this.sort,
          linkType:this.linkType,
          url:this.url,
          name:this.title,
          image:this.dialogImageUrl
        }
        if(this.popoverAlive.SSSnum===1){

        }else{
          data.id=this.popoverAlive.SSSnum.id
        }
        if(data.type &&  data.sort && data.linkType && data.url && data.name && data.image){
          this.addOrUpdataActions(data)
          this.popoverAlert()
        }else{
          this.$message({
            message:'请把信息填写完整',
            type:'warning'
          })
        }
      }
    }
  };
</script>
