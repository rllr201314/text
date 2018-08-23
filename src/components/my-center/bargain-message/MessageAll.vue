<template>
    <div class="messageAll-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="search-wrap">
            <div class="search-left">
                <div class="sele-type">
                    <span>游戏类型</span>
                    <img src="../../../../static/img/goodscreen/downsolid.png" alt="">
                </div>
                <div class="sele-type">
                    <span>未成交</span>
                    <img src="../../../../static/img/goodscreen/downsolid.png" alt="">
                </div>
                <div>
                    <input type="text" placeholder="请输入游戏名称">
                </div>
            </div>
            <div class="search">搜索</div>
        </div>

        <div class="goods-strip" v-for="(item,index) in goodsInfo">
            <div class="goods-strip-title">
                <div class="goods-type" v-text="item.goods_type"></div>
                <div class="account-type" v-text="item.account_type"></div>
                <div class="area" v-text="item.area"></div>
            </div>
            <div class="goods-strip-content">
                <div class="goods-des" v-text="item.goods_des"></div>
                <div class="goods-ico" >
                    <img v-if="item.safe" src="../../../../static/img/goodscreen/safe_ico.png" alt="">
                    <img v-if="item.stage" src="../../../../static/img/goodscreen/stages_ico.png" alt="">
                    <img v-if="item.verify" src="../../../../static/img/goodscreen/verify.png" alt="">
                </div>
            </div>
            <div class="goods-strip-bottom">
                <div class="goods-price red-color" v-text="item.goods_price"></div>
                <div class="tran-price"  v-if="item.tran_price">
                    <span>成交价</span>
                    <span class="red-color" v-text="item.tran_price"></span>
                </div>
                <div class="hint">
                    <div class="bargain" v-if="!item.tran_price">
                        <span>收到的议价：</span><span v-text="item.bargainNum"></span>
                    </div>
                    <div class="sale" v-if="item.tran_price">已卖出</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "MessageAll",
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
                    title: "收到的议价消息"
                }
            },
            // 商品列表

            goodsInfo: [
                {
                    goods_type: "成品号",
                    account_type: "安卓",
                    area: "安卓一区",
                    goods_des: "贵6小号可议价，手快有手慢无",
                    safe:true,
                    stage:true,
                    verify:false,
                    goods_price: "￥600",
                    tran_price:'$8888',
                },
                {
                    goods_type: "成品号",
                    account_type: "安卓",
                    area: "安卓一区",
                    goods_des: "贵6小号可议价，手快有手慢无",
                    safe:true,
                    stage:true,
                    verify:true,
                    goods_price: "￥600",
                    bargainNum:'7',
                }
            ]
        };
    }
};
</script>
<style scoped>
.messageAll-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.search-wrap {
    background: #ffffff;
    padding: 0.3rem 0 0.3rem 0.2rem;
    font-size: 0.24rem;
    color: #333333;
    margin-bottom: 0.2rem;
}
.search-left {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
}
.search-left .sele-type:nth-child(1) {
    margin-right: 0.8rem;
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
    vertical-align: middle;
}



/* 单条商品 */
    .goods-strip{
        background:#FFFFFF;
        padding:.3rem .2rem;
        margin-bottom:.2rem;
    }
    /* 头部------ */
    .goods-strip-title{
        color:#FFFFFF;
        font-size:.24rem;
        line-height:.36rem;
        margin-bottom:.2rem;
    }

    .goods-type{
        text-align:center;
        width:.93rem;
        height: .36rem;
        background:-webkit-linear-gradient(#FEAB49,#FFCC4B);
        background:-o-linear-gradient(#FEAB49,#FFCC4B);
        background:-moz-linear-gradient(#FEAB49,#FFCC4B);
        background:linear-gradient(to right, #FEAB49 , #FFCC4B);
        display:inline-block;
        margin-right:.1rem;
    }
    .account-type{
        text-align:center;
        width:.7rem;
        height:.36rem;
        background:-webkit-linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        background:-o-linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        background:-moz-linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        background:linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        display:inline-block;
        margin-right:.1rem;
    }
    .area{
        font-size:.26rem;
        color:#999999;
        display:inline-block;
    }
    /* 详情 -- 保障*/
    .goods-strip-content{
        margin-bottom:.15rem;
    }
    .goods-des{
        width:5rem;
        overflow:hidden; /*超出的部分隐藏起来。*/ 
        white-space:nowrap;/*不显示的地方用省略号...代替*/
        text-overflow:ellipsis;/* 支持 IE */
        display:inline-block;
        font-size:.3rem;
        line-height:.31rem;
        color:#333333;
    }
    .goods-ico{
        float:right;
        text-align: right;
    }
    .goods-ico img{
        width:.36rem;
        height: .36rem;
        margin-left:.12rem;
    }
    /* 底部 价格 */
    .goods-strip-bottom{
        position: relative;
    }
    .goods-strip-bottom div{
        display:inline-block;
    }
    .goods-price{
        font-size:.36rem;
        margin-right:.3rem;
    }
    .red-color{
        color:#FA5856;
    }
    .tran-price{
        font-size:.26rem;
        color:#666666;
    }
    .tran-price span{
        margin-left:.1rem;
    }

.hint{
    display: inline-block;
    font-size:.2rem;
    color:#FFFFFF;
    line-height:.27rem;
    position:absolute;
    top:.1rem;right: 0;
}
.bargain{
    background:#FA5856;
    padding:.01rem .05rem;
}
.sale{
    padding:.01rem .05rem;
    background:#C6C6C6;
}
/* ==========input========= */
input {
    margin: 0.2rem 0 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    /* border: none; */
    width: 100%;
    height: 0.5rem;
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
</style>
