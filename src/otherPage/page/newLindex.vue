<template>
  <div class="demo incomingHistory">
    <!--<div class="popover-head">-->
      <!--<span class="title">新增数据</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>-->
    <!--</div>-->
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
        <el-select v-model="linkType" placeholder="请选择" size="mini" @change="changeUrl">
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
        <el-input v-model="url" placeholder="请输入内容" size="mini" :disabled="linkType !== 9"></el-input>
        <el-button size="mini" type="primary" style="margin-left: 15px;display: inline-block;" v-if="linkType===15 || linkType===16 || linkType===17"  @click="toproduct()">关联产品</el-button>
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
           action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
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
      margin-top: 40px;
    }
    label{
      display: inline-block;
      width:140px;
      text-align: right;
      margin-right:20px;
    }
  }

  .popover-main .el-input,.popover-main .el-select{
    width:300px;
  }
  .popover-main > .el-button{
    width: 100px;
    display: block;
    margin-left:250px;
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
    props:['msg'],
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
          {value: 6, label: '试用中心轮播图'},
          {value: 7, label: '店主特权广告图'}
        ],
        options2: [
          {value: 3, label: '无'},
          {value: 9, label: '活动'},
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
    activated(){
      if(this.msg.addOrup ==='add'){
        this.type=''
        this.sort=''
        this.linkType=''
        this.url=''
        this.title=''
        this.dialogImageUrl=''
        this.backfirst()
      }else{
        this.type=this.msg.val.type
        this.sort=this.msg.val.sort.toString()
        this.linkType=this.msg.val.linkType
        this.url=this.msg.val.url
        this.title=this.msg.val.name
        this.dialogImageUrl=this.msg.val.image
      }
    },
    watch:{
      CouponWithGoodsResult: {
        handler(newVal, oldVal) {
          if(this.linkType===15 || this.linkType===16 || this.linkType===17){
            this.url=newVal.toUrl
          }
        },
        deep: true
      },
    },
    computed:{
      ...mapGetters([
      'loading','popoverAlive','CouponWithGoodsResult'
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
        if(this.msg.addOrup ==='add'){

        }else{
          data.id=this.msg.val.id
        }
        if(data.type &&  data.sort && data.linkType && data.url && data.name && data.image){
          this.addOrUpdataActions(data)
          this.$emit('toParese',{title:'vSeach',item:{},type:''})
        }else{
          this.$message({
            message:'请把信息填写完整',
            type:'warning'
          })
        }
      },
      changeUrl(urlType){
        if(urlType===3)  this.url='#'
        else if(urlType===9) this.url=''
        else if(urlType===10) this.url=this.$store.state.editor.axiosQian+'/index/pinkIndex'
        else if(urlType===13) this.url=this.$store.state.editor.axiosQian+'/try/newCenter'
        else this.url=''
        this.backfirst()
       /* else if(urlType===15) this.url='https://ol-h5-preview.olquan.cn/demo/iscroll/id/'
        else if(urlType===16) this.url='https://ol-h5-preview.olquan.cn/demo/iscroll/id/'
        else if(urlType===17) this.url='https://ol-h5-preview.olquan.cn/demo/iscroll/id/'*/
      },
      toproduct(){
        if(this.linkType===15){
          this.$store.commit('changeRadios', '专享商品')
          this.popoverAlert(['vAddGoods', 'find'])
        }else{
          this.$store.commit('changeRadios', '试用商品')
          this.popoverAlert(['vAddGoods', 'find'])
        }
      },
      backfirst(){
        let obj={
          togetherProductIds:'',
          productType:'',
          productIds:'',
          marketPriceView:'',
          price:'',
          productName:'',
          costPriceView:'',//成本价
          salePriceView:'',//销售价
          image:'',//销售价,
          toUrl:''
        }
        this.$store.commit('Coupon_With_Goods',obj)
      }
    }
  };
</script>
