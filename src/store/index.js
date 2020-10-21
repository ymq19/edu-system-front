import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const state = {
  profileMsg: {},
  avatarUrl: '',
  loading: false,
  color: ''
}
const store = new Vuex.Store({
  state,
  // 计算属性
  getters: {

  },
  // 同步操作
  mutations: {
    profileMsg(state, payload) {
      localStorage.setItem('ProfileMsg', JSON.stringify(payload))
      state.profileMsg = payload
    },
    getAvatarUrl(state, payload) {
      localStorage.setItem('AvatarUrl', payload.url)
      state.avatarUrl = payload.url
    },
    setLoading(state, payload) {
      state.loading = payload.loading
    },
    systemColorChange(state, payload) {
      localStorage.setItem('SystemColor', payload.color)
      state.color = payload.color
    }
  },
  // 异步操作
  actions: {
    
  }
})
// 3.挂载到Vue实例上
export default store