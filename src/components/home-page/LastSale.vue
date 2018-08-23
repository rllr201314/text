<template>
    <!-- 首页近期成交 -->
    <div class="flow-wrap">
        <div class="last-sale" v-show="flow.sale">
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
            <div class="lase-price">
                <span class="red-color">
                    ￥2000
                </span>
            </div>
        </div>
        <div class="safe-wrap"  v-show="flow.safe">
            <img class="sage-img" src="../../../static/img/safeguarg_ico.png" alt="">
            <div class="sale-info">
                <div>
                    <span class="last-text">保险理赔</span>
                </div>
                <div class="info-bottom">
                    <img src="../../../static/img/safe_ico.png" alt="">
                    <span>xxxxxxx交易成功</span>
                </div>
            </div>
            <div class="lase-price">
                <span>获得保险赔偿</span>
                <span  class="red-color">
                    ￥2000
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LastSale",
        props:['flow'],
        data(){
            return {
                num:'1234'
            }
        }
    }
</script>

<style scoped>
    .flow-wrap{
        margin-bottom:.3rem;
    }
    .last-sale,.safe-wrap{
        position: relative;
    }
    .sale-img{
        width:.5rem;
        height: .56rem;
        margin-right: .27rem;
    }
    .sage-img{
        
        width:.5rem;
        height: .64rem;
        margin-right: .27rem;
    }
    .last-text{
        color:#FC604E;
        font-size:.26rem;
        font-style: italic;
        font-weight: 501;
        margin-right: .15rem;
    }
    .sale-info{
        color:#666666;
        font-size: .24rem;
        display: inline-block;
    }
    .lase-price{
        font-size: .24rem;
        margin-top:0.4rem;
        color:#666666;
        position:absolute;
        right:0;
        bottom:0;
    }
    .red-color{
        color:#FC604E;
    }

    .info-bottom img{
        width:.26rem;
        height:.29rem;
        vertical-align: middle;
    }
    .info-bottom span{
        vertical-align: middle;
    }
</style>