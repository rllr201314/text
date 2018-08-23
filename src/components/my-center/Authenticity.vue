<template>
    <!-- 客服真伪验证 -->
    <div class="authenticity-wrap">
        <div class="authent-header">
            <Header v-bind:showTitle="comData.showTitle"></Header>
            <div class="header-content">
                <div class="header-title-top">客服真伪鉴定</div>
                <div class="header-title-bottom">严防欺诈行为，维护交易安全</div>
            </div>
        </div>
        <div class="authent-content">
            <div class="authent-content-top">
                <div class="authent-cell">
                    <div class="authent-strip-inp">
                        <input type="number" placeholder="请输入客服QQ进行验证"><span>验证QQ客服</span>
                    </div>
                    <div class="authent-strip-inp">
                        <input type="text" placeholder="请输入客服微信进行验证"><span>验证微信客服</span>
                    </div>
                    <div class="authent-strip-inp">
                        <input type="text" placeholder="请复制商品链接进行验证"><span>验证商品链接</span>
                    </div>
                </div>
                <div class="verify-cell">
                    <div class="verify-strip-title">
                        <div class="title-txt">验证结果</div>
                    </div>
                    <div class="verifg-content" v-show="authentData.verifgType == 1">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/true_good.png" alt="">
                        </div>
                        <div class="verifg-text">
                            <div>看个号客服1号</div>
                            <div>小花竭诚为您服务！</div>
                            <div class="link-up">
                                <img src="../../../static/img/my-center/news_ico.png" alt="">
                                <span>在线沟通</span>
                            </div>
                        </div>
                    </div>
                    <div class="verifg-content" v-show="authentData.verifgType == 2">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/false_good.png" alt="">
                        </div>
                        <div class="verifg-text">
                            <div>您验证的信息非看个号官方提供</div>
                            <div>请尽快<span class="red-color">停止操作</span></div>
                            <div>以免您的财产损失</div>
                        </div>
                    </div>
                    <div class="verifg-content" v-show="authentData.verifgType == 3">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/false_link.png" alt="">
                        </div>
                        <div class="verifg-text">
                            <div>您搜索的商品链接非</div>
                            <div>看个号平台提供</div>
                            <div><span class="red-color">请勿操作</span>，谨防受骗</div>
                        </div>
                    </div>
                    <div class="verifg-content" v-show="authentData.verifgType == 4">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/true_link.png" alt="">
                        </div>
                        <div class="verifg-text">
                            <div>您搜索的商品是由看个号</div>
                            <div>平台提供的真实商品</div>
                            <div>请放心交易</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="service">举报和投诉，请联系<span class="go-service">在线客服</span></div>
            <Footer class="footer"></Footer>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    import Footer from '@/components/home-page/Footer'
    export default {
        name:'Authenticity',
        components:{
            Header,
            Footer
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:'',//1搜索2分享3菜单
                        showBg:false,//是否显示背景
                        title:"",
                    }
                },
                authentData:{
                    verifgType:1,
                }
            }
        }
    }
</script>
<style scoped>
    .authenticity-wrap{
        max-width:12rem;
        margin:0 auto;
        position: relative;
    }
    .authent-header{
        text-align: center;
        height:3.58rem;
        background:url(../../../static/img/my-center/verify_hbg.png) no-repeat;
        background-size:100% 3.58rem;
    }
    .header-content{
        color:#333333;
    }
    .header-title-top{
        font-size:.4rem;
        margin-bottom:.2rem;
    }
    .header-title-bottom{
        font-size:.28rem;
    }

    .authent-content{
        font-size:.26rem;
        position:absolute;
        top:2rem;
        left:0;
        right:0;
    }
    .authent-content-top{
        padding:.2rem;
    }
    .authent-cell{
        padding:.4rem .4rem .1rem;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .authent-strip-inp{
        margin-bottom:.3rem;
        line-height: .76rem;
        border:.01rem solid #D2D2D2;
        border-radius: .06rem;
    }
    .authent-strip-inp span{
        width:calc(100% - 4.4rem);
        text-align: center;
        color:#FFFFFF;
        display:inline-block;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);

    }
    
    .verify-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;

    }
    .verify-strip-title{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .title-txt{
        background-image:url("../../../static/img/board_mark_big.png");
        background-repeat: no-repeat;
        background-size:1.49rem .21rem;
        background-position: 50% ;
        text-align:center;
        width:1.49rem;
        color:#FC604E;
        font-size:.26rem;
        margin: 0 auto;
    }
    .verifg-content{
        color:#333333;
        padding:.7rem 0;
    }
    .verifg-img{
        width:1.2rem;
        height:1.17rem;
        display: inline-block;
        margin:0 .7rem 0 1rem;
        vertical-align: middle;
    }
    .verifg-img img{
        width:1.2rem;
        height:1.17rem;
    }
    .verifg-text{
        vertical-align: middle;
        display:inline-block;
    }
    .link-up{
        display: inline-block;
        margin-top:.1rem;
    }
    .link-up img{
        width:.29rem;
        height:.26rem;
        vertical-align: middle;
    }
    .link-up span{
        color:#666666;
        font-size:.24rem;
        vertical-align: middle;
    }

    .service{
        font-size:.24rem;
        color:#999999;
        text-align:center;
        margin:.6rem 0 .3rem;
    }
    .go-service{
        color:#FE7649;
        text-decoration: underline;
    }

    .red-color{
        color:#FF5E5E;
    }


     /* ==========input========= */
    input{
        margin:0;
        padding:.1rem;
        font-size:.24rem;
        border:none;
        width:4.4rem;
        height:.6rem;
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
