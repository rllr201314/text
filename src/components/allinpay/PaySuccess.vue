<template>
    <div class="allinpay-wrap wrap">
        <Header :showTitle="showTitle"></Header>
        <div class="pay-call success_box">
            <img class="call-img" src="../../../static/img/pay/success.png" alt="支付成功">
            <div class="paid">
                已支付<span>￥<span v-text="success_paid"></span>元</span>
            </div>
            <div class="btn-all pay-enter-btn" @click="goPath('home')">返回首页</div>
            <div class="btn-all btn-out" @click="goPath('order')">查看订单</div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "AllinpaySuccess",
    components: {
        Header
    },
    watch:{
    },
    methods:{
        goPath(flag){
            if(flag == 'home'){
                this.$router.push({path:'/'})
            }else{
                this.$router.push({path:'/buy-order'})
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
            success_paid:20000,//成功支付
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
    .success_box{
        .call-img{
            margin-top:.7rem;
        }
        .paid{
            margin-top:.4rem;
            font-size:.36rem;
            span{
                color:#FF3939;
            }
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
</style>

