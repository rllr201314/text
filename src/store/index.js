import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    mobile: ''
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
      sessionStorage.mobile = mobile
    }
  }
})
