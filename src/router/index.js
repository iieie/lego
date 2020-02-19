import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../pages/Layout'
import ProductSelect from '../pages/ProductSelect'
import Params from '../pages/Params'
import ContentCatagory from '../pages/ContentCatagory'

import store from '../store'
// import Login from '../pages/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'/',
        name:'ProductSelect',
        component: ProductSelect,
        meta:{
          isLogin:true
        }
      },
      {
        path:'params',
        name:'Params',
        component: Params,
        meta:{
          isLogin:true
        }
      },
      {
        path:'content',
        name:'ContentCatagory',
        component: ContentCatagory,
        meta:{
          isLogin:true
        }
      },

    ]

  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:'active'
})

/**
 * 路由权限
 */
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    const token=store.state.LoginModule.token;
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})
export default router
