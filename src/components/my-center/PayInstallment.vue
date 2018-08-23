<template>
    <!-- 分期支付 -->
    <div class="pay-installment-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="payInstall-content">
            <div class="payInstall-cell">
                <div class="payInstall-strip">
                    <img class="lasttime" src="../../../static/img/my-center/his.png" alt="">
                    <span>最近还款期</span>
                    <span class="black" v-text="payData.lastTime"></span>
                </div>
                <div class="payInstall-strip refund">
                    <span>选择还款方式</span>
                    <div class="current" @click="seleMode('current')">
                        <img :src="payData.isCurrent?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                        <span>还本期</span>
                    </div>
                    <div class="all" @click="seleMode('all')">
                        <img :src="payData.isCurrent?'../../../static/img/order/nocheck.png':'../../../static/img/order/okcheck.png'" alt="">
                        <span>还全部</span>
                    </div>
                </div>
                <div class="payInstall-strip ">
                    <span>应付金额</span><span class="red-color" v-text="payData.price"></span>
                </div>
            </div>
        </div>
        <div class="nextBtn">前往支付</div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'PayInstallment',
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
                        title:"支付分期",
                    }
                },
                payData:{
                    lastTime:'2018-07-09',
                    isCurrent:true,
                    price:"￥999"
                }
            }
        },
        methods:{
            seleMode(flag){
                if(flag == 'current'){
                    this.payData.isCurrent = true;
                }else if(flag == 'all'){
                    this.payData.isCurrent = false;
                }
            }
        }
    }
</script>
<style scoped>
    .pay-installment-wrap{
        max-width: 12rem;
        margin:0 auto;
    }
    .payInstall-content{
        padding:.2rem;
    }
    .payInstall-cell{
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
    .payInstall-strip{
        line-height: .9rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .payInstall-strip span{
        vertical-align: middle;
        color:#666666;
        font-size:.26rem;
        margin-left:.13rem;
    }
    .lasttime{
        width:.29rem;
        height:.29rem;
        vertical-align: middle;

    }
    .black{
        color:#333333;
    }
    .refund div{
        margin-left:.6rem;
        display: inline-block;
    }
    .refund img{
        width:.22rem;
        height:.22rem;
    }
    .red-color{
        color:#FA5856 !important;
    }
    /* 下一步 */
    .nextBtn{
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
</style>
