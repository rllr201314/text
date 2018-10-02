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
      sessionStorage.token = token
    },
    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')

    },
    set_mobile(state, mobile) {
      state.mobile = mobile
      sessionStorage.mobile = mobile;
    },
    del_mobile(state) {
      state.mobile = ''
      sessionStorage.removeItem('mobile');
    },
    changeLogin(state,data){
      state.isLogin = data
      sessionStorage.i = data
    }
  }
})
