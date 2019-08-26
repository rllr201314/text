<template>
    <!-- 首页 -->
    <div class="wrap">
        <div class="top">
            <Header v-bind:showTitle="showTitle"></Header>
            <SwiperContent v-bind:swiperSrc="swiperSrc"></SwiperContent>
        </div>
        <div class="hint">本站严禁未成年人进行游戏账号买卖</div>
        <div class="content">
            <LastSale v-bind:flow="{sale:true,safe:false,order_info,count_info}"></LastSale>
            <UserOperation></UserOperation>
            <GameDivision></GameDivision>
            <HotGame v-bind:hot_game="hot_game"></HotGame>
            <LastSale v-bind:flow="{sale:false,safe:true,safe_info}"></LastSale>
            <Notice v-bind:notice="notice"></Notice>
            <InsuranceCell></InsuranceCell>
        </div>
        <UserHelp></UserHelp>
        <HotLine></HotLine>
        <Footer></Footer>
        <div class="open-active" @click="showActive" :style="iconstyle">
            <a href="http://open6156.game.4177.com/" target="_blank" rel="noopener noreferrer">
                <img src="../../static/img/active_ico.png" alt="">
            </a>
        </div>

        <div class="active-page" v-show="isShowShage">
            <div class="active-title">商品活动</div>
            <div class="active-content">
                <div class="active-content-cell" v-for="(item,index) in activeData" :key="index">
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
        <div class="shade" v-show="isShowShage" @click="hiddenShage"></div>
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
    data() {
        return {
            //头部显示内容
            showTitle: {
                showBack: true,
                showLogo: 1,//显示头部log
                showShare: 1,//1搜索2分享3菜单
                showBg: false,
                title: "",
            },
            iconTranslateX: 0,//活动图片往左
            isShowShage: false,//是否显示遮罩和活动弹框
            swiperSrc: '',//轮播图
            hot_game: '',//热门游戏
            order_info: '',//近期交易
            safe_info: '',//保险理赔
            count_info: '',//累计交易
            notice: '',//公告
            activeData: [{
                logImg: './static/img/mh_cont.png',
                tit: '竞拍：100级万寸神宠',
                state: 1,
                time: '1:20:34:33'
            }, {
                logImg: './static/img/mh_cont.png',
                tit: '竞拍：100级万寸神宠',
                state: 2,
                time: '1:20:34:33'
            }],
        }
    },
    computed: {
        iconstyle() {//图标动态样式      
            let arr = new Array();
            arr.push('transition:0.5s;')
            arr.push('transform:translateX(' + this.iconTranslateX + 'rem)');
            // arr.push('rotate('+this.iconrotate+'deg);');
            return arr.join("");
        },
    },
    methods: {
        showActive() {
            var that = this;
            // that.isShowShage = !that.isShowShage;
            // if(that.isShowShage){
            //     that.iconTranslateX=-.7;
            // }else{
            //     that.iconTranslateX = 0;
            // }
        },
        hiddenShage() {
            this.isShowShage = false;
            this.iconTranslateX = 0;
        },
        getData() {
            var that = this;
            that.$axios.post(process.env.API_HOST + 'home').then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.notice = res.data.data.article_info;
                        that.swiperSrc = res.data.data.loop_info;
                        that.hot_game = res.data.data.hot_nfo;
                        that.order_info = res.data.data.order_info;
                        that.count_info = res.data.data.count_info;
                        that.safe_info = res.data.data.safe_info;
                    }
                }
            })
        },
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows     Phone)/i)
            return flag;
        },
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
        Footer,
    },
    mounted() {
        this.getData();
    },
    created() {
        // if (this._isMobile()) {
        //   this.$router.replace('/index');
        // } else {
        //   this.$router.replace('/pc_index');
        // }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
    background-image: url("../../static/img/bg_big.png");
    background-repeat: no-repeat;
    background-size: 100% 2.8rem;
}
.content {
    padding: 0 0.2rem 0.2rem;
}
/*活动按钮*/
.open-active {
    width: .8rem;
    height: .8rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    position: fixed;
    right:0;
    top: 40%;
    z-index: 10;
}
.open-active img {
    width: 100%;
    height: 100%;
}
/*活动弹框*/
.active-page {
    width: 3.5rem;
    text-align: center;
    background: #ffffff;
    position: fixed;
    right: 1.5rem;
    top: 33%;
    z-index: 11;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    transition: 0.5s;
}
.active-title {
    width: 3.63rem;
    text-align: left;
    background: url("../../static/img/active_page_bg.png") no-repeat;
    -webkit-background-size: 3.63rem;
    background-size: 3.63rem;
    color: #fe7649;
    /*padding-right:.13rem;*/
    padding: 0.27rem 0.2rem;
}
.active-content {
    width: 3.5rem;
    background: #ffffff;
    border-bottom-left-radius: 0.06rem;
    border-bottom-right-radius: 0.06rem;
}
.active-content-cell img {
    width: 1.92rem;
    height: 0.72rem;
}
.active-title,
.active-content-cell-text {
    font-size: 0.26rem;
}
.active-state-title {
    color: #999999;
}
.active-end-time {
    color: #ff5d5d;
}
.active-start-time {
    color: #45c773;
}
.active-state {
    font-size: 0.24rem;
}
/*遮罩*/
.shade {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
}
/* 提示 */
.hint {
    width: 6.04rem;
    height: 0.32rem;
    background: url(../../static/img/home-page/hint-bg.png) no-repeat;
    background-size: 6.04rem 0.32rem;
    margin: 0.05rem auto;
    text-align: center;
    line-height: 0.32rem;
    color: #fb6f60;
    font-size: 0.2rem;
}
</style>
