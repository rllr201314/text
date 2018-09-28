<template>
    <div class="active-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="active-content">
            <HotEvents v-bind:showHotTitle="showHotTitle"></HotEvents>
        </div>
        <Hotline></Hotline>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import HotEvents from "@/components/active-page/HotEvents"; //游戏专区
import Hotline from "@/components/home-page/Hotline"; //客服热线
import Footer from "@/components/home-page/Footer"; //底部
export default {
    name: "ActiveArea",
    data() {
        return {
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部title文字
                showShare: 2, //1搜索2分享3菜单
                showBg: true, //是否显示背景
                title: "活动"
            },
            showHotTitle: false
        };
    },
    components: {
        Header,
        HotEvents,
        Hotline,
        Footer
    },
    mounted() {
        var that = this;
        that.showTitle.title = that.$route.params.tit;
    }
};
</script>
<style scoped>
.active-wrap {
    max-width: 12rem;
    margin: 0 auto;
    /* padding-top:.88rem; */
}
.active-content {
    padding: 0.2rem;
}
</style>
