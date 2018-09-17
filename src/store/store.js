import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 安装vuex
Vue.use(Vuex)
const state = {
  // 定义仓库数据
  username: ''
}
const mutations = {
  // 获取数据
  setUsername: (state, username) => {
    state.username = username
    // 存储 username
    localStorage.setItem('username', username)
  }
}
const actions = {}
const getters = {
  username: (state) => {
    // 重新获取localStorage中的值
    return state.username
  }
}
// 导出store
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
