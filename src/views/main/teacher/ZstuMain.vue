<template>
  <el-main>
    <el-row>
      <el-col :span="10">
        <profile />
      </el-col>
      <el-col :span="10" :offset="4">
        <tasks />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" class="every-div">
        <grade-info />
      </el-col>
      <el-col :span="10" :offset="4" class="every-div">
        <!-- <course /> -->
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import Profile from './childComps/Profile'
import Tasks from './childComps/Tasks'
import GradeInfo from './childComps/GradeInfo'
export default {
  name: 'ZstuMain',
  data() {
    return {

    }
  },
  components: {
    Profile,
    Tasks,
    GradeInfo
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
