import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '../router'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
      
    }
  })
  // axios拦截器
  instance.interceptors.request.use(config => {
    store.commit('setLoading',{loading:true})
    // 配置config
    if(localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    
    return config
  }, err => {
    console.log(err)
  })
  instance.interceptors.response.use(res => {
    if(res.data.status === 10010 && localStorage.getItem('Authorization')) {
      store.commit('systemColorChange', {color: '#B3C0D1'})
      localStorage.clear()
      Message.error('账户过期，请重新登录')
      router.replace({
        path: '/login'
      })
    }
    store.commit('setLoading',{loading:false})
    return res
  }, err => {
    console.log(err)
  })
  // 发送真正的网络请求
  return instance(config)
}