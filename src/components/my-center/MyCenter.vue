<template>
    <!-- 个人中心 -->
    <div class="mycenter-wrap">
        <div class="mycenter-top">
            <Header v-bind:showTitle="comData.showTitle"></Header>
            <div class="user-info">
                <div class="user-log">
                    <img src="../../../static/img/mh_ico.png" alt="">
                </div>
                <div class="user-status">
                    <span class="user-login">登录</span>
                    <span class="vertical">|</span>
                    <span class="user-register">注册</span>
                </div>
            </div>
        </div>
        <div class="mycenter-content">
            <div class="suspend-box">
                <div class="operation-box">
                    <div class="operation-title">
                        <div class="user-type" @click="seleUserType('buy')" :class="myData.userTypeOpt.usertype?'red-color':''">我是买家</div>
                        <div class="user-type" @click="seleUserType('sell')" :class="myData.userTypeOpt.usertype?'':'red-color'">我是卖家</div>
                    </div>
                    <div class="operation-content" v-show="myData.userTypeOpt.usertype">
                        <div class="cell" v-for="item in myData.userTypeOpt.buyTit" :class="item.name">
                            <img :src="item.imgSrc" alt="">
                            <div v-text="item.val"></div>
                        </div>
                    </div>
                    <div class="operation-content" v-show="!myData.userTypeOpt.usertype">
                        <div class="cell" v-for="item in myData.userTypeOpt.sellTit" :class="item.name">
                            <img :src="item.imgSrc" alt="">
                            <div v-text="item.val"></div>
                        </div>
                    </div>
                </div>
                <img class="l-loop" src="../../../static/img/my-center/lloop.png" alt="">
                <img class="r-loop" src="../../../static/img/my-center/lloop.png" alt="">
                <div class="operation-box">
                    <div class="operation-content" v-show="myData.userTypeOpt.usertype">
                        <div class="cell" v-for="item in myData.userTypeOpt.buyCon" :class="item.name">
                            <img :src="item.imgSrc" alt="">
                            <span v-text="item.val"></span>
                        </div>
                    </div>
                    <div class="operation-content" v-show="!myData.userTypeOpt.usertype">
                        <div class="cell" v-for="item in myData.userTypeOpt.sellCon" :class="item.name">
                            <img :src="item.imgSrc" alt="">
                            <span v-text="item.val"></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 资产管理 -->
            <div class="operation-box">
                <div class="box-title">
                    <div class="title-left">
                        <img src="../../../static/img/goodscreen/vertical.png" alt="">
                        <span>资产管理</span>
                    </div>
                    <div class="title-right">
                        <img src="../../../static/img/my-center/draw.png" alt="">
                        <span>提现</span>
                    </div>
                </div>
                <div class="box-content">
                    <div class="box-content-cell">
                        <div class="manage-des">可用余额</div>
                        <div class="manage-detail" v-text="myData.manageData.usableBalance"></div>
                    </div>
                    <div class="vertical-bg"></div>
                    <div class="box-content-cell">
                        <div class="manage-des">冻结余额</div>
                        <div class="manage-detail" v-text="myData.manageData.frostBalance"></div>
                    </div>
                    <div class="vertical-bg"></div>
                    <div class="box-content-cell">
                        <div class="manage-des">押金</div>
                        <div class="manage-detail" v-text="myData.manageData.cashPledge"></div>
                    </div>
                </div>
            </div>
            <div class="strip-wrap">
                <div class="sell-strip">
                    <div class="left-strip price">
                        <img src="../../../static/img/my-center/price.png" alt="">
                        <span>轻松赚佣金</span>
                    </div>
                    <div class="right-opt" >
                        <span class="red-bg" v-text="myData.comNews"></span>
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                
                <div class="sell-strip">
                    <div class="left-strip collect">
                        <img src="../../../static/img/my-center/collect.png" alt="">
                        <span>我的收藏</span>
                    </div>
                    <div class="right-opt" >
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                
                <div class="sell-strip">
                    <div class="left-strip his">
                        <img src="../../../static/img/my-center/his.png" alt="">
                        <span>浏览记录</span>
                    </div>
                    <div class="right-opt" >
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                
                <div class="sell-strip">
                    <div class="left-strip pacd">
                        <img src="../../../static/img/my-center/pacd.png" alt="">
                        <span>电子合同</span>
                    </div>
                    <div class="right-opt" >
                        <span class="red-bg" v-text="myData.pactNews"></span>
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                
                <div class="sell-strip">
                    <div class="left-strip see">
                        <img src="../../../static/img/my-center/see.png" alt="">
                        <span>客服真伪验证</span>
                    </div>
                    <div class="right-opt" >
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                
                <div class="sell-strip">
                    <div class="left-strip service">
                        <img src="../../../static/img/my-center/service.png" alt="">
                        <span>联系客服</span>
                    </div>
                    <div class="right-opt" >
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'MyCenter',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:3,//1搜索2分享3菜单
                        showBg:false,//是否显示背景
                        title:"个人中心",
                    }
                },
                myData:{
                    userTypeOpt:{
                        usertype:true,//true是买家 false是卖家
                        buyTit:[{
                            key:1,
                            name:'unpaid',
                            imgSrc:'./static/img/my-center/unpaid.png',
                            val:'待支付'
                        },{
                            key:2,
                            name:'trading',
                            imgSrc:'./static/img/my-center/trading.png',
                            val:'交易中'
                        },{
                            key:3,
                            name:'receiv',
                            imgSrc:'./static/img/my-center/receiv.png',
                            val:'待收货'
                        },{
                            key:4,
                            name:'tradsuccess',
                            imgSrc:'./static/img/my-center/tradsuccess.png',
                            val:'交易成功'
                        },{
                            key:5,
                            name:'order',
                            imgSrc:'./static/img/my-center/order.png',
                            val:'全部订单'
                        }],
                        sellTit:[{
                            key:1,
                            name:'trading',
                            imgSrc:'./static/img/my-center/trading.png',
                            val:'交易中'
                        },{
                            key:2,
                            name:'deliver',
                            imgSrc:'./static/img/my-center/deliver.png',
                            val:'已发货'
                        },{
                            key:3,
                            name:'tradsuccess',
                            imgSrc:'./static/img/my-center/tradsuccess.png',
                            val:'交易成功'
                        },{
                            key:4,
                            name:'deal',
                            imgSrc:'./static/img/my-center/deal.png',
                            val:'交易失败'
                        },{
                            key:5,
                            name:'order',
                            imgSrc:'./static/img/my-center/order.png',
                            val:'全部订单'
                        }],
                        buyCon:[{
                            key:1,
                            name:'voucher',
                            imgSrc:'./static/img/my-center/voucher.png',
                            val:'代金券'
                        },{
                            key:2,
                            name:'bidd',
                            imgSrc:'./static/img/my-center/bidd.png',
                            val:'我的竞拍'
                        },{
                            key:3,
                            name:'bill',
                            imgSrc:'./static/img/my-center/bill.png',
                            val:'分期账单'
                        },{
                            key:4,
                            name:'bargain',
                            imgSrc:'./static/img/my-center/bargain.png',
                            val:'我要出售'
                        }],
                        sellCon:[{
                            key:1,
                            name:'sell',
                            imgSrc:'./static/img/my-center/sell.png',
                            val:'我的竞拍'
                        },{
                            key:2,
                            name:'goods',
                            imgSrc:'./static/img/my-center/goods.png',
                            val:'我的商品'
                        },{
                            key:3,
                            name:'news',
                            imgSrc:'./static/img/my-center/news.png',
                            val:'议价消息'
                        }]
                    },
                    manageData:{
                        usableBalance:"1000.2元",
                        frostBalance:'666元',
                        cashPledge:'888元'
                    },
                    comNews:19,
                    pactNews:99,
                }
            }
        },
        methods:{
            seleUserType(flag){
                if(flag == 'buy'){
                    this.myData.userTypeOpt.usertype = true;
                }else if(flag == 'sell'){
                    this.myData.userTypeOpt.usertype = false;
                }
            }
        }
    }
</script>
<style scoped>
    .mycenter-wrap{
        max-width:12rem;
        margin:0 auto;
        position: relative;
    }
    .mycenter-top{
        background-image:url(../../../static/img/my-center/h-bg.png);
        background-repeat:no-repeat;
        background-size:100% 3.8rem;
        padding-bottom:.9rem;
    }
    .user-info{
        font-size:.3rem;
        color:#333333;
        text-align:center;
    }
    .user-log{
        width:1rem;
        height:1rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        margin:.3rem auto;
    }
    .user-log img{
        width:1rem;
        height:1rem;
    }
    .user-status span{
        display:inline-block;
    }
    .vertical{
        margin:0 .2rem;
    }
    /* 内容部分 */
    .mycenter-content{
        padding:0 .2rem;
        position: absolute;
        left:0;
        top:3.2rem;
        right:0;
    }
    .suspend-box{
        font-size:.24rem;
        position: relative;
    }
    .l-loop{
        width:.12rem;
        height:.54rem;
        position:absolute;
        top:2.14rem;
        left:.5rem;
    }
    .r-loop{
        width:.12rem;
        height:.54rem;
        position:absolute;
        top:2.14rem;
        right:.5rem;
    }
    .operation-box{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }

    /* 选择用户状态 */
    .operation-title{
        border-bottom:.01rem solid #E5E5E5;
        text-align:center;
    }
    .operation-title div{
        display:inline-block;
        width:49.2%;
        line-height:.7rem;
    }
    .operation-content{
        display:flex;
        justify-content: space-around;
        align-items: center;
        padding:.3rem 0;
    }
    .cell{
        color:#666666;
        text-align: center;
    }
    .cell div{
        margin-top:.05rem;
    }
    .unpaid img{
        width:.37rem;
        height:.37rem;
    }
    .trading img{
        width:.34rem;
        height:.33rem;
    }
    .receiv img{
        width:.35rem;
        height:.35rem;
    }
    .tradsuccess img{
        width:.34rem;
        height:.33rem;

    }
    .order img{
        width:.3rem;
        height:.35rem;
    }
    .deal img{
        width:.36rem;
        height:.36rem;
    }
    .deliver img{
        width:.51rem;
        height:.3rem;
    }
    .red-color{
        color:#FE7649;
        border-bottom:.03rem solid #FE7649;
    }
    .voucher img{
        width:.3rem;
        height:.21rem;
    }
    .bidd img{
        width:.25rem;
        height:.25rem;
    }
    .bill img{
        width:.24rem;
        height:.26rem;
    }
    .bargain img{
        width:.23rem;
        height:.25rem;
    }
    .sell img{
        width:.22rem;
        height:.21rem;
    }
    .goods img{
        width:.2rem;
        height:.23rem;
    }
    .news img{
        width:.25rem;
        height:.25rem;
    }


    /* 资产管理 */
     .box-title{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .title-left{
        display: inline-block;
    }
    .title-left span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .title-left img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .title-right{
        float:right;
    }
    .title-right img{
        width:.25rem;
        height:.28rem;
        vertical-align: middle;
    }
    .title-right span{
        font-size:.24rem;
        color:#999999;
    }
    .box-content{
        display: flex;
        justify-content:space-around;
        padding:.3rem 0 .28rem;
        text-align: center;
        align-items: center;
    }
    .manage-des{
        font-size:.24rem;
        color:#999999;
    }
    .manage-detail{
        font-size:.28rem;
        color:#333333;
    }
    .vertical-bg{
        width:.02rem;
        height:.45rem;
        background: #E5E5E5;
    }

    .strip-wrap{
        font-size:.26rem;
        color:#666666;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding-left:.2rem;
    }
    .sell-strip{
        line-height: .9rem;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .sell-strip img{
        vertical-align: middle;
    }
    .sell-strip span{
        vertical-align: middle;
    }
    .left-strip{
        display: inline-block;
    }
    .left-strip img{
        margin-right:.1rem;
    }
    .right-opt{
        float:right;
    }
    .right-opt img{
        width:.13rem;
        height:.24rem;
        margin-left:.2rem;
    }
    .red-bg{
        display: inline-block;
        line-height:.34rem;
        padding:0 .1rem;
        background:#FA5856;
        color:#FFFFFF;
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        border-top-right-radius: .5rem;
    }
    .price img{
        width:.25rem;
        height:.27rem;
    }
    .collect img{
        width:.3rem;
        height:.29rem;
    }
    .his img{
        width:.28rem;
        height:.28rem;
    }
    .pacd img{
        width:.23rem;
        height:.27rem;
    }
    .see img{
        width:.33rem;
        height:.21rem;
    }
    .service img{
        width:.27rem;
        height:.25rem;
    }
</style>
