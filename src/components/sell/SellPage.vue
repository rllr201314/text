<template>
    <!-- 出售页 -->
    <div class="wrap">
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
                    <div class="search-history-tag" v-for="(item,index) in historyNameList" v-text="item.name" :key="index"></div>
                </div>
            </div>
            <div class="game-classfiy-wrap">
                <div class="game-classfiy-top">
                    <div class="game-classfiy-top-cell" v-for="(item,index) in gameClassfiy" v-text="item.name" :class="item.sele?'red-bg':''" @click="seleGameClass(item.name)" :key="index"></div>
                </div>
                <div class="game-classfiy-bottom">
                    <div class="game-classfiy-bottom-list" v-for="(item,index) in gameList" @click="goSellOption(item.category_id)" :key="index">
                        <div class="list-left">
                            <img :src="item.game_logo" :alt="item.game_name">
                        </div>
                        <div class="list-right">
                            <div class="list-info-title" v-text="item.game_name"></div>
                            <div class="list-parent" v-for="(value,i) in item.business_info" :key="i">
                                <div class="list-ico vs" v-if="value.value == 3" v-text="value.name"></div>
                                <div class="list-ico product" v-else-if="value.value == 1" v-text="value.name">成品号</div>
                                <div class="list-ico rent" v-else-if="value.value == 2" v-text="value.name">租号</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
    </div>
</template>

<script>
import Header from "@/components/home-page/Header";
import Protocal from "@/components/multi/Protocal";
export default {
    name: "SellPage",
    components: {
        Header,
        Protocal
    },
    data() {
        return {
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部log
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
                title: ""
            },
            proData: {
                isShow: false,
                con: "",
                btn: "确认",
                val: ""
            },
            search_val: "",
            user_type: "", //用户类型
            historyNameList: [],
            trade_type: "", //交易类型
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
            gameClassAll: [],
            title:'',
            keywords:'',
            business_type:'',
        };
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
            that.search_val = "";
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
            if (that.user_type == "/buy" || that.user_type == "/buy/") {
                //买
                that.$router.push({ name: "GoodScreen", params: { opt:opt } });
            } else if (that.user_type == "/sell") {
                //卖
                if (token == undefined || token == "") {
                    mui.confirm("请先登陆","提示",["取消", "确认"],
                        function(e) {
                            if (e.index == 1) {
                                that.$router.push({
                                    name: "AccountLogin"
                                });
                            }
                        },"div");
                } else {
                    that.$router.push({ name: "SellOption", query: { opt } });
                }
            } else if (that.user_type == "/rent") {
                //租
                that.$router.push({ name: "RentSearch", params: { opt:opt } });
            } else if (that.user_type == "/rent-out" || that.user_type == "/rent-out/") {
                //出租
                if (token == undefined || token == "") {
                    mui.confirm("请先登陆","提示",["取消", "确认"],
                        function(e) {
                            if (e.index == 1) {
                                that.$router.push({
                                    name: "AccountLogin"
                                });
                            }
                        },"div");
                } else {
                    that.$axios
                        .post(process.env.API_HOST + "contract_rent")
                        .then(res => {
                            if (res.status == 200) {
                                if (res.data.code == 200) {
                                    that.proData.isShow = true;
                                    that.proData.con = res.data.data;
                                    that.proData.val = opt;
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        },
        getData() {
            var that = this;
            that.user_type = that.$route.path;
            that.$axios
                .post(process.env.API_HOST + "category", {
                    game_name: that.search_val,
                    business_type : that.business_type
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
        },
        // 获取是否同意协议
        isProFn(data) {
            if (data) {
                this.$router.push({
                    name: "LeaseOption",
                    params: { opt: data }
                });
            }
        },
        judgeFn() {
            var that = this;
            var user_type = that.$route.path;
            that.title = '手游账号交易_看个号';
            that.keywords = '手游交易,手游交易平台,手游账号交易,手游交易网';//买 卖 公用
            if (user_type == "/buy" || user_type == "/buy/") {
                that.showTitle.title = "我要买";
                localStorage.detail_type = 1;//详情显示购买流程判断
                that.business_type = 1;
            } else if (user_type == "/sell") {
                that.showTitle.title = "我要卖";
                that.business_type = 1;
            } else if (user_type == "/rent" ) {
                that.showTitle.title = "我要租号";
                that.trade_type = 1;
                localStorage.detail_type = 2;//详情显示购买流程判断
                that.business_type = 2;//
                that.title = '手游账号出租_看个号';
                that.keywords = '手游号,梦幻号出租寄租,大话号出租寄租';
            } else if (user_type == "/rent-out" || user_type == "/rent-out/") {
                that.showTitle.title = "出租账号";
                that.trade_type = 1;
                that.title = '手游号出租_看个号';
                that.keywords = '手游号,梦幻号出租寄租,大话号出租寄租';
                that.business_type = 2;
            }
            that.getData();
        }
    },
    watch:{
        '$route':'judgeFn'
    },
    mounted() {
        var that = this;
        this.judgeFn();
    },
    metaInfo(){
        return {
            title:this.title,
            meta:[{
                name:'keywords',
                content:this.keywords
            },{
                name:'description',
                content:'看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
            }]
        }
    },
};
</script>

<style scoped>
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
    background: #ffffff;
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
.list-parent{
    display: inline-block;
}
.list-ico {
    display: inline-block;
    font-size: 0.24rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.36rem;
    padding: 0 0.11rem;
    margin-right: 0.1rem;
}
.vs {
    background: -webkit-linear-gradient(#fd915f, #ff7064);
    background: -o-linear-gradient(#fd915f, #ff7064);
    background: -moz-linear-gradient(#fd915f, #ff7064);
    background: linear-gradient(to right, #fd915f, #ff7064);
}
.product {
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
}
.rent {
    background: -webkit-linear-gradient(#ff9090, #ff687a);
    background: -o-linear-gradient(#ff9090, #ff687a);
    background: -moz-linear-gradient(#ff9090, #ff687a);
    background: linear-gradient(to right, #ff9090, #ff687a);
}
</style>