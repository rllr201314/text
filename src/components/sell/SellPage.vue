<template>
    <!-- 出售页 -->
    <div class="sell-page-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="sell-page-content">
            <div class="search">
                <img class="search-ico" src="../../../static/img/search_ico.png" alt="">
                <form action="javascript:return true;">
                <input class="search-input" type="search" placeholder="请输入游戏名称" v-model="search_val" @input="searchFn">
                </form>
                <img class="empty-ico" src="../../../static/img/empty_ico.png" alt="" @click="emptyFun()">
            </div>
            <div class="search-history" v-if="historyNameList != ''">
                <div class="search-history-title">
                    <div class="search-histoty-title-text">近期搜索</div>
                    <img src="../../../static/img/delete_ico.png" alt="">
                </div>
                <div class="search-history-content">
                    <div class="search-history-tag" v-for="(item,index) in historyNameList" v-text="item.name"></div>
                </div>
            </div>
            <div class="game-classfiy-wrap">
                <div class="game-classfiy-top">
                    <div class="game-classfiy-top-cell" v-for="item in gameClassfiy" v-text="item.name" :class="item.sele?'red-bg':''" @click="seleGameClass(item.name)"></div>
                </div>
                <div class="game-classfiy-bottom">
                    <div class="game-classfiy-bottom-list" v-for="item in gameList" @click="goSellOption(item.category_id)">
                        <div class="list-left">
                            <img :src="item.game_logo" alt="">
                        </div>
                        <div class="list-right">
                            <div class="list-info-title" v-text="item.game_name"></div>
                            <div class="list-info-left">代练</div>
                            <div class="list-info-right">成品号</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SellPage",
    data() {
        return {
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部log
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
                title: ""
            },
            search_val: "",
            user_type: "", //用户类型
            historyNameList: [],
            gameClassfiy: [
                { name: "热", sele: true },
                { name: "A", sele: false },
                { name: "B", sele: false },
                { name: "C", sele: false },
                { name: "D", sele: false },
                { name: "E", sele: false },
                { name: "F", sele: false },
                { name: "G", sele: false },
                { name: "H", sele: false },
                { name: "I", sele: false },
                { name: "J", sele: false },
                { name: "K", sele: false },
                { name: "L", sele: false },
                { name: "M", sele: false },
                { name: "N", sele: false },
                { name: "O", sele: false },
                { name: "P", sele: false },
                { name: "Q", sele: false },
                { name: "R", sele: false },
                { name: "S", sele: false },
                { name: "T", sele: false },
                { name: "U", sele: false },
                { name: "V", sele: false },
                { name: "W", sele: false },
                { name: "X", sele: false },
                { name: "Y", sele: false },
                { name: "Z", sele: false }
            ],
            gameList: [],
            gameClassAll: []
        };
    },
    components: {
        Header
    },
    methods: {
        //一键清空
        emptyFun() {
            this.search_val = "";
        },
        Trim(str, is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global.toLowerCase() == "g") {
                result = result.replace(/\s/g, "");
            }
            return result;
        },
        // 搜索
        searchFn() {
            var that = this;
            that.getData();
        },
        // 选择游戏对应的字母
        seleGameClass(opt) {
            var that = this;
            that.search_val = '';
            var gameClassfiy = that.gameClassfiy;
            for (var i in gameClassfiy) {
                if (opt == gameClassfiy[i].name) {
                    gameClassfiy[i].sele = true;
                    if (opt == "热") {
                        that.gameList = that.gameClassAll.is_hot;
                    } else {
                        var other = that.gameClassAll.is_other;
                        for (var j in other) {
                            if (opt == j) {
                                that.gameList = other[j];
                                break;
                            } else {
                                that.gameList = [];
                            }
                        }
                    }
                    continue;
                }
                gameClassfiy[i].sele = false;
            }
        },
        goSellOption(opt) {
            var that = this;
            var token = that.$store.state.token;
            if (that.user_type == '/buy') {
                //买
                that.$router.push({ name: "GoodScreen",query:{opt}});
                sessionStorage.opt = opt;
            } else if (that.user_type == '/sell') {
                //卖
                if (token == undefined || token == "") {
                    mui.confirm(
                        "请先登陆",
                        "提示",
                        ["取消", "确认"],
                        function(e) {
                            if (e.index == 1) {
                                that.$router.push({
                                    name: "AccountLogin",
                                    params: {
                                        redirect: that.$router.currentRoute.name
                                    }
                                });
                            }
                        },
                        "div"
                    );
                } else {
                    that.$router.push({ name: "SellOption", query: { opt } });
                }
            }
        },
        getData(){
            var that = this;
            that.user_type = that.$route.path;
            that.$axios
                .post(process.env.API_HOST+"category",{
                    game_name:that.search_val,
                })
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.gameList = res.data.data.is_hot;
                            that.gameClassAll = res.data.data;
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    beforeRouteLeave(to, from, next){
        if(to.path == '/buy'){
            this.showTitle.title="我要买"
            this.user_type = to.path;
        }
        next();
    },
    mounted() {
        var that = this;
        var user_type = that.$route.path;
        if(user_type == '/buy'){
            that.showTitle.title = '我要买';
        }else if(user_type == '/sell'){
            that.showTitle.title = "我要卖";
        }
        that.getData();
        
    }
};
</script>

<style scoped>
.sell-page-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top: 0.88rem;
}
.sell-page-content {
    padding: 0.2rem;
}
/*搜索*/
.search {
    width: 7.1rem;
    height: 0.76rem;
    text-align: center;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    position: relative;
    margin: 0 auto 0.3rem;
}
.search-input {
    width: 7.1rem;
    height: 0.76rem;
    font-size: 0.24rem;
    color: #999999;
    padding: 0 0.6rem;
    margin: 0;
    background:#ffffff;
}
.search-ico {
    width: 0.32rem;
    height: 0.27rem;
    position: absolute;
    top: 0.25rem;
    left: 0.23rem;
}
.empty-ico {
    width: 0.23rem;
    height: 0.24rem;
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
}
/*搜索历史*/
.search-history-title div {
    color: #333333;
    font-size: 0.26rem;
    display: inline-block;
}
.search-history-title img {
    width: 0.26rem;
    height: 0.26rem;
    float: right;
    margin: 0.1rem 0.1rem 0 0;
}
.search-history-content {
    padding: 0.2rem 0;
    font-size: 0.26rem;
}
.search-history-tag {
    background: #ffffff;
    color: #333333;
    min-width: 1.5rem;
    text-align: center;
    padding: 0.15rem 0.3rem;
    display: inline-block;
    margin: 0 0.2rem 0.2rem 0;
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
}

/*游戏分类*/
.game-classfiy-wrap {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding: 0.2rem;
}
.game-classfiy-top {
    /*height: 2.58rem;*/
    font-size: 0.24rem;
    color: #666666;
}
.game-classfiy-top .game-classfiy-top-cell {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
}
.red-bg {
    color: #ffffff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-box-shadow: 0.01rem 0 0.04rem #fc604e;
    -moz-box-shadow: 0.01rem 0 0.04rem #fc604e;
    box-shadow: 0.01rem 0 0.04rem #fc604e;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}

.game-classfiy-bottom-list {
    border-top: 0.01rem solid #e5e5e5;
    /*height:1.21rem;*/
    padding: 0.2rem 0;
}
.list-left,
.list-right {
    display: inline-block;
    vertical-align: top;
}
.list-left {
    width: 0.86rem;
    height: 0.87rem;
    margin-right: 0.2rem;
}
.list-left img {
    width: 0.86rem;
    height: 0.87rem;
}
.list-right {
    width: 5rem;
}
.list-info-title {
    color: #333333;
    font-size: 0.26rem;
}
.list-info-left,
.list-info-right {
    display: inline-block;
    font-size: 0.24rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.36rem;
    padding: 0 0.11rem;
}
.list-info-left {
    margin-right: 0.1rem;
    background: -webkit-linear-gradient(#fd915f, #ff7064);
    background: -o-linear-gradient(#fd915f, #ff7064);
    background: -moz-linear-gradient(#fd915f, #ff7064);
    background: linear-gradient(to right, #fd915f, #ff7064);
}
.list-info-right {
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
}
</style>