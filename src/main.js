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
  maxSpreadZoom:2
}
Vue.use(preview,options)
Vue.use(Vuex)

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(config.method  === 'post'){
    if(!config.data){
      config.data = {};
      if (store.state.token) {
        config.data.Authorization = store.state.token;
      }
    }else if(store.state.token) {
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
          router.push({
            name: 'AccountLogin',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          })
      }
    }
    return response;
  },
  error => {

    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token');
          router.replace({
            name: '/AccountLogin',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });

  // 刷新路由让页面回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
})


Vue.prototype.$axios = axios;
Vue.config.productionTip = false

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
