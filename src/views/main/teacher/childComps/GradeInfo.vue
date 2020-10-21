<template>
  <div>
    <h4>成绩信息</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
    <el-table :data="dataList" :stripe="true" style="width: 100%">
      <el-table-column prop="sno" label="学号"></el-table-column>
      <el-table-column prop="sname" label="姓名"></el-table-column>
      <el-table-column prop="cname" label="课程名"></el-table-column>
      <el-table-column prop="gradePo" label="绩点"></el-table-column>
      <el-table-column prop="grade" label="成绩"></el-table-column>
    </el-table>
    </el-scrollbar>
    <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore">查看更多</el-link></p>
  </div>
</template>

<script>
import { getGradeInfo } from 'network/teacher/getGradeInfo'
export default {
  name: 'GradeInfo',
  data() {
    return {
      dataList: []
    }
  },
  created() {
    // axios请求
    const tno = localStorage.getItem('Username')
    getGradeInfo(tno).then(res => {
      for(let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          sno: res.data.result[i].sno,
          sname: res.data.result[i].sname,
          cname: res.data.result[i].cname,
          grade: res.data.result[i].grade,
          gradePo: res.data.result[i].gradepo
        })
      }
    }).catch(err => {})
  },
  methods: {
    seeMore() {
      this.$router.push('/teacher/index/grade/' + localStorage.getItem('Username'))
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
