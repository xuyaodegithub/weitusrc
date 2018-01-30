/**
 * Created by Yan on 17/11/9.
 */

  //import Vue from 'vue'

const getters = {//返回state内的数据进行模板使用
    //弹框属性输出
    popoverAlive: state => {
      return state.result.popoverAlive
    },
    //品牌模块切换
    classResult : state => {
      return state.result.classResult
    },
    //分类模块切换
    fenleiCalssResult: state => {
      return state.result.fenleiCalssResult
    },
    //切换接受
    upDataPpResult : state => {
      return state.result.upDataPpResult
    },
    //分类切换接受
    FlDataResult : state => {
      return state.result.FlDataResult
    },
    //id品牌
    getByIdResult: state => {
      return state.result.getByIdResult
    },
    //所有品牌
    getAllPpResult: state => {
      return state.result.getAllPpResult
    },
    //新增品牌
    newPushResult: state => {
      return state.result.newPushResult
    },
    //all分类
    getAllTreeResult: state => {
      return state.result.getAllTreeResult
    },
    //单个分类详情
    ByIdGetTreeResult: state => {
      return state.result.ByIdGetTreeResult
    },
    //获得一个分类型所有大规格
    getProductSpecsResult: state => {
      return state.result.getProductSpecsResult
    },
    //获得一个分类大规格下的 所有规格特征明细
    getProductSpecDetailsResult: state => {
      return state.result.getProductSpecDetailsResult
    },
    //大规格编辑
    smallguigeResult: state => {
      return state.result.smallguige
    },
    //小规格编辑
    updataSmallResult: state => {
      return state.result.updataSmall
    },
    //获取一个分类下的 商品参数模板
    getParamsByCategoryIdResult: state => {
      return state.result.getParamsByCategoryIdResult
    },
    //时间选择器
    pickerOptions2:state => {
      return state.result.pickerOptions2
    },
    //省市选择器
    cityListResult: state => {
      return state.result.cityList
    },
    //城市列表
    smallCityList: state => {
      return state.result.smallCityList
    },
    //县级列表
    xianjiList: state => {
      return state.result.xianjiList
    },
    //是否禁用
    trueOrfalse: state => {
      return state.result.trueOrfalse
    },
    //loading
    loading: state => {
      return state.result.loading
    },
    //时间选择
    value4Result: state => {
      return state.result.value4Result
    },
    //活动切换
    activeChangeResult: state => {
      return state.result.activeChange
    },
    //活动组件编辑
    commodityResult: state => {
      return state.result.commodityResult
    },
    //组件add
    addCommodityResult: state => {
      return state.result.addCommodityResult
    },
//backColorResult背景设置
    backColorResult: state => {
      return state.result.backColorResult
    },
    //添加活动
    insertActiveResult : state => {
      return state.result.insertActiveResult
    },
    //获取活动列表
    listActiveResult: state => {
      return state.result.listActiveResult
    },
    //编辑活动列表
    /* updateActiveResult: state => {
      return state.result.updateActiveResult
     },*/
    //根据id获取活动信息
    getByIdActiveResult: state => {
      return state.result.getByIdActiveResult
    },
    //活动分类添加商品
    addDataNumResult: state => {
      return state.result.addDataNum
    },
    //产品list
    getDataListResulr: state => {
      return state.result.getDataListResulr
    },
//活动分类商品list
    classDataListResult: state => {
      return state.result.classDataListResult
    },
//OssList返回
    OssListResult: state => {
      return state.result.OssListResult
    },
    //获取拼团商品列表
    productlistResult: state => {
      return state.result.productlistResult
    },
    //获取更多试用列表
    freeUseListResult: state => {
      return state.result.freeUseListResult
    },
    //获取积分试用列表
    scoreBuyListResult: state => {
      return state.result.scoreBuyListResult
    },
    //radios
    radiosResult: state => {
      return state.result.radiosResult
    },
    //ImgUrlResult
    ImgUrlResult: state => {
      return state.result.ImgUrlResult
    },
    //pintuanResult
    pintuanResult: state => {
      return state.result.pintuanResult
    },
    //ImgnumKey
    ImgnumKeyResult: state=>{
      return state.result.ImgnumKey
    },


    loginResult: state => {
      return state.result.loginResult
    },
    iframeSrc: state => {
      return state.result.iframeSrc
    }

  }

export default  getters
