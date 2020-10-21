<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside/>
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>学生选课</h4>
        <el-divider></el-divider>
        <el-table :data="dataList" :stripe="true" style="width: 100%">
          <el-table-column prop="cno" label="课程号"></el-table-column>
          <el-table-column prop="name" label="课程名"></el-table-column>
          <el-table-column prop="credit" label="学分"></el-table-column>
          <el-table-column prop="teacher" label="教师"></el-table-column>
          <el-table-column prop="capacity" label="容量"></el-table-column>
          <el-table-column fixed="right" label="操作" class="text-center">
            <template slot-scope="scope">
              <el-button @click="selectClick(scope.$index)" size="mini" :class="{delete: dataList[scope.$index].isCourse}">选课</el-button>
              <el-button type="danger" @click="deleteClick(scope.$index)" size="mini" :class="{delete: !dataList[scope.$index].isCourse}">退选</el-button>
            </template>
          </el-table-column>
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
import { getSelectionCourse } from 'network/student/getSelectionCourse'
import { addCourse } from 'network/student/addCourse'
import { deleteCourse } from 'network/student/deleteCourse'
export default {
  name: 'ZstuSelectionCourse',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  created() {
    // axios请求
    getAllCourse().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          cno: res.data.result[i].cno,
          name: res.data.result[i].cname,
          credit: res.data.result[i].ccredit,
          teacher: res.data.result[i].teacher,
          num: 0,
          isCourse: false,
          capacity: res.data.result[i].capacity
        })
      }
      this.isShow = true
      this.getCourse()
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    
  },
  data() {
    return {
      isShow: false,
      dataList: [],
      stuCourse: [],
      course: []
    }
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    selectClick(index) {
      const sno = localStorage.getItem('Username')
      const cno = this.dataList[index].cno
      const data = JSON.stringify({sno, cno})
      addCourse(data).then(res => {
        // console.log(res.data)
        this.dataList[index].isCourse = true
        this.dataList[index].capacity = parseInt(this.dataList[index].capacity.substring(0, this.dataList[index].capacity.indexOf('/'))) + 1 + this.dataList[index].capacity.substring(this.dataList[index].capacity.indexOf('/'))
      }).catch(err => {})
    },
    deleteClick(index) {
      const sno = localStorage.getItem('Username')
      const cno = this.dataList[index].cno
      const data = JSON.stringify({sno, cno})
      deleteCourse(data).then(res => {
        // console.log(res.data)
        this.dataList[index].isCourse = false
        this.dataList[index].capacity = parseInt(this.dataList[index].capacity.substring(0, this.dataList[index].capacity.indexOf('/'))) - 1 + this.dataList[index].capacity.substring(this.dataList[index].capacity.indexOf('/'))
      }).catch(err => {})
    },
    getCourse() {
      getSelectionCourse(localStorage.getItem('Username')).then(res => {
        for(let i = 0; i < res.data.course.length; i++) {
          this.course.push({
            num: res.data.course[i].num,
            cno: res.data.course[i].cno
          })
        }
        for(let i = 0; i < res.data.stuCourse.length; i++) {
          this.stuCourse.push({
            cno: res.data.stuCourse[i].cno
          })
        }
        this.repalceCourse()
      }).catch(err => {})
    },
    repalceCourse() {
      for(let i = 0 ; i < this.dataList.length; i++) {
        this.dataList[i].capacity = this.dataList[i].num + '/' + this.dataList[i].capacity
        for(let j = 0; j < this.course.length; j++) {
          // console.log('ddd')
          if (this.course[j].cno === this.dataList[i].cno) {
            this.dataList[i].num = this.course[j].num
            // 截取字符串
            this.dataList[i].capacity = this.dataList[i].num + this.dataList[i].capacity.substring(this.dataList[i].capacity.indexOf('/'))
            break
          }
        }
        for(let j = 0; j < this.stuCourse.length; j++) {
          if(this.stuCourse[j].cno === this.dataList[i].cno) {
            this.dataList[i].isCourse = true
            break
          }
        }
      }
    },
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
  /* 显示删除按钮 */
  .delete {
    display: none;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
</style>
