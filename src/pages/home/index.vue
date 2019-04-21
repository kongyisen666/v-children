<template>
  <div class=".beijing">
    <div style="width: 100%;float: right;margin-top: 10%">
      <div style="border-radius: 0 100px 100px 0;height: 2.5rem;width:6.5rem;background-color: #D7F1EE;float: left;">
        <span
          style="margin-left: 10%;color: #3B6929;line-height: 2.5rem;text-align: center;height: 2rem;"> {{score}}分</span>
          <img style="margin-top: 2%;border-radius: 100px 100px 100px 100px;width: 2rem;height: 2rem;float: right;margin-right: 5%;margin-top: 4%" src="/static/images/richang.png" >
      </div>
      <div
        style="font-size:1.2rem;line-height: 2rem;line-height: 2.5rem;text-align: center;height: 2.5rem;width:5rem;background-color:#4EA2C4;float: right;color: white">
        {{children.name}}
      </div>
    </div>
    <div>
      <div style="position:relative;float:left;width: 4rem; height: 3rem;text-align:center;margin-top: 5%"
           @click="showOrClose(0)">
        <img src="/static/images/richang.png" style="width: 4rem; height: 3rem;">
        <span style="position: absolute; top:0.8rem; left: 0.9rem;font-weight:500;font-size: 1rem;color: darkslategrey">每日</span>
      </div>
      <div style="clear:both"/>
      <div @click="showOrClose(1)" style="position:relative;float:left;width: 4rem; height: 3rem;text-align:center">
        <img src="/static/images/meizhou.png" style="width: 4.2rem; height: 3.2rem;">
        <span
          style="position: absolute; top:0.9rem; left: 1rem;font-weight:500;font-size: 1rem;color: darkslategrey">每周</span>
      </div>
      <div style="clear:both"/>
      <div @click="showOrClose(2)" style="position:relative;float:left;width: 4rem; height: 3rem;text-align:center">
        <img src="/static/images/meijian.png" style="width: 4rem; height: 3rem;">
        <span style="position: absolute; top:0.8rem; left: 0.9rem;font-weight:500;font-size: 1rem;color: darkslategrey">每件</span>
      </div>
      <van-popup :show="show" @close="show = false">
        <div class="popup">
          <div style="text-align: center;background-color: chocolate">{{score}}分</div>
          <span v-for="item in rewardPunish">
            <van-button round type="danger"
                        @click="addScore(item.score,item.msg)">{{item.msg}}+{{item.score}}分</van-button>
          </span>
        </div>
      </van-popup>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        children: {},
        score: 0,
        show: false,
        rewardPunish: {},
        rewardPunish0: {},
        rewardPunish1: {},
        rewardPunish2: {},
      }
    },
    mounted () {
    },
    onLoad () {
      this.getChildren()
      this.searchRewardPunishByType(0)
      this.searchRewardPunishByType(1)
      this.searchRewardPunishByType(2)
    },
    methods: {
      showOrClose (type) {
        console.log(type)
        if (0 == type) {
          this.rewardPunish = this.rewardPunish0
        }
        if (1 == type) {
          this.rewardPunish = this.rewardPunish1
        }
        if (2 == type) {
          this.rewardPunish = this.rewardPunish2
        }
        console.log(this.rewardPunish0)
        console.log(this.rewardPunish1)
        console.log(this.rewardPunish2)
        if (this.show) {
          this.show = false
        }
        this.show = true
      },
      addScore (score, msg) {
        this.$post(this.$url.add_score, {childrenId: this.children.id, msg: msg, score: score}).then(res => {
          if (res.data.success === true) {
            this.score = this.score + score
          }
          this.$alert(res.data.msg)
        })
      },
      getChildren () {
        this.$post(this.$url.get_children, {}).then(res => {
          this.children = res.data.object.object
          this.score = res.data.object.object.score
        })
      },
      searchRewardPunishByType (type) {
        this.$post(this.$url.reward_punish_search_by_type, {type: type}).then(res => {
          if (res.data.success) {
            var objects = res.data.object.object
            if (type == 0) {
              this.rewardPunish0 = objects
            }
            if (type == 1) {
              this.rewardPunish1 = objects
            }
            if (type == 2) {
              this.rewardPunish2 = objects
            }
          } else {
            this.$alert(res.data.msg)
          }
        })
      }
    }
  }
</script>
<style>
  .beijing {
    width: 100%;
    height: 100%;
    background-color: #A2DAD7;
    position: fixed;
  }

  .popup {
    width: 80vw;
    height: 60vh;
  }
</style>
