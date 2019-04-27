<template>
  <div class="beijing">
    <div class="background-img">
      <image  class="img" src="/static/images/beijing.png"></image>
    </div>
    <div >
      <session v-if="user.type == 1">
        <div style="text-align: center;font-size: 1rem;color: red;margin-top: 20%">等待管理员确认信息</div>
        <button class="button" style="margin-top: 25%" @click="addChildren">修改信息</button>
      </session>
      <session v-else>
        <button class="button" @click="addChildren">添加孩子</button>
      </session>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url: '',
      user : wx.getStorageSync("user")
    }
  },
  methods: {
    addChildren () {
      wx.navigateTo({
        url: '/pages/user/main'
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
