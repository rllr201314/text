<template>
    <div class="search-wrap wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="titInp">
            <img class="search-ico" src="../../../static/img/search_ico.png" alt="">
            <form @submit.prevent action="#">
                <input class="search-title" type="search" placeholder="请输入搜索内容" v-model.trim="request.content" @keyup.13="show()" ref="input1" @blur="out()">
            </form>
            <img class="empty-ico" src="../../../static/img/empty_ico.png" alt="" @click="emptyFun()">
        </div>
        <Screen @getData="getData" :param="param" ref="mychild"></Screen>
        <div class="goods-wrap" v-show="goodsList != ''?true:false">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="goods-strip" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.goods_id)">
                            <div class="goods-strip-top">
                                <div class="goods-strip-title">
                                    <div class="boutique" v-if="item.is_recommend == 1">精</div>
                                    <div class="title-ico rent-ico">租号</div>
                                    <div class="title-ico deal-ico" v-if="item.rent_method == 3">成品号</div>
                                    <div class="account-type" v-if="item.client_id == 1">安卓</div>
                                    <div class="account-ios" v-else-if="item.client_id == 2">苹果</div>
                                    <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                                    <div class="area" v-text="item.area_name"></div>
                                </div>
                                <div class="goods-strip-content">
                                    <div class="goods-des" v-text="item.goods_title"></div>
                                    <div class="goods-ico">
                                        <img v-if="item.is_safe == 1" src="../../../static/img/goodscreen/safe_ico.png" alt="">
                                        <img v-if="item.is_stage == 1" src="../../../static/img/goodscreen/stages_ico.png" alt="">
                                        <img v-if="item.is_check == 1" src="../../../static/img/goodscreen/verify.png" alt="">
                                        <img v-if="item.is_compact == 1" src="../../../static/img/goodscreen/contract_ico.png" alt="">
                                    </div>
                                    <div class="original-price" v-if="item.goods_price != 0"><span class="original-text">原价</span><span>￥</span><span v-text="item.goods_price"></span></div>
                                </div>
                                <div class="goods-strip-bottom">
                                    <div>
                                        <img src="../../../static/img/rent/rent-ico.png" alt="">
                                        <span>租金</span>
                                        <span class="red-color">￥</span><span class="goods_price" v-text="item.day_rent"></span>/<span v-text="item.rent_unit"></span>
                                    </div>
                                    <div>
                                        <img src="../../../static/img/rent/pledge-ico.png" alt="">
                                        <span>押金</span>
                                        <span>￥</span><span v-text="item.cash"></span>
                                    </div>
                                    <div>
                                        <img src="../../../static/img/rent/short-ico.png" alt="">
                                        <span>最短租期</span>
                                        <span v-text="item.least_lease"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="hint-bottom" v-text="item.goods_description"></div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <NoData class="nodata" v-show="goodsList !=''?false:true"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Screen from "@/components/rent/Screen";
import NoData from "@/components/multi/NoData";
export default {
    name: "RentSearch",
    components: {
        Header,
        Screen,
        NoData
    },
    data() {
        return {
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部inp
                showShare: 3, //1搜索2分享3菜单
                showBg: true,
                title: ""
            },
            content: "",
            goodsInfo: "",
            goodsList: [], //商品列表
            request: "",
            toload: true,
            param:{
                rent_status:2,//租号
            },
            title:'',
            keywords:'',
        };
    },
    methods: {
        // 去详情
        goDetail(goods_id) {
            this.$router.push({
                name: "Details",
                query: { goods_id: goods_id }
            });
        },
        //一键清空
        emptyFun() {
            this.request.content = '';
            this.request.page = 1;
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        // 隐藏键盘
        show(e) {
            this.request.page = 1;
            this.$refs.input1.blur();
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        out() {
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        getData(data,flag) {
            this.request = data;
            if (this.toload ) {
                this.toload = false;
                this.refresh();
            } else {
                this.getGoodsInfo(data, "refresh");
            }
            if(flag){
                $('.list-wrap').css({'top':'2.38rem'})
            }else{
                $('.list-wrap').css({'top':'1.68rem'})
            }
        },
        // 获取商品列表
        getGoodsInfo(request, flag) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "goods_info", request)
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            that.title = res.data.data.game_name+'_租号平台_看个号';
                            that.keywords = res.data.data.game_name + '账号出租，'+res.data.data.game_name + '账号寄租'
                            // 上拉加载
                            // debugger;
                            if (flag == "push") {
                                if (data == "") {
                                    that.miniRefresh.endUpLoading(true);
                                } else {
                                    that.miniRefresh.endUpLoading(false);
                                    for (var i in res.data.data.data) {
                                        that.goodsList.push(
                                            res.data.data.data[i]
                                        );
                                    }
                                }
                            } else {
                                if (data == "") {
                                    that.showNoData = true;
                                    that.goodsList = "";
                                    that.miniRefresh.endDownLoading();
                                } else {
                                    that.goodsList = res.data.data.data;
                                    that.pages = res.data.data.last_page;
                                    that.showNoData = false;
                                    that.miniRefresh.endDownLoading();
                                }
                            }
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 刷新
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: true,
                    bounceTime: 500,
                    callback: () => {
                        that.request.page = 1;
                        that.getGoodsInfo(that.request, "refresh");
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.request.page++;
                        if (that.request.page <= that.pages) {
                            that.getGoodsInfo(that.request, "push");
                        } else {
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    metaInfo(){
        return {
            title:this.title,
            meta:[{
                name:'keywords',
                content:this.keywords
            }]
        }
    },
    mounted() {
        var that = this;
        var opt = sessionStorage.getItem("opt");
        if(that.$route.query.opt){
            that.request = JSON.parse(JSON.stringify(that.$store.state.list_request));
            that.request.rent_status = 2;
            if (opt == that.$route.query.opt) {
                that.request.category_id = opt;
                that.$refs.mychild.getConfig(opt,that.request);
            } else {
                that.$router.go(-1);
            }
        }else{
            that.$router.go(-1);
        }
    },
    activated(){
        var that = this;
        if(!that.$route.meta.isBack){
            that.request = JSON.parse(JSON.stringify(that.$store.state.list_request));
            that.request.rent_status = 2;
            var opt = sessionStorage.getItem("opt");
            if(that.$route.query.opt){
                if (opt == that.$route.query.opt) {
                    that.request.category_id = opt;
                    that.$refs.mychild.getConfig(opt,that.request);
                } else {
                    that.$router.go(-1);
                }
            }

        }else{
            $('#minirefresh').scrollTop(that.$route.meta.scroll_top);
        }
        that.$route.meta.isBack = false;
    },
     beforeRouteLeave(to,from,next){
        from.meta.scroll_top = $('#minirefresh').scrollTop();
        next();
    },
    beforeRouteEnter(to,from,next){
        if(from.path == '/details'){
            to.meta.isBack=true;
        }
        next();
    },
};
</script>
<style scoped>
.search-wrap{
    padding-top:0;
}
/*搜索*/
.titInp {
    width: 5.8rem;
    height: 0.88rem;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: calc(50% - 2.9rem);
    z-index: 999999;
    line-height: 0.88rem;
}
.search-title {
    background: #ffffff;
    width: 5.8rem;
    height: 0.66rem;
    font-size: 0.26rem;
    padding: 0 0.6rem;
    margin: 0;
    border-top-left-radius: 0.33rem;
    border-top-right-radius: 0.33rem;
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;
    background: #ffffff;
}
.search-ico {
    width: 0.32rem;
    height: 0.27rem;
    position: absolute;
    top: 0.32rem;
    left: 0.23rem;
}
.empty-ico {
    width: 0.23rem;
    height: 0.24rem;
    position: absolute;
    top: 0.12rem;
    right: 0.1rem;
    margin:.2rem;
}
.goods-wrap {
    position: relative;
    top: 0;
    margin: 0 auto;
    height: 100vh;
    z-index: 15;
}

/* 单条商品 */
.goods-strip {
    background: #ffffff;
    margin-top: 0.2rem;
}
.goods-strip-top{
    padding: 0.3rem 0.2rem 0;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
}
/* 精品 */
.boutique {
    text-align: center;
    background: #fe7649;
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.title-ico {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.rent-ico{
    background: -webkit-linear-gradient(#ff9090, #ff687a);
    background: -o-linear-gradient(#ff9090, #ff687a);
    background: -moz-linear-gradient(#ff9090, #ff687a);
    background: linear-gradient(to right, #ff9090, #ff687a);
}
.deal-ico{
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
}
.account-type {
    text-align: center;
    /* width:.7rem; */
    padding: 0 0.1rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -o-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -moz-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    display: inline-block;
    margin-right: 0.1rem;
}
.account-ios {
    text-align: center;
    /* width:.7rem; */
    padding: 0 0.1rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    background: -o-linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    background: -moz-linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    background: linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    display: inline-block;
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
}
/* 详情 -- 保障*/
.goods-strip-content {
    position: relative;
    line-height: .7rem;
}
.goods-des {
    width: 5rem;
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: #333333;
}
.goods-ico {
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
    width: 2.2rem;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
.original-price {
    color: #666666;
    font-size: 0.26rem;
    line-height: 0.5rem;
}
.original-text {
    margin-right: 0.1rem;
}
/* 底部 */
.goods-strip-bottom {
    line-height: 0.8rem;
    border-top: 1px solid #dcdcdc;
    color: #999999;
    font-size: 0.26rem;
    display: flex;
    justify-content: space-between;
}
.goods-strip-bottom img {
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
}
.goods-strip-bottom span {
    vertical-align: middle;
}
.red-color {
    color: #fa5856;
}
.goods_price {
    color: #fa5856;
    font-size: 0.36rem;
}
.hint-bottom {
    line-height: 0.7rem;
    background: #f6f6f6;
    font-size: 0.26rem;
    color: #999999;
    padding-left:.27rem;
    border-bottom:1px solid #DCDCDC;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.bargain {
    margin-left: 0.1rem;
    line-height: 0.35rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999999;
    padding: 0.02rem 0.1rem;
    border: 1px solid #b5b5b5;
    border-top-left-radius: 0.18rem;
    border-top-right-radius: 0.18rem;
    border-bottom-left-radius: 0.18rem;
    border-bottom-right-radius: 0.18rem;
    vertical-align: middle;
}

.list-wrap {
    top: 1.68rem;
}
.list {
    background: #f6f8fe;
}
.list ul{
     background:#F6F8FE;
}

.nodata {
    padding-top: 1.68rem;
}
</style>
