module.exports = {
  proxy: {
    '/apis': {  //将www.exaple.com印射为/apis
      target: 'http://106.15.49.17:8888/', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apis': ''  //需要rewrite的,
      }
    }
  }
}
