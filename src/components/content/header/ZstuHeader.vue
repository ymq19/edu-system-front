<template>
  <el-header :style="colorSelect">
    <el-row>
      <el-col :span="6">
        <div>
          <i class="web-font">浙江理工大学教务管理系统</i>
        </div>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-autocomplete v-model="state" placeholder="请输入...(暂时作为摆饰)" :fetch-suggestions="querySearchAsync"></el-autocomplete>
      </el-col>
      <el-col :span="8" :offset="4" class="text-right">
        <div>
          <el-dropdown trigger="click" v-for="(item, index) in headerMsg" :key="index" class="dropdown" @command="headerOpera">
            <span class="el-dropdown-link">
              {{ item.title }}
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in item.content" :key="index" :command="item">
                <span :class="{showlong : item === '主题色'}">{{ item }}</span>
                <el-color-picker v-model="color" show-alpha v-if="item === '主题色'" @change="changeColor" :predefine="predefineColors"></el-color-picker>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-avatar class="avatar el-dropdown-link">{{ getName | secondName }}</el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-key" command="resetPass">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-turn-off" command="loginOut">登 出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'ZstuHeader',
  data() {
    return {
      state: '',
      color: localStorage.getItem('SystemColor') ? localStorage.getItem('SystemColor') : '#B3C0D1',
      isShow: false,
      headerMsg: [],
      colorSelect: {
        backgroundColor: localStorage.getItem('SystemColor') ? localStorage.getItem('SystemColor') : '#B3C0D1'
      },
      predefineColors: [
          '#B3C0D1'
        ]
    }
  },
  created() {
    if(localStorage.getItem('UserType') === 'stu') {
      this.headerMsg = [
        {
          title: '信息维护',
          content: ['教学评价']
        },
        {
          title: '选课',
          content: ['学生选课']
        }
      ]
    } else if(localStorage.getItem('UserType') === 'mana') {
      this.headerMsg = [
        {
          title: '信息维护',
          content: ['学生成绩']
        }
      ]
    }
    this.headerMsg.push({
      title: '系统配色',
      content: ['主题色']
    })
  },
  filters: {
    secondName(value) {
      return value.substring(1,2)
    }
  },
  activated() {
    // this.getName()
  },
  computed: {
    getName() {
      return localStorage.getItem('Name')
    }
  },
  methods: {
     querySearchAsync() {
      // 查询语句
    },
    resetPass() {
      this.$router.push('/login/reset')
    },
    loginOut() {
      this.$store.commit('systemColorChange', {color: '#B3C0D1'})
      this.$store.commit('getAvatarUrl', {url: ''})
      localStorage.clear()
      this.$router.replace('/login')
    },
    changeColor() {
      this.colorSelect.backgroundColor = this.color
      const payload = {
        color: this.color
      }
      this.$store.commit('systemColorChange', payload)
    },
    handleCommand(value) {
      if (value === 'resetPass') {
        this.resetPass()
      } else if(value === 'loginOut') {
        this.loginOut()
      }
    },
    headerOpera(value) {
      if(value === '学生成绩') {
        this.$router.push('/super-user/index/grade')
      } else if(value === '学生选课') {
        this.$router.push('/index/selection/course')
      } else if(value === '教学评价') {
        this.$router.push('/index/teaching/evaluation')
      } else if(value === '主题色') {
        
      }
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    height: 200px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .dropdown {
    margin-left: 1.5em;
  }
  .avatar {
    margin-left: 1em;
    vertical-align: middle;
  }
  .showlong {
    display: inline-block;
    text-indent: -9999px;
  }
</style>
