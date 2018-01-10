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
  [types.GO_ALL_MUTATIONS] (state,obj) {
    state.result.commodityResult.contents[obj.key].url=obj.url
  },
  //产品list
  [types.SET_ACTIVE_DATA_LIST] (state,data) {
    if(data){
      state.editor.getDataListMM.page=data.page
      state.editor.getDataListMM.filter_S_productName=data.filter_S_productName
      state.editor.getDataListMM.rows=data.rows
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
  //清除数据
  [types.CLEAR_ALL_DATA] (state){
    state.result.getByIdResult ={}
    state.result.ByIdGetTreeResult ={}
    state.result.getByIdActiveResult={}
    state.result.addCommodityResult=[]
    state.result.commodityResult={
      nsme:'',
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
  }

}

export default mutations
