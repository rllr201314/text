<template>
    
</template>
<script>
export default {
    name: "List",
    props:['goodsInfo'],
    components:{
    },
    data() {
        return {
            goodsList:[],
        };
    },
    methods: {
         getGoodsInfo(request, flag) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"goods_info", request)
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            // 上拉加载
                            if(flag){
                                if(data == ''){
                                    that.miniRefresh.endUpLoading(true);
                                }else{
                                    that.miniRefresh.endUpLoading(false);
                                    for (var i in res.data.data.data) {
                                        that.goodsList.push(
                                            res.data.data.data[i]
                                        );
                                    }
                                } 
                            }else{
                                if(data == ""){
                                    that.showNoData = true;
                                    that.goodsList = "";
                                    that.miniRefresh.endDownLoading();
                                }else{
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
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: true,
                    bounceTime: 500,
                    callback: () => {
                        that.$store.commit('addPage','refresh');
                        that.getGoodsInfo(that.$store.state.list_request);
                        
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.$store.commit('addPage','add');
                        var page = that.$store.state.list_request.page;
                        if(page <= that.pages){
                            that.getGoodsInfo(that.$store.state.list_request,'push');
                        }else{
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    
    watch:{

    },
    mounted() {
        var that = this;
        that.refresh();
    }
};
</script>
<style scoped>
.goods-wrap{
    position: relative;;
    top:0;
    margin:0 auto;
    height:100vh;
    z-index: 15;
}


/* 单条商品 */
.goods-strip {
    background: #ffffff;
    padding: 0.3rem 0.2rem;
    margin-top: 0.2rem;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
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
.goods-type {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
    display: inline-block;
    margin-right: 0.1rem;
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
    background: -webkit-linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
    background: -o-linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
    background: -moz-linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
    background:linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
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
    margin-bottom: 0.15rem;
    position: relative;
}
.goods-des {
    width: 5rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
}
.goods-ico {
    position: absolute;
    top:0;right:0;
    text-align: right;
    width:2.2rem;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
/* 底部 价格 */
.goods-strip-bottom div {
    display: inline-block;
}
.goods-price {
    font-size: 0.36rem;
    color: #fa5856;
    vertical-align: middle;
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
    background: #f6f6f6;
}

.nodata{
    padding-top:1.68rem;
}
</style>
