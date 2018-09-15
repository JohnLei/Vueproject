import Axios from 'axios'
const baseURL = 'http://www.lovegf.cn:8888/api/private/v1/' // 配置baseURL
Axios.defaults.baseURL = baseURL
// axios进行拦截器
Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 获取token
  let token = localStorage.getItem('keytoken')
  // 设置请求头Authorization
  config.headers.common['Authorization'] = token

  return config
}, function (erro) {
  // Do something with request error
  return Promise.reject(erro)
})
// 导出登录验证checklogin方法
export const CheckLogin = params => Axios.post('login', params).then(res => res.data)
export const getUserList = params => Axios.get('users', params).then(res => res.data)
