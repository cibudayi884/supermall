import axios from "axios";

//1.简化封装，在调用instance(config)的时候返回的本身就是Promise
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
    // headers:{}可以在这样添加header，也可以在拦截后给config重新配置header
  })

   //2.1请求拦截
 /*  instance.interceptors.request.use(config=>{
     return config;  //这里把config拦截掉了，必须返回config
   },err=>{
     //console.log(err)
   })*/
  //2.2 响应拦截
  instance.interceptors.response.use(res=>{
    //console.log(res);
    return res.data
  },err=>{
    console.log(err)
  })

  //3.发送真正的网络请求
  return instance(config)
}
