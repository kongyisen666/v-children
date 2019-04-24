import Vue from 'vue'
import App from './App'
import URL from './utils/url'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
Vue.prototype.$url = URL.URL
Vue.prototype.$URL = URL

Vue.prototype.$urlData = function () {
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  return options
}

let urlPath = URL.URLCommonPrefix // 项目的域名
Vue.prototype.$post = function (url, data) { // post请求
  wx.showLoading({
    title: '努力加载中'
  })
  let header = {
    'content-type': 'application/json',
    'cookie': wx.getStorageSync("sessionid")
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: urlPath + url,
      data: data,
      method: 'post',
      header: header,
      success (res) {
        if (res.statusCode === 200) {
          if (res.data === 9999) { // 后端返回9999表示cookie失效
            wx.showModal({
              content: '登陆超时请重新登陆',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/login/main'
                  })
                }
              }
            })
          } else if (res.data.code && res.data.code !== 200) { // 若返回coode码且不等于200表示传入参数有问题
            res.message = res.data.message, reject(res)
          } else{
            resolve (res)
          }
        } else {
          res.message = '服务器错误请求失败'
          reject(res)
        }
        wx.hideLoading()
      }, fail (err) {
        err.message = '请求超时请稍后再试'
        reject(err)
        wx.hideLoading()
      }
    })
  })
}

Vue.prototype.$alert = function (title, fn) {
  wx.showModal({
    title: '提示',
    content: title.toString(),
    success (res) {
      if (fn != null) {
        fn()
      }
      if (res.confirm) {
        // console.log("用户点击确定");
      } else if (res.cancel) {
        //  console.log("用户点击取消");
      }
    }
  })
}

Vue.prototype.$alert = function (title, fn) {
  wx.showModal({
    title: '提示',
    showCancel: false,
    content: title.toString(),
    success (res) {
      if (fn != null) {
        fn()
      }
    }
  })
}

Vue.prototype.$getToday = function () {
    let myDate = new Date()
    let myMonth = myDate.getMonth() + 1
    if (myMonth < 10) {
      myMonth = '0' + myMonth
    }
    let mydate = myDate.getDate()
    if (myDate.getDate() < 10) {
      mydate = '0' + myDate.getDate()
    }
    let today = myDate.getFullYear() + '-' + myMonth + '-' + mydate
    return today
}

Vue.prototype.stringIsNull = function (text) {
    if (undefined == text) {
      return true;
    }
    if (text.length == "" || text.length == 0) {
      return true;
    }
    return false;
}

