<template>
    <!-- 客服真伪验证 -->
    <div class="authenticity-wrap">
        <div class="authent-header">
            <div class="goback" @click="goback">
                <img src="../../../static/img/header/back_ico.png" alt="">
            </div>
            <div class="header-content">
                <div class="header-title-top">客服真伪鉴定</div>
                <div class="header-title-bottom">严防欺诈行为，维护交易安全</div>
            </div>
        </div>
        <div class="authent-content">
            <div class="authent-content-top">
                <div class="authent-cell">
                    <div class="authent-strip-inp">
                        <input type="number" placeholder="请输入客服QQ进行验证">
                        <span>验证QQ客服</span>
                    </div>
                    <div class="authent-strip-inp">
                        <input type="text" placeholder="请输入客服微信进行验证">
                        <span>验证微信客服</span>
                    </div>
                    <div class="authent-strip-inp">
                        <input type="text" placeholder="请复制商品链接进行验证">
                        <span>验证商品链接</span>
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
                            <div>请尽快
                                <span class="red-color">停止操作</span>
                            </div>
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
                            <div>
                                <span class="red-color">请勿操作</span>，谨防受骗</div>
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
            <div class="service">举报和投诉，请联系
                <span class="go-service">在线客服</span>
            </div>
            <Footer class="footer"></Footer>
        </div>
    </div>
</template>
<script>
import Footer from "@/components/home-page/Footer";
export default {
    name: "Authenticity",
    components: {
        Footer
    },
    data() {
        return {
            authentData: {
                verifgType: 1
            }
        };
    },
    methods:{
        goback(){
            this.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.authenticity-wrap {
    max-width: 12rem;
    margin: 0 auto;
    position: relative;
}
.authent-header {
    text-align: center;
    padding-top: 0.88rem;
    height: 3.7rem;
    background: url(../../../static/img/my-center/verify_hbg.png) no-repeat;
    background-size: 100% 3.7rem;
    position: relative;
}
.goback {
    background: rgba(0, 0, 0, 0.2);
    width: 0.46rem;
    height: 0.46rem;
    border-radius: 50%;
    position: absolute;
    top: 0.5rem;
    left: 0.2rem;
}
.goback img {
    width: 0.16rem;
    height: 0.29rem;
    position: absolute;
    top: 4px;
    left: 7px;
}
.header-content {
    color: #333333;
    font-weight: bold;
}
.header-title-top {
    font-size: 0.4rem;
    margin-bottom: 0.2rem;
}
.header-title-bottom {
    font-size: 0.28rem;
}

.authent-content {
    font-size: 0.26rem;
    position: absolute;
    top: 2.5rem;
    left: 0;
    right: 0;
}
.authent-content-top {
    padding: 0.2rem;
}
.authent-cell {
    padding: 0.4rem 0.4rem 0.1rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.authent-strip-inp {
    margin-bottom: 0.3rem;
    line-height: 0.76rem;
    border: 1px solid #d2d2d2;
    border-radius: 0.06rem;
    display: flex;
    justify-content: flex-start;
}
.authent-strip-inp span {
    width: calc(100% - 4.4rem);
    text-align: center;
    color: #ffffff;
    display: inline-block;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}

.verify-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.verify-strip-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.title-txt {
    background-image: url("../../../static/img/board_mark_big.png");
    background-repeat: no-repeat;
    background-size: 1.49rem 0.21rem;
    background-position: 50%;
    text-align: center;
    width: 1.49rem;
    color: #fc604e;
    font-size: 0.26rem;
    margin: 0 auto;
}
.verifg-content {
    color: #333333;
    padding: 0.7rem 0;
}
.verifg-img {
    width: 1.2rem;
    height: 1.17rem;
    display: inline-block;
    margin: 0 0.7rem 0 1rem;
    vertical-align: middle;
}
.verifg-img img {
    width: 1.2rem;
    height: 1.17rem;
}
.verifg-text {
    vertical-align: middle;
    display: inline-block;
}
.link-up {
    display: inline-block;
    margin-top: 0.1rem;
}
.link-up img {
    width: 0.29rem;
    height: 0.26rem;
    vertical-align: middle;
}
.link-up span {
    color: #666666;
    font-size: 0.24rem;
    vertical-align: middle;
}

.service {
    font-size: 0.24rem;
    color: #999999;
    text-align: center;
    margin: 0.6rem 0 0.3rem;
}
.go-service {
    color: #fe7649;
    text-decoration: underline;
}

.red-color {
    color: #ff5e5e;
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 4.4rem;
    height: 0.76rem;
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
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
</style>
