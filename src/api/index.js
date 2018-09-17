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
// 获取用户列表的方法
export const getUserList = params => Axios.get('users', params).then(res => res.data)
// 修改用户状态
export const changeUserState = params => Axios.put(`users/${params.uId}/state/${params.type}`).then(res => res.data)
// 添加用户
export const addUser = params => Axios.post('users', params).then(res => res.data)
// 根据ID查询用户信息
export const getUserById = params => Axios.get(`users/${params}`).then(res => res.data)
// 提交用户编辑
export const editUser = params => Axios.put(`users/${params.id}`, params).then(res => res.data)
// 删除用户数据
export const delUser = params => Axios.delete(`users/${params}`).then(res => res.data)
