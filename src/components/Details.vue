<template>
    <div class="goods-details-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <Swiper :imgList="componentsData.imgList"></Swiper>
        <!-- 商品标题 -->
        <div class="goods-details-title">
            <div class="goods-datails-title-top">
                <div class="title-boutique" v-if="goodsDetailsData.title.isBoutique == 1">精</div>
                <div class="title-goods-type" v-if="goodsDetailsData.title.goods_type == 1">成品号</div>
                <div class="title-goods-type" v-else-if="goodsDetailsData.title.goods_type == 2">代练号</div>
                <div class="title-view-history">
                    <img src="../../static/img/goods-details/view_count_ico.png" alt="">
                    <span>浏览次数</span>
                    <span v-text="goodsDetailsData.title.view_num"></span>
                </div>
            </div>
            <div class="goods-datails-title-des" v-text="goodsDetailsData.title.goods_des"></div>
            <div class="title-goods-price">￥
                <span v-text="goodsDetailsData.title.goods_price"></span>
            </div>
            <div class="upTime">
                <span>发布时间：</span>
                <span v-text="goodsDetailsData.title.upTime"></span>
            </div>
        </div>
        <!-- 卖家信息 -->
        <div class="seller-info">
            <img class="user-head-log" :src="goodsDetailsData.sellerInfo.sellerLog" alt="">
            <div class="seller-info-right">
                <div class="seller-right-top">
                    <div class="seller-name" v-text="goodsDetailsData.sellerInfo.sellername"></div>
                    <!-- 暂时保留 -->
                    <div class="seller-auth" v-if="false">
                        <img src="../../static/img/goods-details/Authentication_ico.png" alt="">
                        <span>已认证</span>
                    </div>
                    <div class="seller-gold" v-if="false">
                        <img src="../../static/img/goods-details/goldSellers_ico.png" alt="">
                        <span>金牌卖家</span>
                    </div>
                </div>
                <div class="seller-right-bottom" v-if="false">
                    <span>信誉积分</span>
                    <span v-text="goodsDetailsData.sellerInfo.credit"></span>
                </div>
            </div>
        </div>
        <!-- 服务保障 -->
        <div class="safe-info detail-info">
            <div class="info-left">服务保障</div>
            <div class="info-right safe-info-right">
                <img v-if="goodsDetailsData.safeInfo.safe == 1" src="../../static/img/goodscreen/safe_ico.png" alt="">
                <img v-if="goodsDetailsData.safeInfo.stage == 1" src="../../static/img/goodscreen/stages_ico.png" alt="">
                <img v-if="goodsDetailsData.safeInfo.check == 1" src="../../static/img/goodscreen/verify.png" alt="">
                <img v-if="goodsDetailsData.safeInfo.compact == 1" src="../../static/img/goodscreen/contract_ico.png" alt="">
            </div>
        </div>
        <!-- 账号绑定 -->
        <div class="accountBind-info detail-info">
            <div class="info-left">账号绑定</div>
            <div class="info-right">
                <div class="user-bind">
                    <img :src="goodsDetailsData.accountBind.userBind?'../../../static/img/goods-details/nobind_ico.png':'../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定身份证</span>
                </div>
                <div class="user-bind">
                    <img :src="goodsDetailsData.accountBind.phoneBind?'../../../static/img/goods-details/nobind_ico.png':'../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定手机</span>
                </div>
                <div class="user-bind">
                    <img :src="goodsDetailsData.accountBind.emailBind?'../../../static/img/goods-details/nobind_ico.png':'../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定邮箱</span>
                </div>
            </div>
        </div>
        <!-- 商品描述 -->
        <div class="goods-details-info">
            <GoodsInfo v-bind:goodsInfo="componentsData.goodsInfo"></GoodsInfo>
        </div>
        <!-- 视频看号 -->
        <div class="vedio-info">
            <div class="vedio-title" v-if="goodsDetailsData.video_url != ''">
                <div class="vedio-title-top">
                    <span class="vertical"></span>
                    <span>视频看号</span>
                </div>
                <div class="red-color">
                    为保证您的资产安全受平台保护，请勿联系视频中的个人联系方式
                </div>
            </div>
            <!-- iframe -->
            <div class="vedio-content" v-if="goodsDetailsData.video_url != ''">视频</div>
            <div class="vidio-bottom">
                <div :class="goodsDetailsData.safeOrflow.safe?'red-border':'black-border'" @click="cliflow('safe')">安全服务</div>
                <div :class="goodsDetailsData.safeOrflow.flow?'red-border':'black-border'" @click="cliflow('flow')">购买流程</div>
            </div>
            <div class="showBox">
                <div class="showBox-left" v-show="goodsDetailsData.safeOrflow.safe">
                    <div class="detail-user-opera">
                        <div class="cell user-contact">
                            <img src="../../static/img/goods-details/contact_ico.png" alt="">
                            <div>全程客服协助</div>
                        </div>
                        <div class="cell user-safety">
                            <img src="../../static/img/goods-details/safety_ico.png" alt="">
                            <div>付款安全保障</div>
                        </div>
                        <div class="cell user-Authentication">
                            <img src="../../static/img/goods-details/user_bind_ico.png" alt="">
                            <div>卖家身份认证</div>
                        </div>
                        <div class="cell user-settlement">
                            <img src="../../static/img/goods-details/settlement_ico.png" alt="">
                            <div>保险理赔</div>
                        </div>
                    </div>
                    <div class="go-verify" @click="goVerify">前往验证客服</div>
                    <!-- <div class="more-info">查看更多详情</div> -->
                </div>
                <div class="showBox-right" v-show="goodsDetailsData.safeOrflow.flow">
                    <div class="flow-left">
                        <img src="../../static/img/goods-details/flow.png" alt="">
                    </div>
                    <div class="flow-right">
                        <div class="flow-title">下单支付</div>
                        <div class="flow-content">支付成功，进入与 [联系发货客服] 聊天界面</div>
                        <div class="flow-title">等待发货</div>
                        <div class="flow-content">客服登录卖家账号，为买家发货。</div>
                        <div class="flow-content">部分游戏需要买家同时在线才能发货，</div>
                        <div class="flow-content">请保持在线并及时与发货客服沟通。</div>
                        <div class="flow-content red-color">重要：道具交易不使用QQ沟通，谨防骗子！</div>
                        <div class="flow-title">买家收货</div>
                        <div class="flow-content">在游戏内取货</div>
                        <div class="flow-title">确认收货</div>
                        <div class="flow-content">买家确认收货</div>
                        <div class="flow-title">交易成功</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="guess" v-if="goodsDetailsData.goodsList != ''">
            <img src="../../static/img/goods-details/left_solid.png" alt="">
            <span>猜你喜欢</span><img src="../../static/img/goods-details/right_solid.png" alt="">
        </div>
        <!-- 商品列表 -->
        <div v-if="goodsDetailsData.goodsList != ''">
            <div class="goods-strip" v-for="item in goodsDetailsData.goodsList" @click="goDetail(item.goods_id)">
                <div class="goods-strip-title">
                    <div class="goods-type" v-if="item.deal_type == 1">成品号</div>
                    <div class="goods-type" v-else-if="item.deal_type == 2">代练号</div>
                    <div class="account-type" v-if="item.client_id == 1">安卓</div>
                    <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                    <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                    <div class="area" v-text="item.area_name"></div>
                </div>
                <div class="goods-des" v-text="item.goods_title"></div>
                <div class="goods-price">￥
                    <span v-text="item.goods_price"></span>
                </div>
            </div>
            <div class="more-info">查看更多</div>
        </div>
        <!-- div -->
        <div class="goods-details-bottom">
            <div class="share goods-details-bottom-left">
                <img src="../../static/img/goods-details/share_ico.png" alt="">
                <div>分享</div>
            </div>
            <div class="collect goods-details-bottom-left" @click="collect()">
                <img :src="goodsDetailsData.isCollect == 1?'./static/img/goods-details/ok_collect_ico.png':'./static/img/goods-details/no_collect_ico.png'" alt="">
                <div>收藏</div>
            </div>
            <div class="bargain goods-details-bottom-right" v-if="goodsDetailsData.sell_type == 2" @click="bargainFn">议价</div>
            <div class="goods-details-bottom-right" v-if="goodsDetailsData.sell_type == 1"></div>
            <div class="buy goods-details-bottom-right" @click="buyFn">立即购买</div>
        </div>
        <!-- 议价弹框 -->
        <div class="hoodle" v-show="showShade">
            <img src="../../static/img/my-center/record/bargain_tit.png" alt="">
            <div class="hoodle-con">
                <input type="number" placeholder="请输入您的出价" v-model="bargain_price">
            </div>
            <div class="hoodle-btn">
                <div class="okBtn" @click="goBargain('ok')">确认</div>
                <div class="cancelBtn" @click="goBargain('no')">取消</div>
            </div>
        </div>
        <div class="shade" v-show="showShade"></div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Swiper from "@/components/home-page/Swiper";
import GoodsInfo from "@/components/auction-details/GoodsInfo"; //商品信息
import NoData from "@/components/multi/NoData";
export default {
    inject: ["reload"],
    name: "Details",
    data() {
        return {
            // 组件的数据
            componentsData: {
                // Header
                showTitle: {
                    showBack: false, //显示后退按钮
                    showLogo: 2, //不显示头部log
                    showShare: 3, //1搜索2分享
                    showBg: true, //是否显示背景
                    title: "商品详情"
                },
                imgList: [], //轮播图
                // 商品列表
                // 商品信息
                goodsInfo: {
                    isShowTitle: false, //是否显示商品信息头部
                    basic: "",
                    level: "",
                    school: "",
                    authent: "",
                    des: ``
                }
            },
            goods_id:null,
            showNoData: false,
            showShade: false,
            bargain_price: "",
            goodsDetailsData: {
                // 头部标题
                title: {
                    isBoutique: "",
                    goods_type: "", //商品类型
                    view_num: "", //浏览次数
                    goods_des: "",
                    goods_price: "",
                    goods_sellNum: "",
                    upTime: ""
                },
                // 卖家信息
                sellerInfo: {
                    sellerLog: "",
                    sellername: "",
                    credit: "" //信誉积分
                },
                // 服务保障
                safeInfo: {
                    safe: "",
                    stage: "",
                    check: "",
                    compact: ""
                },
                // 账号绑定
                accountBind: {
                    userBind: true,
                    phoneBind: true,
                    emailBind: true
                },
                // 显示安全服务是购买流程
                safeOrflow: {
                    safe: true,
                    flow: false
                },
                // 是否收藏
                isCollect: "",
                // 是否有视频
                video_url: "",
                sell_type: "",
                goodsList: []
            }
        };
    },
    components: {
        Header,
        Swiper,
        GoodsInfo //商品信息
    },
    methods: {
        // 查看安全服务还是购买流程
        cliflow(flag) {
            if (flag == "safe") {
                this.goodsDetailsData.safeOrflow.safe = true;
                this.goodsDetailsData.safeOrflow.flow = false;
            } else if (flag == "flow") {
                this.goodsDetailsData.safeOrflow.safe = false;
                this.goodsDetailsData.safeOrflow.flow = true;
            }
        },
        // 验证客服
        goVerify() {
            this.$router.push({ name: "Authenticity" });
        },
        // 收藏
        collect() {
            var that = this;
            var token = this.$store.state.token;
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
                                    redirect: that.$router.currentRoute.name
                                }
                            });
                //         }
                //     },
                //     "div"
                // );
            } else {
                that.$axios
                    .post("/api/collect", {
                        goods_id: that.goods_id
                    })
                    .then(function(res) {
                        console.log(res);
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                if (that.goodsDetailsData.isCollect == 1) {
                                    that.goodsDetailsData.isCollect = 2;
                                } else {
                                    that.goodsDetailsData.isCollect = 1;
                                }
                            }
                        }
                    })
                    .catch(function(err) {});
            }
        },
        bargainFn() {
            this.showShade = true;
            var mo = function(e) {
                e.preventDefault();
            };
            document.body.style.overflow = "hidden";
            document.addEventListener("touchmove", mo, false); //禁止页面滑动
        },
        buyFn() {
            var that = this;
            if (that.$store.state.token) {
                that.$router.push({
                    name: "PlaceOrderPage",
                    query: { goods_id: that.goods_id }
                });
            } else {
                that.$router.push({
                    name: "AccountLogin",
                    params: {
                        redirect: that.$router.currentRoute.name
                    }
                });
            }
        },
        goBargain(flag, e) {
            var that = this;
            if (flag == "ok") {
                if (that.bargain_price) {
                    that.$axios
                        .post("/api/discuss", {
                            goods_id: that.goods_id,
                            discuss_price: that.bargain_price
                        })
                        .then(function(res) {
                            if (res.status == 200) {
                                mui.alert(
                                    res.data.msg,
                                    "提示",
                                    "确认",
                                    "",
                                    "div"
                                );
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                } else {
                    mui.alert("请输入议价价格", "提示", "确认", "", "div");
                    return false;
                }
            }
            that.bargain_price = "";
            that.showShade = false;
            var mo = function(e) {
                e.preventDefault();
            };
            document.body.style.overflow = ""; //出现滚动条
            document.removeEventListener("touchmove", mo, false);
        },
        goDetail(goods_id) {
            console.log("aaa");
            this.$router.replace({
                name: "Details",
                query: { goods_id: goods_id }
            });
            this.getData();
        },
        getData() {
            var that = this;

            that.$axios
                .post("/api/goods_detail", {
                    goods_id: that.goods_id
                })
                .then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            if (res.data.data == "") {
                                goods_info = "";
                                that.showNoData = true;
                            }
                            that.showNoData = false;
                            var goods_info = res.data.data.goods_info;
                            that.goodsDetailsData.title.isBoutique =
                                goods_info.is_recommend;
                            that.goodsDetailsData.title.goods_type =
                                goods_info.deal_type;
                            that.goodsDetailsData.title.view_num =
                                goods_info.click_count;
                            that.goodsDetailsData.title.goods_des =
                                goods_info.goods_title;
                            that.goodsDetailsData.title.goods_price =
                                goods_info.goods_price;
                            that.goodsDetailsData.title.goods_sellNum =
                                goods_info.is_recommend;
                            that.goodsDetailsData.title.upTime =
                                goods_info.create_time;
                            that.goodsDetailsData.sellerInfo.sellerLog =
                                goods_info.head_img;
                            that.goodsDetailsData.sellerInfo.sellername =
                                goods_info.username;
                            that.goodsDetailsData.safeInfo.stage =
                                goods_info.is_stage;
                            that.goodsDetailsData.safeInfo.safe =
                                goods_info.is_safe;
                            that.goodsDetailsData.safeInfo.check =
                                goods_info.is_check;
                            that.goodsDetailsData.safeInfo.compact =
                                goods_info.is_compact;
                            var account_bind = goods_info.account_bind;
                            if (account_bind.length > 1) {
                                for (var i in account_bind) {
                                    if (account_bind[i] == 1) {
                                        that.goodsDetailsData.accountBind.userBind = false;
                                        continue;
                                    } else if (account_bind[i] == 2) {
                                        that.goodsDetailsData.accountBind.emailBind = false;
                                        continue;
                                    } else if (account_bind[i] == 3) {
                                        that.goodsDetailsData.accountBind.phoneBind = false;
                                        continue;
                                    } else if (account_bind[i] == 4) {
                                        that.goodsDetailsData.accountBind.userBind = true;
                                        that.goodsDetailsData.accountBind.emailBind = true;
                                        that.goodsDetailsData.accountBind.phoneBind = true;
                                    }
                                }
                            } else {
                                if (account_bind[0] == 1) {
                                    that.goodsDetailsData.accountBind.userBind = false;
                                    that.goodsDetailsData.accountBind.emailBind = true;
                                    that.goodsDetailsData.accountBind.phoneBind = true;
                                } else if (account_bind[0] == 2) {
                                    that.goodsDetailsData.accountBind.emailBind = false;
                                    that.goodsDetailsData.accountBind.phoneBind = true;
                                    that.goodsDetailsData.accountBind.userBind = true;
                                } else if (account_bind[0] == 3) {
                                    that.goodsDetailsData.accountBind.phoneBind = false;
                                    that.goodsDetailsData.accountBind.userBind = true;
                                    that.goodsDetailsData.accountBind.emailBind = true;
                                } else if (account_bind[0] == 4) {
                                    that.goodsDetailsData.accountBind.userBind = true;
                                    that.goodsDetailsData.accountBind.emailBind = true;
                                    that.goodsDetailsData.accountBind.phoneBind = true;
                                }
                            }
                            // 基本信息
                            if (goods_info.server_name != null) {
                                that.componentsData.goodsInfo.basic =
                                    goods_info.platform_name +
                                    ">" +
                                    goods_info.area_name +
                                    ">" +
                                    goods_info.server_name;
                            } else {
                                that.componentsData.goodsInfo.basic =
                                    goods_info.platform_name +
                                    ">" +
                                    goods_info.area_name;
                            }
                            that.componentsData.goodsInfo.level =
                                goods_info.role_level + "级";
                            that.componentsData.goodsInfo.school =
                                goods_info.faction_name;
                            that.componentsData.goodsInfo.des =
                                goods_info.goods_description;
                            that.componentsData.imgList =
                                goods_info.goods_images;
                            that.goodsDetailsData.sell_type =
                                goods_info.sell_type; //一口价还是可议价
                            that.goodsDetailsData.isCollect =
                                goods_info.is_collect; //是否收藏
                            if (res.data.data.recommendInfo.server_name) {
                                that.goodsDetailsData.goodsList =
                                    res.data.data.recommendInfo;
                                that.goodsDetailsData.goodsList.area_name =
                                    res.data.data.recommendInfo.area_name +
                                    ">" +
                                    res.data.data.recommendInfo.server_name;
                            } else {
                                that.goodsDetailsData.goodsList =
                                    res.data.data.recommendInfo;
                            }
                        } else {
                            // that.$router.go(-1);
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    // beforeRouteLeave(to,from,next){
    //     // this.getData();
    //     // console.log(this);
    //     // console.log(to);
    //     // if(to.path == 'AccountLogin'){
    //     //     from.meta.keepAlive = true;
    //     // }
    //     // next();
    // },
    mounted() {
        var that = this;
        if (
            that.$route.query.goods_id != "" &&
            that.$route.query.goods_id != undefined
        ) {
            that.goods_id = that.$route.query.goods_id;
            that.getData();
        } else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.goods-details-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top: 0.88rem;
}

/* 商品标题 */
.goods-details-title {
    background: #ffffff;
    padding: 0.26rem 0.2rem;
    margin-bottom: 0.2rem;
}
.goods-datails-title-top {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
}
/* 精品 */
.title-boutique {
    text-align: center;
    background: #fe7649;
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.title-goods-type {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
    display: inline-block;
}
.title-view-history {
    color: #999999;
    float: right;
}
.title-view-history img {
    width: 0.39rem;
    height: 0.24rem;
    vertical-align: middle;
}
.title-view-history span {
    vertical-align: middle;
}
.goods-datails-title-des {
    width: 6rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
    line-height: 0.35rem;
}

.title-goods-price {
    font-size: 0.3rem;
    color: #fa5856;
    vertical-align: middle;
    line-height: 0.5rem;
    font-weight: bold;
}
.title-goods-price span {
    font-size: 0.36rem;
}
.upTime {
    font-size: 0.24rem;
    color: #999999;
    line-height: 0.4rem;
}
.title-sellNum {
    font-size: 0.2rem;
    line-height: 0.35rem;
    padding: 0 0.1rem;
    color: #999999;
    border: 1px solid #b5b5b5;
    -webkit-border-radius: 0.18rem;
    -moz-border-radius: 0.18rem;
    border-radius: 0.18rem;
    vertical-align: middle;
}
/* 卖家信息 */
.seller-info {
    padding: 0.26rem 0.2rem;
    margin-bottom: 0.2rem;
    background: #ffffff;
}
.user-head-log {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.19rem;
    vertical-align: middle;
}
.seller-info-right {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.26rem;
    color: #666666;
}
.seller-right-top div {
    display: inline-block;
}
.seller-right-top img {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
}

.seller-right-top span {
    vertical-align: middle;
}
.seller-name {
    vertical-align: middle;
    font-size: 0.28rem;
    color: #333333;
    margin-right: 0.32rem;
}
.seller-right-bottom {
    margin-top: 0.17rem;
}

.detail-info {
    padding: 0 0.15rem;
    background: #ffffff;
    font-size: 0.26rem;
    margin-bottom: 0.2rem;
    /* height:.9rem; */
}
.info-left {
    width: 1.19rem;
    line-height: 0.9rem;
    color: #666666;
}
.info-right {
    width: 5.5rem;
    color: #333333;
}
.detail-info div {
    display: inline-block;
}
/* 服务保障 */
.safe-info-right {
    vertical-align: middle;
}
.safe-info-right img {
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.14rem;
}
/* 账号绑定 */
.user-bind img {
    width: 0.25rem;
    height: 0.27rem;
    /* vertical-align: middle; */
}
.user-bind {
    margin-right: 0.3rem;
}
/* .user-bind span{
        vertical-align: middle;
    } */
/* 商品信息 */
.goods-details-info {
    margin-bottom: 0.2rem;
    background: #ffffff;
}

/* 视频看号 */
.vedio-info {
    background: #ffffff;
    font-size: 0.26rem;
}
.vedio-title {
    padding: 0.2rem 0 0.15rem;
    font-size: 0.24rem;
}
.vedio-title-top span {
    display: inline-block;
    font-size: 0.26rem;
    color: #333333;
}
.vertical {
    width: 0.05rem;
    background: #333333;
    height: 0.2rem;
    margin-right: 0.1rem;
}
.red-color {
    color: #ff7171;
}
.vedio-content {
    height: 3.6rem;
    text-align: center;
    line-height: 3.6rem;
    font-size: 0.4rem;
}
/* 安全服务 */
.vidio-bottom {
    display: flex;
    justify-content: flex-start;
}
.vidio-bottom div {
    width: 50%;
    text-align: center;
    line-height: 0.8rem;
}
.red-border {
    color: #ff7e4a;
    border-bottom: 0.04rem solid #ff7e4a;
}
.black-border {
    color: #333333;
}

.showBox-left {
    margin-top: 0.3rem;
    text-align: center;
    padding-bottom: 0.2rem;
}
.showBox-left .detail-user-opera {
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    height: 1.3rem;
    padding-top: 0.1rem;
    margin-bottom: 0.3rem;
}
.detail-user-opera .cell {
    color: #666666;
    font-size: 0.26rem;
    text-align: center;
    margin: auto 0;
}
/*  user-safety user-Authentication user-settlement */
.user-contact img {
    width: 0.49rem;
    height: 0.51rem;
}
.user-safety img {
    width: 0.48rem;
    height: 0.55rem;
}
.user-Authentication img {
    width: 0.54rem;
    height: 0.52rem;
}
.user-settlement img {
    width: 0.5rem;
    height: 0.48rem;
}
.go-verify {
    width: 6.6rem;
    line-height: 0.8rem;
    color: #666666;
    font-size: 0.28rem;
    border: 1px solid #aaaaaa;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    margin: 0 auto 0.2rem;
}
.more-info {
    color: #999999;
    font-size: 0.24rem;
    text-decoration: underline;
    text-align: center;
}

.showBox-right {
    padding: 0 0 0.2rem 0.2rem;
}

.flow-left img {
    width: 0.3rem;
    height: 5.46rem;
}
.flow-left,
.flow-right {
    display: inline-block;
    vertical-align: top;
}
.flow-left {
    width: 0.3rem;
    height: 5.46rem;
    margin-right: 0.18rem;
}
.flow-right {
    height: 5.46rem;
    font-size: 0.26rem;
    color: #999999;
}
.flow-title {
    color: #333333;
    margin-bottom: 0.02rem;
    line-height: 0.44rem;
}
.flow-content {
    margin-bottom: 0.05rem;
    line-height: 0.43rem;
}
/* 猜你喜欢 */
.guess {
    text-align: center;
    line-height: 0.7rem;
}
.guess img {
    width: 0.55rem;
    height: 0.03rem;
    vertical-align: middle;
}
.guess span {
    display: inline-block;
    margin: 0 0.1rem;
    color: #999999;
    font-size: 0.24rem;
    vertical-align: middle;
}

.goods-details-bottom {
    margin-top: 0.2rem;
    background: #ffffff;
    display: flex;
    justify-content: flex-start;
    -webkit-box-shadow: 0 -2px 8px #d6d6d6;
    -moz-box-shadow: 0 -2px 8px #d6d6d6;
    box-shadow: 0 -2px 8px #d6d6d6;
}
.goods-details-bottom-left,
.goods-details-bottom-right {
    /* display: inline-block; */
    text-align: center;
}
.goods-details-bottom-left {
    color: #999999;
    width: 1.3rem;
    font-size: 0.24rem;
    padding-top: 0.1rem;
    border-right: 1px solid #dcdcdc;
}
.goods-details-bottom-right {
    width: 2.5rem;
    font-size: 0.3rem;
    line-height: 1rem;
    color: #ffffff;
}
.share img {
    width: 0.43rem;
    height: 0.34rem;
}
.collect img {
    width: 0.4rem;
    height: 0.37rem;
}

.bargain {
    background: -webkit-linear-gradient(#ffcc4b, #feab49);
    background: -o-linear-gradient(#ffcc4b, #feab49);
    background: -moz-linear-gradient(#ffcc4b, #feab49);
    background: linear-gradient(to right, #ffcc4b, #feab49);
}
.buy {
    background: #ff5e5e;
}

.goods-strip {
    background: #ffffff;
    padding: 0.3rem 0.2rem;
    margin-bottom: 0.2rem;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
}
/* 精品 */
.boutique {
    text-align: center;
    background: #fe7649;
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
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
    /* width:.7rem; */
    padding: 0 0.1rem;
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
.goods-price {
    font-size: 0.34rem;
    color: #fa5856;
}
.goods-price span {
    font-size: 0.36rem;
}

.hoodle {
    width: 5rem;
    position: fixed;
    top: 35%;
    left: calc(50% - 2.5rem);
    z-index: 9;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
}
.hoodle img {
    width: 5rem;
    height: 1.64rem;
}
.hoodle-con {
    text-align: center;
    margin-top: 0.4rem;
}
.shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 6;
}
.hoodle-btn {
    display: flex;
    justify-content: space-around;
    margin: 0.4rem 0;
}
.hoodle-btn div {
    width: 1.89rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.26rem;
    color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
}
.okBtn {
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}
.cancelBtn {
    background: #c6c6c6;
}
/* ==========input========= */

input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    /* border: none; */
    width: 4.6rem;
    height: 0.7rem;
    vertical-align: middle;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
</style>



