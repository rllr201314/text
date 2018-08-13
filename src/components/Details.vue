<template>
    <div class="goods-details-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>   
        <Swiper></Swiper>
        <!-- 商品标题 -->
        <div class="goods-details-title">
            <div class="goods-datails-title-top">
                <div class="title-boutique" v-if="goodsDetailsData.title.isBoutique">精</div>
                <div class="title-goods-type" v-text="goodsDetailsData.title.goods_type"></div>
                <div class="title-view-history">
                    <img src="../../static/img/goods-details/view_count_ico.png" alt="">
                    <span>浏览次数</span>
                    <span v-text="goodsDetailsData.title.view_num"></span>
                </div>
            </div>
            <div class="goods-datails-title-des" v-text="goodsDetailsData.title.goods_des"></div>
            <div class="goods-datails-title-bottom">
                <div class="title-goods-price" v-text="goodsDetailsData.title.goods_price"></div>
                <div class="title-sellNum" v-text="goodsDetailsData.title.goods_sellNum"></div>
            </div>
        </div>
        <!-- 卖家信息 -->
        <div class="seller-info">
            <img class="user-head-log" :src="goodsDetailsData.sellerInfo.sellerLog" alt="">
            <div class="seller-info-right">
                <div class="seller-right-top">
                    <div class="seller-name" v-text="goodsDetailsData.sellerInfo.sellername"></div>
                    <div class="seller-auth">
                        <img src="../../static/img/goods-details/Authentication_ico.png" alt="">
                        <span>已认证</span>
                    </div>
                    <div class="seller-gold">
                        <img src="../../static/img/goods-details/goldSellers_ico.png" alt="">
                        <span>金牌卖家</span>
                    </div>
                </div>
                <div class="seller-right-bottom">
                    <span>信誉积分</span><span v-text="goodsDetailsData.sellerInfo.credit"></span>
                </div>
            </div>
        </div>
        <!-- 服务保障 -->
        <div class="safe-info detail-info">
            <div class="info-left">服务保障</div>
            <div class="info-right safe-info-right">
                <img v-for="item in goodsDetailsData.safeInfo" v-if="item.isShow" :src="item.imgSrc" alt="">
            </div>
        </div>
        <!-- 账号绑定 -->
        <div class="accountBind-info detail-info">
            <div class="info-left">账号绑定</div>
            <div class="info-right">
                <div class="user-bind">
                    <img :src="goodsDetailsData.accountBind.userBind?'../../../static/img/goods-details/nobind_ico.png':'../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定身份证</span>
                </div>
                <div class="user-bind">
                    <img :src="goodsDetailsData.accountBind.phoneBind?'../../../static/img/goods-details/nobind_ico.png':'../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定手机</span>
                </div>
                <div class="user-bind">
                    <img :src="goodsDetailsData.accountBind.emailBind?'../../../static/img/goods-details/nobind_ico.png':'../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定邮箱</span>
                </div>
            </div>
        </div>
        <!-- 商品描述 -->
        <div class="goods-details-info">
            <GoodsInfo v-bind:goodsInfo="componentsData.goodsInfo"></GoodsInfo>
        </div>
        <!-- 视频看号 -->
        <div class="vedio-info">
            <div class="vedio-title">
                <div class="vedio-title-top"><span class="vertical"></span><span>视频看号</span></div>
                <div class="red-color">
                    为保证您的资产安全受平台保护，请勿联系视频中的个人联系方式
                </div>
            </div>
            <!-- iframe -->
            <div class="vedio-content">视频</div>
            <div class="vidio-bottom">
                <div :class="goodsDetailsData.safeOrflow.safe?'red-border':'black-border'" @click="cliflow('safe')">安全服务</div>
                <div :class="goodsDetailsData.safeOrflow.flow?'red-border':'black-border'" @click="cliflow('flow')">购买流程</div>
            </div>
            <div class="showBox">
                <div class="showBox-left" v-show="goodsDetailsData.safeOrflow.safe">
                    <div class="detail-user-opera">
                        <div class="cell user-contact">
                            <img src="../../static/img/goods-details/contact_ico.png" alt="">
                            <div>全程客服协助</div>
                        </div>
                        <div class="cell user-safety">
                            <img src="../../static/img/goods-details/safety_ico.png" alt="">
                            <div>付款安全保障</div>
                        </div>
                        <div class="cell user-Authentication">
                            <img src="../../static/img/goods-details/user_bind_ico.png" alt="">
                            <div>卖家身份认证</div>
                        </div>
                        <div class="cell user-settlement">
                            <img src="../../static/img/goods-details/settlement_ico.png" alt="">
                            <div>保险理赔</div>
                        </div>
                    </div>
                    <div class="go-verify">前往验证客服</div>
                    <div class="more-info">查看更多详情</div>
                </div>
                <div class="showBox-right" v-show="goodsDetailsData.safeOrflow.flow">
                    <div class="flow-left">
                        <img src="../../static/img/goods-details/flow.png" alt="">
                    </div>
                    <div class="flow-right">
                        <div class="flow-title">下单支付</div>
                        <div class="flow-content">支付成功，进入与 [联系发货客服] 聊天界面</div>
                        <div class="flow-title">等待发货</div>
                        <div class="flow-content">客服登录卖家账号，为买家发货。</div>
                        <div class="flow-content">部分游戏需要买家同时在线才能发货，</div>
                        <div class="flow-content">请保持在线并及时与发货客服沟通。</div>
                        <div class="flow-content red-color">重要：道具交易不使用QQ沟通，谨防骗子！</div>
                        <div class="flow-title">买家收货</div>
                        <div class="flow-content">在游戏内取货</div>
                        <div class="flow-title">确认收货</div>
                        <div class="flow-content">买家确认收货</div>
                        <div class="flow-title">交易成功</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="guess">
            <img src="../../static/img/goods-details/left_solid.png" alt=""><span>猜你喜欢</span><img src="../../static/img/goods-details/right_solid.png" alt="">
        </div>
        <!-- 商品列表 -->
        <GoodsList v-bind:goodsList="componentsData.goodsList"></GoodsList>
        <div class="goods-details-bottom">
            <div class="share goods-details-bottom-left">
                <img src="../../static/img/goods-details/share_ico.png" alt="">
                <div>分享</div>
            </div>
            <div class="collect goods-details-bottom-left" @click="collect()">
                <img :src="goodsDetailsData.isCollect?'./static/img/goods-details/ok_collect_ico.png':'./static/img/goods-details/no_collect_ico.png'" alt="">
                <div>收藏</div>
            </div>
            <div class="bargain goods-details-bottom-right">议价</div>
            <div class="buy goods-details-bottom-right">立即购买</div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import Swiper from '@/components/home-page/Swiper'
import GoodsInfo from '@/components/auction-details/GoodsInfo'//商品信息
import GoodsList from '@/components/auction-details/GoodsList'//商品信息

export default {
    name:'Details',
    data(){
        return {
            // 组件的数据
            componentsData:{
                // Header
                showTitle:{
                    showBack:false,//显示后退按钮
                    showLogo:2,//不显示头部log
                    showShare:3,//1搜索2分享
                    showBg:true,//是否显示背景
                    title:"商品详情",
                },
                // 商品列表
                goodsList:{
                    show_safe:false,
                    goods_info:[{
                        isBoutique:false,
                        goods_type:'成品号',
                        account_type:'安卓',
                        area:'安卓一区',
                        goods_des:'贵6小号可议价，手快有手慢无',
                        goods_safe:['./static/img/goodscreen/safe_ico.png','./static/img/goodscreen/stages_ico.png','./static/img/goodscreen/verify.png'],
                        goods_price:'￥600',
                        isBargain:true
                    },{
                        isBoutique:false,
                        goods_type:'成品号',
                        account_type:'安卓',
                        area:'安卓一区',
                        goods_des:'贵6小号可议价，手快有手慢无',
                        goods_safe:['./static/img/goodscreen/safe_ico.png','./static/img/goodscreen/stages_ico.png','./static/img/goodscreen/verify.png'],
                        goods_price:'￥600',
                        isBargain:true
                    },{
                        isBoutique:false,
                        goods_type:'成品号',
                        account_type:'安卓',
                        area:'安卓一区',
                        goods_des:'贵6小号可议价，手快有手慢无',
                        goods_safe:['./static/img/goodscreen/safe_ico.png','./static/img/goodscreen/stages_ico.png','./static/img/goodscreen/verify.png'],
                        goods_price:'￥600',
                        isBargain:true
                    }]
                },
                // 商品信息
                goodsInfo:{
                    isShowTitle:false,//是否显示商品信息头部
                    basic:'安卓一区>一区群英荟萃',
                    level:'96级',
                    school:'方寸山',
                    authent:'未认证',
                    des:`0841碧落九霄榜上战神女魔（三阶套全部13宝石 珍稀首发高敏吉人朱雀、
                        9开高闪击其白虎，满开击其成品龙马、高闪隐身果子、变色冰块，
                        熊猫头像、战神翅膀、青梅时装，豪华家园高灵修）注：此号全额担保品龙马、高闪隐。`
                }   
            },
            goodsDetailsData:{
                // 头部标题
                title:{
                    isBoutique:true,
                    goods_type:'成品号',//商品类型
                    view_num:'9999',//浏览次数
                    goods_des:'方寸山100级神宠鲁班七号100级的撒发的所发生的范德萨发第三方第三方第三方第三发大水发斯蒂芬发的说法第三发大水发斯蒂芬',
                    goods_price:'￥66666',
                    goods_sellNum:'首次出售'
                },
                // 卖家信息
                sellerInfo:{
                    sellerLog:'./static/img/goods-details/user_header.png',
                    sellername:"卖家909090",
                    credit:'2000',//信誉积分
                },
                // 服务保障
                safeInfo:[{
                    isShow:true,
                    imgSrc:'./static/img/goodscreen/safe_ico.png'
                },{
                    isShow:true,
                    imgSrc:'./static/img/goodscreen/stages_ico.png'
                },{
                    isShow:true,
                    imgSrc:'./static/img/goodscreen/verify.png'
                },{
                    isShow:true,
                    imgSrc:'./static/img/goodscreen/contract_ico.png'
                }],
                // 账号绑定
                accountBind:{
                    userBind:false,
                    phoneBind:true,
                    emailBind:true,
                },
                // 显示安全服务是购买流程
                safeOrflow:{
                    safe:true,
                    flow:false,
                },
                // 是否收藏
                isCollect:false
            }
        }
    },
    components:{
        Header,
        Swiper,
        GoodsInfo,//商品信息
        GoodsList,//商品列表

    },
    methods:{
        // 查看安全服务还是购买流程
        cliflow(flag){
            if(flag == 'safe'){
                this.goodsDetailsData.safeOrflow.safe = true;
                this.goodsDetailsData.safeOrflow.flow = false;
            }else if(flag == 'flow'){
                this.goodsDetailsData.safeOrflow.safe = false;
                this.goodsDetailsData.safeOrflow.flow = true;
            }
        },
        // 收藏
        collect(){
            this.goodsDetailsData.isCollect = !this.goodsDetailsData.isCollect;
        }
    } 
}
</script>
<style scoped>
    .goods-details-wrap{
        max-width: 12rem;
        margin:0 auto;
    }

    /* 商品标题 */
    .goods-details-title{
        background:#FFFFFF;
        padding:.26rem .2rem;
        margin-bottom:.2rem;
    }
    .goods-datails-title-top{
        color:#FFFFFF;
        font-size:.24rem;
        line-height:.36rem;
        margin-bottom:.2rem;
    }
    /* 精品 */
    .title-boutique{
        text-align:center;
        background:#FE7649;
        width:.36rem;
        height:.36rem;
        display:inline-block;
        margin-right:.1rem;
    }
    .title-goods-type{
        text-align:center;
        width:.93rem;
        height: .36rem;
        background:-webkit-linear-gradient(#FEAB49,#FFCC4B);
        background:-o-linear-gradient(#FEAB49,#FFCC4B);
        background:-moz-linear-gradient(#FEAB49,#FFCC4B);
        background:linear-gradient(to right, #FEAB49 , #FFCC4B);
        display:inline-block;
    }
    .title-view-history{
        color:#999999;
        float:right;
    }
    .title-view-history img{
        width:.39rem;
        height:.24rem;
        vertical-align: middle;
    }
    .title-view-history span{
        vertical-align: middle;
    }
    .goods-datails-title-des{
        width:6rem;
        margin-bottom:.15rem;
        overflow:hidden; /*超出的部分隐藏起来。*/ 
        white-space:nowrap;/*不显示的地方用省略号...代替*/
        text-overflow:ellipsis;/* 支持 IE */
        display:inline-block;
        font-size:.3rem;
        line-height:.31rem;
        color:#333333;
    }
    .goods-datails-title-bottom div{
        display:inline-block;
    }
    .title-goods-price{
        font-size:.36rem;
        color:#FA5856;
        vertical-align: middle;
    }
    .title-sellNum{
        font-size:.2rem;
        line-height:.35rem;
        padding:0 .1rem;
        color:#999999;
        border:0.01rem solid #B5B5B5;
        -webkit-border-radius: .18rem;
        -moz-border-radius: .18rem;
        border-radius: .18rem;
        vertical-align: middle;
    }
    /* 卖家信息 */
    .seller-info{
        padding:.26rem .2rem;
        margin-bottom:.2rem;
        background:#FFFFFF;
    }
    .user-head-log{
        width:.8rem;
        height:.8rem;
        margin-right:.19rem;
        vertical-align: middle;
    }
    .seller-info-right{
        display: inline-block;
        vertical-align: middle;
        font-size:.26rem;
        color:#666666;
    }
    .seller-right-top div{
        display: inline-block;
    }
    .seller-right-top img{
        width:.25rem;
        height:.25rem;
        vertical-align: middle;
    }
    
    .seller-right-top span{
        vertical-align: middle;
    }
    .seller-name{
        vertical-align: middle;
        font-size:.28rem;
        color:#333333;
        margin-right:.32rem;
    }
    .seller-right-bottom{
        margin-top:.17rem;

    }

    .detail-info{
        padding: 0 .15rem;
        background:#FFFFFF;
        font-size:.26rem;
        margin-bottom: .2rem;
        /* height:.9rem; */
    }
    .info-left{
        width:1.19rem;
        line-height: .9rem;
        color:#666666;
    }
    .info-right{
        width:5.5rem;
        color:#333333;
    }
    .detail-info div{
        display: inline-block;
    }
    /* 服务保障 */
    .safe-info-right{
        vertical-align: middle;
    }
    .safe-info-right img{
        width:.36rem;
        height:.36rem;
        margin-right:.14rem;
    }
    /* 账号绑定 */
    .user-bind img{
        width:.25rem;
        height:.27rem;
        /* vertical-align: middle; */
    }
    .user-bind{
        margin-right:.3rem;
    }
    /* .user-bind span{
        vertical-align: middle;
    } */
    /* 商品信息 */
    .goods-details-info{
        margin-bottom:.2rem;
        background: #FFFFFF;
    }

    /* 视频看号 */
    .vedio-info{
        padding: 0 .15rem;
        background:#FFFFFF;
        font-size:.26rem;
    }
    .vedio-title{
        padding:.2rem 0 .15rem;
        font-size:.24rem;
    }
    .vedio-title-top span{
        display: inline-block;
        font-size:.26rem;
        color:#333333;
    }
    .vertical{
        width:.05rem;
        background:#333333;
        height:.2rem;
        margin-right:.1rem;
    }
    .red-color{
        color:#FF7171;
    }
    .vedio-content{
        height:3.6rem;
        text-align: center;
        line-height: 3.6rem;
        font-size:.4rem;
    }
    /* 安全服务 */
    .vidio-bottom div{
        display:inline-block;
        width:49.2%;
        text-align: center;
        line-height: .8rem;
    }
    .red-border{
        color:#FF7E4A;
        border-bottom:.04rem solid #FF7E4A;
    }
    .black-border{
        color:#333333;
    }


    .showBox-left{
        margin-top:.3rem;
        text-align: center;
        padding-bottom:.2rem;
    }
    .showBox-left .detail-user-opera{
        display: flex;
        justify-content: space-around;
        background:#FFFFFF;
        height: 1.3rem;
        padding-top:.1rem;
        margin-bottom:.3rem;
    }
    .detail-user-opera .cell{
        color:#666666;
        font-size: .26rem;
        text-align: center;
        margin:auto 0;
    }
    /*  user-safety user-Authentication user-settlement */
    .user-contact img{
        width:.49rem;
        height:.51rem;
    }
    .user-safety img{
        width:.48rem;
        height:.55rem;
    }
    .user-Authentication img{
        width:.54rem;
        height:.52rem;
    }
    .user-settlement img{
        width:.5rem;
        height:.48rem;
    }
    .go-verify{
        width: 6.6rem;
        line-height:.8rem;
        color:#666666;
        font-size:.28rem;
        border:.01rem solid #AAAAAA;
        -webkit-border-radius: .15rem;
        -moz-border-radius: .15rem;
        border-radius: .15rem;
        margin:0 auto .2rem;
    }
    .more-info{
        color:#999999;
        font-size:.24rem;
        text-decoration: underline;
    }

    .showBox-right{
        padding-bottom:.2rem;
    }

    .flow-left img{
        width:.3rem;
        height:5.46rem;
    }
    .flow-left,.flow-right{
        display:inline-block;
        vertical-align: top;
    }
    .flow-left{
        width:.3rem;
        height:5.46rem;
        margin-right:.18rem;
    }
    .flow-right{
        height:5.46rem;
        font-size:.26rem;
        color:#999999;
    }
    .flow-title{
        color:#333333;
        margin-bottom: .02rem;
    }
    .flow-content{
        margin-bottom: .05rem;
    }
    /* 猜你喜欢 */
    .guess{
        text-align: center;
        line-height: .7rem;
    }
    .guess img{
        width:.55rem;
        height:.03rem;
        vertical-align: middle;
    }
    .guess span{
        display: inline-block;
        margin:0 .1rem;
        color:#999999;
        font-size:.24rem;
        vertical-align: middle;
    }

    .goods-details-bottom{
        height: 1rem;
        background:#FFFFFF;
        /* -webkit-box-shadow: 0 .2rem .1rem #A2A2A2;
        -moz-box-shadow: 0 .2rem .1rem #A2A2A2;
        box-shadow: 0 .2rem .1rem #A2A2A2; */
    }
    .goods-details-bottom::after{
        display: block;
        clear: both;
        content: "";
    }
    .goods-details-bottom-left,.goods-details-bottom-right{
        display:inline-block;
        text-align: center;
        float: left;
    }
    .goods-details-bottom-left{
        color:#999999;
        width:1.2rem;
        font-size:.24rem;
        padding-top:.1rem;
    }
    .goods-details-bottom-right{
        width:2.5rem;
        line-height: 1rem;
        color:#FFFFFF;
    }
    
    .share{
        border-right:.01rem solid #DCDCDC;
    }
    .share img{
        width:.43rem;
        height:.34rem;
    }
    .collect img{
        width:.4rem;
        height:.37rem;
    }

    .bargain{
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
    .buy{
        background: #FF5E5E;
    }
</style>



