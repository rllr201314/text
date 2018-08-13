<template>
    <div class="goods-info-wrap ">
        <div class="goods-info-top">
            <img src="../../../static/img/goodscreen/vertical.png" alt="">
            <span v-if="orderInfo.order_type == 1">商品详情</span>
            <span v-if="orderInfo.order_type == 2">订单详情</span>
        </div>
        <div class="goods-info-content">
            <img src="../../../static/img/mh_ico.png" alt="">
            <div class="goods-info">
                <div class="goods-info-title" v-text="orderInfo.order_title"></div>
                <div class="goods-info-left">
                    <div class="text-left">系统</div>
                    <div class="text-left">等级</div>
                    <div class="text-left">门派</div>
                    <div class="text-left">商品类型</div> 
                    <div class="text-left">账号绑定</div>
                </div>
                <div class="goods-info-right">
                    <div class="text-right" v-for="item in orderInfo.order_des" v-text="item"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'OrderInfo',
        props:['orderInfo'],
    }
</script>
<style scoped>
    .goods-info-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .goods-info-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    
    .goods-info-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .goods-info-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
     .goods-info-content{
        padding:.2rem 0;
        font-size:.26rem;
        color:#666666;
    }
    .goods-info-content img{
        width:1.1rem;
        height:1.1rem;
        margin:0 .6rem 0 .35rem;
        vertical-align: middle;
    }
    .goods-info{
        display:inline-block;
        width:4.8rem;
        vertical-align: middle;
    }
    .goods-info-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:#333333;
        margin-bottom:.15rem;
    }
    .goods-info-left,.goods-info-right{
        display:inline-block;
        vertical-align: middle;
    }
    .goods-info-left div{
        margin-bottom:.1rem;
    }
    .goods-info-right div{
        margin-bottom:.1rem;
        color:#333333;
    }
    .goods-info-left{
        margin-right:.35rem;
    }
    .contact-content{
        padding-left: .2rem;
    }
</style>
