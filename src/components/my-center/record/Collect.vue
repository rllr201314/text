<template>
    <!-- 议价记录 -->
    <div class="bargain-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="bargain-tit" v-if="!showNoData">
            <div class="tit-box" @click="delData">
                <img src="../../../../static/img/delete_ico.png" alt="">
                <span>全部清空</span>
            </div>
        </div>
        <div class="bragin-con">
            <div class="goods-strip" v-for="item in goodsInfo">
                <div class="goods-strip-title">
                    <div class="goods-type" v-if="item.deal_type_id == 1">成品号</div>
                    <div class="goods-type" v-else>代练号</div>
                    <div class="account-type" v-if="item.client_id == 1">安卓</div>
                    <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                    <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                    <div class="area" v-text="item.platform_name"></div>
                </div>
                <div class="goods-strip-content">
                    <div class="goods-des" v-text="item.goods_title"></div>
                    <div class="goods-ico">
                        <img v-if="item.is_safe == 1" src="../../../../static/img/goodscreen/safe_ico.png" alt="">
                        <img v-if="item.is_stage == 1" src="../../../../static/img/goodscreen/stages_ico.png" alt="">
                        <img v-if="item.is_compact == 1" src="../../../../static/img/goodscreen/verify.png" alt="">
                    </div>
                </div>
                <div class="goods-strip-bottom">
                    <span class="goods-price">￥<span v-text="item.goods_price"></span></span>
                    <div class="bargain" v-if="item.sell_type == 2">可议价</div>
                    <div class="goods-collect">
                        <img class="collect" src="../../../../static/img/goods-details/ok_collect_ico.png" alt="">
                        <span>已收藏</span>
                    </div>
                </div>
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    inject:['reload'],
    name: "BargainRecord",
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
                    title: "我的收藏"
                }
            },
            showNoData:false,
            seleType: {
                reply: true,
                pay: false
            },
            accountData: {},
            // 商品列表
            goodsInfo: []
        };
    },
    methods:{
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"collection").then((res) => {
                console.log(res)
                if(res.status == 200){
                    if(res.data.code == 200){
                        if(res.data.data.data != ""){
                            that.goodsInfo = res.data.data.data;
                        }else{
                            that.showNoData = true;
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        delData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"clear_collection").then((res) => {
                console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.reload();
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted(){
        var that = this;
        that.getData();
    }
};
</script>
<style scoped>
.bargain-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top:.88rem;
}
.bargain-tit {
    line-height: 0.7rem;
    background: #f6f8fe;
    text-align:right;
    font-size:0;
}
.tit-box {
    font-size: 0.24rem;
    color: #666666;
    display: inline-block;
    margin-right: .2rem;
}
.tit-box img {
    width: 0.26rem;
    height: 0.26rem;
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
.goods-strip-title div{
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
.goods-strip-bottom{
    position:relative;
}
.goods-strip-bottom div {
    display: inline-block;
}
.goods-price {
    color: #fa5856;
    font-size: 0.34rem;
}
.goods-price span{
    font-size:.36rem;
}
.bargain {
    padding: 1px 3px;
    margin-left: 0.1rem;
    line-height: 0.35rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999999;
    border: 1px solid #b5b5b5;
    border-top-left-radius: 0.18rem;
    border-top-right-radius: 0.18rem;
    border-bottom-left-radius: 0.18rem;
    border-bottom-right-radius: 0.18rem;
    vertical-align: middle;
}
.goods-collect {
    font-size: 0.24rem;
    color: #999999;
    position:absolute;
    right:0;
}
.goods-collect img {
    width: 0.25rem;
    height: 0.23rem;
}
</style>
