<template>
    <div class="cbg-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="nav-tit" :class="nav_bg?'red-bg':'white-bg'">
            <div class="nav-btn" v-for="item in nav_data" v-text="item.name" @click="seleNav(item.value)" :class="item.isclick?item.role:''"></div>
        </div>
        <div class="cbg-con">
            <div class="showbox" v-show="nav_data[0].isclick">
                <div class="explain-tit"></div>
                <div class="explain-con">
                    <div class="explain-cell">
                        <div class="e-cell-tit small-tit-bg">分期方式</div>
                        <div class="e-cell-con">
                            <div class="black-color e-cell-con-tit">【月分期】定额还款，定期还完</div>
                            <div class="grey-color">1、首付不低于30%，利率每月5%</div>
                            <div class="grey-color">2、分期产生服务费8%（2000元封顶）</div>
                            <div class="grey-color">3、分期期数分为1期、3期、5期，可供选择</div>
                            <div class="black-color">【日分期】随借随还，不定期</div>
                            <div class="grey-color">1、首付不低于30%，利率每日0.3%</div>
                            <div class="grey-color">2、分期会产生服务费8%（2000元封顶）</div>
                            <div class="grey-color">3、分期期数不限，无还款定额限制，每月最低仅还利息</div>
                        </div>
                    </div>
                    <div class="explain-cell">
                        <div class="e-cell-tit big-tit-bg">逾期还款处理</div>
                        <div class="e-cell-con">
                            <div class="grey-color">1、到还款日无法还当月最低还款额的，每天会产生千分之五的滞纳金，直到还清为止；</div>
                            <div class="grey-color">2、日分期超过7天无法还款的，以及月分期超过15天无法还款的，平台将回收账号，账号会被变卖，变卖后所得款优先还平台的分期款、手续费、滞纳金等，付清后，余款打给分期买家。</div>
                        </div>
                    </div>
                    <div class="explain-cell">
                        <div class="e-cell-tit small-tit-bg">安全声明</div>
                        <div class="e-cell-con">
                            <div class="grey-color">凡是通过看个号平台分期购买的官方藏宝阁账号，平台不会做任何绑定，绝对保证是三无账号。当您的分期账单还款结束后，平台还会为您换绑您的所有个人信息。</div>
                        </div>
                    </div>
                    <div class="hint-info">
                        <div class="hint-tit">
                            <img src="../../../static/img/cbg/vertical.png" alt=""><span>补充说明</span>
                        </div>
                        <div class="gray-color">1、平台有权对分期账号进行定期盘查，在未还清余款之前不得变卖超出已支付价值的物品资产；</div>
                        <div class="gray-color">2、在还款期间，买家在游戏中禁止有违反网易游戏规定的言论。否则平台有权收回账号所有权。</div>
                        <div class="gray-color">3、买家不得有任何有损账号价值的行为，否则平台有权要求买家赔偿损失。</div>
                    </div>
                </div>
            </div>
            <div class="showbox box-con" v-show="nav_data[1].isclick">
                <div class="con-cell">
                    <div class="top-cell">
                        <div class="strip">
                            <span class="left-text">游戏分类</span>
                            <div class="right-strip">
                                <span class="grey-color">123</span>
                                <img src="../../../static/img/order/next.png" alt="">
                            </div>
                        </div>
                        <div class="strip">
                            <span class="left-text">联系电话</span>
                            <input type="number" class="place-inp" placeholder="请留下您的联系电话方便客服联系您">
                        </div>
                        <div class="strip">
                            <span class="left-text">微信</span>
                            <input type="text" class="place-inp" placeholder="请留下您的微信号码">
                        </div>
                        <div class="strip">
                            <span class="left-text">商品链接</span>
                            <input type="text" class="place-inp" placeholder="请输入您要办理分期的藏宝阁官方商品链接">
                        </div>
                        <div class="strip">
                            <span class="left-text">商品总价</span>
                            <input type="number" class="price-inp right-inp"><span class="black-color">元</span>
                        </div>
                        <div class="hint-strip">
                            <span class="left-text">选择分期方式</span>
                            <div class="right-cell">
                                <div class="right-box">
                                    <span @click="seleApplyStageFn('day')">
                                        <img class="check-img" :src="stage_opt?'./static/img/order/okcheck.png':'./static/img/order/nocheck.png'" alt="">
                                        <span class="black-color">日分期</span>
                                    </span>
                                    <span class="red-color">（随借随还、不分期）</span>
                                    <div class="message">推荐</div>
                                </div>
                                <div class="right-box">
                                    <span @click="seleApplyStageFn('month')">
                                        <img class="check-img" :src="stage_opt?'./static/img/order/nocheck.png':'./static/img/order/okcheck.png'" alt="">
                                        <span class="black-color">月分期</span>
                                    </span>
                                    <span class="red-color">（定额还款、定期还完）</span>
                                </div>
                            </div>
                            <div class="hint-box">
                                <div>首付30%以上，每月利息5%</div>
                                <span class="down-pay-tit">首付</span><input type="number" class="price-inp">元
                                <div>每月最低需还：<span class="black-color">本金+利息</span></div>
                                <div class="periods-box">
                                    期数：
                                    <span class="periods-str" v-for="item in periods_data" @click="selePeriodsFn(item.value)">
                                        <img class="check-img" :src="item.isclick?'./static/img/order/okcheck.png':'./static/img/order/nocheck.png'" alt="">
                                        <span v-text="item.name"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="apply-btn" @click="showHintFn">申请办理分期</div>
                    <div class="flow">
                        <div class="flow-title">分期流程</div>
                        <div class="flow-con">
                            <div class="flow-vertical"></div>
                            <div class="flow-strip">
                                <div class="left-flow">1</div>
                                <div class="right-flow">
                                    <div class="r-flow-tit">提交账号，申请分期</div>
                                    <div class="r-flow-text">将您在网易藏宝阁所选的账号信息提交给平台客服，客服对您提交的账号信息进行审核。</div>
                                </div>
                            </div>
                            <div class="flow-strip">
                                <div class="left-flow">2</div>
                                <div class="right-flow">
                                    <div class="r-flow-tit">确认分期信息</div>
                                    <div class="r-flow-text">客服与您核对交易信息，双方确认后可进行下一步</div>
                                </div>
                            </div>
                            <div class="flow-strip">
                                <div class="left-flow">3</div>
                                <div class="right-flow">
                                    <div class="r-flow-tit">支付首付，正式签约</div>
                                    <div class="r-flow-text">客服将引导您下单，支付首付，即可签署分期协议。</div>
                                </div>
                            </div>
                            <div class="flow-strip">
                                <div class="left-flow">4</div>
                                <div class="right-flow">
                                    <div class="r-flow-tit">账号采购</div>
                                    <div class="r-flow-text">签约后，看个号会为您采购您选中的藏宝阁账号。</div>
                                </div>
                            </div>
                            <div class="flow-strip">
                                <div class="left-flow">5</div>
                                <div class="right-flow">
                                    <div class="r-flow-tit">确认收货</div>
                                    <div class="r-flow-text">请您确认收货，然后尽情体验吧！</div>
                                </div>
                            </div>
                            <div class="flow-strip">
                                <div class="left-flow">6</div>
                                <div class="right-flow">
                                    <div class="r-flow-tit">交易完成</div>
                                    <div class="r-flow-text">完成交易流程，如有任何问题欢迎咨询客服！</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="showbox box-con" v-show="nav_data[2].isclick">
                <div class="con-cell calputer">
                    <div class="sele-table">
                        <span class="tab-btn" v-for="item in stage_tab" v-text="item.name" :class="item.isclick?'orange-bg':'orange-color'" @click="seleCountTag(item.value)"></span>
                    </div>
                    <div class="calputer-con">
                        <div class="calputer-left">
                            <div class="calputer-str">
                                <span class="left-text">商品总价</span>
                                <input type="text" class="right-inp"><span class="calputer-text">元</span>
                            </div>
                            <div class="calputer-str">
                                <span class="left-text">首付比例</span>
                                <input type="text" class="right-inp"><span class="calputer-text">%</span>
                            </div>
                            <div class="calputer-str">
                                <span class="left-text">期数</span>
                                <div class="sele-periods" @click="showCountPeriodsFn">
                                    <span v-text="count_periods"></span><img src="../../../static/img/goodscreen/downsolid.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="calputer-right">计算</div>
                    </div>
                    <div class="calputer-bot">
                        12312313
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹出 期数 选择框 -->
        <div class="pop-view" v-show="show_count_per">
            <div class="pop-periods-str" v-for="item in count_periods_data" @click="seleCountPeriodsFn(item.value)">
                <img class="check-img" :src="item.isclick?'./static/img/order/okcheck.png':'./static/img/order/nocheck.png'" alt="">
                <span v-text="item.name"></span>
            </div>
        </div>
        <!-- 点击申请显示 -->
        <div class="pop-view pop-apply" v-show="apply_hint">
            分期申请提交成功，我们会尽快为您审核。稍后会有短信提醒，请您注意查收
            <div class="okbtn" @click="goApplyFn">确认</div>
        </div>
        <div class="shade" v-show="apply_hint || show_count_per"></div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "CbgStage",
    components: {
        Header
    },
    data() {
        return {
            showTitle: {
                showBack: false, //显示后退按钮
                showLogo: 2, //不显示头部log
                showShare: 3, //1搜索2分享
                showBg: true, //是否显示背景
                title: "藏宝阁分期",
                goBack: ""
            },
            nav_bg: true,
            nav_data: [
                {
                    name: "分期说明",
                    value: 1,
                    isclick: true,
                    role: "black-border"
                },
                {
                    name: "我要分期",
                    value: 2,
                    isclick: false,
                    role: "red-border"
                },
                {
                    name: "分期计算器",
                    value: 3,
                    isclick: false,
                    role: "red-border"
                }
            ],
            periods_data: [
                {
                    name: "1期",
                    value: 1,
                    isclick: true
                },
                {
                    name: "2期",
                    value: 2,
                    isclick: false
                },
                {
                    name: "3期",
                    value: 3,
                    isclick: false
                }
            ],
            stage_tab: [
                {
                    name: "月分期",
                    value: 1,
                    isclick: true
                },
                {
                    name: "日分期",
                    value: 2,
                    isclick: false
                }
            ],
            stage_opt:true,//true 日分期 false 月分期
            count_periods:'不限期',
            apply_hint:false,
            count_periods_data:[{
                name:'5期',
                value:1,
                isclick:false,
            },{
                name:'3期',
                value:2,
                isclick:false,
            },{
                name:'1期',
                value:3,
                isclick:false,
            }],
            show_count_per:false,

        };
    },
    methods: {
        seleNav(val) {
            var that = this;
            var data = that.nav_data;
            if (val == 1) {
                this.nav_bg = true;
            } else {
                this.nav_bg = false;
            }
            for (var i in data) {
                if (data[i].value == val) {
                    data[i].isclick = true;
                    continue;
                }
                data[i].isclick = false;
            }
        },
        // 申请分期选择分期方式
        seleApplyStageFn(opt){
            var that = this;
            if(opt == 'day'){
                that.stage_opt = true;
            }else{
                that.stage_opt = false;
            }
        },
        // 选择期数
        selePeriodsFn(val){
            var that_d = this.periods_data;
            for(var i in that_d){
                if(val == that_d[i].value){
                    that_d[i].isclick = true;
                    continue;
                }
                that_d[i].isclick = false;
            }
        },
        // 显示申请分期提示
        showHintFn(){
            this.apply_hint = true;
        },
        // 分期
        goApplyFn(){
            this.apply_hint = false;
        },
        // 选择日分期还是月分期
        seleCountTag(val){
            var that_d = this.stage_tab;
            for(var i in that_d){
                if(val == that_d[i].value){
                    that_d[i].isclick = true;
                    continue;
                }
                that_d[i].isclick = false;
            }
        },
        // 显示计算期数弹框
        showCountPeriodsFn(){
            this.show_count_per = true;
        },
        // 选择计算期数
        seleCountPeriodsFn(val){
            var that = this;
            var that_d = this.count_periods_data;
            for(var i in that_d){
                if(val == that_d[i].value){
                    that_d[i].isclick = true;
                    that.count_periods = that_d[i].name;
                    that.show_count_per = false;
                    continue;
                }
                that_d[i].isclick = false;
            }
        },
    },
};
</script>

<style scoped>
/* .nav-tit {
    font-size:.26rem;
    position: fixed;
    top: 0.88rem;
    left: 0;
    right: 0;
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    line-height: 0.8rem;
} */
.nav-tit {
    font-size: 0.26rem;
    position: relative;
    top: 0.88rem;
    left: 0;
    right: 0;
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    line-height: 0.8rem;
    z-index: 2;
}
.red-bg {
    background: #ff5e4a;
}
.white-bg {
    background: #ffffff;
}
.nav-btn {
    width: 100%;
    text-align: center;
}
.cbg-con {
    /* padding-top:1.68rem; */
    padding-top: 0.88rem;
}
.explain-tit {
    width: 100%;
    height: 4rem;
    background: url(../../../static/img/cbg/cbg-banner.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: -0.88rem;
    z-index: 1;
}
.black-border {
    font-weight: bold;
    border-bottom: 0.04rem solid #333333;
}
.red-border {
    font-weight: bold;
    color: #ff7e4a;
    border-bottom: 0.04rem solid #ff7e4a;
}
.explain-con {
    padding: 0 0.2rem;
    position: relative;
    top: -1.65rem;
    z-index: 2;
}
.explain-cell {
    background: #ffffff;
    border-radius: 0.1rem;
    padding: 0.3rem 0;
    box-shadow: 3px 6px 9px 0px rgba(214, 214, 214, 0.35);
    margin-bottom: 0.2rem;
}
.e-cell-tit {
    text-align: center;
    color: #ff7e4a;
    font-size: 0.32rem;
    font-weight: 800;
    margin-bottom: 0.2rem;
    background: url(../../../static/img/cbg/tit-bg.png) no-repeat;
    background-position: center;
}
.big-tit-bg {
    background-size: 3rem 0.12rem;
}
.small-tit-bg {
    background-size: 2.05rem 0.1rem;
}
.e-cell-con {
    padding: 0 0.2rem;
}
.e-cell-con-tit {
    line-height: 0.7rem;
    font-weight: 500;
}
.black-color {
    color: #333333;
    font-size: 0.26rem;
}
.grey-color {
    color: #666666;
    font-size: 0.24rem;
    padding-left: 0.2rem;
}
.hint-info {
    padding-bottom: 0.3rem;
}
.hint-tit {
    color: #666666;
    font-size: 0.24rem;
}
.hint-tit img {
    width: 0.12rem;
    height: 0.3rem;
    vertical-align: middle;
    margin-right: 0.1rem;
}
.hint-tit span {
    vertical-align: middle;
}
.gray-color {
    color: #999999;
    font-size: 0.24rem;
}

.box-con {
    padding: 0.2rem;
}
.con-cell {
    background: #ffffff;
    border-radius: 0.1rem;
    box-shadow: 3px 6px 9px 0px rgba(214, 214, 214, 0.35);
    margin-bottom: 0.2rem;
}
.top-cell {
    padding-left: 0.2rem;
}
.strip {
    line-height: 0.9rem;
    padding-right: 0.2rem;
    border-bottom: 1px solid #e5e5e5;
}
.left-text {
    width: 1.2rem;
    color: #666666;
    font-size: 0.26rem;
    display: inline-block;
}
.right-strip {
    float: right;
}
.right-strip img {
    width: 0.11rem;
    height: 0.23rem;
    vertical-align: middle;
}
.place-inp {
    width: 5rem;
    margin: 0;
    padding: 0;
    border: 0;
}
.price-inp {
    width: 1.14rem;
    height: 0.42rem;
    margin: 0;
    padding: 0;
    margin-right: 0.1rem;
}
.hint-strip {
    padding: 0.25rem 0;
}
.right-cell {
    display: inline-block;
    vertical-align: top;
}
.right-box {
    margin-bottom: 0.1rem;
    position: relative;
}
.message {
    width: 0.53rem;
    height: 0.36rem;
    font-size: 0.2rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.3rem;
    display: inline-block;
    background: url(../../../static/img/cbg/message.png) no-repeat;
    background-size: 0.53rem 0.36rem;
    position: absolute;
    top: -0.15rem;
}
.check-img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}
.red-color {
    font-size: 0.24rem;
    color: #ff5e5e;
}
.hint-box {
    background: #f6f6f6;
    font-size: 0.24rem;
    color: #666666;
    padding: 0.2rem;
    margin-right: 0.2rem;
}
.hint-box div {
    line-height: 0.45rem;
}
.down-pay-tit{
    margin-right:.2rem;
}
.periods-str {
    margin: 0 0.27rem;
}
.periods-str span {
    vertical-align: middle;
}
.apply-btn {
    width: 6.6rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.28rem;
    color: #666666;
    border-radius: 0.15rem;
    border: 1px solid #aaaaaa;
    margin: 0.2rem auto;
}
.flow-title {
    text-align: center;
    color: #fe7649;
    font-size: 0.26rem;
    background: url(../../../static/img/board_mark.png) no-repeat;
    background-size: 1.48rem 0.21rem;
    background-position: center;
}
.flow-con {
    position: relative;
}
.flow-vertical {
    width: 1px;
    border-left: 1px dashed #fe7649;
    position: absolute;
    top: 0;
    left: 0.35rem;
    bottom: 0.5rem;
    z-index: 1;
}
.flow-strip {
    padding-left: 0.2rem;
}
.left-flow,
.right-flow {
    display: inline-block;
    vertical-align: top;
}
.left-flow {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 100%;
    text-align: center;
    font-size: 0.22rem;
    color: #ffffff;
    background: #fe7649;
    line-height: 0.3rem;
    /* margin:0 .23rem; */
    background: -webkit-linear-gradient(#fe7649, #ffcd7f);
    background: -o-linear-gradient(#fe7649, #ffcd7f);
    background: -moz-linear-gradient(#fe7649, #ffcd7f);
    background: linear-gradient(to right, #fe7649, #ffcd7f);
    position: relative;
    z-index: 2;
}
.right-flow {
    width: 6rem;
    font-size: 0.26rem;
    margin-left: 0.15rem;
}
.r-flow-tit {
    color: #333333;
    line-height: 0.3rem;
    margin-bottom: 0.02rem;
}
.r-flow-text {
    color: #999999;
    line-height: 0.43rem;
    margin-bottom: 0.05rem;
}

/* 分期计算器 */
.calputer {
    padding: 0.2rem;
    padding-right:0;
}
.sele-table {
    width: 4rem;
    height: 0.6rem;
    font-size: 0;
    margin: 0 auto;
    border-radius: 0.3rem;
    border: 2px solid #ff7e4a;
    overflow: hidden;
    display: flex;
}
.sele-table span {
    width: 100%;
    font-size: 0.26rem;
    display: inline-block;
    text-align: center;
    line-height: 0.6rem;
}
.orange-bg {
    background: #ff7e4a;
    color: #ffffff;
}
.orange-color {
    color: #ff7e4a;
}
.calputer-con{
    padding:.2rem;
}
.calputer-left,.calputer-right{
    display: inline-block;
    vertical-align: middle;
}
.calputer-right{
    width:1.12rem;
    height:.6rem;
    text-align:center;
    line-height: .6rem;
    color:#FE7649;
    font-size:.22rem;
    border:1px solid #FE7649;
    border-radius:.06rem;
}
.calputer-left{
    width:4rem;
}
.calputer-str{
    line-height: .9rem;
}
.calputer-str input{
    width:1.36rem;
    height:.6rem;
    margin:0;padding:0;
}
.calputer-text{
    margin-left:.2rem;
    font-size:.26rem;
    color:#333333;
}
.sele-periods{
    display: inline-block;
    font-size:.24rem;
    color:#333333;
    width:1.88rem;
    height:.6rem;
    text-align:center;
    border:1px solid #D2D2D2;
    border-radius: .06rem;
    line-height: .6rem;
}
.sele-periods img{
    width:.2rem;
    height: .1rem;
    margin-left:.3rem;
    vertical-align: middle;
}

.calputer-bot{
    border-top:1px solid #E5E5E5;
}

.pop-view{
    width:5rem;
    position:fixed;
    top:30%;
    left:calc(50% - 2.5rem);
    background:#ffffff;
    border-radius: .1rem;
    z-index:6;
}
.pop-apply{
    padding:.5rem .4rem .3rem;
    font-size:.24rem;
    color:#666666;
    text-align:center;
}
.okbtn{
    width:1.89rem;
    height:.6rem;border-radius: 30px;
    line-height: .6rem;
    color:#ffffff;
    margin:.2rem auto 0;
    background: -webkit-linear-gradient(#FC534A, #FD915F);
    background: -o-linear-gradient(#FC534A, #FD915F);
    background: -moz-linear-gradient(#FC534A, #FD915F);
    background: linear-gradient(to right, #FC534A, #FD915F);
}
.pop-periods-str{
    padding:.2rem;
}
.shade{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.5);
    z-index:5;
}

.right-inp{
    text-align: right;
}
input{
    font-size:.24rem;
}
/* placeholder */
::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #999999;
    font-size: 0.24rem;
}
:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #999999;
    font-size: 0.24rem;
}
</style>
