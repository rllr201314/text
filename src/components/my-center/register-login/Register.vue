<template>
    <!-- 注册 -->
    <div class="wrap">
        <Header v-bind:showTitle='comData.showTitle'></Header>
        <div class="register-content">
            <div class="register-cell">
                <div class="register-strip">
                    <img class="phone-ico" src="../../../../static/img/my-center/phone_ico.png" alt="">
                    <input type="number" placeholder="请输入您的手机号" v-model="registerData.phoneNum">
                </div>
                <div class="register-strip">
                    <img class="code-ico" src="../../../../static/img/my-center/code_ico.png" alt="">
                    <input type="number" placeholder="请输入验证码" v-model="verify_code">
                    <span class="get-code" @click="getCode" v-text="hintCode"></span>
                </div>
                <div class="register-strip">
                    <img class="pass-ico" src="../../../../static/img/my-center/password_ico.png" alt="">
                    <input type="password" placeholder="密码为6-16位数字、字母组合" v-model="password">
                </div>
            </div>
            <div class="protocol">
                <img :src="registerData.protocol?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="" @click="seleProtocol">
                <div>
                    我已阅读
                    <span class="red-color" @click="getProtocol">《看个号用户基础服务协议》</span>
                </div>
            </div>
            <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
            <div class="nextBtn" @click="loginFn('register')">注册</div>
            <div class="goLogin" @click="loginFn('login')">登录已有帐号</div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Protocal from "@/components/multi/Protocal";//协议
export default {
    name: "Register",
    components: {
        Header,
        Protocal
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: "", //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "注册"
                }
            },
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },
            hintCode: "获取验证码",
            isGetCode: true,
            password: "",
            verify_code: "",
            registerData: {
                protocol: true, //是否阅读协议
                phoneNum: ""
            }
        };
    },
    methods: {
        seleProtocol() {
            this.registerData.protocol = !this.registerData.protocol;
        },
        getProtocol(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'protocol_reg').then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.proData.isShow = true;
                        that.proData.con = res.data.data;
                        that.proData.val = true;
                        
                    }
                }
            })
        },
        isProFn(flag){
            var that = this;
            if(flag){
                that.registerData.protocol = true;
            }
        },
        getCode() {
            var that = this;
            if (that.isGetCode) {
                var phone = that.registerData.phoneNum;
                var reg = /^1[3-9][0-9]{9}$/g;
                if (phone == "") {
                    mui.alert("手机号码不能为空", "提示", "确定", "", "div");
                } else if (!phone.match(reg)) {
                    mui.alert(
                        "您输入的手机号不正确",
                        "提示",
                        "确定",
                        "",
                        "div"
                    );
                } else {
                    that.$axios
                        .post(process.env.API_HOST+"verify_code", {
                            mobile: phone
                        })
                        .then(function(res) {
                            if (res.status == 200) {
                                if (res.data.code == 200) {
                                    that.hintCode = 60;
                                    that.isGetCode = false;
                                    var time = setInterval(function() {
                                        that.hintCode--;
                                        if (that.hintCode <= 0) {
                                            clearInterval(time);
                                            that.isGetCode = true;
                                            that.hintCode = "获取验证码";
                                        }
                                    }, 1000);
                                    mui.alert(res.data.msg,"提示","确认","","");
                                } else {
                                    mui.alert(res.data.msg,"提示","确认","","");
                                }
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
        loginFn(opt) {
            const that = this;
            if (opt == "register") {
                var mobile = that.registerData.phoneNum;
                var verify_code = that.verify_code;
                var password = that.password;
                var phoneReg = /^1[3-9][0-9]{9}$/g;
                var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if (mobile == "") {
                    mui.alert("手机号码不能为空", "提示", "确定", "", "div");
                } else if (!mobile.match(phoneReg)) {
                    mui.alert(
                        "您输入的手机号不正确",
                        "提示",
                        "确定",
                        "",
                        "div"
                    );
                } else if (verify_code == "" || verify_code.length < 6) {
                    mui.alert(
                        "您输入的验证码不正确",
                        "提示",
                        "确定",
                        "",
                        "div"
                    );
                } else if (password == "") {
                    mui.alert("密码不能为空", "提示", "确定", "", "div");
                } else if (!password.match(passReg)) {
                    mui.alert(
                        "密码为6-16位数字、字母组合",
                        "提示",
                        "确定",
                        "",
                        "div"
                    );
                }else if(!that.registerData.protocol){
                    mui.alert(
                        "请阅读并同意《看个号用户基础服务协议》",
                        "提示",
                        "确定",
                        "",
                        "div"
                    );
                } else {
                    that.$axios
                        .post(process.env.API_HOST+"do_register", {
                            mobile: mobile,
                            verify_code: verify_code,
                            password: password
                        })
                        .then(function(res) {
                            if (res.status == 200) {
                                if (res.data.code == 200) {
                                    mui.alert(
                                        res.data.msg,
                                        "提示",
                                        "确定",
                                        function() {
                                            that.$router.replace({name: "AccountLogin",query:{register:1}});
                                        },
                                        "div"
                                    );
                                } else {
                                    mui.alert(res.data.msg,"提示","确定","","div");
                                    that.verify_code = "";
                                    that.password = "";
                                }
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            } else if (opt == "login") {
                that.$router.replace({
                    name: "AccountLogin"
                });
            }
        }
    },
};
</script>
<style scoped>
.register-content {
    padding: 0.2rem;
}
.register-cell {
    padding: 0 0 0 0.3rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.register-strip {
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
.code-ico {
    width: 0.27rem;
    height: 0.31rem;
    vertical-align: middle;
}
.get-code {
    display: inline-block;
    color: #fe7649;
    font-size: 0.22rem;
    line-height: 0.6rem;
    width: 1.9rem;
    text-align: center;
    border: 1px solid #fe7649;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    vertical-align: middle;
}
/* 协议 */
.protocol {
    margin: 0.1rem 0 0.2rem;
}
.protocol img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.protocol div {
    display: inline-block;
    font-size: 0.22rem;
    vertical-align: middle;
}
/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.6rem auto 0;
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
.goLogin {
    color: #999999;
    font-size: 0.24rem;
    text-align: center;
    text-decoration: underline;
    margin-top: 0.2rem;
}

.red-color {
    color: #ff5e5e !important;
}
/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 4.2rem;
    height: 0.6rem;
    vertical-align: middle;
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



