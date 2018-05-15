<template>
  <div id="newGift1">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="续费金额:">
        <el-input v-model="isPrice" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="续费赠送金额:">
        <el-input v-model="isGivePrice" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="赠送账户:">
        <el-radio-group v-model="isType">
          <el-radio :label="0" style="width: auto;">不赠送</el-radio>
          <el-radio :label="1" style="width: auto;">余额</el-radio>
          <el-radio :label="2" style="width: auto;">积分</el-radio>
          <el-radio :label="3" style="width: auto;">小金库</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择优惠券包:">
        <!--<el-input v-model="isCoumpBag" size="small" ></el-input>-->
        <el-select v-model="isCoumpBag" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收益设置:">
       <div class="priceSet" style="padding: 20px 0;">
         <p><label>明星督导:</label> <el-input v-model="isMoreStar" size="small" ></el-input></p>
         <!--<p><label>明星督导:</label> <el-input v-model="isStar" size="small" ></el-input></p>-->
         <p><label>高级督导:</label> <el-input v-model="isSoHighPrice" size="small" ></el-input></p>
         <p><label>高级督导:</label> <el-input v-model="isHighPrice" size="small" ></el-input></p>
         <p><label>督导:</label> <el-input v-model="isDuDao" size="small" ></el-input></p>
         <p><label>粉领:</label> <el-input v-model="isDuDao" size="small" ></el-input></p>
         <p><label>自己:</label> <el-input v-model="isDuDao" size="small" ></el-input></p>
         <!--<p><label>自己:</label> <el-input v-model="isPrice" size="small" ></el-input></p>-->
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
  export default {
  name: 'continuousSet',
  data () {
    return {
      isPrice:'',
      isGivePrice:'',
      isStar:'',
      isHighPrice:'',
      isSoHighPrice:'',
      isDuDao:'',
      form:{},
      isMoreStar:'',
      isCoumpBag:'',
      isType:'',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','commissionInfoResult'
    ])
  },
  components:{

  },
    watch:{
     /* commissionInfoResult: {
        handler (newVal,oldVal) {
          //let that=this
          // console.log(newVal.title+','+oldVal.title)
          this.isPrice=this.commissionInfoResult.price
          this.isMoreStar=this.commissionInfoResult.starMoreCommission
          this.isStar=this.commissionInfoResult.starCommission
          this.isHighPrice=this.commissionInfoResult.highSupervisorCommission
          this.isSoHighPrice=this.commissionInfoResult.highSupervisorMoreCommission
          this.isDuDao=this.commissionInfoResult.supervisorCommission
          //this.dialogImageUrl=this.commissionInfoResult.shareLogo
        },
        deep: true
      }*/
    },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert','commissionInfoActions','setCommissionActions'
    ]),
    saveProduct(){
     /* let data={
        highSupervisorCommission:this.isHighPrice,
        highSupervisorMoreCommission:this.isSoHighPrice,
        price:this.isPrice,
        supervisorCommission:this.isDuDao,
        type:2,
        starMoreCommission:this.isMoreStar,
        starCommission:this.isStar
      }
      this.setCommissionActions(data)*/
    },
    choseGoods(){
      this.popoverAlert(['VchoseGoods','one'])
    },
    upSuccessfirst(response, file, fileList){
      this.dialogImageUrl='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
  }
}
</script>

<style scoped lang="scss">
  #newGift1{
    padding-left:15px;
    .priceSet label{
      display: inline-block;
      width:70px;
      text-align: right;margin-right: 10px;
    }
  .el-input{
    width:250px;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
    p{
      margin-bottom: 15px;
    }
    .el-button{
      width:100px;
    }
    .el-radio + .el-radio {
      margin-left: 10px;
    }
  }
</style>
