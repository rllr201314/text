<template>
    <!-- 安全认证之手机 -->
    <div class="safe-authentic-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="safe-authentic-tit">
            <img class="safe-status" src="../../../../static/img/my-center/safe/four.png" alt="">
        </div>
        <div class="safe-authentic-content">
            <div class="safe-cell success-content">
                <img src="../../../../static/img/my-center/safe/success.png" alt="">
                <div>恭喜您认证已通过</div>
                <div class="success" @click="goMycenter">完成</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SafeSuccess",
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
                    title: "安全认证"
                }
            }
        };
    },
    methods:{
        goMycenter(){
            this.$router.push({name:'MyCenter'})
        }
    }
};
</script>
<style scoped>
.safe-authentic-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top:.88rem;
}
.safe-authentic-content {
    padding: 0.2rem;
}
.safe-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left:.2rem;
    margin-bottom: 0.2rem;
}
.safe-authentic-tit {
    text-align: center;
    padding: 0.5rem 0 0.18rem;
}
.safe-status {
    width: 6.3rem;
    height: 1rem;
}
.success-content{
    text-align: center;
    font-size:.26rem;
    color:#666666;
    padding-bottom:2.8rem;
}
.success-content img{
    width:1.02rem;
    height: 1.02rem;
    margin:.9rem 0 .3rem;
}
.success{
    width:1.1rem;
    line-height:.44rem;
    background:#FE7649;
    font-size:.22rem;
    color:#ffffff;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0.02rem 0.02rem 0.09rem #FE7649;
    -moz-box-shadow: 0.02rem 0.02rem 0.09rem #FE7649;
    box-shadow: 0.02rem 0.02rem 0.09rem #FE7649;
    margin:.5rem auto 0;
}


</style>
