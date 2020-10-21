<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>课程</h4>
        <el-divider></el-divider>
        <el-table :data="dataList" :stripe="true" style="width: 100%">
          <el-table-column prop="cno" label="课程号"></el-table-column>
          <el-table-column prop="name" label="课程名"></el-table-column>
          <el-table-column prop="credit" label="学分"></el-table-column>
          <el-table-column prop="preCourse" label="先修课"></el-table-column>
          <el-table-column prop="teacher" label="教师"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-footer><zstu-footer /></el-footer>
  </el-container>
</template>

<script>
import ZstuHeader from 'components/content/header/ZstuHeader'
import ZstuAside from 'components/content/aside/ZstuAside'
import ZstuFooter from 'components/content/footer/ZstuFooter'
import { getAllCourse } from 'network/student/getAllCourse'
export default {
  name: 'ZstuCourse',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  data() {
    return {
      isShow: false,
      dataList: []
    }
  },
  created() {
    // axios请求
    getAllCourse().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          cno: res.data.result[i].cno,
          name: res.data.result[i].cname,
          credit: res.data.result[i].ccredit,
          preCourse: res.data.result[i].prename ? res.data.result[i].prename : '无',
          teacher: res.data.result[i].teacher
        })
      }
      this.isShow = true
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .el-main {
    color: #333;
    text-align: center;
  }
  .page-header {
    margin-bottom: 1em;
  }
</style>