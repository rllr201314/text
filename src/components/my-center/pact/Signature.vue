<template>
    <!-- 电子合同 -->
    <div class="signature-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="signature-content">
            <div class="signature-title">共2份合同待签署</div>
            <div class="signature-cell" v-for="item in signatureData">
                <div class="left-cell">
                    <img src="../../../../static/img/my-center/signature.png" alt="">
                </div>
                <div class="right-cell">
                    <div class="right-top">
                        <span v-text="item.type"></span>
                        <span class="time gray-color" v-text="item.time"></span>
                    </div>
                    <div class="right-bot">
                        <img src="../../../../static/img/my-center/write.png" alt="">
                        <span class="gray-color" v-text="item.company"></span>
                        <span class="sian-type" v-text="item.signType"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Signature",
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
                    title: "需要我签名"
                }
            },
            signatureData:[{
                type:'网络虚拟财产转让合同(卖家签)',
                time:'2019-09-10',
                company:'杭州古都科技有限公司灵石县分公司',
                signType:'待签署',
            },{
                type:'网络虚拟财产转让合同(卖家签)',
                time:'2019-09-10',
                company:'杭州古都科技有限公司灵石县分公司',
                signType:'待签署',
            },{
                type:'网络虚拟财产转让合同(卖家签)',
                time:'2019-09-10',
                company:'杭州古都科技有限公司灵石县分公司',
                signType:'待签署',
            },{
                type:'网络虚拟财产转让合同(卖家签)',
                time:'2019-09-10',
                company:'杭州古都科技有限公司灵石县分公司',
                signType:'待签署',
            }]
        };
    }
};
</script>
<style scoped>
.signature-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.signature-content {
    padding: 0.2rem;
}
.signature-title{
    font-size:.28rem;
    color:#333333;
    line-height:.5rem;
}
.signature-cell {
    line-height: .4rem;
    font-size:.24rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin:.1rem 0 .2rem;
    padding:.2rem;
}

.gray-color{
    color:#999999;
}
.left-cell,.right-cell{
    display: inline-block;
    vertical-align: middle;
}
.right-cell{
    width:calc(100% - 0.8rem);
}
.left-cell img{
    width:.52rem;
    height:.6rem;
    margin-right:.2rem;
}
.right-top{
    font-size:.26rem;
    color:#333333;
    position: relative;
}
.time{
    font-size:.24rem;
    position: absolute;
    top:0;
    right:0;
}
.right-bot{
    position: relative;
}
.right-bot img{
    width:.24rem;
    height:.23rem;
    vertical-align: middle;
}
.right-bot span{
    vertical-align: middle;
}
.sian-type{
    font-size:.2rem;
    line-height: .2rem;
    color:#ffffff;
    background:#FF5E5E;
    padding:.02rem;
    position: absolute;
    top:.1rem;
    right:0;
}
</style>
