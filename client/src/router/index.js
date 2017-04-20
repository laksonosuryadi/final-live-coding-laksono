import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      props: true
    }
  ]
})
