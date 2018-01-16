<template>
  <div id="zujianData">
    <div v-if="commodityResult.modelSampleCode !=='catlist1'" class="banner">
      <div class="banner-t">
        <p><label>组件名称:</label><el-input v-model="commodityResult.name" placeholder="请输入内容" size="mini"></el-input></p>
        <p><label>组件类型:</label><span>BANNER</span></p>
      </div>
      <div class="img">
        <p class="clear">
          <i class="el-icon-delete cu" style="margin-left: 5px" @click="moveDelete()"></i>
          <i class="el-icon-caret-right cu" @click="moveRight()"></i>
          <i class="el-icon-caret-left cu" @click="moveLeft()"></i>
        </p>
          <div style="display: flex;position: relative">
            <label style="margin-right: 30px">图片:</label>
            <ul id="imgList">
                <li v-for="(item,key) in commodityResult.contents" @click="address(key)" v-if="commodityResult.contents.length>0" :class="{activete : num===key}" class="cu" >
                  <img :src="item.image" alt=""/>
                  <!--<i class="el-icon-success" style="position: absolute;right: 0;top:0;color:#73FF40;" v-if="item.url !== ''"></i>-->
                </li>
              <li><el-button style="margin-top:25px;" size="mini" @click="addGoodsList()">添加商品</el-button></li>
            </ul>
            <el-upload
              action="apis/admin/buildblocks/img/uploadImage"
              name="img"
              :multiple=true
              :show-file-list=false
              list-type="picture-card"
              :on-success="upSuccessfirst"
              :on-preview="handlePictureCardPreview">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div class="anchor-b">
            <p>
            <label style="width: 160px;">类型:</label>
            <el-radio-group v-model="radio2" @change="choseGoods(radio2)">
            <el-radio :label="item.which" v-for="(item,index) in labelList" :key="index">{{item.title}}</el-radio>
            </el-radio-group></p>
            <label style="margin-right: 20px;width: 60px;text-align: right;display: inline-block;">链接:</label><el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
            <el-button style="width: 60px;margin: 0;padding: 4px;" type="success" size="mini" @click="change()">生成链接</el-button>
            <label style="margin:15px 20px 0 0;width: 60px;text-align: right;display: inline-block;">图片边距:</label><el-input v-model="lineData" placeholder="请输入内容" size="mini" @blur="change2()"></el-input>
          </div>
      </div>
      <p> <el-button type="primary" plain size="mini" @click="addimg()">修改图片</el-button></p>
    </div>
    <div id="goodChangeList" v-else>
      <div class="banner-t">
        <p><label>组件名称:</label><el-input v-model="commodityResult.name" placeholder="请输入内容" size="mini"></el-input></p>
        <p><label>组件类型:</label><span>产品列表</span></p>
      </div>
      <div class="flmcList">
        <p><label>分类名称:</label><el-input v-model="input1" placeholder="请输入分类名称" size="mini"></el-input>
          <el-button v-if="createOrUpdate" type="primary" plain size="mini" style="margin-left: 20px" @click="createTag()">创建分类</el-button>
          <el-button v-if="!createOrUpdate" type="primary" plain size="mini" style="margin-left: 20px" @click="changeTag()">确认修改</el-button>
          <i class="el-icon-refresh cu" style="font-size: 18px;color:#409EFF;margin-left: 8px" @click="changeOr()"></i>
        </p>
        <p><label>商品边距:</label><el-input v-model="marginPruct" placeholder="请输入内容" size="mini" @blur="change3(marginPruct)"></el-input>
        </p>
        <el-button
          style="padding: 6px 0px;margin: 0 10px 0 0;"
          v-for="(tag,key) in commodityResult.contents"
          type="primary"
          :key="key"
          plain
          size="mini"
          @click="updateTag(key)"
        :class="{ addborder: addDataNumResult==key}">
            {{tag.title}}<i class="el-icon-close" style="float: right;font-size: 14px;" @dblclick.pervent="CloseTag(key)"></i>
        </el-button>
      </div>
      <div class="addGoodList">
        <p  style="font:14px/28px '微软雅黑'"><label>产品列表:</label> <el-button type="primary" plain size="mini" icon="el-icon-plus" style="float: right;" @click="addPucter()">添加关联产品</el-button></p>
        <el-table
          :height="250"
          fixed
          :data="classDataListResult"
          tooltip-effect="light"
          style="width: 567px">
          <el-table-column
            prop="productName"
            label="产品名称"
            width="115"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="salePrice"
            width="90"
            label="销售价格">
          </el-table-column>
          <el-table-column
            prop="store"
            label="库存"
            width="90">
          </el-table-column>
          <el-table-column
            prop="sellerName"
            label="供应商"
            width="145"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作"  width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                @click="handleEdit(scope.$index, scope.row)" style="width: auto;" >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[30, 50]"
          :page-size="30"
          layout="total, sizes, prev, pager, next, jumper"
          :total="classDataListResult.length">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
    name: 'huodong',
    data () {
      return {
        createOrUpdate: true,
        input: '',
        lineData:'',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        num: 0,
        input1: '',
        tags: [],
        currentPage4: 1,
        marginPruct:'',
        radio2: '',
        isTrue:true,
        labelList:[
          {title:'拼团首页', which:2},
          {title:'开通粉领', which:3},
          {title:'保险', which:4},
          {title:'粉领专享', which:5},
          {title:'拼团秒杀列表', which:6},
          {title:'拼团秒杀产品详情', which:7},
          {title:'正常拼团产品详情', which:1},
          {title:'超值拼列表', which:8},
//          {title:'普通产品详情', which:9},
          {title:'拼洋货列表', which:10},
          {title:'拼大牌列表', which:11},
          {title:'清仓拼列表', which:12},
          //{title:'积分试用列表', which:13},
          {title:'积分试用产品详情', which:14},
          {title:'全球购列表', which:15},
          {title:'家居日用首页', which:16},
          {title:'品牌馆', which:17},
          {title:'试用中心', which:19},
          {title:'产品详情', which:20},
          {title:'品牌特卖', which:21},
          {title:'限时购', which:22},
          {title:'自营超市', which:23},
          {title:'美妆首页', which:26},
          {title:'今日上新', which:27},
          {title:'活动', which:29},
          {title:'小金库充值', which:30},
          {title:'其他', which:31},
        ]
      }
    },
    watch: {
      commodityResult: {
        handler (curVal, oldVal) {
          this.lineData = curVal.marginData
          if (curVal.name !== oldVal.name && curVal.modelSampleCode !=='catlist1') {
            this.radio2=''
            if (curVal.contents.length>0) {
              this.input=curVal.contents[0].url
              this.num=0
            } else {
              this.input = ''
            }
          }
          if(curVal.name !== oldVal.name && curVal.modelSampleCode ==='catlist1' && curVal.contents.length>0){
            this.num=0
            this.input1=curVal.contents[0].title
            this.marginPruct=curVal.marginData ? curVal.marginData : ''
            this.$store.commit('GET_ADD_DATA_NUM',0)
            this.$store.commit('GET_CLASS_DATA_LIST',curVal.contents[0].dataList)
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters([
        'commodityResult','addDataNumResult','classDataListResult','activeChangeResult'
      ]),
    },
    methods: {
      ...mapActions([
        'commodityActions', 'popoverAlert','abcActions'
      ]),
      handlePictureCardPreview () {

      },
      handleClose (item) {
        this.tags.splice(this.tags.indexOf(item), 1)
      },
      address (key) {
        if (this.commodityResult.contents[key].url) {
          this.input = this.commodityResult.contents[key].url
        } else {
          this.input = ''
        }
        this.num = key
        this.radio2=''
        this.isTrue=true
      },
      upSuccessfirst (response, file, fileList) {
        let oImg= new Image()
        oImg.src='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+response.result
        let that=this
        oImg.onload = function () {
          console.log('宽:'+oImg.width+','+'高:'+oImg.height)
          that.commodityResult.contents[that.num].image='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
          that.commodityResult.contents[that.num].width=oImg.width
          that.commodityResult.contents[that.num].height=oImg.height
        }
        console.log( that.commodityResult.contents[that.num])
      },
      upErre () {

      },
      addimg () {
        let oDiv = document.getElementsByClassName('el-upload--picture-card')[0]
        if(this.commodityResult.contents.length>0){
          oDiv.click()
        }else{
          this.$message({
            message:'请先添加商品',
            type:'warning'
          })
        }
      },
      moveLeft () {
        let key = null
        if(this.commodityResult.contents.length>0) {
          let item = this.commodityResult.contents[this.num]
          if (this.num === 0) {
            this.commodityResult.contents.splice(this.num, 1)
            this.commodityResult.contents.push(item)
            this.num=this.commodityResult.contents.length-1
          } else {
            this.commodityResult.contents.splice(this.num, 1)
            this.commodityResult.contents.splice(this.num - 1, 0, item)
            this.num--
          }
        }
      },
      moveRight () {
        let key = null
        if(this.commodityResult.contents.length>0) {
          let item = this.commodityResult.contents[this.num]
          if (this.num == this.commodityResult.contents.length - 1) {
            this.commodityResult.contents.splice(this.num, 1)
            this.commodityResult.contents.unshift(item)
            this.num=0
          } else {
            this.commodityResult.contents.splice(this.num, 1)
            this.commodityResult.contents.splice(this.num + 1, 0, item)
            this.num++
          }
        }
      },
      moveDelete () {
        let key = null
        if(this.commodityResult.contents.length>0){
          if (this.num !== null) {
            this.commodityResult.contents.splice(this.num, 1)
            this.input = ''
          }
        }
      },
      change () {
        console.log(this.num)
        if (this.commodityResult.contents.length>0) {
          //if(this.radio2){}
          this.commodityResult.contents[this.num].url = this.input
          this.$message({
            message:'链接添加成功',
            type:'success'
          })
        }else{
          this.$message({
            message:'请先添加商品',
            type:'warning'
          })
        }
        console.log(this.commodityResult.contents[0])
      },
      change2(){
        if(this.lineData){
        this.commodityResult.marginData=this.lineData
        }
      },
      change3(data){
        if(data){
          this.commodityResult.marginData=data
        }else{
          this.commodityResult.marginData=0
        }
      },
      createTag () {
        if (this.input1) {
          let obj = {
            title: this.input1,
            contentId: '3',
            trOrFa:false,
            dataList:[]
          }
          this.commodityResult.contents.push(obj)
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      updateTag (key) {
        this.createOrUpdate = false
        this.input1 = this.commodityResult.contents[key].title
        this.num = key
        for(let i=0;i<this.commodityResult.contents.length;i++){
          this.commodityResult.contents[i].trOrFa=false
        }
        this.commodityResult.contents[key].trOrFa=true
        this.$store.commit('GET_ADD_DATA_NUM',key)
        this.$store.commit('GET_CLASS_DATA_LIST',this.commodityResult.contents[key].dataList)
      },
      CloseTag (index) {
        if (event && event.stopPropagation) {
          event.stopPropagation()
        } else {
          window.event.cancelBubble = true
        }
        this.commodityResult.contents.splice(index, 1)
      },
      changeTag () {
        console.log(this.num)
        if (this.num !== '' && this.commodityResult.contents[this.num]) {
          this.commodityResult.contents[this.num].title = this.input1
        }
      },
      handleEdit(index,row){
        this.commodityResult.contents[this.num].dataList.splice(index,1)
        this.$store.commit('GET_CLASS_DATA_LIST',this.commodityResult.contents[this.num].dataList)
      },
      addPucter(){
        if(this.commodityResult.contents.length>0){
          this.popoverAlert('vAddGoods')
        }else{
          this.$message({
            message:'请先创建分类',
            type:'warning'
          })
        }
      },
      changeOr () {
        this.createOrUpdate = true
      },
      //图片跳转链接
      choseGoods(key){
        if(key===1){
          this.input='http://ol-h5-preview.olquan.cn/index/goodsDetali/id/'+this.commodityResult.contents[this.num].id+'?isLimit=0'
        }else if(key===2){
          console.log(this.commodityResult.contents[this.num])
          this.input='http://ol-h5-preview.olquan.cn/index/index'
        }else if(key===3){
          this.input='http://ol-site.olquan.com/weixin/member/openStore'
        }else if(key===4){
          this.input='http://www.ins-box.com/channelcps?channelCode=966262c61960ed971942347b443c7743&to=http://www.ins-box.com/pagecontent?pageContentId=100044'
        }else if(key===5){
          this.input='http://ol-h5-preview.olquan.cn/mine/index'
        }else if(key===6){
          this.input='http://ol-h5-preview.olquan.cn/index/hotsale'
        }else if(key===7){
          this.input='http://ol-h5-preview.olquan.cn/index/goodsDetali/id/'+this.commodityResult.contents[this.num].id+'?isLimit=1'
        }else if(key===8){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/1'
        }/*else if(key===9){
          this.input='http://ol-site.olquan.com/weixin/product/newProductDetail?productId='+this.commodityResult.contents[this.num].id
        }*/else if(key===10){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/4'
        }else if(key===11){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/2'
        }else if(key===12){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/5'
        }/*else if(key===13){
          this.input='http://ol-h5-preview.olquan.cn/try/center?type=3'
        }*/else if(key===14){
          this.input='http://ol-h5-preview.olquan.cn/try/trygoods/id/'+this.commodityResult.contents[this.num].id
        }else if(key===15){
          this.input='http://ol-site.olquan.com/weixin/auth?view=/weixin/globalShopping/vm'
        }else if(key===16){
          this.input='http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse?districtId=330185'
        }else if(key===17){
          this.input='http://ol-site.olquan.com/weixin/product/product?brandCode=47'
        }else if(key===19){
          this.input='http://ol-h5-preview.olquan.cn/try/center?type=3'
        }else if(key===20){
          this.input='http://ol-site.olquan.com/weixin/product/newProductDetail?productId='+this.commodityResult.contents[this.num].id
        }else if(key===21){
          this.input='http://ol-site.olquan.com/ol/weixin/index/indexRecommendBrand'
        }else if(key===22){
          this.input='http://ol-site.olquan.com/weixin/limitBuy/limitBuy'
        }else if(key===23){
          this.input='http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse'
        }else if(key===26){
          this.input='http://ol-site.olquan.com/weixin/auth?view=http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse?districtId=330104'
        }else if(key===27){
          this.input='http://ol-site.olquan.com/weixin/product/product?isNew=1'
        }else if(key===29){
          this.input='http://ol-h5-preview.olquan.cn/activity/newact?id='+this.activeChangeResult.obj.id+'&memberId=778040'
        }else if(key===30){
          this.input='http://ol-site.olquan.com/weixin/member/coffersRecharge'
        }else if(key===31){
          this.input='#'
        }
      },
      addGoodsList(){
        if(this.commodityResult.contents.length>0){
          this.popoverAlert('vAddGoods')
        }else{
          this.$message({
            message:'请先选择组件',
            type:'warning'
          })
        }
      }
    }
}
</script>

<style>
 #zujianData .banner-t{
    display: flex;
    margin-bottom: 20px;
  }
 #zujianData .banner-t label{
    margin-right: 10px;
  }
 #zujianData .banner-t > p .el-input{
    width:200px;
  }
 #zujianData .banner-t > p:nth-child(2){
      font:12px/28px "微软雅黑";
      margin-left: 50px;
  }
 #zujianData .banner .img ul{
    display: flex;
  }
 #zujianData .banner .img ul li,#zujianData div.el-upload--picture-card{
   width:72px;
   height: 72px;
   margin-right: 10px;
   margin-bottom: 10px;
  }
 #zujianData div.el-upload--picture-card{
  position: relative;
   display: none;
 }
 #zujianData div.el-upload--picture-card i{
   position: absolute;
   left: 0;
   margin:20px 0 0 21px;;
 }
 #zujianData .banner .img ul li img{
  width:100%;
  height:100%;
  }
 #zujianData .banner .img{
    padding:20px;
    background:rgba(242, 242, 242, 1);
  }
 #zujianData .anchor-b{
    margin-top: 20px;
  }
 #zujianData .anchor-b .el-input{
    width:300px;
  }
 #zujianData .banner > p .el-button{
    margin-top: 20px;
    width:100px;
  }
 #zujianData .banner .img ul li.activete{
   border:2px solid red;
   width:68px;
   height:68px;
  }
 #zujianData .img > p > i{
   float: right;
   font-size:24px;
 }
  #goodChangeList .flmcList .el-input{
    width:250px;
    margin-left: 10px;
  }
 #goodChangeList .flmcList p{
   margin-bottom: 10px;
 }
 #goodChangeList .flmcList span{
   margin-right: 6px;
   margin-bottom: 8px;
   padding:0 8px;
 }
 #goodChangeList .flmcList span:last-child{
   margin-right: 0;
 }
 #goodChangeList .block{
   text-align: right;
   margin-top: 20px;
 }
 #goodChangeList .addGoodList > .el-table th>div.cell,#goodChangeList .addGoodList >  .el-table .cell,#goodChangeList .addGoodList >  .el-table{
   font-size: 12px;
 }
 #zujianData #imgList{
   display: flex;
   flex-wrap: wrap;
 }
 #zujianData #imgList li{
   position: relative;
 }
 #zujianData .addborder{
   border-color:red;
 }
 #zujianData .anchor-b .el-radio+.el-radio{
   margin-left: 0px;
   margin-bottom: 10px;
 }
 #zujianData .anchor-b > p:first-child{
   display: flex;
 }
 #zujianData .anchor-b .el-radio__label{
   padding-left: 0;
   margin-right: 10px;
   font-size: 12px;
 }
 #zujianData .anchor-b .el-input{
   width:380px;
 }
</style>
