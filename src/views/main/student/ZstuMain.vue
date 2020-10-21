<template>
  <el-main>
    <el-row>
      <el-col :span="10">
        <profile />
      </el-col>
      <el-col :span="10" :offset="4">
        <notice />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" class="every-div">
        <course />
      </el-col>
      <el-col :span="10" :offset="4" class="every-div">
        <grade />
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import Profile from './childComps/Profile'
import Notice from './childComps/Notice'
import Course from './childComps/Course'
import Grade from './childComps/Grade'

export default {
  name: 'Main',
  data() {
    return {

    }
  },
  components: {
    Profile,
    Notice,
    Course,
    Grade
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .el-main {
    background-color: #fff;
    color: #333;
  }
  .every-div {
    margin-top: 20px;
  }
</style>
