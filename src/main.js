import Vue from 'vue'
import App from './App'
import WXrequest from './utils/wx-request'
import URL from './utils/url'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.$httpWX = WXrequest
Vue.prototype.$url = URL.URL
