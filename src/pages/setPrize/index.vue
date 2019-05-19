<template>
  <van-cell-group>

    <van-field
      v-model="prize.prize1"
      required
      clearable
      label="奖品-1"
      right-icon="question-o"
      @change="setPrize1"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize2"
      required
      clearable
      label="奖品-2"
      right-icon="question-o"
      @change="setPrize2"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize3"
      required
      clearable
      label="奖品-3"
      right-icon="question-o"
      @change="setPrize3"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize4"
      required
      clearable
      label="奖品-4"
      right-icon="question-o"
      @change="setPrize4"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize5"
      required
      clearable
      label="奖品-5"
      right-icon="question-o"
      @change="setPrize5"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize6"
      required
      clearable
      label="奖品-6"
      right-icon="question-o"
      @change="setPrize6"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize7"
      required
      clearable
      label="奖品-7"
      right-icon="question-o"
      @change="setPrize7"
      placeholder="请输入奖品"
    />

    <van-field
      v-model="prize.prize8"
      required
      clearable
      label="奖品-8"
      right-icon="question-o"
      @change="setPrize8"
      placeholder="请输入奖品"
    />

    <button class="button-color" @click="submit">提交</button>
  </van-cell-group>
</template>

<script>
  var prize = {
    userId:'',
    prize1: '',
    prize2: '',
    prize3: '',
    prize4: '',
    prize5: '',
    prize6: '',
    prize7: '',
    prize8: ''
  }
  export default {
    data() {
      return {
        prize: prize,
        user: wx.getStorageSync("user")
      }
    },
    onLoad(){
      this.getPrize()
    },
    methods: {
      submit() {
        this.prize.userId = this.user.id;
        this.$post(this.$url.prize_set_prize, this.prize).then(res => {
          if (res.data.success) {
            wx.showModal({
              title: '设置完成',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      getPrize() {
        this.$post(this.$url.prize_search, {userId: this.user.id}).then(res => {
          if (res.data.success) {
            this.prize = res.data.object.object
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      setPrize1 (event) {
        this.prize.prize1 = event.mp.detail
      },
      setPrize2 (event) {
        this.prize.prize2 = event.mp.detail
      },
      setPrize3 (event) {
        this.prize.prize3 = event.mp.detail
      },
      setPrize4 (event) {
        this.prize.prize4 = event.mp.detail
      },
      setPrize5 (event) {
        this.prize.prize5 = event.mp.detail
      },
      setPrize6 (event) {
        this.prize.prize6 = event.mp.detail
      },
      setPrize7 (event) {
        this.prize.prize7 = event.mp.detail
      },
      setPrize8 (event) {
        this.prize.prize8 = event.mp.detail
      },
    }
  }
</script>
<style>
 .button-color{
   background-color: #07C160;
 }

</style>
