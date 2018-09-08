<template>
    <!-- 注册 -->
    <div class="register-wrap">
        <Header v-bind:showTitle='comData.showTitle'></Header>
        <div class="register-content">
            <div class="register-cell">
                <div class="register-strip">
                    <img class="code-ico" src="../../../../static/img/my-center/code_ico.png" alt="">
                    <input type="number" placeholder="请输入验证码" v-model="verify_code">
                    <span class="get-code" @click="getCode">获取验证码</span>
                </div>
                <div class="register-strip">
                    <img class="pass-ico" src="../../../../static/img/my-center/password_ico.png" alt="">
                    <input type="password" placeholder="请输入8~20个字符作为密码" v-model="password">
                </div>
            </div>
            <div class="protocol">
                验证码将发送至您的手机
                <span v-text="showPhone"></span>请确保手机处于开机状态
            </div>
            <div class="nextBtn" @click="okChange">确定</div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Register",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "修改密码"
                }
            },
            phoneNum: "",
            showPhone: "",
            verify_code: "",
            password: ""
        };
    },
    methods: {
        // 获取验证码
        getCode() {
            var that = this;
            var phone = that.phoneNum;
            var reg = /^1[3-9][0-9]{9}$/g;
            if (phone == "") {
                mui.alert("手机号码不能为空", "提示", "确定", "", "div");
            } else if (!phone.match(reg)) {
                mui.alert("您的手机号不正确", "提示", "确定", "", "div");
            } else {
                that.$axios
                    .post("/api/sms_code", {
                        mobile: phone
                    })
                    .then(function(response) {
                        console.log(response.data);
                        var res = response;
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                mui.alert(res.data.msg, "提示", "确认", "", "");
                            } else {
                                mui.alert(res.data.msg, "提示", "确认", "", "");
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        // 确认
        okChange() {
            var that = this;
            var mobile = that.phoneNum;
            var verify_code = that.verify_code;
            var password = that.password;
            var phoneReg = /^1[3-9][0-9]{9}$/g;
            var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (mobile == "") {
                mui.alert("手机号不能为空", "提示", "确定", "", "div");
            } else if (!mobile.match(phoneReg)) {
                mui.alert("您输入的手机号不正确", "提示", "确定", "", "div");
            } else if (verify_code == "" || verify_code.length < 6) {
                mui.alert("您输入的验证码不正确", "提示", "确定", "", "div");
            } else if (password == "") {
                mui.alert("密码不能为空", "提示", "确定", "", "div");
            } else if (!password.match(passReg)) {
                mui.alert("密码为6-16位数字、字母组合","提示","确定","","div");
            } else {
                that.$axios
                    .post("/api/find_password", {
                        mobile: mobile,
                        verify_code: verify_code,
                        password: password
                    })
                    .then(function(response) {
                        console.log(response);
                        var res = response;
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                that.$store.mobile = mobile;
                                mui.alert(
                                    res.data.msg,
                                    "提示",
                                    "确定",
                                    function() {
                                        that.$router.push({
                                            name: "MyCenter"
                                        });
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
        }
    },
    mounted() {
        var that = this;
        var mobile = that.$store.mobile;
        if (mobile != undefined && mobile != "") {
            mobile = mobile.substr(0, 3) + "****" + mobile.substr(7);
            that.showPhone = mobile;
            that.phoneNum = that.$store.mobile;
        }
    }
};
</script>
<style scoped>
.register-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
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
    padding: 0 0.4rem;
    border: 0.01rem solid #fe7649;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    vertical-align: middle;
}
/* 协议 */
.protocol {
    line-height: 0.4rem;
    padding: 0 0.2rem;
    color: #333333;
    font-size: 0.24rem;
    margin-top: 0.2rem;
}
.protocol span {
    color: #666666;
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

