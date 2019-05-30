<template xmlns:wx="http://www.w3.org/1999/xhtml">
  <div class="beijing">
    <div style="width: 100%;float: right;margin-top: 10%">
      <div style="border-radius: 0 100px 100px 0;height: 2.5rem;width:6.5rem;background-color: #D7F1EE;float: left;">
        <span
          style="margin-left: 10%;color: #3B6929;line-height: 2.5rem;text-align: center;height: 2rem;"> {{score}}分</span>
        <img v-if="children.sex==0" mode="widthFix"
             style="margin-top: 2%;border-radius: 100px 100px 100px 100px;width:32%;float: right;margin-right: 3%;margin-top: 3%"
             src="/static/images/nan.jpg">
        <img v-if="children.sex==1" mode="widthFix"
             style="margin-top: 2%;border-radius: 100px 100px 100px 100px;width:32%;float: right;margin-right: 3%;margin-top: 3%"
             src="/static/images/nv.jpg">
      </div>
      <div
        style="font-size:1.2rem;line-height: 2rem;line-height: 2.5rem;text-align: center;height: 2.5rem;width:5rem;background-color:#4EA2C4;float: right;color: white">
        {{children.name}}
      </div>
    </div>
    <div>
      <div style="position:relative;float:left;width: 4rem; height: 3rem;text-align:center;margin-top: 5%"
           @click="showOrClose(0)">
        <img src="/static/images/richang.png" mode="widthFix" class="xuanXiang">
        <span style="position: absolute; top:27%; left: 23%;font-weight:500;font-size: 1rem;">每日</span>
      </div>
      <div style="clear:both"/>
      <div @click="showOrClose(1)"
           style="position:relative;float:left;width: 4rem; height: 3rem;text-align:center;margin-top: 5%">
        <img src="/static/images/meizhou.png" mode="widthFix" class="xuanXiang">
        <span
          style="position: absolute; top:25%; left: 23%;font-weight:500;font-size: 1rem;">每周</span>
      </div>
      <div style="clear:both"/>
      <div @click="showOrClose(2)"
           style="position:relative;float:left;width: 4rem; height: 3rem;text-align:center;margin-top: 5%">
        <img src="/static/images/meijian.png" mode="widthFix" class="xuanXiang">
        <span style="position: absolute; top:23%; left: 23%;font-size: 1rem;">每件</span>
      </div>
      <van-popup :show="show" @close="show = false">
        <div class="popup">
          <div style="text-align: center;background-color: chocolate">{{score}}分</div>
          <span v-for="item in rewardPunish" wx:key="property">
            <van-button round type="danger"
                        @click="addScore(item.score,item.msg)">{{item.msg}}+{{item.score}}分</van-button>
          </span>
        </div>
      </van-popup>
    </div>
    <div style="height: 50vh;width: 100vw;margin-top: -15%">
      <div style="width: 25%;height:20%;margin-left: 55%">
      <img src="/static/images/shuihu.jpg" :animation="musicAnimation"
      mode="heightFix" style="height:100%;width: 100%;">
      </div>
      <!--<div class="shuiDiDiv" style="margin-left: 50%;">-->
      <!--<img src="/static/images/shuidi.jpg"  mode="heightFix" class="shuidi">-->
      <!--<span-->
      <!--style="position: absolute;top:20%;left:-3%;font-weight:500;font-size: 0.9rem;">{{shui1}}</span>-->
      <!--</div>-->
      <!--<div class="shuiDiDiv" style="margin-left: 45%;">-->
      <!--<img src="/static/images/shuidi.jpg"  mode="heightFix" class="shuidi">-->
      <!--<span-->
      <!--style="position: absolute;top:20%;left:-3%;font-weight:500;font-size: 0.9rem;">{{shui2}}</span>-->
      <!--</div>-->
      <!--<div class="shuiDiDiv" style="margin-left: 50%;">-->
      <!--<img src="/static/images/shuidi.jpg"  mode="heightFix" class="shuidi">-->
      <!--<span-->
      <!--style="position: absolute;top:20%;left:-3%;font-weight:500;font-size: 0.9rem;">{{shui3}}</span>-->
      <!--</div>-->
      <div style="clear:both"/>
      <div style="position:relative;height: 50%;margin-left: 13%;margin-top: 3%;">
        <img src="/static/images/shu.jpg" mode="heightFix" style="width: 50%;height: 100%;margin-left: 20%;">
        <img @click="luckDraw" src="/static/images/choujiang.jpg" mode="heightFix" style="width: 20%;height: 40%;">
      </div>
    </div>
    <div style="border-radius: 1rem 1rem 0 0;background-color: #d2eced">
      <div style="margin-left: 3%;margin-top: 1.5%">积分动态</div>
      <div v-for="item in scoreLog" style="background-color: white;width: 90%;height: 50%;margin-left: 5%;">
        <img src="/static/images/shuidi1.jpg" mode="heightFix"
             style="margin-left: 3%;width:14%;height: 95%;float: left;">
        <div style="margin-top:4%;margin-left:5%">{{item.msg+"+"+item.score}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        children: {},
        score: 0,
        show: false,
        scoreLog: {},
        logMsg: '暂无数据',
        rewardPunish: {},
        rewardPunish0: {},
        rewardPunish1: {},
        rewardPunish2: {},
        musicAnimation:null
      }
    },
    mounted() {
    },
    onLoad() {
      this.getChildren()
      this.searchRewardPunishByType(0)
      this.searchRewardPunishByType(1)
      this.searchRewardPunishByType(2)
      this.cartoon();
    },
    methods: {
      cartoon(){
        var rotateCount = 1;

        const animationDuration = 3000;

        const animation = wx.createAnimation({

          duration: animationDuration

        });

        animation.rotate(360).step();

        this.musicAnimation = animation.export();

        //连续动画关键步骤

        var _this = this;

        setInterval(function () {

          rotateCount++;

          const animation = wx.createAnimation({

            duration: animationDuration

          });

          animation.rotate(360*rotateCount).step();

          _this.musicAnimation = animation.export();

        }, animationDuration)
      },
      showOrClose(type) {
        if (0 == type) {
          this.rewardPunish = this.rewardPunish0
        }
        if (1 == type) {
          this.rewardPunish = this.rewardPunish1
        }
        if (2 == type) {
          this.rewardPunish = this.rewardPunish2
        }
        if (this.show) {
          this.show = false
        }
        this.show = true
      },
      addScore(score, msg) {
        this.$post(this.$url.add_score, {childrenId: this.children.id, msg: msg, score: score}).then(res => {
          if (res.data.success === true) {
            this.score = this.score + score
            this.updateScoreLog(score, msg)
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      getChildren() {
        this.$post(this.$url.get_children, {}).then(res => {
          this.children = res.data.object.object
          this.searchScoreLog()
          this.score = res.data.object.object.score
        })
      },
      searchRewardPunishByType(type) {
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
      },
      searchScoreLog() {
        this.$post(this.$url.score_log_search_by_children_id, {
          childrenId: this.children.id,
          maxRows: '5'
        }).then(res => {
          if (res.data.success) {
            this.scoreLog = res.data.object.object
          }
        })
      },
      updateScoreLog(score, msg) {
        let num = this.scoreLog.length
        for (let i = num - 1; i > 0; i--) {
          this.scoreLog[i].msg = this.scoreLog[i-1].msg
          this.scoreLog[i].score = this.scoreLog[i-1].score
        }
        this.scoreLog[0].msg = msg
        this.scoreLog[0].score = score
      },
      luckDraw() {
        wx.navigateTo({
          url: '/pages/luckDraw/main?childrenId='+this.children.id
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
    /*position: fixed;*/
  }

  .shuiDiDiv {
    margin-top: 3%;
    position: relative;
    height: 8%;
    width: 6%;
    margin-right: 15%;
  }

  .shuidi {
    width: 100%;
    height: 100%;
  }

  .xuanXiang {
    width: 100%;
  }

  .popup {
    width: 80vw;
    height: 60vh;
  }
</style>
