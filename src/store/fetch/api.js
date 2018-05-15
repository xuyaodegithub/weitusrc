//created by Yan on 17/11/9
import axios from 'axios'
axios.defaults.timeout = 10000;//10秒还未得到请求答复，就报超时错误
/*axios.interceptors.request.use(function (config) {
  在发送请求之前做些什么
   axios.defaults.baseURL = 'http://test-admin.olquan.cn';
  console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});*/
//axios.defaults.baseURL = 'http://test-admin.olquan.cn';//设置全局请求域名  ，此处设置会直接加在接口前面
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;//全局设置请求头
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//全局设置请求头
//axios.defaults.baseURL= 'https://some-domain.com/api/';// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  }).catch((error) => {

  })
}


//各个功能对应接口
export default {
  //删除api
  deletePpApi(url,params){
    return fetch(url, params)
  },
  //新增规格
  addguige(url,params){
    return fetch(url,params)
  },
//详情页接口
  detialApi(url,params) {
    let urls = 'http://134.96.161.143:9301'+url;
    return fetch(urls, params)
  }
}
