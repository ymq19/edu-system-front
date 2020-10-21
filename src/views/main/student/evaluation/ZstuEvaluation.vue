<template>
  <el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>教学评价</h4>
        <el-divider></el-divider>
        <el-table :data="dataList" :stripe="true" style="width: 100%">
          <el-table-column prop="cname" label="课程"></el-table-column>
          <el-table-column prop="name" label="教师"></el-table-column>
          <el-table-column prop="evaluation" label="评价"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-rate v-model="dataList[scope.$index].value" :colors="colors" :texts="texts" show-text @change="setStars(scope.$index)"></el-rate>
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
import { getEvaluation } from 'network/student/getEvaluation'
import { setEvaluation } from 'network/student/setEvaluation'
export default {
  name: 'ZstuEvaluation',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  data() {
    return {
      isShow: false,
      dataList: [],
      dialogVisible: false,
      texts: ['非常不满意', '不满意', '一般', '满意', '非常满意'],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  created() {
    getEvaluation(localStorage.getItem('Username')).then(res => {
      let value = 1
      for(let i = 0; i < res.data.result.length; i++) {
        value = this.getValue(res.data.result[i].evaluation)
        this.dataList.push({
          cno: res.data.result[i].cno,
          cname: res.data.result[i].cname,
          tno: res.data.result[i].tno,
          name: res.data.result[i].teacher,
          evaluation: res.data.result[i].evaluation,
          value
        })
      }
      this.isShow = true
    }).catch(err => {})
  },
  computed: {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    setStars(index) {
      // console.log(this.dataList[index].value)
      const evaluation = this.getValueName(this.dataList[index].value)
      const sno = localStorage.getItem('Username')
      const tno = this.dataList[index].tno
      const data = JSON.stringify({sno, tno, evaluation})
      setEvaluation(data).then(res => {
        this.dataList[index].evaluation = evaluation
      }).catch(err => {})
    },
    getValue(value) {
      switch(value) {
        case '非常不满意': return 1
        case '不满意': return 2
        case '一般': return 3
        case '满意': return 4
        case '非常满意': return 5
        return null
      }
    },
    getValueName(value) {
      switch(value) {
        case 1: return '非常不满意'
        case 2: return '不满意'
        case 3: return '一般'
        case 4: return '满意'
        case 5: return '非常满意'
        // return null
      }
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
