<template>
    <div class="sellOption-wrap">
        <div class="sellOpt-top">
            <Header v-bind:showTitle="comData.showTitle"></Header>
            <div class="game-sign">
                <img :src="sellOptData.gameLog" alt="">
                <div v-text="sellOptData.gameName"></div>
            </div>
        </div>
        <div class="sellOpt-content">
            <div class="opt-cell">
                <span class="left-text">商品类型</span>
                <div class="right-opt" @click="showPop('merchand')">
                    <span v-text="sellOptData.merchand"></span>
                    <img src="../../../static/img/order/next.png" alt="">
                </div>
            </div>
            <div class="opt-cell">
                <span class="left-text">手机系统</span>
                <div class="right-opt" @click="showPop('mobile')">
                    <span v-text="sellOptData.mobile"></span>
                    <img src="../../../static/img/order/next.png" alt="">
                </div>
            </div>
            <div class="opt-cell">
                <span class="left-text">服务器</span>
                <div class="right-opt" @click="showPop('server')">
                    <span v-text="sellOptData.server"></span>
                    <img src="../../../static/img/order/next.png" alt="">
                </div>
            </div>
        </div>
        <div class="okBtn" @click="goNext">下一步</div>
        <!-- 弹出框 -->
        <!-- 商品类型 -->
        <div id="sheet-merchand" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择商品类型</div>
                </li>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in optionData.merchand" @click="seleMerchand(item.value)" v-text="item.name"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-merchand">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
        <!-- 手机系统 -->
        <div id="sheet-mobile" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="option-gray pop-view-tit">
                    <div>请选择客户端类型</div>
                    <div class="search">
                        <img src="../../../static/img/search_ico.png" alt="">
                        <input type="text" placeholder="搜索">
                    </div>
                </li>
                <!-- 手机系统 -->
                <div class="pop-view-mobil">
                    <li class="option-black" v-for="item in optionData.mobile" @click="seleMobile(item.operation_id)" v-text="item.platform_name"></li>
                </div>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-mobile">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
        <!-- 服务器 -->
        <div id="sheet-server" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <div class="screen-box server-type-box">
                <!-- 平台 -->
                <div class="server-operation-box" v-if="showOpteration">
                    <div class="operation-type-strip" v-for="item in optionData.operation_info" :class="item.ischeck?'red-border':'black-border'" v-text="item.area_name" @click="seleOperation(item.area_id)"></div>
                </div>
                <!-- 区服 -->
                <div class="server-area-box" v-if="showOpteration">
                    <div class="area-type-search">
                        <input type="text" placeholder="搜索">
                        <img class="search-area-ico" src="../../../static/img/search_ico.png" alt="">
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in optionData.area_info" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.server_name" @click="seleArea(item.server_id,'area')"></div>
                    </div>
                </div>
                <!-- 没有区的时候只显示服务器的 -->
                <div class="server-area-box" v-if="!showOpteration">
                    <div class="area-type-search">
                        <input type="text" placeholder="搜索">
                        <img class="search-area-ico" src="../../../static/img/search_ico.png" alt="">
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in optionData.server_info" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.area_name" @click="seleArea(item.area_id,'server')"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SellOption",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部log
                    showShare: 3, //1搜索2分享3菜单
                    showBg: false, //是否显示背景
                    title: "我要卖"
                }
            },
            showOpteration: true, //显示平台选择
            sellOptData: {
                gameLog: "",
                gameName: "",
                merchand: "未选择",
                mobile: "未选择",
                server: "未选择",
                area:'未选择'
            },
            optionData: {
                merchand: [],
                mobile: [],
                // 平台
                operation_info: [],
                // 服务器
                area_info: [],
                area_all: [],
                server_info: [],
            },
            upData:{
                category_id: "", //游戏分类id
                deal_type:'',//商品类型
                operation_id:'',//系统类型
                area_id:'',
                server_id:'',
            }
        };
    },
    methods: {
        // 显示那个下拉菜单
        showPop(flag) {
            var that = this;
            if (flag == "server") {
                if (that.sellOptData.mobile == "未选择") {
                    //还未请求平台数据
                    mui.alert("请先选择手机系统", "提示", "确认", "", "");
                    return false;
                } else if(that.sellOptData.server == '未选择' && that.showOpteration){
                    //请求完 默认选择第一个
                    that.sellOptData.server = that.optionData.operation_info[0].area_name;
                    that.sellOptData.area = that.optionData.operation_info[0].area_name;//存起来好拼接
                    // that.
                }
            }
            mui("#sheet-" + flag).popover("toggle");
        },
        // 选择商品类型
        seleMerchand(ind) {
            var that = this;
            mui("#sheet-merchand").popover("toggle");
            var merchand = this.optionData.merchand;
            // console.log(merchand);
            for (var i in merchand) {
                if (ind == merchand[i].value) {
                    merchand[i].ischeck = true;
                    that.upData.deal_type = merchand[i].value;
                    that.sellOptData.merchand = merchand[i].name;
                    continue;
                }
                merchand[i].ischeck = false;
            }
        },
        // 选择手机系统
        seleMobile(ind) {
            var that = this;
            mui("#sheet-mobile").popover("toggle");
            var mobile = that.optionData.mobile;
            // console.log(mobile);
            for (var i in mobile) {
                if (ind == mobile[i].operation_id) {
                    mobile[i].ischeck = true;
                    that.upData.operation_id = mobile[i].operation_id;
                    that.sellOptData.mobile = mobile[i].platform_name;
                    continue;
                }
                mobile[i].ischeck = false;
            }
            that.sellOptData.server = "未选择";
            that.upData.area_id = '',
            that.upData.server_id = '',
            that.getOperation(ind);
        },
        // 选择服务器--平台
        seleOperation(ind) {
            var that = this;
            var operationAll = that.optionData.operation_info;
            for (var i in operationAll) {
                if (ind == operationAll[i].area_id) {
                    operationAll[i].ischeck = true;
                    that.upData.area_id = operationAll[i].area_id,
                    that.sellOptData.server = operationAll[i].area_name;
                    that.sellOptData.area = operationAll[i].area_name;
                    continue;
                }
                operationAll[i].ischeck = false;
            }
            that.upData.server_id = '';
            that.getArea(ind);
        },
        // 选择服务器--区服
        seleArea(ind, opt) {
            mui("#sheet-server").popover("toggle");
            var that = this;
            if (opt == "area") {
                var areaAll = that.optionData.area_info;
                for (var i in areaAll) {
                    if (ind == areaAll[i].server_id) {
                        areaAll[i].ischeck = true;
                        that.upData.server_id =  areaAll[i].server_id
                        that.sellOptData.server = that.sellOptData.area + ">" + areaAll[i].server_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
            } else if (opt == "server") {
                var areaAll = that.optionData.server_info;
                for (var i in areaAll) {
                    if (ind == areaAll[i].area_id) {
                        areaAll[i].ischeck = true;
                        that.upData.area_id = areaAll[i].area_id;
                        that.sellOptData.server = areaAll[i].area_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
            }
        },
        // 请求平台
        getOperation(operation_id) {
            var that = this;
            that.$axios
                .post("/api/area_server", {
                    operation_id: operation_id
                })
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            // console.log(res.data.data);
                            if (res.data.data.server_info == "") {
                                that.showOpteration = false;
                                that.optionData.server_info =
                                    res.data.data.area_info;
                                for (var i in that.optionData.server_info) {
                                    that.optionData.server_info[
                                        i
                                    ].ischeck = false;
                                }
                            } else {
                                that.showOpteration = true;
                                for (var i in res.data.data.area_info) {
                                    if (i == 0) {
                                        res.data.data.area_info[i].ischeck = true;
                                        that.upData.area_id = res.data.data.area_info[0].area_id;
                                        continue;
                                    }
                                    res.data.data.area_info[i].ischeck = false;
                                }
                                for (var i in res.data.data.server_info) {
                                    res.data.data.server_info[i].ischeck = false;
                                }
                                that.optionData.operation_info = res.data.data.area_info;
                                that.optionData.area_all = res.data.data.server_info;
                                that.getArea(that.optionData.operation_info[0].area_id);
                            }
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // // 获取服务器
        getArea(area_id) {
            var that = this;
            var all = that.optionData.area_all;
            var info = that.optionData.area_info = [];
            for (var i in all) {
                if (area_id == all[i].area_id) {
                    all[i].ischeck = false;
                    info.push(all[i]);
                }
            }
        },
        goNext() {
            var that = this;
            var upData = that.upData;
            if(upData.category_id == ''){
                mui.alert('请重新选择游戏','提示','确认',function(){
                    that.$router.go(-1);
                },'div')
            }else if(upData.deal_type == ''){
                mui.alert('请选择商品类型','提示','确认','','div');
                return false;
            }else if(upData.operation_id == ''){
                mui.alert('请选择手机系统','提示','确认','','div');
                return false;
            }else if(upData.area_id == '' && that.showOpteration){
                mui.alert('请选择大区','提示','确认','','div');
                return false;
            }else if(upData.server_id == '' && that.showOpteration){
                mui.alert('请选择服务器','提示','确认','','div');
                return false;
            }else if(upData.area_id == '' && !that.showOpteration){
                mui.alert('请选择区服','提示','确认','','div');
                return false;
            }else{
                console.log(upData);
                that.$router.push({name:'SellInfo',
                    query:{
                        flag:1,
                        category_id:upData.category_id,
                        deal_type:upData.deal_type,
                        operation_id:upData.operation_id,
                        area_id:upData.area_id,
                        server_id:upData.server_id
                    }
                });
            }
        },
        getConfig(opt){
            var that = this;
            that.$axios
                .post("/api/category")
                .then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var resData = res.data.data.is_hot
                            for(var i in resData){
                                if(opt == resData[i].category_id){
                                    that.sellOptData.gameLog = resData[i].game_logo;
                                    that.sellOptData.gameName = resData[i].game_name;
                                }
                            }
                            
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getSysConfig(opt){
            var that =this;
             // 请求商品类型 和 手机系统
            that.$axios
                .post("/api/sys_config", {
                    category_id: opt
                })
                .then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.optionData.merchand = res.data.data.deal_type;
                            that.optionData.mobile = res.data.data.platform;
                        }else if(res.data.code == 401){
                            mui.confirm("请先登陆","提示",["取消", "确认"],
                                function(e) {
                                    if (e.index == 1) {
                                        that.$router.push({
                                            name: "AccountLogin",
                                            params: {
                                                redirect:that.$router.currentRoute.name
                                            }
                                        });
                                    } else {
                                        that.$router.go(-1);
                                    }
                                },"div");
                        }else{
                            mui.alert(res.data.msg,'提示','确定',(e) => {
                                that.$router.go(-1);
                            },'div');
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    mounted() {
        var that = this;
        var opt = that.$route.query.opt;
        console.log(opt);
        if(opt == undefined || opt == ''){
            that.$router.go(-1); 
        }else{
            that.upData.category_id = opt;
            that.getConfig(opt);
            that.getSysConfig(opt);
        }
    }
};
</script>
<style scoped>
.sellOption-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.sellOpt-top {
    height: 5rem;
    background-image: url(../../../static/img/sell/header_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 5rem;
}
.game-sign {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.28rem;
}
.game-sign img {
    width: 1.11rem;
    height: 1.11rem;
    margin-bottom: 0.1rem;
}
.sellOpt-content {
    padding: 0 0.2rem;
}
.opt-cell {
    line-height: 0.9rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
}
.left-text {
    font-size: 0.26rem;
    color: #666666;
}
.right-opt {
    width: 3rem;
    text-align: right;
    float: right;
    font-size: 0.24rem;
    color: #999999;
}
.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
    margin-left: 0.2rem;
    margin-top: -0.05rem;
}
.right-opt span {
    vertical-align: middle;
}

/* 弹出框 */
.option-gray {
    color: #666666;
    font-size: 0.28rem;
}
.option-black {
    color: #333333;
    font-size: 0.28rem;
    font-weight: 100;
}

/* 下一步 */
.okBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.3rem auto 0;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}

/* ====服务器==== */
.server-type-box {
    background: #f3f3f3;
    height: 4.5rem;
    display: flex;
    justify-content: flex-start;
}
.server-operation-box {
    width: 23.7%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    overflow-y: auto;
}
.operation-type-strip {
    font-size: 0.26rem;
    color: #666666;
    line-height: 0.7rem;
}
.server-area-box {
    width: 100%;
    display: inline-block;
    background: #ffffff;
    vertical-align: top;
    padding-top: 0.3rem;
    height: 100%;
}
.red-border {
    color: #fe7649;
    background-image: url(../../../static/img/goodscreen/vertical.png);
    background-repeat: no-repeat;
    background-size: 0.16rem 0.4rem;
    background-position: 0 70%;
}
.black-border {
    color: #666666;
}
/* 区服搜索 */
.area-type-search {
    width: 4.95rem;
    height: 0.6rem;
    position: relative;
    text-align: center;
    margin: 0 auto 0.3rem;
}
.area-type-search input {
    width: 4.95rem;
    height: 0.6rem;
    font-size: 0.24rem;
}
.search-area-ico {
    width: 0.19rem;
    height: 0.19rem;
    position: absolute;
    left: 0.1rem;
    top: 0.2rem;
}
/* 区服 */
.area-type-content {
    color: #666666;
    height: 3.2rem;
    font-size: 0.24rem;
    padding-left: 0.3rem;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.area-type-strip {
    min-width: 1.3rem;
    text-align: center;
    display: inline-block;
    padding: 0 0.15rem;
    line-height: 0.6rem;
    height: 0.6rem;
    margin: 0 0.2rem 0.3rem 0;
    border: 1px solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
}
.red-bg {
    color: #fe7649;
    border: 1px solid #ff855d;
    background-color: #ffdbcf;
    background-image: url(../../../static/img/goodscreen/false_tag.png);
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
}
.black-bg {
    border: 1px solid #d2d2d2;
    background: #ffffff;
}

.pop-view {
    margin-top: 10px;
    background: #ffffff;
    text-align: center;
    list-style: none;
}
.pop-view li {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
.pop-view a {
    padding: 0;
}
.pop-view-mobil {
    height: 4rem;
    overflow-y: auto;
}
.search {
    width: 4.7rem;
    height: 0.65rem;
    position: relative;
    margin: 0 auto 0.3rem;
}
.search img {
    width: 0.25rem;
    height: 0.22rem;
    position: absolute;
    left: 0.2rem;
    top: calc(50% - 0.13rem);
    z-index: 2;
}
.search input {
    height: 0.6rem;
    margin: 0;
    padding: 0 0 0 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

/* ==========placeholder========= */
::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
</style>
