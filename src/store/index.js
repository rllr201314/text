import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    mobile: '',
    isLogin: '',
    time: '',
    hint:1,
    // 提交的数据
    list_request: {
      page: 1,
      rows: 10,
      category_id: "",
      deal_type: "",
      client_id: "",
      operation_id: "",
      area_id: "",
      server_id: "",
      is_stage: "",
      is_safe: "",
      is_compact: "",
      sell_type: "",
      is_bind: "",
      role_level: "",
      begin_price: "",
      end_price: "",
      sort_price: "",
      sort_collection: "",
      is_video: "",
      person_sex:"",
      faction_id:"",
      content: '',
      extend_attribute:[],
    },
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.token = token;
    },
    del_token(state) {
      state.token = ''
      localStorage.removeItem('token');
    },
    set_mobile(state, mobile) {
      state.mobile = mobile
      localStorage.mobile = mobile;
    },
    del_mobile(state) {
      state.mobile = ''
      localStorage.removeItem('mobile');
    },
    changeLogin(state, data) {
      state.isLogin = data
      localStorage.i = data
    },
    set_hint(state){
      state.hint = 1;
    },
    sub_hint(state){
      state.hint = 0;
    },
  }
})
