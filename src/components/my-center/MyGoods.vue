<template>
    <!-- 我的商品 -->
    <div class="mygoods-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="seleTit">
            <div :class="seleTit == 3?'red-border':''" @click="seleTitFn(3)">已上架</div>
            <div :class="seleTit == 1?'red-border':''" @click="seleTitFn(1)">审核中</div>
            <div :class="seleTit == 2?'red-border':''" @click="seleTitFn(2)">已下架</div>
        </div>

        <div class="search-wrap">
            <div class="sele-type" @click="showPopver('category')">
                <span v-text="category_text"></span>
                <img src="../../../static/img/goodscreen/downsolid.png" alt="">
            </div>
            <div id="category" class="mui-popover">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="item in category_type" v-text="item.game_name" @click="showText('category',item.category_id)"></li>
                </ul>
            </div>
            <div>
                <input type="text" placeholder="请输入商品名称" v-model="goods_name">
            </div>
            <div class="search" @click="getData(seleTit,'refresh','search')">搜索</div>
        </div>

        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap" v-if="seleTit == 3">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="arbitration-cell" v-for="item in putawayData">
                            <div class="arbitration-box">
                                <div class="gameLog">
                                    <img :src="item.game_logo" alt="">
                                </div>
                                <div class="orderInfo">
                                    <div class="goods-strip-title">
                                        <div class="goods-type" v-if="item.deal_type == 1">成品号</div>
                                        <div class="goods-type" v-else>代练号</div>
                                        <div class="account-type" v-if="item.client_id == 1">安卓</div>
                                        <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                                        <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                                        <div class="area" v-text="item.platform_name"></div>
                                    </div>
                                    <div class="order-des" v-text="item.goods_title"></div>
                                    <div class="history-time" v-text="item.sort_time"></div>
                                    <div class="price-status">
                                        <span class="good-price">￥
                                            <span v-text="item.goods_price"></span>
                                        </span>
                                        <span class="order-status green-bg">上架中</span>
                                    </div>
                                </div>
                            </div>
                            <div class="order-operate">
                                <div class="right-operate">
                                    <span class="pay" @click="downGoods(item.goods_id)">下架</span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <!-- 审核中 -->
            <div id="minirefresh" class="minirefresh-wrap list-wrap" v-if="seleTit == 1">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="arbitration-cell" v-for="item in auditData">
                            <div class="arbitration-box">
                                <div class="gameLog">
                                    <img :src="item.game_logo" alt="">
                                </div>
                                <div class="orderInfo">
                                    <div class="goods-strip-title">
                                        <div class="goods-type" v-if="item.deal_type == 1">成品号</div>
                                        <div class="goods-type" v-else>代练号</div>
                                        <div class="account-type" v-if="item.client_id == 1">安卓</div>
                                        <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                                        <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                                        <div class="area" v-text="item.platform_name"></div>
                                    </div>
                                    <div class="order-des" v-text="item.goods_title"></div>
                                    <div class="history-time" v-text="item.sort_time"></div>
                                    <div class="price-status">
                                        <span class="good-price">￥
                                            <span v-text="item.goods_price"></span>
                                        </span>
                                        <span class="order-status red-bg">审核中</span>
                                    </div>
                                </div>
                            </div>
                            <div class="order-operate">
                                <div class="right-operate">
                                    <span class="pay" @click="downGoods(item.goods_id)">取消上架</span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <!-- 审核中 -->
            <div id="minirefresh" class="minirefresh-wrap list-wrap" v-if="seleTit == 2">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="arbitration-cell" v-for="item in removeData">
                            <div class="arbitration-box">
                                <div class="gameLog">
                                    <img :src="item.game_logo" alt="">
                                </div>
                                <div class="orderInfo">
                                    <div class="goods-strip-title">
                                        <div class="goods-type" v-if="item.deal_type == 1">成品号</div>
                                        <div class="goods-type" v-else>代练号</div>
                                        <div class="account-type" v-if="item.client_id == 1">安卓</div>
                                        <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                                        <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                                        <div class="area" v-text="item.platform_name"></div>
                                    </div>
                                    <div class="order-des" v-text="item.goods_title"></div>
                                    <div class="history-time" v-text="item.sort_time"></div>
                                    <div class="price-status">
                                        <span class="good-price">￥
                                            <span v-text="item.goods_price"></span>
                                        </span>
                                        <span class="order-status gray-bg">已下架</span>
                                    </div>
                                    <div class="arbitration" v-if="item.goods_status == 2 &&　item.reject_reason　!= ''">
                                        <span class="gray">原因</span>
                                        <span v-text="item.reject_reason"></span>
                                    </div>
                                    <div class="arbitration" v-if="item.goods_status == 4 &&　item.down_reason != ''">
                                        <span class="gray">原因</span>
                                        <span v-text="item.reject_reason"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="order-operate">
                                <div class="right-operate">
                                    <span class="pay" @click="getGoods(item.goods_id)">编辑</span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <NoData class="nodata" v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
// import myScroll from "@/components/pull/refresh"; //刷新

export default {
    inject: ["reload"],
    name: "MyGoods",
    components: {
        Header,
        // myScroll,
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
                    title: "我的商品"
                }
            },
            showNoData: false,
            seleTit: 3,
            putawayData: [],
            auditData: [],
            removeData: [],
            pages: 1,
            num_page: 1,

            
            
            category_text: "游戏类型",
            category_type: [],
            goods_name:'',
            c_id: "",
        };
    },
    methods: {
        // 显示弹出框
        showPopver(flag) {
            mui(`#${flag}`).popover("toggle");
        },
        // 获取游戏类型
        getCategory() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"category")
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var category = res.data.data.is_hot;
                            category.unshift({
                                category_id: "",
                                game_name: "全部"
                            });
                            that.category_type = category;
                            console.log(that.category_type);
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },// 选择隐藏弹框
        showText(flag, val) {
            var that = this;
            mui(`#${flag}`).popover("toggle");
            var categoryArr = that.category_type;
            for (var i in categoryArr) {
                if (val == categoryArr[i].category_id) {
                    that.category_text = categoryArr[i].game_name;
                    that.c_id = categoryArr[i].category_id;
                    break;
                }
            }
        },
        seleTitFn(opt) {
            var that = this;
            that.seleTit = opt;
            if (opt == 3) {
                if (that.putawayData == "") {
                    that.getData(that.seleTit, "refresh"); //上架
                }
            } else if (opt == 1) {
                if (that.auditData == "") {
                    that.getData(that.seleTit, "refresh"); //审核中
                }
            } else if (opt == 2) {
                if (that.removeData == "") {
                    that.getData(that.seleTit, "refresh"); //已下架
                }
            }
        },
        getData(opt, flag,search) {
            console.log(opt+'--'+flag);
            var that = this;
            var request = {};
            request.page = that.num_page;
            request.goods_status = opt;
            if(search == 'search'){
                request.category_id = that.c_id;
                request.goods_title = that.goods_name;
            }
            that.$axios
                .post(process.env.API_HOST+"goods_information",request)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            // 默认进来显示已上架商品
                            var data = res.data.data.data;
                            if (flag == "refresh") {
                                if(data == ""){
                                    that.showNoData = true;
                                    that.miniRefresh.endDownLoading();
                                    that.putawayData = '';
                                    that.removeData = '';
                                    that.auditData = '';
                                }else{
                                    that.showNoData = false;
                                    that.miniRefresh.endDownLoading();
                                    if (opt == 3) {
                                        that.putawayData = data;
                                    } else if (opt == 2) {
                                        that.removeData = data;
                                    } else if (opt == 1) {
                                        that.auditData = data;
                                    }
                                    that.num_page = res.data.data.current_page;
                                    that.pages = res.data.data.last_page;
                                }
                            } else if (flag == "push") {
                                if(data == ''){
                                    that.miniRefresh.endUpLoading(true);
                                }else{
                                    that.miniRefresh.endUpLoading();
                                    if (opt == 3) {
                                        for (var i in data) {
                                            that.putawayData.push(data[i]);
                                        }
                                    } else if (opt == 2) {
                                        for (var i in data) {
                                            that.removeData.push(data[i]);
                                        }
                                    } else if (opt == 1) {
                                        for (var i in data) {
                                            that.auditData.push(data[i]);
                                        }
                                    }
                                }
                            }
                        } 
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 下架
        downGoods(goods_id) {
            var that = this;
            mui.confirm(
                "确定下架商品",
                "提示",
                ["取消", "确认"],
                function(e) {
                    if (e.index == 1) {
                        that.$axios
                            .post(process.env.API_HOST+"down_goods", {
                                goods_id: goods_id
                            })
                            .then(res => {
                                console.log(res);
                                if (res.status == 200) {
                                    if (res.data.code == 200) {
                                        mui.alert(
                                            res.data.msg,
                                            "提示",
                                            "确定",
                                            function() {
                                                that.reload();
                                            },
                                            "div"
                                        );
                                    } else if (res.data.code == 401) {
                                        mui.confirm(
                                            "请先登陆",
                                            "提示",
                                            ["取消", "确认"],
                                            function(e) {
                                                if (e.index == 1) {
                                                    that.$router.push({
                                                        name: "AccountLogin",
                                                        params: {
                                                            redirect:
                                                                that.$router
                                                                    .currentRoute
                                                                    .name
                                                        }
                                                    });
                                                } else {
                                                    that.$router.go(-1);
                                                }
                                            },
                                            "div"
                                        );
                                    } else {
                                        mui.alert(
                                            res.data.msg,
                                            "提示",
                                            "确定",
                                            "",
                                            "div"
                                        );
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                },
                "div"
            );
        },
        // 编辑商品
        getGoods(goods_id) {
            var that = this;
            mui.confirm(
                "确定编辑商品",
                "提示",
                ["取消", "确认"],
                function(e) {
                    if (e.index == 1) {
                        that.$router.push({
                            name: "SellInfo",
                            query: {
                                flag: 2,
                                g: goods_id
                            }
                        });
                    }
                },
                "div"
            );
        },
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: false,
                    bounceTime: 500,
                    callback: () => {
                        that.num_page = 1;
                        that.getData(that.seleTit, "refresh");
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.num_page++;
                        console.log(that.num_page+'--'+that.pages);
                        if(that.num_page <= that.pages){
                            that.getData(that.seleTit, "push");
                        }else{
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    mounted() {
        var that = this;
        that.getData(that.seleTit, "refresh");
        that.refresh();
        that.getCategory();
    }
};
</script>
<style scoped>
.mygoods-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.seleTit {
    display: flex;
    font-size: 0.26rem;
    color: #333333;
    line-height: 0.8rem;
    text-align: center;
    background: #ffffff;
    position: fixed;
    top: 0.88rem;
    left: 0;
    right: 0;
    z-index: 66;
    max-width:12rem;
    margin:0 auto;
}
.seleTit div {
    width: 100%;
}
.red-border {
    border-bottom: 0.04rem solid #ff7e4a;
    color: #ff7e4a;
}

.goodsList {
    height: 11.4rem;
}

.arbitration-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-top: 0.2rem;
    padding: 0 0.2rem;
}
.arbitration-box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.gameLog {
    margin: 0 0.2rem;
}
.gameLog img {
    width: 0.8rem;
    height: 0.8rem;
}
.orderInfo {
    width: 5.3rem;
    padding: 0.2rem 0;
    position: relative;
}
.orderInfo span {
    display: inline-block;
}
.order-des {
    width: 4rem;
    font-size: 0.26rem;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.5rem;
}
.price-status {
    line-height: 0.4rem;
}
.good-price {
    color: #ff5e5e;
    font-size: 0.28rem;
}
.order-status {
    font-size: 0.2rem;
    padding: 1px 3px;
    color: #ffffff;
    line-height: 0.3rem;
    text-align: center;
    vertical-align: middle;
    margin-left: 5px;
}
.red-bg {
    background: #ff5e5e;
}
.green-bg {
    background: #45c773;
}
.gray-bg {
    background: #c6c6c6;
}
.order-operate {
    position: relative;
    border-top: 0.01rem solid #e5e5e5;
    line-height: 0.8rem;
    height: 0.8rem;
}
.right-operate {
    font-size: 0.22rem;
    color: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
}
.cancel,
.pay {
    width: 1.1rem;
    line-height: 0.44rem;
    text-align: center;
    display: inline-block;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
}
.pay {
    background: #fe7649;
}
.cancel {
    background: #c6c6c6;
    margin-right: 0.2rem;
}
.arbitration {
    line-height: 0.4rem;
    font-size: 0.26rem;
    color: #333333;
}
.gray {
    color: #999999;
}
.history-time {
    color: #999999;
    font-size: 0.26rem;
    line-height: 0.4rem;
    position: absolute;
    top: 0.2rem;
    right: 0;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.1rem;
}
.goods-strip-title div {
    display: inline-block;
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
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
}
.list-box-wrap {
    position:relative;
    max-width:12rem;
    margin:0 auto;
    height:100vh;
}
.list-wrap {
    top:2.58rem;
    padding:0 .2rem;
}
.list {
    background: #f6f6f6;
}

.nodata{
    padding-top:1.68rem;
}








.search-wrap {
    padding: 0.3rem 0 0.3rem 0.2rem;
    font-size: 0.24rem;
    color: #333333;
    position: fixed;
    top:1.68rem;
    left:0;
    right:0;
    max-width:12rem;
    margin:0 auto;
    z-index:999;
    display:flex;
    justify-content:space-around;
    align-items: center;
}
.sele-type {
    width: 2.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    border: 1px solid #d2d2d2;
    padding: 0 0.1rem;
    display: inline-block;
    position: relative;
}
#category {
    top: .8rem;
    left: .35rem;
    width: 2.3rem;
}
.sele-type img {
    width: 0.2rem;
    height: 0.1rem;
    position: absolute;
    top: calc(50% - 0.05rem);
    right: 0.2rem;
}
.search {
    font-size: 0.22rem;
    display: inline-block;
    width: 0.65rem;
    height: 0.44rem;
    background: #fe7649;
    color: #ffffff;
    text-align: center;
    line-height: 0.44rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0.01rem 0.02rem 0.1rem #fe7649;
    -moz-box-shadow: 0.01rem 0.02rem 0.1rem #fe7649;
    box-shadow: 0.01rem 0.02rem 0.1rem #fe7649;
}

input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    /* border: none; */
    width: 3.5rem;
    height: 0.5rem;
}
</style>
