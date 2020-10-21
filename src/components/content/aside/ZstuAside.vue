<template>
  <el-aside>
    <div class="profile">
      <img :src="imgSrc" alt="头像" class="image">
      <p class="name">{{ getName }}</p>
      <p class="sno">{{ getSno }}</p>
    </div>
    <el-button class="edit-profile" @click="edit" :loading="isLoading">编辑个人资料</el-button>
  </el-aside>
</template>

<script>
export default {
  name: 'ZstuAside',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  activated() {
    
  },
  data() {
    return {
    }
  },
  computed: {
    getName() {
      return localStorage.getItem('Name')
    },
    getSno() {
      return localStorage.getItem('Username')
    },
    imgSrc() {
      if(this.$store.state.avatarUrl !== '') {
        return this.$store.state.avatarUrl
      }
      return localStorage.getItem('AvatarUrl') !== 'null' ? localStorage.getItem('AvatarUrl') : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    edit() {
      // 编辑个人资料(路由跳转)
      if (localStorage.getItem('UserType') === 'stu') {
        this.$router.push('/index/profile/' + localStorage.getItem('Username'))
      } else if (localStorage.getItem('UserType') === 'mana') {
        this.$router.push('/super-user/index/profile/' + localStorage.getItem('Username'))
      } else if (localStorage.getItem('UserType') === 'teach') {
        this.$router.push('/teacher/index/profile/' + localStorage.getItem('Username'))
      }
    }
  }
}
</script>

<style scoped>
  .image {
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .el-aside {
    color: #333;
    padding: 14px;
    overflow: hidden;
  }
  .name {
    font-size: 26px;
    line-height: 30px;
    font-weight: 1000;
    padding: .2em;
  }
  .sno {
    font-size: 20px;
    color: #666;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    padding: .2em;
  }
  .profile {
    border: 1px solid #e1e4e8;
    border-radius: 5px;
  }
  .edit-profile {
    width: 100%;
    margin-top: 1.5em;
    margin-bottom: 1em;
    color: #333;
    font-weight: 800;
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
  }
  .edit-profile:hover, .edit-profile:focus {
    border: 1px #DCDFE6 solid;
    background-image: none;
  }
</style>
