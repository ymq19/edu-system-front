<template>
  <div id="app">
    <el-backtop target="#app" :style="colorSelect"></el-backtop>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log("ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ʕ•̫͡•ʔ❤ʕ•̫͡•ʔ ​​​")
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

<style>
@import 'assets/css/base.css';
#app {
  height: 100vh;
  overflow-x: hidden;
}
.fade-enter-active, .fade-leave-avtive {
  transition: all .6s;
  -moz-transition: all .6s; /* Firefox 4 */
  -webkit-transition: all .6s; /* Safari 和 Chrome */
  -o-transition: all .6s; /* Opera */
}
.fade-enter, .fade-leave-to {
  transform: translateY(-2%);
  -ms-transform: translateY(-2%);	/* IE 9 */
  -moz-transform: translateY(-2%); 	/* Firefox */
  -webkit-transform: translateY(-2%); /* Safari 和 Chrome */
  -o-transform: translateY(-2%); 	/* Opera */
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  transform: translateY(0);
  -ms-transform: translateY(0);	/* IE 9 */
  -moz-transform: translateY(0); 	/* Firefox */
  -webkit-transform: translateY(0); /* Safari 和 Chrome */
  -o-transform: translateY(0); 	/* Opera */
  opacity: 1;
}
</style>
