import axios from 'axios'
import { encrypt, decrypt } from '@/apis/encryption'
// 设置axios请求头加入token
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    // config.headers.Authorization = sessionStorage.getItem('token')
    // config.headers.Authorization = decrypt(sessionStorage.getItem('token'))
    config.headers.Authorization = sessionStorage.getItem('token')
  }
  return config
},
error => {
  return Promise.reject(error)
})

// 响应回来token是否过期
axios.interceptors.response.use(response => {
  // 和后端token失效返回码约定403
  if (response.data.data === 'Not Login! Login First!') {
    // 引用elementui message提示框
    ElementUI.Message({
      message: '身份已失效',
      type: 'err'
    })
    sessionStorage.removeItem('token')
    this.$router.push('/')
  } else {
    return response
  }
},
error => {
  return Promise.reject(error)
})

// 创建axios的一个实例
var instance = axios.create({
  // baseURL = '',
  timeout: 6000
})
// instance.defaults.baseURL="http://127.0.0.1:8080/api"
// instance.defAaults.baseURL="/api"
instance.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    // config.headers.Authorization = sessionStorage.getItem('token')
    config.headers.Authorization = decrypt(sessionStorage.getItem('token'))
  }
  return config
},
error => {
  return Promise.reject(error)
})
instance.interceptors.response.use(response => {
  if (response.data.data === 'Not Login! Login First!') {
    ElementUI.Message({
      message: '身份已失效',
      type: 'err'
    })
    sessionStorage.removeItem('token')
    this.$router.push('/')
  } else {
    return response
  }
},
error => {
  return Promise.reject(error)
})
export default function (method, url, data = null) {
  method = method.toLowerCase()
  if (method == 'post') {
    return instance.post(url, data)
  } else if (method == 'get') {
    return instance.get(url, { params: data })
  } else if (method == 'delete') {
    return instance.delete(url, { params: data })
  } else if (method == 'put') {
    return instance.put(url, data)
  } else {
    console.error('未知的method' + method)
    return false
  }
}
