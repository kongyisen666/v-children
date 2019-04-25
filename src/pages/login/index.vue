<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: ''
      }
    },
    onLoad: function () {
      wx.showLoading({
        title: '加载中' // 数据请求前loading
      })
      var url = 'https://yisenhost.cn/star-server/login/get_user'
      wx.login({// 获取code
        success: function (res) {
          var code = res.code // 返回code
          wx.request({
            url: url,
            data: {code: code},
            header: {'content-type': 'json'},
            success: function (res) {
              if (res.statusCode === 200) {
                var user = res.data.object.object
                wx.setStorageSync('sessionid', res.header['Set-Cookie'])
                wx.setStorageSync('user', res.data.object.object)
                if (user.state == 1 && user.type == 1) {
                  wx.redirectTo({
                    url: '/pages/password/main'
                  })
                  return
                }
                wx.redirectTo({
                  url: '/pages/index/main'
                })
              } else {
                res.message = '服务器错误请求失败'
                wx.redirectTo({
                  url: '/pages/error/main?errorMsg=' + res.message
                })
              }
            }, fail(err) {
              err.message = '请求超时请稍后再试'
              wx.redirectTo({
                url: '/pages/error/main?errorMsg=' + err.message
              })
            }
          })
        }
      })
    }
  }
</script>
