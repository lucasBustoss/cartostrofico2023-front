import Home from '@/components/home/Home';
import Auth from '@/components/auth/Auth';

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', 
      name: 'home',
      component: Home
    },
    {
      path: '/auth', 
      name: 'auth',
      component: Auth,
    },
  ]
})