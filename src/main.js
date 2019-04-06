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

Vue.prototype.$alert = function(title, fn) {
  wx.showModal({
    title: "提示",
    content: title,
    success(res) {
      if (fn != null) {
        fn();
      }
      if (res.confirm) {
        // console.log("用户点击确定");
      } else if (res.cancel) {
        //  console.log("用户点击取消");
      }
    }
  });
};

Vue.prototype.$alert = function(title, fn) {
  wx.showModal({
    title: "提示",
    showCancel: false,
    content: title,
    success(res) {
      if (fn != null) {
        fn();
      }
    }
  });
};
