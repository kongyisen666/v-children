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
      this.errorMsg = this.getQuery().errorMsg
    },
    methods: {
      getQuery: function () {
        /* 获取当前路由栈数组 */
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        const options = currentPage.options
        return options
      },
      login () {
        wx.navigateTo({
          url: '/pages/login/main'
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
