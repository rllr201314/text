<template>
    <div class="insurance-wrap">
        <img src="../../../static/img/safe_cont.png" alt="">
        <div class="insurance-text">
            看个号携手PICC为您的游戏交易安全保驾护航
        </div>
    </div>
</template>

<script>
    export default {
        name: "InsuranceCell"
    }
</script>

<style scoped>
    .insurance-wrap{
        height:1.72rem;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        padding-top: .17rem;
    }
    .insurance-wrap img{
        width:2.71rem;
        height:1.31rem;
        vertical-align: middle;
    }
    .insurance-text{
        display:inline-block;
        width:55%;
        color:#333333;
        font-size:.24rem;
        vertical-align: middle;
    }
</style>