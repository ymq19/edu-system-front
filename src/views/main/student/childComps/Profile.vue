<template>
  <div class="bg">
    <h4>个人信息</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
      <el-card>
        <div slot="header" class="name">
          <span>{{ dataList.name }}</span>
        </div>
        <p class="normal">性别：{{ dataList.sex }}</p>
        <p class="normal">年龄：{{ dataList.age }}</p>
        <p class="normal">入学日期：{{ dataList.admi_date }} <i class="el-icon-date"></i></p>
        <p class="normal">学院：：{{ dataList.school }}</p>
        <p class="normal">专业：{{ dataList.major }}</p> 
        <p class="normal">邮箱：{{ dataList.email }}</p>
        <p class="normal">联系电话：{{ dataList.tel }}</p>
        <p class="normal">爱好及特长：{{ dataList.hobby }} <i class="el-icon-watermelon"></i></p>
        <p class="normal">简介：{{ dataList.intro }}</p>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import { getProfile } from 'network/student/getProfile'
export default {
  name: 'Profile',
  data() {
    return {
      dataList: {
        name: '',
        sex: '',
        age: 18,
        admi_date: '',
        school: '',
        major: '',
        email: '',
        tel: '',
        hobby: '',
        intro: ''
      }
    }
  },
  created() {
    // axios请求
    this.dataList.name = '姓名：' + localStorage.getItem('Name')
    const sno = localStorage.getItem('Username')
    getProfile(sno).then(res => {
      this.dataList.sex = res.data.result[0].sex
      this.dataList.age = res.data.result[0].sage
      this.dataList.admi_date = res.data.result[0].admi_date
      this.dataList.school = res.data.result[0].school
      this.dataList.major = res.data.result[0].sdept
      this.dataList.email = res.data.result[0].email
      this.dataList.tel = res.data.result[0].tel
      this.dataList.hobby = res.data.result[0].hobby
      this.dataList.intro = res.data.result[0].intro
      // 发送vuex
      this.$store.commit('profileMsg', {
        sex: res.data.result[0].sex,
        age: res.data.result[0].sage,
        admi_date: res.data.result[0].admi_date,
        school: res.data.result[0].school,
        sdept: res.data.result[0].sdept,
        email: res.data.result[0].email,
        tel: res.data.result[0].tel,
        hobby: res.data.result[0].hobby,
        intro: res.data.result[0].intro
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .name {
    font-weight: 1000;
    font-size: 20px;
  }
  .normal {
    color: #555;
    line-height: 30px;
  }
</style>
