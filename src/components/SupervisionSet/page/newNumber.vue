<template>
  <div class="seach-list" id="SaleNewone">
    <el-form>
      <el-form-item label="账号昵称:">
        <el-input v-model="isName" placeholder="请输入昵称" size="mini" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item label="头像:">
        <!--<el-input v-model="isHeader" placeholder="请输入昵称" size="mini"></el-input>-->
        <el-upload
          class="upload-demo"
          action="apis/admin/buildblocks/uploadImage"
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
      <el-form-item label="账号说明:">
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
        isMsg: ''
      }
    },
    computed: {
      ...mapGetters([]),

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
      if(this.msgData.type==='add'){
        this.isName=''
        this.dialogImageUrl=''
        this.isMsg=''
      }else{
        this.isName=this.msgData.item.name
        this.dialogImageUrl=this.msgData.item.logo
        this.isMsg=this.msgData.item.desc
      }
    },
    mounted() {
//      let value=this.$Getcookie('JSESSIONID')
//      this.$Setcookie()
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'findAccountSaveActions'
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
  }

</style>
