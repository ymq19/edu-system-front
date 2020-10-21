<template>
  <el-container>
    <zstu-header />
    <el-container>
      <zstu-aside :isLoading="isLoading" />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>个人信息</h4>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="工号">
                <el-input v-model="form.mno" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="form.sex" label="男">男性</el-radio>
                <el-radio v-model="form.sex" label="女">女性</el-radio>
                <el-radio v-model="form.sex" label="双">双性</el-radio>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="form.email" clearable placeholder="请输入邮箱地址"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="tel">
                <el-input type="tel" v-model="form.tel" clearable placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop="intro">
                <el-input type="textarea" v-model="form.intro" placeholder="请输入个人简介" maxlength="200" show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" round @click="submitProfile">提交个人信息</el-button>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
            </el-upload>
            <p class="upload-avatar">上传头像</p>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-footer><zstu-footer /></el-footer>
  </el-container>
  
</template>

<script>
import ZstuHeader from 'components/content/header/ZstuHeader'
import ZstuAside from 'components/content/aside/ZstuAside'
import ZstuFooter from 'components/content/footer/ZstuFooter'
import { setProfile } from 'network/management/setProfile'
import { addAvatar } from 'network/student/addAvatar'
export default {
  name: 'ZstuProfile',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  data() {
    const validateEmail =  (rule, value, callback) => {
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (pattern.test(this.form.email) === false && this.form.email !== '' && this.form.email !== null) {
        callback(new Error('邮箱格式不规范'))
      } else {
        callback()
      }
    }
    const validateTel = (rule, value, callback) => {
      const pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (pattern.test(this.form.tel) === false && this.form.tel !== '' && this.form.tel !== null) {
        callback(new Error('电话格式不规范'))
      } else {
        callback()
      }
    }
    return {
      isLoading: true,
      imageUrl: '',
      form: {
        mno: localStorage.getItem('Username'),
        name: localStorage.getItem('Name'),
        sex: this.$store.state.profileMsg.sex ? this.$store.state.profileMsg.sex : JSON.parse(localStorage.getItem('ProfileMsg')).sex,
        age: this.$store.state.profileMsg.age ? this.$store.state.profileMsg.age : JSON.parse(localStorage.getItem('ProfileMsg')).age,
        email: this.$store.state.profileMsg.email ? this.$store.state.profileMsg.email : JSON.parse(localStorage.getItem('ProfileMsg')).email,
        tel: this.$store.state.profileMsg.tel ? this.$store.state.profileMsg.tel : JSON.parse(localStorage.getItem('ProfileMsg')).tel,
        intro: this.$store.state.profileMsg.intro ? this.$store.state.profileMsg.intro :JSON.parse(localStorage.getItem('ProfileMsg')).intro
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: ['blur', 'change'] }
        ],
        tel: [
          { validator: validateTel, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    submitProfile() {
      const patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      const patternTel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if ((this.form.email !== null && this.form.email !== '' && patternEmail.test(this.form.email) === false) || (this.form.tel !== null && this.form.tel !== '' && patternTel.test(this.form.tel) === false)) {
        return
      }
      this.$confirm('此操作将提交个人信息，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const name = this.form.name
        const sex = this.form.sex
        const age = this.form.age
        const email = this.form.email
        const tel = this.form.tel
        const intro = this.form.intro
        const mno = this.form.mno
        const data = JSON.stringify({name, sex, age, email, tel, intro})
        // axios请求
        setProfile(mno, data).then(res => {
          // 路由跳转到前一个
          this.$message({
            type: 'success',
            message: '个人信息修改成功!'
          })
          this.$router.go(-1)
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    // 上传头像
    handleAvatarSuccess(res) {
      const data = new FormData()
      data.append('userType', localStorage.getItem('UserType'))
      data.append('image', res.file)
      addAvatar(this.form.mno, data).then(res => {
        this.imageUrl = res.data.url
        this.$store.commit('getAvatarUrl', {url: this.imageUrl})
        this.$message.success('头像上传成功！')
      }).catch(err => {
        console.log(err)
      })
    },
    beforeAvatarUpload(file) {
      let isJPGorPng
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' ? isJPGorPng = true : isJPGorPng = false
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPGorPng) {
        this.$message.error('上传的头像图片只能是JPG/PNG/GIF格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传的头像图片大小不能超过2MB！')
      }
      return isJPGorPng && isLt2M
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  
  .upload-avatar {
    color: #8c939d;
    margin-top: .5em;
  }
  .el-main {
    color: #333;
    text-align: center;
  }
  .page-header {
    margin-bottom: 1em;
  }
</style>
