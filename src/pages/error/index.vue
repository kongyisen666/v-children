<template>
  <div class="beijing">
    <div style="color: red;text-align: center;margin-top: 40%">{{errorMsg}}</div>
    <div style="text-align: center;margin-top: 10%" @click="login">重新尝试登陆</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        errorMsg: ''
      }
    },
    onLoad () {
      this.errorMsg = this.$urlData().errorMsg
    },
    methods: {
      login () {
        wx.showLoading({
          title: '加载中' // 数据请求前loading
        })
        var url = this.$URL.URLCommonPrefix + this.$url.login_get_user
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
                  this.errorMsg = '服务器错误请求失败'
                  wx.hideLoading()
                }
              }, fail (err) {
                wx.hideLoading()
              }
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .beijing {
    width: 100%;
    height: 100%;
    background-color: #A2DAD7;
    position: fixed;
  }
</style>
