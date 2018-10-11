<template>
    <!-- 分期支付 -->
    <div class="pay-installment-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="payInstall-content">
            <div class="payInstall-cell">
                <div class="payInstall-strip">
                    <img class="lasttime" src="../../../static/img/my-center/his.png" alt="">
                    <span>最近还款期</span>
                    <span class="black" v-text="time"></span>
                    <span class="right-time" v-if="payData.delay_day != 0">(逾期<span class="red-color">5</span>天)</span>
                </div>
                <div class="payInstall-strip refund">
                    <span>选择还款方式</span>
                    <div class="current" @click="seleMode('current')">
                        <img :src="isCurrent?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                        <span>还本期</span>
                    </div>
                    <div class="all" @click="seleMode('all')">
                        <img :src="isCurrent?'../../../static/img/order/nocheck.png':'../../../static/img/order/okcheck.png'" alt="">
                        <span>还全部</span>
                    </div>
                </div>
                <div class="payInstall-strip ">
                    <span class="strip-left">分期金额</span><span>￥<span v-text="payData.money"></span></span>
                </div>
                <div class="payInstall-strip ">
                    <span class="strip-left">利息</span><span>￥<span v-text="payData.charge"></span></span>
                </div>
                <div class="payInstall-strip " v-if="payData.delay_day != 0">
                    <span class="strip-left">滞纳金</span><span>￥<span v-text="payData.delay_money"></span></span>
                </div>
                <div class="payInstall-strip ">
                    <span class="strip-left">应付金额</span>
                    <span class="red-color">￥<span class="red-color" v-text="payData.total_money"></span></span>
                </div>
            </div>
        </div>
        <div class="nextBtn" @click="goPay">前往支付</div>
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
                allData:{},
                payData:{},
                time:null,
                isCurrent:true,
                order_info:null,
            }
        },
        methods:{
            seleMode(flag){
                var that = this;
                if(flag == 'current'){
                    that.isCurrent = true;
                    that.payData = that.allData.next_stage;
                }else if(flag == 'all'){
                    that.isCurrent = false;
                    that.payData = that.allData.end_stage;
                }
            },
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+"order_stage",{
                    order_id:that.order_info.order_id
                }).then((res)=>{
                    console.log(res)
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.allData = res.data.data;
                            that.payData = that.allData.next_stage;
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            goPay(){
                var that = this;
                // 分期支付
                var stages = {};
                if(that.isCurrent){//支付方式
                    stages.way = 1;
                    stages.price = that.allData.next_stage.total_money;
                }else{
                    stages.way = 2;
                    stages.price = that.allData.end_stage.total_money;
                }
                stages.order = that.order_info.order_id;
                stages.remaining_sum = that.allData.remaining_sum;
                stages = JSON.stringify(stages);
                sessionStorage.stage = stages;
                that.$router.push({name:'Pay',query:{stage:stages}})

            },
            // 判断是不是JSON字符串
            isobjStr(str) {
                if (typeof str == "string") {
                    try {
                        if (typeof JSON.parse(str) == "object") {
                            return true;
                        }
                    } catch (e) {
                        return false;
                    }
                } else {
                    return false;
                }
            },
        },
        mounted(){
            var that = this;
            if(that.$route.query.order){
                var order_sn = sessionStorage.s_order;
                var sn_order = that.$route.query.order;
                if(sn_order == order_sn){
                    if(that.isobjStr(sn_order)){
                        that.order_info = JSON.parse(sn_order)
                        that.time = that.order_info.time;
                        that.getData();
                    }else{
                        that.$router.go(-1);
                    }
                }else{
                    that.$router.go(-1);
                }
            }else{
                that.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    .pay-installment-wrap{
        max-width: 12rem;
        margin:0 auto;
        padding-top:.88rem;
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
    .right-time{
        display: inline-block;
        margin-left:1rem;
    }
    .strip-left{
        display: inline-block;
        width:1.5rem;
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
