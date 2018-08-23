import Vue from 'vue'
import Router from 'vue-router'




import HomePage from '@/components/HomePage' //首页
import GoodScreen from '@/components/GoodScreen' //商品列表筛选页
import Details from '@/components/Details' //商品详情页
import PlaceOrder from '@/components/buy/PlaceOrderPage' //商品下单
import Pay from '@/components/buy/Pay' //支付
import Arbitration from '@/components/buy/Arbitration' //申请仲裁

// 买家
import BuyTakeDelivery from '@/components/buy/buyTakeDelivery' //收货,五种状态
// 买家
import SellTakeDelivery from '@/components/sell/SellTakeDelivery' //收货,四种状态

import SellPage from '@/components/sell/SellPage' //我要卖
import SellOption from '@/components/sell/SellOption' //我要卖选择区服页
import SellInfo from '@/components/sell/SellInfo' //我要卖填写信息页


import MyCenter from '@/components/my-center/MyCenter' //个人中心
import AccountLogin from '@/components/my-center/register-login/AccountLogin' // 账号登录
import CodeLogin from '@/components/my-center/register-login/CodeLogin' // 验证码登录
import Register from '@/components/my-center/register-login/Register' //注册
import Authenticity from '@/components/my-center/Authenticity' //客服鉴定
import MyAuction from '@/components/my-center/MyAuction' // 我的竞拍
// 交易状态 买家
import BuyOrderAll from '@/components/my-center/buyer/BuyOrderAll' //全部订单
import UnpaidStatus from '@/components/my-center/buyer/UnpaidStatus' //未支付
import WaitReceiveStatus from '@/components/my-center/buyer/WaitReceiveStatus' //待收货
import TradingStatus from '@/components/my-center/buyer/TradingStatus' //交易中
import ArbitrationStatus from '@/components/my-center/buyer/ArbitrationStatus' //仲裁中
import FailureDealStatus from '@/components/my-center/buyer/FailureDealStatus' //交易失败
import TradeSuccessStatus from '@/components/my-center/buyer/TradeSuccessStatus' //交易成功
// 资产管理
import AssetsManage from '@/components/my-center/assets-manage/AssetsManage' //资产管理
import ReceiptsAll from '@/components/my-center/assets-manage/ReceiptsAll' //收支明细
import ReceiptsInfo from '@/components/my-center/assets-manage/ReceiptsInfo' //收支明细详情
import WithdrawDeposit from '@/components/my-center/assets-manage/WithdrawDeposit' //余额提现
import CardManage from '@/components/my-center/assets-manage/CardManage' //银行卡管理
import UserAuthentiction from '@/components/my-center/assets-manage/UserAuthentiction' //用户认证
import Frost from '@/components/my-center/assets-manage/Frost' //冻结资产明细
import CommissionManage from '@/components/my-center/CommissionManage' //佣金管理
// 安全认证
import SafePhone from '@/components/my-center/safety/SafePhone' //手机
import SafeCard from '@/components/my-center/safety/SafeCard' //身份证
import SafeUser from '@/components/my-center/safety/SafeUser' //人脸验证
import SafeSuccess from '@/components/my-center/safety/SafeSuccess' //认证成功
// 分期
import PayInstallment from '@/components/my-center/PayInstallment' //分期支付
import BillInstallment from '@/components/my-center/BillInstallment' //分期账单
import Voucher from '@/components/my-center/Voucher' //代金券
// 活动
import ActivePage from '@/components/action/ActivePage' //活动页
import AuctionPage from '@/components/action/AuctionPage' //竞拍页
import AuctionPay from '@/components/action/AuctionPay' //竞拍支付页
// 合同
import Pact from '@/components/my-center/pact/Pact' //合同
import Signature from '@/components/my-center/pact/Signature' //签名
// 浏览
import BrowseRecord from '@/components/my-center/record/BrowseRecord' //浏览记录
import BargainRecord from '@/components/my-center/record/BargainRecord' //议价记录
import Collect from '@/components/my-center/record/Collect' //议价记录

import MyGoods from '@/components/my-center/MyGoods' //我的商品
// 议价
import MessageAll from '@/components/my-center/bargain-message/MessageAll'
import MessageDetails from '@/components/my-center/bargain-message/MessageDetails'
// 电子保单
import GuaranteeSlip from '@/components/GuaranteeSlip'
// 申请理赔
import ApplySettlement from '@/components/ApplySettlement'

import NoData from '@/components/multi/NoData' //没有数据

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: MyGoods
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account-login',
      name: 'AccountLogin',
      component: AccountLogin
    }, ,
    {
      path: '/codeLogin',
      name: 'CodeLogin',
      component: CodeLogin
    },

  ]
})
