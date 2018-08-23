<template>
    <!-- 收货 -->
    <div class="take-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="take-content">
            <OrderInfo v-bind:orderInfo="componentsData.orderInfo"></OrderInfo>
            <!-- 订单号，分期情况，实际支付 -->
            <div class="take-cell">
                <div class="goodsInfo">
                    <div class="goodsInfo-left">订单号</div>
                    <div class="goodsInfo-right">
                        <span v-text="takeData.orderInfo.orderNum"></span>
                        <span class="blue-color" :data-clipboard-text="takeData.orderInfo.orderNum" @click="copyFn()" id="copy">[复制]</span>
                    </div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">分期情况</div>
                    <div class="goodsInfo-right" v-text="takeData.orderInfo.order"></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">实际支付</div>
                    <div class="goodsInfo-right">
                        <span class="red-color" v-text="takeData.orderInfo.price"></span>
                        <span class="green-color">已支付</span>
                    </div>
                </div>  
            </div>
            <!-- 状态 -->
            <div class="take-status-img-cell">
                <img v-for="item in takeData.takeTypeImg" v-show="item.key == takeData.takeType" :src="item.imgsrc" alt="">
            </div>
            <!-- 收货状态 -->
            <div class="take-cell">
                <div class="take-status-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>收货状态</span>
                    <span class="red-color" v-if="takeData.takeType == 2">（如果您已检验账号没有问题，请确认交易）</span>
                    <span class="gray-border" v-if="takeData.takeType == 5">已收货</span>
                    <span class="award" v-if="takeData.takeType == 5">申请仲裁</span>
                </div>
                <div class="take-cell-content">
                    <div class="cargo" v-if="takeData.takeType == 1">申请验货</div>
                    <div class="cargo" v-if="takeData.takeType == 2">确认交易</div>
                    <div class="intie" v-if="takeData.takeType == 3">
                        <img src="../../../static/img/order/speed.png" alt="">
                        <span>客服正在为您火速换绑中，请您耐心等待</span>
                    </div>
                    <div class="confirm-receipt" v-if="takeData.takeType == 4 ||　takeData.takeType == 5">
                        <div class="confirm-title">
                            <span>游戏截图（{{takeData.gamePrint}}）</span><span class="red-color">点击查看</span>
                        </div>
                        <div>换绑一般会在24小时后生效，请验收账号没有问题后，确认收货！</div>
                        <div class="account">
                            <div class="accountText"><span>游戏账号:</span>{{takeData.account}}</div>
                            <div class="accountText"><span>密码:</span>{{takeData.password}}</div>
                        </div>
                        <div class="cargo" v-if="takeData.takeType == 4">确认收货</div>
                    </div>
                </div>
            </div>
            <div class="take-bottom">交易过程中，如有任何疑问，请及时<span class="red-color">咨询客服</span></div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'//头部
    import OrderInfo from '@/components/buy/OrderInfo'//订单信息
    export default {
        name:'TakeDelivery',
        components:{
            Header,
            OrderInfo,
        },
        data(){
            return {
                componentsData:{
                    showTitle:{
                        showBack:false,//显示后退按钮
                        showLogo:2,//不显示头部log
                        showShare:3,//1搜索2分享
                        showBg:true,//是否显示背景
                        title:"收货",
                    },
                    orderInfo:{
                        order_type:2,//1商品详情 2订单详情
                        order_title:"梦幻西游xxxxxxxxssssssssssssssss",
                        order_des:['华为一区>群英荟萃','96级','方寸5山','成品号','邮箱、身份证、手机号']
                    },
                },
                takeData:{
                    orderInfo:{
                        orderNum:'136544654',
                        order:'首付50%，期数5期，每月利息3%',
                        price:"￥2888"
                    },
                    takeType:5,//1-申请验货 2-确认交易 3-换绑 4-确认收货 5-申请仲裁
                    takeTypeImg:[{
                        key:1,
                        imgsrc:'./static/img/order/one.png',
                    },{
                        key:2,
                        imgsrc:'./static/img/order/two.png',
                    },{
                        key:3,
                        imgsrc:'./static/img/order/three.png',
                    },{
                        key:4,
                        imgsrc:'./static/img/order/four.png',
                    },{
                        key:5,
                        imgsrc:'./static/img/order/four.png',
                    }],
                    gamePrint:8,
                    account:'dsjjf@126.com',
                    password:'15659894465'
                }
            }
        },
        methods:{
            copyFn(){
                console.log('1')
                let that = this;
                let clipboard = new ClipboardJS('#copy');
                clipboard.on('success',function(e){
                    clipboard.destroy();
                    console.log('成功');
                    mui.alert('复制成功','提示','确认',null,'div')
                });
                clipboard.on('error',function(e){
                    clipboard.destory();
                    console.log('失败')
                    mui.alert('请重新点击复制','提示','确认',null,'div')
                })
            }
        }
    }
</script>
<style>
    .take-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .take-content{
        padding:.2rem .2rem 0;
    }
    .take-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .take-cell .goodsInfo:nth-last-child(1){
        border:none;
    }
    .goodsInfo{
        line-height:.9rem;
        border-bottom:.01rem solid #E5E5E5;
        margin-left:.2rem;
        padding-right:.2rem;
    }
    .goodsInfo-left,.goodsInfo-right{
        display:inline-block;
        font-size:.26rem;
    }
    .goodsInfo-left{
        color:#666666;
    }
    
    .goodsInfo-right{
        color:#333333;
        float: right;
    }
    .blue-color{
        color:#4AC0F4;
        font-size:.28rem;
        margin-left:.1rem;
    }
    .green-color{
        color:#FFFFFF;
        background:#45C773;
        text-align: center;
        font-size:.2rem;
    }
    .red-color{
        color:#FF5E5E !important;
    }
    .take-status-img-cell{
        text-align: center;
        width:6.39rem;
        height:.95rem;
        margin:.2rem auto;
    }
    .take-status-img-cell img{
        width:6.39rem;
        height:.95rem;
    }


    .take-status-title{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    
    .take-status-title span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
        margin-right:.2rem;
    }
    .take-status-title .red-color{
        font-size:.24rem;
    }   
    .take-status-title img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .take-cell-content{
        font-size:.26rem;
        color:#666666;
        padding:.35rem .2rem;
    }
    .cargo{
        width:1.1rem;
        color:#FFFFFF;
        line-height:.44rem;
        text-align: center;
        background:#FE7649;
        font-size:.22rem;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        margin:0 auto;
    }
    .intie{
        text-align: center;
    }
    .intie img{
        width:.25rem;
        height:.25rem;
        vertical-align: middle;
    }
    .intie span{
        vertical-align: middle;
    }
    .confirm-title{
        margin-bottom: .2rem;
    }
    .confirm-title span{
        color:#999999;
    }
    .account{
        background:#F6F6F6;
        /* -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem; */
        padding:.2rem .15rem;
        margin:.2rem 0;
    }
    .accountText{
        line-height:.5rem;
        color:#333333;
    }
    .accountText span{
        width:1.3rem;
        display:inline-block;
        text-align:right;
        padding-right:.1rem;
        color:#666666;
    }


    .take-bottom{
        font-size:.24rem;
        color:#999999;
        text-align:center;
        margin-bottom:.3rem;
    }
    .take-bottom span{
        text-decoration: underline;
    }
    .take-status-title .gray-border{
        border:.01rem solid #B5B5B5;
        width:.78rem;
        font-size:.2rem;
        text-align:center;
        line-height: .35rem;
        -webkit-border-radius: .18rem;
        -moz-border-radius: .18rem;
        border-radius: .18rem;
        color:#999999;
    }
    .take-status-title .award{
        float:right;
        font-size:.24rem;
        color:#999999;
    }

</style>
