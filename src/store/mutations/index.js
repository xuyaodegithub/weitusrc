/**
 * Created by Yan on 17/11/09.
 */
import * as types from '../fetch/type';
//import Vue from 'vue'

const mutations = {//mutations内是改变state内的值得作用
  //弹框显示隐藏
  changeAlert(state,where){
    state.result.popoverAlive.openOrClose = !state.result.popoverAlive.openOrClose;
    if (typeof where == "object") {
      state.result.popoverAlive.title = where[0];
    }else if(typeof where == "string"){
      state.result.popoverAlive.title = where;
    }
    if(typeof where == "object" && where.length>=2){
      state.result.popoverAlive.SSSnum = where[1];
    }
  },
  //loading
  changeloading (state) {
    state.result.loading=!state.result.loading
  },
  //品牌模块切换
  classResultTypes (state,data) {
    if (data.str) {
      state.result.classResult=data.str
    }
    if (data.obj) {
      state.result.upDataPpResult.obj=data.obj
    }
    if (data.where) {
      state.result.upDataPpResult.num=data.where
    }else{
      state.result.upDataPpResult.num='1'
    }

  },
  //分类模块切换
  fenleiClassResultTypes (state,data) {
    if (data.str) {
      state.result.fenleiCalssResult=data.str
    }
    if (data.obj && !data.num) {
      state.result.FlDataResult.obj=data.obj
    }
    if (data.where) {
      state.result.FlDataResult.num=data.where
    }else{
      state.result.FlDataResult.num='1'
    }
    if(data.num && !data.smallNum){   //传参num和smallnum必须都传
      state.result.smallguige=data.obj
    }
    if(data.smallNum){
      state.result.updataSmall=data.obj
    }
  },
  //活动切换
  activeChange (state,data){
    if(data){
      state.result.activeChange.obj=data.obj
      state.result.activeChange.item=data.item
    }else{
      state.result.activeChange.obj={}
      state.result.activeChange.item='vSeachActive'
    }
  },
  //活动组件编辑
  [types.GET_COMMODITY_RESULT] (state,res) {
    if(res){
      state.result.commodityResult=res
    }
  },
  //组件add
  [types.GET_ADD_COMMODITY] (state,res) {
    console.log(state.result.addCommodityResult)
    if(res){
      let arr=state.result.addCommodityResult.concat(res)
      state.result.addCommodityResult=arr
    }
  },
  //活动页面背景
  [types.GET_BACK_COLOR] (state,data) {
    state.result.backColorResult=data
  },
  //获取活动列表
  [types.SET_LIST_ACTIVE] (state,data) {
    if(data){
      state.editor.listActiveMM.page=data.page
      state.editor.listActiveMM.rows=data.rows
    }else{
      state.editor.listActiveMM.page=''
      state.editor.listActiveMM.rows=''
    }
  },
  [types.GET_LIST_ACTIVE] (state,res) {
    state.result.listActiveResult=res.data
  },
  //活动分类商品list
  [types.GET_CLASS_DATA_LIST] (state,res){
    state.result.classDataListResult=res
  },
  //产品list
  [types.SET_ACTIVE_DATA_LIST] (state,data) {
    if(data){
      state.editor.getDataListMM.page=data.page
      state.editor.getDataListMM.filter_S_productName=data.filter_S_productName
      state.editor.getDataListMM.rows=data.rows
      state.editor.getDataListMM.filter_I_sellerId=data.filter_I_sellerId
    }
  },
  [types.GET_ACTIVE_DATA_LIST] (state,res) {
    state.result.getDataListResulr=res.data
  },
  //添加活动
  [types.SET_INSERT_ACTIVE] (state,data) {
    if(data){
      state.editor.insertActiveMM.code=data.code
      state.editor.insertActiveMM.endTime=data.endTime
      state.editor.insertActiveMM.memo=data.memo
      state.editor.insertActiveMM.name=data.name
      state.editor.insertActiveMM.shareImg=data.shareImg
      state.editor.insertActiveMM.shareTitle=data.shareTitle
      state.editor.insertActiveMM.startTime=data.startTime
      state.editor.insertActiveMM.type=data.type
      state.editor.insertActiveMM.start=data.start
    }else{
      state.editor.insertActiveMM.code=''
      state.editor.insertActiveMM.endTime=''
      state.editor.insertActiveMM.memo=''
      state.editor.insertActiveMM.name=''
      state.editor.insertActiveMM.shareImg=''
      state.editor.insertActiveMM.shareTitle=''
      state.editor.insertActiveMM.startTime=''
      state.editor.insertActiveMM.type=''
      state.editor.insertActiveMM.start=''
    }
  },
  [types.GET_INSERT_ACTIVE] (state,res) {
    state.result.insertActiveResult=res.data.result
  },
  //编辑活动
  [types.SET_UPDATE_ACTIVE] (state,data){
    if(data){
      state.editor.updateActiveMM.code=data.code
      state.editor.updateActiveMM.endTime=data.endTime
      state.editor.updateActiveMM.memo=data.memo
      state.editor.updateActiveMM.name=data.name
      state.editor.updateActiveMM.shareImg=data.shareImg
      state.editor.updateActiveMM.shareTitle=data.shareTitle
      state.editor.updateActiveMM.startTime=data.startTime
      state.editor.updateActiveMM.type=data.type
      state.editor.updateActiveMM.start=data.start
      state.editor.updateActiveMM.id=data.id
    }else{
      state.editor.updateActiveMM.code=''
      state.editor.updateActiveMM.endTime=''
      state.editor.updateActiveMM.memo=''
      state.editor.updateActiveMM.name=''
      state.editor.updateActiveMM.shareImg=''
      state.editor.updateActiveMM.shareTitle=''
      state.editor.updateActiveMM.startTime=''
      state.editor.updateActiveMM.type=''
      state.editor.updateActiveMM.start=''
      state.editor.updateActiveMM.id=''
    }
  },
  /* [types.GET_UPDATE_ACTIVE] (state,res){
     state.result.updateActiveResult=res.result
   },*/
  //删除活动
  [types.SET_DELETE_ACTIVE] (state,id) {
    if(id){
      state.editor.deleteActiveMM.id=id
    }else{
      state.editor.deleteActiveMM.id=''
    }
  },
  //根据id获取活动信息
  [types.SET_GETBYID_ACTIVE] (state,id) {
    if(id){
      state.editor.getByIdActiveMM.id=id
    }else{
      state.editor.getByIdActiveMM.id=''
    }
  },
  [types.GET_GETBYID_ACTIVE] (state,res) {
    state.result.getByIdActiveResult=res.data.result
    console.log(res.data.result.ossDataId)
    if(res.data.result.ossDataId){
      state.result.addCommodityResult=res.data.result.ossDataId
    }
  },
  //上传活动数据到OSS
  [types.SET_UPLOAD_DATATOOSS] (state,data) {
    if(data){
      state.editor.uploadDataToOSSMM.id=data.id
      state.editor.uploadDataToOSSMM.data=data.data
    }else{
      state.editor.uploadDataToOSSMM.id=''
      state.editor.uploadDataToOSSMM.data=''
    }
  },
  //oss数据返回
  OssListResult(state,res){
    state.result.addCommodityResult=res.data.subassembly
    state.result.backColorResult=res.data.background
  },
//添加活动分类下商品index
  [types.GET_ADD_DATA_NUM] (state,key) {
    state.result.addDataNum = key
  },
  //changeradios
  changeRadios(state,key){
    if(key){
      state.result.radiosResult=key
    }
  },
  //changeradios
  OtherImgUrl(state,key){
    state.result.ImgUrlResult=key
  },
  //pintuanResult
  pinTuanOr(state,key){
    if(key){
      state.result.pintuanResult=key
    }
  },
  //移动组件
  changmove(state,data){
    state.result.addCommodityResult=data
  },
  //活动id
  activeIdchange(state,id){
    if(id){
      state.result.activeId=id
    }else{
      state.result.activeId=''
    }
  },
  //清除数据
  [types.CLEAR_ALL_DATA] (state){
    state.result.getByIdResult ={}
    state.result.ByIdGetTreeResult ={}
    state.result.getByIdActiveResult={}
    state.result.addCommodityResult=[]
    state.result.commodityResult={
      name:'',
      contents:[]
    }
  },
  //品牌获取
  [types.SET_BY_ID] (state,id) {
    if(id){
      state.editor.getByIdMM.id = id
    }else{
      state.editor.getByIdMM.id = ""
    }
  },
  [types.GET_BY_ID] (state,res) {
    state.result.getByIdResult=res.data.result
  },
  //所有品牌、id品牌
  [types.GET_ALL_PPRESULT] (state,res) {
    if(res){
      state.result.getAllPpResult = res.data.result
    }
  },
  //新增品牌
  [types.SET_NEW_PUSH] (state,data) {
    state.editor.newPushMM.name=data.name
    state.editor.newPushMM.logo=data.logo
    state.editor.newPushMM.enName=data.enName
    state.editor.newPushMM.desc=data.desc
    state.editor.newPushMM.country=data.country
  },
  [types.GET_NEW_PUSH] (state,res) {
    state.result.newPushResult = res.data.result
  },
  //删除品牌
  [types.SET_DELETE_PPRESULT] (state,id) {
    state.editor.deletePpMM.id=id
  },
  [types.GET_DELETE_PPRESULT] (state,res) {
    state.result.deletePpResult=res
  },
  //修改品牌
  [types.SET_UP_DATA_PPMM] (state,data) {
    if(data){
      state.editor.upDataPpMM.id=data.id
      state.editor.upDataPpMM.name=data.name
      state.editor.upDataPpMM.country=data.country
      state.editor.upDataPpMM.enName=data.enName
      state.editor.upDataPpMM.desc=data.desc
      state.editor.upDataPpMM.logo=data.logo
    }
  },
  //检测品牌名
  [types.SET_CHECK_PP] (state,name) {
    state.editor.checkPpMM.name=name
  },
  [types.GET_CHECK_PP] (state,res) {
    state.result.checkPpResult=res
  },

  //分类关联品牌
  [types.SET_GET_CATEGORY_BRANDS] (state,id){
    if(id){
      state.editor.getCategoryBrandsMM.categoryId=id
    }else{
      state.editor.getCategoryBrandsMM.categoryId=''
    }
  },
  [types.GET_GET_CATEGORY_BRANDS] (state,res){
    state.result.getCategoryBrandsResult=res.data.result
  },
  //整个分类树
  [types.GET_ALL_TREE] (state,res) {
    state.result.getAllTreeResult=res.data.result
  },
  //单个分类详情
  [types.SET_BY_ID_GET_TREE] (state,id){
    state.editor.ByIdGetTreeMM.id=id
  },
  [types.GET_BY_ID_GET_TREE] (state,res){
    state.result.ByIdGetTreeResult=res.data.result
  },
  //删除分类
  [types.SET_DELETE_CLASS_TREE] (state,id){
    if(id){
      state.editor.deleteClassTreeMM.id=id
    }else{
      state.editor.deleteClassTreeMM.id=''
    }

  },
  //新增分类
  [types.SET_PUSH_CLASS_TREE] (state,data) {
    state.editor.pushClassTreeMM.name=data.name
    state.editor.pushClassTreeMM.logo=data.logo
    state.editor.pushClassTreeMM.image=data.image
    state.editor.pushClassTreeMM.leaf=data.leaf
    state.editor.pushClassTreeMM.level=data.level
    state.editor.pushClassTreeMM.sort=data.sort
  },
  [types.GET_PUSH_CLASS_TREE] (state,res) {
    state.result.pushClassTreeResult=res.data.result
  },
  //修改分类
  [types.SET_UPDATA_CLASS_TREE] (state,data) {
    if (data) {
      state.editor.updataClassTreeMM.id=data.id
      state.editor.updataClassTreeMM.name=data.name
      state.editor.updataClassTreeMM.logo=data.logo
      state.editor.updataClassTreeMM.sort=data.sort
      state.editor.updataClassTreeMM.image=data.image
      state.editor.updataClassTreeMM.leaf=data.leaf
      state.editor.updataClassTreeMM.level=data.level
    } else {
      state.editor.updataClassTreeMM.id=''
      state.editor.updataClassTreeMM.name=''
      state.editor.updataClassTreeMM.logo=''
      state.editor.updataClassTreeMM.sort=''
      state.editor.updataClassTreeMM.image=''
      state.editor.updataClassTreeMM.leaf=''
      state.editor.updataClassTreeMM.level=''
    }
  },
  //检测分类存在
  [types.SET_CHECK_CLASS_TREE] (state,data){
    if(data){
      state.editor.checkClassTreeMM.name=data.name
      state.editor.checkClassTreeMM.id=data.id
    }else{
      state.editor.checkClassTreeMM.name=''
      state.editor.checkClassTreeMM.id=''
    }
  },
  //标签管理、删除标签
  [types.SET_DELETE_TAG] (state,id){
    if(id){
      state.editor.deleteTagMM.id=id
    }else{
      state.editor.deleteTagMM.id=''
    }
  },
  //新增标签、
  [types.SET_PUSH_NEW_TAG] (state,data){
    if(data){
      state.editor.pushNewTagMM.name=data.name
      state.editor.pushNewTagMM.logo=data.logo
      state.editor.pushNewTagMM.desc=data.desc
      state.editor.pushNewTagMM.sort=data.sort
      state.editor.pushNewTagMM.type=data.type
    }else{
      state.editor.pushNewTagMM.name=''
      state.editor.pushNewTagMM.logo=''
      state.editor.pushNewTagMM.desc=''
      state.editor.pushNewTagMM.sort=''
      state.editor.pushNewTagMM.type=''
    }
  },
  [types.GET_PUSH_NEW_TAG] (state,res){
    state.result.pushNewTagResult=res
  },
  //获取所有标签
  [types.GET_ALL_TAG_RESULT] (state,res){
    state.result.getAllTagResult=res.data.result
  },
  //id获取标签
  [types.SET_GET_TAG_BY_ID] (state,id){
    if(id){
      state.editor.getTagByIdMM.id=id
    }else{
      state.editor.getTagByIdMM.id=''
    }
  },
  [types.GET_GET_TAG_BY_ID] (state,res){
    state.result.getTagByIdResult=res.data.result
  },
  //修改一个小规格明细
  [types.SET_UPDATE_PRODUCT] (state,data){
    if(data){
      state.editor.updateProductMM.logo=data.logo
      state.editor.updateProductMM.name=data.name
      state.editor.updateProductMM.id=data.id
      state.editor.updateProductMM.specId=data.specId
    }else{
      state.editor.updateProductMM.logo=''
      state.editor.updateProductMM.name=''
      state.editor.updateProductMM.id=''
      state.editor.updateProductMM.specId=''
    }
  },
  //修改一个da规格明细
  [types.SET_UPDATE_PRODUCT_SPEC] (state,data){
    if(data){
      state.editor.updateProductSpecMM.id=data.id
      state.editor.updateProductSpecMM.leading=data.leading
      state.editor.updateProductSpecMM.name=data.name
      state.editor.updateProductSpecMM.showLogo=data.showLogo
    }else{
      state.editor.updateProductSpecMM.id=''
      state.editor.updateProductSpecMM.leading=''
      state.editor.updateProductSpecMM.name=''
      state.editor.updateProductSpecMM.showLogo=''
    }
  },
  //删除分类下的一个商品规格模板
  [types.SET_DELETE_PRODUCT] (state,id){
    if(id){
      state.editor.deleteProductMM.id=id
    }else{
      state.editor.deleteProductMM.id=''
    }
  },
  //删除大规格模板下的一个小规格
  /*[types.SET_DELETE_SPECDETAIL] (state,id){
    if(id){
      state.editor.deleteSpecDetailMM.id=id
    }else{
      state.editor.deleteSpecDetailMM.id=''
    }
  },*/
  // 在分类下挂一个规格模板
  [types. SET_ADD_PRODUCT_SPEC] (state,data) {
    if(data){
      state.editor.addProductSpecMM.name=data.name
      state.editor.addProductSpecMM.categoryId=data.categoryId
      state.editor.addProductSpecMM.leading=data.leading
      state.editor.addProductSpecMM.showLogo=data.showLogo
    }else{
      state.editor.addProductSpecMM.name=''
      state.editor.addProductSpecMM.categoryId=''
      state.editor.addProductSpecMM.leading=''
      state.editor.addProductSpecMM.showLogo=''
    }
  },
  //在分类下的一个大规格下添加一个小规格
  [types.SET_ADD_PRODUCT_SPEC_DETAIL] (state,data) {
    if(data){
      state.editor.addProductSpecDetailMM.name=data.name
      state.editor.addProductSpecDetailMM.specId=data.specId
      //state.editor.addProductSpecDetailMM.productCategorySpecDetailVO=data.productCategorySpecDetailVO
      state.editor.addProductSpecDetailMM.logo=data.logo
    }else{
      state.editor.addProductSpecDetailMM.name=''
      state.editor.addProductSpecDetailMM.specId=''
      //state.editor.addProductSpecDetailMM.productCategorySpecDetailVO=''
      state.editor.addProductSpecDetailMM.logo=''
    }
  },
  //获得一个分类型所有大规格
  [types.SET_GET_PRODUCT_SPECS] (state,data) {
    if(data.id){
      state.editor.getProductSpecsMM.categoryId=data.id
    }else{
      state.editor.getProductSpecsMM.categoryId=''
    }
    if(data.needDetails){
      state.editor.getProductSpecsMM.needDetails=data.needDetails
    }else{
      state.editor.getProductSpecsMM.needDetails=''
    }
  },
  [types.GET_GET_PRODUCT_SPECS] (state,res) {
    state.result.getProductSpecsResult=res.data.result
  },
  //获得一个分类大规格下的 所有规格特征明细
  [types.SET_GET_PRODUCT_SPECDETAILS] (state,id) {
    if(id){
      state.editor.getProductSpecDetailsMM.specId=id
    }else{
      state.editor.getProductSpecDetailsMM.specId=''
    }
  },
  [types.GET_GET_PRODUCT_SPECDETAILS] (state,res) {
    state.result.getProductSpecDetailsResult=res.data.result
  },
//创建一个商品分类的参数模板
  [types.SET_CREATE_FENLEI_MO] (state,data) {
    if (data) {
      state.editor.createFenLeiMoMM.categoryId=data.categoryId
      state.editor.createFenLeiMoMM.name=data.name
    }else{
      state.editor.createFenLeiMoMM.categoryId=''
      state.editor.createFenLeiMoMM.name=''
    }
  },
  //删除一个商品分类的参数模板
  [types.SET_DELETE_FENLEI_MO] (state,id) {
    if (id) {
      state.editor.deleteFenLeiMoMM.id=id
    }else{
      state.editor.deleteFenLeiMoMM.id=''
    }
  },
  //更新一个商品分类的参数模板
  [types.SET_UPDATA_FENLEI_MO] (state,data) {
    if (data) {
      state.editor.updataFenLeiMoMM.id=data.id
      state.editor.updataFenLeiMoMM.name=data.name
    }else{
      state.editor.updataFenLeiMoMM.id=''
      state.editor.updataFenLeiMoMM.name=''
    }
  },
  //获取一个分类下的 商品参数模板
  [types.SET_PARAMS_BY_CATEGORYID] (state,id){
    if (id) {
      state.editor.getParamsByCategoryIdMM.categoryId=id
    }else{
      state.editor.getParamsByCategoryIdMM.categoryId=''
    }
  },
  [types.GET_PARAMS_BY_CATEGORYID] (state,res){
    state.result.getParamsByCategoryIdResult=res.data.result
  },
  //城市列表
  [types.GET_SMALL_CITYLIST](state,res){
    state.result.smallCityList=res.data.result
  },
  //县级列表
  [types.GET_XIANJI_LIST](state,res){
    state.result.xianjiList=res.data.result
  },
  //时间选择接受
  [types.GET_VALUE_4] (state,res) {
    state.result.value4Result=res
  },
  //获取拼团商品列表
  [types.SET_PRODUCT_LIST] (state,data) {
    state.editor.productlistMM.filter_I_isRecommend=data.filter_I_isRecommend
    state.editor.productlistMM.filter_S_productName_contains=data.filter_S_productName_contains
    state.editor.productlistMM.page=data.page
    state.editor.productlistMM.rows=data.rows
    state.editor.productlistMM.sortField=data.sortField
    state.editor.productlistMM.filter_I_sellerId=data.filter_I_sellerId
  },
  [types.GET_PRODUCT_LIST] (state,res) {
    state.result.productlistResult=res.data
  },
  //获取更多试用商品列表
  [types.SET_FREEUSE_LIST] (state,data) {
    state.editor.freeUseListMM.filter_S_productName_contains=data.filter_S_productName_contains
    state.editor.freeUseListMM.page=data.page
    state.editor.freeUseListMM.rows=data.rows
    state.editor.freeUseListMM.sortField=data.sortField
  },
  [types.GET_FREEUSE_LIST] (state,res) {
    state.result.freeUseListResult=res.data
  },
  //获取积分试用产品列表
  [types.SET_SCOREBUY_LIST] (state,data) {
    state.editor.scoreBuyListMM.filter_I_status=data.filter_I_status
    state.editor.scoreBuyListMM.filter_S_productName_contains=data.filter_S_productName_contains
    state.editor.scoreBuyListMM.page=data.page
    state.editor.scoreBuyListMM.rows=data.rows
    state.editor.scoreBuyListMM.sortField=data.sortField
  },
  [types.GET_SCOREBUY_LIST] (state,res) {
    state.result.scoreBuyListResult=res.data
  },
  changeIframe(state,data){
    state.result.iframeSrc.title='http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/buildblocks_data/'+data.title
    state.result.iframeSrc.status=!state.result.iframeSrc.status
  },
  ////
  ImgnumKey(state,key){
    state.result.ImgnumKey=key
  },





  //优惠券

//专享产品list
  [types.GET_PLUS_PRODUCT_LIST](state,res){
    state.result.plusProductListResult=res.data
  },
  //优惠券Active
  [types.SET_YHQ_WHICH](state,str){
    state.result.YHQwhichResult.item=str.item
    state.result.YHQwhichResult.title=str.title
  },
  [types.SET_YHQ_ONLY](state,str){
    state.result.YHQonlyResult.title=str.title
    state.result.YHQonlyResult.item=str.item
    state.result.YHQonlyResult.Which=str.Which
  },
//供应商优惠券
  [types.SET_STORE_YHQ](state,str){
    state.result.StoreYHQResult.title=str.title
    state.result.StoreYHQResult.item=str.item
    state.result.StoreYHQResult.trueOrfalse=str.trueOrfalse
  },
//优惠券列表
  [types.SET_COUPON_LIST_RESULT](state,data){
    state.editor.CouponLsitMM.page=data.page
    state.editor.CouponLsitMM.rows=data.rows
    state.editor.CouponLsitMM.filter_I_isAudit=data.filter_I_isAudit
  },
  //关联优惠券列表
  [types.SET_COUPON_WITH_LIST_RESULT](state,data){
    state.editor.CouponwithLsitMM.filter_S_title=data.filter_S_title
    state.editor.CouponwithLsitMM.filter_I_isAudit=data.filter_I_isAudit
    state.editor.CouponwithLsitMM.limitLevels=data.limitLevels
    state.editor.CouponwithLsitMM.page=data.page
    state.editor.CouponwithLsitMM.rows=data.rows
    state.editor.CouponwithLsitMM.conponActivityId=data.conponActivityId
    state.editor.CouponwithLsitMM.filter_I_isPublic=data.filter_I_isPublic
  },
  [types.GET_COUPON_LIST_RESULT](state,res){
    // state.result.CouponListResult={
    //   noGo:[],
    //   okGo:[]
    // }
    // if(res.data.rows.length>0){
    //   for(let i=0;i<res.data.rows.length;i++){
    //     if(res.data.rows[i].isAudit===0){
    //       state.result.CouponListResult.noGo.push(res.data.rows[i])
    //     }else{
    //       state.result.CouponListResult.okGo.push(res.data.rows[i])
    //     }
    //   }
    // }
    state.result.CouponListResult=res.data
  },
//创建优惠券
  [types.SET_CREATE_COUPON](state,data){
    state.editor.createCouponMM.title=data.title
    state.editor.createCouponMM.type=data.type
    state.editor.createCouponMM.startTime=data.startTime
    state.editor.createCouponMM.endTime=data.endTime
    state.editor.createCouponMM.expireRemind=data.expireRemind
    state.editor.createCouponMM.limitLevel=data.limitLevel
    state.editor.createCouponMM.limitReceived=data.limitReceived
    state.editor.createCouponMM.num=data.num
    state.editor.createCouponMM.price=data.price
    state.editor.createCouponMM.productIds=data.productIds
    state.editor.createCouponMM.productType=data.productType
    state.editor.createCouponMM.togetherProductIds=data.togetherProductIds
    state.editor.createCouponMM.isAudit=data.isAudit
    state.editor.createCouponMM.isPublic=data.isPublic
  },
//修改优惠券
  [types.SET_UPDATA_COUPON](state,data){
    state.editor.upDataCouponMM.title=data.title
    state.editor.upDataCouponMM.num=data.num
    state.editor.upDataCouponMM.id=data.id
    state.editor.upDataCouponMM.endTime=data.endTime
    state.editor.upDataCouponMM.startTime=data.startTime
    state.editor.upDataCouponMM.expireRemind=data.expireRemind
    state.editor.upDataCouponMM.limitLevel=data.limitLevel
    state.editor.upDataCouponMM.limitReceived=data.limitReceived
    state.editor.upDataCouponMM.price=data.price
    state.editor.upDataCouponMM.type=data.type
    state.editor.upDataCouponMM.productIds=data.productIds
    state.editor.upDataCouponMM.togetherProductIds=data.togetherProductIds
    state.editor.upDataCouponMM.productType=data.productType
    state.editor.upDataCouponMM.isPublic=data.isPublic
  },
  //删除优惠券
  [types.SET_DELETE_COUPONMM] (state,id) {
    state.editor.deleteCouponMM.id=id
  },
  //审核优惠券
  [types.SET_DOAUDIT_COUPON] (state,data) {
    state.editor.doAuditCouponMM.ids=data.ids
    state.editor.doAuditCouponMM.limitLevel=data.limitLevel
    state.editor.doAuditCouponMM.expireNotifyDay=data.expireNotifyDay
  },
  //创建优惠券活动
  [types.SET_SAVE_COUPON_ACTIVE] (state,data) {
    state.editor.saveCouponActiveMM.shareTitle=data.shareTitle
    state.editor.saveCouponActiveMM.shareIcon=data.shareIcon
    state.editor.saveCouponActiveMM.name=data.name
    state.editor.saveCouponActiveMM.mainImg=data.mainImg
    state.editor.saveCouponActiveMM.isEnable=data.isEnable
    state.editor.saveCouponActiveMM.shareDescription=data.shareDescription
    state.editor.saveCouponActiveMM.isPublic=data.isPublic
  },
  //修改优惠券活动
  [types.SET_UPDATA_COUPON_ACTIVE] (state,data) {
    state.editor.updataCouponActiveMM.shareTitle=data.shareTitle
    state.editor.updataCouponActiveMM.shareIcon=data.shareIcon
    state.editor.updataCouponActiveMM.name=data.name
    state.editor.updataCouponActiveMM.mainImg=data.mainImg
    state.editor.updataCouponActiveMM.isEnable=data.isEnable
    state.editor.updataCouponActiveMM.shareDescription=data.shareDescription
    state.editor.updataCouponActiveMM.id=data.id
    state.editor.updataCouponActiveMM.isPublic=data.isPublic
  },
  //优惠券活动列表
  [types.SET_COUPON_ACTIVE_LIST](state,res){
    state.editor.CouponActiveListMM.rows=res.rows
    state.editor.CouponActiveListMM.page=res.page
    state.editor.CouponActiveListMM.filter_S_name=res.filter_S_name
    state.editor.CouponActiveListMM.filter_I_isPublic=res.filter_I_isPublic
  },
  [types.GET_COUPON_ACTIVE_LIST](state,res){
    state.result.CouponActiveListResult=res.data
  },
  //删除优惠券活动
  [types.SET_DELETE_COUPON_ACTIVE](state,id){
    state.editor.deleteCouponActiveMM.id=id
  },
  //优惠券活动关联优惠券
  [types.SET_ACTIVE_LINK_COUPON](state,data){
    state.editor.ActivelinkCouponMM.activityId=data.activityId
    state.editor.ActivelinkCouponMM.couponIds=data.couponIds
  },
  //优惠券关联商品集合
  Coupon_With_Goods (state,data) {
    state.result.CouponWithGoodsResult.productType=data.productType
    state.result.CouponWithGoodsResult.togetherProductIds=data.togetherProductIds
    state.result.CouponWithGoodsResult.productIds=data.productIds
    state.result.CouponWithGoodsResult.price=data.price
    state.result.CouponWithGoodsResult.productName=data.productName
  },
  //供应商优惠券列表
  [types.SET_STORE_YHQLIST](state,data){
    state.editor.StoreYHQListMM.filter_S_title=data.filter_S_title
    state.editor.StoreYHQListMM.limitLevels=data.limitLevels
    state.editor.StoreYHQListMM.page=data.page
    state.editor.StoreYHQListMM.rows=data.rows
    state.editor.StoreYHQListMM.sellerId=data.sellerId
    state.editor.StoreYHQListMM.filter_I_isAudit=data.filter_I_isAudit
    state.editor.StoreYHQListMM.filter_I_isPublic=data.filter_I_isPublic
  },
  [types.GET_STORE_YHQLIST](state,res){
    state.result.StoreYHQListResult=res.data
    // state.result.StoreYHQListResult={
    //   noGo:[],
    //   okGo:[]
    // }
    // if(res.data.rows.length>0){
    //   for(let i=0;i<res.data.rows.length;i++){
    //     if(res.data.rows[i].isAudit===0){
    //       state.result.StoreYHQListResult.noGo.push(res.data.rows[i])
    //     }else{
    //       state.result.StoreYHQListResult.okGo.push(res.data.rows[i])
    //     }
    //   }
    // }
  },
  //供应商创建优惠券
  [types.SET_STORE_CRETE_YHQ](state,data){
    state.editor.StoreCreteYHQMM.title=data.title
    state.editor.StoreCreteYHQMM.sellerId=data.sellerId
    state.editor.StoreCreteYHQMM.productIds=data.productIds
    state.editor.StoreCreteYHQMM.productType=data.productType
    state.editor.StoreCreteYHQMM.togetherProductIds=data.togetherProductIds
    state.editor.StoreCreteYHQMM.type=data.type
    state.editor.StoreCreteYHQMM.price=data.price
    state.editor.StoreCreteYHQMM.num=data.num
    state.editor.StoreCreteYHQMM.limitReceived=data.limitReceived
    state.editor.StoreCreteYHQMM.endTime=data.endTime
    state.editor.StoreCreteYHQMM.startTime=data.startTime
    state.editor.StoreCreteYHQMM.id=data.id
    state.editor.StoreCreteYHQMM.isPublic=data.isPublic
  },
  //供应商删除优惠券
  [types.SET_STORE_DELETE_YHQ] (state,data) {
    state.editor.StoreDeleteYHQMM.id=data.id
    state.editor.StoreDeleteYHQMM.sellerId=data.sellerId
  },
  //搜索栏
  SEACHWHICHE(state,data){
    state.result.SeachWhiche=data
  },
  SEACHWHICHE2(state,data){
    state.result.SeachWhiche2=data
  },
  /////////////////////sellID
  sellID(state,id){
    state.result.sellID=id
  },
  //优惠券统计
  [types.SET_STORE_COUPONO_CUNT](state,data){
    state.editor.couponoCuntMM.page=data.page
    state.editor.couponoCuntMM.rows=data.rows
    state.editor.couponoCuntMM.filter_S_title=data.filter_S_title
  },
  [types.GET_STORE_COUPONO_CUNT](state,res){
    state.result.couponoCuntResult=res.data
  },
  //取消关联优惠券
  [types.SET_CHANGE_LINK_COUPON](state,data){
    state.editor.changelinkCouponMM.activityId=data.activityId
    state.editor.changelinkCouponMM.couponId=data.couponId
  }
}

export default mutations
