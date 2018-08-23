<template>
    <!-- 资产明细 -->
    <div class="assets-manage-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="manage-content">
            <div class="manage-cell assets-cell">
                <div class="detail-title">
                    <img src="../../../../static/img/my-center/asset_ico.png" alt="">
                    <span>收支明细</span>
                </div>
                <div class="detail-content">
                    <div class="price-title">可用余额</div>
                    <div class="price" v-text="assetsData.balance"></div>
                    <div class="deposit">提现</div>
                </div>
            </div>
            <div class="manage-cell">
                <div class="manage-strip">
                    <span class="manage-lefttext">提现冻结资金</span>
                    <div class="right-opt" >
                        <span>￥100元</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="manage-strip">
                    <span class="manage-lefttext">押金</span>
                    <div class="right-opt" >
                        <span>999999</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
            <div class="manage-cell">
                <div class="manage-strip">
                    <span class="manage-lefttext">银行卡设置</span>
                    <div class="right-opt" >
                        <span>未绑定</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="manage-strip">
                    <span class="manage-lefttext">我的代金券</span>
                    <div class="right-opt" >
                        <span>您有2张代金券可使用</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'AssetsManage',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                        title:"资产管理",
                    }
                },
                assetsData:{
                    balance:"￥999999",
                    

                }
            }
        }
    }
</script>
<style scoped>
    .assets-manage-wrap{
        max-width: 12rem;
        margin:0 auto;
    }
    .manage-content{
        padding:.2rem;
    }
    .manage-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding-left:.2rem;
    }
    .assets-cell{
        padding:0 0 .5rem 0;
    }
    .detail-title{
        color:#999999;
        font-size:.24rem;
        padding:.2rem;
    }
    .detail-title img{
        width:.21rem;
        height:.22rem;
        vertical-align: middle;
    }
    .detail-title span{
        vertical-align: middle;
    }
    .detail-content{
        text-align: center;
    }
    .price-title{
        color:#999999;
        font-size:.26rem;
    }
    .price{
        color:#333333;
        font-size:.46rem;
        margin-top:.1rem;
    }
    .deposit{
        width:1.1rem;
        line-height: .44rem;
        color:#FFFFFF;
        font-size:.22rem;
        background:#FE7649;
        margin:.17rem auto 0;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        -webkit-box-shadow: .01rem .01rem .09rem #FE7649;
        -moz-box-shadow: .01rem .01rem .09rem #FE7649;
        box-shadow: .01rem .01rem .09rem #FE7649;
    }


    .manage-strip{
        font-size:.26rem;
        color:#666666;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
        position: relative;
    }
    .manage-lefttext{
        margin-right:.1rem;
        line-height: .9rem;
        display: inline-block;
    }
    .right-opt{
        text-align: right;
        position: absolute;
        right:.2rem;
        top:0;
        line-height: .9rem;
        color:#333333;
    }
    .right-opt span{
        vertical-align: middle;
        margin-right:.18rem;
    }
    .right-opt img{
        width:.13rem;
        height:.24rem;
        margin-top:-.03rem;
        vertical-align: middle;
    }
</style>
