<template>
    <!-- 首页 -->
  <div class="wrap">
      <div class="top">
          <Header v-bind:showTitle="showTitle"></Header>
          <SwiperContent></SwiperContent>
      </div>
      <div class="content">
          <LastSale v-bind:flow="{sale:true,safe:false}"></LastSale>
          <UserOperation></UserOperation>
          <GameDivision></GameDivision>
          <HotGame></HotGame>
          <LastSale v-bind:flow="{sale:false,safe:true}"></LastSale>
          <Notice></Notice>
          <InsuranceCell></InsuranceCell>
      </div>
      <UserHelp></UserHelp>
      <HotLine></HotLine>
      <Footer></Footer>
      <div class="open-active" @click="showActive()">
          <img src="../../static/img/active_ico.png" alt="">
      </div>
      <div class="active-page" v-show="isShowShage">
          <div class="active-title">商品活动</div>
          <div class="active-content">
                <div class="active-content-cell" v-for="item in activeData">
                    <img :src="item.logImg" alt="">
                    <div class="active-content-cell-text" v-text="item.tit"></div>
                    <div class="active-state" v-if="item.state == 1">
                        <div class="active-state-title">活动结束倒计时</div>
                        <div class="active-end-time " v-text="item.time"></div>
                    </div>
                    <div class="active-state" v-else-if="item.state == 2">
                        <div class="active-state-title">活动开始倒计时</div>
                        <div class="active-start-time" v-text="item.time"></div>
                    </div>
                </div>
          </div>
      </div>
      <div class="shade" v-show="isShowShage"></div>
  </div>
</template>

<script>

    import Header from '@/components/home-page/Header'
    import Footer from '@/components/home-page/Footer'
    import SwiperContent from '@/components/home-page/SwiperContent'//轮播图
    import LastSale from '@/components/home-page/LastSale'//近期交易
    import UserOperation from '@/components/home-page/UserOperation'//用户操作组件
    import GameDivision from '@/components/home-page/GameDivision'//游戏专区
    import HotGame from '@/components/home-page/HotGame'//热门游戏
    import Notice from '@/components/home-page/Notice'//公告
    import InsuranceCell from '@/components/home-page/InsuranceCell'//保险
    import HotLine from '@/components/home-page/Hotline'//联系客服
    import UserHelp from '@/components/home-page/UserHelp'//用户帮助


export default {
    data(){
        return{
            //头部显示内容
            showTitle:{
                showBack:true,
                showLogo:1,//显示头部log
                showShare:2,//1搜索2分享3菜单
                showBg:false,
                title:"",
            },
            isShowShage:false,//是否显示遮罩和活动弹框
            
            activeData:[{
                logImg:'./static/img/mh_cont.png',
                tit:'竞拍：100级万寸神宠',
                state:1,
                time:'1:20:34:33'
            },{
                logImg:'./static/img/mh_cont.png',
                tit:'竞拍：100级万寸神宠',
                state:2,
                time:'1:20:34:33'
            }]

        }
    },
    methods: {
        showActive(){
            this.isShowShage = !this.isShowShage;
        },
        countDown(times){
        }
    },
    components: {
        Header,
        SwiperContent,//轮播图
        LastSale,//近期交易
        UserOperation,//用户操作
        GameDivision,//游戏专区
        HotGame,//热门游戏
        Notice,//公告
        InsuranceCell,//保险
        HotLine,//客服热线
        UserHelp,//用户帮助
        Footer
    },
    mounted(){
        // 活动倒计时----
        // var time = null;
        // var second=5; 
        // var minute=0; 
        // var hour=0; 
        // var day=0; 
        // var flag=false; 
        // function countDown(){ 
        //     second-=1; 
        //     if(second==0){ 
        //     minute=minute-1; 
        //     second=60; 
        //         if(minute<0){ 
        //             hour=hour-1; 
        //             minute=59; 
        //             if(hour<0){ 
        //                 day-=1; 
        //                 hour=23; 
        //                 if(day<0){ 
        //                     flag=true; 
        //                 } 
        //             } 
        //         } 
        //     } 
        //     if(flag){ 
        //         console.log("活动结束！");
        //         clearInterval(time);
        //     }else{
        //         console.log("距离活动时间还剩："+day+"天"+hour+"小时"+minute+"分"+second+"秒")
        //     } 
        // } 
        // time=setInterval(countDown,1000); 
              
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .top{
        background-image: url("../../static/img/bg_big.png");
        background-repeat: no-repeat;
        background-size: 100% 3.82rem;
    }
    .content{
        padding:.2rem;
    }
    /*活动按钮*/
    .open-active{
        width:1rem;
        height:1rem;
        position:fixed;
        right:.2rem;
        top:50%;
        z-index: 10;
    }
    .open-active img{
        width:1rem;
        height:1rem;
    }
    /*活动弹框*/
    .active-page{
        width:3.5rem;
        text-align:center;
        background:#FFFFFF;
        position:fixed;
        right:1.5rem;
        top:53%;
        z-index:11;
        -webkit-border-radius: .06rem;
        -moz-border-radius: .06rem;
        border-radius: .06rem;
    }
    .active-title{
        width:3.63rem;
        text-align:left;
        background:url("../../static/img/active_page_bg.png") no-repeat;
        -webkit-background-size: 3.63rem;
        background-size: 3.63rem;
        color:#FE7649;
        /*padding-right:.13rem;*/
        padding:.27rem .2rem;
    }
    .active-content{
        width:3.5rem;
        background:#FFFFFF;
        border-bottom-left-radius:.06rem;
        border-bottom-right-radius:.06rem;
    }
    .active-content-cell img{
        width:1.92rem;
        height:.72rem;
    }
    .active-title,.active-content-cell-text{
        font-size:.26rem;
    }
    .active-state-title{
        color:#999999;
    }
    .active-end-time{
        color:#FF5D5D;
    }
    .active-start-time{
        color:#45C773;
    }
    .active-state{
        font-size:.24rem;
    }
    /*遮罩*/
    .shade{
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        background:rgba(0,0,0,.5);
        z-index: 5;
    }
</style>
