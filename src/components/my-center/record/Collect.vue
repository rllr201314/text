<template>
    <!-- 议价记录 -->
    <div class="bargain-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>

        <div class="bragin-con">
            <div class="goods-strip" v-for="(item,index) in goodsInfo">
                <div class="goods-strip-title">
                    <div class="goods-type" v-text="item.goods_type"></div>
                    <div class="account-type" v-text="item.account_type"></div>
                    <div class="area" v-text="item.area"></div>
                </div>
                <div class="goods-strip-content">
                    <div class="goods-des" v-text="item.goods_des"></div>
                    <div class="goods-ico">
                        <img v-if="item.safe" src="../../../../static/img/goodscreen/safe_ico.png" alt="">
                        <img v-if="item.stages" src="../../../../static/img/goodscreen/stages_ico.png" alt="">
                        <img v-if="item.verify" src="../../../../static/img/goodscreen/verify.png" alt="">
                    </div>
                </div>
                <div class="goods-strip-bottom">
                    <span class="goods-price" v-text="item.goods_price"></span>
                    <div class="bargain" v-if="item.isBargain">可议价</div>
                    <div class="goods-collect">
                        <img class="collect" src="../../../../static/img/goods-details/ok_collect_ico.png" alt="">
                        <span>已收藏</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "BargainRecord",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "议价记录"
                }
            },
            seleType: {
                reply: true,
                pay: false
            },
            accountData: {},
            // 商品列表
            goodsInfo: [
                {
                    goods_type: "成品号",
                    account_type: "安卓",
                    area: "安卓一区",
                    goods_des: "贵6小号可议价，手快有手慢无",
                    safe: true,
                    stages: true,
                    verify: true,
                    goods_price: "￥600",
                    isSell: 1,
                    bid: "￥6000",
                    bindtwo: "￥6000",
                    time: "2018-09-09 9:00",
                    isBargain: true
                },
                {
                    goods_type: "成品号",
                    account_type: "安卓",
                    area: "安卓一区",
                    goods_des:
                        "贵6小号可议价，手快有手慢无手快有手慢无手快有手慢无",
                    safe: true,
                    stages: false,
                    verify: true,
                    goods_price: "￥600",
                    isSell: 2,
                    bid: "￥6000",
                    bindtwo: "￥6000",
                    time: "2018-09-09 9:00",
                    isBargain: false
                }
            ]
        };
    }
};
</script>
<style scoped>
.bargain-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.bargin-tit {
    line-height: 0.8rem;
    background: #ffffff;
    padding-left: 0.2rem;
}
.tit-box {
    font-size: 0.24rem;
    color: #666666;
    display: inline-block;
    margin-right: 1rem;
}
.tit-box img {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.1rem;
    vertical-align: middle;
}
.tit-box span {
    vertical-align: middle;
}
.bragin-con .goods-strip:nth-last-child(1) {
    margin-bottom: 0;
}
.con-tit {
    line-height: 0.7rem;
    color: #999999;
    font-size: 0.24rem;
    padding-left: 0.2rem;
}

/* 单条商品 */
.goods-strip {
    background: #ffffff;
    padding: 0.3rem 0.2rem 0.1rem;
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
.goods-ico {
    float: right;
    text-align: right;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
/* 底部 价格 */
.goods-strip-bottom div {
    display: inline-block;
}
.goods-price {
    color: #fa5856;
    font-size: 0.36rem;
}
.bargain {
    width: 0.8rem;
    margin-left: 0.1rem;
    line-height: 0.35rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999999;
    border: 0.01rem solid #b5b5b5;
    border-top-left-radius: 0.18rem;
    border-top-right-radius: 0.18rem;
    border-bottom-left-radius: 0.18rem;
    border-bottom-right-radius: 0.18rem;
    vertical-align: middle;
}
.goods-collect {
    font-size: 0.24rem;
    color: #999999;
    float: right;
}
.goods-collect img {
    width: 0.25rem;
    height: 0.23rem;
}
</style>
