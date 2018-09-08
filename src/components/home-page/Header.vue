<template>
    <div v-bind:class="showTitle.showBg?'rebBg':'header'">
            <!--左边按钮 个人中心-->
            <img  v-if="showTitle.showBack" class="user-tit-img" src="../../../static/img/userLog.png" alt="" @click="seleLink('mycenter')"> 
            <!-- 回退 -->
            <img v-else class="back-tit-img" src="../../../static/img/header/back_ico.png" alt="" @click="seleLink('rollback')">
            <!--中间标题-->
            <img v-if="showTitle.showLogo == 1" class="titImg" src="../../../static/img/tit_content_img.png" alt="">
            <div v-else-if="showTitle.showLogo == 2" class="titText" v-html="showTitle.title"></div>
            <div v-else-if="showTitle.showLogo == 3" class="titInp" >
                <img class="search-ico" src="../../../static/img/search_ico.png" alt="">
                <input class="search-title" type="text" placeholder="请输入搜索内容">
                <img class="empty-ico" src="../../../static/img/empty_ico.png" alt="" @click="emptyFun()">
            </div>
            <!--右边按钮-->
            <img v-if="showTitle.showShare === 1" class="head_right_search" src="../../../static/img/searchLogo.png" alt="">
            <img v-else-if="showTitle.showShare === 2" class="head_right_share" src="../../../static/img/share_ico.png" alt="">
            <img v-else-if="showTitle.showShare === 3" class="head_right_share" src="../../../static/img/menu_ico.png" alt="" @click="cliMenu">
            <img v-else-if="showTitle.showShare === 4" class="head_right_add" src="../../../static/img/header/hAdd_ico.png" alt="">
            <div class="showMenu" v-show="showMenu">
                <div class="tohome" @click="toPage('home')">
                    <img src="../../../static/img/header-menu/tohome_ico.png" alt="">
                    <span>首页</span>
                </div>
                <div class="tosell" @click="toPage('sell')">
                    <img src="../../../static/img/header-menu/tosell_ico.png" alt="">
                    <span>我要卖</span>
                </div>
                <div class="take"  @click="toPage('take')">
                    <img src="../../../static/img/header-menu/take_ico.png" alt="">
                    <span>收货</span>
                </div>
                <div class="user"  @click="toPage('my')">
                    <img src="../../../static/img/header-menu/user_ico.png" alt="">
                    <span>个人中心</span>
                </div>
                <div class="service" @click="toPage('')">
                    <img src="../../../static/img/header-menu/service_ico.png" alt="">
                    <span>在线咨询</span>
                </div>
                <div class="history" @click="toPage('')">
                    <img src="../../../static/img/header-menu/history_ico.png" alt="">
                    <span>浏览历史</span>
                </div>
            </div>
            <div class="header-shade" v-show="showMenu" @click="cliMenu"></div>
    </div>
</template>

<script>


    export default {
        name: "Header",
        data() {
            return{
                showMenu:false,//是否显示菜单
            }
        },
        props:['showTitle'],
        methods:{

        },
        mounted(){

        },
        methods:{
            //一键清空
            emptyFun(){
                $('.search-title').val('');
            },
            // 点击菜单
            cliMenu(){
                this.showMenu = !this.showMenu;
            },
            seleLink(flag){
                var that = this;
                if(flag == 'rollback'){
                    if(that.showTitle.goBack == 1){
                        that.$router.push({name:'HomePage'});
                    }else{
                        that.$router.go(-1);
                    }
                }else if(flag == 'mycenter'){
                    that.$router.push({name:'MyCenter'})
                }
            },
            toPage(flag){
                var that = this;
                if(flag == 'home'){
                    that.$router.push({name:'HomePage'})
                }else if(flag == 'sell'){
                    that.$router.push({name:'Sell'})
                }else if(flag == 'my'){
                    that.$router.push({name:'MyCenter'})
                }
            }
        }
    }
</script>

<style scoped>
.header{
    padding:0.1rem 0;
    line-height: .7rem;
    text-align: center;
    position: relative;
    color:#333333;
}
.rebBg{
    padding:0.1rem 0;
    line-height: .7rem;
    background:-webkit-linear-gradient(#FD915F,#FC534A);
    background:-o-linear-gradient(#FD915F,#FC534A);
    background:-moz-linear-gradient(#FD915F,#FC534A);
    background:linear-gradient(to right, #FD915F , #FC534A);
    text-align: center;
    position: relative;
    color:#333333;
}
.back-tit-img{
    width: .16rem;
    height:.29rem;
    position: absolute;
    top:.35rem;
    left:.2rem;
}
.user-tit-img{
    width:0.42rem;
    height:0.42rem;
    position: absolute;
    top:.25rem;
    left:.25rem;
}
.titImg{
    width:1.97rem;
    height:0.77rem;
    vertical-align: middle;
    margin:0 auto;
}
.titText{
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-size: 0.34rem;
}
.head_right_search{
    width:0.4rem;
    height: 0.34rem;
    position: absolute;
    top:.3rem;
    right:.3rem;
}
.head_right_share{
    width:.35rem;
    height:.28rem;
    position: absolute;
    top:.3rem;
    right:.25rem;
}
.head_right_add{
    width:.29rem;
    height:.29rem;
    position: absolute;
    top:.33rem;
    right:.25rem;
}
    /*搜索*/
.titInp{
    width:5.76rem;
    height:.66rem;
    margin:0 auto;
    position: relative;
}
.search-title{
    width:5.76rem;
    height:.66rem;
    font-size:.26rem;
    padding:0 .52rem;
    margin:0;
    border-top-left-radius: .33rem;
    border-top-right-radius: .33rem;
    border-bottom-left-radius: .33rem;
    border-bottom-right-radius: .33rem;
}
.search-ico{
    width:.32rem;
    height:.27rem;
    position: absolute;
    top:.22rem;
    left:.23rem;
}
.empty-ico{
    width:.23rem;
    height:.24rem;
    position: absolute;
    top:.22rem;
    right:.25rem;
}
::-webkit-input-placeholder { 
    color:#999999;
    font-size:.26rem;
}
:-moz-placeholder {
    color:#999999;
    font-size:.26rem;
}
::-moz-placeholder { 
    color:#999999;
    font-size:.26rem;
}
:-ms-input-placeholder {
    color:#999999;
    font-size:.26rem;
}


/*   菜单栏*/
.showMenu{
    width:2.28rem;
    font-size:.28rem;
    color:#FFFFFF;
    background:url(../../../static/img/header-menu/menubg.png) no-repeat;
    background-size: 2.28rem 5.46rem;
    position: absolute;
    right: .2rem;
    top:.9rem;
    text-align:left;
    padding:0 .27rem;
    -webkit-border-radius: .06rem;
    -moz-border-radius: .06rem;
    border-radius: .06rem;
    overflow: hidden;
    z-index:10;
}
.tohome,.tosell,.take,.user,.service,.history{
    line-height: .85rem;
    border-bottom:.01rem solid #7D7D7D;
}
.showMenu .history{
    border:0;
}
.showMenu img{
    vertical-align: middle;
}
.tohome img{
    width:.31rem;
    height:.30rem;
}
.tosell img{
    width:.29rem;
    height:.30rem;
}
.take img{
    width:.29rem;
    height:.27rem;
}
.user img{
    width:.31rem;
    height:.31rem;
}
.service img{
    width:.34rem;
    height:.37rem;
}
.history img{
    width:.33rem;
    height:.33rem;
}
.header-shade{
    position:fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,0);
    z-index:8;
}
</style>
