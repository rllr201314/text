<template>
    <!-- 下单 -->
    <div class="placeOrder-wrap">
        <!-- 头部 -->
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="placeOrder-content">
            <!-- 商品详情 -->
            <OrderInfo v-bind:orderInfo="componentsData.orderInfo"></OrderInfo>
            <!-- 联系方式 -->
            <div class="contact-wrap placeOrder-cell">
                <div class="goods-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>联系方式</span>
                </div>
                <div class="contact-content">
                    <div class="contact-cell inpright">
                        <span class="celltext">微信号</span>
                        <input type="text" placeholder="请输入您的微信号">
                    </div>
                    <div class="contact-cell inpright">
                        <span class="celltext">手机号</span>
                        <input type="number" placeholder="请输入您的手机号">
                    </div>
                    <div class="contact-bottom red-color">请输入您真实的联系方式，以方便客服能在交易过程中的第一时间联系到您。</div>
                </div>
            </div>
            <!-- 订单详情 -->
            <div class="placeOrder-cell">
                <div class="goods-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>订单详情</span>
                </div>
                <div class="contact-content">
                    <div class="contact-cell">
                        <span class="celltext">商品单价</span>
                        <div class="cell-right">
                            <span class="unit-price price" v-text="orderData.orderInfo.unitPrice"></span>
                        </div>
                    </div>
                    <div class="contact-cell">
                        <span class="celltext">商品数量</span>
                        <div class="cell-right raise-good">
                            <img src="../../../static/img/sub_price.png" alt="" @click="addbtn('sub')">
                            <input type="number"  v-model="orderData.orderInfo.goodsNum">
                            <img src="../../../static/img/add_price.png" alt="" @click="addbtn('add')">
                        </div>
                    </div>
                    <div class="contact-cell">
                        <span class="celltext">优惠券</span>
                        <div class="cell-right descount">
                            <span class="gray-color">无可用优惠券</span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="contact-cell">
                        <span class="celltext">分期付款</span>
                        <div class="sele-opera">
                            <div class="opera" @click="seleOpera('nostage')">
                                <img :src="orderData.orderInfo.operaStage.noStage?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>一口价</span>
                            </div>
                            <div class="opera" @click="seleOpera('stage')">
                                <img :src="orderData.orderInfo.operaStage.stage?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>分期</span>
                            </div>
                        </div>
                    </div>
                    <div class="order-cell" v-show="orderData.orderInfo.operaStage.stage">
                        <span class="celltext downPay-left">首付金额</span>
                        <div class="sele-opera downPay-right">
                            <div class="sele-downPay" @click="showOpera('downPay')">
                                <span v-for="item in orderData.orderInfo.downPayOpera" v-if="item.issele" v-text="item.name"></span>
                                <img src="../../../static/img/goodscreen/downsolid.png" alt="">
                            </div>
                            <div v-show="orderData.orderInfo.showInpDownPay">
                                <input type="number" placeholder="填写希望的首付金额"><span class="sole">元</span>
                            </div>
                        </div>
                    </div>
                    <div class="order-cell" v-show="orderData.orderInfo.operaStage.stage">
                        <span class="celltext downPay-left">期数</span>
                        <div class="sele-opera downPay-right">
                            <div class="sele-downPay" @click="showOpera('stage')">
                                <span v-for="item in orderData.orderInfo.stageOpera" v-if="item.issele" v-text="item.name"></span>
                                <img src="../../../static/img/goodscreen/downsolid.png" alt="">
                            </div>
                            <div class="gray-color">
                                <div v-for="item in orderData.orderInfo.stageInfo" v-text="item"></div>
                            </div>
                            <span class="red-color hint">（分期支付不足全额50%，不开放安全锁）</span>
                        </div>
                    </div>
                    <div class="contact-cell ">
                        <span class="celltext">保险</span>
                        <div class="sele-opera">
                            <div class="opera" @click="seleOpera('safe')">
                                <img :src="orderData.orderInfo.operaSafe.safe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>买保险</span><span class="red-color" v-text="orderData.orderInfo.safePrice"></span>
                            </div>
                            <div class="opera"  @click="seleOpera('nosafe')">
                                <img :src="orderData.orderInfo.operaSafe.noSafe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>不购买</span>
                            </div>
                        </div>
                    </div>
                    <div class="contact-cell">
                        <div class="cell-right">
                            <div class="total-price price">实际支付：<span class="red-color" v-text="orderData.orderInfo.totalPrice"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="protocol">
            <img :src="orderData.orderInfo.protocol?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
            <div>
                我已阅读<span class="red-color">《看个号平台交易协议》</span>
            </div>
        </div>
        <div class="nextBtn">下一步</div>
        <!-- 遮罩 -->
        <div class="orderShare" v-show="orderData.orderInfo.showOrderShare"></div>
        <!-- 分期首付选项栏 -->
        <div class="stageBox" v-show="orderData.orderInfo.showDownPayBox">
            <div class="stageBox-cell" v-for="item in orderData.orderInfo.downPayOpera" @click="seleDownPay(item.key)">
                <img :src="item.issele?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                {{item.name}}
            </div>
        </div>
        <div class="stageBox" v-show="orderData.orderInfo.showStageBox">
            <div class="stageBox-cell" v-for="item in orderData.orderInfo.stageOpera" @click="seleStage(item.key)">
                <img :src="item.issele?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'//头部
    import OrderInfo from '@/components/buy/OrderInfo'//商品信息

    export default {
        name:'PlaceOrder',
        components:{
            Header,
            OrderInfo,
        },
        data(){
            return {
                componentsData:{
                     // Header
                    showTitle:{
                        showBack:false,//显示后退按钮
                        showLogo:2,//不显示头部log
                        showShare:3,//1搜索2分享
                        showBg:true,//是否显示背景
                        title:"商品下单",
                    },
                    orderInfo:{
                        order_type:1,//1商品详情 2订单详情
                        order_title:"梦幻西游xxxxxxxxssssssssssssssss",
                        order_des:['华为一区>群英荟萃','96级','方寸山','成品号','邮箱、身份证、手机号']
                    },
                },
                orderData:{
                    orderInfo:{
                        unitPrice:"￥2999",//单价
                        totalPrice:"￥5000",//总价
                        goodsNum:1,
                        safePrice:'(￥25)',//保险价格
                        protocol:true,//阅读协议
                        showDownPayBox:false,//首付选项显示
                        showStageBox:false,//分期选项显示
                        showInpDownPay:false,//自定义分期显示
                        showOrderShare:false,//遮罩
                        // 是否分期
                        operaStage:{
                            stage:false,
                            noStage:true,
                        },
                        // 是否购买保险
                        operaSafe:{
                            safe:true,
                            noSafe:false,
                        },
                        // 首付多少
                        downPayOpera:[{
                            issele:true,
                            name:"首付50%",
                            key:1
                        },{
                            issele:false,
                            name:"首付30%",
                            key:2
                        },{
                            issele:false,
                            name:"自定义金额（不少于30%）",
                            key:3
                        }],
                        stageInfo:['第一期  ¥1150（本金1000，利息5000*3%=150）','第二期  ¥1120（本金1000，利息4000*3%=120）','第三期  ¥1090（本金1000，利息3000*3%=90）'],
                        stageOpera:[{
                            issele:true,
                            name:"分一期",
                            key:1
                        },{
                            issele:false,
                            name:"分er期%",
                            key:2
                        },{
                            issele:false,
                            name:"分san期",
                            key:3
                        }]
                        
                    }
                }
            }
        },
        methods:{
            // 商品数量
            addbtn(flag){
                if(flag == 'sub'){
                    this.orderData.orderInfo.goodsNum--; 
                }else if(flag == 'add'){
                    this.orderData.orderInfo.goodsNum++; 
                }
            },
            // 选择分期和保险
            seleOpera(flag){
                console.log(flag);
                if(flag == 'nostage'){
                    this.orderData.orderInfo.operaStage.stage = false;
                    this.orderData.orderInfo.operaStage.noStage = true;
                }else if(flag == 'stage'){
                    this.orderData.orderInfo.operaStage.stage = true;
                    this.orderData.orderInfo.operaStage.noStage = false;
                }else if(flag == 'nosafe'){
                    this.orderData.orderInfo.operaSafe.noSafe = true;
                    this.orderData.orderInfo.operaSafe.safe = false;
                }else if(flag == 'safe'){
                    this.orderData.orderInfo.operaSafe.noSafe = false;
                    this.orderData.orderInfo.operaSafe.safe = true;
                }
            },
            // 显示分期首付
            showOpera(opt){
                if(opt == 'downPay'){
                    this.orderData.orderInfo.showDownPayBox = true;
                }else if(opt == 'stage'){
                    this.orderData.orderInfo.showStageBox = true;
                }
                this.orderData.orderInfo.showOrderShare = true;
            },
            // 选择分期首付比例
            seleDownPay(opera){
                var downPayOpera =  this.orderData.orderInfo.downPayOpera;
                for(var i in downPayOpera){
                    if(downPayOpera[i].key == opera){
                        downPayOpera[i].issele = true;
                        continue;
                    }
                    downPayOpera[i].issele = false;
                }
                
                this.orderData.orderInfo.showInpDownPay = false;//自定义分期输入框
                // 3--选择首付自定义
                if(opera == 3){
                    this.orderData.orderInfo.showInpDownPay = true;//自定义分期输入框
                }
                this.orderData.orderInfo.showDownPayBox = false;//隐藏分期首付选项
                this.orderData.orderInfo.showOrderShare = false;//隐藏遮罩
            },
            // 选择分期
            seleStage(opera){
                var stageOpera =  this.orderData.orderInfo.stageOpera;
                for(var i in stageOpera){
                    if(stageOpera[i].key == opera){
                        stageOpera[i].issele = true;
                        continue;
                    }
                    stageOpera[i].issele = false;
                }
                this.orderData.orderInfo.showStageBox = false;//隐藏分期首付选项
                this.orderData.orderInfo.showOrderShare = false;//隐藏遮罩
            }
        }
    }
</script>
<style scoped>
    .placeOrder-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .placeOrder-content{
        padding:.2rem .2rem 0;
    }
    /* 商品信息 */
    .placeOrder-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .goods-info-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    
    .goods-info-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .goods-info-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }

    .goods-info-content{
        padding:.2rem 0;
        font-size:.26rem;
        color:#666666;
    }
    .goods-info-content img{
        width:1.1rem;
        height:1.1rem;
        margin:0 .6rem 0 .35rem;
        vertical-align: middle;
    }
    .goods-info{
        display:inline-block;
        width:4.8rem;
        vertical-align: middle;
    }
    .goods-info-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:#333333;
        margin-bottom:.15rem;
    }
    .goods-info-left,.goods-info-right{
        display:inline-block;
        vertical-align: middle;
    }
    .goods-info-left div{
        margin-bottom:.1rem;
    }
    .goods-info-right div{
        margin-bottom:.1rem;
        color:#333333;
    }
    .goods-info-left{
        margin-right:.35rem;
    }
    .contact-content{
        padding-left: .2rem;
    }
    .contact-cell{
        line-height: .9rem;
        border-bottom: .01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .contact-cell::after{
        display:block;
        clear: both;
        content:"";
    }
    .inpright input{
        width:70%;
        text-align: right;
        border:0;
        margin:0;
        height: .9rem;
        float: right;
    }
    .celltext{
        color:#666666;
        font-size:.26rem;
        display: inline-block;
        width:1.35rem;
    }
    
    .contact-bottom{
        padding:.17rem;
        font-size:.24rem;
    }
    .red-color{
        color:#FF5E5E !important;
    }

    /*  */
    .cell-right{
        float:right;
    }
    /* 价格 */
    .price{
        font-size:.26rem;
        color:#333333;
    }

    /* 商品数量 */
    .raise-good input{
        width:.8rem;
        height:.42rem;
        padding:0 .05rem;
        outline:none;
        border:.01rem solid #D2D2D2;
        vertical-align: middle;
        margin:0 .2rem;
    }
    .raise-good img{
        width:.29rem;
        height:.29rem;
        vertical-align: middle;
    }
    /*  */
    .order-cell{
        border-bottom: .01rem solid #E5E5E5;
        padding:.2rem .2rem .2rem 0;
    }
    /* 优惠券 */
    .descount img{
        width:.13rem;
        height:.24rem;
        vertical-align: middle;
    }
    .gray-color{
        color:#999999;
        font-size:.24rem;
    }
    /* 选项 */
    .sele-opera{
        width:5rem;
        display: inline-block;
    }
    .opera{
        display: inline-block;
        margin-right:.7rem;
    }
    .opera img{
        width:.22rem;
        height:.22rem;
        vertical-align: middle;
    }
    .opera span{
        font-size:.26rem;
        color:#333333;
        vertical-align: middle;
    }
    /* 首付金额 */
    .downPay-left{
        margin-top:.1rem;
    }
    .downPay-left,downPay-right{
        vertical-align: top;
    }
    .downPay-right input{
        width:3.65rem;
        height:.5rem;
        margin:0;
        padding:0 .1rem;
    }
    .sele-downPay{
        line-height: .5rem;
        color:#333333;
        font-size:.24rem;
        border: .01rem solid #D2D2D2;
        -webkit-border-radius: .06rem;
        -moz-border-radius: .06rem;
        border-radius: .06rem;
        padding:0 .15rem;
        display: inline-block;
        margin-bottom:.2rem;
    }
    .sele-downPay span{
        margin-right:.5rem;
        vertical-align: middle;
    }
    .sele-downPay img{
        width:.2rem;
        height:.1rem;
        vertical-align: middle;
    }
    .sole{
        color:#333333;
        font-size:.26rem;
        margin-left: .1rem; 
    }


    /* 协议 */
    .protocol{
        margin:0 0 .2rem;
        padding:0 .2rem;
    }
    .protocol img{
        width:.28rem;
        height:.28rem;
        vertical-align: middle;
    }
    .protocol div{
        display: inline-block;
        font-size:.22rem;
    }
    /* 下一步 */
    .nextBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:0 auto .3rem;
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

    .hint{
        font-size:.22rem;
    }
    /* 分期弹出框 */
    .stageBox{
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
        top:45%;
    }
    .stageBox-cell{
        line-height: .9rem;
    }
    .stageBox-cell img{
        width:.22rem;
        height:.22rem;
        margin-left:.16rem;
    }
    .orderShare{
        position:fixed;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background: rgba(0, 0, 0, .5);
        z-index: 8;
    }

   

    /* ==========input========= */
    input{
        font-size:.24rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.24rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.24rem;
    }
    
</style>
