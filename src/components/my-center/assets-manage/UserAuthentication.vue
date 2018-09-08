<template>
    <!-- 用户认证 -->
    <div class="userauthentic-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="userauthentic-content">
            <div class="add-card" v-if="pageType==1">
                <img src="../../../../static/img/assets-manage/user_card.png" alt="">
                <div>为了您的资金安全，请先完成个人实名认证</div>
                <div class="go-authentic">前往认证</div>
            </div>
            <div class="manange-card" v-else-if="pageType==2">
                <div class="manange-top">
                    <img src="../../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请绑定持卡人本人的银行卡</span>
                </div>
                <div class="manange-content">
                    <div class="manange-strip" >
                        <span class="manange-left">持卡人</span>
                        <span>认错</span>
                        <span class="hint-right red-color">（为了您的资金安全，持卡人必须为认证用户本人）</span>
                    </div>
                    <div class="manange-strip" >
                        <span class="manange-left card-type">银行卡类型</span>
                        <div class="right-strip">
                            <span>请选择银行卡类型</span>
                            <img src="../../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="manange-strip" >
                        <span class="manange-left">银行卡号</span>
                        <input type="number" class="card-num" placeholder="请输入银行卡号">
                    </div>
                    <div class="manange-strip" >
                        <span class="manange-left">开户行</span>
                        <input type="text" class="card-name" placeholder="请填写您的开户行名称">
                        <span class="red-color">（请咨询各银行服务热线）</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="protocol" v-if="pageType==2">
            <img :src="protocol?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
            <div>
                我已阅读并同意<span class="red-color">《看个号手机网游平台协议》</span>
            </div>
        </div>
        <div class="okBtn" v-if="pageType==2">提交绑定信息</div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'UserAuthentication',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:5,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                        title:"选择银行卡",
                    }
                },
                pageType:2  ,//控制页面是添加银行卡还是选择银行卡----
                protocol:false,
            }
        },
        mounted(){
           
        },
        methods:{
            
        }
    }
</script>
<style scoped>
    .userauthentic-wrap{
        max-width: 12rem;
        margin:0 auto;
        height:100%;
    }
    .userauthentic-content{
        font-size:.26rem;
        color:#333333;
        padding:.2rem;
    }
    .add-card{
        text-align: center;
    }
    .add-card img{
        width:1.57rem;
        height:1.26rem;
        margin:3rem 0 .5rem;
    }
    .go-authentic{
        width:1.1rem;
        line-height: .44rem;
        font-size:.22rem;
        background:#FE7649;
        color:#FFFFFF;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        -webkit-box-shadow: .01rem .02rem .09rem #FE7649;
        -moz-box-shadow: .01rem .02rem .09rem #FE7649;
        box-shadow: .01rem .02rem .09rem #FE7649;
        margin:.2rem auto 0;
    }

    .manange-card{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
    }
    .manange-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .manange-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .manange-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .manange-content{
        padding-left:.2rem;
    }
    .manange-strip{
        line-height: .9rem;
        font-size:.26rem;
        border-bottom:.01rem solid #E5E5E5;
        position: relative;
    }
    .manange-strip span{
        display: inline-block;
    }
    .manange-left{
        width:1.2rem;
        font-size:.26rem;
        color:#666666;
    }
    .card-type{
        width:1.4rem;
    }
    .hint-right{
        width:3rem;
        line-height: .3rem;
        position:absolute;
        right:.2rem;
        top:0.15rem;
    }
    .red-color{
        font-size:.24rem;
        color:#FF5E5E;
    }
    .right-strip{
        color:#999999;
        position:absolute;
        right:.2rem;
        top:0;

    }
    .right-strip img{
        width:.13rem;
        height:.24rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .right-strip span{
        vertical-align: middle;
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
    /* 提交申请 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.2rem auto 0;
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


    .card-num{
        width:4rem;
    }
     /* ==========input========= */
    input{
        font-size:.26rem;
        border:none;
        padding:0;
        margin:0;
        width:2.65rem;
        height:.9rem;
        line-height: .9rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.26rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.26rem;
    }
</style>
