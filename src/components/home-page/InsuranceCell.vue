<template>
    <!-- 保险 -->
    <div class="insurance-wrap">
        <img src="../../../static/img/safe_cont.png" alt="中国人民保险">
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
    }
    .insurance-wrap img{
        width:100%;
        height:100%;
    }
</style>