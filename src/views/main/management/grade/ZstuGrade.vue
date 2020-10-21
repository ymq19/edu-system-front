<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>成绩</h4>
        <el-divider></el-divider>
        <el-collapse v-model="activeName" accordion @change="change">
          <el-collapse-item v-for="(item, index) in  dataList" :key="index" :title="item.sno + ' ' + item.name" :name="item.sno">
            <el-table :data="form" :stripe="true" style="width: 100%">
              <el-table-column prop="cno" label="课程号"></el-table-column>
              <el-table-column prop="name" label="课程名"></el-table-column>
              <el-table-column prop="gradePo" label="绩点"></el-table-column>
              <el-table-column prop="grade" label="成绩"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button @click="editClick(scope.$index)" size="mini">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
        <el-dialog title="修改成绩" :visible.sync="dialogFormVisible" width="25%">
          <el-form :model="formItem" ref="form">
            <el-form-item label="课程号">
              <el-input v-model="formItem.cno" autocomplete="off" placeholder="请输入课程号" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="课程名">
              <el-input v-model="formItem.name" autocomplete="off" placeholder="请输入课程名" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="成绩">
              <el-input-number v-model="formItem.grade" autocomplete="off" controls-position="right" :min="1" :max="100"></el-input-number>
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
import { getAllStudentInfo } from 'network/management/getAllStudentInfo'
import { getAllGrade } from 'network/student/getAllGrade'
import { setGradeProfile } from 'network/management/setGradeProfile'
export default {
  name: 'ZstuGrade',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  data() {
    return {
      isShow: false,
      dataList: [],
      form: [],
      formItem: {},
      activeName: '0',
      currentIndex: 0,
      currentSno: '',
      dialogFormVisible: false
    }
  },
  computed: {
    // GPA计算
    gradePo() {
      return this.formItem.grade < 60 ? 0 : (this.formItem.grade - 60) / 10 + 1
    }
  },
  created() {
    // axios请求
    getAllStudentInfo().then(res => {
      for(let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          sno: res.data.result[i].sno,
          name: res.data.result[i].sname,
        })
      }
      this.isShow = true
    }).catch(err => {})
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    change(sno) {
      this.activeName = ''
      if(sno === null || sno === '') {
        return
      } 
      getAllGrade({sno}).then(res => {
        this.currentSno = sno
        this.form = []
        for (let i = 0; i < res.data.result.length; i++) {
          this.form.push({
            cno: res.data.result[i].cno,
            name: res.data.result[i].cname,
            gradePo: res.data.result[i].gradepo,
            grade: res.data.result[i].grade
          })
        }
        this.$nextTick(() => {  // 结构渲染完毕后执行
          this.activeName = sno
        })
      }).catch(err => {
        console.log(err)
      })
    },
    editClick(index) {
      this.formItem = Object.assign({}, this.form[index])
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    submitProfile(index) {
      this.$confirm('此操作将修改该课成绩，是否继续','提示', {
        confirmButtonText: '提示',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const sno = this.currentSno
        const cno = this.formItem.cno
        const grade = this.formItem.grade
        const gradePo = this.formItem.grade < 60 ? 0 : (this.formItem.grade - 60) / 10 + 1
        // 修改绩点
        this.formItem.gradePo = gradePo
        const data = JSON.stringify({grade, gradePo})
        // axios请求
        setGradeProfile(sno, cno, data).then(res => {
          // 替代listData[index]，不能用下标，vue不能实时渲染
          this.form.splice(index, 1, this.formItem)
          this.dialogFormVisible = false
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
  .rate-star {
    /* vertical-align: middle; */
    transform: translateY(50%);
  }
</style>
