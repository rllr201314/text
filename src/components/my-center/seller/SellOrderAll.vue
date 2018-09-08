<template>
    <div class="orderAll-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="orderAll-content">
            <div class="orderAll-cell">
                <div class="orderAll-strip">
                    <span class="orderAll-lefttext">未支付</span><span>(2)</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip">
                    <span class="orderAll-lefttext">交易中</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip">
                    <span class="orderAll-lefttext">待确认收货</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip">
                    <span class="orderAll-lefttext">仲裁中</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip">
                    <span class="orderAll-lefttext">交易成功</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip">
                    <span class="orderAll-lefttext">交易失败</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'SellOrderAll',
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
                        showBg:true,//是否显示背景
                        title:"卖家订单",
                    }
                },

            }
        }
    }
</script>
<style scoped>
    .orderAll-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .orderAll-content{
        padding:.2rem;
    }
    .orderAll-cell{
        padding-left:.2rem;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
    }

    .orderAll-strip{
        font-size:.26rem;
        color:#666666;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .orderAll-lefttext{
        margin-right:.1rem;
        line-height: .9rem;
        display: inline-block;
    }
    .right-opt{
        text-align: right;
        float:right;
        line-height: .9rem;
    }
    .right-opt img{
        width:.13rem;
        height:.24rem;
    }
</style>
