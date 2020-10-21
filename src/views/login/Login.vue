<template>
<div class="bg" v-loading="loading">
  <div class="login">
    <div class="login-left"><img src="~assets/img/login/system.png" alt="教务系统" class="login-img"></div>
    <div class="login-right">
      <h2 class="text-center zstu-edu">浙江理工大学教务管理系统</h2>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" class="el-size" placeholder="请输入学工号" clearable autofocus="true" auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="pass">
          <el-input v-model="ruleForm.pass" class="el-size" placeholder="请输入密码" show-password clearable auto-complete="new-password"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="24" class="text-center user-select">
            <el-radio-group v-model="radio">
              <el-radio label="stu">学生</el-radio>
              <el-radio label="mana">管理员</el-radio>
              <el-radio label="teach">教师</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" round class="el-size" @click="btnLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-msg">
        <span>默认密码：123456,第一次登录后将重置密码</span>
        <span class="forget-pass">忘记密码</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { toLogin } from 'network/student/login'
import { superLogin } from 'network/management/login'
import { teacherLogin } from 'network/teacher/login'
import qs from 'querystring'
export default {
  name: 'Login',
  data() {
    const validateUsr = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入学工号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        pass: ''
      },
      rules: {
        username: [
          { validator: validateUsr, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      isLoading: false,
      radio: 'stu'
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    btnLogin() {
      // console.log(this.radio)
      if(this.ruleForm.username === '' || this.ruleForm.pass === '') {
        return
      }
      this.isLoading = true
      // 发送axios请求
      const username = this.ruleForm.username
      const password = this.ruleForm.pass
      const data = JSON.stringify({username, password})
      if (this.radio === 'stu') {
        this.userLogin(data)
      } else if (this.radio === 'mana') {
        this.superUserLogin(data)
      } else if (this.radio === 'teach') {
        this.teacherUserLogin(data)
      }
      
    },
    userLogin(data) {
      toLogin(data).then(res => {
        if(res.data.status === 1100) {
          // 弹出错误提示
          this.$message.error('用户名或密码错误')
          this.ruleForm.pass = ''
          this.isLoading = false
        } else if(res.data.status === 1105) {
          // 登录成功
          // 1.第一次登录，跳转到重置密码界面
          // 2.跳转到主页面，存储token
          if(this.ruleForm.pass === '123456') {
            localStorage.setItem('UserType', this.radio)
            localStorage.setItem('Username', this.ruleForm.username)
            this.$router.replace('/login/reset')
          } else {
            localStorage.setItem('UserType', this.radio)
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('Username', this.ruleForm.username)
            localStorage.setItem('Name', res.data.name)
            localStorage.setItem('AvatarUrl', res.data.url)
            this.$router.replace('/index')
          }
          this.isLoading = false
        }
      }).catch(err => {})
    },
    superUserLogin(data) {
      superLogin(data).then(res => {
        if(res.data.status === 1100) {
          // 弹出错误提示
          this.$message.error('用户名或密码错误')
          this.ruleForm.pass = ''
          this.isLoading = false
        } else if(res.data.status === 1105) {
          // 登录成功
          // 1.第一次登录，跳转到重置密码界面
          // 2.跳转到主页面，存储token
          if(this.ruleForm.pass === '123456') {
            localStorage.setItem('UserType', this.radio)
            localStorage.setItem('Username', this.ruleForm.username)
            this.$router.replace('/login/reset')
          } else {
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('UserType', this.radio)
            localStorage.setItem('Username', this.ruleForm.username)
            localStorage.setItem('Name', res.data.name)
            localStorage.setItem('AvatarUrl', res.data.url)
            this.$router.replace('/super-user/index')
          }
          this.isLoading = false
        }
      }).catch(err => {})
    },
    teacherUserLogin(data) {
      teacherLogin(data).then(res => {
        if(res.data.status === 1100) {
          // 弹出错误提示
          this.$message.error('用户名或密码错误')
          this.ruleForm.pass = ''
          this.isLoading = false
        } else if(res.data.status === 1105) {
          // 登录成功
          // 1.第一次登录，跳转到重置密码界面
          // 2.跳转到主页面，存储token
          if(this.ruleForm.pass === '123456') {
            localStorage.setItem('UserType', this.radio)
            localStorage.setItem('Username', this.ruleForm.username)
            this.$router.replace('/login/reset')
          } else {
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('UserType', this.radio)
            localStorage.setItem('Username', this.ruleForm.username)
            localStorage.setItem('Name', res.data.name)
            localStorage.setItem('AvatarUrl', res.data.url)
            this.$router.replace('/teacher/index')
          }
          this.isLoading = false
        }
      }).catch(err => {})
    }
  }
}
</script>

<style scoped>
  .bg {
    background-color: #DDD;
    height: 100vh;
  }
  .login {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    -ms-transform: translateY(-50%);	/* IE 9 */
    -moz-transform: translateY(-50%); 	/* Firefox */
    -webkit-transform: translateY(-50%); /* Safari 和 Chrome */
    -o-transform: translateY(-50%); 	/* Opera */
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .login-right {
    width: 500px;
    height: 400px;
    background-color: #FFF;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .login-img {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .user-select {
    margin-bottom: 1.4em;
  }
  .zstu-edu {
    margin: 2em;
  }
  .el-size {
    width: 300px;
  }
  .login-msg {
    margin-top: 4em;
    font-size: 12px;
    color: #606266;
    display: flex;
    justify-content: space-around;
  }
  .forget-pass {
    cursor: pointer;
  }
</style>
