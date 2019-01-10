<template>
    <div class="active-wrap wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="active-content">
            <HotEvents v-bind:showHotTitle="showHotTitle"></HotEvents>
        </div>
        <Hotline class="hotline"></Hotline>
        <Footer class="footer"></Footer>
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
        that.showTitle.title = that.$route.query.tit;
    }
};
</script>
<style scoped>
.active-wrap {
    padding:.88rem 0 2.8rem;
}
.active-content {
    padding: 0.2rem;
}
.hotline{
    position:fixed;
    bottom:3.0rem;
    left:0;
    right:0;
    z-index:88;
}
.footer{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
}
</style>
<style>
body{
    height:100vh;
}
</style>

