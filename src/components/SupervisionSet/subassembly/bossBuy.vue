<template>
  <div id="smalltitle">
    <p id="toindex">
      <!--<router-link to="index">首页</router-link> &gt; 经理购买记录-->
    </p>
    <div class="topseach">
      <label>账号:</label>
      <el-input v-model="isName" placeholder="请输入账号" size="mini"></el-input>
      <label>购买时间:</label>
      <!--<el-input v-model="isTime" placeholder="请输入账号" size="mini"></el-input>-->
      <el-date-picker
        style="width: 220px;"
        v-model="isTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        size="mini">
      </el-date-picker>
      <!--<el-button  type="danger" icon="el-icon-delete" round @click="seachList()" size="mini" style="width: 100px;">搜索</el-button>-->
      <label>发货状态:</label>
      <el-radio-group v-model="isStatus"><!--:disabled="classWh === '1'"-->
        <el-radio :label="2" style="width: auto;">全部</el-radio>
        <el-radio :label="1" style="width: auto;">已发货</el-radio>
        <el-radio :label="0" style="width: auto;">未发货</el-radio>
      </el-radio-group>
      <label>审核状态:</label>
      <el-radio-group v-model="isAduio"><!--:disabled="classWh === '1'"-->
        <el-radio :label="3" style="width: auto;">全部</el-radio>
        <el-radio :label="2" style="width: auto;">已拒绝</el-radio>
        <el-radio :label="1" style="width: auto;">已审核</el-radio>
        <el-radio :label="0" style="width: auto;">待审核</el-radio>
      </el-radio-group>
      <el-button type="primary" style="width:100px;margin-left: 30px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
      <!--<el-button v-if="activeName2==='third'"  type="success" icon="el-icon-printer" round @click="seachList()" size="mini" style="width: 100px;margin:0 20px;">批量发货</el-button>-->
      <div style="text-align: right;margin-right: 50px;margin-top: 10px;">
        <el-button  type="warning" icon="el-icon-download" round @click="export2Excel()" size="mini" style="width: 100px;">导出</el-button >
        <el-button  type="warning" icon="el-icon-upload2" round @click="pullMore()" size="mini" style="width: 100px;">导入</el-button >
      </div>
    </div>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <!--<el-tab-pane label="购买记录" name="first">-->
        <!--<v-first></v-first>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="申请记录" name="third">
        <v-second :msg="seachMsg"></v-second>
      </el-tab-pane>
    </el-tabs>
    <input type="file" @change="importFile(this)" id="imFile" style="display: none"
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    <!--错误信息提示-->
    <el-dialog title="提示" v-model="errorDialog">
      <span>{{errorMsg}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="errorDialog=false">确认</el-button>
  </span>
    </el-dialog>
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
  name: 'bossBuy',
  data () {
    return {
      activeName2:'third',
      isName:'',
      isStatus:2,
      isAduio:3,
      isTime:[],
      seachMsg:{
        page:1,
        rows:10
      },
      fullscreenLoading: false, // 加载中
      imFile: '', // 导入文件el
      outFile: '',  // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
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
     'popoverAlive','applySupervisorList'
    ])
  },
  components:{
    vFirst,vSecond
  },
    mounted(){
      let data={
        page:1,
        rows:10,
      }
      this.applySupervisorListActions(data)
      this.imFile=document.getElementById('imFile')
    },
  methods: {
    ...mapActions([
'popoverAlert','applySupervisorListActions','sendImportActions'
    ]),
    handleClick(tab, event) {
    //  console.log(tab, event);

    },
    seachGoodsList(){
      this.seachMsg={
        accountNo:this.isName,
        endTime:this.isTime ? this.isTime[1] : '',
        startTime:this.isTime ? this.isTime[0] : '',
        page:1,
        rows:10,
        filter_I_sendStatus:this.isStatus===2 ? '' : this.isStatus,
        filter_I_status:this.isAduio===3 ? '' : this.isAduio
      }
      this.applySupervisorListActions(this.seachMsg)
    },
    //导出方法
    export2Excel() {
//      let arr=Object.keys(this.tableData[0])

      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel');
        if(this.activeName2==='first'){
          const tHeader = ['账户', '昵称', '图像', '购买时间', '价格'];
          const filterVal =['number', 'name', 'image', 'buyTime', 'price'];
          const list = this.seachList;
          const data = this.formatJson(filterVal,list);
          export_json_to_excel(tHeader, data, '列表excel');
        }else{
          const tHeader = ['ID','账号', '昵称', '申请时间', '上级总监','审核状态','收货人姓名','手机号','收货地址','发货状态'];
          const filterVal =['id','accountNo', 'nickName',  'createTime','inviteMemberName','status','realName','mobile','address','sendStatus'];
         for(let i=0;i<this.applySupervisorList.rows.length;i++){
           if(this.applySupervisorList.rows[i].status===0){
             this.applySupervisorList.rows[i].status='待审核'
           }else if(this.applySupervisorList.rows[i].status===1){
             this.applySupervisorList.rows[i].status='已审核'
           }else{
             this.applySupervisorList.rows[i].status='已拒绝'
           }
         }
          const list = this.applySupervisorList.rows;
          const data = this.formatJson(filterVal,list);
          export_json_to_excel(tHeader, data, '列表excel');
        }
      })
    },
    formatJson(filterVal,list) {
      return list.map(v => filterVal.map(j => v[j]))
    },
    pullMore(){
      this.imFile.click()
    },
    importFile(){
      this.fullscreenLoading = true
      let obj = this.imFile
      if (!obj.files) {
        this.fullscreenLoading = false
        return
      }
      var f = obj.files[0]
      var reader = new FileReader()
      let $t = this
      reader.onload = function (e) {
        var data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        console.log(typeof json)
        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    analyzeData(data) {  // 此处可以解析导入数据
      return data
    },
    dealFile(data) {   // 处理导入的数据
      console.log(data)
      this.imFile.value = ''
      this.fullscreenLoading = false
      if (data.length <= 0) {
        this.errorDialog = true
        this.errorMsg = '请导入正确信息'
      } else {
//        console.log(typeof data)
        let ids=[]
        let status=[]
        Array.prototype.slice.call(data).forEach( (val,index) => {
          ids.push(val['ID'])
          status.push(val['发货状态'])
        })
        let obj={
          ids:ids.join(','),
          sendStatus:status.join(',')
        }
        this.sendImportActions(obj)
      }
    },
    fixdata () {  // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
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
      margin-left:5px;
    }

  }
  .el-input{
    width:150px;
  }


</style>
