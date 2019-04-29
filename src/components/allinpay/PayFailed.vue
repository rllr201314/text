<template>
    <div class="allinpay-wrap wrap grey-bg">
        <Header :showTitle="showTitle"></Header>
        <div class="pay-call defeat_box">
            <div class="cause-box">
                <img class="call-img" src="../../../static/img/pay/defeat.png" alt="支付失败">
                <div>支付失败</div>
                <div class="cause">失败原因：交易无效，无法完成，支付失败，您的银行卡余额不足</div>
            </div>
            <div class="btn-all pay-enter-btn">重新支付</div>
            <div class="btn-all btn-out" @click="goPath('out')">退出</div>
        </div>
        
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "AllinpayFailed",
    components: {
        Header
    },
    watch:{
    },
    methods:{
        goPath(flag){
            if(flag == 'out'){
                this.$router.push({path:'/'});
            }
        }
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
        };
    }
};
</script>
<style lang="scss" scoped>
.allinpay-wrap {
    background: #ffffff;
    .pay-call{
        text-align: center;
        .call-img{
            width:2.14rem;
            height:1.61rem;
        }
    }
    .defeat_box{
        .call-img{
            margin:.3rem 0;
        }
        .cause-box{
            width:6.28rem;
            background:#ffffff;
            border-radius:.1rem;margin: .55rem auto 0;
            font-size:.3rem;color:#444444;
            padding-bottom:.68rem;
        }
        .cause{
            width:3.85rem;margin:.45rem auto 0;font-size:.24rem;
        }
    }
    .btn-all{
        width:5.22rem;height:.89rem;text-align:center;line-height:.89rem;margin:0 auto;

    }
    .pay-enter-btn{
        color:#FFFFFF;font-size:.36rem;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:5.22rem .89rem;border-radius: .02rem;margin-top:.7rem;
    }
    .btn-out{
        margin-top:.3rem;border:1px solid #ff4e3a;font-size:.36rem;
    }
   
}
.grey-bg{
    background:#F8F8F8;
}
</style>

