<template>
  <div class=".beijing">
    <van-cell-group>

      <van-field
        v-model="children.name"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="children.age"
        :value="children.age"
        type="number"
        label="年龄"
        placeholder="请输入年龄"
        required
        clickable
        :border="false"/>

      <van-radio-group v-model="children.sex">
          <van-cell title="性别:男" clickable @click="children.sex = '男'">
            <van-radio name="男" />
          </van-cell>
          <van-cell title="性别:女" clickable @click="children.sex = '女'">
            <van-radio name="女" />
          </van-cell>
      </van-radio-group>

      <van-field
        v-model="children.phone"
        type="phone"
        label="家长联系电话"
        placeholder="请输入手机号"
        required
      />

      <van-field
        v-model="children.password"
        type="password"
        label="登陆密码"
        placeholder="请输入登陆密码"
        required
        clickable
        :border="false"/>
    </van-cell-group>

    <van-button size="large" @click="submit">提交</van-button>
  </div>
</template>

<script>
  var children = {
    name: '',
    age: 0,
    sex: '男',
    phone: '',
    password: ''
  }
  export default {
    data () {
      return {
        username: '',
        children: children
      }
    },
    mounted () {
    },
    onLoad () {
      this.getChildren()
    },
    methods: {
      submit () {
        this.$post(this.$url.add_child, this.children).then(res => {
          this.$alert('新增成功,请等待管理员审核,通过审核后可进入操作页面')
        })
      },
      getChildren () {
        this.$post(this.$url.get_child, {}).then(res => {
          this.children = res.data.object.object
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
