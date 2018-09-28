// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'

Vue.use(Vuex)

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = store.state.token;
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
// 判断是不是不是已登陆
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证     
    if (store.state.isLogin == '1') { // 已经登陆       
      next() // 正常跳转到你设置好的页面     
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      next({
        path: '/account-login',
        query: {
          Rurl: to.fullPath
        }
      })
    }
  } else {
    next()
  }
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
