<template>
    <!-- 导航栏 -->
    <div class="user-opera">
        <div class="cell user-account" @click="seleOpt('buy')">
            <img src="../../../static/img/user_cont.png" alt="">
            <div>账号</div>
        </div>
        <div class="cell user-level">
            <img src="../../../static/img/rent.png" alt="">
            <div>租号</div>
        </div>
        <div class="cell user-stages" @click="seleOpt('stage')"> 
            <img src="../../../static/img/stages_ico.png" alt="">
            <div>分期</div>
        </div>
        <div class="cell user-activity" @click="seleOpt('active')">
            <img src="../../../static/img/activity_ico.png" alt="">
            <div>活动</div>
        </div>
        <div class="cell user-sell" @click="seleOpt('sell')">
            <img src="../../../static/img/sell_cont.png" alt="">
            <div>我要卖</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserOperation",
        methods:{
            seleOpt(flag){
                var that = this;
                if(flag == 'buy'){
                    that.$router.push({name:'Buy'});
                    sessionStorage.buyOrsell = 1;
                }else if(flag == 'sell'){
                    that.$router.push({name:'Sell'});
                    sessionStorage.buyOrsell = 2;
                }else if(flag == 'active'){
                    // that.$router.push({name:'ActivePage'})
                    mui.toast('暂未开放',{ duration:'short', type:'div' });
                }else if(flag == 'stage'){
                    // if(that.$store.token){
                        that.$router.push({ name: "BillInstallment" });
                    // }else{
                    //     mui.toast('请先登录',{ duration:'short', type:'div' });
                    //     that.$router.push({name: 'AccountLogin'});
                    // }
                }
            }
        }
    }
</script>

<style scoped>
    .user-opera{
        width:100%;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: 6px 5px 9px #D6D6D6;
        -moz-box-shadow: 6px 5px 9px #D6D6D6;
        box-shadow: 6px 5px 9px #D6D6D6;
        display: flex;
        justify-content: space-around;
        background:#FFFFFF;
        margin-bottom:.3rem;
        height: 1.3rem;
        padding-top:.1rem;
    }
    .user-opera .cell{
        color:#333333;
        font-size: .26rem;
        text-align: center;
        margin:auto 0;
    }
    .user-account img{
        width:.52rem;
        height:.50rem;
    }
    .user-level img{
        width:.63rem;
        height:.5rem;
    }
    .user-stages img{
        width:.56rem;
        height:.5rem;
    }
    .user-activity img{
        width:.61rem;
        height:.5rem
    }
    .user-sell img{
        width:.51rem;
        height:.5rem;
    }
</style>