<template>
    <!-- 仲裁中 -->
    <div class="arbitration-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="arbitration-content">
            <div class="arbitration-cell" v-for="item in goodsData">
                <div class="gameLog">
                    <img :src="item.log" alt="">
                </div>
                <div class="orderInfo">
                     <div class="order-num">
                         <span>订单号</span><span v-text="item.orderNum"></span><span class="history-time" v-text="item.history_time"></span>
                     </div>
                     <div class="order-des" v-text="item.des"></div>
                     <div class="price-status">
                         <span class="good-price" v-text="item.price"></span>
                         <span class="order-status" v-text="item.orderStatus"></span>
                     </div>
                     <div class="arbitration">
                         <span class="gray">仲裁事由</span>
                         <span v-text="item.arbitrationInfo"></span>
                     </div>
                </div>
                <div class="order-operate">
                    <div class="left-operate">
                        <img src="../../../../static/img/my-center/contact_service.png" alt="">
                        <span>联系客服</span>
                    </div>
                    <div class="right-operate">
                        <span class="cancel">取消仲裁</span>
                        <span class="pay">查看</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'WaitReceiveStatus',
        components:{
            Header
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                        title:"仲裁中",
                    }
                },
                goodsData:[{
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    arbitrationInfo:'账号有问题，需要退款',
                    orderStatus:'仲裁中',
                },{
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    arbitrationInfo:'账号有问题，需要退款',
                    orderStatus:'仲裁中',
                },{
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    arbitrationInfo:'账号有问题，需要退款',
                    orderStatus:'仲裁中',
                }]
            }
        }
    }
</script>
<style  scoped>
    .arbitration-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .arbitration-content{
        padding:.2rem;
    }
    .arbitration-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding:0 .2rem;
    }
    .gameLog{
        display:inline-block;
        vertical-align: middle;
        margin:0 .2rem;
    }
    .gameLog img{
        width:.8rem;
        height:.8rem;
    }
    .orderInfo{
        display:inline-block;
        vertical-align: middle;
        width:5.3rem;
        padding:.3rem 0;
    }
    .orderInfo span{
        display:inline-block;
    }
    .order-num{
        color:#666666;
        font-size:.26rem;
        margin-bottom:.1rem;
    }
    .history-time{
        float:right;
    }
    .order-des{
        width:4rem;
        font-size:.26rem;
        color:#333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom:.1rem;
    }
    .good-price{
        color:#FF5E5E;
        font-size:.28rem;
    }
    .order-status{
        font-size:.2rem;
        background:#45C773;
        padding:.01rem .05rem;
        color:#FFFFFF;
        line-height: .3rem;
        text-align:center;
        vertical-align: middle;
    }
    
    .order-operate{
        border-top:.01rem solid #E5E5E5;
        line-height: .8rem;
    }
    .order-operate div{
        display: inline-block;
    }
    .left-operate{
        font-size:.24rem;
        color:#666666;
    }
    .left-operate img{
        width:.25rem;
        height:.27rem;
        vertical-align: middle;
    }
    .left-operate span{
        vertical-align:middle;
    }
    .right-operate{
        font-size:.22rem;
        color:#FFFFFF;
        float: right;
    }
    .cancel,.pay{
        width:1.1rem;
        line-height:.44rem;
        text-align:center;
        display: inline-block;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
    }
    .pay{
        background:#FE7649;

    }
    .cancel{
        background:#C6C6C6;
        margin-right:.2rem;
    }
    .arbitration{
        margin-top:.1rem;
        font-size:.26rem;
        color:#333333;
    }
    .gray{
        color:#999999;
    }
</style>
