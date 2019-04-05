
function get (url,data) {
  return request(url, 'GET',data)
}

function post (url,data) {
  return request(url, 'POST',data)
}

export default {
  request,
  get,
  post
}

// http请求
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      headers: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
