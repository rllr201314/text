<template>
    <!-- 支付 -->
    <div class="pay-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="pay-content">
            <div class="pay-cell">
                <div class="info-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请选择支付方式</span>
                    <span v-text="hint"></span>
                </div>
                <div class="info-cell">
                    <div class="cell-tit">
                        <div class="tit-strip" @click="seleline('on')" :class="is_line?'red-top':''">线上支付</div>
                        <div class="tit-strip" @click="seleline('no')" :class="!is_line?'red-top':''">线下支付</div>
                    </div>
                    <div class="opt-cell showPay" v-show="is_line">
                        <div class="pay-strip" v-for="item in online" @click="selePayFun(item.key)" :class="item.issele?'red-border':'black-border'">
                            <img :src="item.imgsrc" alt="">
                        </div>
                    </div>
                    <div class="opt-cell remind" v-show="!is_line && off_line">
                        <img src="../../../static/img/order/wallet.png" alt="">
                        <div>线下支付主要通过银行卡或支付宝进行转账。请先确认“前往支付”</div>
                    </div>
                    <div class="opt-cell-order " v-if="!is_line && !off_line">
                        <div class="order">
                            <div class="order-box">
                                <span>订单号：</span>
                                <span class="strip-con" v-text="order_num"></span>
                                <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="order_num" @click="copyFn()" id="copy">
                            </div>
                            <div class="red-color">转账的同时请您备注订单号以便核实</div>
                        </div>
                        <div class="pay-way">
                            <div class="pay-way-tit">
                                <img src="../../../static/img/order/zfb_ico.png" alt="">
                                <span>支付宝转账</span>
                            </div>
                            <div class="pay-way-con">
                                <div class="order-box">
                                    <span>收款方：</span>
                                    <span class="strip-con" v-text="order_info.ali.username"></span>
                                    <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="order_info.ali.username" @click="copyFn()" id="copy">
                                </div>
                                <div class="order-box">
                                    <span>支付宝账户：</span>
                                    <span class="strip-con" v-text="order_info.ali.account">></span>
                                    <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="order_info.ali.account" @click="copyFn()" id="copy">
                                </div>
                            </div>
                        </div>
                        <div class="across"></div>
                        <div class="pay-way">
                            <div class="pay-way-tit">
                                <img src="../../../static/img/order/card.png" alt="">
                                <span>银行卡转账</span>
                            </div>
                            <div class="pay-way-con">
                                <div class="order-box">
                                    <span>开户名：</span>
                                    <span class="strip-con" v-text="order_info.bank.username"></span>
                                    <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="order_info.bank.username" @click="copyFn()" id="copy">
                                </div>
                                <div class="order-box">
                                    <span>开户行：</span>
                                    <span class="strip-con" v-text="order_info.bank.bank_name"></span>
                                    <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="order_info.bank.bank_name" @click="copyFn()" id="copy">
                                </div>
                                <div class="order-box">
                                    <span>银行帐号：</span>
                                    <span class="strip-con" v-text="order_info.bank.account"></span>
                                    <img class="copy-img" src="../../../static/img/copy.png" alt="" :data-clipboard-text="order_info.bank.account" @click="copyFn()" id="copy">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pay-info">
                    <div class="left-pay-info">
                        实际支付
                    </div>
                    <div class="right-pay-info">
                        <div class="isbalance" >
                            <div class="balance-left" @click="Balace('true')">
                                <img :src="deposit?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
                                <span>使用押金抵扣</span>
                            </div>
                            <div  @click="Balace('false')">
                                <img :src="isbalace?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
                                <span>使用余额抵扣</span>
                            </div>
                        </div>
                        <div class="deduction" v-if="deposit || isbalace">
                            <div class="deduction-strip" v-if="deposit">押金抵扣 -￥<span v-text="deposit_sum"></span></div>
                            <div class="deduction-strip" v-if="isbalace">余额抵扣 -￥<span v-text="remaining_sum"></span></div>
                        </div>
                        <div class="pay-price red-color">
                            ￥<span v-text="price"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nextBtn" @click="goPayFn" v-text="ok_text" v-if="showBtn"></div>
        <Loading v-if="showLoading"></Loading>
        <div id="pay_card"></div>
        <!-- <PaySuccess v-if="showPaySuccess"></PaySuccess> -->
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
// import PaySuccess from "@/components/multi/PaySuccess";
export default {
    name: "Pay",
    data() {
        return {
            componentsData: {
                showTitle: {
                    showBack: false, //显示后退按钮
                    showLogo: 2, //不显示头部log
                    showShare: 3, //1搜索2分享
                    showBg: true, //是否显示背景
                    title: "商品下单",
                    goBack:'',
                },
                // s
                payInfo: {
                    showTitle: true,
                    payment: {
                        online: true,
                        noline: false
                    }
                }
            },
            hint:'（请在下单后45分钟之内完成支付）',
            selePrice:true,//是否可以选择余额支付或者押金支付 下单成功后不可选择
            showPaySuccess:false,
            old_price:0,//价格
            deposit_sum:0,//押金
            remaining_sum:0,//余额
            showBtn:true,
            stage_info:null,
            order_id:null,
            ok_text:'前往支付',
            order_num:null,
            order_info:null,
            showLoading:false,
            goods_info:null,
            price:null,
            is_line: true, //线上true 线下false
            off_line:true,//未选择线下true 选择线下false
            payment_num:3,//默认银联
            online: [
                {
                    key: 3,
                    issele: true,
                    imgsrc: "./static/img/order/visa.png"
                },
                {
                    key: 1,
                    issele: false,
                    imgsrc: "./static/img/order/wxpay.png"
                },
                {
                    key: 2,
                    issele: false,
                    imgsrc: "./static/img/order/zfbpay.png"
                }
            ],
            isbalace:false,
            deposit:false,
            payData: {
                orderInfo: {
                    orderNum: "13823427342389423",
                    orderTime: "2018-08-08 9:00",
                    orderPrice: "￥2000",
                    
                    lastTime: "22:22"
                }
            },
        };
    },
    components: {
        Header,
        Loading,
        // PaySuccess
    },
    methods: {
        Balace(flag){
            // debugger;
            var that = this;
            if(that.selePrice){//判断可不可以选余额或者押金支付，确认支付后不可再点击
                if(flag == 'true'){
                    that.deposit = !that.deposit;
                    that.isbalace =false;
                    if(!that.deposit){
                        that.price = Number(that.old_price);
                    }else{
                        // that.price = Number(that.old_price) - Number(that.deposit_sum);
                        if(Number(that.deposit_sum) > Number(that.price)){
                            that.deposit_sum = that.price;
                            that.price = 0;
                        }else{
                            that.price = Number(that.old_price) - Number(that.deposit_sum);
                        }
                    }
                }else if(flag == 'false'){
                    that.isbalace = !that.isbalace; 
                    that.deposit =false;
                    if(!that.isbalace){
                        that.price = Number(that.old_price);
                    }else{
                        if(Number(that.remaining_sum) > Number(that.price)){
                            that.remaining_sum = that.price;
                            that.price = 0;
                        }else{
                            that.price = Number(that.old_price) - Number(that.remaining_sum);
                        }
                    }
                }
            }
        },
        seleline(flag) {
            var that = this;
            if (flag == "on") {
                that.is_line = true;
                that.ok_text = "前往支付";
            } else {
                that.is_line = false;
                if(that.off_line){
                    that.ok_text = "前往支付";
                }else{
                    that.ok_text = "查看订单";
                }
            }
        },
        // 选择线上支付 方式
        selePayFun(opt) {
            var that = this;
            var payAll = this.online;
            for (var i in payAll) {
                if (opt == payAll[i].key) {
                    payAll[i].issele = true;
                    that.payment_num = opt;
                    continue;
                }
                payAll[i].issele = false;
            }
        },
        // 复制
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function(e) {
                clipboard.destroy();
                mui.toast("复制成功",{ duration:'short', type:'div' });
            });
            clipboard.on("error", function(e) {
                clipboard.destory();
                mui.toast("请重新点击复制",{ duration:'short', type:'div' });
            });
        },
        // 判断是不是JSON字符串
        isobjStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        },
        getData(){
            var that = this;
            var request = {};
            var url;
            // 判断是下单过来还是订单过来
            if(that.goods_info && !that.order_id){//详情
                url = 'order_confirm';
                var data = that.goods_info;
                request.goods_id = data.goods_id;
                request.mobile = data.phone;
                request.wx = data.wx;
                request.is_compact = data.compact;
                request.is_safe = data.safe;
                if(that.is_line){
                    request.payment_method = that.payment_num;
                }else{
                    request.payment_method = 4;//选择线下支付
                }
                if(data.down_price){
                    request.stage_method = data.down_price;
                    request.stage_number = data.stage_num;
                    if(data.down_price == 3){
                        request.down_payment = data.down_payment;
                    }
                }
            }else if(!that.goods_info && that.order_id){//待支付订单
                url = 'order_trading';
                request.order_id = that.order_id;
                if(that.is_line){
                    request.payment_method = that.payment_num;
                }else{
                    request.payment_method = 4;//选择线下支付
                }
            }else if(that.stage_info){//分期支付
                url = 'do_stage'
                request.order_id = that.stage_info.order;
                request.stage_method = that.stage_info.way;
                if(that.is_line){
                    request.payment_method = that.payment_num;
                }else{
                    request.payment_method = 4;//选择线下支付
                }
            }
            // 判断有没有用余额支付
            if(that.isbalace){
                request.is_remaining_sum = 1;
            }else{
                request.is_remaining_sum = 2;
            }
            
            that.$axios.post(process.env.API_HOST+url,request).then((res)=>{
                console.log(res);
                that.showLoading = false;
                if(res.status == 200){
                    if(res.data.code == 200){
                        // mui.toast(res.data.msg,{ duration:'short', type:'div' });
                        mui.alert(res.data.msg,'提示','确认','','div');
                        that.componentsData.showTitle.goBack = 2;
                        if(that.is_line){
                            // 跳转页面 第三方接口
                            $('#pay_card').html(res.data.data.pay_url);//银联
                            $('#pay_form').submit();//银联
                        }else{//线下
                            var data = res.data.data;
                            that.off_line = false;
                            that.order_num = data.order_sn;
                            that.order_info = data.bank_account;
                            that.selePrice = false;//点击下单不可以再选择余额支付
                            if(url == 'do_stage'){
                                that.showBtn = false;
                            }else{
                                that.ok_text = "查看订单";
                            }
                        }
                    }else if(res.data.code == 201){//余额支付完成
                        // mui.toast(res.data.msg,{ duration:'short', type:'div' });
                        mui.alert(res.data.msg,'提示','确认',function(){
                            that.$router.push({name:'BuyTradingStatus'});
                        },'div');
                        
                    }else if(res.data.code == 401){
                        that.$router.push({
                            name: "AccountLogin",
                            params: {
                                redirect: "Details"
                            }
                        });
                    }else{
                        // mui.toast(res.data.msg,{ duration:'short', type:'div' });
                        mui.alert(res.data.msg,'提示','确认','','div');
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        // 订单过来调取余额和需要支付的价格 和订单时间
        initTime(order_id){
            var that = this;
            that.$axios.post(process.env.API_HOST+"payment_info",{
                order_id:order_id
            }).then((res)=>{
                console.log(res)
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.remaining_sum = Number(res.data.data.remain_amount);
                        that.price = res.data.data.order_amount;
                        that.old_price = res.data.data.order_amount;
                        that.hint = '（'+res.data.msg+'）';
                        if(res.data.data.is_remaining == 2){
                            that.selePrice = true;
                        }else if(res.data.data.is_remaining == 1){
                            that.selePrice = false;
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        goPayFn(){
            var that = this;
            if(!that.is_line && !that.off_line){
                that.$router.push({name: "BuyUnpaidStatus" });//未支付
            }else{
                that.showLoading = true;
                that.getData();
            }
        },
        getBanlan(order_id){
            var that = this;
            that.$axios.post(process.env.API_HOST+'',{
                order_id:order_id
            }).then((res)=>{
                console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){

                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    beforeRouteLeave(to, from, next) {
        if(to.path == '/place-order'){
            this.$router.go(-3);//跳转到选择游戏类型
        }else if(to.path == '/installment'){
            this.$router.go(-1);
        }else{
            next();
        }
    },
    mounted() {
        var that = this;
        var b = sessionStorage.getItem("order_info");
        if(that.$route.query.request){//详情
            var request = that.$route.query.request;
            if (request == b) {
                if (that.isobjStr(request)) {
                    that.goods_info = JSON.parse(request);
                    that.price = that.goods_info.price;
                    that.old_price = that.price;
                    that.remaining_sum = Number(that.goods_info.remaining_sum);
                } else {
                    that.$router.go(-1);
                }
            } else {
                that.$router.go(-1);
            }
        }else if(that.$route.query.order_info){//未支付订单
            var order_id = that.$route.query.order_info;
            var unpaid_o = sessionStorage.getItem('unpaid_o');
            if(order_id == unpaid_o){
                if(that.isobjStr(order_id)){
                    var order = JSON.parse(order_id);
                    that.order_id = order.order_id;
                    that.price = order.price;
                    that.initTime(that.order_id);
                }else{
                    that.$router.go(-1);
                }
            }else{
                that.$router.go(-1);
            }
        }else if(that.$route.query.stage){// 分期支付
            var s_stages = sessionStorage.getItem('stage');
            var stages = that.$route.query.stage;
            if(s_stages == stages){
                if(that.isobjStr(stages)){
                    that.stage_info = JSON.parse(stages);
                    that.price = that.stage_info.price;
                    that.old_price = that.stage_info.price;
                    that.remaining_sum = Number(that.stage_info.remaining_sum);
                }else{
                    that.$router.go(-1);
                }
            }else{
                that.$router.go(-1);
            }
        }else{
            that.$router.go(-1);
        }
        
    }
};
</script>
<style scoped>
.pay-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top: 0.88rem;
}
.pay-content {
    padding: 0.2rem 0.2rem 0;
}
.pay-cell {
    padding: 0 0.2rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.info-title {
    line-height: 0.7rem;
    /* border-bottom:1px solid #e5e5e5; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.info-title span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.info-title span:nth-last-child(1) {
    font-size: 0.26rem;
    color: #999999;
}
.info-title img {
    width: 0.13rem;
    height: 0.29rem;
    margin-top: 0.1rem;
}

.pay-info {
    font-size: 0.26rem;
    padding: 0.4rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
.red-color {
    color: #fa5856;
}
.left-pay-info {
    width: 1.6rem;
}
.right-pay-info {
    width: 100%;
}
.isbalance {
    margin: 0.2rem 0;
}
.isbalance img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.isbalance span {
    vertical-align: middle;
}
.isbalance div {
    display: inline-block;
}
.balance-left {
    margin-right: 0.8rem;
}
.deduction {
    background: #f6f6f6;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    padding: 0.2rem;
    color: #999999;
    margin-bottom: 0.2rem;
}
.deduction div {
    margin-bottom: 0.15rem;
}
.deduction div:nth-last-child(1) {
    margin-bottom: 0;
}

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.5rem auto;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}
.info-cell {
    font-size: 0;
}
.cell-tit {
    display: flex;
    justify-content: flex-start;
    font-size: 0.26rem;
    height: 0.56rem;
    line-height: 0.56rem;
    position: relative;
    top: 1px;
}
.cell-tit div {
    width: 1.65rem;
    text-align: center;
    /* border-bottom: 1px solid red; */
}
.red-top {
    border-top: 0.05rem solid #ff7e4a;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #ffffff;
}
.opt-cell {
    padding: 0.4rem 0;
    border: 1px solid #e5e5e5;
}
.opt-cell-order {
    font-size: 0.24rem;
    border: 1px solid #e5e5e5;
}
/* 确认订单 */
.order {
    width: 6.14rem;
    margin: 0.2rem auto 0.1rem;
    padding: 0.2rem 0.5rem;
    background: #f6f8fe;
    border-top-left-radius: 0.53rem;
    border-top-right-radius: 0.53rem;
    border-bottom-left-radius: 0.53rem;
    border-bottom-right-radius: 0.53rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.order-box {
    color: #999999;
    margin-bottom: 0.1rem;
}
.copy-img {
    width: 0.2rem;
    height: 0.24rem;
}
.strip-con {
    color: #666666;
    margin: 0 0.15rem;
}
.pay-way {
    padding: 0.2rem 0.1rem 0.1rem;
}
.across {
    width: 100%;
    height: 0.1rem;
    background: #f6f8fe;
}
.pay-way-tit {
    font-weight: bold;
}
.pay-way-tit img {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
}
.pay-way-con {
    margin-left: 0.5rem;
}
/* 线上支付 */
.showPay {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.4rem;
}
/* 线下支付 */
.remind {
    display: flex;
    justify-content: flex-start;
    padding: 0.4rem 0.2rem 0.4rem 0.14rem;
    align-items: center;
}
.remind img {
    width: 0.89rem;
    height: 0.89rem;
    margin-right: 0.21rem;
}
.remind div {
    color: #999999;
    font-size: 0.26rem;
}

.pay-strip {
    width: 1.4rem;
    height: 0.58rem;
    margin-right: 0.5rem;
    overflow: hidden;
}
.pay-strip img {
    width: 1.4rem;
    height: 0.58rem;
}
.red-border {
    border: 1px dashed #fe7649;
}
.black-border {
    border: 1px dashed #dcdcdc;
}
</style>

