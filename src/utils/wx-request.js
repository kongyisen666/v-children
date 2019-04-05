
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
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        wx.request({
          url: url,
          data: {code:code},
          header: {'content-type':'json'},
          success: function (res) {
            wx.redirectTo({
              url: '/pages/index/main'
            })
          }
        })
      }
    })
  })
}
