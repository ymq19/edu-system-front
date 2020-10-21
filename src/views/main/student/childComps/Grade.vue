<template>
  <div>
    <h4>成绩</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
    <el-table :data="dataList" :stripe="true" style="width: 100%">
      <el-table-column prop="cno" label="课程号"></el-table-column>
      <el-table-column prop="name" label="课程名"></el-table-column>
      <el-table-column prop="gradePo" label="绩点"></el-table-column>
      <el-table-column prop="grade" label="成绩"></el-table-column>
    </el-table>
    </el-scrollbar>
    <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore">查看更多</el-link></p>
  </div>
</template>

<script>
import { getGrade } from 'network/student/getGrade'
export default {
  name: 'Grade',
  data() {
    return {
      dataList: []
    }
  },
  created() {
    // axios请求
    const sno = localStorage.getItem('Username')
    getGrade({sno}).then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          cno: res.data.result[i].cno,
          name: res.data.result[i].cname,
          gradePo: res.data.result[i].gradepo,
          grade: res.data.result[i].grade
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    seeMore() {
      // 路由跳转
      this.$router.push('/index/grade/' + localStorage.getItem('Username'))
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
