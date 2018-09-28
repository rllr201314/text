<template>
    <div class="top-header">
        <div v-bind:class="showTitle.showBg?'rebBg':'header'">
            <!--左边按钮 个人中心-->
            <img v-if="showTitle.showBack" class="user-tit-img" src="../../../static/img/userLog.png" alt="" @click="seleLink('mycenter')">
            <!-- 回退 -->
            <img v-else class="back-tit-img" src="../../../static/img/header/back_ico.png" alt="" @click="seleLink('rollback')">
            <!--中间标题-->
            <img v-if="showTitle.showLogo == 1" class="titImg" src="../../../static/img/tit_content_img.png" alt="">
            <div v-else-if="showTitle.showLogo == 2" class="titText" v-html="showTitle.title"></div>
            <div v-else-if="showTitle.showLogo == 3" class="titInp">
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
                <div class="take" @click="toPage('take')">
                    <img src="../../../static/img/header-menu/take_ico.png" alt="">
                    <span>收货</span>
                </div>
                <div class="user" @click="toPage('my')">
                    <img src="../../../static/img/header-menu/user_ico.png" alt="">
                    <span>个人中心</span>
                </div>
                <div class="service" @click="toPage('')">
                    <img src="../../../static/img/header-menu/service_ico.png" alt="">
                    <span>在线咨询</span>
                </div>
                <div class="history" @click="toPage('browse')">
                    <img src="../../../static/img/header-menu/history_ico.png" alt="">
                    <span>浏览历史</span>
                </div>
            </div>
            <div class="header-shade" v-show="showMenu" @click="cliMenu"></div>
        </div>
    </div>
</template>

<script>
export default {
    inject: ["reload"],//刷新页面
    name: "Header",
    data() {
        return {
            showMenu: false //是否显示菜单
        };
    },
    props: ["showTitle"],
    beforeRouteLeave(to, from, next) {
        if (from.path == "/account-login" || from.path == "/code-login") {
            this.$router.push({name:'HomePage'})
        } else {
            next();
        }
    },
    mounted() {},
    methods: {
        //一键清空
        emptyFun() {
            $(".search-title").val("");
        },
        // 点击菜单
        cliMenu() {
            this.showMenu = !this.showMenu;
        },
        seleLink(flag) {
            var that = this;
            if (flag == "rollback") {
                // debugger;
                if (that.showTitle.goBack == 1) {
                    that.$router.push({ name: "HomePage" });
                } else if (that.showTitle.goBack == 2) {
                    // that.$router.go(-3);
                    that.$router.go(-1);
                }else {
                    that.$router.go(-1);
                }
            } else if (flag == "mycenter") {
                var token = that.$store.state.token;
                if (token == undefined || token == "") {
                    // mui.confirm(
                    //     "请先登陆",
                    //     "提示",
                    //     ["取消", "确认"],
                    //     function(e) {
                    //         if (e.index == 1) {
                                that.$router.push({
                                    name: "AccountLogin",
                                    params: {
                                        redirect: "MyCenter"
                                    }
                                });
                    //         }
                    //     },
                    //     "div"
                    // );
                } else {
                    that.$router.push({ name: "MyCenter" });
                }
            }
        },
        toPage(flag) {
            var that = this;
            that.showMenu = false;
            if (flag == "home") {
                that.$router.push({ name: "HomePage" });
            } else if (flag == "sell") {
                that.$router.push({ name: "Sell" });
                sessionStorage.buyOrsell = 2;
                // that.reload(); //刷新页面
            } else if (flag == "my") {
                var token = that.$store.state.token;
                if (token == undefined || token == "") {
                    // mui.confirm(
                    //     "请先登陆",
                    //     "提示",
                    //     ["取消", "确认"],
                    //     function(e) {
                    //         if (e.index == 1) {
                                that.$router.push({
                                    name: "AccountLogin",
                                    params: {
                                        redirect: "MyCenter"
                                    }
                                });
                    //         }
                    //     },
                    //     "div"
                    // );
                } else {
                    that.$router.push({ name: "MyCenter" });
                    // that.reload();
                }
            }else if(flag == 'browse'){
                that.$router.push({name:'BrowseRecord'})
            }
        }
    }
};
</script>

<style scoped>
.top-header{
    max-width:12rem;
    margin:0 auto;
    height:.88rem;
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index:9999;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}
.header {
    padding: 0.1rem 0;
    line-height: 0.7rem;
    text-align: center;
    position: relative;
    color: #333333;

}
.rebBg {
    padding: 0.1rem 0;
    line-height: 0.7rem;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
    text-align: center;
    position: relative;
    color: #333333;
}
.back-tit-img {
    width: 0.16rem;
    height: 0.29rem;
    position: absolute;
    top: 0.35rem;
    left: 0.2rem;
}
.user-tit-img {
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
}
.titImg {
    width: 1.97rem;
    height: 0.77rem;
    vertical-align: middle;
    margin: 0 auto;
}
.titText {
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-size: 0.34rem;
}
.head_right_search {
    width: 0.4rem;
    height: 0.34rem;
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
}
.head_right_share {
    width: 0.35rem;
    height: 0.28rem;
    position: absolute;
    top: 0.3rem;
    right: 0.25rem;
}
.head_right_add {
    width: 0.29rem;
    height: 0.29rem;
    position: absolute;
    top: 0.33rem;
    right: 0.25rem;
}
/*搜索*/
.titInp {
    width: 5.76rem;
    height: 0.66rem;
    margin: 0 auto;
    position: relative;
}
.search-title {
    width: 5.76rem;
    height: 0.66rem;
    font-size: 0.26rem;
    padding: 0 0.52rem;
    margin: 0;
    border-top-left-radius: 0.33rem;
    border-top-right-radius: 0.33rem;
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;
}
.search-ico {
    width: 0.32rem;
    height: 0.27rem;
    position: absolute;
    top: 0.22rem;
    left: 0.23rem;
}
.empty-ico {
    width: 0.23rem;
    height: 0.24rem;
    position: absolute;
    top: 0.22rem;
    right: 0.25rem;
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

/*   菜单栏*/
.showMenu {
    width: 2.28rem;
    font-size: 0.28rem;
    color: #ffffff;
    background: url(../../../static/img/header-menu/menubg.png) no-repeat;
    background-size: 2.28rem 5.46rem;
    position: absolute;
    right: 0.2rem;
    top: 0.9rem;
    text-align: left;
    padding: 0 0.27rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    overflow: hidden;
    z-index: 10;
}
.tohome,
.tosell,
.take,
.user,
.service,
.history {
    line-height: 0.85rem;
    border-bottom: 0.01rem solid #7d7d7d;
}
.showMenu .history {
    border: 0;
}
.showMenu img {
    vertical-align: middle;
}
.tohome img {
    width: 0.31rem;
    height: 0.3rem;
}
.tosell img {
    width: 0.29rem;
    height: 0.3rem;
}
.take img {
    width: 0.29rem;
    height: 0.27rem;
}
.user img {
    width: 0.31rem;
    height: 0.31rem;
}
.service img {
    width: 0.34rem;
    height: 0.37rem;
}
.history img {
    width: 0.33rem;
    height: 0.33rem;
}
.header-shade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 8;
}
</style>
