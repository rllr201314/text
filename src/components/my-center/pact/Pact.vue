<template>
    <!-- 电子合同 -->
    <div class="pact-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="pact-content">
            <div class="pact-cell">
                <div class="pact-strip">
                    <div class="left-strip">
                        <span>需要我签名</span>
                        <span class="gray-color">(2)</span>
                    </div>
                    <div class="right-strip">
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="pact-strip">
                    <div class="left-strip">
                        <span>已签约合同</span>
                        <span class="gray-color">(2)</span>
                    </div>
                    <div class="right-strip">
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Pact",
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
                    title: "电子合同"
                }
            }
        };
    }
};
</script>
<style scoped>
.pact-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.pact-content {
    padding: 0.2rem;
}
.pact-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left: 0.2rem;
}
.pact-strip {
    font-size: 0.26rem;
    line-height: 0.9rem;
    color:#666666;
    border-bottom: 0.01rem solid #e5e5e5;
    position: relative;
}
.right-strip {
    position:absolute;
    right:.2rem;
    top:0;
}
.right-strip img {
    width: 0.13rem;
    height: 0.24rem;
}
.gray-color{
    color:#999999;
}
</style>
