<template>
  <div id="zujianData">
    <div v-if="commodityResult.modelSampleCode !=='catlist1'" class="banner">
      <div class="banner-t">
        <p><label>组件名称:</label><el-input v-model="commodityResult.name" placeholder="请输入内容" size="mini"></el-input></p>
        <p><label>组件类型:</label><span>BANNER</span></p>
      </div>
      <div class="img">
        <p class="clear" style="margin-bottom: 10px;">
          <i class="el-icon-delete cu" style="margin-left: 5px" @click="moveDelete()"></i>
          <i class="el-icon-caret-right cu" @click="moveRight()"></i>
          <i class="el-icon-caret-left cu" @click="moveLeft()"></i>
        </p>
          <div style="display: flex;position: relative">
            <label style="margin-right: 30px">图片:</label>
            <ul id="imgList">
                <li v-for="(item,key) in commodityResult.contents" @click="address(key)" v-if="commodityResult.contents.length>0" :class="{activete : num===key}" class="cu" >
                  <img :src="item.image ?item.image : 'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/23c31d63de867f568af9d1b8a3d193573b456a41'" alt=""/>
                  <i class="el-icon-success" style="position: absolute;right: 0;top:0;color:#73FF40;" v-if="item.url"></i>
                </li>
              <!--<li><el-button style="margin-top:25px;" size="mini" @click="addGoodsList()">关联商品</el-button></li>-->
              <li><el-button style="margin-top:25px;" size="mini"  @click="addimg()">上传图片</el-button>
                <!--<el-button type="success" plain style="margin-top: 5px;margin-left: 0;" size="mini" @click="addGoodsList()">关联商品</el-button>--></li>
            </ul>
            <el-upload
              action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
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
            </el-radio-group>
            </p>
            <p style="color: red;text-indent: 30px;">(每个产品（图片）都必须选择类型，若无跳转则选择无链接，若有跳转则必须选择对应类型)</p>
            <label style="margin-right: 20px;width: 60px;text-align: right;display: inline-block;margin-bottom: 10px;" v-if="radio2===29">活动选择:</label>
            <el-select v-model="value" placeholder="请选择活动" v-if="radio2===29" size="mini" @change="addImgUrl(value)">
              <el-option
                v-for="item in listActiveResult.result"
                :key="item.id? item.id : ''"
                :label="item.name ? item.name : ''"
                :value="item.name ? item.name : ''">
              </el-option>
            </el-select>
            <p>
            <label style="margin-right: 20px;width: 60px;text-align: right;display: inline-block;">链接:</label>
            <el-input v-model="ImgUrlResult" placeholder="请输入内容" size="mini" :disabled="openOrclose" @blur="change()" v-if="radio2!==17"></el-input>
            <el-input v-model="input" placeholder="请输入内容" size="mini" :disabled="openOrclose" @blur="change()" v-if="radio2===17"></el-input>
            <!--<el-input v-model="input" placeholder="请输入内容" size="mini" :disabled="radio2===31"></el-input>-->
            <!--<el-button style="width: 60px;margin: 0;padding: 4px;" type="success" size="mini" @click="change()">生成链接</el-button>-->
            </p>
            <p><label style="margin-right: 23px;display: inline-block;width: 60px;text-align: right;margin-top: 10px">图片边距:</label><el-input v-model="lineData" placeholder="请输入内容" size="mini" @blur="change2()"></el-input></p>
          </div>
      </div>
      <!--<p> <el-button type="primary" plain size="mini" @click="addimg()">修改图片</el-button></p>-->
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
        DetailOrOther:true,
        openOrclose:true,
        value:'请选择活动',
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
          {title:'拼团秒杀列表', which:6},
          {title:'拼团秒杀产品详情', which:7},
          {title:'正常拼团产品详情', which:1},
          {title:'超值拼列表', which:8},
//          {title:'普通产品详情', which:9},
          {title:'拼洋货列表', which:10},
          {title:'拼大牌列表', which:11},
          {title:'清仓拼列表', which:12},
          {title:'保险', which:4},
          {title:'开通粉领', which:3},
          {title:'粉领续费', which:32},
          {title:'粉领专享', which:5},
          //{title:'积分试用列表', which:13},
          {title:'试用产品详情', which:14},
          {title:'全球购列表', which:15},
          {title:'家居日用首页', which:16},
          {title:'品牌馆', which:17},
          {title:'试用', which:19},
          {title:'产品详情', which:20},
          {title:'品牌特卖', which:21},
          {title:'限时购', which:22},
          {title:'自营超市', which:23},
          {title:'美妆首页', which:26},
          {title:'今日上新', which:27},
          {title:'活动', which:29},
          {title:'小金库充值', which:30},
          {title:'无链接', which:31},
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
              this.$store.commit('ImgnumKey',0)
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
        'commodityResult','addDataNumResult','classDataListResult','activeChangeResult','listActiveResult','ImgnumKeyResult',
        'ImgUrlResult'
      ]),
    },
    methods: {
      ...mapActions([
        'commodityActions', 'popoverAlert','listActiveActions'
      ]),
      handlePictureCardPreview () {

      },
      handleClose (item) {
        this.tags.splice(this.tags.indexOf(item), 1)
      },
      address (key) {
        if (this.commodityResult.contents[key].url) {
          this.input = this.commodityResult.contents[key].url
          this.$store.commit('OtherImgUrl', this.commodityResult.contents[key].url)
        } else {
          this.input = ''
          this.$store.commit('OtherImgUrl','')
        }
        this.num = key
        this.$store.commit('ImgnumKey',key)
        //this.radio2=''
        this.openOrclose=true
        this.isTrue=true
        if(this.commodityResult.contents[key].type===1){
          this.radio2=19
        }else if(this.commodityResult.contents[key].type===2 && this.commodityResult.contents[key].indexId===20){
          this.radio2=20
        }else if(this.commodityResult.contents[key].type===2 && this.commodityResult.contents[key].indexId===14){
          this.radio2=14
        }else if(this.commodityResult.contents[key].type===2 && this.commodityResult.contents[key].indexId===1){
          this.radio2=1
        }else if(this.commodityResult.contents[key].type===2 && this.commodityResult.contents[key].indexId===7){
          this.radio2=7
        }else if(this.commodityResult.contents[key].type===3){
          this.radio2=21
        }else if(this.commodityResult.contents[key].type===4){
          this.radio2=22
        }else if(this.commodityResult.contents[key].type===5){
          this.radio2=23
        }else if(this.commodityResult.contents[key].type===6){
          this.radio2=16
        }else if(this.commodityResult.contents[key].type===7){
          this.radio2=15
        }else if(this.commodityResult.contents[key].type===8){
          this.radio2=26
        }else if(this.commodityResult.contents[key].type===9){
          this.radio2=27
        }else if(this.commodityResult.contents[key].type===10){
          this.radio2=2
        }else if(this.commodityResult.contents[key].type===11){
          this.radio2=3
        }else if(this.commodityResult.contents[key].type===12){
          this.radio2=30
        }else if(this.commodityResult.contents[key].type===13){
          this.radio2=5
        }else if(this.commodityResult.contents[key].type===14){
          this.radio2=6
        }else if(this.commodityResult.contents[key].type===15 && this.commodityResult.contents[key].typeId===1){
          this.radio2=8
        }else if(this.commodityResult.contents[key].type===15 && this.commodityResult.contents[key].typeId===4){
          this.radio2=10
        }else if(this.commodityResult.contents[key].type===15 && this.commodityResult.contents[key].typeId===2){
          this.radio2=11
        }else if(this.commodityResult.contents[key].type===15 && this.commodityResult.contents[key].typeId===5){
          this.radio2=12
        }else if(this.commodityResult.contents[key].type===16){
          this.radio2=4
        }else if(this.commodityResult.contents[key].type===17){
          this.radio2=17
        }else if(this.commodityResult.contents[key].type===18){
          this.radio2=29
        }else if(this.commodityResult.contents[key].type===19){
          this.radio2=32
        }else if(this.commodityResult.contents[key].type===0){
          this.radio2=31
        }else{
          this.radio2=''
        }
      },
      upSuccessfirst (response, file, fileList) {
        let obj={}
        let oImg= new Image()
        oImg.src='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+response.result
        let that=this
        //this.commodityResult.contents[this.num].image='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
        oImg.onload = function () {
          console.log('宽:'+oImg.width+','+'高:'+oImg.height)
          /*that.$set(that.commodityResult.contents[that.num],'image','http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result)
          that.commodityResult.contents[that.num].width=oImg.width
          that.commodityResult.contents[that.num].height=oImg.height*/
          obj.width=oImg.width
          obj.height=oImg.height
          obj.image='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
          obj.isTrue=false
          that.commodityResult.contents.push(obj)
        }
        console.log( that.commodityResult.contents[that.num])
      },
      upErre () {

      },
      addimg () {
        let oDiv = document.getElementsByClassName('el-upload--picture-card')[0]
       /* if(this.commodityResult.contents.length>0){
          oDiv.click()
        }else{
          this.$message({
            message:'请先添加商品',
            type:'warning'
          })
        }*/
       if(this.commodityResult.name){
         oDiv.click()
       }else{
         this.$message({
           message:'请先选择组件',
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
        //this.changData(9295)
       //console.log(this.num)
        if(this.radio2===17){
          let index=this.input.indexOf('=')
          this.$set(this.commodityResult.contents[this.num],'typeId',parseInt(this.input.substring(index+1)))
        }
        if (this.commodityResult.contents.length>0) {
          //if(this.radio2){}
          this.$set(this.commodityResult.contents[this.num],'url',this.input)
        }else{
          this.$message({
            message:'请先添加商品',
            type:'warning'
          })
        }
        console.log(this.commodityResult.contents[this.num])
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
        this.input1=''
        this.createOrUpdate=true
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
      addType(type){
        this.$set(this.commodityResult.contents[this.num],'type',type)
      },
      addTypeId(id){
        this.$set(this.commodityResult.contents[this.num],'typeId',id)
      },
      addProcuteId(id){
        this.$set(this.commodityResult.contents[this.num],'productId',id)
      },
      //图片跳转链接
      choseGoods(key){
        this.openOrclose=true
        this.$set(this.commodityResult.contents[this.num],'indexId',0)
        if(key===1){
          this.$store.commit('changeRadios','拼团商品')
          this.$store.commit('pinTuanOr',1)
          this.addGoodsList()
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
        }else if(key===2){
          console.log(this.commodityResult.contents[this.num])
          this.input='http://ol-h5-preview.olquan.cn/index/newIndex'
          this.addType(10)
        }else if(key===3){
          this.input='http://ol-site.olquan.com/weixin/member/openStore'
          this.addType(11)
        }else if(key===32){
          this.input='http://ol-site.olquan.com/weixin/member/renewConfirmOrder'
          this.addType(19)
        }else if(key===4){
          this.input='http://www.ins-box.com/channelcps?channelCode=966262c61960ed971942347b443c7743&to=http://www.ins-box.com/pagecontent?pageContentId=100044'
          this.addType(16)
        }else if(key===5){
          this.input='http://ol-h5-preview.olquan.cn/mine/index'
          this.addType(13)
        }else if(key===6){
          this.input='http://ol-h5-preview.olquan.cn/index/hotsale'
          this.addType(14)
        }else if(key===7){
          this.$store.commit('changeRadios','拼团商品')
          this.$store.commit('pinTuanOr',7)
          this.addGoodsList()
         /* if(this.commodityResult.contents[this.num].id){
          this.input='http://ol-h5-preview.olquan.cn/index/goodsDetali/id/'+this.commodityResult.contents[this.num].id+'?isLimit=1'
          this.addType(2)
          this.$set(this.commodityResult.contents[this.num],'indexId',7)
          }else{
            this.$message({
              message:'请先关联商品后再添加类型',
              type:'error'
            })
            this.radio2=''
          }*/
        }else if(key===8){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/1'
          this.addType(15)
          this.addTypeId(1)
        }/*else if(key===9){
          this.input='http://ol-site.olquan.com/weixin/product/newProductDetail?productId='+this.commodityResult.contents[this.num].id
        }*/else if(key===10){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/4'
          this.addType(15)
          this.addTypeId(4)
        }else if(key===11){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/2'
          this.addType(15)
          this.addTypeId(2)
        }else if(key===12){
          this.input='http://ol-h5-preview.olquan.cn/index/moreindex/id/5'
          this.addType(15)
          this.addTypeId(5)
        }/*else if(key===13){
          this.input='http://ol-h5-preview.olquan.cn/try/center?type=3'
        }*/else if(key===14){
          this.$store.commit('changeRadios','积分试用商品')
          this.addGoodsList()
          //this.input=
         /* if(this.commodityResult.contents[this.num].productId) {
            this.input = 'http://ol-h5-preview.olquan.cn/try/trygoods/id/' + this.commodityResult.contents[this.num].productId
            this.addType(2)
            //this.addProcuteId(this.commodityResult.contents[this.num].id)
            this.$set(this.commodityResult.contents[this.num], 'indexId', 14)
          }else{
            this.$message({
              message:'请先关联商品后再添加类型',
              type:'error'
            })
            this.radio2=''
          }*/
        }else if(key===15){
          this.input='http://ol-site.olquan.com/weixin/auth?view=/weixin/globalShopping/vm'
          this.addType(7)
        }else if(key===16){
          this.input='http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse?districtId=330185'
          this.addType(6)
        }else if(key===17){
          this.openOrclose=false
          this.input='http://ol-site.olquan.com/weixin/product/product?brandCode='
          this.addType(17)
          this.popoverAlert('VclassSell')
        }else if(key===19){
          this.input='http://ol-h5-preview.olquan.cn/try/moretry'
          this.addType(1)
        }else if(key===20){
          this.$store.commit('changeRadios','普通商品')
          this.addGoodsList()
          //this.input=this.commodityResult.contents[this.num].url
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

        }else if(key===21){
          this.input='http://ol-site.olquan.com/ol/weixin/index/indexRecommendBrand'
          this.addType(3)
        }else if(key===22){
          this.input='http://ol-site.olquan.com/weixin/limitBuy/limitBuy'
          this.addType(4)
        }else if(key===23){
          this.input='http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse'
          this.addType(5)
        }else if(key===26){
          this.input='http://ol-site.olquan.com/weixin/auth?view=http://ol-site.olquan.com/weixin/lifeHouse/lifeHouse?districtId=330104'
          this.addType(8)
        }else if(key===27){
          this.input='http://ol-site.olquan.com/weixin/product/product?isNew=1'
          this.addType(9)
        }else if(key===29){
          //this.input='http://ol-h5-preview.olquan.cn/activity/newact?id='+this.activeChangeResult.obj.id+'&memberId=778040'
          this.input=''
          this.addType(18)
         // this.popoverAlert('VactiveLianJian')
          this.listActiveActions()
        }else if(key===30){
          this.input='http://ol-site.olquan.com/weixin/member/coffersRecharge'
          this.addType(12)
        }else if(key===31){
          this.input='#'
          this.addType(0)
        /*  if (this.commodityResult.contents.length>0) {
            //if(this.radio2){}
            this.$set(this.commodityResult.contents[this.num],'url',this.input)
          }else{
            this.$message({
              message:'请先添加商品',
              type:'warning'
            })
          }*/
        }
        this.$store.commit('OtherImgUrl',this.input)
        this.change()
      },
      addGoodsList(){
        if(this.commodityResult.name){
          if(this.commodityResult.contents.length>0){
            this.popoverAlert('vAddGoods')
          }else{
            this.$message({
              message:'请先上传图片',
              type:'warning'
            })
          }
        }else{
          this.$message({
            message:'请先选择组件',
            type:'warning'
          })
        }
      },
      upOk(){
        let obj={
          subassembly: this.addCommodityResult,
          background: this.backColorResult
        }
        let data={
          id:this.activeChangeResult.obj.id,
          data:JSON.stringify(obj)
        }
        console.log(data)
        this.uploadDataToOSSActions(data)
      },
      addImgUrl(key){
//alert(key)
        let that=this
       // let arr=this.listActiveResult
        this.listActiveResult.result.forEach(function(val,index){
          if(val.name===key){
            that.input='http://ol-site.olquan.com/weixin/auth?view=http://ol-h5-preview.olquan.cn/activity/newact?id='+that.listActiveResult.result[index].id
            if (that.commodityResult.contents.length>0) {
              //if(this.radio2){}
              that.$set(that.commodityResult.contents[that.num],'url',that.input)
              that.$store.commit('OtherImgUrl',that.input)
            }else{
              that.$message({
                message:'请先上传图片',
                type:'warning'
              })
            }
          }
        })
      }
    }
}
</script>

<style>
 #zujianData .banner-t{
    display: flex;
    margin-bottom: 10px;
  }
 #zujianData .banner-t label{
    margin-right: 10px;
   line-height: 28px;
   height:28px;
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
    padding:10px;
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
   width:96px;
   display: inline-block;
 }
 #zujianData .anchor-b .el-input{
   width:380px;
 }
</style>
