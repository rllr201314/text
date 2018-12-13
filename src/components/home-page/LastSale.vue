<template>
    <!-- 首页近期成交 -->
    <div class="flow-wrap">
        <div class="last-sale" v-if="flow.sale">
            <img class="sale-img" src="../../../static/img/deal_ico.png" alt="">
            <div class="sale-info">
                <div>
                    <span class="last-text">近期成交</span>
                    <span>累计安全交易<span v-text="flow.count_info"></span>笔</span>
                </div>
                <div class="info-bottom top-list">
                    <ul>
                        <li v-for="(item,index) in flow.order_info" :key="index" class="stript">
                            <span>【<span v-text="item.game_name"></span>】</span>
                            <span><span class="goods-title" v-text="item.goods_title"></span>交易成功</span>
                            <div class="lase-price">
                                <span class="red-color">￥<span v-text="Number(item.order_amount)"></span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="safe-wrap"  v-if="flow.safe">
            <img class="sage-img" src="../../../static/img/safeguarg_ico.png" alt="">
            <div class="sale-info">
                <div>
                    <span class="last-text">保险理赔</span>
                </div>
                <img class="safe-ico" src="../../../static/img/safe_ico.png" alt="">
                <div class="info-bottom bottom-list">
                    <ul>
                        <li v-for="(item,index) in flow.safe_info" :key="index" class="stript">
                            <span class="goods-title" v-text="item.goods_title"></span>
                             <div class="lase-price">
                                <span>获得保险赔偿</span>
                                <span  class="red-color">￥<span v-text="item.order_amount"></span></span>
                            </div>
                        </li>
                    </ul>
                </div>
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
            flag:false,
            list:[],
            makeTime:null,
            safeTime:null,
        }
    },
    methods:{
        timer(opj) {
            $(opj).find('ul').animate({
                marginTop: "-.4rem"
            }, 500, function () {
                $(this).css({
                    marginTop: "0rem"
                }).find("li:first").appendTo(this);
            })
        }
    },
    mounted(){
        var that = this;
        var time =setInterval(function(){
            if(that.flow.order_info){
                clearInterval(time);
                that.flag = true;
                // that.timer('.top-list');
                that.makeTime = setInterval(function(){
                    that.timer(".top-list");
                }, 3000)
            }
        },500);
        var time1 =setInterval(function(){
            if(that.flow.safe_info){
                clearInterval(time1);
                that.flag = true;
                that.safeTime = setInterval(function(){
                    that.timer(".bottom-list");
                }, 3000)
            }
        },500)
    },
    beforeDestroy(){
        clearInterval(this.makeTime);
        clearInterval(this.safeTime);
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
        vertical-align: middle;
    }
    .sage-img{
        width:.5rem;
        height: .64rem;
        margin-right: .27rem;
        vertical-align: middle;
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
        vertical-align: middle;
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
    .goods-title{
        display: inline-block;
        max-width:2rem;
        overflow: hidden;
        white-space:nowrap;/*不显示的地方用省略号...代替*/
        text-overflow:ellipsis;/* 支持 IE */
    }
    .safe-ico{
        width:.26rem;
        height:.29rem;
        vertical-align: middle;
    }
    .top-list,.bottom-list{
        width:6rem;
        height:.4rem;
        overflow: hidden;
    }
    .bottom-list{
        width:5.7rem;
        display: inline-block;vertical-align: middle;
    }
    .stript{
        position: relative;;
    }
    .top-list ul{
        padding: 0;
        list-style: none;
    }

    .top-list li{
        height: .4rem;
        line-height:.4rem;
    }
    .bottom-list ul{
        padding: 0;
        list-style: none;
    }
</style>