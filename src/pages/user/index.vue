<template>
  <div class=".beijing">
    <van-cell-group>
      <van-field
        :value="model.name"
        required
        clearable
        label="用户名"
        icon="question-o"
        placeholder="请输入用户名"
        bind:click-icon="onClickIcon"
      />

      <van-field
        :value="model.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :border="false"></van-field>
    </van-cell-group>
  </div>
</template>

<script>
  // import { Field} from 'vant';
  export default {
    components: {
      // Field,
    },
    data () {
      return {
        model : []
      }
    },
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
