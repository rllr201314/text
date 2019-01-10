<template>
    <div class="wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="orderAll-content">
            <div class="orderAll-cell">
                <div class="orderAll-strip" @click="toLink('wait')">
                    <span class="orderAll-lefttext">未支付</span> <span class="num">(<span  v-text="trade_wait"></span>)</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('trading')">
                    <span class="orderAll-lefttext">交易中</span> <span class="num">(<span  v-text="trading"></span>)</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('confirm')">
                    <span class="orderAll-lefttext">待确认收货</span> <span class="num">(<span  v-text="trade_confirm"></span>)</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('arbitrate')">
                    <span class="orderAll-lefttext">仲裁中</span> <span class="num">(<span  v-text="trade_arbitrate"></span>)</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('success')">
                    <span class="orderAll-lefttext">交易成功</span> <span class="num">(<span  v-text="trade_success"></span>)</span>
                    <div class="right-opt" >
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('fail')">
                    <span class="orderAll-lefttext">交易失败</span> <span class="num">(<span  v-text="trade_fail"></span>)</span>
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
        name:'BuyOrderAll',
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
                        title:"买家订单",
                    }
                },
                trade_arbitrate:'',
                trade_confirm:'',
                trade_fail:'',
                trade_success:'',
                trade_wait:'',
                trading:'',
            }
        },
        methods:{
            toLink(flag){
                var that_r = this.$router;
                if (flag == "trading") {
                    //交易中
                    that_r.push({ name: "BuyTradingStatus" });
                } else if (flag == "confirm") {
                    //待确认收货
                    that_r.push({ name: "BuyWaitReceiveStatus" });
                } else if (flag == "success") {
                    //交易成功
                    that_r.push({ name: "BuyTradeSuccessStatus" });
                }else if (flag == "fail") {
                    //交易失败
                    that_r.push({ name: "BuyFailureDealStatus" });
                }else if (flag == "arbitrate") {
                    //仲裁中
                    that_r.push({ name: "BuyArbitrationStatus" });
                }else if (flag == "wait") {
                    //未支付
                    that_r.push({ name: "BuyUnpaidStatus" });
                }
            },

            getData(){
                var that =this;
                that.$axios.post(process.env.API_HOST+"buyer_order").then((res)=>{
                    // console.log(res)
                    if(res.status == 200){
                        if(res.data.code == 200){
                            var data = res.data.data;
                            that.trade_arbitrate = data.trade_arbitrate;
                            that.trade_confirm = data.trade_confirm;
                            that.trade_fail = data.trade_fail;
                            that.trade_success = data.trade_success;
                            that.trade_wait = data.trade_wait;
                            that.trading = data.trading;
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            var that =this;
            that.getData();
        }
    }
</script>
<style scoped>
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
    .num{
        color:#999999;
        font-size:.26rem;
    }
</style>
