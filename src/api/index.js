import Axios from 'axios'
const baseURL = 'http://www.lovegf.cn:8888/api/private/v1/' // 配置baseURL
Axios.defaults.baseURL = baseURL
// 导出登录验证checklogin方法
export const CheckLogin = params => Axios.post('login', params).then(res => res.data)
