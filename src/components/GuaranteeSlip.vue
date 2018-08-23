<template>
    <!-- 电子保单 -->
    <div class="guaranteeslip-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="guaranteeslip-con">
            <div class="guaran-tit">
                <img src="../../static/img/safe.png" alt="">
            </div>
            <div class="guaran-cell">
                <div class="cell-tit">
                    <span class="red-color">保单基本信息</span>
                    <span class="guBtn">申请理赔</span>
                </div>
                <div class="cell-con">
                    <div class="cell-strip">
                        <span class="left-strip">保单号</span>
                        <span class="right-strip" v-text="slipData.num"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">产品名称</span>
                        <span class="right-strip" v-text="slipData.productName"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">投保时间</span>
                        <span class="right-strip" v-text="slipData.time"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">保单状态</span>
                        <span class="right-strip" v-text="slipData.status"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">保险期限</span>
                        <span class="right-strip" v-text="slipData.dateSlip"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">受益人</span>
                        <span class="right-strip" v-text="slipData.userName"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">联系电话</span>
                        <span class="right-strip" v-text="slipData.phone"></span>
                    </div>
                </div>
            </div>
            <div class="guaran-cell">
                <div class="cell-tit">
                    <span class="red-color">商品信息</span>
                </div>
                <div class="cell-con">
                    <div class="cell-strip">
                        <span class="left-strip">保险金额</span>
                        <span class="right-strip" v-text="goodsData.insurance"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">免赔额</span>
                        <span class="right-strip" v-text="goodsData.excess"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">投保支付费用</span>
                        <span class="right-strip" v-text="goodsData.defrayment"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "GuaranteeSlip",
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
                    title: "电子保单"
                }
            },
            slipData:{
                num:'KGH00000000000',
                productName:'网络虚拟财产保险',
                time:'订单时间+1天】至【订单时间+366天】',
                status:'出单成功',
                dateSlip:'中国人保财险与杭州古都科技有限公司打散后发的是佛啊说撒的佛奥德赛后is阿道夫哦is啊哈地方',
                userName:'hhhh',
                phone:'12345678'
            },
            goodsData:{
                insurance:'￥34567',
                excess:'每次事故绝对免赔额为200元或10%，两者以高者为准。',
                defrayment:'【总额的8%】元',
            }
        };
    }
};
</script>
<style scoped>
.guaranteeslip-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.guaranteeslip-con{
    padding:.2rem;
}
.guaran-tit {
    width: 3.57rem;
    height: 0.53rem;
    margin-bottom:.15rem;
}
.guaran-tit img {
    width: 3.57rem;
    height: 0.53rem;
}
.guaran-cell{
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding-left:.2rem;
}
.cell-tit{
    line-height: .7rem;
    font-size:.28rem;
    position: relative;
    border-bottom:1px solid #E5E5E5;
}
.red-color{
    color:#FE7649;
}
.guBtn{
    display: inline-block;
    width:1.1rem;
    height:.44rem;
    line-height:.44rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    text-align:center;
    color:#ffffff;
    background:#C6C6C6;
    font-size:.22rem;
    position: absolute;
    top:calc(50% - 0.22rem);
    right:.2rem;
}

.cell-con{
    padding:.2rem 0;
    font-size:.26rem;
}
.cell-strip{
    line-height: .45rem;
}
.cell-strip span{
    display: inline-block;
}
.left-strip{
    width:1.7rem;
    color:#666666;
}
.right-strip{
    vertical-align: top;
    width:calc(100% - 2rem);
    color:#333333;
}
</style>
