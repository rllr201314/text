<template>
    <!-- 分期账单 -->
    <div class="billInstallment-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="bill-content">
            <div class="time-interval" v-if="false">
                <span>2018年7月</span><img src="../../../static/img/my-center/down_ico.png" alt="">
            </div>
            <div class="bill-cell bidd-info">
                <div class="bind-strip">
                    <span  class="left-info">分期总金额</span>
                    <span class="right-info"> ¥<span v-text="amount_info.total_amount"></span></span>
                </div>
                <div class="bind-strip">
                    <span  class="left-info"> 已还金额</span>
                    <span class="right-info"> ¥<span v-text="amount_info.repay_amount"></span></span>
                </div>
                <div class="bind-strip">
                    <span  class="left-info">剩余分期金额</span>
                    <span class="right-info red-color"> ¥<span v-text="amount_info.remain_amount"></span></span>
                </div>
            </div>
            <div class="bill-cell">
                <div class="info-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>分期明细</span>
                </div>
                <div class="bill-cell-content">
                    <div class="stage-cell" v-for="(item,ind) in orderData">
                        <div class="order-num">
                            <span>订单号 </span>
                            <span class="black-color" v-text="item.order_sn"></span>
                            <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="item.order_sn" @click="copyFn()" id="copy">
                            <span class="refund" @click="goPayFn(item.order_id,item.next_time)">我要还款</span>
                        </div>
                        <div class="goods-des" v-text="item.goods_title"></div>
                        <div class="stage-info">
                            <span class="red-color">￥<span v-text="item.cur_money"></span></span>
                            <span class="black-color">期数<span v-text="item.cur_num"></span></span>
                            <span class="black-color">利率<span v-text="item.percent_rate"></span></span>
                        </div>
                        <div class="stage-bottom">
                            <img src="../../../static/img/my-center/his.png" alt="" class="history">
                            <span>最近还款期</span>
                            <span v-text="item.next_time"></span>
                            <span class="tag green-bg" v-if="item.stage_status == 1">已还款</span>
                            <span class="tag red-bg" v-if="item.stage_status == 2 || item.stage_status == 3">未还款</span>
                            <div class="showStage" @click="showStageFun(ind,item.showStage)">
                                <img :src="item.showStage?'../../../static/img/my-center/up_ico.png':'../static/img/my-center/down_ico.png'" alt="">
                            </div>
                        </div>
                        <div class="stage-box" v-show="item.showStage">
                            <div class="stage-strip" v-for="val in item.stage_info" :class="val.flag == 1?'':'black-color'">
                                <div class="suc-refund">
                                    <img v-if="val.flag == 1" src="../../../static/img/my-center/suc_refund.png" alt="">
                                </div>
                                <span class="periodsNum" v-text="val.stage_title"></span>
                                <span class="gray-color" v-text="val.stage_value"></span>
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
                amount_info:{},
                orderData:[],
            }
        },
        methods:{
             // 复制
            copyFn() {
                let that = this;
                let clipboard = new ClipboardJS("#copy");
                clipboard.on("success", function(e) {
                    clipboard.destroy();
                    mui.toast("复制成功",{ duration:'short', type:'div' });
                });
                clipboard.on("error", function(e) {
                    clipboard.destory();
                    mui.toast("请重新点击复制",{ duration:'short', type:'div' });
                });
            },
            showStageFun(ind,flag){
                this.orderData[ind].showStage = !this.orderData[ind].showStage;
            },
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+"stage_info").then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.amount_info = res.data.data.amount_info;
                            for(var i in res.data.data.order_info){
                                res.data.data.order_info[i].showStage = false;
                            }
                            that.orderData = res.data.data.order_info;
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            goPayFn(order_id,time){
                var order_sn = {};
                order_sn.order_id = order_id;
                order_sn.time = time;
                order_sn = JSON.stringify(order_sn);
                sessionStorage.s_order = order_sn;
                this.$router.push({name:'PayInstallment',query:{order:order_sn}});
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
    .billInstallment-wrap{
        max-width:12rem;
        margin:0 auto;
        padding-top:.88rem;
    }
    .bill-content{
        padding:.2rem .2rem 0;
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
        width: 0.08rem;
        height: 0.25rem;
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
        position:relative;
    }
    .refund{
        font-size:.22rem;
        display: inline-block;
        color:#FFFFFF;
        width:1.1rem;
        text-align:center;
        line-height: .44rem;
        background:#FE7649;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        -webkit-box-shadow: 1px 1px 3px #FE7649;
        -moz-box-shadow: 1px 1px 3px #FE7649;
        box-shadow: 1px 1px 3px #FE7649;
        position:absolute;
        right:0;
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
    .gray-color{
        color:#999999;
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
        min-width:.8rem;
    }

.copy-img {
    width: 0.2rem;
    height: 0.24rem;
}
</style>
