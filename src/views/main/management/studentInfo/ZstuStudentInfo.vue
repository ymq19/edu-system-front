<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>学生信息</h4>
        <el-divider></el-divider>
        <el-table :data="listData" border style="width: 100%">
          <el-table-column
            fixed
            prop="sno"
            label="学号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="80">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="80">
          </el-table-column>
          <el-table-column
            prop="admi_date"
            label="入学时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="school"
            label="学院"
            width="150">
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="210">
            <template slot-scope="scope">
              <el-button @click="lookClick(scope.$index)" size="mini">查看</el-button>
              <el-button @click="editClick(scope.$index)" size="mini">编辑</el-button>
              <el-button @click="deleteClick(scope.$index)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="学生信息" :visible.sync="dialogVisible" width="30%">
          <el-card class="box-card">
            <div>
              <p class="normal">学号：{{ form.sno }}</p>
              <p class="normal">姓名：{{ form.name }}</p>
              <p class="normal">性别：{{ form.sex }}</p>
              <p class="normal">年龄：{{ form.age }}</p>
              <p class="normal">入学日期：{{ form.admi_date }} <i class="el-icon-date"></i></p>
              <p class="normal">学院：{{ form.school }}</p>
              <p class="normal">专业：{{ form.major }}</p>
              <p class="normal">邮箱：{{ form.email }}</p>
              <p class="normal">电话：{{ form.tel }}</p>
              <p class="normal">爱好：{{ form.hobby }} <i class="el-icon-watermelon"></i></p>
              <p class="normal">简介：{{ form.intro }}</p>
            </div>
          </el-card>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="学生信息" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="学号">
              <el-input v-model="form.sno" autocomplete="off" placeholder="请输入学号" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名" clearable="clearable"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="form.sex" label="男">男性</el-radio>
              <el-radio v-model="form.sex" label="女">女性</el-radio>
              <el-radio v-model="form.sex" label="双">双性</el-radio>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="form.age" autocomplete="off" controls-position="right" :min="1" :max="120"></el-input-number>
            </el-form-item>
            <el-form-item label="入学日期">
              <el-date-picker v-model="form.admi_date" format="yyyy-M-d" value-format="yyyy-M-d" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="学院">
              <el-input v-model="form.school" autocomplete="off" placeholder="请输入学院" clearable="clearable"></el-input>
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="form.major" autocomplete="off" placeholder="请输入专业" clearable="clearable"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="form.email" autocomplete="off" placeholder="请输入邮箱" clearable="clearable"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input type="tel" v-model="form.tel" autocomplete="off" placeholder="请输入电话" clearable="clearable"></el-input>
            </el-form-item>
            <el-form-item label="爱好">
              <el-input type="textarea" v-model="form.hobby" autocomplete="off" placeholder="请输入爱好" maxlength="50" show-word-limit clearable="clearable"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="form.intro" autocomplete="off" placeholder="请输入个人简介" maxlength="200" show-word-limit clearable="clearable"></el-input>
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
import { setStudentProfile } from 'network/management/setStudentProfile'
import { deleteStudent } from 'network/management/deleteStudent'
export default {
  name: 'ZstuStudentInfo',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  created() {
    // axios请求
    getAllStudentInfo().then(res => {
      for(let i = 0; i < res.data.result.length; i++) {
        this.listData.push({
          sno: res.data.result[i].sno,
          name: res.data.result[i].sname,
          sex: res.data.result[i].sex,
          age: res.data.result[i].sage,
          admi_date: res.data.result[i].admi_date,
          school: res.data.result[i].school,
          major: res.data.result[i].sdept,
          email: res.data.result[i].email,
          tel: res.data.result[i].tel,
          hobby: res.data.result[i].hobby,
          intro: res.data.result[i].intro
        })
      }
      this.isShow = true
    }).catch(err => {})
  },
  data() {
    const validateEmail =  (rule, value, callback) => {
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (this.form.email !== null && pattern.test(this.form.email) === false && this.form.email !== '') {
        callback(new Error('邮箱格式不规范'))
      } else {
        callback()
      }
    }
    const validateTel = (rule, value, callback) => {
      const pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (this.form.tel !== null && this.form.tel !== '' && pattern.test(this.form.tel) === false) {
        callback(new Error('电话格式不规范'))
      } else {
        callback()
      }
    }
    return {
      listData: [],
      isShow: false,
      dialogVisible: false,
      dialogFormVisible: false,
      currentIndex: 0,
      form: {},
      rules: {
        email: [
          { validator: validateEmail, trigger: ['blur', 'change'] }
        ],
        tel: [
          { validator: validateTel, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  // computed: {
  //   loading() {
  //     return this.$store.state.loading
  //   }
  // },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    lookClick(index) {
      // js默认引用赋值
      this.form = Object.assign({}, this.listData[index])
      this.dialogVisible = true
    },
    editClick(index) {
      this.form = Object.assign({}, this.listData[index])
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    deleteClick(index) {
      this.$confirm('此操作不可逆，将删除该学生的所有记录, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // axios请求删除该用户
          const sno = this.listData[index].sno
          deleteStudent(sno).then(res => {
            this.listData.splice(index, 1)
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
    submitProfile(index) {
      const patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      const patternTel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if ((this.form.email !== null && this.form.email !== '' && patternEmail.test(this.form.email) === false) || (this.form.tel !== null && this.form.tel !== '' && patternTel.test(this.form.tel) === false)) {
        return
      }
      this.$confirm('此操作将提交学生信息，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const name = this.form.name
        const sex = this.form.sex
        const age = this.form.age
        const admi_date = this.form.admi_date
        const school = this.form.school
        const sdept = this.form.major
        const email = this.form.email
        const tel = this.form.tel
        const hobby = this.form.hobby
        const intro = this.form.intro
        const sno = this.form.sno
        const data = JSON.stringify({name, sex, age, admi_date, school, sdept, email, tel, hobby, intro})
        // axios请求
        setStudentProfile(sno, data).then(res => {
          // 替代listData[index]，不能用下标，vue不能实时渲染
          this.listData.splice(index, 1, this.form)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '学生信息修改成功!'
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
  .normal {
    color: #555;
    line-height: 30px;
    text-align: left;
  }
</style>
