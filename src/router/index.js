import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'


if (localStorage.getItem('token')) {
  store.commit('set_token', localStorage.getItem('token'))
  store.commit('set_hint');
}

if (localStorage.getItem('mobile')) {
  store.commit('set_mobile', localStorage.getItem('mobile'))
}
// if (sessionStorage.getItem('i')) {
//   store.commit('changeLogin', sessionStorage.getItem('i'))
// }

Vue.use(Router)




export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: (resolve) => require(['@/components/HomePage'], resolve)
    },
    {
      path: '/index', //首页
      redirect: {
        name: 'HomePage'
      }
    },
    // {
    //   path:'/pc_index',
    //   name:'Pc_index',
    //   component:(resolve) => require(['@/components/PcIndex'],resolve)
    // },
    {
      path: '/good-list/:opt', //商品列表
      name: 'GoodScreen',
      component: (resolve) => require(['@/components/GoodScreen'], resolve),
      meta:{
        keepAlive:true,
        isBack:false,
      }
    },
    {
      path: '/details/:goods_id', //商品详情
      name: 'Details',
      component: (resolve) => require(['@/components/Details'], resolve),
    },
    {
      path: '/place-order', //下单
      name: 'PlaceOrderPage',
      component: (resolve) => require(['@/components/buy/PlaceOrderPage'], resolve)
    },
    {
      path: '/pay/:info', //支付 -- 支付方式
      name: 'Pay',
      component: (resolve) => require(['@/components/buy/Pay'], resolve)
    },
    {
       path: '/allinpay-addinfo', //通联支付 -- 添加信息/银行卡
       name: 'AllinpayAddInfo',
       component: (resolve) => require(['@/components/allinpay/AddCard'], resolve)
    },
    {
      path: '/allinpay-select', //通联支付 -- 选择银行卡
      name: 'AllinpaySelect',
      component: (resolve) => require(['@/components/allinpay/SeleCard'], resolve)
    },
    {
      path: '/allinpay-success', //通联支付 -- 支付成功
      name: 'AllinpaySuccess',
      component: (resolve) => require(['@/components/allinpay/PaySuccess'], resolve)
    },
    {
      path: '/allinpay-failed', //通联支付 -- 支付失败
      name: 'AllinpayFailed',
      component: (resolve) => require(['@/components/allinpay/PayFailed'], resolve)
    },
    {
      path: '/arbitration', //仲裁
      name: 'Arbitration',
      component: (resolve) => require(['@/components/buy/Arbitration'], resolve)
    },
    {
      path: '/buy-status', //买家-交易状态
      name: 'BuyTakeDelivery',
      component: (resolve) => require(['@/components/buy/buyTakeDelivery'], resolve)
    },
    {
      path: '/sell-status', //卖家-交易状态
      name: 'SellTakeDelivery',
      component: (resolve) => require(['@/components/sell/SellTakeDelivery'], resolve)
    },
    {
      path: '/buy', //出售-选择游戏
      name: 'Buy',
      component: (resolve) => require(['@/components/sell/SellPage'], resolve),
    },
    {
      path: '/sell', //出售-选择游戏
      name: 'Sell',
      component: (resolve) => require(['@/components/sell/SellPage'], resolve),
    }, {
      path: '/sell-option', //出售-选择区服
      name: 'SellOption',
      component: (resolve) => require(['@/components/sell/SellOption'], resolve),
    }, {
      path: '/sell-info', //出售-商品信息
      name: 'SellInfo',
      component: (resolve) => require(['@/components/sell/SellInfo'], resolve),
    },
    // 个人中心
    {
      path: '/my-center',
      name: 'MyCenter',
      component: (resolve) => require(['@/components/my-center/MyCenter'], resolve), 
    }, {
      path: '/my-goods', //我的商品
      name: 'MyGoods',
      component: (resolve) => require(['@/components/my-center/MyGoods'], resolve),
    }, {
      path: '/account-login', //手机号登陆
      name: 'AccountLogin',
      component: (resolve) => require(['@/components/my-center/register-login/AccountLogin'], resolve),
    }, {
      path: '/code-login', //验证码登陆
      name: 'CodeLogin',
      component: (resolve) => require(['@/components/my-center/register-login/CodeLogin'], resolve),
    }, {
      path: '/register', //注册
      name: 'Register',
      component: (resolve) => require(['@/components/my-center/register-login/Register'], resolve),
    }, {
      path: '/change-password', //修改密码
      name: 'ChangePassword',
      component: (resolve) => require(['@/components/my-center/register-login/ChangePassword'], resolve),
    }, {
      path: '/authenticity', //客服鉴定
      name: 'Authenticity',
      component: (resolve) => require(['@/components/my-center/Authenticity'], resolve),
    }, {
      path: '/my-auction', //我的竞拍
      name: 'MyAuction',
      component: (resolve) => require(['@/components/my-center/MyAuction'], resolve),
    },
    // 买家
    {
      path: '/buy-order', //买家订单
      name: 'BuyOrderAll',
      component: (resolve) => require(['@/components/my-center/buyer/BuyOrderAll'], resolve),
    }, {
      path: '/buy-unpaid', //未支付
      name: 'BuyUnpaidStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyUnpaidStatus'], resolve),
    }, {
      path: '/buy-wait', //待收货
      name: 'BuyWaitReceiveStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyWaitReceiveStatus'], resolve),
    }, {
      path: '/buy-trading', //交易中
      name: 'BuyTradingStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyTradingStatus'], resolve),
    }, {
      path: '/buy-arbitration', //仲裁中
      name: 'BuyArbitrationStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyArbitrationStatus'], resolve),
    }, {
      path: '/buy-fail', //交易失败
      name: 'BuyFailureDealStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyFailureDealStatus'], resolve),
    }, {
      path: '/buy-trade', //交易成功
      name: 'BuyTradeSuccessStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyTradeSuccessStatus'], resolve),
    },
    // 卖家
    {
      path: '/sell-order', //卖家订单
      name: 'SellOrderAll',
      component: (resolve) => require(['@/components/my-center/seller/SellOrderAll'], resolve),
    }, {
      path: '/sell-wait', //已发货
      name: 'SellWaitReceiveStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellWaitReceiveStatus'], resolve),
    }, {
      path: '/sell-trading', //交易中
      name: 'SellTradingStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellTradingStatus'], resolve),
    }, {
      path: '/sell-arbitration', //仲裁中
      name: 'SellArbitrationStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellArbitrationStatus'], resolve),
    }, {
      path: '/sell-fail', //交易失败
      name: 'SellFailureDealStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellFailureDealStatus'], resolve),
    }, {
      path: '/sell-trade', //交易成功
      name: 'SellTradeSuccessStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellTradeSuccessStatus'], resolve),
    },
    // 资产管理
    {
      path: '/assets-manage', //资产管理
      name: 'AssetsManage',
      component: (resolve) => require(['@/components/my-center/assets-manage/AssetsManage'], resolve),
    }, {
      path: '/receipts', //收支明细
      name: 'ReceiptsAll',
      component: (resolve) => require(['@/components/my-center/assets-manage/ReceiptsAll'], resolve),
    }, {
      path: '/receipts-info', //收支明细详情
      name: 'ReceiptsInfo',
      component: (resolve) => require(['@/components/my-center/assets-manage/ReceiptsInfo'], resolve),
    }, {
      path: '/withdraw-deposit', //余额提现
      name: 'WithdrawDeposit',
      component: (resolve) => require(['@/components/my-center/assets-manage/WithdrawDeposit'], resolve),
    }, {
      path: '/card-manage', //银行卡管理
      name: 'CardManage',
      component: (resolve) => require(['@/components/my-center/assets-manage/CardManage'], resolve),
    }, {
      path: '/user-authentication',
      name: 'UserAuthentication',
      component: (resolve) => require(['@/components/my-center/assets-manage/UserAuthentication'], resolve),
    }, {
      path: '/Frost', //冻结资产明细
      name: 'Frost',
      component: (resolve) => require(['@/components/my-center/assets-manage/Frost'], resolve),
    }, {
      path: '/commission-manage', //佣金管理
      name: 'CommissionManage',
      component: (resolve) => require(['@/components/my-center/CommissionManage'], resolve),
    },
    // 安全认证
    {
      path: '/safe-phone', //手机
      name: 'SafePhone',
      component: (resolve) => require(['@/components/my-center/safety/SafePhone'], resolve),
    }, {
      path: '/safe-card', //身份证
      name: 'SafeCard',
      component: (resolve) => require(['@/components/my-center/safety/SafeCard'], resolve),
    }, {
      path: '/safe-user', //人脸
      name: 'SafeUser',
      component: (resolve) => require(['@/components/my-center/safety/SafeUser'], resolve),
    }, {
      path: '/safe-success', //验证成功
      name: 'SafeSuccess',
      component: (resolve) => require(['@/components/my-center/safety/SafeSuccess'], resolve),
    },
    // 分期
    {
      path: '/installment/:order_info', //分期支付
      name: 'PayInstallment',
      component: (resolve) => require(['@/components/my-center/PayInstallment'], resolve),
    }, {
      path: '/bill-installment', //分期账单
      name: 'BillInstallment',
      component: (resolve) => require(['@/components/my-center/BillInstallment'], resolve),
    }, {
      path: '/voucher', //代金券
      name: 'Voucher',
      component: (resolve) => require(['@/components/my-center/Voucher'], resolve),
    },
    // 活动
    {
      path: '/active', //活动页
      name: 'ActivePage',
      component: (resolve) => require(['@/components/action/ActivePage'], resolve),
    }, {
      path: '/active-area', //活动页
      name: 'ActiveArea',
      component: (resolve) => require(['@/components/action/ActiveArea'], resolve),
    }, {
      path: '/special-area/:type', //专区页
      name: 'SpecialArea',
      component: (resolve) => require(['@/components/action/SpecialArea'], resolve),
    }, {
      path: '/gold-goods', //金币号专区
      name: 'GoldGoods',
      component: (resolve) => require(['@/components/action/GoldGoods'], resolve),
    }, {
      path: '/auction', //竞拍页
      name: 'AuctionPage',
      component: (resolve) => require(['@/components/action/AuctionPage'], resolve),
    }, {
      path: '/auction-pay', //竞拍支付
      name: 'AuctionPay',
      component: (resolve) => require(['@/components/action/AuctionPay'], resolve),
    },
    // 合同
    {
      path: '/pact', //合同
      name: 'Pact',
      component: (resolve) => require(['@/components/my-center/pact/Pact'], resolve),
    }, {
      path: '/signature', //待签名
      name: 'Signature',
      component: (resolve) => require(['@/components/my-center/pact/Signature'], resolve),
    }, {
      path: '/signed', //已签名
      name: 'Signed',
      component: (resolve) => require(['@/components/my-center/pact/Signed'], resolve),
    },
    // 记录
    {
      path: '/browse-record', //浏览记录
      name: 'BrowseRecord',
      component: (resolve) => require(['@/components/my-center/record/BrowseRecord'], resolve),
    }, {
      path: '/bargain-record', //议价记录
      name: 'BargainRecord',
      component: (resolve) => require(['@/components/my-center/record/BargainRecord'], resolve),
    }, {
      path: '/collect', //收藏
      name: 'Collect',
      component: (resolve) => require(['@/components/my-center/record/Collect'], resolve),
    },
    // 议价--收到的议价
    {
      path: '/message',
      name: 'MessageAll',
      component: (resolve) => require(['@/components/my-center/bargain-message/MessageAll'], resolve),
    }, {
      path: '/message-details',
      name: 'MessageDetails',
      component: (resolve) => require(['@/components/my-center/bargain-message/MessageDetails'], resolve),
    },
    // 电子保单
    {
      path: '/guarantee-slip',
      name: 'GuaranteeSlip',
      component: (resolve) => require(['@/components/GuaranteeSlip'], resolve),
    },
    // 申请理赔
    {
      path: '/apply-settlement',
      name: 'ApplySettlement',
      component: (resolve) => require(['@/components/ApplySettlement'], resolve),
    },
    // 消息预览
    {
      path: '/message-server',
      name: 'MessageAll_Server',
      component: (resolve) => require(['@/components/my-center/message/messageAll'], resolve),
    },
    // 消息详细
    {
      path: '/message-info',
      name: 'Message_Details',
      component: (resolve) => require(['@/components/my-center/message/message_details'], resolve),
    },
    // 公告列表
    {
      path: '/affiche-info',
      name: 'Affiche',
      component: (resolve) => require(['@/components/my-center/message/Affiche'], resolve),
    },
    // 公告详细
    {
      path: '/affiche/:article/:type',
      name: 'Affiche_Details',
      component: (resolve) => require(['@/components/my-center/message/Affiche_details'], resolve),
    },
    // 安全中心
    {
      path: '/safety-center',
      name: 'Safety_Center',
      component: (resolve) => require(['@/components/my-center/SafetyCenter'], resolve),
    },
    // 设置安全密码
    {
      path: '/set-password',
      name: 'Set_Password',
      component: (resolve) => require(['@/components/my-center/SetPassword'], resolve),
    },
    // 微信支付
    {
      path: '/wechat-pay',
      name: 'WechatPay',
      component: (resolve) => require(['@/components/buy/WechatPay'], resolve),
    },
    // 支付宝
    {
      path: '/ali-pay',
      name: 'AliPay',
      component: (resolve) => require(['@/components/buy/AliPay'], resolve),
    },
    // 抽奖
    {
      path: '/dial',
      name: 'Dial',
      component: (resolve) => require(['@/components/action/Dial'], resolve),
    },
    {//选择出租类型
      path:'/rent-out',
      name:'RentOutPage',
      component: (resolve) => require(['@/components/sell/SellPage'], resolve),
    },
    // 出租发布一
    {
      path:'/lease-option/:opt',
      name:'LeaseOption',
      component: (resolve) => require(['@/components/rent/rent-out/LeaseOption'],resolve)
    },
    // 出租发布二
    {
      path:'/lease-info/:flag/:upData',
      name:'LeaseInfo',
      component: (resolve) => require(['@/components/rent/rent-out/LeaseInfo'],resolve)
    },
    {//选择租号类型
      path:'/rent',
      name:'RentPage',
      component: (resolve) => require(['@/components/sell/SellPage'], resolve),
    },
    // 租号列表
    {
      path:'/rent-list/:opt',
      name:'RentSearch',
      component: (resolve) => require(['@/components/rent/RentSearch'],resolve),
      meta:{
        keepAlive:true,
        isBack:false,
      }
    },
    // 租号详情
    {
      path:'/rent-details/:goods_id',
      name:'RentDetails',
      component: (resolve) => require(['@/components/rent/RentDetails'],resolve)
    },
    // 租号下单
    {
      path:'/rent-orders',
      name:'RentPlaceOrder',
      component: (resolve) => require(['@/components/rent/RentPlaceOrder'],resolve)
    },
    // 租号状态
    {
      path:'/rent-state',
      name:'RentState',
      component: (resolve) => require(['@/components/rent/RentState'],resolve)
    },
    //藏宝阁
    {
      path:'/cbg-stage',
      name:"CbgStage",
      component:(resolve) => require(['@/components/cbg/CbgStage'],resolve)
    }, 
    {
      path:'/cbg-order',
      name:"CbgPlaceOrder",
      component:(resolve) => require(['@/components/cbg/CbgPlaceOrder'],resolve)
    },
    {
      path:'/cbg-state',
      name:"CbgState",
      component:(resolve) => require(['@/components/cbg/CbgState'],resolve)
    },
    // 人工认证
    // {
    //   path:'/safe-aritificial',
    //   name:'SafeAritificial',
    //   component:(resolve) => require(['@/components/my-center/safety/SafeAritificial'],resolve),
    // },
    // {//状态
    //   path:'/safe-state',
    //   name:'SafeState',
    //   component:(resolve) => require(['@/components/my-center/safety/SafeState'],resolve),
    // },
    //换绑
    {
      path:"/change-register/:bind_str",
      name:"ChangeRegister",
      component:(resolve) => require(['@/components/common/ChangeRegister'],resolve)
    },
    //分期计算器
    {
      path:"/stage-counter",
      name:"StageCounter",
      component:(resolve) => require(['@/components/tool/StageCounter'],resolve)
    },
    //客服
    {
      path:"/service",
      name:"Service",
      component:(resolve) => require(['@/components/service/Service'],resolve)
    },
    {
      path: '*',
      component: (resolve) => require(['@/components/multi/NoData'], resolve)
    },
  ],
  scrollBehavior(to,from,savedPosition){
    if(to.path == '/details'){
      return {
        x:0,
        y:0
      }
    }
  }

})

// export default ({ app }) => {
//   app.router.afterEach((to, from) => {
//     const u = navigator.userAgent.toLowerCase()
//     if(u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger') return
//     if (to.path !== global.location.pathname) {
//       console.log('a')
//       location.assign(to.fullPath)
//     }
//   })
// }
