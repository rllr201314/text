<template>
    <!-- 浏览记录 -->
    <div class="browse-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="browse-con" v-if="!showNoData">
                            <div class="sele">
                                <span @click="clear('null')">清除失效</span>
                                <span @click="clear('all')">清除所有记录</span>
                            </div>
                            <div class="browse-info">
                                <div class="vertical"></div>
                                <div class="browse-cell" v-for="item in goodsInfo">
                                    <div class="browse-cell-tit">
                                        <span class="circle"></span>
                                        <span v-text="item.time"></span>
                                    </div>
                                    <div class="browse-cell-con" v-for="ind in item.data" @click="godetail(ind.goods_status,ind.goods_id)">
                                        <div class="browse-cell-con-top">
                                            <div class="goods-strip-title">
                                                <div class="goods-type" v-if="ind.deal_type == 1">成品号</div>
                                                <div class="goods-type" v-else-if="ind.deal_type == 2">代练号</div>
                                                <div class="account-type" v-if="ind.client_id == 1">安卓</div>
                                                <div class="account-type" v-else-if="ind.client_id == 2">苹果</div>
                                                <div class="account-type" v-else-if="ind.client_id == 3">安卓混服</div>
                                                <div class="area" v-text="ind.platform_name"></div>
                                            </div>
                                            <div class="goods-strip-content">
                                                <div class="goods-des" v-text="ind.goods_title"></div>
                                            </div>
                                            <div class="goods-strip-bottom">
                                                <span class="goods-price">￥
                                                    <span v-text="ind.goods_price"></span>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="browse-cell-con-bot">
                                            <div class="con-bot-box">
                                                <img class="see" src="../../../../static/img/my-center/record/see.png" alt="">
                                                <span v-text="ind.click_count"></span>
                                            </div>
                                            <div class="con-bot-box">
                                                <img class="collect" src="../../../../static/img/my-center/record/collect.png" alt="">
                                                <span v-text="ind.collect_count"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="hint" v-if="false">
            <img src="../../../../static/img/goods-details/left_solid.png" alt="">
            <span>没有更多记录啦</span><img src="../../../../static/img/goods-details/right_solid.png" alt="">
        </div>
        <NoData class="nodata" v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "BrowseRecord",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "浏览记录"
                }
            },
            now_page: 1,
            pages: null,
            showNoData: false,
            goodsInfo: [],
            miniRefresh: null
        };
    },
    methods: {
        clear(flag) {
            var that = this;
            if (flag == "null") {
                that.$axios
                    .post(process.env.API_HOST+"clear_history")
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            this.getData();
                            mui.toast(res.data.msg, {
                                duration: "short",
                                type: "div"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (flag == "all") {
                that.$axios
                    .post(process.env.API_HOST+"clear_all_history")
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                that.showNoData = true;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 跳转详情
        godetail(status,id){
            console.log(status)
            if(status == 3){
                this.$router.push({name: "Details",query: {goods_id:id}});
            }else if(status == 4){
                mui.toast("该商品已下架", {duration: "short",type: "div"});
            }else if(status == 5){
                mui.toast("该商品已售出", {duration: "short",type: "div"});
            }else{
                mui.toast("该商品已失效", {duration: "short",type: "div"});
            }
        },
        getData(flag) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"history_info", {
                    page: that.now_page
                })
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            if (flag) {
                                if (res.data.data.data == "") {
                                    that.miniRefresh.endUpLoading(true);
                                } else {
                                    for (var i in res.data.data.data) {
                                        that.goodsInfo.push(
                                            res.data.data.data[i]
                                        );
                                    }
                                    that.miniRefresh.endUpLoading(false);
                                }
                            } else {
                                if (res.data.data.data == "") {
                                    that.showNoData = true;
                                } else {
                                    that.goodsInfo = res.data.data.data;
                                    that.showNoData = false;
                                    that.pages = res.data.data.last_page;
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        refresh() {
            this.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isLock: true,
                    isAuto: false,
                    callback: () => {
                        this.request.page = 1;
                        this.getData();
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        this.now_page++;
                        if (this.now_page <= this.pages) {
                            this.getData("push");
                            console.log("aaa");
                        } else {
                            this.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    mounted() {
        var that = this;
        that.getData();
        that.refresh();
    }
};
</script>
<style scoped>
.browse-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.browse-con {
    padding: 0 0.2rem;
    position: relative;
}
.sele {
    color: #999999;
    font-size: 0.24rem;
    position: absolute;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: right;
    right: 0.2rem;
    top: 0;
    z-index: 2;
}
.sele span {
    display: inline-block;
}
.sele span:nth-last-child(1) {
    margin-left: 0.6rem;
}
.vertical {
    width: 1px;
    position: absolute;
    left: 0;
    top: 0.3rem;
    bottom: 0;
    /* height:1200px; */
    background: #dcdcdc;
}
.browse-info {
    padding-left: 0.24rem;
    position: relative;
}
.browse-info .browse-cell-con:nth-last-child(1) {
    margin-bottom: 0;
}
.browse-cell-tit {
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #333333;
    position: relative;
}
.circle {
    display: inline-block;
    width: 0.1rem;
    height: 0.1rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    background: #fe7649;
    position: absolute;
    left: -0.28rem;
    top: calc(50% - 0.05rem);
}
.browse-cell-con {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
}
.browse-cell-con-top {
    padding: 0.2rem 0;
    border-bottom: 1px solid #e5e5e5;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
}
.goods-strip-title div {
    vertical-align: middle;
}
/* 精品 */
.goods-type {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
    display: inline-block;
    margin-right: 0.1rem;
}
.account-type {
    text-align: center;
    width: 0.7rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -o-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -moz-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    display: inline-block;
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
}
/* 详情 -- 保障*/
.goods-strip-content {
    line-height: 0.5rem;
}
.goods-des {
    width: 5rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
}

/* 底部 价格 */
.goods-price {
    color: #fa5856;
    font-size: 0.36rem;
}

.browse-cell-con-bot div {
    display: inline-block;
    margin-right: 0.7rem;
}
.con-bot-box {
    color: #666666;
    font-size: 0.24rem;
}
.con-bot-box img {
    vertical-align: middle;
}
.con-bot-box span {
    vertical-align: middle;
}
.see {
    width: 0.34rem;
    height: 0.21rem;
}
.collect {
    width: 0.3rem;
    height: 0.28rem;
    margin-top: -0.05rem;
}

/* 没有更多历史记录 */
.hint {
    text-align: center;
    line-height: 0.7rem;
}
.hint img {
    width: 0.55rem;
    height: 0.03rem;
    vertical-align: middle;
}
.hint span {
    display: inline-block;
    margin: 0 0.1rem;
    color: #999999;
    font-size: 0.24rem;
    vertical-align: middle;
}
.list-box-wrap{
    position:relative;
    max-width:12rem;
    margin:0 auto;
    height:100vh;
}
.list-wrap {
    top: 0.88rem;
}
.list {
    background: #f6f8fe;
}
.nodata{
    padding-top:0.88rem;
}
</style>
