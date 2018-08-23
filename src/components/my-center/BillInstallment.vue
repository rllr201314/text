<template>
    <!-- 分期账单 -->
    <div class="billInstallment-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="bill-content">
            <div class="time-interval">
                <span>2018年7月</span><img src="../../../static/img/my-center/down_ico.png" alt="">
            </div>
            <div class="bill-cell bidd-info">
                <div class="bind-strip">
                    <span  class="left-info">分期总金额</span>
                    <span class="right-info"> ¥6000 </span>
                </div>
                <div class="bind-strip">
                    <span  class="left-info"> 已还金额</span>
                    <span class="right-info"> ¥6000 </span>
                </div>
                <div class="bind-strip">
                    <span  class="left-info">剩余分期金额</span>
                    <span class="right-info red-color"> ¥6000 </span>
                </div>
            </div>
            <div class="bill-cell">
                <div class="info-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>分期明细</span>
                </div>
                <div class="bill-cell-content">
                    <div class="stage-cell" v-for="(item,ind) in billData.orderData">
                        <div class="order-num">
                            <span>订单号 </span>
                            <span class="black-color" v-text="item.orderNum"></span>
                            <span class="refund">我要还款</span>
                        </div>
                        <div class="goods-des" v-text="item.orderDes"></div>
                        <div class="stage-info">
                            <span class="red-color" v-text="item.price"></span>
                            <span class="black-color">期数{{item.periods}}</span>
                            <span class="black-color">利率{{item.rate}}</span>
                        </div>
                        <div class="stage-bottom">
                            <img src="../../../static/img/my-center/his.png" alt="" class="history">
                            <span>最近还款期</span>
                            <span v-text="item.recentTime"></span>
                            <span class="tag green-bg" v-show="item.refund">已还款</span>
                            <span class="tag red-bg" v-show="!item.refund">未还款</span>
                            <div class="showStage" @click="showStageFun(ind,item.showStage)">
                                <img :src="item.showStage?'../../../static/img/my-center/up_ico.png':'../static/img/my-center/down_ico.png'" alt="">
                            </div>
                        </div>
                        <div class="stage-box" v-show="item.showStage">
                            <div class="stage-strip" v-for="val in item.stageData":class="val.isRefund?'':'black-color'">
                                <div class="suc-refund">
                                    <img v-if="val.isRefund" src="../../../static/img/my-center/suc_refund.png" alt="">
                                </div>
                                <span class="periodsNum" v-text="val.installment"></span>
                                <span v-text="val.price"></span>
                                <span v-text="val.detaile"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'BillInstallment',
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
                        title:"分期账单",
                    }
                },
                billData:{
                    orderData:[{
                        orderNum:'232131231231231',
                        orderDes:'梦幻西游xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                        price:'￥1800',
                        periods:'5',
                        rate:'3%',
                        recentTime:'2018-07-09',
                        refund:true,//是否还款
                        showStage:false,
                        stageData:[{
                            isRefund:true,
                            installment:'首付',
                            price:'￥500',
                            detaile:'',
                        },{
                            isRefund:false,
                            installment:'第一期',
                            price:'￥500',
                            detaile:'（本金1000，利息3000*3%=90）',
                        },{
                            isRefund:false,
                            installment:'第二期',
                            price:'￥500',
                            detaile:'（本金1000，利息3000*3%=90）',
                        }]
                    },{
                        orderNum:'232131231231231',
                        orderDes:'梦幻西游xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                        price:'￥1800',
                        periods:'5',
                        rate:'3%',
                        recentTime:'2018-07-09',
                        refund:false,//是否还款
                        showStage:false,
                        stageData:[{
                            isRefund:true,
                            installment:'首付',
                            price:'￥500',
                            detaile:'',
                        },{
                            isRefund:false,
                            installment:'第一期',
                            price:'￥500',
                            detaile:'（本金1000，利息3000*3%=90）',
                        },{
                            isRefund:false,
                            installment:'第二期',
                            price:'￥500',
                            detaile:'（本金1000，利息3000*3%=90）',
                        }]
                    },{
                        orderNum:'232131231231231',
                        orderDes:'梦幻西游xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                        price:'￥1800',
                        periods:'5',
                        rate:'3%',
                        recentTime:'2018-07-09',
                        refund:true,//是否还款
                        showStage:false,
                        stageData:[{
                            isRefund:true,
                            installment:'首付',
                            price:'￥500',
                            detaile:'',
                        },{
                            isRefund:false,
                            installment:'第一期',
                            price:'￥500',
                            detaile:'（本金1000，利息3000*3%=90）',
                        },{
                            isRefund:false,
                            installment:'第二期',
                            price:'￥500',
                            detaile:'（本金1000，利息3000*3%=90）',
                        }]
                    }]
                }
            }
        },
        methods:{
            showStageFun(ind,flag){
                this.billData.orderData[ind].showStage = !this.billData.orderData[ind].showStage;
            }
        }
    }
</script>
<style scoped>
    .billInstallment-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .bill-content{
        padding:0 .2rem;
    }
    .time-interval{
        line-height: .9rem;
        font-size:.28rem;
        color:#333333;
    }
    .time-interval img{
        width:.22rem;
        height:.11rem;
        margin-left:.15rem;
    }
    .bill-cell{
        overflow: hidden;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .bind-strip{
        line-height: .5rem;
    }
    .bidd-info{
        background:#FFFFFF;
        padding:.2rem;
        font-size:.26rem;
        color:#333333;
    }
    .left-info{
        width:1.7rem;
        display: inline-block;
        color:#666666;
        text-align:right;
        margin-right:.5rem;
    }
    .red-color{
        color:#FF5E5E;
    }
    .info-title{
        background:#FFFFFF;
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
    .bill-cell-content .stage-cell:nth-last-child(1){
        margin-bottom: 0;
    }
    .stage-cell{
        background:#FFFFFF;
        padding:0 .2rem;
        font-size:.26rem;
        color:#666666;
        margin-bottom:.2rem;
    }
    .black-color{
        color:#333333 !important;
    }
    .order-num{
        line-height: .5rem;
        padding-top:.1rem;
    }
    .refund{
        font-size:.22rem;
        display: inline-block;
        color:#FFFFFF;
        width:1.1rem;
        text-align:center;
        line-height: .44rem;
        float:right;
        background:#FE7649;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        -webkit-box-shadow: .02rem .02rem .09rem #FE7649;
        -moz-box-shadow: .02rem .02rem .09rem #FE7649;
        box-shadow: .02rem .02rem .09rem #FE7649;
    }
    .goods-des{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width:4rem;
        line-height: .5rem;
    }
    .stage-info{
        line-height: .5rem;
    }
    .stage-info span{
        margin-right:.5rem;
    }
    .stage-bottom{
        line-height: .8rem;
        border-top:.01rem solid #E5E5E5;
    }
    
    .history{
        width:.29rem;
        height:.29rem;
        vertical-align: middle;
        margin-top:-.1rem;
        margin-right:.1rem;
    }
    .showStage{
        width:.5rem;
        line-height: .8rem;
        text-align: center;
        float: right;
    }
    .showStage img{
        width:.2rem;
        height:.11rem;
    }
    .tag{
        color:#FFFFFF;
        font-size:.2rem;
        padding:.03rem;
        margin-left: .1rem;
    }
    .green-bg{
        background:#45C773;
    }
    .red-bg{
        background:#FF5E5E;
    }
    .stage-box{
        font-size:.24rem;
        padding-bottom:.2rem;
    }
    .stage-strip{
        line-height: .4rem;
        color: #999999;
    }
    .stage-strip span{
        display: inline-block;
        margin-right:.3rem;
    }



    .suc-refund{
        width:.18rem;
        height:.13rem;
        text-align: center;
        display: inline-block;
        margin-right:.2rem; 
    }
    .suc-refund img{
        width:.18rem;
        height:.13rem;
    }
    .periodsNum{
        min-width:.7rem;
    }
</style>
