<template>
    <!-- 活动支付页 -->
    <div class="auctionPay-wrap wrap">
        <div class="auctionPay-title">
            <Header v-bind:showTitle="comData.showTitle"></Header>
            <div class="statement">
                <img src="../../../static/img/auction/warn.png" alt="">
                <div>
                    为保证每一位参与者的竞拍权益，凡参加该商品竞拍的用户，均需要交纳押金，活动结束后可作为购买商品的抵扣金额，也可申请退款，手机号将作为与您退款的安全保障。
                </div>
            </div>
        </div>
        <div class="activePay-cell">
            <div class="auctionPay-strip">
                <span class="left-strip">押金</span><span v-text="cash"></span>
            </div>
            <div class="auctionPay-strip">
                <span class="left-strip">联系电话</span>
                <input type="number">
                
                <!-- 支付方式组件 -->
                <Payment v-bind:payInfo="comData.payInfo"></Payment>
            </div>
        </div>
        <div class="okBtn">下一步</div>
        
    </div>
</template>

<script>
    import Header from '@/components/home-page/Header'//头部
    import Payment from '@/components/buy/Payment'//支付方式
    export default {
        name: "ActivePage",
        components:{
            Header,
            Payment
        },
        data(){
            return{
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:2,//1搜索2分享3菜单
                        showBg:false,//是否显示背景
                        title:"梦幻西游竞拍活动",
                    },
                    payInfo:{
                        showTitle:false,
                        payment:{
                            online:true,
                            noline:false
                        },
                        online:[{
                                key:'visa',
                                issele:true,
                                imgsrc:'./static/img/order/visa.png',
                            },{
                                key:'wx',
                                issele:false,
                                imgsrc:'./static/img/order/wxpay.png',
                            },{
                                key:'zfb',
                                issele:false,
                                imgsrc:'./static/img/order/zfbpay.png',
                            }]
                    },
                },
                cash:'￥200'
            }
        },
    }
</script>

<style scoped>
    .auctionPay-title{
        height:4rem;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
    .statement{
        text-align: center;
        width:6.76rem;
        height:2.57rem;
        font-size:.24rem;
        color:#666666;
        margin:auto;
        background:url(../../../static/img/auction/sbg.png) no-repeat;
        background-size:100% 100%;
        padding-top:.6rem;
    }
    .statement img{
        width:.69rem;
        height:.74rem;
        vertical-align: middle;
    }
    .statement div{
        width:4.8rem;
        display: inline-block;
        vertical-align: middle;
    }

    .activePay-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding:0 .2rem;
        font-size:.26rem;
    }
    .auctionPay-strip{
        line-height: .8rem;
    }
    .auctionPay-strip .left-strip{
        text-align: right;
        display: inline-block;
        min-width:1.2rem;
        margin-right:.3rem;
    }

    /* 下一步 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.3rem auto 0;
        width:6.5rem;
        text-align: center;
        line-height: .8rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #FD915F;
        -moz-box-shadow: .06rem .05rem .09rem #FD915F;
        box-shadow: .06rem .05rem .09rem #FD915F;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }


     /* ==========input========= */
    input{
        margin:0;
        padding:.1rem;
        font-size:.24rem;
        border:none;
        width:4.7rem;
        height:.76rem;
        border:.01rem solid #D2D2D2;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
</style>