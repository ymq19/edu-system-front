<template>
  <div>
    <h4>课程</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
    <el-table :data="dataList" :stripe="true" style="width: 100%">
      <el-table-column prop="cno" label="课程号"></el-table-column>
      <el-table-column prop="name" label="课程名"></el-table-column>
      <el-table-column prop="credit" label="学分"></el-table-column>
      <el-table-column prop="preCourse" label="先修课"></el-table-column>
      <el-table-column prop="teacher" label="教师"></el-table-column>
    </el-table>
    </el-scrollbar>
    <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore">查看更多</el-link></p>
  </div>
</template>

<script>
import { getCourse } from 'network/student/getCourse'
export default {
  name: 'Course',
  data() {
    return {
      dataList: []
    }
  },
  created() {
    // 获取所有课程信息
    getCourse().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          cno: res.data.result[i].cno,
          name: res.data.result[i].cname,
          credit: res.data.result[i].ccredit,
          preCourse: res.data.result[i].prename ? res.data.result[i].prename : '无',
          teacher: res.data.result[i].teacher
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    seeMore() {
      // 路由跳转
      this.$router.push('/index/course')
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
