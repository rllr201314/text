// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'
import qs from 'qs'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import MetaInfo from 'vue-meta-info'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(MetaInfo)
var options = {
  fullscreenEl: false, //关闭全屏按钮
  pinchToClose: false, //捏以关闭
  maxSpreadZoom: 0.5,
  // closeOnVerticalDrag:false,//垂直拖动关闭
}
Vue.use(preview, options);
Vue.use(Vuex)
// 计算 html font-size 适配移动端
var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 640) deviceWidth = 640;
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';



// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (config.method === 'post') {
    if (!config.data) {
      config.data = {};
    }
    if (store.state.token) {
      config.data.Authorization = store.state.token;
    }
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// http response 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      switch (response.data.code) {
        case 401:
          store.commit('del_token');
          if (router.currentRoute.fullPath == '/' && store.state.hint > 0) {
            mui.toast(response.data.msg, {
              duration: "short",
              type: "div"
            });
          } else if (store.state.hint > 0) {
            store.commit('sub_hint');
            mui.alert(response.data.msg, '提示', '确认', function () {
              router.push({
                name: "AccountLogin",
              });
            }, 'div');
          }
          break;
      }
    }
    return response;
  },
  error => {
    router.replace({
      name: 'HomePage'
    })
    return Promise.reject(error.response)
  });



router.afterEach((to, from) => {
  const u = navigator.userAgent.toLowerCase()
  if (u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger') return
  if (to.path !== global.location.pathname) {
    location.assign(to.fullPath)
  }
})

Vue.prototype.$axios = axios;
Vue.prototype.baseURL = process.env.API_HOST;
Vue.config.productionTip = false

import common from '../static/js/common.js'
Vue.prototype.$common = common

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  metaInfo: {
    title: '看个号_手游交易平台_账号装备道具交易_手游充值_首充号_代练',
    meta: [{
      name: 'keywords',
      content: '看个号,手游交易,手游交易平台,手游账号交易,手游交易网,梦幻西游,大话西游,梦幻金币号,苹果充值,ios充值'
    }, {
      name: 'description',
      content: '看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
    }],
  },
  template: '<App/>',
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  }
})
