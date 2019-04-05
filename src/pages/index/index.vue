<template>
  <div class="beijing">
    <div class="background-img">
      <image  class="img" src="/static/images/beijing.jpg"></image>
    </div>
    <div >
      <button class="button" @click="addChildren">添加孩子</button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url : ''
      }
  },methods: {
    addChildren () {
      wx.navigateTo({
        url: '/pages/user/main'　　// 页面 B
      })
    }
  }
}
</script>
<style scoped>
  .beijing{
    width: 100%;
    height: 100%;
    background-color:#A2DAD7;
    position: fixed;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 200px;
  }
  /* 背景图片 */
  .background-img{
    height: 150px;
    width: 100%;
    margin-top: 30%;
  }
  .img{
    width: 50%;
    height: 150px;
    margin-left: 25%
  }
  .button{
    width: 50%;
    margin-top: 50%;
  }
</style>
