<template>
  <el-container v-loading="loading" element-loading-background="rgb(255, 255, 255)" v-loading.lock="true">
    <zstu-header />
    <el-container>
      <zstu-aside />
      <zstu-main />
    </el-container>
    <el-footer><zstu-footer /></el-footer>
  </el-container>
</template>

<script>
import ZstuHeader from 'components/content/header/ZstuHeader'
import ZstuAside from 'components/content/aside/ZstuAside'
import ZstuMain from './management/ZstuMain'
import ZstuFooter from 'components/content/footer/ZstuFooter'
export default {
  name: 'SuperIndex',
  data() {
    return {
      
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  components: {
    ZstuHeader,
    ZstuAside,
    ZstuMain,
    ZstuFooter
  },
  methods: {
    
  }
}
</script>

<style scoped>
  
</style>
