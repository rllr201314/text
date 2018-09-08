<template>
    <!-- 活动页 -->
    <div class="active-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="active-content">
            <GameDivision></GameDivision>
            <HotEvents v-bind:showHotTitle="showHotTitle"></HotEvents>
            <TodayRecommend></TodayRecommend>
        </div>
        <Hotline></Hotline>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/home-page/Header'//头部
    import GameDivision from '@/components/home-page/GameDivision'//游戏专区
    import HotEvents from '@/components/active-page/HotEvents'//游戏专区
    import TodayRecommend from '@/components/active-page/TodayRecommend'//今日活动
    import Hotline from '@/components/home-page/Hotline'//客服热线
    import Footer from '@/components/home-page/Footer'//底部
    export default {
        name: "ActivePage",
        data(){
            return{
                showTitle:{
                    showBack:false,
                    showLogo:2,//显示头部title文字
                    showShare:2,//1搜索2分享3菜单
                    showBg:true,//是否显示背景
                    title:"活动",
                },
                showHotTitle:true,
            }
        },
        components:{
            Header,
            GameDivision,//游戏专区
            HotEvents,//热门活动
            TodayRecommend,//今日活动
            Hotline,//客服热线
            Footer
        }
    }
</script>

<style scoped>
.active-wrap {
    max-width: 12rem;
    margin:0 auto;
}
.active-content{
    padding:.2rem;
}
</style>