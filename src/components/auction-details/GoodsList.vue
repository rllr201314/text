<template>
    <div class="screen-goods-wrap">
        <div class="goods-strip" v-for="(item,index) in goodsList.goods_info">
            <div class="goods-strip-title">
                <div class="boutique" v-if="item.isBoutique">精</div>
                <div class="goods-type" v-text="item.goods_type"></div>
                <div class="account-type" v-text="item.account_type"></div>
                <div class="area" v-text="item.area"></div>
            </div>
            <div class="goods-strip-content">
                <div class="goods-des" v-text="item.goods_des"></div>
                <div class="goods-ico" v-if="goodsList.show_safe">
                    <img v-for="itemImg in item.goods_safe" :src="itemImg" alt="">
                </div>
            </div>
            <div class="goods-strip-bottom">
                <div class="goods-price" v-text="item.goods_price"></div>
                <div class="bargain" v-if="item.isBargain">可议价</div>
            </div>
        </div>
        <div class="more-info" v-if="!goodsList.show_safe">查看更多</div>
    </div>
</template>
<script>
    export default {
        name:'GoodsList',
        props:['goodsList']
    }
</script>
<style scoped>
    /* 商品列表 =======================================scroll*/
    .screen-goods-wrap{
        max-height: 10.55rem;
        overflow-y:scroll;
    }
    /* 单条商品 */
    .goods-strip{
        background:#FFFFFF;
        padding:.3rem .2rem;
        margin-bottom:.2rem;
    }
    /* 头部------ */
    .goods-strip-title{
        color:#FFFFFF;
        font-size:.24rem;
        line-height:.36rem;
        margin-bottom:.2rem;
    }
    /* 精品 */
    .boutique{
        text-align:center;
        background:#FE7649;
        width:.36rem;
        height:.36rem;
        display:inline-block;
        margin-right:.1rem;
    }
    .goods-type{
        text-align:center;
        width:.93rem;
        height: .36rem;
        background:-webkit-linear-gradient(#FEAB49,#FFCC4B);
        background:-o-linear-gradient(#FEAB49,#FFCC4B);
        background:-moz-linear-gradient(#FEAB49,#FFCC4B);
        background:linear-gradient(to right, #FEAB49 , #FFCC4B);
        display:inline-block;
        margin-right:.1rem;
    }
    .account-type{
        text-align:center;
        width:.7rem;
        height:.36rem;
        background:-webkit-linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        background:-o-linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        background:-moz-linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        background:linear-gradient(120deg,rgba(104,224,218,1),rgba(104,223,222,1),rgba(132,240,178,1),rgba(73,209,202,1));
        display:inline-block;
        margin-right:.1rem;
    }
    .area{
        font-size:.26rem;
        color:#999999;
        display:inline-block;
    }
    /* 详情 -- 保障*/
    .goods-strip-content{
        margin-bottom:.15rem;
    }
    .goods-des{
        width:5rem;
        overflow:hidden; /*超出的部分隐藏起来。*/ 
        white-space:nowrap;/*不显示的地方用省略号...代替*/
        text-overflow:ellipsis;/* 支持 IE */
        display:inline-block;
        font-size:.3rem;
        line-height:.31rem;
        color:#333333;
    }
    .goods-ico{
        float:right;
        text-align: right;
    }
    .goods-ico img{
        width:.36rem;
        height: .36rem;
        margin-left:.12rem;
    }
    /* 底部 价格 */
    .goods-strip-bottom div{
        display:inline-block;
    }
    .goods-price{
        font-size:.36rem;
        color:#FA5856;
        vertical-align: middle;
    }
    .bargain{
        width:.8rem;
        margin-left:.1rem;
        line-height: .35rem;
        text-align:center;
        font-size:.2rem;
        color:#999999;
        border: .01rem solid #B5B5B5;
        border-top-left-radius: .18rem;
        border-top-right-radius: .18rem;
        border-bottom-left-radius: .18rem;
        border-bottom-right-radius: .18rem;
        vertical-align: middle;
    }
    .more-info{
        line-height: .8rem;
        text-align:center;
        text-decoration: underline;
        font-size:.24rem;
        color:#999999;
    }
</style>

