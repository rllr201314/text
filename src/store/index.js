import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    mobile: '',
    isLogin: '',
    time:'',
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
      content: '',
    },
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.token = token;
      state.time = new Date().getTime();
      localStorage.time = new Date().getTime();
    },
    del_token(state) {
      state.token = ''
      localStorage.removeItem('token');
      state.time = '';
      localStorage.removeItem('time');
    },
    set_time(state){
      state.time = new Date().getTime();
      localStorage.time = new Date().getTime();
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
    changeRequest(state,n){
      // state.list_request.item =item;
      for(var i in state.list_request){
        if(i == n.name){
          state.list_request[i] = n.value
        }
      }
    },
    // 下拉加载 上拉刷新 更改page
    addPage(state,flag){
      if(flag == 'add'){
        state.list_request.page++;
      }else if(flag == "refresh"){
        state.list_request.page = 1;
      }
    },
  }
})
