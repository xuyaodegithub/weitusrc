/**
 * Created by Yan on 17/11/9.
 */
import router from '../../router/index'
import axios from 'axios'
import qs from 'qs';
import * as types from '../fetch/type';
import { Message } from 'element-ui';
//import { Loading } from 'element-ui';
import api from '../fetch/api'
var num=1
var textCs=''
var textCsTow=''
  if(num===0){
    textCs='/apis'
    textCsTow='/apis'
  }else{
    textCs='http://api-admin.olquan.cn/'
    textCsTow='http://106.15.49.17:8888/'
  }
const actions = {//actions,mutations内的方法只能有两个参数，一个是context一个是外部调用时传参，event事件对象参数除外
  //弹框修改属性
  popoverAlert(context,where,event){
    context.commit('changeAlert',where)
  },
  //警示语
  mSuccess(context,data){
    Message({
      showClose: true,
      message:'操作成功',
      type: 'success'
    });
  },
  mError(context,data){
    Message({
      showClose: true,
      message:'请求失败',
      type: 'error'
    });
  },
  mWarning(context,data){
    Message({
      showClose: true,
      message:data.message,
      type:'warning'
    });
  },
  //导出方法
  export2Excel() {
    require.ensure([], () => {
      const { export_json_to_excel } = require('@/vendor/Export2Excel');
      const tHeader = ['1', '2', '3', '4', '5'];
      const filterVal = ['id', 'ownprice', 'pingjia', 'name', 'salestatus'];
      const list = this.tableData;
      const data = this.formatJson(filterVal,list)
      export_json_to_excel(tHeader, data, '列表excel');
    })
  },
  formatJson(filterVal,list) {
    console.log(list)
    return list.map(v => filterVal.map(j => v[j]))
  },
  //品牌模块切换
  classResultActions (context,data) {
    context.commit('classResultTypes',data)
  },
  //分类模块切换
  fenleiResultActions (context,data) {
    context.commit('fenleiClassResultTypes',data)
    //context.dispatch('getProductSpecsActions')
  },
  //活动切换
  activeActions(context,data){
    context.commit('activeChange',data)
  },
  //活动组件编辑
  commodityActions(context,obj){
    context.commit('GET_COMMODITY_RESULT',obj)
  },
  //组件add
  addCommodityActions (context,obj) {
    context.commit('GET_ADD_COMMODITY',obj)
  },
  //活动页面背景设置
  backColorActions (context,data) {
    context.commit('GET_BACK_COLOR',data)
  },
  //获取活动列表
  listActiveActions (context,data) {
    context.commit('changeloading')
    context.commit('SET_LIST_ACTIVE',data)
    axios.get(textCsTow+'/admin/buildblocks/list',{
      params:context.state.editor.listActiveMM
    }).then(res => {
      context.commit('GET_LIST_ACTIVE',res)
      context.commit('changeloading')
    }).catch(
      function(err){
        context.commit('changeloading')
        context.dispatch('mError')
      }
    )
  },
  //添加活动
  insertActiveActions (context,data) {
    context.commit('SET_INSERT_ACTIVE',data)
    api.addguige(textCsTow+'/admin/buildblocks/insert',qs.stringify(context.state.editor.insertActiveMM)).then(res => {
      if(res.ok){
        context.dispatch('mSuccess')
        context.dispatch('listActiveActions',{page:1,rows:10})
      }else{
        context.dispatch('mWarning',res)
      }
    }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //编辑活动
  updateActiveActions (context,data) {
  context.commit('SET_UPDATE_ACTIVE',data)
  api.addguige(textCsTow+'/admin/buildblocks/update',qs.stringify(context.state.editor.updateActiveMM)).then(res => {
    if(res.ok){
      context.dispatch('mSuccess')
      context.dispatch('listActiveActions',{page:1,rows:10})
    }else{
      context.dispatch('mWarning',res)
    }
  }).catch(
    (error) => {
      context.dispatch('mError')
    }
  )
},
  //删除活动
  deleteActiveActions (context,data){
    context.commit('SET_DELETE_ACTIVE',data.id)
    api.addguige(textCsTow+'/admin/buildblocks/delete',qs.stringify(context.state.editor.deleteActiveMM)).then(res => {
      if(res.ok){
        context.dispatch('mSuccess')
        context.dispatch('listActiveActions',data.item)
      }else{
        context.dispatch('mWarning',res)
      }
    }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //根据id获取活动信息
  getByIdActiveActions (context,id) {
    let data={
      obj:{},
      item:'vByIdActive'
    }
    context.commit('activeChange',data)
    context.commit('SET_GETBYID_ACTIVE',id)
    axios.get(textCsTow+'/admin/buildblocks/getById',{
      params:context.state.editor.getByIdActiveMM
    }).then(res => {
      if(res.data.result===null){
        context.dispatch('clearAllActions')
      }else{
        context.commit('GET_GETBYID_ACTIVE',res)
      }
    }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //上传活动数据到OSS
  uploadDataToOSSActions (context,data) {
    context.commit('SET_UPLOAD_DATATOOSS',data)
    api.addguige(textCsTow+'/admin/buildblocks/uploadDataToOSS',qs.stringify(context.state.editor.uploadDataToOSSMM)).then(res => {
      if(res.ok){
        context.dispatch('mSuccess')
        context.dispatch('listActiveActions',{page:1,rows:10})
      }else{
        context.dispatch('mWarning',res)
      }
    }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //oss数据返回
  OssListActions (context,id) {
    axios.get('http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/buildblocks_data/'+id,{
      params:{}
    }).then(res => {
      context.commit('OssListResult',res)
    }).catch(
      (err) => {
        console.log(err)
      }
    )
  },

  //产品list
  getDataListActions (context,data) {
    context.commit('changeloading')
    context.commit('SET_ACTIVE_DATA_LIST',data)
    axios.get(textCsTow+'/admin/buildblocks/product/list',{
      params:context.state.editor.getDataListMM
    }).then(res => {
      context.commit('GET_ACTIVE_DATA_LIST',res)
      context.commit('changeloading')
    }).catch(
      function(err){
        context.commit('changeloading')
        context.dispatch('mError')
      }
    )
  },
  //清除数据
  clearAllActions(context){
    context.commit('CLEAR_ALL_DATA')
  },
  //axios封装
  saveFormPost (context,funUrl) {
    // axios.defaults.baseURL = context.state.editor.axiosUrl;
    axios({
      method: 'post',
      url:textCs+funUrl[0],
      dataType: 'JSON',
      data: qs.stringify(context.state.editor[funUrl[2]])
    })
      .then(function(res){
        Message({
          showClose: true,
          message: res.data.ok ? '操作成功' : res.data.message,
          type: res.data.ok ? 'success' : 'warning'
        });
        if(res.data.ok){
          context.dispatch('getAllTreeActions')
          if(funUrl[1] != ''){
            context.commit(types[funUrl[1]],res)
          }else{
          }
        }
      })
      .catch(function(err){
        console.log(err)
      })
  },
  saveFormGet (context,funUrl) {
    context.commit('changeloading')
    // axios.defaults.baseURL = context.state.editor.axiosUrl;
    axios({
      method: 'get',
      url:textCs+funUrl[0],
      dataType: 'JSON',
      params: context.state.editor[funUrl[2]]
    })
      .then(function(res){
        context.commit('changeloading')
        if(res.data.ok){
          if(res.data.result){
            if(funUrl[1] != ''){
              context.commit(types[funUrl[1]],res)
            }else{
            }
          }else{
            context.dispatch('clearAllActions')
          }
        }else{
          Message({
            showClose: true,
            message:res.data.message,
            type: 'warning'
          });
        }
      })
      .catch(function(err){
        context.commit('changeloading')
        console.log(err)
      })
  },
  //品牌获取
  getByIdActions (context,id) {
    let data={
      obj:'',
      str:'VeditorList',
      where:'3'
    }
    if(id){
      context.commit('classResultTypes',data)
      context.commit('SET_BY_ID',id)
      context.dispatch('saveFormGet',['/product/brand/getById','GET_BY_ID','getByIdMM',])
    }else{
      Message({
        showClose: true,
        message:'请输入品牌ID',
        type: 'warning'
      });
    }
  },
  //所有品牌
  getAllPpActions (context) {
    context.dispatch('saveFormGet',['/product/brand/getAll','GET_ALL_PPRESULT',{}])
  },
  //新增品牌
  newPushActions (context,data) {
    if(data.name && data.logo){
      context.commit('SET_NEW_PUSH',data)
      context.dispatch('deleteFormPost',['/product/brand/create','GET_NEW_PUSH','newPushMM','1'])
    }else{
      Message({
        showClose: true,
        message:'请输入完整信息',
        type: 'warning'
      });
    }
  },
  //删除/增加、编辑封装
  deleteFormPost (context,funUrl) {
    // axios.defaults.baseURL = context.state.editor.axiosUrl;
    axios({
      method: 'post',
      url:textCs+funUrl[0],
      dataType: 'JSON',
      data: qs.stringify(context.state.editor[funUrl[2]])
    })
      .then(function(res){
          Message({
            showClose: true,
            message:res.data.ok ? '操作成功' : '操作失败',
            type: res.data.ok ? 'success':'warning'
          })
        if(res.data.ok){
            context.dispatch('getAllPpActions')
            context.dispatch('getAllTreeActions')
        }
        // context.commit(types[funUrl[1]],res)
      })
      .catch(function(err){
        console.log(err)
      })
  },
  //删除品牌
  deletePpActions (context,id) {
    context.commit('SET_DELETE_PPRESULT',id)
    api.deletePpApi(textCs+'/product/brand/delete',qs.stringify(context.state.editor.deletePpMM)).then(res => {
      if(res.ok){
        context.dispatch('mSuccess')
        context.dispatch('clearAllActions')
        context.dispatch('getAllPpActions')
      }else{
        context.dispatch('mWarning',res)
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
  //修改品牌
  upDataPpActions (context,data) {
      context.commit('SET_UP_DATA_PPMM',data)
      context.dispatch('deleteFormPost',['/product/brand/update','','upDataPpMM'])
  },
  //检测品牌名
  checkPpActions (context,name) {
    if(name){
      context.commit('SET_CHECK_PP',name)
      context.dispatch('saveFormGet',['/product/brand/check','GET_CHECK_PP','checkPpMM'])
    }else{
      Message({
        showClose: true,
        message:'请输入品牌名称',
        type: 'warning'
      });
    }
},
  //获取该分类关联的品牌
  getCategoryBrandsActions(context,id){
    context.commit('SET_GET_CATEGORY_BRANDS',id)
    context.dispatch('saveFormGet',['/category/brand/getCategoryBrands','GET_GET_CATEGORY_BRANDS','getCategoryBrandsMM'])
  },
  //分类、获取整个分类
  getAllTreeActions(context){
  context.dispatch('saveFormGet',['/product/category/getAll','GET_ALL_TREE',{}])
  },
  //单个分类详情
  ByIdGetTreeActions(context,id){
    let data={
      obj:'',
      str:'VfenleiEditorList',
      where:'3'
    }
    if (id) {
      context.commit('fenleiClassResultTypes',data)
      context.commit('SET_BY_ID_GET_TREE',id)
      context.dispatch('saveFormGet',['/product/category/get','GET_BY_ID_GET_TREE','ByIdGetTreeMM'])
    } else {
      Message({
        showClose: true,
        message: '请输入分类ID',
        type: 'warning'
      });
    }
  },
  //删除分类
  deleteClassTreeActions(context,id){
      context.commit('SET_DELETE_CLASS_TREE',id)
      context.dispatch('deleteFormPost',['/product/category/delete','','deleteClassTreeMM'])
  },
  //新增分类
  pushClassTreeActions(context,data){
    if (data.name && data.logo) {
      context.commit('SET_PUSH_CLASS_TREE',data)
      context.dispatch('saveFormPost',['/product/category/create','GET_PUSH_CLASS_TREE','pushClassTreeMM'])
    }else {
      Message({
        showClose: true,
        message: '请输入完整信息',
        type: 'warning'
      });
    }

  },
  //更新分类
  upDataClassTreeActions (context,data) {
    context.commit('SET_UPDATA_CLASS_TREE',data)
    context.dispatch('saveFormPost',['/product/category/update','GET_PUSH_CLASS_TREE','updataClassTreeMM'])
  },
  //检测分类名称是否存在
  checkClassTreeActions(context,data){
    context.commit('SET_CHECK_CLASS_TREE',data)
    context.dispatch('saveFormGet',['/product/category/check','','checkClassTreeMM'])
  },
  //标签管理、获取所有
  getAllTagActions(context){
    context.dispatch('saveFormGet',['/product/Tag/getAll','GET_ALL_TAG_RESULT',{}])
  },
  // 删除标签
  deleteTagActions(context,id) {
    context.commit('SET_DELETE_TAG',id)
    context.dispatch('deleteFormPost',['/product/tag/delete','','deleteTagMM'])
  },
  //新增标签
  pushNewTagActions (context,data) {
    context.commit('SET_PUSH_NEW_TAG',data)
    context.dispatch('deleteFormPost',['/product/Tag/create','GET_PUSH_NEW_TAG','pushNewTagMM'])
  },
  //id获取标签
  getTagByIdActions(context,id){
    context.commit('SET_GET_TAG_BY_ID',id)
    context.dispatch('saveFormGet',['/product/Tag/getById','GET_GET_TAG_BY_ID','getTagByIdMM'])
  },
  //更新标签
  upDataTagActions (context,data) {
    context.commit('SET_PUSH_NEW_TAG',data)
    context.dispatch('deleteFormPost',['/product/Tag/update','','pushNewTagMM'])
  },

  //产品分类规格
  //修改大规格明细
  updateProductSpecActions (context,data){
    context.commit('SET_UPDATE_PRODUCT_SPEC',data)
    api.deletePpApi(textCs+'/product/category/spec/updateProductCategorySpec',qs.stringify(context.state.editor.updateProductSpecMM)).then(
      res => {
        if(res.ok){
          context.dispatch('mSuccess')
          context.dispatch('getProductSpecsActions',context.state.result.FlDataResult.obj)
        }else{
          context.dispatch('mWarning',res)
        }
      }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )

  },
  //修改一个小规格明细
  updateProductActions(context,data){
    context.commit('SET_UPDATE_PRODUCT',data)
    api.deletePpApi(textCs+'/product/category/spec/updateProductCategorySpecDetail',qs.stringify(context.state.editor.updateProductMM)).then(
      res => {
        if(res.ok){
          context.dispatch('mSuccess')
          context.dispatch('getProductSpecDetailsActions',data.specId)
        }else{
          context.dispatch('mWarning',res)
        }
      }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //删除分类下的一个商品规格模板
  deleteProductActions(context,id){
    context.commit('SET_DELETE_PRODUCT',id)
    api.deletePpApi(textCs+'/product/category/spec/deleteProductCategorySpec',qs.stringify(context.state.editor.deleteProductMM)).then(
      res =>{
        if(res.ok){
          context.dispatch('mSuccess')
          context.dispatch('getProductSpecsActions',{id:context.state.result.FlDataResult.obj.id})
        }else{
          context.dispatch('mWarning',res)
        }
      }).catch((error) => {
      context.dispatch('mError')
    })
  },
  //删除大规格模板下的一个小规格
  deleteSpecDetailActions(context,id){
    context.commit('SET_DELETE_PRODUCT',id)
    api.deletePpApi(textCs+'/product/category/spec/deleteProductCategorySpecDetail',qs.stringify(context.state.editor.deleteProductMM)).then(
      res => {
        if(res.ok){
          context.dispatch('mSuccess')
          context.dispatch('getProductSpecDetailsActions',context.state.result.smallguige.id)
        }else{
          context.dispatch('mWarning',res)
        }
      }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  // 在分类下挂一个规格模板
  addProductSpecActions (context,data) {
    context.commit('SET_ADD_PRODUCT_SPEC',data)
    api.addguige(textCs+'/product/category/spec/addProductCategorySpec',qs.stringify(context.state.editor.addProductSpecMM)).then(
      res => {
        let datas={
          id:context.state.result.FlDataResult.obj.id
        }
        if(res.ok){
          context.dispatch('mSuccess')
          context.dispatch('getProductSpecsActions',datas)
        }else{
          context.dispatch('mWarning',res)
        }
      }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //在分类下的一个大规格下添加一个小规格
  addProductSpecDetailActions (context,data) {
    context.commit('SET_ADD_PRODUCT_SPEC_DETAIL',data)
    api.deletePpApi(textCs+'/product/category/spec/addProductCategorySpecDetail',qs.stringify(context.state.editor.addProductSpecDetailMM)).then(
      res => {
        if(res.ok){
          context.dispatch('mSuccess')
          context.dispatch('getProductSpecDetailsActions',data.specId)
        }else{
          context.dispatch('mWarning',res)
        }
      }).catch(
      (error) => {
        context.dispatch('mError')
      }
    )
  },
  //编辑一个规格的能编辑的基本信息
  updateCategorySpecActions (context,data) {
    context.commit('SET_ADD_PRODUCT_SPEC',data)//参数和挂一个规格模板参数一样
    context.dispatch('deleteFormPost',['/product/category/spec/updateProductCategorySpec','','addProductSpecMM'])
  },
  //获得一个分类型所有大规格
  getProductSpecsActions (context,data) {
    context.commit('SET_GET_PRODUCT_SPECS',data)
    context.dispatch('saveFormGet',['/product/category/spec/getProductCategorySpecs','GET_GET_PRODUCT_SPECS','getProductSpecsMM'])
  },
  //获得一个分类大规格下的 所有规格特征明细
  getProductSpecDetailsActions (context,id) {
    context.commit('SET_GET_PRODUCT_SPECDETAILS',id)
    context.dispatch('saveFormGet',['/product/category/spec/getProductCategorySpecDetails','GET_GET_PRODUCT_SPECDETAILS','getProductSpecDetailsMM'])
  },
  //创建一个商品分类的参数模板
  createFenLeiMoActions(context,data){
    context.commit('SET_CREATE_FENLEI_MO',data)
    context.dispatch('deleteFormPost',['/product/category/param/create','','createFenLeiMoMM'])
  },
  //删除一个商品分类的参数模板
  deleteFenLeiMoACtions(context,id){
    context.commit('SET_DELETE_FENLEI_MO',id)
    context.dispatch('deleteFormPost',['/product/category/param/post','','deleteFenLeiMoMM'])
  },
  //更新一个商品分类的参数模板
  updataFenLeiMoActions(context,data){
    context.commit('SET_UPDATA_FENLEI_MO',data)
    context.dispatch('deleteFormPost',['/product/category/param/update','','updataFenLeiMoMM'])
  },
  //获取一个分类下的 商品参数模板
  getParamsByCategoryIdActions(context,id){
    if(id){
      context.commit('SET_PARAMS_BY_CATEGORYID',id)
      context.dispatch('saveFormGet',['/product/category/param/getProductCategoryParamsByCategoryId','GET_PARAMS_BY_CATEGORYID','getParamsByCategoryIdMM'])
    }else{
      Message({
        showClose: true,
        message:'请输入分类ID',
        type: 'warning'
      });
    }
  },
  //城市选择请求
  getcityListActions(context,id){
    axios.get('http://jisuarea.market.alicloudapi.com/area/query',{
      params: {
        parentid:id
      },
      headers: {
        "Authorization":"APPCODE fb1ee2813e9b433db7ff440eb8620446"
      }
    }).then(res => {
      context.commit('GET_SMALL_CITYLIST',res)
    })
  },
  //县选择请求
  getxianActions(context,id){
    axios.get('http://jisuarea.market.alicloudapi.com/area/query',{//post请求时 是三个参数  第一个是url 第二个传参 第三个配置项
      params: {
        parentid:id
      },
      headers: {
        "Authorization":"APPCODE fb1ee2813e9b433db7ff440eb8620446"
      }
    }).then(res => {
      context.commit('GET_XIANJI_LIST',res)
    }).catch(err => {
      context.state.result.trueOrfalse=true
    })
  },
  //时间选择接受
  timerResultActions (context,data) {
    let start=new Date()
    if(data=='最近24小时内'){
      let time=[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24),start]
      context.commit('GET_VALUE_4',time)
    }
    if(data=='最近7天内'){
      let time=[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),start]
      context.commit('GET_VALUE_4',time)
    }
    if(data=='最近一个月' || data=='最近30天内'){
      let time=[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30),start]
      context.commit('GET_VALUE_4',time)
    }
    if(data=='最近两个月'){
      let time=[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 60),start]
      context.commit('GET_VALUE_4',time)
    }
    if(data=='最近三个月' || data=='三个月前'){
      let time=[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 90),start]
      context.commit('GET_VALUE_4',time)
    }
  },

}

export default actions
