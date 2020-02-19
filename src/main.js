import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueUeditorWrap from 'vue-ueditor-wrap'
import './plugins/element.js'
import './assets/css/common.css'

import api from './api'
Vue.prototype.$api=api
Vue.config.productionTip = false
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
// 强刷浏览器 vuex里token会哦清空，localstorage存储到vuex
if(localStorage.getItem('token')){
  store.commit('LoginModule/setToken',localStorage.getItem('token'))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

