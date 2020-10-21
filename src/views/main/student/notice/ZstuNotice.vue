<template>
<el-container v-if="isShow">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <el-main>
        <el-page-header @back="goBack" content="详情页面" class="page-header"></el-page-header>
        <h4>通知任务</h4>
        <el-divider></el-divider>
        <el-tabs type="border-card" @tab-click="tabClick" class="tabs-item">
          <el-tab-pane v-for="(item, index) in teachCourse" :label="item.name" :key="index">
            <el-timeline :reverse="true">
              <el-timeline-item v-for="(item, index) in dataList" :key="index" :timestamp="item.time" placement="top" :color="index===dataList.length - 1 ? '#0bbd87' : ''">
                <el-card>
                  <h4 class="task-title">{{ item.title }}</h4>
                  <p class="task-content">{{ item.content }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-footer><zstu-footer /></el-footer>
  </el-container>
</template>

<script>
import ZstuHeader from 'components/content/header/ZstuHeader'
import ZstuAside from 'components/content/aside/ZstuAside'
import ZstuFooter from 'components/content/footer/ZstuFooter'
import { timeTranslate } from 'common/timeTranslate'
import { getAllTeachNotice } from 'network/student/getAllTeachNotice'
import { getAllTeachNoticeNo } from 'network/student/getAllTeachNoticeNo'

export default {
  name: 'ZstuNotice',
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuFooter
  },
  created() {
    const sno = localStorage.getItem('Username')
    getAllTeachNotice(sno).then(res => {
      for(let i = 0; i < res.data.course.length; i++) {
        this.teachCourse.push({
          name: res.data.course[i].cname,
          cno: res.data.course[i].cno
        })
      }
      const nowTime = new Date()
      for(let i = 0; i < res.data.notice.length; i++) {
        if(timeTranslate(nowTime) >= timeTranslate(new Date(res.data.notice[i].time))) {
          this.dataList.push({
            title: res.data.notice[i].title,
            content: res.data.notice[i].content,
            time: res.data.notice[i].time,
          })
        }
      }
      this.isShow = true
    }).catch(err => {})
  },
  data() {
    return {
      isShow: false,
      teachCourse: [],
      dataList: [],
      currentCourse: 0,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    tabClick(value) {
      const index = this.teachCourse.findIndex((ele, index) => {
        return ele.name === value.label
      })
      // axios请求
      const sno = localStorage.getItem('Username')
      const cno = this.teachCourse[index].cno
      getAllTeachNoticeNo(sno, cno).then(res => {
        this.dataList = []
        const nowTime = new Date()
        for(let i = 0; i < res.data.notice.length; i++) {
          if(timeTranslate(nowTime) >= timeTranslate(new Date(res.data.notice[i].time))) {
            this.dataList.push({
              title: res.data.notice[i].title,
              content: res.data.notice[i].content,
              time: res.data.notice[i].time,
           })
          }
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
  .task-title {
    padding-bottom: 1em;
  }
  .task-content {
    padding-bottom: 2em;
    line-height: 1.4em;
  }
</style>
