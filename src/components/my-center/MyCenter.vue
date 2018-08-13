<template>
    <!-- 个人中心 -->
    <div class="mycenter-wrap">
        <div class="mycenter-top">
            <Header v-bind:showTitle="comData.showTitle"></Header>
            <div class="user-info">
                <div class="user-log">
                    <img src="../../../static/img/mh_ico.png" alt="">
                </div>
                <div class="user-status">
                    <span class="user-login">登录</span>
                    <span class="vertical"></span>
                    <span class="user-register">注册</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'MyCenter',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                    showBack:false,
                    showLogo:2,//显示头部title文字
                    showShare:2,//1搜索2分享3菜单
                    showBg:false,//是否显示背景
                    title:"个人中心",
                    }
                }
            }
        },
        methods:{

        }
    }
</script>
<style scoped>
    .mycenter-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .mycenter-top{
        background-image:url(../../../static/img/sell/header_bg.png);
        background-repeat:no-repeat;
        background-size:100% 3.8rem;
    }
    .user-info{

    }
    .user-log{

    }
    .user-log img{
        width:1rem;
        height:1rem;
    }
</style>
