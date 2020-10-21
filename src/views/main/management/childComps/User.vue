<template>
  <div>
    <h4>用户</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
    <el-tabs type="border-card">
      <el-tab-pane label="学生">
        <el-table :data="dataList" :stripe="true" style="width: 100%">
          <el-table-column prop="username" label="学号"></el-table-column>
          <el-table-column prop="name" label="昵称"></el-table-column>
        </el-table>
        <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore('student')">查看更多</el-link></p>
      </el-tab-pane>
      <el-tab-pane label="教师">
        <el-table :data="dataListTech" :stripe="true" style="width: 100%">
          <el-table-column prop="username" label="工号"></el-table-column>
          <el-table-column prop="name" label="昵称"></el-table-column>
        </el-table>
        <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore('teacher')">查看更多</el-link></p>
      </el-tab-pane>
      <el-tab-pane label="管理员">
        <el-table :data="dataListMa" :stripe="true" style="width: 100%">
          <el-table-column prop="username" label="工号"></el-table-column>
          <el-table-column prop="name" label="昵称"></el-table-column>
        </el-table>
        <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore('management')">查看更多</el-link></p>
      </el-tab-pane>
    </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script>
import { getUserStudent } from 'network/management/getUserStudent'
import { getUserMana } from 'network/management/getUserMana'
import { getUserTech } from 'network/management/getUserTech'
export default {
  name: 'User',
  data() {
    return {
      dataList: [],
      dataListMa: [],
      dataListTech: []
    }
  },
  created() {
    // axios请求
    getUserStudent().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataList.push({
          username: res.data.result[i].username,
          name: res.data.result[i].name,
        })
      }
    }).catch(err => {
      console.log(err)
    })
    getUserMana().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataListMa.push({
          username: res.data.result[i].username,
          name: res.data.result[i].name,
        })
      }
    }).catch(err => {
      console.log(err)
    })
    getUserTech().then(res => {
      for (let i = 0; i < res.data.result.length; i++) {
        this.dataListTech.push({
          username: res.data.result[i].username,
          name: res.data.result[i].name,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    seeMore(userType) {
      // 路由跳转
      this.$router.push('/super-user/index/user/' + userType)
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
