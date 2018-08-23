<template>
    <!-- 浏览记录 -->
    <div class="browse-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="browse-con">
            <div class="sele">
                <span>清除失效</span>
                <span>清除所有记录</span>
            </div>
            <div class="vertical"></div>
            <div class="browse-info">
                <div class="browse-cell" v-for="item in goodsInfo">
                    <div class="browse-cell-tit">
                        <span class="circle"></span>
                        <span v-text="item.day"></span>
                    </div>
                    <div class="browse-cell-con" v-for="ind in item.data">
                        <div class="browse-cell-con-top">
                            <div class="goods-strip-title">
                                <div class="goods-type" v-text="ind.goods_type"></div>
                                <div class="account-type" v-text="ind.account_type"></div>
                                <div class="area" v-text="ind.area"></div>
                            </div>
                            <div class="goods-strip-content">
                                <div class="goods-des" v-text="ind.goods_des"></div>
                            </div>
                            <div class="goods-strip-bottom">
                                <span class="goods-price" v-text="ind.goods_price"></span>
                            </div>
                        </div>
                        <div class="browse-cell-con-bot">
                            <div class="con-bot-box">
                                <img class="see" src="../../../../static/img/my-center/record/see.png" alt="">
                                <span v-text="ind.see"></span>
                            </div>
                            <div class="con-bot-box">
                                <img class="collect" src="../../../../static/img/my-center/record/collect.png" alt="">
                                <span v-text="ind.collect"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hint">
            <img src="../../../../static/img/goods-details/left_solid.png" alt="">
            <span>没有更多记录啦</span><img src="../../../../static/img/goods-details/right_solid.png" alt="">
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "BrowseRecord",
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
                    title: "浏览记录"
                }
            },
            goodsInfo: [
                {
                    day: "今天",
                    data: [
                        {
                            goods_type: "成品号",
                            account_type: "安卓",
                            area: "安卓一区",
                            goods_des: "贵6小号可议价，手快有手慢无",
                            goods_price: "￥600",
                            isSell: 1,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00",
                            see: "101",
                            collect: "202"
                        },
                        {
                            goods_type: "成品号",
                            account_type: "安卓",
                            area: "安卓一区",
                            goods_des: "贵6小号可议价，手快有手慢无",
                            goods_price: "￥600",
                            isSell: 1,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00",
                            see: "101",
                            collect: "202"
                        }
                    ]
                },
                {
                    day: "三天前",
                    data: [
                        {
                            goods_type: "成品号",
                            account_type: "安卓",
                            area: "安卓一区",
                            goods_des: "贵6小号可议价，手快有手慢无",
                            goods_price: "￥600",
                            isSell: 1,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00",
                            see: "101",
                            collect: "202"
                        },
                        {
                            goods_type: "成品号",
                            account_type: "安卓",
                            area: "安卓一区",
                            goods_des: "贵6小号可议价，手快有手慢无",
                            goods_price: "￥600",
                            isSell: 1,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00",
                            see: "101",
                            collect: "202"
                        }
                    ]
                }
            ]
        };
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
    right: 0.2rem;
    top: 0.2rem;
}
.sele span:nth-last-child(1) {
    margin-left: 0.6rem;
}
.vertical {
    width: 1px;
    position: absolute;
    left: 0.2rem;
    top: 0.3rem;
    bottom: 0;
    background: #dcdcdc;
}
.browse-info {
    padding-left: 0.24rem;
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
    padding: 0.2rem;
    border-bottom: 1px solid #e5e5e5;
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
</style>
