<template>
    <div class="login-wrap">
        <div class="login-header">
            <Header v-bind:showTitle="comData.showTitle"></Header>
        </div>
        <div class="login-content">
           <div class="login-cell">
                <div class="login-strip">
                   <img class="phone-ico" src="../../../../static/img/my-center/phone_ico.png" alt="">
                   <input type="number" placeholder="请输入您的手机号">
               </div>
               <div class="login-strip">
                   <img class="pass-ico" src="../../../../static/img/my-center/password_ico.png" alt="">
                   <input type="password" placeholder="请输入密码">
               </div>   
           </div>
           <div class="login-bottom">
               <span class="phone-login">手机短信登录</span>
               <span class="go-register">立即注册</span>
            </div>
        </div>
        <div class="nextBtn">登录</div>
        <div class="login-type">
            <div class="login-type-title">
                <img src="../../../../static/img/goods-details/left_solid.png" alt="">
                <span>第三方授权登录</span>
                <img src="../../../../static/img/goods-details/right_solid.png" alt="">
            </div>
            <div class="login-type-content">
                <img class="wechat" src="../../../../static/img/my-center/wx_ico.png" alt="">
                <img src="../../../../static/img/my-center/qq_ico.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'AccountLogin',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:'',//1搜索2分享3菜单
                        showBg:false,//是否显示背景
                        title:"登录",
                    }
                }
            }
        },
        methods:{

        }
    }
</script>
<style scoped>
    .login-wrap{
        max-width:7.5rem;
        margin:0 auto;
    }
    .login-header{
        width:100%;
        height:5.24rem;
        background:url(../../../../static/img/my-center/login_hbg.png) no-repeat;
        background-size:100% 5.24rem;
    }
    .login-content{
        padding:.3rem .2rem 0;
    }
    .login-cell{
        padding:0 0 0 .3rem;
        background: #FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
    }
    
    
    .login-strip{
        border-bottom:.01rem solid #E5E5E5;
        line-height: .9rem;
    }
    .phone-ico{
        width:.23rem;
        height:.3rem;
        vertical-align: middle;
    }
    .pass-ico{
        width:.26rem;
        height:.3rem;
        vertical-align: middle;
    }
    .login-bottom{
        line-height: .7rem;
        font-size:.24rem;
        color:#999999;
        padding-right:.3rem;
    }
    .phone-login{
        text-decoration: underline;
    }
    .go-register{
        float:right;
        color:#FE7649;
    }

    /* 下一步 */
    .nextBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.4rem auto 0;
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

    .login-type{
        margin-top:2rem;
        text-align: center;
    }
    .login-type-title{
        color:#999999;
        font-size:.24rem;
        margin-bottom:.2rem;
    }
    .login-type-title img{
        width:1.17rem;
        height:.02rem;
        vertical-align: middle;
    }
    .login-type-content img{
        width:.6rem;
        height:.6rem;
    }
    .wechat{
        margin-right:.4rem;
    }



     /* ==========input========= */
    input{
        margin:0;
        padding:.1rem;
        font-size:.24rem;
        border:none;
        width:4.7rem;
        height:.6rem;
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
