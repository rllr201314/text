<template>
    <div class="goods-info">
        <div class="goods-info-title" v-if="goodsInfo.isShowTitle">
            <img src="../../../static/img/goods_ico.png" alt="">
            <span>商品信息</span>
        </div>
         <div class="goods-info-content">
            <div class="goods-info-content-left">
                <div class="goods-basic-left">基本信息</div>
                <div class="goods-level-left">等级</div>
                <div class="goods-school-left">门派</div>
                <div class="goods-authent-left">实名认证</div> 
                <div class="goods-des-left">商品描述</div>
            </div>
            <div class="goods-info-content-right">
                <div class="goods-basic-right" v-text="goodsInfo.basic"></div>
                <div class="goods-level-right" v-text="goodsInfo.level"></div>
                <div class="goods-school-right" v-text="goodsInfo.school"></div>
                <div class="goods-authent-right" v-text="goodsInfo.authent"></div> 
                <div class="goods-des-right" v-text="goodsInfo.des"></div>
            </div>
        </div>                      
    </div>
</template>
<script>
    export default {
        name:'GoodInfo',
        props:['goodsInfo']
    }
</script>
<style scoped>
     /* 商品信息 */
    .goods-info{
        font-size:.26rem;
        padding:.2rem 0 .1rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .goods-info-title{
        color:#333333;
        margin-bottom: .2rem;
    }
    .goods-info-title img{
        width:.23rem;
        height:.23rem;
        vertical-align: middle;
    }
    .goods-info-title span{
        vertical-align: middle;
    }
    .goods-info-content{
        padding:0 .15rem .2rem; 
    }
    .goods-info-content-left,.goods-info-content-right{
        display:inline-block;
        vertical-align: top;
    }
    .goods-info-content-left{
        color:#666666;
        width:1.19rem;
        line-height: .43rem;
    }
    .goods-info-content-right{
        color:#333333;
        width:5.5rem;
        line-height: .43rem;
    }
</style>
