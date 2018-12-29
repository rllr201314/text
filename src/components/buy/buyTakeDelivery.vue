<template>
    <!-- 收货 -->
    <div class="take-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="take-content">
             <!-- 商品详情 -->
            <div class="take-cell">
                <img class="badge" src="../../../static/img/badge/product.png" alt="">
                <div class="goods-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>订单详情</span>
                </div>
                <div class="goods-info-content">
                    <img :src="goodsInfo.game_logo" alt="">
                    <div class="goods-info">
                        <div class="goods-info-title" v-text="goodsInfo.goods_title"></div>
                        <div class="goods-info-box">
                            <div class="goods-info-strip">
                                <div class="text-left">系统</div>
                                <div class="text-right"   v-if="goodsInfo.client_id == 1">安卓</div>
                                <div class="text-right"  v-else-if="goodsInfo.client_id == 2">苹果</div>
                                <div class="text-right"  v-else-if="goodsInfo.client_id == 3">安卓混服</div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">客户端</div>
                                <div class="text-right"  v-text="goodsInfo.platform_name"></div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">所在区服</div>
                                <div class="text-right" v-if="goodsInfo.server_name != null" v-text=" goodsInfo.area_name+'>'+goodsInfo.server_name"></div>
                                <div class="text-right" v-else v-text="goodsInfo.area_name"></div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">等级</div>
                                <div class="text-right"><span v-text="goodsInfo.role_level"></span>级</div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">门派</div>
                                <div class="text-right" v-text="goodsInfo.faction_name"></div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">商品类型</div>
                                <div class="text-right" v-if="goodsInfo.deal_type == 1">成品号</div>
                                <div class="text-right" v-else>代练号</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 订单号，分期情况，实际支付 -->
            <div class="take-cell">
                <div class="goodsInfo">
                    <div class="goodsInfo-left">订单号</div>
                    <div class="goodsInfo-right">
                        <span v-text="goodsInfo.order_sn"></span>
                        <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="goodsInfo.order_sn" @click="copyFn()" id="copy">
                    </div>
                </div>
                <div class="goodsInfo" v-if="goodsInfo.is_stage == 1">
                    <div class="goodsInfo-left">分期情况</div>
                    <div class="goodsInfo-right" v-text="goodsInfo.stage_info"></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">实际支付</div>
                    <div class="goodsInfo-right">
                        <span class="red-color" v-text="goodsInfo.order_amount"></span>
                        <span class="green-color">已支付</span>
                    </div>
                </div>
            </div>
            <!-- 状态 -->
            <div class="take-status-img-cell">
                <img v-for="item in takeData.takeTypeImg" v-show="item.key == takeType" :src="item.imgsrc" alt="">
            </div>
            <!-- 收货状态 -->
            <div class="take-cell">
                <div class="take-status-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>收货状态</span>
                    <span class="red-color" v-if="takeType == -1">（如果您已检验账号没有问题，请确认交易）</span>
                    <span class="gray-border" v-if="goodsInfo.is_end == 1">已收货</span>
                    <span class="award" @click="goArbitration" v-if=" goodsInfo.is_arbitrate == 1">申请仲裁</span>
                    <span class="award" @click="cancelArb" v-if=" goodsInfo.is_arbitrate == 2">取消仲裁</span>
                </div>
                <div class="take-cell-content">
                    <!-- 验货跳过 -->
                    <div class="cargo" v-if="takeType == -2" @click="verifyFn">申请验号</div>
                    <div class="cargo" v-if="takeType == -1" @click="agree">确认交易</div>
                    <div class="intie" v-if="takeType == 1||　takeType == 2">
                        <img src="../../../static/img/order/speed.png" alt="">
                        <span>客服正在为您火速换绑中，请您耐心等待</span>
                    </div>
                    <div class="confirm-receipt" v-if="takeType == 3 ||takeType == 5">
                        <div class="confirm-title" v-if="false">
                            <span>游戏截图（{{gamePrint}}）</span>
                            <span class="red-color">点击查看</span>
                        </div>
                        <div>换绑一般会在24小时后生效，请验收账号没有问题后，确认收货！</div>
                        <div class="account">
                            <div class="accountText">
                                <span>游戏账号:</span>
                                <input v-model="goodsInfo.account" disabled="disabled">
                            </div>
                            <div class="accountText">
                                <span>密码:</span>
                                <input :type="passType?'type':'password'" v-model="goodsInfo.password" disabled="disabled">
                                <img :src="passType?'../../../static/img/order/noSee.png':'../../../static/img/order/see.png'" alt="" @click="seePasswordFn">
                            </div>
                        </div>
                        <div class="cargo" v-if="goodsInfo.is_end == 2" @click="endTrade">确认收货</div>
                    </div>
                </div>
            </div>
            <div class="take-bottom">交易过程中，如有任何疑问，请及时
                <a href="https://web.jiaxincloud.com/gray/mobile.html?&thirdJson={}&bg=FD8159&dialogLogo=0&dialogType=1&dialogMode=1&lang=cn&blinkTitle=1&orgName=mglhodd3enu2mg&appName=kgh431&appChannel=20003&quoteUrl=https://web.jiaxincloud.com&pageTitle=看个号客服&pageUrl=https://web.jiaxincloud.com/onekey.html?id=mglhodd3enu2mg&appName=kgh431&appChannel=20003&alone=1&jump=true&jump=true" target="view_window"><span class="red-color">咨询客服</span></a>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import OrderInfo from "@/components/buy/OrderInfo"; //订单信息
export default {
    name: "TakeDelivery",
    components: {
        Header,
        OrderInfo
    },
    data() {
        return {
            componentsData: {
                showTitle: {
                    showBack: false, //显示后退按钮
                    showLogo: 2, //不显示头部log
                    showShare: 3, //1搜索2分享
                    showBg: true, //是否显示背景
                    title: "收货"
                },
            },
            passType:false,
            goodsInfo:{},
            // 已收货状态 仲裁显示 **
            takeType: null, //1-申请验货 2-确认交易 3-换绑 4-确认收货 5-申请仲裁 || -1 确认交易 1&&2换绑  3确认收货 5-申请仲裁
            takeData: {
                takeTypeImg: [
                    {
                        key: -2,
                        imgsrc: "./static/img/order/one.png"
                    },
                    {
                        key: -1,
                        imgsrc: "./static/img/order/two.png"
                    },
                    {
                        key: 1,//1&&2换绑
                        imgsrc: "./static/img/order/three.png"
                    },
                    {
                        key: 2,//1&&2换绑
                        imgsrc: "./static/img/order/three.png"
                    },
                    {
                        key: 3,
                        imgsrc: "./static/img/order/four.png"
                    },
                    {
                        key: 5,//没改
                        imgsrc: "./static/img/order/four.png"
                    }
                ],
                gamePrint: 8,
                account: "",
                password: ""
            }
        };
    },
    methods: {
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function(e) {
                clipboard.destroy();
                mui.toast("复制成功", { duration: "short", type: "div" });
            });
            clipboard.on("error", function(e) {
                clipboard.destory();
                mui.toast("请重新点击复制", { duration: "short", type: "div" });
            });
        },
        // 查看密码
        seePasswordFn(){
            this.passType = !this.passType;
        },
        // 申请验货
        verifyFn(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'verify_goods',{
                order_id:that.goodsInfo.order_id
            }).then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                      that.getData(that.goodsInfo.order_id,true);
                    }
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
        // 确认交易
        agree(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"agree_trade",{
                order_id:that.goodsInfo.order_id
            }).then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.takeType = res.data.data.bind_status;
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 确认收货
        endTrade(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"end_trade",{
                order_id:that.goodsInfo.order_id
            }).then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.getData(that.$route.query.order);
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 申请仲裁
        goArbitration(){
            this.$router.push({name:'Arbitration',query:{order:this.goodsInfo.order_id}});
        },
        // 取消仲裁
        cancelArb(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'cancel_arbitrate',{
                order_id:that.goodsInfo.order_id
            }).then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.getData(that.goodsInfo.order_id);
                    }
                }
            })
        },
        getData(order_id,flag){
            var that = this;
            that.$axios.post(process.env.API_HOST+"buyer_trade_status",{
                order_id:order_id
            }).then((res)=>{
                // console.log(res)
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.goodsInfo = res.data.data;
                        that.takeType = that.goodsInfo.bind_status;
                        if(flag){
                          that.$common.linkServer();
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        var that = this;
        that.getData(that.$route.query.order)
    }
};
</script>
<style>
.take-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top: 0.88rem;
}
.take-content {
    padding: 0.2rem 0.2rem 0;
}
.take-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    position: relative;
}
.badge{
    width:1.03rem;
    height:1rem;
    position: absolute;
    top:0;
    right: 0;
}
.take-cell .goodsInfo:nth-last-child(1) {
    border: none;
}
.goodsInfo {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 0.2rem;
    padding-right: 0.2rem;
}
.goodsInfo-left,
.goodsInfo-right {
    display: inline-block;
    font-size: 0.26rem;
}
.goodsInfo-left {
    color: #666666;
}

.goodsInfo-right {
    color: #333333;
    float: right;
}
.blue-color {
    color: #4ac0f4;
    font-size: 0.28rem;
    margin-left: 0.1rem;
}
.green-color {
    color: #ffffff;
    background: #45c773;
    text-align: center;
    font-size: 0.2rem;
}
.red-color {
    color: #ff5e5e !important;
}
.take-status-img-cell {
    text-align: center;
    width: 6.39rem;
    height: 0.95rem;
    margin: 0.2rem auto;
}
.take-status-img-cell img {
    width: 6.39rem;
    height: 0.95rem;
}

.take-status-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.take-status-title span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
    margin-right: 0.2rem;
}
.take-status-title .red-color {
    font-size: 0.24rem;
}
.take-status-title img {
    width: 0.08rem;
    height: 0.25rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}
.take-cell-content {
    font-size: 0.26rem;
    color: #666666;
    padding: 0.35rem 0.2rem;
}
.cargo {
    width: 1.1rem;
    color: #ffffff;
    line-height: 0.44rem;
    text-align: center;
    background: #fe7649;
    font-size: 0.22rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin: 0 auto;
}
.intie {
    text-align: center;
}
.intie img {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
}
.intie span {
    vertical-align: middle;
}
.confirm-title {
    margin-bottom: 0.2rem;
}
.confirm-title span {
    color: #999999;
}
.confirm-title .red-color{
    text-decoration: underline;
}
.account {
    background: #f6f6f6;
    /* -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem; */
    padding: 0.2rem 0.15rem;
    margin: 0.2rem 0;
}
.accountText {
    line-height: 0.5rem;
    color: #333333;
}
.accountText span {
    width: 1.3rem;
    display: inline-block;
    text-align: right;
    padding-right: 0.1rem;
    color: #666666;
}
.accountText img{
    width:.35rem;
    height:.22rem;
}
.take-bottom {
    font-size: 0.24rem;
    color: #999999;
    text-align: center;
    margin-bottom: 0.3rem;
}
.take-bottom span {
    text-decoration: underline;
}
.take-status-title .gray-border {
    border: 1px solid #b5b5b5;
    padding:1px 3px;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.35rem;
    -webkit-border-radius: 0.18rem;
    -moz-border-radius: 0.18rem;
    border-radius: 0.18rem;
    color: #999999;
}
.take-status-title .award {
    float: right;
    font-size: 0.24rem;
    color: #999999;
}
.copy-img {
    width: 0.2rem;
    height: 0.24rem;
}


 /* 订单详情 */
 .goods-info-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.goods-info-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
    vertical-align: middle;
}
.goods-info-top img {
    width: 0.08rem;
    height: 0.25rem;
    margin: 0 0 0 0.17rem;
    vertical-align: middle;
    vertical-align: middle;
}
.goods-info-content {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #666666;
    display:flex;
    align-items: center;
    justify-content:space-between;
}
.goods-info-content img {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0 0 0 0.35rem;
}
.goods-info{
    width:70%;
}
.goods-info-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    margin-bottom: 0.15rem;
}
.goods-info-strip{
    display: flex;
    align-items: top;
}
.text-left{
    min-width: 1.1rem;
    margin-right:.3rem;
}

/* ==========input========= */
.accountText input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 3rem;
    height: 0.6rem;
    background:#f6f6f6;
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
