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
      <p class="normal">邮箱：{{ dataList.email }}</p>
      <p class="normal">联系电话：{{ dataList.tel }}</p>
      <p class="normal">简介：{{ dataList.intro }}</p>
    </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import { getProfile } from 'network/teacher/getProfile'
export default {
  name: 'Profile',
  data() {
    return {
      dataList: {
        name: '',
        sex: '',
        age: 18,
        email: '',
        tel: '',
        intro: ''
      }
    }
  },
  created() {
    // axios请求
    this.dataList.name = '姓名：' + localStorage.getItem('Name')
    const tno = localStorage.getItem('Username')
    getProfile(tno).then(res => {
      this.dataList.sex = res.data.result[0].sex
      this.dataList.age = res.data.result[0].age
      this.dataList.email = res.data.result[0].email
      this.dataList.tel = res.data.result[0].tel
      this.dataList.intro = res.data.result[0].intro
      // 发送vuex
      this.$store.commit('profileMsg', {
        sex: res.data.result[0].sex,
        age: res.data.result[0].age,
        email: res.data.result[0].email ? res.data.result[0].email : '',
        tel: res.data.result[0].tel ? res.data.result[0].tel : '',
        intro: res.data.result[0].intro ? res.data.result[0].intro : ''
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
