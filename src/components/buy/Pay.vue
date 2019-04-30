<template>
    <!-- 支付 -->
    <div class="wrap">
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
                        <div class="tit-strip" @click="seleline('no')" :class="!is_line?'red-top':''" v-if="showOffline">线下支付</div>
                    </div>
                    <div class="opt-cell" v-show="is_line">
                        <div class="showPay">
                            <div class="pay-strip" v-for="(item,index) in online" :key="index" @click="selePayFun(item.key)" :class="item.issele?'red-border':'black-border'">
                                <img :src="item.imgsrc" alt="">
                            </div>
                        </div>
                        <div class="online-hint">
                            因<span v-text="charge.name"></span>支付渠道规定收取<span v-text="charge.rate"></span>手续费，故加收<span class="red-color" v-text="charge.price"></span><span class="red-color">元</span>
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
                            <div class="balance-left" @click="Balace('true')" v-if="false">
                                <img :src="deposit?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
                                <span>使用押金抵扣</span>
                            </div>
                            <div  @click="Balace('false')">
                                <img :src="isbalace?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'" alt="">
                                <span>使用余额抵扣</span>
                            </div>
                        </div>
                        <div class="deduction" v-if="deposit || isbalace">
                            <div class="deduction-strip" v-if="deposit">押金抵扣 -￥<span v-text="deposit_price"></span></div>
                            <div class="deduction-strip" v-if="isbalace">余额抵扣 -￥<span v-text="remaining_price"></span></div>
                        </div>
                        <div class="pay-price red-color">
                            ￥<span v-text="price"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop-view" v-show="show_pop">
            <div>您正在使用余额抵扣/押金抵扣</div>
            <input type="password" placeholder="请输入看个号平台的交易密码" v-model="password">
            <div class="btn-all">
                <div class="btn okbtn" @click="subPass">确认</div>
                <div class="btn canclebtn" @click="hiddenPop">取消</div>
            </div>
        </div>
        <div class="share" v-show="show_pop"></div>
        <div class="nextBtn" @click="goPayFn" v-text="ok_text" v-if="showBtn"></div>
        <Loading v-if="showLoading"></Loading>
        <LinkServer v-bind:is_line="is_line" class="fixedRight"></LinkServer>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
import LinkServer from "@/components/common/LinkServer";
export default {
    name: "PayTest",
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
                payInfo: {
                    showTitle: true,
                    payment: {
                        online: true,
                        noline: false
                    }
                }
            },
            charge:{
                name:'',
                price:0,
                rate:'',
            },//线上支付手续费
            fee_info:'',//手续费信息
            password:'',//安全交易密码
            show_pop:false,
            hint:'（请在下单后40分钟之内完成支付）',
            selePrice:true,//是否可以选择余额支付或者押金支付 下单成功后不可选择
            showPaySuccess:false,
            old_price:0,//价格
            deposit_sum:0,//押金
            deposit_price:0,//扣除押金
            remaining_price:0,//扣除余额
            showBtn:true,
            stage_info:null,//分期信息
            rent_info:null,//租号信息
            rent_unpaid_o:null,//租号未支付
            relet_info:null,//租号续租
            relet_unpaid_o:null,//租号续租未支付
            order_id:null,
            ok_text:'前往支付',
            order_num:null,
            order_info:null,
            showLoading:false,
            goods_info:null,
            price:null,
            is_line: true, //线上true 线下false
            off_line:true,//未选择线下true 选择线下false
            payment_method:3,//默认银联
            showOffline:true,//显示线下付款
            online: [
                {
                    key: 3,
                    issele: true,
                    imgsrc: "../../../static/img/order/visa-1.png",
                    name:'银联'
                },
                {
                    key: 2,
                    issele: false,
                    imgsrc: "../../../static/img/order/zfbpay.png",
                    name:'支付宝'
                },
                {
                    key: 1,
                    issele: false,
                    imgsrc: "../../../static/img/order/wxpay.png",
                    name:'微信'
                }
            ],
            isbalace:false,
            deposit:false,
            link:null,
            submitData:null,
        };
    },
    components: {
        Header,
        Loading,
        LinkServer,
    },
    methods: {
        Balace(flag){
            var that = this;
            if(that.selePrice){//判断可不可以选余额或者押金支付，确认支付后不可再点击
                if(flag == 'true'){//押金支付
                    that.deposit = !that.deposit;
                    that.isbalace =false;
                    if(that.deposit){//使用
                        if(Number(that.deposit_sum) > Number(that.price)){
                            that.deposit_price = that.price;
                            that.price = 0;
                        }else{
                            that.price = Number(that.old_price) - Number(that.deposit_sum);
                            that.deposit_price = Number(that.deposit_sum);
                        }
                    }else{
                        that.price = Number(that.old_price);
                    }
                }else if(flag == 'false'){//余额支付                   
                    that.isbalace = !that.isbalace; 
                    that.deposit = false;
                    if(that.isbalace){//选择余额支付
                        that.remaining_price = that.fee_info.remaining_deduction;//扣除余额显示
                        if(that.is_line){//线上支付
                            var data = that.online;
                            for(var i in data){
                                if(data[i].issele == true){
                                    switch(data[i].name){
                                        case "银联":
                                            that.charge.price = that.fee_info.chinapay_remaining_charge;
                                            that.price = that.fee_info.chinapay_remaining_amount;
                                            that.charge.rate = that.fee_info.chinapay_rate;
                                            break;
                                        case "支付宝":
                                            that.charge.price = that.fee_info.alli_remaining_charge;
                                            that.price = that.fee_info.alli_remaining_amount;
                                            that.charge.rate = that.fee_info.alli_rate;
                                            break;
                                        case "微信":
                                            that.charge.price = that.fee_info.wx_remaining_charge;
                                            that.price = that.fee_info.wx_remaining_amount;
                                            that.charge.rate = that.fee_info.wx_rate;
                                            break;
                                    }
                                }
                            }
                        }else{
                            that.price = that.fee_info.offline_remaining_amount;
                        }
                    }else{//取消余额支付
                        if(that.is_line){//线上支付
                            var data = that.online;
                            for(var i in data){
                                if(data[i].issele == true){
                                    switch(data[i].name){
                                        case "银联":
                                            that.charge.price = that.fee_info.chinapay_charge;
                                            that.price = that.fee_info.chinapay_amount;
                                            that.charge.rate = that.fee_info.chinapay_rate;
                                            break;
                                        case "支付宝":
                                            that.charge.price = that.fee_info.alli_charge;
                                            that.price = that.fee_info.alli_amount;
                                            that.charge.rate = that.fee_info.alli_rate;
                                            break;
                                        case "微信":
                                            that.charge.price = that.fee_info.wx_charge;
                                            that.price = that.fee_info.wx_amount;
                                            that.charge.rate = that.fee_info.wx_rate;
                                            break;
                                        }
                                }
                            }
                        }else{
                            that.price = that.fee_info.offline_amount;
                        }
                    }
                }
            }
        },
        seleline(flag) {
            var that = this;
            // 选择线上线下后默认未选余额押金抵扣
            that.isbalace=false;
            that.deposit=false;
            if (flag == "on") {
                that.is_line = true;
                that.ok_text = "前往支付";
                var data = that.online;
                for(var i in data){
                    if(data[i].issele == true){
                        if(data[i].name == "银联"){
                            that.price = that.fee_info.chinapay_amount;
                            that.old_price = that.fee_info.chinapay_amount;
                            that.charge.name = data[i].name;
                            that.charge.price = that.fee_info.chinapay_charge;
                            that.charge.rate = that.fee_info.chinapay_rate;
                            break;
                        }else if(data[i].name == "支付宝"){
                            that.price = that.fee_info.alli_amount;
                            that.old_price = that.fee_info.alli_amount;
                            that.charge.name = data[i].name;
                            that.charge.price = that.fee_info.alli_charge;
                            that.charge.rate = that.fee_info.alli_rate;
                            break;
                        }else if(data[i].name == "微信"){
                            that.price = that.fee_info.wx_amount;
                            that.old_price = that.fee_info.wx_amount;
                            that.charge.name = data[i].name;
                            that.charge.price = that.fee_info.wx_charge;
                            that.charge.rate = that.fee_info.wx_rate;
                            break;
                        }
                    }
                }
            } else {
                that.is_line = false;
                that.price = that.fee_info.offline_amount;
                that.old_price = that.fee_info.offline_amount;
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
            // 选择线上支付后默认未选余额押金抵扣
            that.isbalace=false;
            that.deposit=false;
            var payAll = that.online;
            for (var i in payAll) {
                if (opt == payAll[i].key) {
                    payAll[i].issele = true;
                    that.payment_method = opt;
                    that.charge.name = payAll[i].name;
                    continue;
                }
                payAll[i].issele = false;
            }
            for(var i in payAll){
                if(payAll[i].issele == true){
                    if(payAll[i].name == "银联"){
                        that.price = that.fee_info.chinapay_amount;
                        that.old_price = that.fee_info.chinapay_amount;
                        that.charge.name = payAll[i].name;
                        that.charge.price = that.fee_info.chinapay_charge;
                        that.charge.rate = that.fee_info.chinapay_rate;
                        break;
                    }else if(payAll[i].name == "支付宝"){
                        that.price = that.fee_info.alli_amount;
                        that.old_price = that.fee_info.alli_amount;
                        that.charge.name = payAll[i].name;
                        that.charge.price = that.fee_info.alli_charge;
                        that.charge.rate = that.fee_info.alli_rate;
                        break;
                    }else if(payAll[i].name == "微信"){
                        that.price = that.fee_info.wx_amount;
                        that.old_price = that.fee_info.wx_amount;
                        that.charge.name = payAll[i].name;
                        that.charge.price = that.fee_info.wx_charge;
                        that.charge.rate = that.fee_info.wx_rate;
                        break;
                    }
                }
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
            if(that.goods_info && !that.order_id){//成品号下单
                url = 'order_confirm';
                request = that.returnRequest(url,that.goods_info);
            }else if(!that.goods_info && that.order_id){//待支付订单 成品号 && 藏宝阁
                url = 'order_trading';
                request = that.returnRequest(url,that.order_id);
            }else if(that.stage_info){//分期支付
                url = 'do_stage';
                request = that.returnRequest(url,that.stage_info);
            }else if(that.rent_info){//租号下单
                url = 'rent_order';
                request = that.returnRequest(url,that.rent_info);
            }else if(that.rent_unpaid_o){//租号未支付
                url = 'rent_trading';
                request = that.returnRequest(url,that.rent_unpaid_o);
            }else if(that.relet_info){//续租
                url = "relet_order";
                request = that.returnRequest(url,that.relet_info);
            }else if(that.relet_unpaid_o){//续租未支付
                url = 'relet_trading';
                request = that.returnRequest(url,that.relet_unpaid_o);
            }
            // 判断有没有用余额支付
            if(that.isbalace &&　Number(that.remaining_price) > 0){
                request.is_remaining_sum = 1;
                that.show_pop = true;//显示安全密码弹框
                that.link = url;
                that.submitData = request;
            }else{
                request.is_remaining_sum = 2;
                that.subData(url,request);
            }
        },
        // 提交安全交易密码
        subPass(){
            var that = this;
            that.submitData.password = that.password;
            that.subData(that.link,that.submitData);
            that.show_pop = false;
            that.password = '';
        },
        // 取消交易密码弹窗
        hiddenPop(){
            var that = this;
            that.show_pop = false;
            that.password = '';
            that.showLoading = false;
        },
        // 提交信息
        subData(url,request){
            var that = this;
            that.$axios.post(process.env.API_HOST+url,request).then((res)=>{
                that.showLoading = false;
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.alert(res.data.msg,'提示','确认','','div');
                        that.componentsData.showTitle.goBack = 2;
                        if(that.is_line){
                            var type = that.online;
                            var type_id = '';
                            for(var i in type){
                                if(type[i].issele == true){
                                    type_id = type[i].key;
                                    break;
                                }
                            }
                            // console.log(type_id);
                            if(type_id == 3){
                                // 跳转页面 第三方接口
                                // $('#pay_card').html(res.data.data.pay_url);//银联
                                // $('#pay_form').submit();//银联
                                // 通联支付
                                console.log(that.$route.query)
                                // that.$router.push({name:'AllinpaySelect',query:that.$route.query})
                            }else if(type_id == 2){
                                // 支付宝
                                that.$router.push({name:'AliPay',query:{url:res.data.data.pay_url}})
                            }else if(type_id == 1){
                                // 微信
                                that.$router.push({name:'WechatPay',query:{url:res.data.data.pay_url}})
                            }
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
                        if(that.$route.query.stage){
                             mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.go(-1);
                            },'div');
                        }else{
                             mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.push({name:'BuyTradingStatus'});
                            },'div');
                        }
                    }else if(res.data.code == 220){//通联支付 没有签约 没绑定银行卡
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.$router.push({name:'AllinpayAddInfo',query:that.$route.query})
                    }else if(res.data.code == 221){//通联支付 签约 选择银行卡
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.$router.push({name:'AllinpaySelect',query:that.$route.query})
                    }else if(res.data.code == 202){
                        // 未实名认证
                        mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.push({name:'UserAuthentication',query:{type:2,status:1}})
                            },'div');
                    }else if(res.data.code == 203){
                        // 未设置安全交易密码
                        mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.push({name:'Safety_Center',query:{type:1}});//type:1，已实名认证
                            },'div');
                    }else if(res.data.code == 400){
                        mui.alert(res.data.msg,'提示','确认','','div');
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        
        goPayFn(){
            var that = this;
            if(!that.is_line && !that.off_line){
                that.$router.push({name: "BuyOrderAll" });//未支付
            }
            // else if(that.is_line && that.payment_method == 3){//判断线上支付 && 银联支付
            //     if(that.fee_info.bank_sign == 1){//已签约选卡
            //         that.$router.push({name:'AllinpaySelect',query:that.$route.query})
            //     }else if(that.fee_info.bank_sign == 2){//未签约 添加信息
            //         that.$router.push({name:'AllinpayAddInfo',query:that.$route.query})
            //     }
            // }
            else{
                // 调支付
                that.showLoading = true;
                that.getData();
            }
        },
        returnRequest(url,request){
            let that = this;
            let data = {};
            //选择线上还是线下支付
            if(url == 'fee_info' || url == 'order_confirm'){//成品号get金额 || 成品号下单***
                data.goods_id = request.goods_id;
                data.is_compact = request.is_compact;
                data.is_safe = request.is_safe;
                // 判断是否分期 不分期就没传值过来
                if(request.stage_method){
                    data.stage_method = request.stage_method;
                    data.stage_number = request.stage_number;
                    if(data.stage_method == 3){//自定义分期
                        data.down_payment = request.down_payment;//自定义分期金额
                    }
                }
                if(url == 'order_confirm'){//成品号下单 加参数
                    data.mobile = request.mobile;
                    data.wx = request.wx;
                }
            }else if(url == 'payment_info' || url == 'order_trading'){//成品号未支付get金额 || 成品号未支付下单***
                data.order_id = request.order_id;
            }else if(url == 'stage_fee' || url == 'do_stage'){//分期支付get金额 || 分期支付下单***
                data.order_id = request.order_id;
                data.stage_method = request.stage_method;//还款方式 
                // 日分期 还款金额
                if(request.stage_money){
                    data.stage_money = request.stage_money;
                }
            }else if(url == 'rent_fee' || url == 'rent_order'){//租号get金额 || 租号下单***
                data.goods_id = request.goods_id;
                data.lease_time = request.lease_time;
                if(url == 'rent_order'){//成品号下单 加参数
                    data.mobile = request.mobile;
                    data.wx = request.wx;
                }
            }else if(url == 'rent_payment' || url == 'rent_trading' ||  url == 'relet_trading'){//租号&&续租 未支付get金额 || 租号&&续租未支付下单***
                data.order_id = request.order_id;
            }else if(url == 'relet_fee' || url == 'relet_order'){//续租get金额 ||续租下单***
                data.order_id = request.order_id;
                data.lease_time = request.lease_time;
                if(url == 'relet_order'){//续租下单 加参数
                    data.mobile = request.mobile;
                    data.wx = request.wx;
                }
            }

            // 支付方式 ***
            if(that.is_line){
                data.payment_method = that.payment_method;
            }else{
                data.payment_method = 4;//选择线下支付
            }
            return data;
        },
        Fee(url,request){
            let that = this;
            var data = that.returnRequest(url,request);
            that.$axios.post(`${that.baseURL+url}`,data).then((res) => {
                console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.fee_info = res.data.data;
                        var data = that.online;
                        for(var i in data){
                            if(data[i].issele == true){
                                if(data[i].name == "银联"){
                                    that.price = that.fee_info.chinapay_amount;
                                    that.old_price = that.fee_info.chinapay_amount;
                                    that.charge.name = data[i].name;
                                    that.charge.price = that.fee_info.chinapay_charge;
                                    that.charge.rate = that.fee_info.chinapay_rate;
                                    break;
                                }
                            }
                        }
                        //成品号未支付 租号未支付 
                        if(request.pay_type == 2 || request.pay_type == 5){
                            that.hint = '（'+res.data.msg+'）';
                        }
                    }else{
                        mui.alert(res.data.msg,'提示','确认',function(){
                            that.$router.go(-1);
                        },'div')
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
    },
    mounted() {
        var that = this;
        let info =sessionStorage.getItem('info');
        if(that.$route.params.info == info){
            if(that.isobjStr(info)){
                let info_type = JSON.parse(info);
                console.log(info_type)
                if(info_type.pay_type == 1){//成品号下单
                    that.goods_info = info_type;
                    that.Fee('fee_info',info_type)
                }else if(info_type.pay_type == 2 || info_type.pay_type == 8){//未支付订单 成品号 && 藏宝阁
                    that.order_id = info_type;
                    that.Fee('payment_info',info_type);
                }else if(info_type.pay_type == 3){//分期支付
                    that.stage_info = info_type;
                    that.Fee('stage_fee',info_type)
                }else if(info_type.pay_type == 4){//租号
                    that.rent_info = info_type;
                    that.Fee('rent_fee',info_type)
                }else if(info_type.pay_type == 5){//租号未支付
                    that.rent_unpaid_o = info_type;
                    that.Fee('rent_payment',info_type)
                }else if(info_type.pay_type == 6){//续租
                    that.relet_info = info_type;
                    that.Fee('relet_fee',info_type);
                }else if(info_type.pay_type == 7){//续租未支付
                    that.relet_unpaid_o = info_type;
                    that.Fee('rent_payment',info_type);
                }else if(!info_type.pay_type){
                    that.$router.go(-1);
                }
            }
        }else{
            that.$router.go(-1);
        }
        
    },
    beforeRouteLeave(to, from, next) {
        if(to.path == '/place-order' || to.path == '/rent-orders'){
            this.$router.go(-3);//跳转到选择游戏类型
        }else if(to.path == '/installment'){
            this.$router.go(-1);
        }else{
            next(); 
        }
    },
};
</script>
<style scoped>
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
    width: 0.08rem;
    height: 0.25rem;
    margin-right:.1rem;
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
    padding: 0.4rem 0 0.2rem;
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
.online-hint{
    font-size:.24rem;
    color:#999999;
    margin:.28rem 0 0 .4rem;
}





.pop-view{
    width:5rem;
    height:3.28rem;
    background:#FFFFFF;
    padding:.31rem;
    color:#666666;
    font-size:.28rem;
    line-height:.6rem;
    border-radius: .1rem;
    position:fixed;
    top:30%;
    left:calc(50% - 2.5rem);
    z-index:15;
}
.pop-view input{
    font-size:.24rem;
    width:100%;
    color:#999999;
    margin:0;
}
.btn-all{
    display:flex;
    justify-content: flex-start;
}
.btn{
    width:1.89rem;
    border-radius: .3rem;
    text-align:center;
    margin:0 .15rem;
    color:#ffffff;
    margin-top:.4rem;
}
.okbtn{
    background:#FC534A;
}
.canclebtn{
    background:#C6C6C6;
}
.share{
    background:rgba(0,0,0,0.3);
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
}
@media (max-width:1440px) {
    .fixedRight{
        right:0 !important;
        margin-right:0!important;
    }
}
@media (min-width:1440px) {
    .fixedRight{
        right:50% !important;
        margin-right: -307px;
    }
}
</style>

