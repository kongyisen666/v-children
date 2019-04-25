<template>
  <div class="beijing">
    <van-action-sheet
      :model="show"
      :actions="actions"
      @close="onClose"
      @select="onSelect"
    />
    <div v-for="(item,index) in users">
      <div v-if="item.state == active || item.state == active1" style="border-bottom:1px solid #f5f5f5">
        <van-switch-cell :title="item.childrenList[0].name"
                         :checked="item.state==1?true:false"
                         @change="onChange(item)"
        />
      </div>
    </div>
    <div style="height: 11vw;"></div>
    <div style="position:fixed;bottom:0;width: 100%;z-index: 1">
      <button class="butten" type="default" @click="activeType(0,1)">全部</button>
      <button class="butten" type="default" @click="activeType(0,0)">未激活</button>
      <button class="butten" type="default" @click="activeType(1,1)">已激活活</button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        users: {},
        checked: true,
        active: 0,
        active1: 1,
      }
    },
    onLoad() {
      this.selectList();
    },
    methods: {
      selectList() {
        this.$post(this.$url.user_list, {}).then(res => {
          if (res.data.success) {
            console.log(res.data.object.object)
            this.users = res.data.object.object
          }
        })
      },
      onChange(user) {
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
      onClose() {
        this.setData({show: false});
      },
      onSelect(event) {
        console.log(event.detail);
      },
      activeType(num, num1) {
        this.active = num
        this.active1 = num1
      }
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
