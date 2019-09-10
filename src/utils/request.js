import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 创建个axios实例，设置不同的baseURL
const request = axios.create({
  timeout: 10000,
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 请求拦截
request.interceptors.request.use(function (config) {
  // console.log(config)
  if (store.state.user) {
    // 如果有登录状态请求时，自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
  // 判断是否有登录状态
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截
request.interceptors.response.use(function (response) {
  // Do something with response data
  // 接口返回的数据中都有data，在此处统一返回接口返回的data
  // 如果接口返回的数据中没有data，此时返回axios响应对象的data属性
  return response.data.data || response.data
}, async function (error) {
  // Do something with response error

  console.dir(error)

  if (error.response.status === 401) {
    // 如果是401，使用refresh_token
    const refreshToken = store.state.user.refresh_token

    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // console.log(response)
      // 新的2小时可用的token
      const token = response.data.data.token

      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      return request(error.config)
    } catch (err) {
      // 跳转到首页
      // 如果refresh_token过期，跳转到登录页面
      router.push('/login')
      console.log(err)
    }
  }
  return Promise.reject(error)
})
export default request
