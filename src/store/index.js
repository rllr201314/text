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
    isRefresh:false,//判断是否强制刷新，列表调转详情缓存 刷新完要重新请求
    groupMessageMap: {}, // 聊天信息集合
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
    set_refresh(state,opt){
      state.isRefresh = opt;
    },
    PUSH_IM_CHART_DIALOG_GROUP_MESSAGE(state, {message, groupId}) { // 用户聊天信息
      let chart = state.groupMessageMap[groupId] || []
      chart.push(message)
      Vue.set(state.groupMessageMap, groupId, chart)
    },
    UN_SHIFT_IM_CHART_DIALOG_GROUP_MESSAGE(state, {message, groupId}) { // 用户聊天信息
      let chart = state.groupMessageMap[groupId] || []
      chart.unshift(message)
      Vue.set(state.groupMessageMap, groupId, chart)
    },
  },
  actions:{
    // 添加消息
    PUSH_IM_CHART_DIALOG_GROUP_MESSAGE({commit}, message) { // 聊天信息组
      const groupId =message.groupId;
      const ext =message.ext;
      delete message.ext
      commit('PUSH_IM_CHART_DIALOG_GROUP_MESSAGE', {groupId, message})
      // commit('SET_IM_CHART_EXT_MAP', {groupId, ext}) // 设置附加消息
    },
    
    UN_SHIFT_IM_CHART_DIALOG_GROUP_MESSAGE({commit}, message) { // 聊天信息组
      const groupId = message.groupId;
      const ext = message.ext;
      delete message.ext
      commit('UN_SHIFT_IM_CHART_DIALOG_GROUP_MESSAGE', {groupId, message})
      // commit('SET_IM_CHART_EXT_MAP', {groupId, ext}) // 设置附加消息
    },
  },
  getters:{
    GET_IM_CHART_DIALOG_GROUP_MESSAGE: (state) => (groupId) => { // 获取消息组
      if (groupId) {
        return state.groupMessageMap[groupId] || []
      }
      return []
    },
  }
})
