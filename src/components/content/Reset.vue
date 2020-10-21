<template>
<div class="bg" v-loading="loading">
  <div class="reset text-center">
    <h2 class="zstu-edu">浙江理工大学教务管理系统</h2>
    <el-form :model="ruleForm" ref="ruleForm" label-position="left" :rules="rules" label-width="70px">
      <el-form-item label="原密码" prop="oldPass" class="el-size">
        <el-input type="password" v-model="ruleForm.oldPass" auto-complete="new-password" placeholder="请输入原密码" show-password clearable></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass" class="el-size">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="new-password" placeholder="请输入新密码" show-password clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" class="el-size">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="new-password" placeholder="请再次输入密码" show-password clearable></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="isLoading" round @click="btnClick">重置密码</el-button>
    <div class="pass-config">
      <span>密码规范：以字母开头，长度在6~18之间，只能包含字母、数字和下划线</span>
    </div>
  </div>
</div>
</template>

<script>
import { reset } from 'network/student/reset'
import { superReset } from 'network/management/reset'
import { teacherReset } from 'network/teacher/reset'
export default {
  name: 'Reset',
  data() {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        // 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        const pass = /^[a-zA-Z]\w{5,17}$/
        if (pass.test(this.ruleForm.pass) === false) {
          callback(new Error('密码不符合规范'))
        } else {
          callback()
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [
          { validator: validateOldPass, trigger: ['blur', 'change'] }
        ],
        pass: [
          { validator: validatePass, trigger: ['blur', 'change'] }
        ],
        checkPass: [
          { validator: validatePass2, trigger: ['blur', 'change'] }
        ]
      },
      isLoading: false
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    btnClick() {
      const pass = /^[a-zA-Z]\w{5,17}$/
      if (this.ruleForm.oldPass === '' || this.ruleForm.pass === '' || this.ruleForm.checkPass === ''
      || pass.test(this.ruleForm.pass) === false || this.ruleForm.pass !== this.ruleForm.checkPass) {
        return
      }
      const username = localStorage.getItem('Username')
      const oldPassword = this.ruleForm.oldPass
      const password = this.ruleForm.pass 
      const data = JSON.stringify({oldPassword, password})
      this.isLoading = true
      // axios请求
      if (localStorage.getItem('UserType') === 'stu') {
        this.userReset(username, data)
      } else if (localStorage.getItem('UserType') === 'mana') {
        this.superUserReset(username, data)
      } else if (localStorage.getItem('UserType') === 'teach') {
        this.teacherUserReset(username, data)
      }
    },
    userReset(username, data) {
      reset(username, data).then(res => {
        if (res.data.status === 1100) {
          this.$message.error('原密码错误')
          this.isLoading = false
        } else if (res.data.status === 1105) {
          localStorage.clear()
          this.$router.replace('/login')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    superUserReset(username, data) {
      superReset(username, data).then(res => {
        if (res.data.status === 1100) {
          this.$message.error('原密码错误')
          this.isLoading = false
        } else if (res.data.status === 1105) {
          localStorage.clear()
          this.$router.replace('/login')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    teacherUserReset(username, data) {
      teacherReset(username, data).then(res => {
        if (res.data.status === 1100) {
          this.$message.error('原密码错误')
          this.isLoading = false
        } else if (res.data.status === 1105) {
          localStorage.clear()
          this.$router.replace('/login')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: #DDD;
  height: 100vh;
}
.reset {
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
.zstu-edu {
  margin: 1.2em;
}
.el-size {
  margin-left: 1em;
  margin-right: 1em;
}
.pass-config {
  color: #606266;
  margin: 1.2em;
  font-size: 12px;
}
</style>
