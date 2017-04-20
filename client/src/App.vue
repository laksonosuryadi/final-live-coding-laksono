<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Navbar id="navi" :statusLoginNav="statusLogin" @logout='setLogout'></Navbar>
    <router-view @login='setLogin'></router-view>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      statusLogin: false
    }
  },
  methods: {
    setLogin() {
      this.statusLogin = true
    },
    setLogout() {
      localStorage.clear()
      this.statusLogin = false
      window.location = '/#/'
    },
    checkLogin: function(){
      if(localStorage.getItem('token')){
        this.statusLogin = true;
      } else {
        this.statusLogin = false;
      }
    }
  },
  mounted() {
    this.checkLogin()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#navi {
  color: #FFFFFF
}
</style>
