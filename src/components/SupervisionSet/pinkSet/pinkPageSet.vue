<template>
  <div class="seach-list" id="superFirst">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="转发标题:">
        <el-input v-model="isName" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="转发描述:">
        <el-input type="textarea" v-model="isDesc" style="width: 700px;" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="转发图标:">
        <div style="display: flex;">
          <img :src="dialogImageUrl" alt="" style="height: 78px;width: 78px;" class="valign" v-if="dialogImageUrl">
          <el-upload
            class="upload-demo"
            action="apis/admin/buildblocks/uploadImage"
            name="img"
            :show-file-list="false"
            :on-success="upSuccessfirst">
            <el-button size="small" type="primary" style="margin: 25px 0 0 10px">点击上传</el-button>
          </el-upload>
        </div>
      </el-form-item><!--"http://test-admin.olquan.cn/doUploadWithWaterMarkToOss2?waterMark=defaultWaterMark"-->
      <el-form-item label="开通内容:">
        <div class="edit_container">
          <quill-editor v-model="infoForm.a_content"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </el-form-item>
       <el-form-item label="邀请内容:">
         <div class="edit_container">
           <quill-editor v-model="infoForm.b_content"
                         ref="myQuillEditor"
                         class="editer"
                         :options="editorOption" @ready="onEditorReady($event)">
           </quill-editor>
         </div>
       </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="saveProduct()" size="small">确定</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  //import { quillEditor } from 'vue-quill-editor' //调用编辑器
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    name: 'pinkPageSet',
    data () {
      return {
        isName:'',
        isDesc:'',
        isWhat2:'',
        isWhat:'',
        form:{},
        dialogImageUrl:'',
        infoForm: {
          a_title: '',
          a_source: '',
          a_content:'',
          b_content:'',
          editorOption: {}
        },
        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: 'apis/admin/buildblocks/uploadImage',
              response: (res) => {
                return 'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/'+res.result
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    components:{
      quillEditor
    },
    computed:{
      ...mapGetters([
    'pinkListResult'
      ]),
    },
    watch:{
      pinkListResult: {
        handler (newVal,oldVal) {
          //let that=this
          // console.log(newVal.title+','+oldVal.title)
            this.isName=this.pinkListResult.shareTitle
            this.isDesc=this.pinkListResult.shareDesc
          this.infoForm.a_content=this.pinkListResult.content
          this.infoForm.b_content=this.pinkListResult.inviteContent
            this.dialogImageUrl=this.pinkListResult.shareLogo
        },
        deep: true
      }
    },
    mounted(){
      let data={
        type:1
      }
      this.upInfoListActions(data)
    },
    methods: {
      ...mapActions([
        'popoverAlert','upInfoListActions','upinfoSaveActions'
      ]),
      saveProduct() {
        let data={
          content:this.infoForm.a_content,
          //id:'',
          inviteContent:this.infoForm.b_content,
          shareDesc:this.isDesc,
          shareLogo:this.dialogImageUrl,
          shareTitle:this.isName,
          type:1
        }
        if(this.pinkListResult){
          data.id=this.pinkListResult.id
        }
        this.upinfoSaveActions(data)
        console.log(this.editorText)
      },
      upSuccessfirst(response, file, fileList){
        this.dialogImageUrl='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      onEditorReady(editor) {
      },

    }
  }
</script>

<style lang="scss" scoped>
  #superFirst{
    margin-top:16px;
    padding-left:15px;
    .el-input{
      width:250px;
    }
    .el-form-item{
      margin-bottom: 15px;
    }
    .el-radio-group{
      display: flex;flex-wrap: wrap;
      background: rgba(242, 242, 242, 1);
      padding:10px 10px 0 10px;
      width:750px;
      .el-radio+.el-radio{
        margin:0 0 10px 0;
      }
      label.el-radio{
        display: inline-block; width:150px;
      }
    }
    .el-button{
      margin-left: 10%;
      width:100px;
    }
  }
  #SaleNewTwo div.el-upload--picture-card{
    position: relative;
    display: none;
  }
</style>
