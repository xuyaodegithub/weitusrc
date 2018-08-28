import axios from 'axios';
import qs from 'qs'
// axios.defaults.timeout=10000;//设置请求时间，超过时间报超时错位
// axios.defaults.headers={'X-Custom-Header': 'foobar'}//全局设置请求头
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';//全局设置请求头//表示跨域请求时是否需要使用凭证默认false
// axios.defaults.baseURL='http://test-admin-h5.olquan.cn'//设置域名
// axios.defaults.withCredentials=true//表示跨域请求时是否需要使用凭证,默认false，一般请求携带cookie是设置为true
// var instance  =axios.interceptors.request.use(function () {//设置请求拦截器
//
// })
var instance  =axios.create();//自定义axios对象
var beforask= instance.interceptors.request.use(function (config) {//为自定义axios设置请求拦截器
  // 在发送请求之前做些什么config是axios请求实例 里面包含axios各种配置项和相关属性信息
  console.log(config.data)
  config.data='page=2&rows=30'
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
var afterask= instance.interceptors.response.use(function (response) {//为自定义axios设置响应拦截器
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
// instance.interceptors.request.eject(beforask);//移除请求拦截器方法
// instance.interceptors.response.eject(afterask);//移除响应拦截器方法

function askPost(furlArr){//封装自定义axios请求方法
  instance({
    method:'post',
    url:'http://test-admin-h5.olquan.cn'+furlArr[0],
    dataType:'JSON',
    data:qs.stringify(furlArr[1])
  }).then(res => {

  }).catch(error => {

  })
}


export default askPost
