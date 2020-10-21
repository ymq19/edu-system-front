<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>教学任务</h4>
        <el-divider></el-divider>
        <el-tabs type="border-card" @tab-click="tabClick" class="tabs-item">
          <el-tab-pane v-for="(item, index) in teachCourse" :label="item.name" :key="index">
            <el-timeline :reverse="true">
              <el-timeline-item v-for="(item, index) in teachTasks" :key="index" :timestamp="item.time" placement="top" :color="index===teachTasks.length - 1 ? '#0bbd87' : ''">
                <el-card class="clear-fix">
                  <div class="left main-content">
                    <h4 class="task-title">{{ item.title }}</h4>
                    <p class="task-content">{{ item.content }}</p>
                  </div>
                  <p class="right">
                    <el-button type="primary" icon="el-icon-edit" circle @click="editTasks(index)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteTasks(index)"></el-button>
                  </p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
        </el-tabs>
        <p class="add-more"><el-link type="primary" icon="el-icon-plus" @click="addMore">新增教学任务</el-link></p>
        <el-dialog title="教学任务" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="form" ref="form">
            <el-form-item label="课程号">
              <el-input v-model="form.cno" autocomplete="off" placeholder="请输入课程号" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="课程名">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入课程名" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题" maxlength="50" show-word-limit :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content" autocomplete="off" placeholder="请输入内容" maxlength="500" show-word-limit :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="form.time" format="yyyy/M/d H:mm" value-format="yyyy/M/d H:mm" type="datetime" placeholder="选择日期" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitProfile(currentIndex)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增教学任务" :visible.sync="dialogForm2Visible" width="40%">
          <el-form :model="form" ref="form">
            <el-form-item label="课程号">
              <el-input v-model="form.cno" autocomplete="off" placeholder="请输入课程号" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="课程名">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入课程名" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题" maxlength="50" show-word-limit :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content" autocomplete="off" placeholder="请输入内容" maxlength="500" show-word-limit :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="form.time" format="yyyy/M/d H:mm" value-format="yyyy/M/d H:mm" type="datetime" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm2Visible = false">取 消</el-button>
            <el-button type="primary" @click="submitTasks(currentIndex)">确 定</el-button>
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
import { getAllTeachTasks } from 'network/teacher/getAllTeachTasks'
import { getAllTeachTasksNo } from 'network/teacher/getAllTeachTasksNo'
import { setTeachTasks } from 'network/teacher/setTeachTasks'
import { deleteTeachTasks } from 'network/teacher/deleteTeachTasks'
import { addTeachTasks } from 'network/teacher/addTeachTasks'

export default {
  name: 'ZstuTasks',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  created() {
    const tno = localStorage.getItem('Username')
    getAllTeachTasks(tno).then(res => {
      for(let i = 0; i < res.data.course.length; i++) {
        this.teachCourse.push({
          name: res.data.course[i].cname,
          cno: res.data.course[i].cno
        })
      }
      for(let i = 0; i < res.data.tasks.length; i++) {
        this.teachTasks.push({
          title: res.data.tasks[i].title,
          content: res.data.tasks[i].content,
          time: res.data.tasks[i].time,
        })
      }
      this.isShow = true
    }).catch(err => {})
  },
  data() {
    return {
      isShow: false,
      teachCourse: [],
      teachTasks: [],
      form: {},
      currentCourse: 0,
      currentIndex: 0,
      dialogFormVisible: false,
      dialogForm2Visible: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    editTasks(index) {
      // console.log()
      this.form = Object.assign({}, this.teachTasks[index])
      this.currentIndex = index
      this.form.cno = this.teachCourse[this.currentCourse].cno
      this.form.name = this.teachCourse[this.currentCourse].name
      this.dialogFormVisible = true
    },
    deleteTasks(index) {
      this.$confirm('此操作不可逆，将删除该教学任务, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // axios请求删除该用户
        const tno = localStorage.getItem('Username')
        const cno = this.teachCourse[this.currentCourse].cno
        const time = this.teachTasks[index].time
        const data = JSON.stringify({time})
        deleteTeachTasks(tno, cno, data).then(res => {
          this.teachTasks.splice(index, 1)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(err => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitProfile(index) {
      if(this.form.title === null || this.form.title === '' || this.form.content === null || this.form.content === '') {
        return
      }
      this.$confirm('此操作将修改教学任务，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tno = localStorage.getItem('Username')
        const cno = this.form.cno
        const time = this.form.time
        const title = this.form.title
        const content = this.form.content
        const data = JSON.stringify({ time, title, content })
        setTeachTasks(tno, cno, data).then(res => {
          // console.log(res)
          this.teachTasks.splice(index, 1, this.form)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '教学任务修改成功!'
          })
        }).catch(err => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    addMore() {
      this.form.cno = this.teachCourse[this.currentCourse].cno
      this.form.name = this.teachCourse[this.currentCourse].name
      this.dialogForm2Visible = true
    },
    submitTasks(index) {
      if(this.form.title === null || this.form.title === '' || this.form.content === null || this.form.content === '' || this.form.time === null || this.form.time === '') {
        return
      }
      this.$confirm('此操作将新增教学任务，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tno = localStorage.getItem('Username')
        const cno = this.form.cno
        const time = this.form.time
        const title = this.form.title
        const content = this.form.content
        const data = JSON.stringify({ time, title, content })
        addTeachTasks(tno, cno, data).then(res => {
          // console.log(res)
          this.teachTasks.push(this.form)
          this.dialogForm2Visible = false
          this.$message({
            type: 'success',
            message: '教学任务修改成功!'
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
      getAllTeachTasksNo(tno, cno).then(res => {
        this.teachTasks = []
        for(let i = 0; i < res.data.tasks.length; i++) {
          this.teachTasks.push({
            title: res.data.tasks[i].title,
            content: res.data.tasks[i].content,
            time: res.data.tasks[i].time,
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
  .tabs-item {
    text-align: left;
  }
  .page-header {
    margin-bottom: 1em;
  }
  .main-content {
    width: 80%;
  }
  .task-title {
    padding-bottom: 1em;
  }
  .task-content {
    padding-bottom: 2em;
    line-height: 1.4em;
  }
  .add-more {
    text-align: right;
    margin-top: .5em;
  }
</style>