<template>
  <div>
    <h4>教学任务</h4>
    <el-divider></el-divider>
    <el-scrollbar style="height:300px">
      <el-timeline :reverse="true">
        <el-timeline-item v-for="(item, index) in dataList"  :timestamp="item.time" placement="top" :color="index===dataList.length - 1 ? '#0bbd87' : ''" :key="index">
          <el-card>
            <h4 class="task-title">{{ item.title }}</h4>
            <p class="task-content">{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
    <p class="see-more"><el-link type="primary" icon="el-icon-view" @click="seeMore">查看更多</el-link></p>
  </div>
</template>

<script>
import { getTeachNotice } from 'network/student/getTeachNotice'
import { timeTranslate } from 'common/timeTranslate'
export default {
  name: 'Notice',
  created() {
    // axios请求
    const sno = localStorage.getItem('Username')
    getTeachNotice(sno).then(res => {
      const nowTime = new Date()
      for(let i = 0; i < res.data.result.length; i++) {
        if(timeTranslate(nowTime) >= timeTranslate(new Date(res.data.result[i].time))) {
          this.dataList.push({
            title: res.data.result[i].title,
            content: res.data.result[i].content,
            time: res.data.result[i].time
          })
        }
      }
      if(this.dataList.length > 1) {
        this.dataList.splice(0, 1)
      }
    }).catch(err => {})
  },
  data() {
    return {
      dataList: [{
        time: '2020/6/6 6:30',
        title: '欢迎使用该网站',
        content: '暂无教学任务，等待老师更新哦！！！'
      }]
    }
  },
  methods: {
    seeMore() {
      this.$router.push('/index/notice/' + localStorage.getItem('Username'))
    },
  }
}
</script>

<style scoped>
  .scrollbar {
    height:300px;
  }
  .see-more {
    margin: .5em;
    text-align: right;
  }
  .task-title {
    padding-bottom: 1em;  
  }
  .task-content {
    padding-bottom: 2em;
    line-height: 1.4em;
  }
</style>