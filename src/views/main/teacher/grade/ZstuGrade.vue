<template>
<el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>成绩打分</h4>
        <el-divider></el-divider>
        <el-tabs type="border-card" @tab-click="tabClick" class="tabs-item">
          <el-tab-pane v-for="(item, index) in teachCourse" :label="item.name" :key="index">
            <el-table :data="dataList" :stripe="true" style="width: 100%">
              <el-table-column prop="sno" label="学号"></el-table-column>
              <el-table-column prop="sname" label="姓名"></el-table-column>
              <el-table-column prop="gradePo" label="绩点"></el-table-column>
              <el-table-column prop="grade" label="成绩"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="editGrade(scope.$index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-dialog title="成绩打分" :visible.sync="dialogFormVisible" width="30%">
          <el-form :model="form" ref="form">
            <el-form-item label="成绩">
              <el-input-number v-model="form.grade" autocomplete="off" controls-position="right" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="绩点">
              <el-rate v-model="gradePo" disabled show-score text-color="#ff9900" score-template="{value}" class="rate-star"></el-rate>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitProfile(currentIndex)">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
    <el-footer><zstu-footer /></el-footer>
  </el-container>
</template>

<script>
import ZstuHeader from 'components/content/header/ZstuHeader'
import ZstuAside from 'components/content/aside/ZstuAside'
import ZstuFooter from 'components/content/footer/ZstuFooter'
import { getAllGradeInfo } from 'network/teacher/getAllGradeInfo'
import { getAllGradeInfoNo } from 'network/teacher/getAllGradeInfoNo'
import { setGradeInfo } from 'network/teacher/setGradeInfo'

export default {
  name: 'ZstuTasks',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  created() {
    const tno = localStorage.getItem('Username')
    getAllGradeInfo(tno).then(res => {
      for(let i = 0; i < res.data.course.length; i++) {
        this.teachCourse.push({
          name: res.data.course[i].cname,
          cno: res.data.course[i].cno
        })
      }
      for(let i = 0; i < res.data.grade.length; i++) {
        this.dataList.push({
          sno: res.data.grade[i].sno,
          sname: res.data.grade[i].sname,
          grade: res.data.grade[i].grade,
          gradePo: res.data.grade[i].gradepo
        })
      }
      this.isShow = true
    }).catch(err => {})
  },
  data() {
    return {
      isShow: false,
      teachCourse: [],
      dataList: [],
      form: {
        grade: 60
      },
      currentCourse: 0,
      currentIndex: 0,
      dialogFormVisible: false
    }
  },
  computed: {
    gradePo() {
      return this.form.grade < 60 ? 0 : (this.form.grade - 60) / 10 + 1
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    editGrade(index) {
      this.form = Object.assign({}, this.dataList[index])
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    submitProfile(index) {
      if(this.form.title === null || this.form.title === '' || this.form.content === null || this.form.content === '') {
        return
      }
      this.$confirm('此操作将提交成绩，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const sno = this.dataList[index].sno
        const cno = this.teachCourse[this.currentCourse].cno
        const grade = this.form.grade
        const gradePo = this.form.grade < 60 ? 0 : (this.form.grade - 60) / 10 + 1
        // 修改绩点
        this.form.gradePo = gradePo
        const data = JSON.stringify({ grade, gradePo })
        setGradeInfo(sno, cno, data).then(res => {
          // console.log(res)
          this.dataList.splice(index, 1, this.form)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '成绩提交成功!'
          })
        }).catch(err => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    tabClick(value) {
      const index = this.teachCourse.findIndex((ele, index) => {
        return ele.name === value.label
      })
      this.currentCourse = index
      // axios请求
      const tno = localStorage.getItem('Username')
      const cno = this.teachCourse[index].cno
      getAllGradeInfoNo(tno, cno).then(res => {
        this.dataList = []
        for(let i = 0; i < res.data.grade.length; i++) {
          this.dataList.push({
            sno: res.data.grade[i].sno,
            sname: res.data.grade[i].sname,
            grade: res.data.grade[i].grade,
            gradePo: res.data.grade[i].gradepo
          })
        }
      }).catch(err=>({}))
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
  .rate-star {
    transform: translateY(50%);
  }
</style>
