<template>
    <div class="login-wrap">
        <div class="login-header">
            <!-- <Header v-bind:showTitle="comData.showTitle"></Header> -->
            <div class="login-title">
                <img src="../../../../static/img/header/back_ico.png" alt="" @click="gobake">
                <span>登录</span>
            </div>
        </div>
        <div class="login-content">
            <div class="login-cell">
                <div class="login-strip">
                    <img class="phone-ico" src="../../../../static/img/my-center/phone_ico.png" alt="">
                    <input type="number" placeholder="请输入您的手机号" v-model="phone">
                </div>
                <div class="login-strip">
                    <img class="pass-ico" src="../../../../static/img/my-center/password_ico.png" alt="">
                    <input type="password" placeholder="请输入密码" v-model="password">
                </div>
            </div>
            <div class="login-bottom">
                <span class="phone-login" @click="goVerifyCode">手机短信登录</span>
                <span class="go-register" @click="goRegister">立即注册</span>
            </div>
        </div>
        <div class="nextBtn" @click="loginFn">登录</div>
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
import Header from "@/components/home-page/Header";
export default {
    name: "AccountLogin",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: "", //1搜索2分享3菜单
                    showBg: false, //是否显示背景
                    title: "登录",
                    goBack:1,
                }
            },
            phone: "",
            password: ""
        };
    },
    methods: {
        gobake(){
            this.$router.push({ name: "HomePage" });
        },
        loginFn() {
            var that = this;
            var mobile = that.phone;
            var password = that.password;
            var phoneReg = /^1[3-9][0-9]{9}$/g;
            var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (mobile == "") {
                mui.toast("手机号码不能为空",{ duration:'short', type:'div' });
            } else if (!mobile.match(phoneReg)) {
                mui.toast("您输入的手机号不正确",{ duration:'short', type:'div' });
            } else if (password == "") {
                mui.toast("密码不能为空",{ duration:'short', type:'div' });
            } else if (!password.match(passReg)) {
                mui.toast("密码为6-16位数字、字母组合",{ duration:'short', type:'div' });
            } else {
                that.$axios
                    .post(process.env.API_HOST+"login", {
                        mobile: mobile,
                        password: password
                    })
                    .then(function(response) {
                        console.log(response);
                        var res = response;
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                if (res.data.data.token) {
                                    that.$store.commit("set_token",res.data.data.token);
                                }
                                if(mobile){
                                    that.$store.commit("set_mobile",mobile);
                                }
                                that.$store.commit("changeLogin",'1')
                                // mui.alert(
                                //     res.data.msg,
                                //     "提示",
                                //     "确定",
                                //     function() {
                                //         // if(that.$router.currentRoute.params.redirect != undefined){
                                //         //     that.$router.replace({
                                //         //         name: that.$router.currentRoute.params.redirect
                                //         //     });
                                //         // }else{
                                //         //     that.$router.push({
                                //         //         name: "MyCenter"
                                //         //     });
                                //         // }
                                //         that.$router.go(-1);
                                        
                                //     },
                                //     "div"
                                // );
                                
                                mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                that.$router.go(-1);
                            } else {
                                mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                that.password = "";
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        // 短信登录
        goVerifyCode() {
            var that =this;
            that.$router.replace({ name: "CodeLogin",params: {
                        redirect: that.$router.currentRoute.params.redirect
                    }});
        },
        // 注册
        goRegister() {
            this.$router.push({ name: "Register" });
        }
    }
};
</script>
<style scoped>
.login-wrap {
    max-width: 7.5rem;
    margin: 0 auto;
    /* padding-top:.88rem; */
}
.login-header {
    width: 100%;
    height: 5.24rem;
    background: url(../../../../static/img/my-center/login_hbg.png) no-repeat;
    background-size: 100% 5.24rem;
    position:relative;
}
.login-title{
    height:.7rem;
    line-height:.7rem;
    text-align:center;
    position: absolute;
    top:0;
    left:0;
    right:0;
}
.login-title img{
    width:.16rem;
    height:.29rem;
    vertical-align: middle;
    position: absolute;
    left:.2rem;
    top:.25rem;
}
.login-title span{
    vertical-align: middle;
    /* display: inline-block; */
    /* margin:0 auto; */
}
.login-content {
    padding: 0.3rem 0.2rem 0;
}
.login-cell {
    padding: 0 0 0 0.3rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}

.login-strip {
    border-bottom: 0.01rem solid #e5e5e5;
    line-height: 0.9rem;
}
.phone-ico {
    width: 0.23rem;
    height: 0.3rem;
    vertical-align: middle;
}
.pass-ico {
    width: 0.26rem;
    height: 0.3rem;
    vertical-align: middle;
}
.login-bottom {
    line-height: 0.7rem;
    font-size: 0.24rem;
    color: #999999;
    padding-right: 0.3rem;
}
.phone-login {
    text-decoration: underline;
}
.go-register {
    float: right;
    color: #fe7649;
}

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.4rem auto 0;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}

.login-type {
    margin-top: 2rem;
    text-align: center;
}
.login-type-title {
    color: #999999;
    font-size: 0.24rem;
    margin-bottom: 0.2rem;
}
.login-type-title img {
    width: 1.17rem;
    height: 0.02rem;
    vertical-align: middle;
}
.login-type-content img {
    width: 0.6rem;
    height: 0.6rem;
}
.wechat {
    margin-right: 0.4rem;
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 6rem;
    height: 0.6rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}

::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
</style>
