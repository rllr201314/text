import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'//首页
import ActivePage from '@/components/ActivePage'//活动页
import AuctionPage from '@/components/AuctionPage'//竞拍页
import SellPage from '@/components/SellPage'//我要卖
import GoodScreen from '@/components/GoodScreen' //商品列表筛选页


Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {
      path: '/',
      name: 'Header',
      component: GoodScreen
    }
  ]
})
