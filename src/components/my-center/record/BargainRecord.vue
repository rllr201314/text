<template>
    <!-- 议价记录 -->
    <div class="bargain-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="bargin-tit">
            <div class="tit-box" @click="barginTypeFn('reply')">
                <img :src="seleType.reply?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>待回复</span>
            </div>
            <div class="tit-box" @click="barginTypeFn('pay')">
                <img :src="seleType.pay?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>待支付</span>
            </div>
        </div>
        <div class="bragin-con" v-for="val in goodsInfo">
            <div class="con-tit" v-text="val.day">今天</div>
            <div class="goods-strip" v-for="(item,index) in val.data">
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
                        <span v-if="item.isSell == 1" class="p-bBtn">前往支付</span>
                        <span v-if="item.isSell == 3" class="p-bBtn" @click="bargainFn">发起议价</span>
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
        <div class="hoodle" v-show="showShade">
            <img src="../../../../static/img/my-center/record/bargain_tit.png" alt="">
            <div class="hoodle-con">
                <input type="number" placeholder="请输入您的出价">
            </div>
            <div class="hoodle-btn">
                <div class="okBtn" @click="goBargain">确认</div>
                <div class="cancelBtn" @click="goBargain">取消</div>
            </div>
        </div>
        <div class="shade" v-show="showShade"></div>
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
            showShade: false,
            seleType: {
                reply: true,
                pay: false
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
                            safe: true,
                            stages: true,
                            verify: true,
                            goods_price: "￥600",
                            isSell: 1,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00"
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
                            isSell: 3,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00"
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
                            safe: true,
                            stages: false,
                            verify: true,
                            goods_price: "￥600",
                            isSell: 2,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00"
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
                            isSell: 3,
                            bid: "￥6000",
                            bindtwo: "￥6000",
                            time: "2018-09-09 9:00"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        bargainFn(e) {
            this.showShade = true;
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);//禁止页面滑动
        },
        goBargain(e){
            this.showShade = false;
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='';//出现滚动条
            document.removeEventListener("touchmove",mo,false);
        },
        barginTypeFn(flag){
            var that =this;
            if(flag == 'pay'){
                that.seleType.reply = false;
                that.seleType.pay = true;
            }else{
                that.seleType.reply = true;
                that.seleType.pay = false;
            }
        },
        getdiscuss(){
            var that = this;
            that.$axios.post('api/goods_discuss',{
                is_agree:1,
            }).then(function(res){
                console.log(res)
            }).catch(function(err){
                console.log(err)
            })
        },
    },
    mounted(){
        this.getdiscuss()
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
    position: relative;
}
.goods-strip-bottom span {
    display: inline-block;
    vertical-align: middle;
}
.p-bBtn {
    padding:0 5px;
    text-align:center;
    line-height: 0.44rem;
    font-size: 0.22rem;
    text-align: center;
    color: #ffffff;
    background: #fe7649;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0 0.5px .4px #fe7649;
    -moz-box-shadow: 0 0.5px .4px #fe7649;
    box-shadow: 0 0.5px .4px #fe7649;
    position: absolute;
    left: calc(50% - 0.55rem);
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

.sell-cell-strip {
    display: flex;
    line-height: 0.6rem;
    justify-content: space-around;
    align-items: center;
}
.strip-left {
    font-size: 0.26rem;
    color: #666666;
}
.bid {
    color: #333333;
    margin-left: 0.4rem;
}
.strip-con {
    min-width: 0.84rem;
    padding:2px;
    line-height: 0.27rem;
    font-size: 0.2rem;
    color: #ffffff;
    text-align: center;
}
.green-bg {
    background: #45c773;
}
.red-bg {
    background: #ff5e5e;
}
.gray-bg {
    background: #c6c6c6;
}
.time {
    color: #999999;
    font-size: 0.24rem;
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
