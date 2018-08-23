<template>
  <!-- 注册 -->
  <div class="register-wrap">
    <Header v-bind:showTitle='comData.showTitle'></Header>
    <div class="register-content">
      <div class="register-cell">
        <div class="register-strip">
          <img class="phone-ico" src="../../../../static/img/my-center/phone_ico.png" alt="">
          <input type="number" placeholder="请输入您的手机号" v-model="registerData.phoneNum">
        </div>
        <div class="register-strip">
          <img class="code-ico" src="../../../../static/img/my-center/code_ico.png" alt="">
          <input type="number" placeholder="请输入验证码">
          <span class="get-code" @click="getCode">获取验证码</span>
        </div>
        <div class="register-strip">
          <img class="pass-ico" src="../../../../static/img/my-center/password_ico.png" alt="">
          <input type="password" placeholder="请输入8~20个字符作为密码">
        </div>
      </div>
      <div class="protocol">
        <img :src="registerData.protocol?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
        <div>
          我已阅读
          <span class="red-color">《看个号用户基础服务协议》</span>
        </div>
      </div>
      <div class="nextBtn">登录</div>
      <div class="goLogin">登录已有帐号</div>
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
                    showShare: "", //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "注册"
                }
            },
            registerData: {
                protocol: true, //是否阅读协议
                phoneNum: ""
            }
        };
    },
    methods: {
        getCode() {
            var that = this;
            var phone = that.registerData.phoneNum;
            var reg = /^1[3-9][0-9]{9}$/g;
            if (phone.match(reg)) {
            } else {
                mui.alert("您输入的手机号不正确", "提示", "确定", "", "div");
            }
        }
    },
    mounted(){
        var route = this.$route;
        var opt = route.params;
        console.log(opt);
        console.log(route);
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
    padding: 0 0.4rem;
    border: 0.01rem solid #fe7649;
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

