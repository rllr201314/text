<template>
    <!-- 支付 -->
    <div class="pay-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="pay-content">
            <div class="pay-cell">
                <div class="info-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>订单信息</span>
                </div>
                <div class="info-content">
                    <div class="strip">
                        <span class="strip-left">订单号</span>
                        <div class="strip-right">
                            <span v-text="payData.orderInfo.orderNum"></span>
                            <span class="orange-color">取消订单</span>
                        </div>
                    </div>
                    <div class="strip">
                        <span class="strip-left">时间</span>
                        <div class="strip-right">
                            <span v-text="payData.orderInfo.orderTime"></span>
                        </div>
                    </div>
                    <div class="strip">
                        <span class="strip-left">订单金额</span>
                        <div class="strip-right">
                            <span class="red-color order-price" v-text="payData.orderInfo.orderPrice"></span>
                            <!--  -->
                            <div class="discount">
                                <div class="isbalance">
                                    <div class="balance-left">
                                        <img :src="payData.orderInfo.isbalace.balace?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
                                        <span>使用押金抵扣</span>
                                    </div>
                                    <div>
                                        <img :src="payData.orderInfo.isbalace.nobalace?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
                                        <span>使用余额抵扣</span>
                                    </div>
                                </div>
                                <div class="deduction">
                                    <div class="deduction-strip">押金抵扣 -￥3000</div>
                                    <div class="deduction-strip">押金抵扣 -￥3000</div>
                                </div>
                                <div class="last-time">（距离订单取消还有 <span class="red-color" v-text="payData.orderInfo.lastTime"></span> 请尽快完成交易）</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <div class="pay-cell">
                <div class="info-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请选择支付方式</span>
                </div>
                <div class="pay-cell-content">
                    <div class="pay-online" @click="seleLine('online')">
                        <img :src="payData.payInfo.pay.online?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                        <span>在线支付</span><span class="red-color">（建议2万元以内订单）</span>
                    </div>
                    <div class="showPay" v-show="payData.payInfo.pay.online">
                        <div class="pay-strip" v-for="item in payData.payInfo.online" @click="selePayFun(item.key)" :class="item.issele?'red-border':'black-border'">
                            <img :src="item.imgsrc" alt="">
                        </div>
                    </div>
                    <div class="pay-online"  @click="seleLine('noline')">
                        <img :src="payData.payInfo.pay.noline?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                        <span>线下支付(转账）</span><span class="red-color">建议大额订单</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nextBtn">下一步</div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'Pay',
        data(){
            return {
                componentsData:{
                    showTitle:{
                        showBack:false,//显示后退按钮
                        showLogo:2,//不显示头部log
                        showShare:3,//1搜索2分享
                        showBg:true,//是否显示背景
                        title:"商品下单",
                    }
                },
                payData:{
                    orderInfo:{
                        orderNum:'13823427342389423',
                        orderTime:'2018-08-08 9:00',
                        orderPrice:'￥2000',
                        isbalace:{
                            balace:true,
                            nobalace:false,
                        },
                        lastTime:'22:22',
                    },
                    payInfo:{
                        pay:{
                            online:true,
                            noline:false,
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
                    }
                }
            }
        },
        components:{
            Header,
        },
        methods:{
            seleLine(flag){
                if(flag == 'noline'){
                    this.payData.payInfo.pay.noline = true;
                    this.payData.payInfo.pay.online = false;     
                }else if(flag == 'online'){
                    this.payData.payInfo.pay.noline = false;
                    this.payData.payInfo.pay.online = true;                
                }   
            },
            selePayFun(opt){
                var payAll = this.payData.payInfo.online;
                for(var i in payAll){
                    if(opt == payAll[i].key){
                        payAll[i].issele = true;
                        continue;
                    }
                    payAll[i].issele=false;
                }
            }
        }
    }
</script>
<style scoped>

    .pay-content{
        padding:.2rem .2rem 0;
    }
    .pay-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .info-title{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    
    .info-title span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .info-title img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align:middle;
    }

    .info-content{
        color:#666666;
        font-size:.26rem;
        padding:.3rem .2rem .1rem;
    }
    .strip{
        margin-bottom:.1rem;
    }
    .strip-left,.strip-right{
        display:inline-block;
    }
    .strip-left{
        width:1.3rem;
        vertical-align: top;
    }
    .orange-color{
        color:#FF7E4A;
        text-decoration: underline;
        margin-left:.4rem;
    }
    .red-color{
        color:#FA5856;
    }
    .order-price{
        font-size:.3rem;
        margin-bottom:.1rem;
    }
    .isbalance{   
        margin:.2rem 0;
    }
    .isbalance img{
        width:.28rem;
        height:.28rem;
        vertical-align: middle;
    }
    .isbalance span{
        vertical-align: middle;
    }
    .isbalance div{
        display:inline-block;
    }
    .balance-left{
        margin-right:.8rem;
    }
    .deduction{
        background:#F6F6F6;
        -webkit-border-radius: .06rem;
        -moz-border-radius: .06rem;
        border-radius: .06rem;
        padding:.2rem;
        color:#999999;
        margin-bottom:.2rem;
    }
    .deduction div{
        margin-bottom:.15rem;
    }
    .deduction div:nth-last-child(1){
        margin-bottom:0;
    }

    .pay-cell-content{
        padding:.3rem 0 .4rem .5rem;
        font-size:.26rem;
    }
    .pay-online{
        margin-bottom:.3rem;
    }
    .pay-online img{
        width:.22rem;
        height:.22rem;
        vertical-align: middle;
    }
    .showPay{
        display:flex;
        justify-content: flex-start;
        margin:0 0 .3rem;
        padding-left:.4rem;
    }
    .pay-strip{
        width:1.4rem;
        height:.58rem;
        margin-right:.5rem;
        overflow: hidden;
    }
    .pay-strip img{
        width:1.4rem;
        height:.58rem;
    }
    .red-border{
        border:.01rem dashed #FE7649;
    }
    .black-border{
        border:.01rem dashed #DCDCDC;
    }


    /* 下一步 */
    .nextBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.5rem auto 0;
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
</style>

