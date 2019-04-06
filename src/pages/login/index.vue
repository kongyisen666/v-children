<template>
  <div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        url : ''
      }
    },
    created () {
      wx.showLoading({
        title: '加载中' // 数据请求前loading
      })
      var url ='http://127.0.0.1:8082/star-server/login/'
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code; //返回code
          wx.request({
            url:url,
            data: {code: code},
            header: {'content-type': 'json'},
            success: function (res) {
              var user = res.data.object.object;
              if(0==user.type){//0未激活
                wx.redirectTo({
                  url: '/pages/index/main'
                })
              }
              if(1==user.type){//1已激活
                wx.redirectTo({
                  url: '/pages/index/main'
                })
              }
            }
          })
        }
      })
    }
  }
</script>
