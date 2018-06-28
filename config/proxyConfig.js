module.exports = {
  proxy: {
    '/apis': {  //将www.exaple.com印射为/apis
      target: 'http://test-admin-h5.olquan.cn',//'http://ol-h5-admin.olquan.cn/'/*'http://ol-admin.olquan.com/'*/, // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apis': ''  //需要rewrite的,
      }
    }
  }
}
