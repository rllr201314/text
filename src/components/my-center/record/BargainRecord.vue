<template>
    <!-- 议价记录 -->
    <div class="bargain-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="bargin-tit">
            <div class="tit-box">
                <img :src="seleType.reply?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>待回复</span>
            </div>
            <div class="tit-box">
                <img :src="seleType.pay?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>待支付</span>
            </div>
        </div>
        <div class="bragin-con">
            <div class="con-tit">今天</div>
            <div class="goods-strip" v-for="(item,index) in goodsInfo">
                <img v-if="item.isSell == 1" class="deal-status" src="../../../../static/img/my-center/clinch.png" alt="">
                <img v-if="item.isSell == 2" class="deal-status" src="../../../../static/img/my-center/sale.png" alt="">
                <div class="goods-top">
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
                        <span>原价</span>
                        <span class="goods-price" v-text="item.goods_price"></span>
                    </div>
                </div>
                <div class="goods-bot">
                    <div class="sell-cell-top">
                        <img src="../../../../static/img/goodscreen/vertical.png" alt="">
                        <span>议价记录</span>
                    </div>
                    <div class="sell-cell-content">
                        <div class="sell-cell-strip">
                            <div class="strip-left">
                                <span>出价</span>
                                <span class="bid" v-text="item.bid"></span>
                            </div>
                            <div class="strip-con green-bg">同意交易</div>
                            <div class="time" v-text="item.time"></div>
                        </div>
                        <div class="sell-cell-strip">
                            <div class="strip-left">
                                <span>出价</span>
                                <span class="bid" v-text="item.bid"></span>
                            </div>
                            <div class="strip-con red-bg">拒绝</div>
                            <div class="time" v-text="item.time"></div>
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
                    bid:'￥6000',
                    bindtwo:'￥6000',
                    time:'2018-09-09 9:00'
                },
                {
                    goods_type: "成品号",
                    account_type: "安卓",
                    area: "安卓一区",
                    goods_des: "贵6小号可议价，手快有手慢无",
                    safe: true,
                    stages: false,
                    verify: true,
                    goods_price: "￥600",
                    isSell: 2,
                    bid:'￥6000',
                    bindtwo:'￥6000',
                    time:'2018-09-09 9:00'
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
    padding: 0.3rem 0.2rem;
    margin-bottom: 0.2rem;
    position: relative;
}
.deal-status {
    width: 0.89rem;
    height: 0.89rem;
    position: absolute;
    top: 0;
    right: 0;
}
.goods-top {
    border-bottom: 0.01rem solid #e5e5e5;
    padding-bottom: 0.2rem;
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
.goods-strip-bottom {
    font-size: 0.26rem;
    color: #666666;
}
.goods-price {
    color: #333333;
}

.sell-cell-top {
    line-height: 0.7rem;
}
.sell-cell-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.sell-cell-top img {
    width: 0.13rem;
    height: 0.29rem;
    vertical-align: middle;
}

.sell-cell-strip{
    display:flex;
    line-height: .6rem;
    justify-content: space-around;
    align-items:center;
}
.strip-left{
    font-size:.26rem;
    color:#666666;
}
.bid{
    color:#333333;
    margin-left:.4rem;
}
.strip-con {
    min-width:.84rem;
    line-height: .27rem;
    height: .27rem;
    font-size:.2rem;
    color:#ffffff;
    text-align: center;
}
.green-bg{
    background:#45C773;
}
.red-bg{
    background:#FF5E5E;
}
.gray-bg{
    background:#C6C6C6;
}
.time{
    color:#999999;
    font-size:.24rem;
}
</style>
