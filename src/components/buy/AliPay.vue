<template>
    <div class="pay-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="pay-content">
            <div class="tit">
                请使用支付宝扫码
            </div>
            <div class="con">
                <vue-qr :text="url" :size="210"></vue-qr>
                <div class="hint">
                    手机用户请保存图片，通过支付宝识别二维码
                </div>
            </div>
            <div class="fot">
                <img src="../../../static/img/alipay.png" alt="">
                <span>支付宝支付</span>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'//头部
import VueQr from 'vue-qr'
export default {
    name:'AliPay',
    components:{
        Header,
        VueQr
    },
    data(){
        return {
            showTitle:{
                showBack:false,//显示后退按钮
                showLogo:2,//不显示头部log
                showShare:3,//1搜索2分享
                showBg:true,//是否显示背景
                title:"支付宝支付",
            },
            url:'',
        }
    },
    mounted(){
         if(this.$route.query.url){
            this.url = this.$route.query.url;
        }else{
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.pay-wrap{
    max-width:12rem;
    margin:0 auto;
    padding-top:.88rem;
}
.pay-content{
    text-align:center;
}
.tit{
    color:#07A0F8;
    font-size:.76rem;
    line-height:1.3rem;
    background:#FFFFFF;
    /* font-weight:bold; */
    padding:1rem 0 .5rem;
}
.con{
    padding:.74rem 0 .59rem;
    background:#009BF4;
}
.hint{
    width:6rem;
    font-size:.38rem;
    line-height:.6rem;
    /* font-weight:bold; */
    margin:0 auto;
    color:#ffffff;
    padding-top:.57rem;
}
.fot{
    background:#ffffff;
    padding:.4rem 0 .6rem;
    color:#000000;
    font-size:.62rem;
}
.fot img{
    width:1rem;
    height:1rem;
    margin-right:.25rem;
    vertical-align: middle;
}
</style>
