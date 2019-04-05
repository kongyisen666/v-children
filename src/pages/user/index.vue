<template>
  <div class=".beijing">
    <group title="set is-type=china-name">
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
    </group>

    <group title="set keyboard=number and is-type=china-mobile">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>

    <group title="set is-type=email">
      <x-input title="邮箱" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
    </group>
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell } from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
    },
    data () {
      return {
        url : ''
      }
    },
    created () {

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
