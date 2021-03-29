import Vue from 'vue'
import App from './App'
import './assets/iconfont/iconfont.css'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import Validator from 'vue-validator'
// 导入全局样式
import '@/assets/css/global.css'
import less from 'less'
import VueCookies from 'vue-cookies'
import store from '@/store'
// 引入xss
import VueXss from 'vue-xss'
// 引入Echarts
import echarts from 'echarts'
// 导出日志
import JsonExcel from 'vue-json-excel'
// 日期转换
import Moment from 'moment'
// 引入axios
import axios from 'axios'
Vue.use(VueXss)
Vue.prototype.$echarts = echarts
Vue.component('downloadExcel', JsonExcel)
Vue.prototype.moment = Moment
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(less)
Vue.use(VueCookies)

Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.baseURL = '/api'
// axios.defaults.baseURL="http://39.97.102.209:80/api/";
Vue.use(Validator)
Vue.use(ElementUI)
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template:
    `
  <App/>
  `
})
