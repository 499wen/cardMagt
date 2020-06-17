import Vue from 'vue'
import App from './App.vue'
// import index from './components/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

// 引入jquery
import $ from 'jquery'

Vue.use(ElementUI)

Vue.prototype.$ = $

import './plugins/axios.js'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
