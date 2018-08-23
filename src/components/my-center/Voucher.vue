<template>
    <!-- 代金券 -->
    <div class="voucher-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="voucher-content">
            <div class="voucher-cell" v-for="item in voucherData">
                <div class="voucher-left" :class="item.is_past?'gray-border':'red-border'">
                    <div>
                        <span>￥</span><span class="v-price" v-text="item.price"></span>
                    </div>
                    <div>优惠券</div>
                </div>
                <div class="voucher-right" :class="item.is_past?'gray-color':'grey-color'">
                    <div class="v-title" v-text="item.v_title"  :class="item.is_past?'gray-color':'black-color'"></div>
                    <div class="v-des" v-text="item.v_des"></div>
                    <div class="v-time">
                        <span>有效期</span><span v-text="item.v_time"></span>
                    </div>
                </div>
                <img class="v-pastimg" v-if="item.is_past" src="../../../static/img/my-center/past.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'Voucher',
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
                        title:"代金券",
                    }
                },
                voucherData:[{
                    price:'15',
                    v_title:'抢购代金券',
                    v_des:'购买商品满1000元可以使用',
                    v_time:'2018-09-09',
                    is_past:false,//未过期
                },{
                    price:'15',
                    v_title:'抢购代金券',
                    v_des:'购买商品满1000元可以使用',
                    v_time:'2018-09-09',
                    is_past:true,//过期
                },{
                    price:'15',
                    v_title:'抢购代金券',
                    v_des:'购买商品满1000元可以使用',
                    v_time:'2018-09-09',
                    is_past:true,
                },{
                    price:'15',
                    v_title:'抢购代金券',
                    v_des:'购买商品满1000元可以使用',
                    v_time:'2018-09-09',
                    is_past:true,
                }]
            }
        }
    }
</script>
<style scoped>
    .voucher-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .voucher-content{
        padding:.2rem;
    }
    .voucher-cell{ 
        width:100%;
        height:1.83rem;
        background:url(../../../static/img/my-center/voucher_bg.png) no-repeat;
        background-size:120% 2rem;
        background-position: -1rem 0;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .voucher-left{
        display:inline-block;
        width:1.93rem;
        text-align: center;
        font-size:.24rem;
        border-right:.01rem dashed #DCDCDC;
        height:100%;
        vertical-align: top;
        padding-top:.5rem;
    }
    .voucher-right{
        display:inline-block;
        font-size:.24rem;
        padding:.3rem 0 0 .3rem;
        margin-right:.5rem;
    }

    .v-price{
        font-size:.38rem;
    }
    .v-title{
        font-size:.28rem;
    }
    .grey-color{
        color:#666666;
    }
    .black-color{
        color:#333333;
    }
    .gray-color{
        color:#999999;
    }
    .gray-border{
        color:#999999;
        border-bottom:.04rem solid  #CDCDCD;
    }
    .red-border{
        color:#FE7649;
        border-bottom:.04rem solid  #FE7649;
    }
    .v-pastimg{
        width:1.04rem;
        height:1.04rem;
    }
</style>
