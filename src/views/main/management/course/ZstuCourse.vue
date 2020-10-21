<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>课程</h4>
        <el-divider></el-divider>
        <el-table :data="dataList" :stripe="true" style="width: 100%" >
          <el-table-column prop="cno" label="课程号"></el-table-column>
          <el-table-column prop="name" label="课程名"></el-table-column>
          <el-table-column prop="credit" label="学分"></el-table-column>
          <el-table-column prop="preCourse" label="先修课"></el-table-column>
          <el-table-column prop="tno" label="教师编号"></el-table-column>
          <el-table-column prop="teacher" label="教师"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.$index)" size="mini">编辑</el-button>
              <el-button @click="deleteClick(scope.$index)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p class="add-more"><el-link type="primary" icon="el-icon-plus" @click="addMore">新增课程</el-link></p>
        <zstu-dialog @dialogVisibleClick="dialogVisibleClick" @editDialog="editDialog" @searchList="searchList" @teacherSearch="teacherSearch" title="课程信息" :cnoVisible="true" :form="form" :course="course" :teacher="teacher" :dialogFormVisible="dialogFormVisible" />
        <zstu-dialog @dialogVisibleClick="dialogAddVisibleClick" @editDialog="addCourse" @searchList="searchList" @teacherSearch="teacherSearch" title="新增课程" :cnoVisible="false" :dialogFormVisible="dialogAddCourseVisible" :course="course" :teacher="teacher"/>
      </el-main>
    </el-container>
    <el-footer><zstu-footer /></el-footer>
  </el-container>
</template>

<script>
import ZstuHeader from 'components/content/header/ZstuHeader'
import ZstuAside from 'components/content/aside/ZstuAside'
import ZstuFooter from 'components/content/footer/ZstuFooter'
import ZstuDialog from 'components/common/ZstuDialog'
import { getAllCourse } from 'network/student/getAllCourse'
import { deleteCourse } from 'network/management/deleteCourse'
import { setCourseInfo } from 'network/management/setCourseInfo'
import { addCourseInfo } from 'network/management/addCourseInfo'
import { getTeacherName } from 'network/management/getTeacherName'
export default {
  name: 'ZstuCourse',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter,
    ZstuDialog
  },
  data() {
    return {
      dataList: [],
      form: {},
      isShow: false,
      course: '无',
      teacher: '无',
      currentIndex: 0,
      dialogFormVisible: false,
      dialogAddCourseVisible: false
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
          cpno: res.data.result[i].cpno,
          preCourse: res.data.result[i].prename ? res.data.result[i].prename : '无',
          tno: res.data.result[i].tno,
          teacher: res.data.result[i].teacher,
          capacity: res.data.result[i].capacity
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
    },
    editClick(index) {
      this.form = Object.assign({}, this.dataList[index])
      this.currentIndex = index
      this.course = this.dataList[index].preCourse
      this.tno = this.dataList[index].tno
      this.teacher = this.dataList[index].teacher
      this.dialogFormVisible = true
    },
    deleteClick(index) {
      this.$confirm('此操作不可逆，将删除该课程, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // axios请求删除该用户
          const cno = this.dataList[index].cno
          deleteCourse(cno).then(res => {
            this.dataList.splice(index, 1)
            this.deleteList(cno)
          }).catch(err => {

          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteList(cno) {
      for(let i = 0; i <= this.dataList.length; i++) {
        if(this.dataList[i].cpno === cno) {
          this.dataList[i].preCourse = '无'
        }
      }
    },
    editDialog(form) {
      this.$confirm('此操作将修改课程信息，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.preCourse = this.course
        this.form.teacher = this.teacher
        const data = JSON.stringify(this.form)
        // axios请求
        setCourseInfo(this.form.cno, data).then(res => {
          // 替代listData[index]，不能用下标，vue不能实时渲染
          this.dataList.splice(this.currentIndex, 1, form)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '课程信息修改成功!'
          })
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
    searchList(cpno) {
      let flag = 0
      let min = 0
      let max = this.dataList.length - 1
      if(parseInt(this.dataList[parseInt(max / 2)].cno) >= parseInt(cpno)) {
        max = parseInt(max / 2)
      } else {
        min = parseInt(max / 2)
      }
      for(let i = min; i <= max; i++) {
        if(this.dataList[i].cno === cpno) {
          this.course = this.dataList[i].name
          // this.teacher = this.dataList[i].teacher
          flag = 1
          break
        }
      }
      if(!flag) {
        this.course = '无'
      }
    },
    // 远程搜索
    teacherSearch(tno) {
      getTeacherName(tno).then(res => {
        // console.log(res.data)
        res.data.result.length > 0 ? this.teacher = res.data.result[0].name : this.teacher = '无'
      }).catch(err => {})
    },
    dialogVisibleClick() {
      this.dialogFormVisible = false
    },
    dialogAddVisibleClick() {
      this.dialogAddCourseVisible = false
    },
    addMore() {
      this.dialogAddCourseVisible = true
    },
    sortCno(prop) {
      return (a, b) => {
        const value1 = a[prop]
        const value2 = b[prop]
        return value1 - value2
      }
    },
    // 新增课程
    addCourse(form) {
      if(form.name === '' || form.cno === '' || this.form.tno === '' || this.teacher === '无') {
        return
      }
      this.$confirm('此操作将新增课程，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        form.preCourse = this.course
        form.teacher = this.teacher
        const data = JSON.stringify(form)
        // axios请求
        addCourseInfo(data).then(res => {
          // this.dataList.splice(this.currentIndex, 1, form)
          this.dataList.push({
            cno: form.cno,
            name: form.name,
            credit: form.credit,
            preCourse: this.course,
            tno: form.tno,
            teacher: this.teacher,
            capacity: form.capacity
          })
          // 从小到大排序
          this.dataList.sort(this.sortCno('cno'))
          this.dialogAddCourseVisible = false
          this.$message({
            type: 'success',
            message: '新增课程成功！'
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
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
  .add-more {
    text-align: right;
    margin-top: .5em;
  }
</style>
