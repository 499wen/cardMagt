import Vue from 'vue'
import App from './App.vue'
// import index from './components/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

import VueRulerTool from 'vue-ruler-tool'

// ---------------自定义指令------------------
import { vDrag } from './plugins/dray.js' //引入
Vue.directive('drag', vDrag) // 拖拽

// 引入jquery
import $ from 'jquery'

Vue.use(Avue);
Vue.use(ElementUI)
Vue.component('VueRulerTool', VueRulerTool)
Vue.config.productionTip = false
import Print from './plugins/print.js'
Vue.use(Print)

Vue.prototype.$ = $

import './plugins/axios.js'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
