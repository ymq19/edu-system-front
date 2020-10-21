<template>
  <div class="footer" :style="colorSelect">
    <p>
      版权所有 &copy; 2020 Alex Yu
    </p>
  </div>
</template>

<script>
export default {
  name: 'ZstuFooter',
  data() {
    return {
      // colorSelect: {
      //   backgroundColor: localStorage.getItem('SystemColor') ? localStorage.getItem('SystemColor') : '#B3C0D1'
      // }
    }
  },
  computed: {
    colorSelect() {
      if(this.$store.state.color !== '' && this.$store.state.color !== null) {
        return {
          backgroundColor: this.$store.state.color
        }
      } else if (localStorage.getItem('SystemColor')) {
        return {
          backgroundColor: localStorage.getItem('SystemColor')
        }
      }
      return {
        backgroundColor: '#B3C0D1'
      }
    }
  }
}
</script>

<style scpoed>
  .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
</style>