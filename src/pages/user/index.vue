<template>
  <div class=".beijing">
    <van-cell-group>

      <van-field
        v-model="children.name"
        required
        clearable
        label="孩子姓名"
        right-icon="question-o"
        @change="setName"
        placeholder="请输入用户名"
      />

      <van-radio-group v-model="children.sex">
        <van-cell title="性别:男" clickable @click="children.sex = '男'">
          <van-radio name="男" />
        </van-cell>
        <van-cell title="性别:女" clickable @click="children.sex = '女'">
          <van-radio name="女" />
        </van-cell>
      </van-radio-group>

      <van-field
        v-model="children.age"
        type="digit"
        label="年龄"
        @change="setAge"
        placeholder="请输入年龄"
        required
        clickable
        :border="false"/>

      <picker mode="date"
              :value="children.birthday"
              :start="startDate" end="2217-09-01" @change="setBirthday">
        <van-field
          v-model="children.birthday"
          label="生日"
          placeholder="请选择生日"
          required
          clickable
          :border="false"/>
      </picker>

      <van-field
        v-model="children.grade"
        type="digit"
        label="年级"
        maxlength="1"
        @change="setGrade"
        placeholder="请输入年级(一年级则为'1')"
        required
        clickable
        :border="false"/>

      <van-field
        v-model="children.phone"
        type="digit"
        label="联系电话"
        placeholder="请输入手机号"
        @change="setPhone"
        required
      />

      <van-field
        v-model="children.cla"
        type="number"
        maxlength="2"
        label="班级"
        placeholder="请输入班级(一班则为‘1’)"
        clickable
        @change="setClass"
        :border="false"/>

      <van-field
        v-model="children.address"
        clearable
        label="地址"
        right-icon="question-o"
        @change="setAddress"
        placeholder="请输入详细地址"
      />

      <van-field
        v-model="children.school"
        clearable
        label="学校"
        right-icon="question-o"
        @change="setSchool"
        placeholder="请输入学校名称"
      />

      <van-field
        v-model="children.password"
        type="password"
        label="登陆密码"
        placeholder="请输入登陆密码"
        clickable
        @change="setPassword"
        required
        :border="false"/>

      <van-button size="large" @click="submit">提交</van-button>
    </van-cell-group>
  </div>
</template>

<script>
  var children = {
    name: '',
    age: '',
    sex: '男',
    phone: '',
    password: '',
    birthday: '',
    grade: '',
    cla: '',
    school: '',
    address: ''
  }
  export default {
    data () {
      return {
        children: children,
        startDate: '1980-01-01',
        endDate: '2099-01-01'
      }
    },
    mounted () {
    },
    onLoad () {
      this.getChildren()
    },
    methods: {
      submit () {
        if (this.stringIsNull(this.children.name)) {
          this.$alert('孩子姓名不能为空')
          return ;
        }
        if (this.stringIsNull(this.children.age)) {
          this.$alert('孩子年龄')
          return ;
        }
        if (this.stringIsNull(this.children.birthday)) {
          this.$alert('孩子出生日期')
          return ;
        }
        if (this.stringIsNull(this.children.grade)) {
          this.$alert('孩子年级')
          return ;
        }
        if (this.stringIsNull(this.children.phone)) {
          this.$alert('联系电话')
          return ;
        }
        if (this.stringIsNull(this.children.password)) {
          this.$alert('登陆密码')
          return ;
        }
        this.$post(this.$url.add_or_update_children, this.children).then(res => {
          console.log(res.data)
          if (res.data.success) {
            this.$alert('新增成功,请等待管理员审核,通过审核后可进入操作页面')
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      getChildren () {
        this.$post(this.$url.get_children, {}).then(res => {
          if (res.data.success) {
            this.children = res.data.object.object
          }
        })
      },
      setName (event) {
        this.children.name = event.mp.detail
      },
      setAge (event) {
        this.children.age = event.mp.detail
      },
      setSex (event) {
        this.children.sex = event.mp.detail
      },
      setBirthday (event) {
        this.children.birthday = event.mp.detail.value
      },
      setGrade (event) {
        this.children.grade = event.mp.detail
      },
      setPhone (event) {
        this.children.phone = event.mp.detail
      },
      setClass (event) {
        this.children.cla = event.mp.detail
      },
      setAddress (event) {
        this.children.address = event.mp.detail
      },
      setSchool (event) {
        this.children.school = event.mp.detail
      },
      setPassword (event) {
        this.children.password = event.mp.detail
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
