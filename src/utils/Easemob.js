import store from '@/store'

class Easemob {
  static instance = null
  connection = null
  config = {}
  username = ''
  WebIM = window.WebIM

  // 初始化
  constructor() {
    if (Easemob.instance) {
      return Easemob.instance
    }
    this.config = window.WebIM.config
    Easemob.instance = this
  }

  // 获取当前时间
  _getTimeString() {
    var now = new Date();
    var nowTime = now.toLocaleString();
    var date = nowTime.substring(0, 10).replace(/\//g, '-')
    var time = nowTime.substring(12, 16); //截取时间 
    return date + time
  }

  // 获取连接
  getConnection() {
    if (!this.connection) {
      const Connection = window.WebIM.connection
      this.connection = new Connection({
        isMultiLoginSessions: this.config.isMultiLoginSessions,
        https: typeof this.config.https === 'boolean' ? this.config.https : location.protocol === 'https:',
        url: this.config.xmppURL,
        isAutoLogin: true,
        heartBeatWait: this.config.heartBeatWait,
        autoReconnectNumMax: this.config.autoReconnectNumMax,
        autoReconnectInterval: this.config.autoReconnectInterval,
        apiUrl: this.config.apiURL
      })
    }
    return this.connection
  }
  // 登录
  login(username, password) {
    let that = this;
    var options = {
      apiUrl: that.config.apiURL,
      user: username,
      pwd: password,
      appKey: that.config.appkey
    };
    that.getConnection().open(options);

    this.connection.listen({
      // 连接成功回调
      onOpened(message) {
        that.username = username

        // 获取好友
        this.getRoster({
          success: roster => {
            // console.log(roster)
            // store.dispatch('SET_IM_CHART_ROSTERLIST', roster)
          },
          error: e => {
            console.log(e)
          }
        })
        // 获取群组
        this.getGroup({
          success: group => {
            // store.dispatch('SET_IM_CHART_GROUPLIST', group.data)
          },
          error: e => {
            console.log(e)
          }
        })
      },
      //收到文本消息
      onTextMessage: function ( message ) {
        console.log(message);
        message = that.createClassNameAndTime(message)
        message.groupId = message.from;
        store.dispatch('PUSH_IM_CHART_DIALOG_GROUP_MESSAGE', message);
      },    
    })


  }






  // 发送消息
  sendMessage(message, to, config = {
    type: 'txt',
    success() {},
    fail() {},
  }) {
    const that = this
    const id = this.getConnection().getUniqueId(); //生成文本的id
    let ImMessage = this.WebIM.message; // 创建文本消息
    const type = config.type

    let msg = new ImMessage(type, id)

    var option = {
      msg: message,
      to, // 接收消息对象（用户id）
      roomType: false,
      success: (messageId, msgId) => {
        let temp = {
          id: messageId,
          type,
          from: that.username,
          to,
          data: message,
          sourceMsg: message,
          error: false,
          msgId
        }
        if (config.isGroup) {
          temp.groupId = to
        } else {
          temp.groupId = temp.to
        }
        temp = that.appendMessage(temp, 'out')
        store.dispatch('PUSH_IM_CHART_DIALOG_GROUP_MESSAGE', temp)
        config.success()
      },
      fail: () => {
        config.fail()
      }
    }
    msg.set(option)
    that.getConnection().send(msg.body)
  }

  // 发送文本消息
  sendTextMessage(message, to, success = () => {}, fail = () => {}) {
    this.sendMessage(message, to, {
      type: 'txt',
      success,
      fail
    })
  }
  // 添加消息
  unShiftMessage(message) {
    const className = message.from === this.username ? 'out' : 'in'
    const temp = this.appendMessage(message, className)
    store.dispatch('UN_SHIFT_IM_CHART_DIALOG_GROUP_MESSAGE', temp)
  }
  // 发送时追加信息
  appendMessage(message, className = 'in') {
    message = this.createClassNameAndTime(message, className)
    message = this._setExt(message)
    return message
  }
    // 添加时间和来源
    createClassNameAndTime(message, className = 'in') {
      message.className = className
      message.timeStr = message.timeStr || this._getTimeString()
      message.loginUserName = this.username
      return message
    }
  
    // 设置追加信息
    _setExt(message) {
      return message
    }
  

}

export default Easemob
