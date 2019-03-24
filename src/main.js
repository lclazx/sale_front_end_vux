// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { WechatPlugin, AjaxPlugin } from 'vux'
import wechat_utils from './utils/wechat_utils'
import sale_utils from './utils/sale_utils'
sale_utils.getProjects();
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
wechat_utils.init_wechat(Vue);
wechat_utils.init_interceptor();
FastClick.attach(document.body)
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')