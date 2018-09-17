<template>
    <!-- 交易成功 -->
    <div class="tradeSuccess-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="tradeSuccess-content">
            <div class="tradeSuccess-cell" v-for="item in goodsData">
                <div class="gameLog">
                    <img :src="item.game_logo" alt="">
                </div>
                <div class="orderInfo">
                     <div class="order-num">
                         <span>订单号</span><span v-text="item.order_sn"></span><span class="history-time" v-text="item.create_time"></span>
                     </div>
                     <div class="order-des" v-text="item.goods_title"></div>
                     <div class="price-status">
                         <span class="good-price"><span>￥</span><span v-text="item.goods_amount"></span></span>
                         <span class="order-status">交易成功</span>
                     </div>
                </div>
                <div class="order-operate">
                    <div class="left-operate">
                        <img src="../../../../static/img/my-center/contact_service.png" alt="">
                        <span>联系客服</span>
                    </div>
                    <div class="right-operate">
                        <span class="cancel" v-text="item.text"></span>
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
        name:'SellTradeSuccessStatus',
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
                        title:"交易成功",
                    }
                },
                goodsData:[],
            }
        },
        methods:{
            getData(){
                var that = this;
                that.$axios.post('/api/seller_trade_success').then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.goodsData = res.data.data.data;
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            var that = this;
            that.getData();
        }
    }
</script>
<style  scoped>
    .tradeSuccess-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .tradeSuccess-content{
        padding:.2rem;
    }
    .tradeSuccess-cell{
        /* padding-left:.2rem; */
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
        position: relative;
    }
    .history-time{
        color:#999999;
        position:absolute;
        top:0;
        right:0;
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
    .price-status span{
        vertical-align: middle;
    }
    .good-price{
        color:#FF5E5E;
        font-size:.28rem;
        margin-right:.1rem;
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
    
</style>
