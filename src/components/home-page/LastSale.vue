<template>
    <div class="last-sale">
        <img class="sale-img" src="../../../static/img/deal_ico.png" alt="">
        <div class="sale-info">
            <div>
                <span class="last-text">近期成交</span>
                <span>累计安全交易{{num}}笔</span>
            </div>
            <div class="info-bottom">
                <span>【大话西游】</span>
                <span>xxxxxxx交易成功</span>
            </div>
        </div>
        <span class="lase-price">￥2000</span>
    </div>
</template>

<script>
    export default {
        name: "LastSale",
        data(){
            return {
                num:'1234'
            }
        }
    }
</script>

<style scoped>
    .last-sale{
        margin-bottom:.3rem;
    }
    .sale-img{
        width:.5rem;
        height: .56rem;
        margin-right: .27rem;
    }
    .last-text{
        color:#FC604E;
        font-size:.26rem;
        font-style: italic;
        margin-right: .15rem;
    }
    .sale-info{
        color:#666666;
        font-size: .24rem;
        display: inline-block;
    }
    .lase-price{
        color:#FC604E;
        font-size: .24rem;
        margin-top:0.4rem;
        float:right;
    }
</style>