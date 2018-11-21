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
var options={
  fullscreenEl:false, //关闭全屏按钮
  pinchToClose:false,//捏以关闭
  maxSpreadZoom:0.5,
  // closeOnVerticalDrag:false,//垂直拖动关闭
}
Vue.use(preview,options);
Vue.use(Vuex)


// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(config.method  === 'post'){
    if(!config.data){
      config.data = {};
    }
    if(store.state.token) {
      config.data.Authorization = store.state.token;
    }
    config.data = qs.stringify(config.data);
  }


  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      switch (response.data.code) {
        case 401:
          store.commit('del_token');
          if(router.currentRoute.fullPath == '/index' && store.state.hint > 0){
            mui.toast(response.data.msg, {duration: "short", type: "div"});
          }else if(store.state.hint > 0){
            store.commit('sub_hint')
            mui.alert(response.data.msg,'提示','确认',function(){
              router.push({name: "AccountLogin",});
            },'div');
          }
      }
    }
    return response;
  },
  error => {
    router.replace({name:'HomePage'})
    return Promise.reject(error.response)
  });

  // 刷新路由让页面回到顶部
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
//   document.documentElement.scrollTop = document.body.scrollTop = 0;
// })


Vue.prototype.$axios = axios;
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
  template: '<App/>',
})
