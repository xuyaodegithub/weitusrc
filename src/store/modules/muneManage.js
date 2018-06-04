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
import axios from 'axios'
import { Message } from 'element-ui';
const muneManage={
  state:{
    editor:{
      //分页
      pages:{},
      //新增、修改菜单
      menuSaveNewMM:{
        id:'',
        menuClass:'',
        menuName:'',
        parentId:'',
        sort:'',
        url:''
      },
      //菜单列表删除
      menuDeleteMM:{
        id:''
      },
      //试用列表
      freeUseProductListMM:{
        filter_I_type:'',
        filter_S_productName_contains:'',
        sortField:'',
        page:'',
        rows:'',
        sortOrder:'asc',
        filter_I_status:'',
        filter_S_dailyStartTime:''
      },
      //创建试用商品
      addFreeUseProductMM:{
        id:'',
        countryId:'',
        dailyStartTime:'',
        dayLimitCount:'',
        description:'',
        image:'',
        indexImage:'',
        isSetTop:'',
        normalIds:'',
        normalStores:'',
        productId:'',
        productName:'',
        salePrices:'',
        sort:'',
        status:'',
        tip:'',
        type:'',
        endDate:'',
        startDate:'',
        isOverSeasProduct:'',
        freeUseDays:'',
        buyCount:''
      },
      //试用规格
      FreeUseProductNormalsMM:{
        freeUseProductId:'',
        type:''
      },
      //新增国家
      addNewCountryMM:{
        countryIcon:'',
        countryName:''
      },
      //删除试用     //使用商品批量上架
      deleteTryGoodsMM:{
        ids:''
      },
      // //列表设置排序
      // productSetSortMM:{
      //   id:'',
      //   sort:''
      // }


    },
    page:{
//菜单列表
      menuListResult:[],
      //试用商品列表
      freeUseProductListResult:[],
      //试用规格
      FreeUseProductNormalsResult:{title:true,item:[]},
      //国家列表
      countryListResult:[]
    }
  },
  mutations:{
    //set分页
    SET_PAGE_ROWS(state,data){
        state.editor.pages=data
    },
    //清除数据
    //新增、修改菜单
    MENU_SAVE_NEW(state,data){
      state.editor.menuSaveNewMM.id=data.id
      state.editor.menuSaveNewMM.sort=data.sort
      state.editor.menuSaveNewMM.menuClass=data.menuClass
      state.editor.menuSaveNewMM.menuName=data.menuName
      state.editor.menuSaveNewMM.parentId=data.parentId
      state.editor.menuSaveNewMM.url=data.url
    },
    //菜单列表
    GET_MENU_LIST(state,res){
      let bigMune=[]
        res.data.rows.forEach((val,index) => {
        if(val.parentId=='0'){
          bigMune.push(val)
        }
        })
      for(let i=0;i<bigMune.length;i++){
        bigMune[i].sonList=[]
        for(let j=0;j<res.data.rows.length;j++){
          if(res.data.rows[j].parentId===bigMune[i].id){
            bigMune[i].sonList.push(res.data.rows[j])
          }
        }
      }
      state.page.menuListResult=bigMune
    },
    //试用商品列表
    SET_FREEUSE_PRODUCT_LIST(state,data){
      state.editor.freeUseProductListMM.page=data.page
      state.editor.freeUseProductListMM.sortField=data.sortField
      state.editor.freeUseProductListMM.rows=data.rows
      state.editor.freeUseProductListMM.filter_S_productName_contains=data.filter_S_productName
      state.editor.freeUseProductListMM.filter_I_type=data.filter_I_type
      state.editor.freeUseProductListMM.sortOrder=data.sortOrder
      state.editor.freeUseProductListMM.filter_I_status=data.filter_I_status
      state.editor.freeUseProductListMM.filter_S_dailyStartTime=data.filter_S_dailyStartTime
    },
     GET_FREEUSE_PRODUCT_LIST(state,res){
     state.page.freeUseProductListResult=res.data
    },
     //add试用商品
    SET_ADD_FREEUSE_PRODUCT(state,data){
      state.editor.addFreeUseProductMM.id=data.id
      state.editor.addFreeUseProductMM.sort=data.sort
      state.editor.addFreeUseProductMM.status=data.status
      state.editor.addFreeUseProductMM.salePrices=data.salePrices
      state.editor.addFreeUseProductMM.productName=data.productName
      state.editor.addFreeUseProductMM.productId=data.productId
      state.editor.addFreeUseProductMM.normalIds=data.normalIds
      state.editor.addFreeUseProductMM.image=data.image
      state.editor.addFreeUseProductMM.type=data.type
      state.editor.addFreeUseProductMM.countryId=data.countryId
      state.editor.addFreeUseProductMM.dailyStartTime=data.dailyStartDate
      state.editor.addFreeUseProductMM.dayLimitCount=data.dayLimitCount
      state.editor.addFreeUseProductMM.description=data.description
      state.editor.addFreeUseProductMM.isSetTop=data.isSetTop
      state.editor.addFreeUseProductMM.normalStores=data.normalStores
      state.editor.addFreeUseProductMM.tip=data.tip
      state.editor.addFreeUseProductMM.startDate=data.startDate
      state.editor.addFreeUseProductMM.endDate=data.endDate
      state.editor.addFreeUseProductMM.indexImage=data.indexImage
      state.editor.addFreeUseProductMM.isOverSeasProduct=data.isOverSeasProduct
      state.editor.addFreeUseProductMM.freeUseDays=data.freeUseDays
      state.editor.addFreeUseProductMM.buyCount=data.buyCount

    },
//试用规格
      SET_FREEUSE_PRODUCT_NORMALS(state,data){
        state.editor.FreeUseProductNormalsMM.type=data.type
        state.editor.FreeUseProductNormalsMM.freeUseProductId=data.freeUseProductId
      },
     GET_FREEUSE_PRODUCT_NORMALS(state,res){
         state.page.FreeUseProductNormalsResult.item=res.data
         state.page.FreeUseProductNormalsResult.title=!state.page.FreeUseProductNormalsResult.title
        },
    //国家列表
    GET_COUNTRY_LIST(state,res){
       state.page.countryListResult=res.data
    },
    //新增国家
    SET_ADDNEW_COUNTRY(state,data){
      state.editor.addNewCountryMM.countryIcon=data.countryIcon
      state.editor.addNewCountryMM.countryName=data.countryName
    },
    //删除试用
    SET_DELETE_TRYGOODS(state,data){
      state.editor.deleteTryGoodsMM.ids=data.ids
    }



  },
  getters:{
    //菜单列表
    menuListResult(state){
      return state.page.menuListResult
    },
    //试用商品列表
    freeUseProductListResult(state){
      return state.page.freeUseProductListResult
    },
    //试用规格
    FreeUseProductNormalsResult(state){
    return state.page.FreeUseProductNormalsResult
    },
    //国家列表
    countryListResult(state){
      return state.page.countryListResult
    }
  }

  ,
  actions: {
    //get获取封装
    GoodsMsgGetMune ({dispatch, state, commit, rootState}, funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'get',
        url: funUrl[0],
        dataType: 'JSON',
        params: state.editor[funUrl[2]]
      }).then(function (res) {
          commit(funUrl[1], res)
      }).catch(function (err) {
        })
    },
     //fress get获取封装
    GoodsfressGetMune ({dispatch, state, commit, rootState}, funUrl) {
      commit('changeloading')
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'get',
        url:funUrl[0],
        dataType: 'JSON',
        params: state.editor[funUrl[2]]
      }).then(function (res) {
        commit('changeloading')
        if(res.statusText=='OK'){
          commit(funUrl[1], res)
        }
        }
      ).catch(function (err) {
        commit('changeloading')
        if(funUrl[2]=='FreeUseProductNormalsMM'){
            Message({
              showClose: true,
              message: '获取规格信息失败',
              type: 'warning'
            })
        }
        })
    },
     //fress post获取封装
    GoodsfressPostMune ({dispatch, state, commit, rootState}, funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'post',
        url:funUrl[0],
        dataType: 'JSON',
        data: qs.stringify(state.editor[funUrl[2]])
      }).then(function (res) {
        if(res.data=='success'){
          dispatch('getCountryActions')
          dispatch('freeUseProductListActions',state.editor.pages)
          Message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
        }else{
          Message({
            showClose: true,
            message: res.data,
            type: 'warning'
          })
        }
      }).catch(function (err) {
        Message({
          showClose: true,
          message: '操作失败',
          type: 'warning'
        })
        })
    },
    //post获取封装
    GoodsMsgPostMune ({dispatch, state, commit, rootState}, funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'post',
        url:funUrl[0],
        dataType: 'JSON',
        data: qs.stringify(state.editor[funUrl[2]])
      }).then(function (res) {
        console.log(res)
        if (res.status=='200') {
          //commit([funUrl[1]], res)
          dispatch('menuListActions','')
          Message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
        } else {
          Message({
            showClose: true,
            message: res.data,
            type: 'warning'
          });
        }
      }).catch(function (err) {
          // Message({
          //   showClose: true,
          //   message: "操作失败",
          //   type: 'warning'
          // });
          //console.log(err)
        })
    },
    //新增菜单
    menuSaveNewActions({dispatch, state, commit, rootState},data){
      commit('MENU_SAVE_NEW',data)
      dispatch('GoodsMsgPostMune',['/admin/menu/save','','menuSaveNewMM'])
    },
    // //修改
    // menuUpdataNewActions({dispatch, state, commit, rootState},data){
    //   commit('MENU_SAVE_NEW',data)
    //   dispatch('GoodsMsgPost',['/admin/menu/save','','menuSaveNewMM'])
    // },
    //删除
    menuDeleteNewActions({dispatch, state, commit, rootState},data){
      //commit('MENU_DELETE',data)
      dispatch('GoodsMsgPostMune',['/admin/menu/delete/'+data.id,'',''])
    },
    //菜单列表
    menuListActions({dispatch, state, commit, rootState},data){
      dispatch('GoodsMsgGetMune',['/admin/menu/list','GET_MENU_LIST',''])
    },
    //试用列表
    freeUseProductListActions({dispatch, state, commit, rootState},data){
      commit('SET_FREEUSE_PRODUCT_LIST',data)
      dispatch('GoodsfressGetMune',['/admin/freeUse/product/list','GET_FREEUSE_PRODUCT_LIST','freeUseProductListMM'])
    },
    //add试用
    addFreeUseProductActions({dispatch, state, commit, rootState},data){
      commit('SET_ADD_FREEUSE_PRODUCT',data)
      dispatch('GoodsfressPostMune',['/admin/freeUse/product/save2','','addFreeUseProductMM'])
    },
    //试用规格
    FreeUseProductNormalsActions({dispatch, state, commit, rootState},data){
      commit('SET_FREEUSE_PRODUCT_NORMALS',data)
      dispatch('GoodsfressGetMune',['/admin/freeUse/product/getFreeUseProductNormals','GET_FREEUSE_PRODUCT_NORMALS','FreeUseProductNormalsMM'])
    },
    //获取国家
    getCountryActions({dispatch, state, commit, rootState},data){
      dispatch('GoodsfressGetMune',['/admin/country/list','GET_COUNTRY_LIST',''])
    },
   //新增国家
    AddNewCountryActions({dispatch, state, commit, rootState},data){
      commit('SET_ADDNEW_COUNTRY',data)
      dispatch('GoodsfressPostMune',['/admin/country/save','','addNewCountryMM'])
    },
    //删除试用
    deleteTryGoodsActions({dispatch, state, commit, rootState},data){
      commit('SET_DELETE_TRYGOODS',data)
      dispatch('GoodsfressPostMune',['/admin/freeUse/product/batchDelete','','deleteTryGoodsMM'])
    },
    //列表设置排序
    productSetSortActions({dispatch,state,commit,rootState},data){
      commit('SET_ADD_FREEUSE_PRODUCT',data)
      dispatch('GoodsfressPostMune',['/admin/freeUse/product/setSort','','addFreeUseProductMM'])
    },
    //设置是否置顶
    productSetToTopActions({dispatch,state,commit,rootState},data){
      commit('SET_ADD_FREEUSE_PRODUCT',data)
      dispatch('GoodsfressPostMune',['/admin/freeUse/product/setToTop','','addFreeUseProductMM'])
    },
    //批量试用上架
    productDoAudit2Actions({dispatch,state,commit,rootState},data){
      commit('SET_DELETE_TRYGOODS',data)
      dispatch('GoodsfressPostMune',['/admin/freeUse/product/doAudit2','','deleteTryGoodsMM'])
    }

  }
}

export default muneManage
