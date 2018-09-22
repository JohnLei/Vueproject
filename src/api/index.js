import Axios from 'axios'
import router from '@/router/index'
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
// token失效的时候响应拦截
Axios.interceptors.response.use(function (response) {
  if (response.data.meta.status === 400) {
    router.push('/login')
  }
  // console.log(response)
  return response
}, function (erro) {
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
// 获取权限列表
export const getRoleList = params => Axios.get('roles').then(res => res.data)
// 分配权限
export const grantUserrole = params => Axios.put(`users/${params.id}/role`, {id: params.id, rid: params.rid}).then(res => res.data)
// 获取权限名称列表
export const getRightList = params => Axios.get(`rights/${params.type}`).then(res => res.data)
// 添加角色
export const AddRoles = params => Axios.post('roles', params).then(res => res.data)
// 根据id来查询角色信息
export const getRolesById = params => Axios.get(`roles/${params}`).then(res => res.data)
// 编辑角色信息
export const Editrole = params => Axios.put(`roles/${params.id}`, params).then(res => res.data)
// 删除角色
export const delRoles = params => Axios.delete(`roles/${params}`).then(res => res.data)
// 删除角色指定权限
export const deleteRolesRight = params => Axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
// 角色授权
export const grantRoles = (roleId, rids) => Axios.post(`roles/${roleId}/rights`, rids).then(res => res.data)
// 获取左侧侧边栏菜单权限
export const getMenus = () => Axios.get('menus').then(res => res.data)
// 商品数据分类列表
export const getCategory = params => Axios.get('categories', {params: params}).then(res => res.data)
// 添加分类
export const addCategory = params => Axios.post('categories', params).then(res => res.data)
