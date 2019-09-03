import axios from 'axios'

// 创建个axios实例，设置不同的baseURL
const instance = axios.create({
  timeout: 1000,
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default instance
