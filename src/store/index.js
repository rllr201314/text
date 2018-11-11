import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    mobile: '',
    isLogin:'',
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.token = token
    },
    del_token(state) {
      state.token = ''
      localStorage.removeItem('token')

    },
    set_mobile(state, mobile) {
      state.mobile = mobile
      localStorage.mobile = mobile;
    },
    del_mobile(state) {
      state.mobile = ''
      localStorage.removeItem('mobile');
    },
    changeLogin(state,data){
      state.isLogin = data
      localStorage.i = data
    }
  }
})
