<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>{{ userType }}用户</h4>
        <el-divider></el-divider>
        <el-table :data="dataList" :stripe="true" style="width: 100%">
          <el-table-column prop="username" :label="noType"></el-table-column>
          <el-table-column prop="name" label="昵称"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.$index)" size="mini">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="userType+'信息'" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="form" ref="form">
            <el-form-item :label="noType">
              <el-input v-model="form.username" autocomplete="off" :placeholder="'请输入' + noType" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入昵称" clearable="clearable"></el-input>
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
import { getAllUserType } from 'network/management/getAllUserType'
import { setUserProfile } from 'network/management/setUserProfile'
export default {
  name: 'ZstuCourse',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  data() {
    return {
      dataList: [],
      isShow: false,
      form: {},
      currentIndex: 0,
      dialogFormVisible: false
    }
  },
  computed: {
    userType() {
      if (this.$route.params.userType === 'student') {
        return '学生'
      } else if (this.$route.params.userType === 'management') {
        return '管理员'
      } else if (this.$route.params.userType === 'teacher') {
        return '教师'
      } 
    },
    noType() {
      if (this.$route.params.userType === 'student') {
        return '学号'
      } else {
        return '工号'
      }
    }
  },
  created() {
    // axios请求
    getAllUserType(this.$route.params.userType).then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          username: res.data.result[i].username,
          name: res.data.result[i].name,
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
      this.dialogFormVisible = true
    },
    submitProfile(index) {
      if(this.form.name === '') {
        return
      }
      this.$confirm('此操作将修改用户昵称，是否继续','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const name = this.form.name
        const userType = this.$route.params.userType
        const username = this.form.username
        const data = JSON.stringify({name})
        // axios请求
        setUserProfile(userType, username, data).then(res => {
          // 替代listData[index]，不能用下标，vue不能实时渲染
          this.dataList.splice(index, 1, this.form)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '用户信息修改成功!'
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
</style>
