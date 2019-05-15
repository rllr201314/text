<template>
    <div class="allinpay-wrap wrap">
        <Header :showTitle="showTitle"></Header>
        <div class="pay-call success_box">
            <img class="call-img" src="../../../static/img/pay/success.png" alt="支付成功">
            <div class="paid">
                已支付<span>￥<span v-text="success_paid"></span>元</span>
            </div>
            <div class="pay-enter-btn" @click="goPath('home')">返回首页</div>
            <div class="btn-out" @click="goPath('order')">查看订单</div>
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
    mounted(){
        this.success_paid = this.$route.query.sum;
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
    beforeRouteLeave(to,form,next){
        sessionStorage.removeItem('info');
        sessionStorage.removeItem('p_method')
        next();
    },
    data() {
        return {
            showTitle: {
                showBack: false, //显示后退按钮
                showLogo: 2, //不显示头部log
                showShare: "", //1搜索2分享
                showBg: true, //是否显示背景
                title: "支付",
                goBack: 1
            },
            success_paid:'',//成功支付
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
    .pay-enter-btn{
        width:5.41rem;height:1.04rem;line-height: .89rem;margin:0 auto;
        color:#FFFFFF;font-size:.24rem;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:5.41rem 1.04rem;border-radius: .02rem;margin-top:.7rem;
    }
    .btn-out{
        width:5.17rem;height:.75rem;color:#FE7649;line-height:.75rem;margin:.1rem auto 0;border:1px solid #FE7649;font-size:.24rem;border-radius: .15rem;
    }
    
}
</style>

