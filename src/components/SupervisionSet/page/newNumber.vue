<template>
  <div class="seach-list" id="SaleNewone">
      <div v-if="msgData.numnew!=='third'">
      <el-form>
        <el-form-item label="账号昵称:">
          <el-input v-model="isName" placeholder="请输入昵称" size="mini" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <!--<el-input v-model="isHeader" placeholder="请输入昵称" size="mini"></el-input>-->
          <el-upload
            class="upload-demo"
            action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
            :show-file-list="false"
            name="img"
            :on-success="upSuccessfirst">
            <div style="margin: 10px 0 0px 10px;">
              <img :src="dialogImageUrl" alt="" style="height: 100px;width: 100px;margin-right: 15px;border-radius: 50%;"
                   class="valign" v-if="dialogImageUrl">
              <el-button size="small" type="primary">点击上传</el-button>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号备注:">
          <el-input placeholder="请输入昵称" size="mini" style="width: 300px;" :maxlength="30" v-model="isMsg"></el-input>
          <span style="font-size: 12px;color: orange;">（30个字符）</span>
        </el-form-item>
      </el-form>
      <el-button type="primary" plain style="width:100px;margin-left: 50px;margin-top: 50px;" size="small"
                 @click="upOk()">{{msgData.type === 'add' ? '提交新增' : '确认修改'}}
      </el-button>
    <!-- <el-button type="primary" plain style="width:100px;margin-left: 50px;margin-top: 50px;" size="small"
                @click="upOk(2)">进入发现列表
     </el-button>
     <span style="font-size: 12px;color: orange;">（此账号下的发现文章列表）</span>-->
    </div>
    <div v-else>
      <label>会员账号:</label>
      <el-input v-model="isAccountNo" placeholder="请输入" size="mini" style="width: 150px;"></el-input>
      <el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
      <!--<el-button type="primary" style="width:100px;float: right;margin-right: 50px;margin-top: -16px" round size="mini" icon="el-icon-search"-->
                 <!--@click="toggleSelection(multipleSelection)">批量添加-->
      <!--</el-button>-->
      <el-table
        v-loading="loading"
        :data="accountNoListResult.rows"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        @selection-change="handleSelectionChange"
        :cell-style="{'height': '50px','padding': '6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.title"
          :key="index"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="item.which==='logo'"><img :src="scope.row[item.which]" alt="" style="display: block;width: 76px;height: 76px;"></span>
            <span v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="addCountNo(scope.row)" plain>添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage5"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="accountNoListResult.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    props: ['msg', 'msgData'],
    name: 'newNumber',
    data() {
      return {
        isName: '',
        dialogImageUrl: '',
        isMsg: '',
        isAccountNo:'',
        rows:10,
        currentPage5:1,
        multipleSelection:[],
        dataList: [
          {title: '昵称', width: '120', which: 'nickName'},
          {title: '头像', width: '120', which: 'logo'},
          {title: '帐号', width: '230', which: 'accountNo'},
          {title: '姓名', width: '90', which: 'realName'},
//          {title:'账号昵称',width:'100',which:'isN'},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'accountNoListResult','loading'
      ]),

    },
    watch: {
      findMsgResult: {
        handler(newVal, oldVal) {
          this.isName = newVal.name
          this.dialogImageUrl = newVal.logo
          this.isMsg = newVal.desc

        },
        deep: true
      },
    },
    activated() {
      if(this.msgData.type==='add' && this.msgData.numnew==='first'){
        this.isName=''
        this.dialogImageUrl=''
        this.isMsg=''
      }else if(this.msgData.type==='add' && this.msgData.numnew==='third'){
        this.isAccountNo=''
      }else{
        this.isName=this.msgData.item.name
        this.dialogImageUrl=this.msgData.item.logo
        this.isMsg=this.msgData.item.desc
      }
    },
    mounted() {
      this.seachGoodsList()
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'findAccountSaveActions','accountNoActions'
      ]),
      upSuccessfirst(response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      upOk() {
        let data = {
          logo: this.dialogImageUrl,//this.dialogImageUrl,
          name: this.isName,
          status: 0,
          desc: this.isMsg,
          type:1,
        }
        if (this.msgData.type === 'add') {
          this.findAccountSaveActions(data)
        }else{
          data.id=this.msgData.item.id
          data.status=this.msgData.item.status
          data.type=this.msgData.item.type
          this.findAccountSaveActions(data)
        }
        let obj={
          type:'',
          data:'',
          title:'vSeach'
        }
        this.$emit('to-change',obj)
      },
      seachGoodsList(){
        let data={
          page:this.currentPage5,
          rows:this.rows,
          filter_S_accountNo:this.isAccountNo
        }
        this.accountNoActions(data)
      },
      handleSizeChange (val) {
//        console.log(`每页 ${val} 条`)
        this.rows=val
        this.seachGoodsList()
      },
      handleCurrentChange (val) {
//        console.log(`当前页: ${val}`)
        this.currentPage5=val
        this.seachGoodsList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      toggleSelection(item){

      },
      addCountNo(item){
        let data = {
          logo: item.logo,//this.dialogImageUrl,
          name: item.nickName,
          status: 0,
//          desc: this.isMsg,
          type:2,
          autoId:item.id
        }
        this.findAccountSaveActions(data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
  }
.block{
  text-align: center;
  margin-top: 15px;
}
</style>
