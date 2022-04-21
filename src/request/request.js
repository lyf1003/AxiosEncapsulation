import axios from "axios"
const model = axios.create({
    baseURL:"https://jkppadmin.yinkangyiyao.com",//域名配置
    timeout:2000,//超时时间
    headers:{   //请求头配置

    },
})
console.log(model)
// 添加请求拦截器
model.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("请求拦截器开始")
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log("请求拦截器发生错误")
    return Promise.reject(error);
  });

// 添加响应拦截器
model.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("响应拦截器开始")
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log("响应拦截器开始")
    return Promise.reject(error);
  });



export default model