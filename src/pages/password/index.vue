<template>
  <div class=".beijing">
    <div class="background-img">
      <image  class="img" src="/static/images/beijing.png"></image>
    </div>
     <view class='content'>
      <span v-for="item in length ">
       <input class='iptbox' :value="value.length>=item+1?value[item]:''" disabled :password='ispassword' @click='Tap'/>
      </span>
     </view>

     <input class="ipt" v-on:input="setPassword"  type="digit" :focus="isFocus" :maxlength="length" />

     <view>
      <button class="btn-area" @click="submit">登陆</button>
     </view>
  </div>
</template>
<script >
  export default {
    data() {
      return {
        user : wx.getStorageSync("user"),
        length:4,    //输入框个数
        isFocus:false,  //聚焦
        value:"",    //输入的内容
        ispassword:true, //是否密文显示 true为密文， false为明文。
      }
    },
    onLoad(){
      this.Tap()
    },
    methods: {
      setPassword(event){
        this.value = event.mp.detail.value
      },
      Tap(){
        this.isFocus = false
        this.isFocus = true
      },
      submit(){
        this.$post(this.$url.login_home, {password:this.value}).then(res => {
          if(res.data.success){
            var user = wx.getStorageSync("user")
            console.log(user)
            if (user.role == 1) {
              wx.redirectTo({
                url: '/pages/userList/main'
              })
              return
            }
            wx.redirectTo({
              url: '/pages/home/main'
            })
          }else{
            this.$alert(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style>
  /* 背景图片 */
  .background-img{
    height: 150px;
    width: 100%;
    margin-top: 30%;
  }
  .img{
    width: 50%;
    height: 100%;
    margin-left: 25%
  }
  .content{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20%;
  }
  .iptbox{
    width: 100rpx;
    height: 100rpx;
    border:2rpx solid #ddd;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: white;
  }
  .ipt{
    width: 0 !important;
    height: 0 !important;
  }
  .btn-area {
    width: 80%;
    background-color: orange;
    margin-top: 15%;
    color: white;
  }
  .beijing{
    width: 100%;
    height: 100%;
    background-color:#A2DAD7;
    position: fixed;
  }
</style>
<style scoped>
</style>
