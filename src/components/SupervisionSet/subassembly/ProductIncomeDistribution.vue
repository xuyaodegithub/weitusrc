<template>
  <div id="ProductIncomeD">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt; 产品收益配置
    </p>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="普通产品" name="first">
        <div class="first">
          <p><label>白领购买收益:</label>
            <el-input v-model="isWhite" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>金领购买收益:</label>
            <el-input v-model="isGolen" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>粉领购买收益:</label>
            <el-input v-model="isPink" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>白领分享收益:</label>
            <el-input v-model="isWhiteShare" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>金领分享收益:</label>
            <el-input v-model="isGolenShare" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>粉领分享收益:</label>
            <el-input v-model="isPinkShare" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>督导收益:</label>
            <el-input v-model="isSupervisor" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>高级督导收益:</label>
            <el-input v-model="isSoHighSupervisor" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>高级督导收益(高层次):</label>
            <el-input v-model="isHighSupervisor" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>联创收益:</label>
            <el-input v-model="isSoWithCreate" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>联创收益(高层次):</label>
            <el-input v-model="isWithCreate" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>城市合伙人收益:</label>
            <el-input v-model="isCityPartner" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>梦想合伙人收益:</label>
            <el-input v-model="isDreamPartner" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>财富合伙人收益:</label>
            <el-input v-model="isWealthPartner" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>品牌合伙人收益:</label>
            <el-input v-model="isBrandPartner" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>产品利润提成百分比:</label>
            <el-input v-model="isProductScale" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>实体店主是否获得收益:</label>
            <el-radio-group v-model="isPhysicalStoreGet"><!--:disabled="classWh === '1'"-->
              <el-radio :label=1 style="width: auto;">是</el-radio>
              <el-radio :label=0 style="width: auto;">否</el-radio>
              <!--<el-radio :label=4 style="width: auto;">试海外</el-radio>-->
            </el-radio-group>
          </p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="特卖产品" name="second">
        <div class="second">
          <p><label>粉领特卖收益:</label>
            <el-input v-model="isPlusCommission" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>督导特卖收益:</label>
            <el-input v-model="isSuperPlusCommission	" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>高级督导特卖收益:</label>
            <el-input v-model="isHighSupervisorPlusMore" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>高级督导特卖收益(高层次):</label>
            <el-input v-model="isHighSupervisorPlus" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>联创特卖收益:</label>
            <el-input v-model="isSoWithCreatePlus" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>联创特卖收益(高层次):</label>
            <el-input v-model="isWithCreatePlus" placeholder="请输入内容" size="small"></el-input>
          </p>
          <p><label>特卖产品利润提成比例:</label>
            <el-input v-model="isPlusCommissionRate" placeholder="请输入内容" size="small"></el-input>
          </p>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" plain @click="saveProduct()" size="small"
               style="width:100px;margin-left:300px;margin-top: 50px">确定
    </el-button>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  // import vFirst from '../page/first.vue'
  export default {
    name: 'supervisionIndex',
    data () {
      return {
        activeName2: 'first',
        isWhite: '',
        isGolen: '',
        isPink: '',
        isWhiteShare: '',
        isGolenShare: '',
        isPinkShare: '',
        isSupervisor: '',
        isSoHighSupervisor: '',
        isHighSupervisor: '',
        isSoWithCreate: '',
        isWithCreate: '',
        isCityPartner: '',
        isDreamPartner: '',
        isWealthPartner: '',
        isBrandPartner: '',
        isProductScale: '',
        isPhysicalStoreGet: '',
        isPlusCommission: '',
        isSuperPlusCommission: '',
        isHighSupervisorPlusMore: '',
        isHighSupervisorPlus: '',
        isSoWithCreatePlus: '',
        isWithCreatePlus: '',
        isPlusCommissionRate: ''

      }
    },
    computed: {
      ...mapGetters([
        'popoverAlive', 'productCommissionInfoResult', 'plusCommissionInfoResult'
      ])
    },
    components: {},
    watch: {
      productCommissionInfoResult: {
        handler (newVal, oldVal) {
          this.isWhite = newVal.selfWhiteScore
          this.isGolen = newVal.selfGolenScore
          this.isPink = newVal.selfStoreScore
          this.isWhiteShare = newVal.oneWhiteScore
          this.isGolenShare = newVal.oneGolenScore
          this.isPinkShare = newVal.oneStoreScore//
          this.isSupervisor = newVal.supervisorScore
          this.isSoHighSupervisor = newVal.highSupervisorScore
          this.isHighSupervisor = newVal.highSupervisorMoreScore//
          this.isSoWithCreate = newVal.starSupervisorScore
          this.isWithCreate = newVal.starSupervisorMoreScore
          this.isCityPartner = newVal.cityPartnerCommission
          this.isDreamPartner = newVal.productDreamPartnerCommission
          this.isWealthPartner = newVal.productWealthPartnerCommission
          this.isBrandPartner = newVal.brandPartnerCommission
          this.isProductScale = newVal.productCommissionScale
          this.isPhysicalStoreGet = Number(newVal.isPhysicalStoreGetCommission)
        },
        deep: true
      },
      plusCommissionInfoResult: {
        handler (newVal, oldVal) {
          this.isPlusCommission = newVal.storePlusCommissionRate
          this.isSuperPlusCommission = newVal.supervisorPlusCommissionRate
          this.isHighSupervisorPlusMore = newVal.highSupervisorPlusCommissionRate
          this.isHighSupervisorPlus = newVal.highSupervisorPlusMoreCommissionRate
          this.isSoWithCreatePlus = newVal.starSupervisorPlusCommissionRate
          this.isWithCreatePlus = newVal.starSupervisorPlusMoreCommissionRate
          this.isPlusCommissionRate = newVal.plusCommissionRate

        },
        deep: true
      }

    },
    created () {
      let data = {
        type: 1
      }
      this.productCommissionInfoActions(data)
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert', 'productCommissionInfoActions', 'setProductCommissionInfoActions'
      ]),
      handleClick (tab, event) {
        console.log(tab)
        if (tab.name === 'second' && this.plusCommissionInfoResult.length <= 0) {
          // alert(1)
          let data = {
            type: 2
          }
          this.productCommissionInfoActions(data)
        }
      },
      saveProduct () {
        if (this.activeName2 === 'first') {
          let data = {
            selfWhiteScore: this.isWhite,
            selfGolenScore: this.isGolen,
            selfStoreScore: this.isPink,
            oneWhiteScore: this.isWhiteShare,
            oneGolenScore: this.isGolenShare,
            oneStoreScore: this.isPinkShare,//,
            supervisorScore: this.isSupervisor,
            highSupervisorScore: this.isSoHighSupervisor,
            highSupervisorMoreScore: this.isHighSupervisor,//
            starSupervisorScore: this.isSoWithCreate,
            starSupervisorMoreScore: this.isWithCreate,
            cityPartnerCommission: this.isCityPartner,
            productDreamPartnerCommission: this.isDreamPartner,
            productWealthPartnerCommission: this.isWealthPartner,
            brandPartnerCommission: this.isBrandPartner,
            productCommissionScale: this.isProductScale,
            isPhysicalStoreGetCommission: this.isPhysicalStoreGet
          }
          this.setProductCommissionInfoActions(data)
        } else {
          let data = {
            storePlusCommissionRate: this.isPlusCommission,
            supervisorPlusCommissionRate: this.isSuperPlusCommission,
            highSupervisorPlusCommissionRate: this.isHighSupervisorPlusMore,
            highSupervisorPlusMoreCommissionRate: this.isHighSupervisorPlus,
            starSupervisorPlusCommissionRate : this.isSoWithCreatePlus,
            starSupervisorPlusMoreCommissionRate: this.isWithCreatePlus,
            plusCommissionRate: this.isPlusCommissionRate
          }
          this.setProductCommissionInfoActions(data)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #toindex {
    font: 16px/36px "微软雅黑";
    background: none;
    border: 0;
    margin: 0;
    color: #333;
    font-weight: 600;
    text-indent: 0;
    overflow: hidden;
    margin-bottom: 15px;
  }

  #ProductIncomeD {
    .first, .second {
      display: flex;
      flex-wrap: wrap;
      p {
        width: 30%;
        label {
          display: inline-block;
          width: 150px;
          text-align: right;
          margin-right: 15px;
          margin-top: 15px;
        }
      }
    }
    .el-input {
      display: inline-block;
      width: 150px;
    }
  }
</style>
