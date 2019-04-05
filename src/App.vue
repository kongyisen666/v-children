<script>
  var url = 'http://127.0.0.1:8082/star-server/login/'
export default {
  created () {
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
  },
}
</script>
