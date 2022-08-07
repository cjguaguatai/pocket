/*
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-07-30 20:09:42
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:11:13
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 判断token是否过期
function isTimeOut () {
  const currentTime = Date.now()
  const timeOut = 2 * 60 * 60 * 1000
  const tokenTime = getTokenTime()
  return currentTime - tokenTime > timeOut
}

// 请求拦截器  config 当前请求的配置
service.interceptors.request.use(async config => {
  // 在这个位置需要统一的去注入token
  const token = store.state.user.token.token
  if (token) {

    // token 过期 跳会login
    if (isTimeOut()) {

      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登陆过期'))
    } else {
    // 如果token存在 注入token
    config.headers['Authorization'] = `${token}`
    }

  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((res) => {
  // console.log(res);
  if (res.config.url === '/api/user-service/user/login') {
    const { success, msg, token } = res.data
    if (success) return res.data
    store.dispatch('settings/changeLoading', false)
    Message(msg)
    return Promise.reject(new Error(msg))
  }

  return res.data

}, async function (err) {

  if (err?.response?.status === 401) {
    await store.dispatch('user/logout')
    router.push('/login')
    Message.error('登陆过期')
  } else {
    // console.log(222);
    Message.error(err.message)
    return Promise.reject(err)
  }

})
export default service
