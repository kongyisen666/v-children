<template>
  <div class=".beijing">
    <div style="width: 100%;float: right;margin-top: 10%">
      <div style="text-align: center;width: 4rem;background-color: cornflowerblue;float: left;font-weight: 600;color: white">{{score}}分</div>
      <div style="text-align: center;height: 1.5rem;width:4rem;background-color: cornflowerblue;float: right;font-weight: 600;color: white">{{children.name}}</div>
    </div>
    <div>
      <van-button round type="danger" @click="addScore(1,'按时完成作业')">按时完成作业</van-button><br/>
      <van-button round type="danger" @click="addScore(-1,'按时完成作业')">没有完成作业</van-button>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        children: {},
        score: 0
      }
    },
    mounted () {
    },
    onLoad () {
      this.getChildren()
    },
    methods: {
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
      }
    }
  }
</script>
<style>
  .beijing{
    width: 100%;
    height: 100%;
    background-color:#A2DAD7;
    position: fixed;
  }
</style>
