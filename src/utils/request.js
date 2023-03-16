import axios from 'axios'
import store from '../store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (request) => {
    // do something before request is sent
    let qurl = request.url
    if (qurl.indexOf('userId=') === -1) {
      if (qurl.indexOf('?') === -1) {
        qurl += '?userId=' + 171
      } else {
        qurl += '&userId=' + 171
      }
    }
    // 街镇ID名称
    if (qurl.indexOf('precinctId=') === -1) {
      qurl += '&precinctId=' + store.getters.precinctId
    }
    if (qurl.indexOf('precinctName=') === -1) {
      qurl += '&precinctName=' + store.getters.precinctName
    }
    if (qurl.indexOf('precinctKind=') === -1) {
      qurl += '&precinctKind=' + store.getters.precinctKind
    }
    // 请求时间戳
    qurl += '&r=' + new Date().getTime()
    // 链接中是否携带token
    request.headers.common.Authorization = '12CBD9B708D887A41AFAB97DAC46AAC6'
    request.url = encodeURI(qurl)
    return request
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      // sessionStorage.clear();
      // window.location.href = '/'
    }
    // 对响应数据做处理
    return response
  },
  (error) => {
    // 对响应错误做处理
    if (error.response && error.response.status === 401) {
      // sessionStorage.clear();
      // window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default service
