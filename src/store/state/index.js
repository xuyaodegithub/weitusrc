/**
 * Created by Yan on 17/11/9.
 */
const  editor = {//定义入参
  //域名
  axiosUrl:'http://test-admin-h5.olquan.cn',//测试
  //axiosUrl:'/apis',//'http://ol-h5-admin.olquan.cn',//正式
  //品牌管理、根据id获取
  getByIdMM:{
    id:null
  },
  //新增品牌
  newPushMM:{
    name:"",
    logo:'',
    enName:'',
    desc:'',
    country:''
  },
  //删除品牌
  deletePpMM:{
    id:''
  },
  //修改品牌
  upDataPpMM:{
    country:'',
    desc:'',
    enName:'',
    id:'',
    logo:'',
    name:'',
  },
  //检测品牌名
  checkPpMM:{
    name:''
  },

  //获取该分类关联的品牌
  getCategoryBrandsMM:{
    categoryId:''
  },
  //分类、id获取单个分类详情
  ByIdGetTreeMM:{
    id:''
  },
  //删除分类
  deleteClassTreeMM:{
    id:''
  },
  //新增分类
  pushClassTreeMM:{
    //children:'',
    // fullIdPath:'',
    // fullNamePath:'',
    image:'',
    leaf:'',
    level:'',
    logo:'',
    name:'',
    // parentId:'',
    sort:'',
    // status:''
  },
  //修改分类
  updataClassTreeMM:{
    id:'',
    image:'',
    leaf:'',
    level:'',
    logo:'',
    name:'',
    sort:''
  },
  //检测分类名称是否存在
  checkClassTreeMM:{
    id:'',
    name:''
  },
  //标签管理、删除标签
  deleteTagMM:{
    id:''
  },
  //新增标签
  pushNewTagMM:{
    desc:'',
    logo:'',
    name:'',
    sort:'',
    type:'',
  },
  //根据id获取标签
  getTagByIdMM:{
    id:''
  },

  //产品分类规格
  //修改一个小规格明细
  updateProductMM:{
    id:'',
    logo: '',
    name: '',
    specId: ''
  },
  //修改一个大规格明细
  updateProductSpecMM:{
    //categoryId:'',
    id:'',
    name:'',
    showLogo:'',
    leading:''
  },
  //删除分类下的一个商品规格模板
  deleteProductMM:{
    id:''
  },
  // 删除大规格模板下的一个小规格
  /* deleteSpecDetailMM:{
    id:''
  }, */
  // 在分类下挂一个规格模板
  addProductSpecMM:{
    categoryId: '',
    leading: '',
    name: '',
    showLogo: ''
  },
  //在分类下的一个大规格下添加一个小规格
  addProductSpecDetailMM:{
    // productCategorySpecDetailVO: '',
    logo: '',
    name: '',
    specId: ''
  },
  //获得一个分类型所有大规格
  getProductSpecsMM: {
    categoryId:'',
    needDetails:''
  },
  //获得一个分类大规格下的 所有规格特征明细
  getProductSpecDetailsMM:{
    specId:''
  },
  //商品分类参数
  //创建一个商品分类的参数模板
  createFenLeiMoMM:{
    categoryId:'',
    name:''
  },
  //删除一个商品分类的参数模板
  deleteFenLeiMoMM:{
    id:''
  },
  //更新一个商品分类的参数模板
  updataFenLeiMoMM:{
    id:'',
    name:''
  },
  //获取一个分类下的 商品参数模板
  getParamsByCategoryIdMM:{
    categoryId:'',
  },
  //获取活动列表
  listActiveMM : {
    page:'',
    rows:''
  },
  //添加活动
  insertActiveMM : {
    code:'',
    endTime:'',
    memo:'',
    name:'',
    shareImg:'',
    shareTitle:'',
    startTime:'',
    type:'',
    start:''
  },
  //编辑活动
  updateActiveMM:{
    id:'',
    code:'',
    endTime:'',
    memo:'',
    name:'',
    shareImg:'',
    shareTitle:'',
    startTime:'',
    type:'',
    start:''
  },
  //跟活动ID 删除活动
  deleteActiveMM: {
    id:''
  },
//根据id获取活动信息
  getByIdActiveMM:{
    id:''
  },
  //上传活动数据到OSS
  uploadDataToOSSMM:{
    data:'',
    id:''
  },
  //获取商品列表
  getDataListMM:{
    filter_S_productName:'',
    page:'',
    rows:'',
    filter_I_sellerId:''
  },
  //获取拼团商品列表/获取专享产品列表
  productlistMM: {
    filter_I_isRecommend:'',
    filter_S_productName_contains:'',
    filter_I_isStick:'',
    page:'',
    rows:'',
    sortField:'',
    filter_I_sellerId:'',
    filter_I_status:'',
    sortOrder:'',
    startTime:''
  },
  //获取更多试用商品列表
  freeUseListMM: {
    filter_S_productName_contains:'',
    page:'',
    rows:'',
    sortField:'',
    sortOrder:''
  },
  //获取积分试用产品列表
  scoreBuyListMM: {
    filter_I_status:'',
    filter_S_productName_contains:'',
    page:'',
    rows:'',
    sortField:''
  },

//优惠券
  //优惠券列表//优惠券活动列表
  CouponLsitMM : {
    filter_I_isAudit:'',
    page:'',
    rows:''
  },
  CouponwithLsitMM : {
    conponActivityId:'',
    filter_S_title_contains:'',
    limitLevels:'',
    page:'',
    rows:'',
    filter_I_isAudit:'',
    filter_I_isPublic:''
  },
  //创建优惠券
  createCouponMM:{
    validPeriodDays:'',validType:'',endTime:'', expireRemind:'',limitLevel:'', limitReceived:'', num:'', price:'', startTime:'',title:'',type:'',productIds:'',isAudit:'',togetherProductIds:'',productType:'',isPublic:''
  },
  //修改优惠券
  upDataCouponMM:{
    validType:'',validPeriodDays:'',id:'', num:'',title:'',endTime:'', startTime:'', expireRemind:'',limitLevel:'', limitReceived:'', price:'',type:'',productIds:'',togetherProductIds:'',productType:'',isPublic:''
  },
  //删除优惠券
  deleteCouponMM:{
    id:''
  },
  //审核优惠券
  doAuditCouponMM:{
    ids:'',
    limitLevel:'',
    expireNotifyDay:''
  },
  //优惠券活动列表
  CouponActiveListMM:{
    page:'',rows:'',filter_S_name:'',filter_I_isPublic:''
  },
  //创建优惠券活动
  saveCouponActiveMM: {
    mainImg:'', name:'', shareDescription:'',shareIcon:'',shareTitle:'',isEnable:'',isPublic:''
  },
  //修改优惠券活动
  updataCouponActiveMM: {
    mainImg:'', name:'', shareDescription:'',shareIcon:'',shareTitle:'',isEnable:'',id:'',isPublic:''
  },
//删除优惠券活动
  deleteCouponActiveMM: {
    id:''
  },
  //优惠券活动关联优惠券
  ActivelinkCouponMM:{
    activityId:'',
    couponIds:''
  },
  //供应商优惠券列表
  StoreYHQListMM:{
    filter_S_title:'', limitLevels:'', page:'', rows:'', sellerId:'',filter_I_isAudit:'',filter_I_isPublic:''
  },
  //供应商创建优惠券
  StoreCreteYHQMM:{
    validType:'',validPeriodDays:'',endTime:'',limitReceived:'',num:'',price:'',productIds:'',togetherProductIds:'',productType:'',sellerId:'',startTime:'',title:'',type:'',id:'',isPublic:''
  },
  //供应商删除优惠券
  StoreDeleteYHQMM:{
    id:'', sellerId:''
  },
////////////////////优惠券统计
  couponoCuntMM:{
    filter_S_title:'', page:'', rows:''
  },
  changelinkCouponMM:{
    activityId:'',couponId:''
  },

};

const result = { //接收请求后的数据
  //城市列表
  smallCityList:[],
  //县级列表
  xianjiList:[],
  //是否禁用
  trueOrfalse:false,
  //弹框属性
  popoverAlive: {
    openOrClose: false,
    title: '',
    SSSnum:''
  },
  //id品牌
  getByIdResult: {},
  //all品牌
  getAllPpResult:[],
  //新增品牌
  newPushResult:null,
//删除品牌
  deletePpResult:'',
  //修改品牌
  upDataPpResult:{
    obj:{},
    num:''
  },
  //检测品牌
  checkPpResult:'',

  //整个分类树
  getAllTreeResult:[],
  //id单个分类详情
  ByIdGetTreeResult:{},
  //新增分类
  pushClassTreeResult:'',
  //分类关联品牌
  getCategoryBrandsResult:'',

  //获取所有标签
  getAllTagResult:'',
  //新增标签
  pushNewTagResult:'',
  //根据id获取标签
  getTagByIdResult:'',
  //获得一个分类型所有大规格
  getProductSpecsResult:[],
  //获得一个分类大规格下的 所有规格特征明细
  getProductSpecDetailsResult: [],
  //获取一个分类下的 商品参数模板
  getParamsByCategoryIdResult:'',
  //品牌模块切换
  classResult:'VpinpaiList',
  //分类模块切换
  fenleiCalssResult:'VfenleiList',
  //分类切换接受
  FlDataResult:{
    obj:{},
    num:''
  },
  //新增商品切换
  goodsResult:'vCompile',
  Gdresult:{
    obj:{},
    num:''
  },
  //时间选择器快捷键
  pickerOptions2: {
    shortcuts: [
      {
        text: '今天',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          picker.$emit('pick',[start, end]);
        }
      }, {
        text: '一天前',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
  },
  //接受时间
  value4Result:'',
  //大规格编辑
  smallguige:'',
  //小规格编辑
  updataSmall:{},
  //loading
  loading:false,
  //活动管理切换
  activeChange:{
    obj:{},
    item:'vSeachActive'
  },
  //活动组件编辑接受
  commodityResult:{},
  //组件添加
  addCommodityResult:[],
  //背景设置
  backColorResult:{},
  //获取活动列表
  listActiveResult:[],
  //添加活动
  insertActiveResult:'',
  /* //编辑活动
   updateActiveResult:'',*/
  //根据id获取活动信息
  getByIdActiveResult:{},
  addDataNum:0,
  //产品列表
  getDataListResulr:[],
  //分类下产品列表接受
  classDataListResult:[],
  //获取拼团商品列表
  productlistResult:[],
  //获取更多试用商品列表
  freeUseListResult:[],
  //获取积分试用产品列表
  scoreBuyListResult:[],
  //radios
  radiosResult:'普通商品',
  //miaoPTOrPT
  pintuanResult:'',
  //活动id
  activeId:'',
  //ImgnumKey
  ImgnumKey:0,
  ImgUrlResult:'',


//优惠券
  //专享产品list
  plusProductListResult:[],
  //优惠券活动
  YHQwhichResult:{title:'VseachCouponActive',item:''},
//优惠券
  YHQonlyResult:{title:'VseachCoupon',item:'',Which:''},
//供应商优惠券
  StoreYHQResult:{title:'VseachStoreCoupon',item:'',trueOrfalse:false},
  //获取优惠券列表
  CouponListResult:[],
  //优惠券活动列表
  CouponActiveListResult:[],
  //优惠券关联商品集合
  CouponWithGoodsResult:{
    productType:'',
    togetherProductIds:'',
    productIds:'',
    price:'',
    productName:'',
    costPriceView:'',
    salePriceView:'',
    marketPriceView:'',
    image:''
  },
//供应商优惠券列表
  StoreYHQListResult:[],
//搜索栏
  SeachWhiche:'',
  SeachWhiche2:'',
  /////////////////////////////////供应商id
  sellID:'',
//供应商统计
  couponoCuntResult:[],


  loginResult:[],
  iframeSrc:{
    title:'',
    status:false
  }
}

const state = {
  editor,
  result
}
export default state
