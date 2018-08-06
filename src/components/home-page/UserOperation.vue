<template>
    <div class="user-opera">
        <div class="cell user-account">
            <img src="../../../static/img/user_cont.png" alt="">
            <div>账号</div>
        </div>
        <div class="cell user-level">
            <img src="../../../static/img/game_level_ico.png" alt="">
            <div>代练</div>
        </div>
        <div class="cell user-stages">
            <img src="../../../static/img/stages_ico.png" alt="">
            <div>分期</div>
        </div>
        <div class="cell user-activity">
            <img src="../../../static/img/activity_ico.png" alt="">
            <div>活动</div>
        </div>
        <div class="cell user-sell">
            <img src="../../../static/img/sell_cont.png" alt="">
            <div>我要卖</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserOperation"
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