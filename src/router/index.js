import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/HomePage'//首页
import ActivePage from '@/components/ActivePage'//活动页
import AuctionPage from '@/components/AuctionPage'//竞拍页
import GoodScreen from '@/components/GoodScreen' //商品列表筛选页
import Details from '@/components/Details'//商品详情页
import PlaceOrder from '@/components/buy/PlaceOrderPage'//商品下单
import Pay from '@/components/buy/Pay'//支付
import TakeDelivery from '@/components/buy/TakeDelivery'//收货
import Arbitration from '@/components/buy/Arbitration'//申请仲裁
import SellPage from '@/components/sell/SellPage'//我要卖
import SellOption from '@/components/sell/SellOption'//我要卖选择区服页
import SellInfo from '@/components/sell/SellInfo'//我要卖填写信息页
import MyCenter from '@/components/my-center/MyCenter'//个人中心




Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {
      path: '/',
      name: 'Header',
      component: MyCenter
    }
  ]
})
