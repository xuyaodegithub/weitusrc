/*
*created by Yan on 17/12/13
*/
/*分模块开发，避免项目过大，导致单独store过去臃肿，状态都放在一个state对象里了，（当应用变得非常复杂时，store 对象就有可能变得相当臃肿。）
* 项目的某一个模块的状态都放在这里，便于管理，结构清晰，
* 此模块也是一个单独的store，只有actions有区别，里面的方法参数{dispatch, state, commit, rootState}；前三个只能访问本模块里的state和mutations
* rootState参数表示外面store内的state对象，意思是间接可以访问外部状态资源，（对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。）
* 同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState（外部state）：
* !!!对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
*  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
  同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
* */
import qs from 'qs';
import api from '../fetch/api'
import axios from 'axios'
 // axios.defaults.baseURL ='http://test-admin.olquan.cn'
axios.defaults.timeout = 10000;//10秒还未得到请求答复，就报超时错误
//axios.default.headers={'X-Custom-Header': 'foobar'}//全局设置请求头
import { Message } from 'element-ui';
const servers={
  state:{
    editor:{
      //根据产品id获取规格信息
      getProductNormalsMM:{
        productId:''
      },
       //删除特卖
      deleteProductNormalsMM:{
        id:'',
        ids:'',
        status:''
      },
      //新增、修改特卖产品
      productNewMM:{
        id:'',//特卖id
        appPrices:'',//app售价集合，有规格要传
        commission:'',//佣金无规格要传
        commissiones:'',//佣金集合
        costPrices:'',//成本价集合
        costPrice: '',//成本价
        desc:'',//描述
        image:'',//产品主图链接
        indexImage:'',//大图
        isRecommend:'',//是否推荐
        marketPrice:'',//原价
        marketePrices:'',//原价
        normalIds:'',//产品库产品上的规格id集合
        plusProductNormalIds:'',//特卖产品的规格id集合
        price:'',//售价、、无规格传
        salePrices:'',//售价集合,有规格传
        productId:'',//产品库产品id
        productName:'',//产品名称
        sort:'',//排序
        startDate:'',//如:2018-04-12
        trip:'', //产品标签
        normalStrs:'',//规格集合
        status:'',
        isStick:'',
        plusDate:''
      },
      //根据特卖id获取特卖信息
      PproductgetByIdMM:{
        plusId:''
      },


      //督导设置// //获取收益配置信息
      upInfoListMM:{
       type:''
      },
      //新增修改
      upInfoSaveMM:{
        content:'',
        id:'',
        inviteContent:'',
        shareDesc:'',
        shareLogo:'',
        shareTitle:'',
        type:''
      },
      //礼包列表
      storeGiftBagListMM:{
        page:'',
        rows:'',
        filter_I_type: '',
        filter_S_name:''
      },
      //新增修改礼包
      storeGiftBagSave1MM:{
        id:'',
        image:'',
        name:'',
        productId:'',
        productImage:'',
        productName:'',
        type:''
      },
      //设置收益配置
      setCommissionMM:{
        highSupervisorCommission:'',
        highSupervisorMoreCommission:'',
        price:'',
        supervisorCommission:'',
        type:'',
        starCommission:'',
        starMoreCommission:'',
        cityCommission:'',
        selfCommission:'',
        selfCommissionType:'',
        storeCommission:'',
        storeCommissionType:'',
        managementCost: '',
      },
      //审核明星督导
      setMemberLevelMM:{
        id:'',levelCode:''
      },
      //设置产品收益配置信息
      setProductCommissionInfoMM:{
        brandPartnerCommission:'',cityPartnerCommission:'',highSupervisorMoreScore:'',highSupervisorPlusCommissionRate:'',
        highSupervisorPlusMoreCommissionRate:'',highSupervisorScore:'',isPhysicalStoreGetCommission:'',oneGoldenScore:'',
        oneStoreScore:'',oneWhiteScore:'',plusCommissionRate:'',productCommissionScale:'',productDreamPartnerCommission:'',
        productWealthPartnerCommission:'',selfGoldenScore:'',selfStoreScore:'',selfWhiteScore:'',starSupervisorMoreScore:'',
        starSupervisorPlusCommissionRate:'',starSupervisorPlusMoreCommissionRate:'',starSupervisorScore:'',storePlusCommissionRate:'',
        supervisorPlusCommissionRate:'',supervisorScore:'',managementCost:''
      },


      //发现模块//新增账户信息
      findAccountSaveMM: {
        id: '',
        logo: '',
        name: '',
        status: '',
        desc: '',
        type: '',
        autoId:''
      },
      //新增发现文章
      findSaveMsgMM: {
        accountId: '',
        content: '',
        isStick: '',
        linkUrls: '',
        productId: '',
        productName: '',
        productType: '',
        sort: '',
        title: '',
        type: '',
        id:'',
        isAudit:''
      },
      //根据id获取发现信息
      findOnlyIdMM: {
        id: ''
      },
      //发现文章列表
      findTotalListMM: {
        filter_L_accountId: '',
        page:'',
        rows:'',
        filter_S_title:'',
        filter_S_accountName:'',
        filter_I_isAudit:'',
      },
      //申请列表
      applySupervisorListMM:{
        accountNo:'',
        endTime:'',
        startTime:'',
        page:'',
        rows:'',
        filter_I_sendStatus:'',
        filter_I_status:''
      },
      //申请导入
      sendImportMM:{
        ids:'',
        sendStatus:''
      },
      //会员列表
      accountNoMM:{
        page:'',rows:'',filter_S_accountNo:''
      },
      //轮播图列表
      indexListLunMM:{
        filter_I_linkType:'',
        filter_I_type:'',
        page:'',
        rows:'',
        sortField:''
      },
      //新增/修改轮播图
      addAndUpdataListMM:{
        id:'',
        image:'',
        linkType:'',
        name:'',
        sort:'',
        type:'',
        url:''
      }
    },
    page:{
      //产品规格
      getProductNormalsResult:[],
      //特卖规格id
      PproductgetByIdResult:{title:true,item:[]},
      //修改特卖
      upDataSaleGoodsResult:{},
      //特卖产品管理弹框
      watchPriceResult:{},


      //督导列表返回
      upInfoListResult:'',
       //粉领返回
      pinkListResult:'',
      //礼包列表
      storeGiftBagListResult:[],
      //获取收益配置信息
      commissionInfoResult:{},
      //明星督导统计
      canUpToStarResult:[],
      //获取产品佣金配置信息
      productCommissionInfoResult:'',
      plusCommissionInfoResult:'',


      ////发现模块
      findMsgResult: {result:{}},
      //新增账户信息
      findAccountSaveResult: '',
      //发现列表
      findMsgListResult:{result:{}},
      //根据id获取发现信息
      findOnlyIdResult: '',
      //申请列表
      applySupervisorList:[],
      //会员列表
      accountNoListResult:[],
      //轮播图列表
      indexListLunResult:[]
    }
  },
  mutations:{
    //清除数据
    clearGoodsData(state){
      state.page.getProductNormalsResult=[]
    },
    //删除特卖、批量删除
    DELETE_PRODUCT(state,data){
      state.editor.deleteProductNormalsMM.id=data.id
      state.editor.deleteProductNormalsMM.ids=data.ids
      state.editor.deleteProductNormalsMM.status=data.status
    },
    //根据产品id获取规格信息
    SETPRODUCTNORMALS(state,id){
      state.editor.getProductNormalsMM.productId=id
    },
    GETPRODUCTNORMALS(state,res){
      state.page.getProductNormalsResult=res.data
    },
    //特卖规格
    PPRODUCT_SET_ID(state,id){
      state.editor.PproductgetByIdMM.plusId=id
    },
     PPRODUCT_GET_ID(state,res){
       //console.log(state.page.PproductgetByIdResult.title )
      state.page.PproductgetByIdResult.item = res.data
      state.page.PproductgetByIdResult.title = !state.page.PproductgetByIdResult.title
       //console.log(state.page.PproductgetByIdResult.title )
    },
    //特卖新增
    PLUS_PRODUCT_PUSH(state,data){
      state.editor.productNewMM.price=data.price
      state.editor.productNewMM.id=data.id
      state.editor.productNewMM.image=data.image
      state.editor.productNewMM.appPrices=data.appPrices
      state.editor.productNewMM.commission=data.commission
      state.editor.productNewMM.commissiones=data.commissiones
      state.editor.productNewMM.costPrices=data.costPrices
      state.editor.productNewMM.desc=data.desc
      state.editor.productNewMM.indexImage=data.indexImage
      state.editor.productNewMM.isRecommend=data.isRecommend
      state.editor.productNewMM.marketPrice=data.marketPrice
      state.editor.productNewMM.marketePrices=data.marketePrices
      state.editor.productNewMM.normalIds=data.normalIds
      state.editor.productNewMM.plusProductNormalIds=data.plusProductNormalIds
      state.editor.productNewMM.productId=data.productId
      state.editor.productNewMM.productName=data.productName
      state.editor.productNewMM.salePrices=data.salePrices
      state.editor.productNewMM.sort=data.sort
      state.editor.productNewMM.startDate=data.startDate
      state.editor.productNewMM.trip=data.trip
      state.editor.productNewMM.normalStrs=data.normalStrs
      state.editor.productNewMM.plusProductNormalIds=data.plusProductNormalIds
      state.editor.productNewMM.status=data.status
      state.editor.productNewMM.plusDate=data.plusDate
      state.editor.productNewMM.isStick=data.isStick
      state.editor.productNewMM.costPrice=data.costPrice
    },
    //修改
    UPDATA_SALEGOODS(state,data){
      state.page.upDataSaleGoodsResult=data
    },


    //督导set
    SET_UPINFO_LIST(state,data){
      state.editor.upInfoListMM.type=data.type
    },
    GET_UPINFO_LIST(state,res){
      state.page.upInfoListResult=res.data
    },
    //粉领set
    GET_PINK_UPINFO_LIST(state,res){
      state.page.pinkListResult=res.data
    },
    //新增/修改
    SET_UPINFO_SAVE(state,data){
      state.editor.upInfoSaveMM.type=data.type
      state.editor.upInfoSaveMM.id=data.id
      state.editor.upInfoSaveMM.shareTitle=data.shareTitle
      state.editor.upInfoSaveMM.content=data.content
      state.editor.upInfoSaveMM.inviteContent=data.inviteContent
      state.editor.upInfoSaveMM.shareDesc=data.shareDesc
      state.editor.upInfoSaveMM.shareLogo=data.shareLogo
    },
    //礼包列表
    SET_STORE_GIFTBAG_LIST(state,data){
      state.editor.storeGiftBagListMM.page=data.page
      state.editor.storeGiftBagListMM.rows=data.rows
      state.editor.storeGiftBagListMM.filter_I_type = data.filter_I_type
      state.editor.storeGiftBagListMM.filter_S_name = data.accountName
    },
    GET_STORE_GIFTBAG_LIST(state,res){
     state.page.storeGiftBagListResult=res.data
    },
    //新增修改礼包
    SET_STORE_GIFTBAG_SAVE1(state,data){
      state.editor.storeGiftBagSave1MM.id=data.id
      state.editor.storeGiftBagSave1MM.image=data.image
      state.editor.storeGiftBagSave1MM.productId=data.productId
      state.editor.storeGiftBagSave1MM.productName=data.productName
      state.editor.storeGiftBagSave1MM.name=data.name
      state.editor.storeGiftBagSave1MM.productImage=data.productImage
      state.editor.storeGiftBagSave1MM.type=data.type
    },
    //获取收益配置
    GET_COMMISSION_INFO(state,res){
      state.page.commissionInfoResult=res.data.result
    },
    //set收益配置
    SET_SET_COMMISSION(state,data){
      state.editor.setCommissionMM.type=data.type
      state.editor.setCommissionMM.supervisorCommission=data.supervisorCommission
      state.editor.setCommissionMM.highSupervisorMoreCommission=data.highSupervisorMoreCommission
      state.editor.setCommissionMM.highSupervisorCommission=data.highSupervisorCommission
      state.editor.setCommissionMM.cityCommission=data.cityCommission
      state.editor.setCommissionMM.selfCommission=data.selfCommission
      state.editor.setCommissionMM.selfCommissionType=data.selfCommissionType
      state.editor.setCommissionMM.starCommission=data.starCommission
      state.editor.setCommissionMM.starMoreCommission=data.starMoreCommission
      state.editor.setCommissionMM.storeCommission=data.storeCommission
      state.editor.setCommissionMM.storeCommissionType=data.storeCommissionType
      state.editor.setCommissionMM.price=data.price
      state.editor.setCommissionMM.managementCost=data.managementCost
    },
    //明星督导统计
    GET_CANUPTOSTAR_RESULT(state,res){
      state.page.canUpToStarResult=res.data.result
    },
    //统计审核
    SET_MEMBER_LEVEL(state,data){
     state.editor.setMemberLevelMM.id=data.id
     state.editor.setMemberLevelMM.levelCode=data.levelCode
    },
    //获取产品佣金配置信息
    GET_PRODUCT_COMMISSION_INFO(state,res){
      state.page.productCommissionInfoResult=res.data.result
    },
    GET_PLUS_COMMISSION_INFO(state,res){
      state.page.plusCommissionInfoResult=res.data.result
    },
    //设置产品收益配置信息
    SET_PRODUCT_COMMISSION_INFO(state,data){
        state.editor.setProductCommissionInfoMM.brandPartnerCommission=data.brandPartnerCommission
        state.editor.setProductCommissionInfoMM.cityPartnerCommission=data.cityPartnerCommission
        state.editor.setProductCommissionInfoMM.highSupervisorMoreScore=data.highSupervisorMoreScore
        state.editor.setProductCommissionInfoMM.highSupervisorPlusCommissionRate=data.highSupervisorPlusCommissionRate
        state.editor.setProductCommissionInfoMM.highSupervisorPlusMoreCommissionRate=data.highSupervisorPlusMoreCommissionRate
        state.editor.setProductCommissionInfoMM.highSupervisorScore=data.highSupervisorScore
        state.editor.setProductCommissionInfoMM.isPhysicalStoreGetCommission=data.isPhysicalStoreGetCommission
        state.editor.setProductCommissionInfoMM.oneGoldenScore=data.oneGolenScore
        state.editor.setProductCommissionInfoMM.oneStoreScore=data.oneStoreScore
        state.editor.setProductCommissionInfoMM.oneWhiteScore=data.oneWhiteScore
        state.editor.setProductCommissionInfoMM.plusCommissionRate=data.plusCommissionRate
        state.editor.setProductCommissionInfoMM.productCommissionScale=data.productCommissionScale
        state.editor.setProductCommissionInfoMM.productDreamPartnerCommission=data.productDreamPartnerCommission
        state.editor.setProductCommissionInfoMM.productWealthPartnerCommission=data.productWealthPartnerCommission
        state.editor.setProductCommissionInfoMM.selfGoldenScore=data.selfGolenScore
        state.editor.setProductCommissionInfoMM.selfStoreScore=data.selfStoreScore
        state.editor.setProductCommissionInfoMM.selfWhiteScore=data.selfWhiteScore
        state.editor.setProductCommissionInfoMM.starSupervisorMoreScore=data.starSupervisorMoreScore
        state.editor.setProductCommissionInfoMM.starSupervisorPlusCommissionRate=data.starSupervisorPlusCommissionRate
        state.editor.setProductCommissionInfoMM.starSupervisorPlusMoreCommissionRate=data.starSupervisorPlusMoreCommissionRate
        state.editor.setProductCommissionInfoMM.starSupervisorScore=data.starSupervisorScore
        state.editor.setProductCommissionInfoMM.storePlusCommissionRate=data.storePlusCommissionRate
        state.editor.setProductCommissionInfoMM.supervisorPlusCommissionRate=data.supervisorPlusCommissionRate
        state.editor.setProductCommissionInfoMM.supervisorScore=data.supervisorScore
        state.editor.setProductCommissionInfoMM.managementCost=data.managementCost
    },


    ///发现模块
    GET_FIND_ACCOUNT(state, res) {
      state.page.findMsgResult = res.data
    },
    //新增账户信息
    SET_FIND_ACCOUNT_SAVE(state, data) {
      state.editor.findAccountSaveMM.name = data.name
      state.editor.findAccountSaveMM.logo = data.logo
      state.editor.findAccountSaveMM.id = data.id
      state.editor.findAccountSaveMM.status = data.status
      state.editor.findAccountSaveMM.desc = data.desc
      state.editor.findAccountSaveMM.type = data.type
      state.editor.findAccountSaveMM.autoId = data.autoId
    },
    GET_FIND_ACCOUNT_SAVE(state, res) {
      state.page.findAccountSaveResult = res.data
    },
    //发现列表
    SET_FIND_MSG_LIST(state, data) {
      if(data.filter_L_accountId){
        state.editor.findTotalListMM.filter_L_accountId = data.filter_L_accountId
      }
      if(data.teID){
        state.editor.findTotalListMM.filter_L_accountId = ''
      }
      state.editor.findTotalListMM.page = data.page
      state.editor.findTotalListMM.rows = data.rows
      state.editor.findTotalListMM.filter_S_title = data.filter_S_title
      state.editor.findTotalListMM.filter_S_accountName = data.filter_S_accountName
      state.editor.findTotalListMM.filter_I_isAudit = data.filter_I_isAudit
    },
    GET_FIND_MSG_LIST(state, res) {
      state.page.findMsgListResult = res.data
    },
    //新增发现文章
    SET_FIND_SAVE_MSG(state, data) {
      state.editor.findSaveMsgMM.type = data.type
      state.editor.findSaveMsgMM.title = data.title
      state.editor.findSaveMsgMM.productId = data.productId
      state.editor.findSaveMsgMM.content = data.content
      state.editor.findSaveMsgMM.sort = data.sort
      state.editor.findSaveMsgMM.productType = data.productType
      state.editor.findSaveMsgMM.isStick = data.isStick
      state.editor.findSaveMsgMM.linkUrls = data.linkUrls
      state.editor.findSaveMsgMM.productName = data.productName
      state.editor.findSaveMsgMM.accountId = data.accountId
      state.editor.findSaveMsgMM.id=data.id
      state.editor.findSaveMsgMM.isAudit=data.isAudit
    },
    //根据id获取发现信息
    SET_FIND_ONLY_ID(state, data) {
      state.editor.findOnlyIdMM.id = data.id
    },
    GET_FIND_ONLY_ID(state, res) {
      state.page.findOnlyIdResult = res.data
    },
    //申请列表
    SET_APPLY_SUPERVISOR(state,data){
      state.editor.applySupervisorListMM.page=data.page
      state.editor.applySupervisorListMM.rows=data.rows
      state.editor.applySupervisorListMM.startTime=data.startTime
      state.editor.applySupervisorListMM.endTime=data.endTime
      state.editor.applySupervisorListMM.accountNo=data.accountNo
      state.editor.applySupervisorListMM.filter_I_sendStatus=data.filter_I_sendStatus
      state.editor.applySupervisorListMM.filter_I_status=data.filter_I_status
    },
    GET_APPLY_SUPERVISOR(state,res){
         state.page.applySupervisorList=res.data.result
        },
    //申请导入
    SET_SEND_IMPORT(state,data){
      state.editor.sendImportMM.ids=data.ids
      state.editor.sendImportMM.sendStatus=data.sendStatus
    },
    //会员列表
    SET_ACCOUNT_NO(state,data){
      state.editor.accountNoMM.page=data.page
      state.editor.accountNoMM.rows=data.rows
      state.editor.accountNoMM.filter_S_accountNo=data.filter_S_accountNo
    },
    GET_ACCOUNT_NO(state,res) {
      state.page.accountNoListResult=res.data
    },
    //轮播图列表
    SET_INDEX_LIST_LUN(state,data){
      state.editor.indexListLunMM.filter_I_type=data.filter_I_type
      state.editor.indexListLunMM.filter_I_linkType=data.filter_I_linkType
      state.editor.indexListLunMM.page=data.page
      state.editor.indexListLunMM.rows=data.rows
      state.editor.indexListLunMM.sortField=data.sortField
    },
    GET_INDEX_LIST_LUN(state,res){
      state.page.indexListLunResult=res.data
    },
    //新增修改
    SET_ADDANDUPDATA_LIST(state,data){
      state.editor.addAndUpdataListMM.id=data.id
      state.editor.addAndUpdataListMM.sort=data.sort
      state.editor.addAndUpdataListMM.type=data.type
      state.editor.addAndUpdataListMM.name=data.name
      state.editor.addAndUpdataListMM.url=data.url
      state.editor.addAndUpdataListMM.image=data.image
      state.editor.addAndUpdataListMM.linkType=data.linkType
    }
  },
  getters:{
    //产品库产品规格
    getProductNormalsResult (state) {
      return state.page.getProductNormalsResult
    },
    //特卖的规格
    PproductgetByIdResult(state){
      return state.page.PproductgetByIdResult
    },
    //修改跳转接受
    upDataSaleGoodsResult(state){
      return state.page.upDataSaleGoodsResult
    },


    //督导设置
    upInfoListResult(state){
      return state.page.upInfoListResult
    },
    //粉领set
    pinkListResult(state){
      return state.page.pinkListResult
    },
    //礼包，列表
    storeGiftBagListResult(state){
      return state.page.storeGiftBagListResult
    },
    //获取收益配置
    commissionInfoResult(state){
    return state.page.commissionInfoResult
    },
    //明星督导统计
    canUpToStarResult(state){
      return state.page.canUpToStarResult
    },
    //获取产品佣金配置信息
    productCommissionInfoResult(state){
      return state.page.productCommissionInfoResult
    },
    plusCommissionInfoResult(state){
      return state.page.plusCommissionInfoResult
    },


    //发现
    findMsgResult: state => {
      return state.page.findMsgResult
    },
    //发现列表
    findMsgListResult: state => {
      return state.page.findMsgListResult
    },
    //根据id获取发现信息
    findOnlyIdResult: state => {
      return state.page.findOnlyIdResult
    },
    //申请列表
    applySupervisorList: state => {
      return state.page.applySupervisorList
    },
    //会员列表
    accountNoListResult:state =>{
      return state.page.accountNoListResult
    },
    //轮播图列表
    indexListLunResult:state =>{
      return state.page.indexListLunResult
    }
  },
  actions:{
    //get获取封装
    GoodsMsgGet ({dispatch, state, commit, rootState},funUrl) {
     axios.defaults.baseURL =rootState.editor.axiosUrl;
     commit('changeloading')
      axios({
        method: 'get',
        url:funUrl[0],
        dataType: 'JSON',
        params: state.editor[funUrl[2]]
      }).then(function(res){
        //console.log(res)
        commit('changeloading')
         if(res.data.length>0){
           commit(funUrl[1],res)
          }else{
           commit(funUrl[1],res)
         }
        })
        .catch(function(err){
        commit('changeloading')
          //console.log(err)
        })
    },
    //post获取封装
    GoodsMsgPost ({dispatch, state, commit, rootState},funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'post',
        url:funUrl[0],
        dataType: 'JSON',
        data: qs.stringify(state.editor[funUrl[2]])
      }).then(function(res){
       // console.log(res)
        dispatch('plusProductListActions',{  page:1, rows:10, sortField:'sort',sortOrder:'asc'})
        if(res.data=='success' || res.data.code==0){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          })
        }else{
          Message({
            showClose: true,
            message:res.data,
            type: 'warning'
          });
        }
      }).catch(function(err){
          Message({
            showClose: true,
            message:"操作失败",
            type: 'warning'
          });
        })
    },
    //特卖排序
    plusProductSortSetActions({dispatch, state, commit, rootState}, data){
      commit('PLUS_PRODUCT_PUSH',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/updateSort','','productNewMM'])
    },
    //特卖置顶
    ProductDoStickActions({dispatch, state, commit, rootState},data){
      commit('PLUS_PRODUCT_PUSH',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/doStick','','productNewMM'])
    },
     //批量上下架
    plusDoAuditActions({dispatch, state, commit, rootState},data){
      commit('DELETE_PRODUCT',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/doAudit','','deleteProductNormalsMM'])
    },
    //获取产品库商品规格
    getProductNormalsActions({dispatch, state, commit, rootState},id){
      commit('SETPRODUCTNORMALS',id)
      dispatch('GoodsMsgGet',['/admin/together/product/getProductNormals','GETPRODUCTNORMALS','getProductNormalsMM'])
    },
     //获取特卖商品规格
    PproductgetByIdActions({dispatch, state, commit, rootState},id){
      commit('PPRODUCT_SET_ID',id)
      dispatch('GoodsMsgGet',['/admin/plus/product/getPlusProductNormals','PPRODUCT_GET_ID','PproductgetByIdMM'])
    },
    //新增特卖、修改
    plusProductSaveActions({dispatch,state,commit,rootState},data){
      commit('PLUS_PRODUCT_PUSH',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/save','','productNewMM'])
    },
    //删除特卖
    deleteProductSave({dispatch,state,commit,rootState},id){
      commit('DELETE_PRODUCT',id)
    api.deletePpApi(rootState.editor.axiosUrl+'/admin/plus/product/delete',qs.stringify(state.editor.deleteProductNormalsMM)).then(res=>{
      console.log(res)
      if(res=='success'){
        Message({
          showClose: true,
          message:'操作成功',
          type: 'success'
        });
        dispatch('plusProductListActions',{  page:1, rows:10, sortField:'sort',sortOrder:'asc'})
      }
    }).catch(
      (error) => {
        Message({
          showClose: true,
          message:'操作失败',
          type: 'warning'
        });
      }
    )
    },
    //批量删除
    batchdeleteProductSave({dispatch,state,commit,rootState},id){
      commit('DELETE_PRODUCT',id)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/plus/product/batchDelete',qs.stringify(state.editor.deleteProductNormalsMM)).then(res=>{
        console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          dispatch('plusProductListActions',{  page:1, rows:10, sortField:'sort',sortOrder:'asc'})
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },


    //督导设置//粉领
    upInfoListActions({commit, dispatch, state, rootState},data){
      commit('SET_UPINFO_LIST',data)
      if(data.type===1){
        dispatch('GoodsMsgGet',['/admin/upInfo/getByType','GET_PINK_UPINFO_LIST','upInfoListMM'])
      }else{
        dispatch('GoodsMsgGet',['/admin/upInfo/getByType','GET_UPINFO_LIST','upInfoListMM'])
      }
    },
    //新增修改
    upinfoSaveActions({commit, dispatch, state, rootState},data){
          commit('SET_UPINFO_SAVE',data)
         // dispatch('GoodsMsgGet',['/admin/upInfo/save','','upInfoSaveMM'])
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/upInfo/save',qs.stringify(state.editor.upInfoSaveMM)).then(res=>{
       // console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(state.editor.upInfoSaveMM.type===1){
            dispatch('upInfoListActions',{  type:1 })
          }else{
            dispatch('upInfoListActions',{  type:2 })
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //礼包列表
    storeGiftBagListActions({commit, dispatch, state, rootState},data){
      commit('SET_STORE_GIFTBAG_LIST',data)
      dispatch('GoodsMsgGet',['/admin/storeGiftBag/list','GET_STORE_GIFTBAG_LIST','storeGiftBagListMM'])
    },
    //新增修改礼包
    storeGiftBagSave1Actions({commit,dispatch,state,rootState},data){
      commit('SET_STORE_GIFTBAG_SAVE1',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/storeGiftBag/save1',qs.stringify(state.editor.storeGiftBagSave1MM)).then(res=>{
       // console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(data.type===1){
            dispatch('storeGiftBagListActions',{  page:1,rows:10 ,filter_I_type:1})
          }else{
            dispatch('storeGiftBagListActions',{  page:1,rows:10 ,filter_I_type:2})
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //删除礼包
    storeGiftBagDeleteActions({commit,dispatch,state,rootState},data){
      let obj = {
        id: data.id
      }
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/storeGiftBag/delete',qs.stringify(obj)).then(res=>{
        // console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(data.type==='pink'){
            dispatch('storeGiftBagListActions',{  page:1,rows:10,filter_I_type:1 })
          }else{
            dispatch('storeGiftBagListActions',{  page:1,rows:10,filter_I_type:2 })
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //获取收益配置
    commissionInfoActions({commit, dispatch, state},data){
      commit('SET_UPINFO_LIST',data)
      dispatch('GoodsMsgGet',['/admin/upInfo/commissionInfo','GET_COMMISSION_INFO','upInfoListMM'])
    },
    //设置收益配置
    setCommissionActions({commit, dispatch, state, rootState},data){
      commit('SET_SET_COMMISSION',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/upInfo/setCommission',qs.stringify(state.editor.setCommissionMM)).then(res=>{
         console.log(res)
        if(res.code===0){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
         // dispatch('commissionInfoActions',{  type:2 })
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //明星督导统计
    canUpToStarMemberActions({commit, dispatch, state, rootState},data){
      commit('SET_STORE_GIFTBAG_LIST',data)
      dispatch('GoodsMsgGet',['/admin/member/canUpToStarMember','GET_CANUPTOSTAR_RESULT','storeGiftBagListMM'])
    },
   //审核
    setMemberLevelActions({commit, dispatch, state, rootState},data){
        commit('SET_MEMBER_LEVEL',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/member/setMemberLevel',qs.stringify(state.editor.setMemberLevelMM)).then(res=>{
        //console.log(res)
        if(res.code===0 || res==='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
           dispatch('canUpToStarMemberActions',{  page:1,rows:10 })
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
      },
    //获取产品佣金配置信息
    productCommissionInfoActions({commit, dispatch, state, rootState},data){
      commit('SET_UPINFO_LIST',data)
      if(data.type===1){
        dispatch('GoodsMsgGet',['/admin/upInfo/productCommissionInfo','GET_PRODUCT_COMMISSION_INFO','upInfoListMM'])
      }else{
        dispatch('GoodsMsgGet',['/admin/upInfo/productCommissionInfo','GET_PLUS_COMMISSION_INFO','upInfoListMM'])
      }
    },
    //设置产品收益配置信息
    setProductCommissionInfoActions({commit, dispatch, state, rootState},data){
      commit('SET_PRODUCT_COMMISSION_INFO',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/upInfo/setProductCommissionInfo',qs.stringify(state.editor.setProductCommissionInfoMM)).then(res=>{
        console.log(res)
        if(res.code===0){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(Object.keys(data).indexOf('productCommissionScale')!==-1){
            dispatch('productCommissionInfoActions',{  type:1 })
          }else{
            dispatch('productCommissionInfoActions',{  type:2 })
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },

//各种后续操作封装
    savePostAsk ({dispatch, state, commit, rootState},funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'post',
        url:funUrl[0],
        dataType: 'JSON',
        data: qs.stringify(state.editor[funUrl[2]])
      }).then(function(res){
        if(res.data==='success'){
          Message({
            message:'操作成功',
            type:'success'
          })
          dispatch(funUrl[3],state.editor[funUrl[4]])
        }else{
          Message({
            message:'操作失败',
            type:'error'
          })
        }
      })
        .catch(function(err){


        })
    },
    //get封装
    findMsgGet ({dispatch, state, commit, rootState},funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'get',
        url:funUrl[0],
        dataType: 'JSON',
        params: state.editor[funUrl[2]]
      }).then(function(res){
        //console.log(res)
        // context.commit('changeloading')
        if(res.data.code===0){
          if(funUrl[1]){
            commit(funUrl[1],res)
          }
          Message({
            message:'操作成功',
            type:'success'
          })
          dispatch('findAccountActions',state.editor.storeGiftBagListMM)
          dispatch('findMsgListActions',state.editor.findTotalListMM)
        }else{
          Message({
            message:'操作失败',
            type:'error'
          })
        }
      })
        .catch(function(err){
          // context.commit('changeloading')
          //console.log(err)
        })
    },
    ////发现账号列表
    findAccountActions({commit, dispatch, state, rootState}, data) {
      commit('SET_STORE_GIFTBAG_LIST', data)
      dispatch('GoodsMsgGet', ['/admin/findAccount/list', 'GET_FIND_ACCOUNT', 'storeGiftBagListMM'])
    },
    //新增账户
    findAccountSaveActions({commit, dispatch, state, rootState}, data) {
      commit('SET_FIND_ACCOUNT_SAVE', data)
      dispatch('findMsgGet', ['/admin/findAccount/save', 'GET_FIND_ACCOUNT_SAVE', 'findAccountSaveMM'])
    },
    //发现列表
    findMsgListActions({commit, dispatch, state, rootState}, data) {
      commit('SET_FIND_MSG_LIST', data)
      dispatch('GoodsMsgGet', ['/admin/find/totalList', 'GET_FIND_MSG_LIST', 'findTotalListMM'])
    },
    //新增发现文章
    findSaveMsgActions({commit, dispatch, state, rootState}, data) {
      commit('SET_FIND_SAVE_MSG', data)
      dispatch('findMsgGet', ['/admin/find/save', '', 'findSaveMsgMM'])
    },
    // //根据id获取发现信息
    findOnlyIdActions({commit, dispatch, state, rootState}, data) {
      commit('SET_FIND_ONLY_ID', data)
      dispatch('GoodsMsgGet', ['/admin/find/getById', 'GET_FIND_ONLY_ID', 'findOnlyIdMM'])
    },
// //删除发现信息
    deleteOnlyIdActions({commit, dispatch, state, rootState}, data) {
      commit('SET_FIND_ONLY_ID', data)
      dispatch('findMsgGet', ['/admin/find/delete', 'GET_FIND_ONLY_ID', 'findOnlyIdMM'])
    },
    //删除某个文件
    deleteOnlyfileIdActions({commit, dispatch, state, rootState}, data) {
      axios.get('/admin/find/deleteFile', {
        params:{fileId: data.fileId}
      }).then(res => {
        if (res.data.code === 0) {
          Message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          Message({
            message: '操作失败',
            type: 'error'
          })
        }
      })
    },
    //申请列表
    applySupervisorListActions({commit, dispatch, state, rootState}, data) {
      commit('SET_APPLY_SUPERVISOR', data)
      dispatch('GoodsMsgGet', ['/admin/memberInvite/applySupervisorList', 'GET_APPLY_SUPERVISOR', 'applySupervisorListMM'])
    },
    //申请导入
    sendImportActions({commit, dispatch, state, rootState}, data) {
      commit('SET_SEND_IMPORT', data)
      api.deletePpApi(rootState.editor.axiosUrl + '/admin/memberInvite/sendImport', qs.stringify(state.editor.sendImportMM)).then(res => {
        console.log(res)
        if (res.code === 0) {
          Message({
            showClose: true,
            message: '导入成功',
            type: 'success'
          });
          dispatch('applySupervisorListActions',state.editor.applySupervisorListMM)
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message: '操作失败',
            type: 'warning'
          });
        }
      )
    },
    //会员列表
    accountNoActions({commit, dispatch, state, rootState},data){
      commit('SET_ACCOUNT_NO',data)
      dispatch('GoodsMsgGet',['/admin/member/list','GET_ACCOUNT_NO','accountNoMM'])
    },
    //会员发现账号删除
    huiyuandeleteActions({commit, dispatch, state, rootState}, data) {
      commit('DELETE_PRODUCT', data)
      api.deletePpApi(rootState.editor.axiosUrl + '/admin/findAccount/delete', qs.stringify(state.editor.deleteProductNormalsMM)).then(res => {
        console.log(res)
        if (res.code === 0) {
          Message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          dispatch('findAccountActions',state.editor.storeGiftBagListMM)
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message: '操作失败',
            type: 'warning'
          });
        }
      )
    },
    //轮播图列表
    indexListLunActions({commit, dispatch, state, rootState},data){
      commit('SET_INDEX_LIST_LUN',data)
      dispatch('GoodsMsgGet',['/admin/index/list','GET_INDEX_LIST_LUN','indexListLunMM'])

    },
    //删除轮播图
    deleteindexLunActions({commit, dispatch, state, rootState},data){
      commit('SET_FIND_ONLY_ID',data)
      dispatch('savePostAsk',['/admin/index/delete','','findOnlyIdMM','indexListLunActions','indexListLunMM'])
    },
    //新增修改
    addOrUpdataActions({commit, dispatch, state, rootState},data){
      commit('SET_ADDANDUPDATA_LIST',data)
      dispatch('savePostAsk',['/admin/index/save','','addAndUpdataListMM','indexListLunActions','indexListLunMM'])
    }
  }
}

export default servers
