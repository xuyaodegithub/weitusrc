<template>
  <div id="newGift1">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="粉领价格:">
        <el-input v-model="isPrice" size="small"></el-input>
      </el-form-item>
      <el-form-item label="收益设置:">
        <div class="priceSet" style="padding: 20px 0;">
          <p><label>联创:</label>
            <el-input v-model="isMoreStar" size="small"></el-input>
          </p>
          <p><label>联创:</label>
            <el-input v-model="isStar" size="small"></el-input>
          </p>
          <p><label>城市合伙人:</label>
            <el-input v-model="isWeStar" size="small"></el-input>
          </p>
          <!--<p><label>明星督导:</label> <el-input v-model="isStar" size="small" ></el-input></p>-->
          <p><label>高级督导:</label>
            <el-input v-model="isSoHighPrice" size="small"></el-input>
          </p>
          <p><label>高级督导:</label>
            <el-input v-model="isHighPrice" size="small"></el-input>
          </p>
          <p><label>督导:</label>
            <el-input v-model="isDuDao" size="small"></el-input>
          </p>
          <p><label>粉领:</label>
            <el-input v-model="isPink" size="small"></el-input>
            <label>返还类型:</label>
            <el-radio-group v-model="isType">
              <el-radio :label="0" style="width: auto;">无收益</el-radio>
              <el-radio :label="1" style="width: auto;">余额</el-radio>
              <el-radio :label="2" style="width: auto;">积分</el-radio>
              <el-radio :label="3" style="width: auto;">小金库</el-radio>
            </el-radio-group>
          </p>
          <p><label>开通人:</label>
            <el-input v-model="isMe" size="small"></el-input>
            <label>返还类型:</label>
            <el-radio-group v-model="isOwnType">
              <el-radio :label="0" style="width: auto;">无收益</el-radio>
              <el-radio :label="1" style="width: auto;">余额</el-radio>
              <el-radio :label="2" style="width: auto;">积分</el-radio>
              <el-radio :label="3" style="width: auto;">小金库</el-radio>
            </el-radio-group>
          </p>
        </div>
      </el-form-item>
      <!--<el-form-item label="非督导体系收益账户:">
        <el-radio-group v-model="isNoPType">
          <el-radio :label="1" style="width: auto;">余额</el-radio>
          <el-radio :label="2" style="width: auto;">小金库</el-radio>
          <el-radio :label="3" style="width: auto;">积分</el-radio>
        </el-radio-group>
      </el-form-item>-->
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
    name: 'openPriceSet',
    data () {
      return {
        isPrice: '',
        isStar: '',
        isWeStar: '',
        isHighPrice: '',
        isSoHighPrice: '',
        isDuDao: '',
        form: {},
        isMoreStar: '',
        isType: '',
        isOwnType: '',
        isNoPType: '',
        isPink: '',
        isMe: ''
      }
    },
    computed: {
      ...mapGetters([
        'popoverAlive', 'commissionInfoResult'
      ])
    },
    components: {},
    watch: {
      commissionInfoResult: {
        handler (newVal, oldVal) {
          //let that=this
          // console.log(newVal.title+','+oldVal.title)
          this.isPrice = this.commissionInfoResult.price
          this.isMoreStar = this.commissionInfoResult.starMoreCommission
          this.isStar = this.commissionInfoResult.starCommission
          this.isWeStar = this.commissionInfoResult.cityCommission
          //this.isMoreStar = this.commissionInfoResult.starMoreCommission
          //this.isStar = this.commissionInfoResult.starCommission
          this.isHighPrice = this.commissionInfoResult.highSupervisorCommission
          this.isSoHighPrice = this.commissionInfoResult.highSupervisorMoreCommission
          this.isDuDao = this.commissionInfoResult.supervisorCommission
          this.isPink=this.commissionInfoResult.storeCommission
          this.isType=this.commissionInfoResult.storeCommissionType
          this.isMe=this.commissionInfoResult.selfCommission
          this.isOwnType=this.commissionInfoResult.selfCommissionType

        },
        deep: true
      }
    },
    activated () {
      let data = {
        type: 1
      }
      this.commissionInfoActions(data)
    },
    methods: {
      ...mapActions([
        'popoverAlert', 'commissionInfoActions', 'setCommissionActions'
      ]),
      saveProduct () {
        let data = {
          highSupervisorCommission:this.isHighPrice,
          highSupervisorMoreCommission:this.isSoHighPrice,
          price:this.isPrice,
          supervisorCommission:this.isDuDao,
          type:1,
          starCommission:this.isStar,
          starMoreCommission:this.isMoreStar,
          cityCommission:this.isWeStar,
          selfCommission:this.isMe,
          selfCommissionType:this.isOwnType,
          storeCommission:this.isPink,
          storeCommissionType:this.isType,
        }
        this.setCommissionActions(data)
      },
      choseGoods () {
        this.popoverAlert(['VchoseGoods', 'one'])
      },
      upSuccessfirst (response, file, fileList) {
        this.dialogImageUrl = 'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
    }
  }
</script>

<style scoped lang="scss">
  #newGift1 {
    padding-left: 15px;
    .priceSet label {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin-right: 10px;
    }
    .el-input {
      width: 250px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    p {
      margin-bottom: 15px;
    }
    .el-button {
      width: 100px;
    }
    .el-radio + .el-radio {
      margin-left: 10px;
    }
  }
</style>
