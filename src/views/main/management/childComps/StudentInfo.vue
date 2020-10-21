<template>
  <div class="bg">
    <h4>学生信息</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
    <el-table :data="dataList" :stripe="true" style="width: 100%">
      <el-table-column prop="sno" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="school" label="学院"></el-table-column>
    </el-table>
    </el-scrollbar>
    <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore">查看更多</el-link></p>
  </div>
</template>

<script>
import { getStudentInfo } from 'network/management/getStudentInfo'
export default {
  name: 'StudentInfo',
  data() {
    return {
      dataList: []
    }
  },
  created() {
    // axios请求
    getStudentInfo().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          sno: res.data.result[i].sno,
          name: res.data.result[i].sname,
          school: res.data.result[i].school
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    seeMore() {
      this.$router.push('/super-user/index/info/student')
    }
  }
}
</script>

<style scoped>
  .see-more {
    margin: .5em;
    text-align: right;
  }
</style>
