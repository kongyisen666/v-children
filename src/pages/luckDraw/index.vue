<template xmlns:wx="http://www.w3.org/1999/xhtml">
  <div class="beijing">
    <van-button class="but-color" @click="setPrize()" square size="small" type="primary">设置奖品</van-button>
    <div class="container-out">
      <div class="circle" v-for="(item,index) in circleList" wx:key="property"
           :style="{top:item.topCircle + 'rpx',left:item.leftCircle + 'rpx',backgroundColor:index%2==0?colorCircleFirst:colorCircleSecond}"></div>
      <div class="container-in">
        <div class="content-out" v-for="(item,index) in awardList" wx:key="property"
             :style="{top:item.topAward + 'rpx',left:item.leftAward + 'rpx',backgroundColor:index%8==indexSelect?colorAwardSelect:colorAwardDefault}">
          <!--图片-->
          <!--<image class="award-image" :src="item.imageAward"></image>-->
          <!--文字-->
          <div class="msg-font" v-if="item.imageAward!=null">{{item.imageAward}}</div>
          <div class="msg-font" v-else >未设置奖品</div>
        </div>
        <div class="start-btn" @click="startGame" :style="{backgroundColor:isRunning?'#e7930a':'#ffe400'}">START</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  export default {
    data() {
      return {
        onePage:true,
        childrenId:'',
        user: wx.getStorageSync("user"),
        circleList: [],//圆点数组
        awardList: [],//奖品数组
        colorCircleFirst: '#FFDF2F',//圆点颜色1
        colorCircleSecond: '#FE4D32',//圆点颜色2
        colorAwardDefault: '#F5F0FC',//奖品默认颜色
        colorAwardSelect: '#ffe400',//奖品选中颜色
        indexSelect: 0,//被选中的奖品index
        isRunning: false,//是否正在抽奖
        imageAward: [],//奖品图片数组
        priceAttribute:'prize',
        //循环体圆点闪烁
        timerCircle:'',
        //循环体转盘
        timer:'',
        //循环体旋转速度
        timer_t:90,
        //for循环变量
        i:0,
        isInToo : true,
        isInToo1 : true
      }
    },
    onLoad() {
      this.childrenId=this.$urlData().childrenId;
      //圆点设置
      var leftCircle = 7.5;
      var topCircle = 7.5;
      for (var i = 0; i < 24; i++) {
        if (i == 0) {
          topCircle = 15;
          leftCircle = 15;
        } else if (i < 6) {
          topCircle = 7.5;
          leftCircle = leftCircle + 102.5;
        } else if (i == 6) {
          topCircle = 15
          leftCircle = 620;
        } else if (i < 12) {
          topCircle = topCircle + 94;
          leftCircle = 620;
        } else if (i == 12) {
          topCircle = 565;
          leftCircle = 620;
        } else if (i < 18) {
          topCircle = 570;
          leftCircle = leftCircle - 102.5;
        } else if (i == 18) {
          topCircle = 565;
          leftCircle = 15;
        } else if (i < 24) {
          topCircle = topCircle - 94;
          leftCircle = 7.5;
        } else {
          return
        }
        this.circleList.push({topCircle: topCircle, leftCircle: leftCircle});
      }
    },onShow(){
      this.getPrize();
      //圆点闪烁
      this.timerCircle=setInterval(() => {
        if (this.colorCircleFirst == '#FFDF2F') {
          this.colorCircleFirst = '#FE4D32'
          this.colorCircleSecond = '#FFDF2F'
        } else {
          this.colorCircleFirst = '#FFDF2F'
          this.colorCircleSecond = '#FE4D32'
        }
      }, 500)
    },
    // 生命周期函数--监听页面卸载
    onUnload (){
      clearInterval(this.timerCircle)
      this.awardList = []
    },
    methods: {
      getPrize() {
        this.$post(this.$url.prize_search, {userId: this.user.id}).then(res => {
          if (res.data.success) {
            var object = res.data.object.object
            if(this.onePage){
              this.imageAward.push(object.prize1)
              this.imageAward.push(object.prize2)
              this.imageAward.push(object.prize3)
              this.imageAward.push(object.prize4)
              this.imageAward.push(object.prize5)
              this.imageAward.push(object.prize6)
              this.imageAward.push(object.prize7)
              this.imageAward.push(object.prize8)
            }else{
              this.imageAward[0]=object.prize1
              this.imageAward[1]=object.prize2
              this.imageAward[3]=object.prize3
              this.imageAward[4]=object.prize4
              this.imageAward[5]=object.prize5
              this.imageAward[6]=object.prize6
              this.imageAward[7]=object.prize7
              this.imageAward[8]=object.prize8
            }
            this.setPrizeUi();
            this.onePage=false
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      //开始游戏
      startGame() {
        if (this.isRunning) {
          return
        }
        this.isRunning = true
        this.timer = setInterval(this.game, this.timer_t);
      },
      game(){
        this.indexSelect++;
        this.i += Math.floor(Math.random() * 100);
        if(this.i>1000 && this.isInToo){
          clearInterval(this.timer);
          this.timer = setInterval(this.game, this.timer_t+100);
          this.isInToo = false;
        }
        if(this.i>1700 && this.isInToo1){
          clearInterval(this.timer);
          this.timer = setInterval(this.game, this.timer_t+500);
          this.isInToo1 = false;
        }
        if (this.i > 2000) {
          //去除循环
          clearInterval(this.timer)
          this.i=0
          this.isInToo = true
          this.isInToo1 = true
          //获奖提示
          wx.showModal({
            title: '恭喜您',
            content: '获得了“' + (this.imageAward[this.indexSelect % 8]) + "”奖励",
            showCancel: false,//去掉取消按钮
            success: res => {
              if (res.confirm) {
                this.isRunning = false
                this.$post(this.$url.prize_log_add, {childrenId: this.childrenId,msg:this.imageAward[this.indexSelect % 8]}).then(res => {
                })
              }
            }
          })
        }
        this.indexSelect = this.indexSelect % 8;
      },
      setPrize() {
        clearInterval(this.timerCircle)
        wx.navigateTo({
          url: '/pages/setPrize/main'
        })
      },
      setPrizeUi(){
        var topAward = 25;
        var leftAward = 25;
        for (var j = 0; j < 8; j++) {
          if (j == 0) {
            topAward = 25;
            leftAward = 25;
          } else if (j < 3) {
            topAward = topAward;
            //166.6666是宽.15是间距.下同
            leftAward = leftAward + 166.6666 + 15;
          } else if (j < 5) {
            leftAward = leftAward;
            //150是高,15是间距,下同
            topAward = topAward + 150 + 15;
          } else if (j < 7) {
            leftAward = leftAward - 166.6666 - 15;
            topAward = topAward;
          } else if (j < 8) {
            leftAward = leftAward;
            topAward = topAward - 150 - 15;
          }
          if(this.onePage){
            this.awardList.push({topAward: topAward, leftAward: leftAward, imageAward: this.imageAward[j]});
          }else{
            Vue.set(this.awardList,j,{topAward: topAward, leftAward: leftAward, imageAward: this.imageAward[j]})
          }

        }
      },
      async getList () {
        wx.showNavigationBarLoading()
        this.imageAward[0]='11100'
        console.log(this.imageAward)
        this.setPrizeUi2()
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
  .but-color {
    float: right;
  }

  .beijing {
    width: 100%;
    height: 100%;
    background-color: #A2DAD7;
    position: fixed;
  }

  .container-out {
    height: 600rpx;
    width: 650rpx;
    background-color: #b136b9;
    margin: 100px auto;
    border-radius: 40rpx;
    box-shadow: 0 10px 0 #871a8e;
    position: relative;
  }

  .container-in {
    width: 580rpx;
    height: 530rpx;
    background-color: #871a8e;
    border-radius: 40px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  /**小圆球
  box-shadow: inset 3rpx 3rpx 3rpx #fff2af;*/

  .circle {
    position: absolute;
    display: block;
    border-radius: 50%;
    height: 20rpx;
    width: 20rpx;
  }

  .content-out {
    position: absolute;
    height: 150rpx;
    width: 166.6666rpx;
    background-color: #f5f0fc;
    border-radius: 15rpx;
    box-shadow: 0 5rpx 0 #d87fde;
  }

  /**居中 加粗*/

  .start-btn {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 15rpx;
    height: 150rpx;
    width: 166.6666rpx;
    background-color: #ffe400;
    box-shadow: 0 5rpx 0 #e7930a;
    color: #f6251e;
    text-align: center;
    font-size: 50rpx;
    font-weight: bolder;
    line-height: 150rpx;
  }

  .award-image {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 140rpx;
    width: 130rpx;
  }

  .msg-font{
    text-align: center;
  }

</style>
