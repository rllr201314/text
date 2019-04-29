<template>
    <div class="allinpay-wrap wrap">
        <Header :showTitle="showTitle"></Header>
        <div class="pay-tit">
            <img src="../../../static/img/pay/allinpay-log.png" alt="通联支付" />
            <div>通联支付快捷支付，仅首次支付需要验证以下信息</div>
        </div>
        <div class="pay-con">
            <div class="pay-item">
                <div class="item-left">卡类型：</div>
                <div class="item-right choose-card">
                    <div @click="chooseFn('credit')">
                        <img :src="choose?'../../../static/img/pay/noChoose.png':'../../../static/img/pay/choose.png'" alt="">
                        <span>信用卡</span>
                    </div>
                    <div @click="chooseFn('debit')">
                        <img :src="choose?'../../../static/img/pay/choose.png':'../../../static/img/pay/noChoose.png'" alt="">
                        <span>借记卡</span>
                    </div>
                </div>
            </div>
            <div class="pay-item">
                <div class="item-left id-card">身份证号：</div>
                <div class="item-right">
                    <input type="text" class="big-input" placeholder="请输入您的身份证号" v-model="request.id_no" oninput="value=value.replace(/\s/g,'')">
                    <div class="hint">温馨提示：末尾是X，必须大写</div>
                </div>
            </div>
            <div class="pay-item">
                <div class="item-left">银行卡号：</div>
                <div class="item-right">
                    <input type="number" class="big-input" placeholder="请输入您的银行卡号" v-model="request.bank_no">
                </div>
            </div>
            <div class="pay-item">
                <div class="item-left">开户名：</div>
                <div class="item-right">
                    <input type="text" class="big-input" placeholder="请输入开户名" v-model="request.true_name" oninput="value=value.replace(/\s/g,'')">
                </div>
            </div>
            <div class="pay-item">
                <div class="item-left">预留手机号：</div>
                <div class="item-right">
                    <input type="number" class="big-input" placeholder="请输入银行预留手机号" v-model="request.mobile">
                </div>
            </div>
            <div class="pay-item" v-show="!choose">
                <div class="item-left">有效期：</div>
                <div class="item-right">
                    <input type="number" class="small-input" v-model="valid_time[0]" placeholder="月">
                    <span class="layer">/</span>
                    <input type="number" class="small-input" v-model="valid_time[1]" placeholder="年">
                    <span class="show-legeng" @click="imgDate = !imgDate">图例</span>
                </div>
            </div>
            <div class="pay-item" v-show="!choose">
                <div class="item-left">CVV2：</div>
                <div class="item-right">
                    <input type="number" class="center-input" placeholder="银行卡背面后三位数" v-model="request.cvv">
                    <span class="show-legeng" @click="imgCvv2 = !imgCvv2">图例</span>
                </div>
            </div>
        </div>
        <div class="btn" @click="addInfo">确认并前往支付</div>
        <div class="pop" v-if="imgCvv2 || imgDate" @click="imgCvv2?imgCvv2 = false:'';imgDate?imgDate = false:''">
            <img class="pop-img" src="../../../static/img/pay/cvv2.png" alt="安全校验码"  v-show="imgCvv2">
            <img class="pop-img" src="../../../static/img/pay/date.png" alt="有效时间月/年"  v-show="imgDate">
        </div>
        <div class="pop" v-show="showCode">
            <div class="code-box">
                <div class="code-tit">
                    <div class="code-tit-top">通联支付</div>
                    <div class="code-tit-bot" v-text="request.bank_no"></div>
                </div>
                <div class="code-con">
                    <div class="code-price" v-if="false">￥<span v-text="codePrice"></span></div>
                    <input type="number" v-model="code" placeholder="请输入验证码"><span class="code-get-btn" v-text="codeText" @click="getCode()"></span>
                    <div class="code-hint">验证码已发送至<span v-text="codePhone"></span>手机上</div>
                    <div class="btn-all code-enter-btn" @click="enCodeFn()">确认</div>
                </div>
                <div class="code-bot">
                    <img src="../../../static/img/pay/close.png" alt="关闭" @click="closeCodeFn()">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "AllinpayAddInfo",
    components: {
        Header
    },
    watch:{
    },
    methods:{
        // 关闭输入验证码页面
        closeCodeFn(){
            this.showCode = false;
        },
        // 确认验证码
        enCodeFn(){
            var that = this;
            that.request.is_info = that.is_info;
            if(!that.code){
                mui.alert("请输入验证码","提示","确认","","div");
                return false;
            }
            that.request.is_info = that.is_info;
            that.request.sms_code = that.code;
            that.$axios.post(`${that.baseURL}confirm_sign`,that.request).then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.$router.push({path:'/pay',query:that.$route.query})
                    }else if(res.data.code == 400 || res.data.code == 211){
                        mui.alert(res.data.msg,"提示","确认","","div");
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getCode(){
            var that = this;
            if(that.isGetCode){
                that.request.is_info = that.is_info;
                that.$axios.post(`${that.baseURL}sign_sms`,that.request).then((res) => {
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.timeFn();
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        timeFn(){
            var that = this;
            let timer = setInterval(() => {}, 1);
            for(let i=0;i<timer;i++){
                clearInterval(i)
            }
            that.codeText = 60;
            that.isGetCode = false;
            let time = setInterval(function() {
                that.codeText--;
                if (that.codeText <= 0) {
                    clearInterval(time);
                    that.isGetCode = true;
                    that.codeText = "获取验证码";
                }
            }, 1000);
        },
        chooseFn(flag){
            var that = this;
            that.valid_time = ['',''];//清空信用卡有效期
            for(var i in that.request){
                if(i == 'valid_time'){
                    that.request[i] = '';
                    continue;
                }
                that.request[i] = '';
            }
            if(flag == 'credit'){
                this.choose = false;
            }else{//借记卡
                this.choose = true;
            }
        },
        addInfo(){
            var that = this;
            if(that.choose){//借记卡
                that.request.card_type = '00';
            }else{//信用卡
                that.request.card_type = '02';
            }
            if(!that.request.id_no){//身份证号
                mui.alert("请输入身份证号","提示","确认","","div");
                return false;
            }else{
                var id_reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
                if(!id_reg.test(that.request.id_no)){
                    mui.alert("身份证号输入不正确","提示","确认","","div");
                    return false;
                }
            }
            if(!that.request.bank_no){//银行卡号
                mui.alert("请输入银行卡号","提示","确认","","div");
                return false;
            }
            if(!that.request.true_name){//开户行
                mui.alert("请输入开户行","提示","确认","","div");
                return false;
            }
            if(!that.request.mobile){
                mui.alert("请输入银行预留号码","提示","确认","","div");
                return false;
            }
            for(var i in that.request){
                if(i == 'valid_time' || i == 'cvv' || i == 'is_info' || i == 'sms_code'){
                    delete that.request[i];
                }
            }
            // 信用卡判断填写这些信息
            if(!that.choose){
                // 有效期
                if(that.request.valid_time[0] == '' || that.request.valid_time[1] == ''){
                    mui.alert("请输入有效期","提示","确认","","div");
                    return false;
                }else{
                    that.request.valid_time = that.valid_time.join('')
                }
                // 信用卡安全码
                if(!that.request.cvv){
                    mui.alert("请输入CVV2","提示","确认","","div");
                    return false;
                }
            }

            that.$axios.post(`${that.baseURL}apply_sign`,that.request).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.is_info = res.data.data.is_info;
                        that.codePhone = String(that.request.mobile).substr(0,3)+'****'+String(that.request.mobile).substr(7);
                        that.code = '';
                        that.showCode = true;
                        that.timeFn();
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                    }else if(res.data.code == 400){
                        mui.alert(res.data.msg,'提示','确认','','div');
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    data() {
        return {
            showTitle: {
                showBack: false, //显示后退按钮
                showLogo: 2, //不显示头部log
                showShare: "", //1搜索2分享
                showBg: true, //是否显示背景
                title: "支付",
                goBack: ""
            },
            choose:true,//true 借记卡 false 信用卡
            
            imgCvv2:false,imgDate:false,
            showCode:false,
            codePrice:'2000',
            code:'',//验证码
            isGetCode:true,
            codeText:'获取验证码',//获取验证码按钮文字显示
            codePhone:'',
            valid_time:['',''],//信用卡有效期
            is_info:'',
            request:{
                card_type:'',//类型
                id_no:'610524199601014567',//身份证号
                bank_no:'6212833600001427456',//银行卡号
                true_name:'1',//开户行
                mobile:'15615611111',//银行预留号码
                valid_time:'',
                cvv:'',//信用卡安全码
            },
        };
    }
};
</script>
<style lang="scss" scoped>
.allinpay-wrap {
    background: #ffffff;
    position: relative;
    .pay-tit {
        text-align: center;
        font-size: 0.24rem;
        color: #999999;
        font-style: italic;
        img {
            width: 2.94rem;
            height: 1.22rem;
        }
    }
    .pay-con{
        margin-top:.43rem;
        .pay-item{
            margin-bottom:.3rem;
            .item-left{
                margin-right:.48rem;
                font-size:.3rem;
                color:#333333;
                width:2.13rem;
                text-align:right;
            }
            .item-left,.item-right{
                display: inline-block;
                vertical-align: middle;
            }
            .item-right{
                .big-input{
                    width:4.13rem;
                    height: .6rem;
                }
                .center-input{
                    width:2.44rem;
                    height: .6rem;
                }
                .small-input{
                    width:.92rem;
                    height: .6rem;
                }
                .hint{
                    color:#ADADAD;
                    font-size:.2rem;
                    margin-top:.1rem;
                }
                .layer{
                    margin: 0 .25rem 0 .19rem;
                    color:#444444;
                    font-size:.2rem;
                }
                .show-legeng{
                    margin-left:.35rem;
                    color:#06B8C8;
                    font-size: .22rem;
                }
            }
            .choose-card{
                div{
                    display:inline-block;
                }
                img{
                    width:.35rem;
                    height:.35rem;
                    vertical-align: middle;
                }
                span{
                    font-size:.29rem;
                    vertical-align: middle;
                    display: inline-block;
                    margin: 0 .46rem 0 .12rem; 
                }
            }
            .id-card{
                margin-top:-.5rem;
            }

        }
    }
    .btn{
        width:5.18rem;
        // height:.67rem;
        font-size:.32rem;
        color:#F5F5F5;
        text-align:center;
        line-height: .67rem;
        margin: .5rem auto 0;
        background: url(../../../static/img/pay/btn.png) no-repeat;
        background-size:  5.18rem .67rem;
        
    }
    .pop{
        position: absolute;
        top:0;bottom:0;left:0;right:0;
        background:rgba(0,0,0,.7);
        z-index:2;
        .pop-img{
            width:4.2rem;
            height:2.6rem;
            position:absolute;
            top:calc(50% - 1.3rem);
            left:calc(50% - 2.1rem);
        }
    }
    .code-box{
        width:6.54rem;
        position: absolute;
        left:calc(50% - 3.27rem);
        // font-size:0;
        top:2rem;
        .code-tit{
            width:100%;
            height:1.45rem;
            color:#FFFFFF;
            text-align:center;
            border-top-left-radius: .05rem;
            border-top-right-radius: .05rem;
            background:url(../../../static/img/pay/code-tit-bg.png);
            background-size:6.54rem 1.45rem;
            .code-tit-top{
                font-size: .4rem;
                line-height: .8rem;
            }
            .code-tit-bot{
                font-size:.32rem;
            }
        }
        .code-con{
            background:#FFFFFF;
            padding-bottom:.7rem;
            border-bottom-left-radius: .05rem;
            border-bottom-right-radius: .05rem;
            padding-top:.56rem ;
            .code-price{
                color:#FF3735;
                font-size:.26rem;
                text-align: center;
                padding:0 0 .41rem;
                span{
                    font-size:.64rem;
                }
            }
            input{
                width:3.77rem;
                height:.89rem;
                margin: 0 .16rem 0 .3rem;
                vertical-align: middle;
            }
            .code-get-btn{
                width:2rem;line-height: .89rem;
                font-size:.32rem;
                text-align:center;
                display:inline-block;
                background:#ff4e3a;
                color:#FFFFFF;
                vertical-align: middle;
                border-radius: .02rem;
            }
            .code-hint{
                padding-left:.3rem;font-size:.24rem;color:#5E5E5E;line-height: .6rem;
            }
            .code-enter-btn{
                color:#FFFFFF;font-size:.32rem;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:5.22rem .89rem;border-radius: .02rem;margin-top:.8rem;
            }
        }
        .code-bot{
            margin-top:.6rem;
            text-align: center;
            img{
                width:.55rem;height:.55rem;
            }
        }
    }
    .btn-all{
        width:5.22rem;height:.89rem;text-align:center;line-height:.89rem;margin:0 auto;
    }
}
input{
    margin:0;
    font-size:.2rem;
    padding: 0 .1rem;
}
input::placeholder{
    color:#AAAAAA;
    font-size:.2rem;
}
</style>

