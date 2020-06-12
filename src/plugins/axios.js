// import Vue from 'vue'

// //引入axios
// import axios from 'axios'
// //配置axios拦截器
// let instance = axios.create({
//   headers: {
//     'content-type': 'application/json;charset=UTF-8'
//   }
// })
// //请求拦截器
// instance.interceptors.request.use(
//   config=>{
//     config = config || {}
//     // let token=localStorage.getItem('token')
// 		let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDI4ODBhYzcyMzRjY2NkMDE3MjM0ZGYzMTcwMDAyYSJ9.ha_86lMqcLBv3HciEwV_XJMiwOghKKvcrWZ2kwJl2vk"
//     console.log(token)
//     if(token){
//       //每次请求前，如果token存在则在请求头上添加token
//       config.headers.token=token
//       config.headers.Authorization=token
//     }
//     return config
//   },
//   err=>{
//     return Promise.reject(err)
//   }
// )
// //响应拦截器
// instance.interceptors.response.use(
//   response=>{
//     return response.data
//   },
//   err=>{
//     if(err.response.status == 401){
//       //说明没有权限，需要进行登陆操作
//       console.log('没有权限！')
//       console.log(parent)
//       window.parent.postMessage('401','*');
//     }
//     return Promise.reject(err)
//   }
// )

// return

// // Vue.prototype.$http = instance
import Vue from 'vue'

//引入axios
import axios from 'axios';
import { Message,Loading } from 'element-ui';
import _ from 'lodash';

//loading对象
let loading;
  
//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: "Loading...",
      background: 'rgba(255, 255, 255, 0.5)',
      target: target || "body" 
    });
  }
  needLoadingRequestCount++;
}


//隐藏loading
function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
  if (needLoadingRequestCount === 0) {
    //关闭loading
    toHideLoading();
  }
}


//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(()=>{
  try{
    loading.close();
    loading = null;
  }catch(error){
  }
}, 300);


//配置axios拦截器
let instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    // 'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDI4ODBhYzcyMzRjY2NkMDE3MjM0ZGYzMTcwMDAyYSJ9.ha_86lMqcLBv3HciEwV_XJMiwOghKKvcrWZ2kwJl2vk"
  }
})
//请求拦截器
instance.interceptors.request.use(
  
  config=>{
    config = config || {}
    let token=localStorage.getItem('token')
    if(token){
      //每次请求前，如果token存在则在请求头上添加token
      config.headers.token=token
      config.headers.Authorization=token
    }
    if(config.headers.showLoading !== false){
     
           showLoading(config.headers.loadingTarget);
     
     
    }
    return config;
  },
  err=>{
    if(config.headers.showLoading !== false){
      hideLoading();
    }
    Message.error('请求超时!');
    return Promise.resolve(err);
    // return Promise.reject(err)
  }

)
//响应拦截器
instance.interceptors.response.use(
  response=>{
     //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if(response.config.headers.showLoading !== false){
      
      toHideLoading();
     
    }
    return response.data
  },
  err=>{
    if(error.config.headers.showLoading !== false){
      hideLoading();
    }
    if(err.response.status == 401){
      //说明没有权限，需要进行登陆操作
      console.log('没有权限！')
      console.log(parent)
      window.parent.postMessage('401','*');
      return Promise.reject(err)
    }
    if(error.response && error.response.data && error.response.data.message) {
      var jsonObj = JSON.parse(error.response.data.message);
      Message.error(jsonObj.message);
       return Promise.reject(error);
    }else{
      Message.error(error.message);
      return Promise.reject(error);
    }
   
    
  } 
)

Vue.prototype.$http = instance