<template>
  <div id="zujianData">
    <div v-if="commodityResult.name != '产品列表'" class="banner">
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
                <li v-for="(item,key) in commodityResult.contents" @click="address(key)" v-if="commodityResult.contents.length>0" :class="{activete : item.isTrue}">
                  <img :src="item.image | ToUrl" alt="" class="cu" />
                </li>
            </ul>
            <el-upload
              action="/apis/admin/buildblocks/img/uploadImage"
              name="img"
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
            <label style="margin-right: 30px;width: 60px;text-align: right;display: inline-block;">链接:</label><el-input v-model="input" placeholder="请输入内容" size="mini" @blur="change()"></el-input><br/>
            <label style="margin:15px 30px 0 0;width: 60px;text-align: right;display: inline-block;">图片边距:</label><el-input v-model="lineData" placeholder="请输入内容" size="mini" @blur="change2()"></el-input>
          </div>
      </div>
      <p> <el-button type="primary" plain size="mini" @click="addimg()">添加图片</el-button></p>
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
        <el-button
          style="padding: 6px 0px;margin: 0 10px 0 0;"
          v-for="(tag,key) in commodityResult.contents"
          type="primary"
          :key="key"
          plain
          size="mini"
          @click="updateTag(key)"
        :class="{ addborder: commodityResult.contents[key].trOrFa}">
            {{tag.title}}<i class="el-icon-close" style="float: right;font-size: 14px;" @dblclick="CloseTag(key)"></i>
        </el-button>
      </div>
      <div class="addGoodList">
        <p  style="font:14px/28px '微软雅黑'"><label>产品列表:</label> <el-button type="primary" plain size="mini" icon="el-icon-plus" style="float: right;" @click="popoverAlert('vAddGoods')">添加关联产品</el-button></p>
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
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
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
        num: '',
        input1: '',
        tags: [],
        currentPage4: 1
      }
    },
    watch: {
      commodityResult: {
        handler (curVal, oldVal) {
          this.lineData = curVal.marginData
          if (curVal.name !== oldVal.name && curVal.name !== '产品列表') {
            let that = this
            if (curVal.contents[0]) {
              let numfalse = 0
              curVal.contents.forEach(function (val, index) {
                if (val.isTrue) {
                  that.input = curVal.contents[index].url
                } else {
                  numfalse++
                }
              })
              if (numfalse === curVal.contents.length) {
                that.input = ''
              }
            } else {
              this.input = ''
            }
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters([
        'commodityResult','addDataNumResult','classDataListResult'
      ])
    },
    methods: {
      ...mapActions([
        'commodityActions', 'popoverAlert'
      ]),
      handlePictureCardPreview () {

      },
      handleClose (item) {
        this.tags.splice(this.tags.indexOf(item), 1)
      },
      address (key) {
        for (let i = 0; i < this.commodityResult.contents.length; i++) {
          this.commodityResult.contents[i].isTrue = false
        }
        this.commodityResult.contents[key].isTrue = true
        if (this.commodityResult.contents[key].url) {
          this.input = this.commodityResult.contents[key].url
        } else {
          this.input = ''
        }
        this.num = key
      },
      upSuccessfirst (response, file, fileList) {
        let oImg= new Image()
        oImg.src='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+response.result
        let that=this
        oImg.onload = function () {
          console.log('宽:'+oImg.width+','+'高:'+oImg.height)
          if (that.commodityResult.contents) {
            let obj = {
              image: response.result,
              url: '',
              width:oImg.width,
              height:oImg.height,
              isTrue: false
            }
            that.commodityResult.contents.push(obj)
          }
        }
      },
      upErre () {

      },
      addimg () {
        let oDiv = document.getElementsByClassName('el-upload--picture-card')[0]
        oDiv.click()
      },
      moveLeft () {
        let key = null
        this.commodityResult.contents.forEach(function(value,index){
          if (value.isTrue) {
            key = index
            return key
          }
        })
        let item = this.commodityResult.contents[key]
        if (key === 0) {
          this.commodityResult.contents.splice(key, 1)
          this.commodityResult.contents.push(item)
        } else {
          this.commodityResult.contents.splice(key, 1)
          this.commodityResult.contents.splice(key - 1, 0, item)
        }
      },
      moveRight () {
        let key = null
        this.commodityResult.contents.forEach(function (value, index) {
          if (value.isTrue) {
            key = index
            return key
          }
        })
        let item = this.commodityResult.contents[key]
        if (key == this.commodityResult.contents.length-1) {
          this.commodityResult.contents.splice(key, 1)
          this.commodityResult.contents.unshift(item)
        } else {
          this.commodityResult.contents.splice(key, 1)
          this.commodityResult.contents.splice(key + 1, 0, item)
        }
      },
      moveDelete () {
        let key = null
        this.commodityResult.contents.forEach(function (value, index) {
          if (value.isTrue) {
            key = index
            return key
          }
        })
        if (key !== null) {
          this.commodityResult.contents.splice(key, 1)
          this.input = ''
        }
      },
      change () {
        if (this.input && this.num !== '') {
          this.commodityResult.contents[this.num].url = this.input
        }
      },
      change2(){
        if(this.lineData){
        this.commodityResult.marginData=this.lineData
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
        //let key=this.commodityResult.contents[this.num].dataList.indexOf(row)
        this.commodityResult.contents[this.num].dataList.splice(index,1)
        this.$store.commit('GET_CLASS_DATA_LIST',this.commodityResult.contents[this.num].dataList)
      },
      changeOr () {
        this.createOrUpdate = true
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
  width:72px;
  height:72px;
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
 #zujianData .activete{
   border:1px solid red;

  }
 #zujianData .img > p > i{
   float: right;
   font-size:24px;
 }
  #goodChangeList .flmcList .el-input{
    width:250px;
    margin-left: 10px;
  }
 #goodChangeList .flmcList p:first-child{
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
 #goodChangeList .el-table th>div.cell,#goodChangeList .el-table .cell,#goodChangeList .el-table{
   font-size: 12px;
 }
 #zujianData #imgList{
   display: flex;
   flex-wrap: wrap;
 }
 #zujianData .addborder{
   border-color:red;
 }
</style>
