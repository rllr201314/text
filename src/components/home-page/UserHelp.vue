<template>
    <div class="user-help">
        <div class="is-service">
            <img src="../../../static/img/eye_ico.png" alt="">
            <span>真假客服鉴定</span>
        </div>
        <div class="vertical"></div>
        <div class="consult">
            <img src="../../../static/img/dialog_ico.png" alt="">
            <span>在线咨询</span>
        </div>
        <div class="vertical"></div>
        <div class="sell">
            <img src="../../../static/img/sell_ico.png" alt="">
            <span>我要卖</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserHelp"
    }
</script>

<style scoped>
    .user-help{
        height: .7rem;
        color:#666666;
        font-size:.24rem;
        display: flex;
        justify-content: space-around;
        margin-bottom: .2rem;
        background:#FFFFFF;
    }
    .user-help div{
        margin: auto 0;
    }
    .user-help div span{
       vertical-align: middle;
    }
    .user-help div img{
         vertical-align: middle;
    }
    .is-service img{
        width:.35rem;
        height:.22rem;
    }
    .vertical{
        width:.02rem;
        height:.18rem;
        background:#B0B0B0;
        margin:auto 0;
    }
    .consult img{
        width:.28rem;
        height:.28rem;
    }
    .sell img{
        width:.26rem;
        height:.27rem;
    }
</style>