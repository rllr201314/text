<template>
    <!-- 我的商品 -->
    <div class="mygoods-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="seleTit">
            <div :class="seleTit == 1?'red-border':''" @click="seleTitFn(1)">已上架</div>
            <div :class="seleTit == 2?'red-border':''" @click="seleTitFn(2)">审核中</div>
            <div :class="seleTit == 3?'red-border':''" @click="seleTitFn(3)">已下架</div>
        </div>
        <div class="mygoods-con">
            <div class="arbitration-cell" v-for="item in putawayData" v-show="seleTit == 1">
                <div class="gameLog">
                    <img :src="item.log" alt="">
                </div>
                <div class="orderInfo">
                    <div class="order-num">
                        <span>订单号</span>
                        <span v-text="item.orderNum"></span>
                        <span class="history-time" v-text="item.time"></span>
                    </div>
                    <div class="order-des" v-text="item.des"></div>
                    <div class="price-status">
                        <span class="good-price" v-text="item.price"></span>
                        <span class="order-status green-bg" v-text="item.orderStatus"></span>
                    </div>
                </div>
                <div class="order-operate">
                    <div class="right-operate">
                        <span class="cancel">编辑</span>`
                        <span class="pay">下架</span>
                    </div>
                </div>
            </div>
            <div class="arbitration-cell" v-for="item in auditData" v-show="seleTit == 2">
                <div class="gameLog">
                    <img :src="item.log" alt="">
                </div>
                <div class="orderInfo">
                    <div class="order-num">
                        <span>订单号</span>
                        <span v-text="item.orderNum"></span>
                        <span class="history-time" v-text="item.time"></span>
                    </div>
                    <div class="order-des" v-text="item.des"></div>
                    <div class="price-status">
                        <span class="good-price" v-text="item.price"></span>
                        <span class="order-status red-bg" v-text="item.orderStatus"></span>
                    </div>
                </div>
                <div class="order-operate">
                    <div class="right-operate">
                        <span class="pay">取消上架</span>
                    </div>
                </div>
            </div>
            <div class="arbitration-cell" v-for="item in removeData"  v-show="seleTit == 3">
                <div class="gameLog">
                    <img :src="item.log" alt="">
                </div>
                <div class="orderInfo">
                     <div class="order-num">
                         <span>订单号</span><span v-text="item.orderNum"></span><span class="history-time" v-text="item.history_time"></span>
                     </div>
                     <div class="order-des" v-text="item.des"></div>
                     <div class="price-status">
                         <span class="good-price" v-text="item.price"></span>
                         <span class="order-status gray-bg" v-text="item.orderStatus"></span>
                     </div>
                     <div class="arbitration">
                         <span class="gray">原因</span>
                         <span v-text="item.arbitrationInfo"></span>
                     </div>
                </div>
                <div class="order-operate">
                   
                    <div class="right-operate">
                        <span class="cancel">删除</span>
                        <span class="pay" @click="go">编辑</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "MyGoods",
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
                    title: "我的商品"
                }
            },
            seleTit: 1,
            putawayData: [
                {
                    log: "./static/img/mh_ico.png",
                    orderNum: "123456789",
                    history_time: "10分钟前",
                    des: "梦幻西游xxxxxxxxxxxxxxxxxxxxx...",
                    price: "￥13200",
                    orderStatus: "上架中"
                },
                {
                    log: "./static/img/mh_ico.png",
                    orderNum: "123456789",
                    history_time: "10分钟前",
                    des: "梦幻西游xxxxxxxxxxxxxxxxxxxxx...",
                    price: "￥13200",
                    orderStatus: "上架中"
                },
                {
                    log: "./static/img/mh_ico.png",
                    orderNum: "123456789",
                    history_time: "10分钟前",
                    des: "梦幻西游xxxxxxxxxxxxxxxxxxxxx...",
                    price: "￥13200",
                    orderStatus: "上架中"
                }
            ],
            auditData: [
                {
                    log: "./static/img/mh_ico.png",
                    orderNum: "123456789",
                    history_time: "10分钟前",
                    des: "梦幻西游xxxxxxxxxxxxxxxxxxxxx...",
                    price: "￥13200",
                    orderStatus: "审核中"
                },
                {
                    log: "./static/img/mh_ico.png",
                    orderNum: "123456789",
                    history_time: "10分钟前",
                    des: "梦幻西游xxxxxxxxxxxxxxxxxxxxx...",
                    price: "￥13200",
                    orderStatus: "审核中"
                },
                {
                    log: "./static/img/mh_ico.png",
                    orderNum: "123456789",
                    history_time: "10分钟前",
                    des: "梦幻西游xxxxxxxxxxxxxxxxxxxxx...",
                    price: "￥13200",
                    orderStatus: "审核中"
                }
            ],
            removeData:[
                {
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    arbitrationInfo:'账号有问题，需要退款',
                    orderStatus:'已下架',
                },{
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    arbitrationInfo:'账号有问题，需要退款',
                    orderStatus:'已下架',
                },{
                    log:'./static/img/mh_ico.png',
                    orderNum:'123456789',
                    history_time:'10分钟前',
                    des:'梦幻西游xxxxxxxxxxxxxxxxxxxxx...',
                    price:'￥13200',
                    arbitrationInfo:'账号有问题，需要退款',
                    orderStatus:'已下架',
                }
            ]
        };
    },
    methods: {
        seleTitFn(opt) {
            this.seleTit = opt;
        },
        go(){
            this.$router.push({'name':'AccountLogin','params':{id:1}})
            var router = this.$router;
            console.log(router);
        }
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
}
.seleTit div {
    width: 100%;
}
.red-border {
    border-bottom: 0.04rem solid #ff7e4a;
    color: #ff7e4a;
}
.mygoods-con {
    padding: 0.2rem;
}

.arbitration-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
}
.gameLog {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.2rem;
}
.gameLog img {
    width: 0.8rem;
    height: 0.8rem;
}
.orderInfo {
    display: inline-block;
    vertical-align: middle;
    width: 5.3rem;
    padding: 0.3rem 0;
}
.orderInfo span {
    display: inline-block;
}
.order-num {
    color: #666666;
    font-size: 0.26rem;
    line-height: 0.4rem;
}
.history-time {
    float: right;
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
    padding: 0.01rem 0.05rem;
    color: #ffffff;
    line-height: 0.3rem;
    text-align: center;
    vertical-align: middle;
}
.red-bg{
    background:#FF5E5E;
}
.green-bg{
    background: #45c773;
}
.gray-bg{
    background:#C6C6C6;
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
.arbitration{
    line-height: .4rem; 
        font-size:.26rem;
        color:#333333;
    }
.gray {
    color: #999999;
}
</style>
