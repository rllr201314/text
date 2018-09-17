<template>
    <!-- 未支付 -->
    <div class="unpaid-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="unpaid-content">
            <div class="unpaid-cell" v-for="item in goodsData">
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
                     <div class="last-time">
                         倒计时<span class="time" v-text="item.time_h"></span><span class="gray">小时</span><span class="time" v-text="item.time_m"></span><span class="gray">分</span>后订单将自动取消
                     </div>
                </div>
                <div class="order-operate">
                    <div class="left-operate">
                        <img src="../../../../static/img/my-center/contact_service.png" alt="">
                        <span>联系客服</span>
                    </div>
                    <div class="right-operate">
                        <span class="cancel" @click="cancalOrder(item.key)">取消订单</span>
                        <span class="pay">前往支付</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 遮罩 -->
        <div class="unpaidShare" v-show="showUnpaidShare"></div>

        <div class="unpaidBox" v-show="showUnpaidBox">
            <div class="unpaidBox-title">请选择您放弃交易的原因</div>
            <div class="unpaidBox-cell" v-for="item in stageOpera" @click="seleStage(item.key)">
                <img :src="item.issele?'../../../../static/img/order/okcheck.png':'../../../../static/img/order/nocheck.png'" alt="">
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'BuyUnpaidStatus',
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
                        title:"未支付订单",
                    }
                },
                showUnpaidBox:false,//分期选项显示
                showUnpaidShare:false,//遮罩
                goodsData:[{
                    key:1,
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    time_h:5,
                    time_m:39,
                    orderStatus:'待支付',
                },{ 
                    key:2,
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    time_h:5,
                    time_m:39,
                    orderStatus:'待支付',
                },{ 
                    key:3,
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    time_h:5,
                    time_m:39,
                    orderStatus:'待支付',
                }],
                stageOpera:[{
                            issele:true,
                            name:"商品与描述不符",
                            key:1
                        },{
                            issele:false,
                            name:"反悔不想买了%",
                            key:2
                        },{
                            issele:false,
                            name:"卖家不想卖了",
                            key:3
                        },{
                            issele:false,
                            name:"其他原因",
                            key:4
                        }]
            }
        },
        methods:{
            // 选择分期
            seleStage(opera){
                var stageOpera =  this.stageOpera;
                for(var i in stageOpera){
                    if(stageOpera[i].key == opera){
                        stageOpera[i].issele = true;
                        continue;
                    }
                    stageOpera[i].issele = false;
                }
                this.showUnpaidBox = false;//隐藏分期首付选项
                this.showUnpaidShare = false;//隐藏遮罩
            },
            cancalOrder(opt){
                console.log(opt);
                this.showUnpaidBox = true;
                this.showUnpaidShare = true;
            },
            getData(){
                var that = this;
                that.$axios.post('/api/buyer_trade').then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            
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
<style scoped>
    .unpaid-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .unpaid-content{
        padding:.2rem;
    }
    .unpaid-cell{
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
        position:relative;
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
    .price-status{
        margin-bottom:.2rem;
    }
    .good-price{
        color:#FF5E5E;
        font-size:.28rem;
        margin-right:.1rem;
    }
    .order-status{
        font-size:.2rem;
        background:#FF5E5E;
        padding:.01rem .05rem;
        color:#FFFFFF;
        line-height: .3rem;
        text-align:center;
        vertical-align: middle;
    }
    .last-time{
        font-size:.24rem;
        color:#666666;
    }
    .time{
        width:.4rem;
        height: .4rem;
        color:#333333;
        text-align:center;
        line-height: .4rem;
        border:.01rem solid #AAAAAA;
        font-size:.26rem;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        margin:0 .1rem;
    }
    .gray{
        color:#959595;
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
    .cancel{
        background:#C6C6C6;
        margin-right:.2rem;
    }
    .pay{
        background:#FE7649;
    }



    .unpaidBox{
        width:4rem;
        background:#FFFFFF;
        color:#333333;
        font-size:.26rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        z-index:10;
        position:fixed;
        left:calc(50% - 2rem);
        top:30%;
    }
    .unpaidBox-title{
        line-height: .9rem;
        padding-left:.2rem;
    }
    .unpaidBox-cell{
        line-height: .9rem;
        border-top:.01rem solid #E5E5E5;
    }
    .unpaidBox-cell img{
        width:.22rem;
        height:.22rem;
        margin-left:.16rem;
    }
    .unpaidShare{
        position:fixed;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background: rgba(0, 0, 0, .5);
        z-index: 8;
    }
</style>
