<template>
    <div class="auction-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="swiper-info">
            <!--轮播图组件-->
            <Swiper></Swiper>
            <div class="auction-status-top auction-status-top-gray" v-if="goodsInfo.auction_status == 1 || goodsInfo.auction_status == 4" v-text="goodsInfo.auction_status_top_text"></div>
            <div class="auction-status-top auction-status-top-red" v-if="goodsInfo.auction_status == 2" v-text="goodsInfo.auction_status_top_text"></div>
            <div class="auction-status-top auction-status-top-green" v-if="goodsInfo.auction_status == 3" v-text="goodsInfo.auction_status_top_text"></div>
        </div>
        <div class="good-title-wrap">
            <div class="good-title">
                <div class="auction-ico">竞拍</div>
                <div class="good-title-text" v-text="goodsInfo.good_title"></div>
            </div>
            <div class="hint">
                <div class="left-hint">起拍价<span class="red-color" v-text="goodsInfo.start_price"></span>元</div>
                <div class="right-hint">加价≥<span class="red-color" v-text="goodsInfo.range_price"></span>/次</div>
            </div>
        </div>
        <div class="auction-content">
            <div class="auction-content-top">
                <div class="dynamic-title" @click="toLookInfo(1)">活动动态</div>
                <div class="goodinfo-title" @click="toLookInfo(2)">商品信息</div>
                <div class="flow-title" @click="toLookInfo(3)">拍卖流程</div>
            </div>
            <div class="auction-content-bottom">
                <!-- 活动动态 -->
                <div class="auction-info">
                    <div class="auction-info-strip" v-for="(item,index) in goodsInfo.auction_info">
                        <div class="userInfo" v-text="item.userPhone"></div>
                        <div class="raiseInfo">
                            <img :src="item.img_ico" alt="">
                            <span v-text="item.raise_info"></span>
                            <span class="green-color" v-text="item.success_status"></span>
                        </div>
                        <div class="timeBox" v-text="item.time"></div>
                    </div>
                </div>
                <!-- 商品信息 -->
                <div class="goods-info">
                    <div class="goods-info-title">
                        <img src="../../static/img/goods_ico.png" alt="">
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
                            <div class="goods-basic-right" v-text="goodsInfo.goods_info.basic"></div>
                            <div class="goods-level-right" v-text="goodsInfo.goods_info.level"></div>
                            <div class="goods-school-right" v-text="goodsInfo.goods_info.school"></div>
                            <div class="goods-authent-right" v-text="goodsInfo.goods_info.authent"></div> 
                            <div class="goods-des-right" v-text="goodsInfo.goods_info.des"></div>
                        </div>
                    </div>
                </div>
                <!-- 拍卖流程 -->
                <div class="auction-flow">
                    <div class="auction-flow-title">
                        <img src="../../static/img/auc_ico.png" alt="">
                        <span>拍卖流程</span>
                    </div>
                    <div class="auction-flow-content">
                        <div class="auction-flow-cell pay-deposit-cell">
                            <img src="../../static/img/pay_deposit_ico.png" alt="">
                            <div>支付押金</div>
                        </div>
                        <img class="arrow" src="../../static/img/arrow.png" alt="">
                        <div class="auction-flow-cell auction-cell">
                            <img src="../../static/img/auction_ico.png" alt="">
                            <div>竞拍</div>
                        </div>
                        <img class="arrow" src="../../static/img/arrow.png" alt="">
                        <div class="auction-flow-cell pay-cell">
                            <img src="../../static/img/pay_ico.png" alt="">
                            <div>支付/退押金</div>
                        </div>
                        <img class="arrow" src="../../static/img/arrow.png" alt="">
                        <div class="auction-flow-cell in-tie-cell">
                            <img src="../../static/img/in_tie_ico.png" alt="">
                            <div>换绑</div>
                        </div>
                        <img class="arrow" src="../../static/img/arrow.png" alt="">
                        <div class="auction-flow-cell trade-success-cell">
                            <img src="../../static/img/trade_success_ico.png" alt="">
                            <div>交易成功</div>
                        </div>
                    </div>
                </div>
                <!-- 活动规则 -->
                <div class="activity-info">
                    <div class="activity-info-title">
                        <span class="vertical"></span>
                        <span>活动规则</span>
                    </div>
                    <div class="activity-info-content">
                        <li>1.参与商品竞拍前，需要交纳竞拍该商品的押金</li>
                        <li>2.每次出价不得低于最低加价</li>
                        <li>3.活动截止后，以出价最高者作为最终成交人</li>
                        <li>4.成交后，押金将以成交价的形式扣除，多出的部分将予以退还</li>
                        <li>5.拍卖成功后未在要求时间内完成支付，押金则不退还，未拍卖成功者，均可申请押金退还</li>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div style="height:1rem"></div> -->
        <!--底部组件-->
        <Footer></Footer>
        <!--加价栏-->
        <div class="joinBox">
            <div class="join-left">
                <div class="join-left-top">当前价格<span class="red-color" v-text="goodsInfo.join_price"></span></div>
                <div class="join-num">竞拍次数<span v-text="goodsInfo.join_num"></span>次</div>
            </div>
            <div class="join-content">
                <div class="raise-price" v-if="goodsInfo.auction_status > 1 && goodsInfo.auction_status < 4">
                    <div class="raise-price-title">请输入加价金额(单位:元）</div>
                    <img src="../../static/img/sub_price.png" alt="" class="addbtn">
                    <input type="number">
                    <img src="../../static/img/add_price.png" alt="" class="addbtn">
                </div>
                <div class="raise-success" v-if="goodsInfo.auction_status == 4">恭喜您拍得该商品!</div>
            </div>
            <div class="join-right" :class="goodsInfo.auction_status == 1?'calcleBtn':'successBtn'" v-text="goodsInfo.auction_status_text"></div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/home-page/Header'//头部
    import Swiper from '@/components/home-page/Swiper'//轮播图
    import Footer from '@/components/home-page/Footer'//底部
    export default {
        name: "AuctionPage",
        data(){
            return {
                showTitle:{
                    showBack:false,
                    showLogo:2,//不显示头部log
                    showShare:2,//1搜索2分享
                    showBg:true,//是否显示背景
                    title:"梦幻西游竞拍活动",
                },
                goodsInfo:{
                    good_title:'方寸山100级神宠鲁班七号100级',
                    start_price:'￥100',
                    range_price:'￥50',
                    join_price:'￥500',
                    join_num:'100',
                    auction_status:4,//1是活动结束
                    auction_status_text:'',//活动状态显示的文字 mounted
                    auction_status_top_text:'',//活动状态轮播图定位显示文字
                    // 拍卖信息
                    auction_info:[{
                        userPhone:'用户123****4323',
                        img_ico:'./static/img/pet_ico.png',
                        raise_info:'+100元',
                        success_status:'成交',
                        time:'刚刚'
                    },{
                        userPhone:'用户123****4323',
                        img_ico:'./static/img/pet_ico.png',
                        raise_info:'+100元',
                        success_status:'',
                        time:'刚刚'
                    },{
                        userPhone:'用户123****4323',
                        img_ico:'./static/img/pet_ico.png',
                        raise_info:'+100元',
                        success_status:'成交',
                        time:'刚刚'
                    },{
                        userPhone:'用户123****4323',
                        img_ico:'./static/img/pet_ico.png',
                        raise_info:'+100元',
                        success_status:'成交',
                        time:'刚刚'
                    }],
                    goods_info:{
                        basic:'安卓一区>一区群英荟萃',
                        level:'96级',
                        school:'方寸山',
                        authent:'未认证',
                        des:`0841碧落九霄榜上战神女魔（三阶套全部13宝石 珍稀首发高敏吉人朱雀、
                        9开高闪击其白虎，满开击其成品龙马、高闪隐身果子、变色冰块，
                        熊猫头像、战神翅膀、青梅时装，豪华家园高灵修）注：此号全额担保品龙马、高闪隐。`
                    }
                }
            }
        },
        components:{
            Header,
            Swiper,//轮播图
            Footer,
        },
        mounted(){
            var auction_status = this.goodsInfo.auction_status;
            if(auction_status == 1){
                this.goodsInfo.auction_status_text = "活动结束";
                this.goodsInfo.auction_status_top_text = "活动结束"
            }else if(auction_status == 2){
                this.goodsInfo.auction_status_text = "我要参与"
                this.goodsInfo.auction_status_top_text = "未开始"
            }else if(auction_status == 3){
                this.goodsInfo.auction_status_text = "我要加价"
                this.goodsInfo.auction_status_top_text = "进行中"
            }else if(auction_status == 4){
                this.goodsInfo.auction_status_text = "支付"
                this.goodsInfo.auction_status_top_text = "活动结束"
            }
            //加载成功后给活动动态添加样式
            $('.dynamic-title').css({'border-bottom':'.04rem solid #FE7649','color':'#FE7649'});
        },
        methods:{
            toLookInfo(n){
                //1 == 活动动态
                if(n == 1){
                    var top = $('.auction-info').offset().top;
                    $(window).scrollTop(top);
                    $('.dynamic-title').css({'border-bottom':'.04rem solid #FE7649','color':'#FE7649'});
                    $('.goodinfo-title').css({'border-bottom':'','color':'#333333'});
                    $('.flow-title').css({'border-bottom':'','color':'#333333'});
                }else if(n == 2){//2 == 商品信息
                    var top = $('.goods-info').offset().top;
                    $(window).scrollTop(top);
                    $('.goodinfo-title').css({'border-bottom':'.04rem solid #FE7649','color':'#FE7649'});
                    $('.dynamic-title').css({'border-bottom':'','color':'#333333'});
                    $('.flow-title').css({'border-bottom':'','color':'#333333'});
                }else if(n == 3){//3 == 拍卖流程
                    var top = $('.auction-flow').offset().top;
                    $(window).scrollTop(top);
                    $('.flow-title').css({'border-bottom':'.04rem solid #FE7649','color':'#FE7649'});
                    $('.goodinfo-title').css({'border-bottom':'','color':'#333333'});
                    $('.dynamic-title').css({'border-bottom':'','color':'#333333'});
                }
            }
        }
    }
</script>

<style scoped>
    .auction-wrap{
        background:#f6f8fe;
        max-width:12rem;
        margin:0 auto;
    }
    .swiper-info{
        position: relative;
    }
    /* 商品头部状态 */
    .auction-status-top{
        width:.67rem;
        padding:0 .08rem;
        text-align: center;
        font-size:.28rem;
        color:#FFFFFF;
        background-repeat:no-repeat;
        position: absolute;
        top:0;
        right:.2rem;
        z-index: 99;
    }
    .auction-status-top-red{
        background-image:url(../../static/img/red_radius.png);
        background-size:.67rem 1.7rem;
        background-position: 100%;
    }
    .auction-status-top-green{
        background-image:url(../../static/img/green_radius.png);
        background-size:.67rem 1.7rem;
        background-position: 100%;
    }
    .auction-status-top-gray{
        background-image:url(../../static/img/gray_radius.png);
        background-size:.67rem 2rem;
        background-position: 100%;
    }
    /*商品标题*/
    .good-title-wrap{
        padding:0 .2rem;
        background:#FFFFFF;
        margin-bottom:.2rem;
    }
    .good-title{
        line-height:.88rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .good-title div{
        display: inline-block;
    }
    .auction-ico{
        background:#FE7649;
        color:#FFFFFF;
        font-size:.2rem;
        width:.71rem;
        line-height:.36rem;
        text-align: center;
        margin-right:.13rem;
        vertical-align: middle;
    }
    .good-title-text{
        color:#333333;
        font-size:.3rem;
        vertical-align: middle;
    }
    /*加价提示*/
    .hint{
        line-height:.69rem;
        font-size:.26rem;
        color:#666666;
    }
    .hint div{
        display: inline-block;
    }
    .red-color{
        color:#FE7649;
    }
    .left-hint{
        margin-right:.64rem;
    }
    /*商品信息=======wrap*/
    .auction-content{
        background:#FFFFFF;
    }
    /*头部*/
    .auction-content-top{
        font-size:.26rem;
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
        color:#333333;
        display:flex;
        justify-content: space-around;
    }
    /*----------------------------------------------------------锚点链接--------*/
    .dynamic-title{
        /*color:#FE7649;*/
        /*border-bottom:.04rem solid #FE7649;*/
    }
    /*信息----------部分*/
    .auction-content-bottom{
        padding:.2rem;
    }
    /*加价信息----块*/
    .auction-info{
        max-height:2.8rem;
        overflow-y:scroll;
        background:#F3F3F3;
        padding:.24rem .38rem 0 .22rem;
        -webkit-border-radius: .2rem;
        -moz-border-radius: .2rem;
        border-radius: .2rem;
        font-size:.26rem;
        color:#666666;
        margin-bottom: .2rem;
    }
    .auction-info .auction-info-strip:nth-last-child(1){
        margin-bottom:.2rem;
    }
    .auction-info-strip{
        margin-bottom:.41rem;
    }
    .userInfo{
        display:inline-block;
    }
    .raiseInfo{
        display:inline-block;
        margin-left:.95rem;
    }
    .timeBox{
        float:right;
    }
    .raiseInfo img{
        width:.27rem;
        height:.27rem;
        vertical-align: middle;
    }
    .raiseInfo span{
        vertical-align: middle;
    }
    .green-color{
        color:#45C773;
        font-size:.24rem;
    }
    /* 商品信息 */
    .goods-info{
        font-size:.26rem;
        padding:.2rem 0 .1rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .goods-info-title{
        color:#333333;
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
        color:#666666;
        padding:.2rem .15rem;
    }
    .goods-info-content-left,.goods-info-content-right{
        display:inline-block;
        vertical-align: top;
    }
    .goods-info-content-left{
        width:1.19rem;
    }
    .goods-info-content-right{
        width:5.5rem;
    }
    /* 拍卖流程------- */
    .auction-flow{
        padding:.3rem 0 .2rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .auction-flow-title{
        font-size:.26rem;
        color:#333333;
    }
    .auction-flow-title img{
        width:.27rem;
        height:.27rem;
        vertical-align: middle;
    }
    .auction-flow-title span{
        vertical-align: middle;
    }
    /* ------------------------------------------------------------------ */
    .auction-flow-content{
        display:flex;
        justify-content: space-between;
        padding-top:.3rem;
    }
    .auction-flow-content .arrow{
        width:.28rem;
        height:.24rem;
        margin-top:.1rem;
    }
    .auction-flow-cell{
        text-align: center;
        height: .91rem;
    }
    .auction-flow-cell div{
       font-size:.24rem;
       color:#FE7649;
    }
    .pay-deposit-cell img{
        width:.44rem;
        height:.44rem;
    }
    .auction-cell img{
        width:.4rem;
        height:.42rem;
        margin-bottom:.02rem;
    }
    .pay-cell img{
        width:.43rem;
        height:.4rem;
        margin-bottom:.04rem;
    }
    .in-tie-cell img{
        width:.53rem;
        height:.35rem;
        margin-bottom:.09rem;
    }   
    .trade-success-cell img{
        width:.5rem;
        height:.44rem;
    }
    /* 活动规则 */
    .activity-info{
        padding:.2rem 0;
    }
    .activity-info-title{
        font-size:.26rem;
        color:#666666;
    }
    .vertical{
        width:.04rem;
        height:.18rem;
        margin-right:.16rem;
        border-left:.04rem solid #666666;
    }
    .activity-info-content{
        width: 6.7rem;
        padding:.2rem .2rem 0;
        color:#999999;
        font-size:.26rem;
    }
    /*加价-------------*/
    .joinBox{
        background:#FFFFFF;
        height:1rem;
        text-align:center;
    }
    .joinBox:after{
        display: block;
        clear: both;
        content: "";
    }
    .join-left{
        vertical-align: top;
        font-size:.24rem;
        display:inline-block;
        width:1.9rem;
        height: 1rem;
        float:left;
    }
    .join-content{
        display:inline-block;
        font-size:.22rem;
        width:2.8rem;
        height: 1rem;
        text-align:center;
    }
    .raise-success{
        color:#666666;
        font-size:.26rem;
        line-height:1rem;
    }
    /*取消input type=number 取消上下按钮*/
    .raise-price input{
        width:1.1rem;
        height:.42rem;
        padding:0 .05rem;
        outline:none;
        border:.01rem solid #D2D2D2;
        vertical-align: middle;
        margin:0 .2rem;
    }
    .raise-price img{
        width:.29rem;
        height:.29rem;
        vertical-align: middle;
    }
    .raise-price input::-webkit-outer-spin-button,.raise-price input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}

    .join-right{
        vertical-align: top;
        display:inline-block;
        font-size:.3rem;
        color:#FFFFFF;
        text-align:center;
        width:2.18rem;
        line-height:1rem;
        height:1rem;
        float:right;
    }
    .calcleBtn{
        background:#B5B5B5;
    }
    .successBtn{
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
</style>