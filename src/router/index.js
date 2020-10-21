import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由懒加载
const Login = () => import('views/login/Login')
const Index = () => import('views/main/Index')
const SuperIndex = () => import('views/main/SuperIndex')
const Reset = () => import('components/content/Reset')
const ZstuProfile = () => import('views/main/student/profile/ZstuProfile')
const ManaProfile = () => import('views/main/management/profile/ZstuProfile')
const ZstuGrade = () => import('views/main/student/grade/ZstuGrade')
const ZstuCourse = () => import('views/main/student/course/ZstuCourse')
const ZstuNotice = () => import('views/main/student/notice/ZstuNotice')
const ZstuSelectionCourse = () => import('views/main/student/selection/ZstuSelectionCourse')
const ZstuEvaluation = () => import('views/main/student/evaluation/ZstuEvaluation')

const UserType = () => import('views/main/management/userType/UserType')
const ZstuStudentInfo = () => import('views/main/management/studentInfo/ZstuStudentInfo')
const ManaCourse = () => import('views/main/management/course/ZstuCourse')
const ManaGrade = () => import('views/main/management/grade/ZstuGrade')

const TeachIndex = () => import('views/main/TeacherIndex')
const TeachProfile = () => import('views/main/teacher/profile/ZstuProfile')
const TeachTasks = () => import('views/main/teacher/tasks/ZstuTasks')
const TeachGrade = () => import('views/main/teacher/grade/ZstuGrade')

// 安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    meta: {
      title: '登录 | 2018329621030'
    },
    component: Login
  },
  {
    path: '/login/reset',
    meta: {
      title: '重置密码 | 2018329621030'
    },
    component: Reset
  },
  {
    path: '/index',
    meta: {
      title: '主页 | 2018329621030'
    },
    component: Index
  },
  {
    path: '/super-user/index',
    meta: {
      title: '主页 | 2018329621030'
    },
    component: SuperIndex
  },
  {
    path: '/index/profile/:sno',
    meta: {
      title: '个人信息 | 2018329621030'
    },
    component: ZstuProfile
  },
  {
    path: '/super-user/index/profile/:mno',
    meta: {
      title: '个人信息 | 2018329621030'
    },
    component: ManaProfile
  },
  {
    path: '/index/grade/:sno',
    meta: {
      title: '成绩 | 2018329621030'
    },
    component: ZstuGrade
  },
  {
    path: '/index/course',
    meta: {
      title: '课程 | 2018329621030'
    },
    component: ZstuCourse
  },
  {
    path: '/index/notice/:sno',
    meta: {
      title: '通知任务 | 2018329621030'
    },
    component: ZstuNotice
  },
  {
    path: '/index/selection/course',
    meta: {
      title: '学生选课 | 2018329621030'
    },
    component: ZstuSelectionCourse
  },
  {
    path: '/index/teaching/evaluation',
    meta: {
      title: '教学评价 | 2018329621030'
    },
    component: ZstuEvaluation
  },

  // 管理员
  {
    path: '/super-user/index/user/:userType',
    meta: {
      title: '用户 | 2018329621030'
    },
    component: UserType
  },
  {
    path: '/super-user/index/info/student',
    meta: {
      title: '学生信息 | 2018329621030'
    },
    component: ZstuStudentInfo
  },
  {
    path: '/super-user/index/course',
    meta: {
      title: '课程 | 2018329621030'
    },
    component: ManaCourse
  },
  {
    path: '/super-user/index/grade',
    meta: {
      title: '学生成绩 | 2018329621030'
    },
    component: ManaGrade
  },

  // 教师
  {
    path: '/teacher/index',
    meta: {
      title: '主页 | 2018329621030'
    },
    component: TeachIndex
  },
  {
    path: '/teacher/index/profile/:tno',
    meta: {
      title: '个人信息 | 2018329621030'
    },
    component: TeachProfile
  },
  {
    path: '/teacher/index/tasks/:tno',
    meta: {
      title: '教学任务 | 2018329621030'
    },
    component: TeachTasks
  },
  {
    path: '/teacher/index/grade/:tno',
    meta: {
      title: '成绩打分 | 2018329621030'
    },
    component: TeachGrade
  }
]

// 创建对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 简单配置

NProgress.inc(0.2)
NProgress.configure({ easing: 'cubic-bezier', speed: 500, showSpinner: false })

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 设置网站标题
  NProgress.start()
  if(to.meta.title) {
    document.title = to.meta.title
  }
  // TOKEN有效，直接进入主页
  if(to.path === '/login' && localStorage.getItem('Authorization')) {
    if(localStorage.getItem('UserType') === 'stu') {
      router.replace('/index')
    } else if(localStorage.getItem('UserType') === 'mana') {
      router.replace('/super-user/index')
    } else if(localStorage.getItem('UserType') === 'teach') {
      router.replace('/teacher/index')
    }
  }
  if(to.path !== '/login' && !localStorage.getItem('Authorization')) {
    router.replace('/login')
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
