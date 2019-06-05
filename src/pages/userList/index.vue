<template>
  <div class="beijing">
    <van-action-sheet
      :model="show"
      :actions="actions"
      @close="onClose"
      @select="onSelect"
    />
    <div v-for="(item,index) in users">
      <div v-if="item.state == active || item.state == active1"  style="text-align: center;margin-top: 3%">
        <van-row gutter="20">
          <van-col span="8">{{item.childrenList[0].name}}</van-col>
          <van-col span="8">{{item.childrenList[0].score}}</van-col>
          <van-col span="8"><van-switch size="25px" :checked="item.state==1?true:false" @change="onChange(item)" /></van-col>
        </van-row>
      </div>
    </div>
    <div style="height: 11vw;"></div>
    <div style="position:fixed;bottom:0;width: 100%;z-index: 1">
      <button class="butten" :style="{'background-color':button1_color}" type="default" @click="activeType(1)">全部
      </button>
      <button class="butten" :style="{'background-color':button2_color}" type="default" @click="activeType(2)">未激活
      </button>
      <button class="butten" :style="{'background-color':button3_color}" type="default" @click="activeType(3)">已激活
      </button>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        users: {},
        checked: true,
        active: 0,
        active1: 1,
        button1_color: '#1989fa',
        button2_color: '#fff',
        button3_color: '#fff',
        button_color1: '#1989fa',
        button_color2: '#fff',
        enablePullDownRefresh:true
      }
    },
    onLoad () {
      this.selectList()
    },
    methods: {
      selectList () {
        this.$post(this.$url.user_list, {}).then(res => {
          if (res.data.success) {
            this.users = res.data.object.object
          }
        })
      },
      onChange (user) {
        var state = 0
        if (user.state == 0) {
          state = 1
        } else {
          state = 0
        }
        this.$post(this.$url.user_activation, {userId: user.id, state: state}).then(res => {
          if (res.data.success) {
            user.state = state
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      onClose () {
        this.setData({show: false})
      },
      activeType (buttenNum) {
        if (buttenNum === 1) {
          this.active = 0
          this.active1 = 1
          this.button1_color = this.button_color1
          this.button2_color = this.button_color2
          this.button3_color = this.button_color2
        }
        if (buttenNum === 2) {
          this.active = 0
          this.active1 = 0
          this.button1_color = this.button_color2
          this.button2_color = this.button_color1
          this.button3_color = this.button_color2
        }
        if (buttenNum === 3) {
          this.active = 1
          this.active1 = 1
          this.button1_color = this.button_color2
          this.button2_color = this.button_color2
          this.button3_color = this.button_color1
        }
      },
      async getList () {
        wx.showNavigationBarLoading()
        await this.selectList()
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }
    },
    onPullDownRefresh () {
      this.getList()
    }
  }
</script>
<style>
  .beijing {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .butten {
    width: 33.33%;
    float: left;
  }
</style>
