<template>
    <!-- 商品列表 商品筛选  -->
    <div class="good-screen-wrap">
        <Header v-bind:showTitle="showTitle" v-if="true"></Header>
        <div class="titInp">
            <img class="search-ico" src="../../static/img/search_ico.png" alt="">
            <form action="javascript:return true;">
                <input class="search-title" type="search" placeholder="请输入搜索内容" v-model="request.content" @keyup.13="show()" ref="input1" @blur="out()">
            </form>
            <img class="empty-ico" src="../../static/img/empty_ico.png" alt="" @click="emptyFun()">
        </div>
        <div class="screen-title" v-if="true">
            <div class="screen-title-top">
                <div class="title-top-cell" v-for="(item,index) in screenTop" @click="topScreen(item.flag,index)">
                    <span class="title-top-title" v-text="item.tit_top_text"></span>
                    <img class="title-top-img" :src="item.tit_top_src" alt="">
                </div>
            </div>
            <div class="screen-title-bottom" v-if="showBottom">
                <div class="title-bottom-cell" v-for="(item,index) in screenBottom" @click="bottomScreen(item.flag,index)">
                    <span class="title-bottom-title" v-text="item.tit_bottom_text"></span>
                    <img class="title-bottom-img" :src="item.tit_bottom_src" alt="">
                </div>
            </div>
        </div>
        <div id="minirefresh" class="minirefresh-wrap list-wrap">
            <div class="minirefresh-scroll list">
                <ul>
                    <div class="goods-strip" v-for="(item,index) in goodsInfo" @click="goDetail(item.goods_id)">
                        <div class="goods-strip-title">
                            <div class="boutique" v-if="item.is_recommend == 1">精</div>
                            <div class="goods-type" v-if="item.deal_type_id == 1">成品号</div>
                            <div class="goods-type" v-else-if="item.deal_type_id == 2">代练号</div>
                            <div class="account-type" v-if="item.client_id == 1">安卓</div>
                            <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                            <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                            <div class="area" v-text="item.area_name"></div>
                        </div>
                        <div class="goods-strip-content">
                            <div class="goods-des" v-text="item.goods_title"></div>
                            <div class="goods-ico">
                                <img v-if="item.is_safe == 1" src="../../static/img/goodscreen/safe_ico.png" alt="">
                                <img v-if="item.is_stage == 1" src="../../static/img/goodscreen/stages_ico.png" alt="">
                                <img v-if="item.is_check == 1" src="../../static/img/goodscreen/verify.png" alt="">
                             </div>
                        </div>
                        <div class="goods-strip-bottom">
                            <div class="goods-price" v-text="item.goods_price"></div>
                            <div class="bargain" v-if="item.sell_type == 2">可议价</div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
        <!-- 账号 -->
        <div class="screen-box account-type-box" v-show="screenInfoAll[0].isShow">
            <div class="account-type-strip" v-for="item in account_info" :class="item.ischeck?'red-color':'black-color'" v-text="item.name" 
            @click="seleAccount(item.value)"></div>
        </div>
        <!-- 手机型号 -->
        <div class="screen-box phone-type-box" v-show="screenInfoAll[1].isShow">
            <div class="phone-type-strip" v-for="item in phone_info" :class="item.ischeck?'red-color':'black-color'" v-text="item.alias" @click="selePhone(item.value)"></div>
        </div>
        <!-- 服务器 -->
        <div class="screen-box server-type-box" v-show="screenInfoAll[2].isShow">
            <div class="sele-server">
                <div v-if="!showOperation" class="sele-server-box">
                    <div v-for="(item,index) in seleOpe" v-text="item" @click="delOpe(index)"></div>
                </div>
                <div class="sele-null" v-else>请选择商品类型</div>
            </div>
            <!-- 平台 -->
            <div class="phone-type-box scroll-view" v-show="showOperation">
                <div class="phone-type-strip" v-for="item in operation_info" :class="item.ischeck?'red-color':'black-color'" v-text="item.platform_name" 
                @click="seleOperation(item.operation_id)"></div>
            </div>
            <div v-show="!showOperation" class="server-operation">
                <!-- 区 -->
                <div class="server-operation-box" v-if="showArea">
                    <div class="operation-type-strip" v-for="item in area_info" :class="item.ischeck?'red-border':'black-border'" v-text="item.area_name"@click="getArea(item.area_id)"></div>
                </div>
                <!-- 服 -->
                <div class="server-area-box" v-if="showArea">
                    <div class="area-type-search">
                        <input type="text" placeholder="搜索">
                        <img class="search-area-ico" src="../../static/img/search_ico.png" alt="">
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in server_info" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.server_name" 
                        @click="seleServer(item.server_id,'server')"></div>
                    </div>
                    <!-- <div class="area-type-btn">确认</div> -->
                </div>
                    <!-- 没区的时候只显示服 -->
                <div class="server-area-box" v-if="!showArea">
                    <div class="area-type-search">
                        <input type="text" placeholder="搜索">
                        <img class="search-area-ico" src="../../static/img/search_ico.png" alt="">
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in server_info" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.area_name" 
                        @click="seleServer(item.area_id,'area')"></div>
                    </div>
                    <!-- <div class="area-type-btn">确认</div> -->
                </div>
            </div>
        </div>
        <!-- 筛选 -->
        <div class="screen-box screen-type-box" v-show="screenInfoAll[3].isShow">
            <div class="screen-type-strip">
                <div class="screen-strip-left input-price-left">价格范围</div>
                <div class="screen-strip-right input-price-right">
                    <input class="downPrice" type="number" v-model="begin_price">
                    <span>——</span>
                    <input class="upPrice" type="number" v-model="end_price">元
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left sort-left-text">排序方式</div>
                <div class="screen-strip-right">
                    <div class="screen-sort" @click="seleSort('down')">
                        <img class="screen-sort-check" :src="screen_info.sortPrice.ischeck.downSort?screen_info.sortPrice.sortSrc.sortPriceOk:screen_info.sortPrice.sortSrc.sortPriceNo" alt="">
                        <span>价格从高到低</span>
                        <img class="screen-sort-ico" src="../../static/img/goodscreen/arrow_down.png" alt="">
                    </div>
                    <div class="screen-sort" @click="seleSort('up')">
                        <img class="screen-sort-check" :src="screen_info.sortPrice.ischeck.upSort?screen_info.sortPrice.sortSrc.sortPriceOk:screen_info.sortPrice.sortSrc.sortPriceNo" alt="">
                        <span>价格从低到高</span>
                        <img class="screen-sort-ico" src="../../static/img/goodscreen/arrow_up.png" alt="">
                    </div>
                    <div class="screen-sort" @click="seleSort('more')">
                        <img class="screen-sort-check" :src="screen_info.sortPrice.ischeck.moreSort?screen_info.sortPrice.sortSrc.sortPriceOk:screen_info.sortPrice.sortSrc.sortPriceNo" alt="">
                        <span>收藏最多</span>
                    </div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">账号绑定</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.accountBind" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
                    @click="seleScreen('accountBind',item.value)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">视频状态</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.videoStatus" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
                    @click="seleScreen('videoStatus',item.value)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">售价类型</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.sellType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
                    @click="seleScreen('sellType',item.value)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">是否可分期</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.isStages" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
                    @click="seleScreen('isStages',item.value)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">保险情况</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.isInsurance" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
                    @click="seleScreen('isInsurance',item.value)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">等级</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.levelType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
                    @click="seleScreen('levelType',item.value)"></div>
                </div>
            </div>
            <div class="screen-type-bottom">
                <div class="ok-screen-btn" @click="okScreen">确认</div>
                <div class="no-screen-btn" @click="cancleScreen">取消</div>
            </div>
        </div>
        <!-- 神兽 -->
        <div class="screen-box bottom-screen-box pokemon-type-box" v-show="screenInfoAll[4].isShow">
            <div class="screen-strip-box" v-for="item in screen_info.pokemonType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
            @click="seleScreen('pokemon',item.name)"></div>
        </div>
        <!-- 职业 -->
        <div class="screen-box bottom-screen-box profession-type-box" v-show="screenInfoAll[5].isShow">
            <div class="screen-strip-box" v-for="item in screen_info.professionType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
            @click="seleScreen('profession',item.name)"></div>
        </div>
        <!-- 门派 -->
        <div class="screen-box bottom-screen-box school-type-box" v-show="screenInfoAll[6].isShow">
            <div class="screen-strip-box" v-for="item in screen_info.schoolType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" 
            @click="seleScreen('school',item.name)"></div>
        </div>
        <!-- 遮罩 -->
        <div class="goodscreen-shade" v-show="screenInfoAll[7].isShow" @click="hiddenScreenFun()"></div>

        <NoData v-if="showNoData"></NoData>
    </div>
</template>

<script>
import Header from "@/components/home-page/Header"; //头部
import myScroll from "@/components/pull/refresh"; //刷新
import NoData from "@/components/multi/NoData"; //补上------------

export default {
    name: "GoodScreen",
    data() {
        return {
            // 组件的数据
            // Header
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部inp
                showShare: 3, //1搜索2分享3菜单
                showBg: true,
                title: "",
            },
            // 提交的数据
            request: {
                page: 1,
                rows: 10,
                category_id: "",
                deal_type: "",
                client_id: "",
                operation_id: "",
                area_id: "",
                server_id: "",
                is_stage: "",
                is_safe: "",
                is_compact: "",
                sell_type: "",
                is_bind: "",
                role_level: "",
                begin_price: "",
                end_price: "",
                sort_price: "",
                sort_collection: "",
                is_video: "",
                content:'',
            },
            list: [],
            miniRefresh: null,
            showNoData: false,
            pages: "", //总页数
            goodsInfo: "",
            showBottom: false, //不显示下方筛选栏
            begin_price: "",
            end_price: "",
            is_video: "",
            sell_type: "",
            is_stage: "",
            is_safe: "",
            role_level: "",
            sort_price: "",
            sort_collection: "",

            // 筛选---之上
            screenTop: [
                {
                    flag: "account",
                    tit_top_text: "成品号",
                    tit_top_src: "./static/img/goodscreen/downempty.png",
                    ischeck: false
                },
                {
                    flag: "phone",
                    tit_top_text: "苹果",
                    tit_top_src: "./static/img/goodscreen/downempty.png",
                    ischeck: false
                },
                {
                    flag: "server",
                    tit_top_text: "服务器",
                    tit_top_src: "./static/img/goodscreen/downempty.png",
                    ischeck: false
                },
                {
                    flag: "screen",
                    tit_top_text: "筛选",
                    tit_top_src: "./static/img/goodscreen/downempty.png",
                    ischeck: false
                }
            ],
            // 筛选---之下
            screenBottom: [
                {
                    flag: "pokemon",
                    tit_bottom_text: "神兽",
                    tit_bottom_src: "./static/img/goodscreen/downsolid.png",
                    ischeck: false
                },
                {
                    flag: "profession",
                    tit_bottom_text: "职业",
                    tit_bottom_src: "./static/img/goodscreen/downsolid.png",
                    ischeck: false
                },
                {
                    flag: "school",
                    tit_bottom_text: "门派",
                    tit_bottom_src: "./static/img/goodscreen/downsolid.png",
                    ischeck: false
                }
            ],
            // 选择筛选需要的条件---------
            screenInfoAll: [
                {
                    name: "account",
                    isShow: false //是否显示选择--账号--选项块
                },
                {
                    name: "phone",
                    isShow: false //是否显示选择--手机--选项块
                },
                {
                    name: "server",
                    isShow: false //是否显示选择--服务器--选项块
                },
                {
                    name: "screen",
                    isShow: false //是否显示选择--筛选--选项块
                },
                {
                    name: "pokemon",
                    isShow: false //是否显示----神兽--选项块
                },
                {
                    name: "profession",
                    isShow: false //是否显示---职业--选项块
                },
                {
                    name: "school",
                    isShow: false //是否显示--学校--选项块
                },
                {
                    name: "shade",
                    isShow: false //是否显示遮罩
                }
            ],
            // 账号类型
            account_info: [],
            // 手机系统
            phone_info: [],
            // 显示平台
            showOperation: true,
            showArea: true,
            lastClient_id: "", //保存上一次点击的手机系统
            seleOpe: [],
            seleAreaText: { id: "", name: "" }, //记录点击那个区
            // 平台
            operation_info: [],
            // 区
            area_info: [],
            // 服
            server_all: [], //全部的服务器
            server_info: [],
            // 筛选条件
            screen_info: {
                // 单选----选择价格排序
                sortPrice: {
                    sortSrc: {
                        sortPriceOk: "./static/img/goodscreen/okcheck.png",
                        sortPriceNo: "./static/img/goodscreen/nocheck.png"
                    },
                    ischeck: {
                        downSort: false,
                        upSort: false,
                        moreSort: false
                    }
                },
                // 单选----账号绑定
                accountBind: [],
                // 视频状态
                videoStatus: [
                    {
                        name: "有视频",
                        ischeck: false,
                        value: 1
                    },
                    {
                        name: "无视频",
                        ischeck: false,
                        value: 2
                    }
                ],
                // 售价类型
                sellType: [],
                // 是否分期
                isStages: [
                    {
                        name: "可分期",
                        ischeck: false,
                        value: 1
                    },
                    {
                        name: "不可分期",
                        ischeck: false,
                        value: 2
                    }
                ],
                // 保险情况
                isInsurance: [
                    {
                        name: "有保险",
                        ischeck: false,
                        value: 1
                    },
                    {
                        name: "无保险",
                        ischeck: false,
                        value: 2
                    }
                ],
                // 等级
                levelType: [],
                // 神兽
                pokemonType: [],
                // 职业
                professionType: [],
                // 门派
                schoolType: []
            }
        };
    },
    methods: {
        //一键清空
        emptyFun() {
            this.request.content = '';
        },
        // 隐藏键盘
        show(){
            this.$refs.input1.blur();
            this.getGoodsInfo(this.request);
        },
        out(){
            this.getGoodsInfo(this.request);
        },
        // 上一栏选项
        topScreen(flag, index) {
            var screentop = this.screenTop;
            var screenbottom = this.screenBottom;
            // 点击时让其他的变成未选状态
            for (var i in screenbottom) {
                screenbottom[i].tit_bottom_src =
                    "./static/img/goodscreen/downsolid.png";
                screenbottom[i].ischeck = false;
            }
            for (var i in screentop) {
                screentop[i].tit_top_src =
                    "./static/img/goodscreen/downempty.png";
                if (i == index) {
                    continue;
                }
                screentop[i].ischeck = false;
            }
            // 点击
            if (screentop[index].ischeck) {
                screentop[index].tit_top_src =
                    "./static/img/goodscreen/downempty.png";
                screentop[index].ischeck = false;
            } else {
                screentop[index].tit_top_src =
                    "./static/img/goodscreen/upempty.png";
                screentop[index].ischeck = true;
            }
            this.showScreenFun(flag); //显示哪一个筛选框
        },
        // 下一栏选项
        bottomScreen(flag, index) {
            var screenbottom = this.screenBottom;
            var screentop = this.screenTop;
            // 点击时让其他的变成未选状态
            for (var i in screentop) {
                screentop[i].tit_top_src =
                    "./static/img/goodscreen/downempty.png";
                screentop[i].ischeck = false;
            }
            for (var i in screenbottom) {
                screenbottom[i].tit_bottom_src =
                    "./static/img/goodscreen/downsolid.png";
                if (i == index) {
                    continue;
                }
                screenbottom[i].ischeck = false;
            }
            // 点击
            if (screenbottom[index].ischeck) {
                screenbottom[index].tit_bottom_src =
                    "./static/img/goodscreen/downsolid.png";
                screenbottom[index].ischeck = false;
            } else {
                screenbottom[index].tit_bottom_src =
                    "./static/img/goodscreen/upsolid.png";
                screenbottom[index].ischeck = true;
            }
            this.showScreenFun(flag); //显示哪一个筛选框
        },
        // 显示哪一个筛选框的方法
        showScreenFun(flag) {
            var showInfoAll = this.screenInfoAll; //筛选框集合
            // 判断显示哪一个筛选条件
            for (var i in showInfoAll) {
                if (showInfoAll[i].name == flag) {
                    showInfoAll[i].isShow = !showInfoAll[i].isShow;
                    continue;
                }
                showInfoAll[i].isShow = false;
            }
            // 判断遮罩是否显示
            for (var i in showInfoAll) {
                if (showInfoAll[i].isShow == true) {
                    showInfoAll[7].isShow = true;
                    break;
                } else {
                    showInfoAll[7].isShow = false;
                }
            }
        },
        // 隐藏---遮罩+筛选框
        hiddenScreenFun() {
            var showInfoAll = this.screenInfoAll; //筛选框集合
            var screentop = this.screenTop;
            var screenbottom = this.screenBottom;
            for (var i in showInfoAll) {
                showInfoAll[i].isShow = false;
            }
            // 点击时让---上/下--栏选项变成未选状态
            for (var i in screentop) {
                screentop[i].tit_top_src =
                    "./static/img/goodscreen/downempty.png";
                screentop[i].ischeck = false;
            }
            for (var i in screenbottom) {
                screenbottom[i].tit_bottom_src =
                    "./static/img/goodscreen/downsolid.png";
                screenbottom[i].ischeck = false;
            }
        },
        // 选择账号类型
        seleAccount(value) {
            var that = this;
            var accountAll = that.account_info;
            var text = that.screenTop[0];
            for (var i in accountAll) {
                if (accountAll[i].value == value) {
                    accountAll[i].ischeck = true;
                    text.tit_top_text = accountAll[i].name;

                    continue;
                }
                accountAll[i].ischeck = false;
            }
            that.hiddenScreenFun(); //隐藏筛选
            that.request.deal_type = value;
            that.getGoodsInfo(that.request);
        },
        // 选择手机系统
        selePhone(value) {
            var that = this;
            if (that.lastClient_id != value) {
                var phoneAll = that.phone_info;
                var text = that.screenTop[1];
                for (var i in phoneAll) {
                    if (value == phoneAll[i].value) {
                        phoneAll[i].ischeck = true;

                        text.tit_top_text = phoneAll[i].alias;
                        continue;
                    }
                    phoneAll[i].ischeck = false;
                }
                that.lastClient_id = value;
                that.getOperation(value);

                that.request.operation_id = "";
                that.request.area_id = "";
                that.request.server_id = "";
                that.request.client_id = value;
                that.getGoodsInfo(that.request);
            }
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 选择服务器--平台
        seleOperation(operation_id) {
            var that = this;
            var seleOpe = that.seleOpe;
            var operationAll = that.operation_info;
            for (var i in operationAll) {
                if (operationAll[i].operation_id == operation_id) {
                    operationAll[i].ischeck = true;
                    seleOpe[0] = operationAll[i].platform_name;
                    that.showOperation = false;
                    continue;
                }
                operationAll[i].ischeck = false;
            }
            that.request.operation_id = operation_id;
            that.getServer(operation_id);
            that.getGoodsInfo(that.request);
        },
        // 选择服务器
        seleServer(opt, flag) {
            var that = this;
            if (flag == "area") {
                var areaAll = that.server_info;
                for (var i in areaAll) {
                    if (opt == areaAll[i].area_id) {
                        areaAll[i].ischeck = true;
                        that.seleOpe[1] = areaAll[i].area_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
                that.request.area_id = opt;
                that.getGoodsInfo(that.request);
            } else if (flag == "server") {
                var areaAll = that.server_info;
                for (var i in areaAll) {
                    if (opt == areaAll[i].server_id) {
                        areaAll[i].ischeck = true;
                        that.seleOpe[1] = that.seleAreaText.name;
                        that.seleOpe[2] = areaAll[i].server_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
                that.request.area_id = that.seleAreaText.id;
                that.request.server_id = opt;
                that.getGoodsInfo(that.request);
            }
            that.hiddenScreenFun(); //隐藏筛选
        },
        delOpe(ind) {
            var that = this;
            if (ind == "0") {
                that.seleOpe = [];
                that.showOperation = true;
                that.request.operation_id = "";
                that.request.area_id = "";
                that.request.server_id = "";
                that.getGoodsInfo(that.request);
            }
            if (ind == "1") {
                if (that.showArea) {
                    that.seleOpe.splice(1, 2);
                    for (var i in that.server_info) {
                        that.server_info[i].ischeck = false;
                    }
                    that.request.area_id = "";
                    that.request.server_id = "";
                    that.getGoodsInfo(that.request);
                } else {
                    that.seleOpe.splice(1, 1);
                    for (var i in that.server_info) {
                        that.server_info[i].ischeck = false;
                    }
                    that.request.area_id = "";
                    that.getGoodsInfo(that.request);
                }
            } else if (ind == "2") {
                that.seleOpe.splice(2, 1);
                for (var i in that.server_info) {
                    that.server_info[i].ischeck = false;
                }
                that.request.server_id = "";
                that.getGoodsInfo(that.request);
            }
            console.log(that.seleOpe);
        },
        // 筛选--排序
        seleSort(flag) {
            var that = this;
            var sortArr = this.screen_info.sortPrice.ischeck;
            for (var i in sortArr) {
                sortArr[i] = false;
            }
            if (flag == "down") {
                sortArr.downSort = true;
                that.sort_collection = "";
                that.sort_price = "1";
            } else if (flag == "up") {
                sortArr.upSort = true;
                that.sort_collection = "";
                that.sort_price = "2";
            } else if (flag == "more") {
                sortArr.moreSort = true;
                that.sort_price = "";
                that.sort_collection = "1";
            }
        },
        // 筛选--类型
        seleScreen(flag, seleTag) {
            var that = this;
            if (flag == "accountBind") {
                var accountBindAll = this.screen_info.accountBind;
                if (seleTag == "4") {
                    for (var i in accountBindAll) {
                        if (seleTag == accountBindAll[i].value) {
                            accountBindAll[i].ischeck = true;
                            continue;
                        }
                        accountBindAll[i].ischeck = false;
                    }
                } else {
                    for (var i in accountBindAll) {
                        if (seleTag == accountBindAll[i].value) {
                            accountBindAll[i].ischeck = true;
                        }
                        if (accountBindAll[i].value == "4") {
                            accountBindAll[i].ischeck = false;
                        }
                    }
                }
            } else if (flag == "videoStatus") {
                var videoStatusAll = this.screen_info.videoStatus;
                for (var i in videoStatusAll) {
                    if (seleTag == videoStatusAll[i].value) {
                        videoStatusAll[i].ischeck = true;
                        continue;
                    }
                    videoStatusAll[i].ischeck = false;
                }
                that.is_video = seleTag;
            } else if (flag == "sellType") {
                var sellTypeAll = this.screen_info.sellType;
                for (var i in sellTypeAll) {
                    if (seleTag == sellTypeAll[i].value) {
                        sellTypeAll[i].ischeck = true;
                        continue;
                    }
                    sellTypeAll[i].ischeck = false;
                }
                that.sell_type = seleTag;
            } else if (flag == "isStages") {
                var isStagesAll = this.screen_info.isStages;
                for (var i in isStagesAll) {
                    if (seleTag == isStagesAll[i].value) {
                        isStagesAll[i].ischeck = true;
                        continue;
                    }
                    isStagesAll[i].ischeck = false;
                }
                that.is_stage = seleTag;
            } else if (flag == "isInsurance") {
                var isInsuranceAll = this.screen_info.isInsurance;
                for (var i in isInsuranceAll) {
                    if (seleTag == isInsuranceAll[i].value) {
                        isInsuranceAll[i].ischeck = true;
                        continue;
                    }
                    isInsuranceAll[i].ischeck = false;
                }
                that.is_safe = seleTag;
            } else if (flag == "levelType") {
                var levelTypeAll = this.screen_info.levelType;
                for (var i in levelTypeAll) {
                    if (seleTag == levelTypeAll[i].value) {
                        levelTypeAll[i].ischeck = true;
                        continue;
                    }
                    levelTypeAll[i].ischeck = false;
                }
                that.role_level = seleTag;
            } else if (flag == "pokemon") {
                console.log(seleTag);
                var pokemonTypeAll = this.screen_info.pokemonType;
                for (var i in pokemonTypeAll) {
                    if (seleTag == pokemonTypeAll[i].name) {
                        pokemonTypeAll[i].ischeck = true;
                        this.hiddenScreenFun(); //隐藏筛选
                        continue;
                    }
                    pokemonTypeAll[i].ischeck = false;
                }
            } else if (flag == "profession") {
                var professionTypeAll = this.screen_info.professionType;
                for (var i in professionTypeAll) {
                    if (seleTag == professionTypeAll[i].name) {
                        professionTypeAll[i].ischeck = true;

                        this.hiddenScreenFun(); //隐藏筛选
                        continue;
                    }
                    professionTypeAll[i].ischeck = false;
                }
            } else if (flag == "school") {
                var schoolTypeAll = this.screen_info.schoolType;
                for (var i in schoolTypeAll) {
                    if (seleTag == schoolTypeAll[i].name) {
                        schoolTypeAll[i].ischeck = true;

                        this.hiddenScreenFun(); //隐藏筛选
                        continue;
                    }
                    schoolTypeAll[i].ischeck = false;
                }
            }
        },
        okScreen() {
            var that = this;
            var that_r = that.request;
            that_r.begin_price = that.begin_price;
            that_r.end_price = that.end_price; //价格范围
            that_r.sort_price = that.sort_price; //价格排序
            that_r.sort_collection = that.sort_collection;
            var safe = that.screen_info.accountBind; //账号绑定
            var safe_flag = false;
            var safe_str = "";
            for (var i in safe) {
                if (safe[i].ischeck == true) {
                    safe_flag = true;
                    safe_str += "," + safe[i].value;
                }
            }
            if (safe_flag) {
                that_r.is_bind = safe_str.substring(1);
            }
            that_r.is_video = that.is_video;
            that_r.sell_type = that.sell_type;
            that_r.is_stage = that.is_stage;
            that_r.is_safe = that.is_safe;
            that_r.role_level = that.role_level;

            that.getGoodsInfo(that.request);
            that.hiddenScreenFun(); //隐藏筛选
        },
        cancleScreen() {
            var that = this;
            that.request.is_stage = "";
            that.request.is_safe = "";
            that.request.is_compact = "";
            that.request.sell_type = "";
            that.request.is_bind = "";
            that.request.role_level = "";
            that.request.begin_price = "";
            that.request.end_price = "";
            that.request.sort_price = "";
            that.request.sort_collection = "";
            that.request.is_video = "";
            var accountBindAll = that.screen_info.accountBind;
            for (var i in accountBindAll) {
                accountBindAll[i].ischeck = false;
            }
            var imgStatusAll = that.screen_info.imgStatus;
            for (var i in imgStatusAll) {
                imgStatusAll[i].ischeck = false;
            }
            var videoStatusAll = that.screen_info.videoStatus;
            for (var i in videoStatusAll) {
                videoStatusAll[i].ischeck = false;
            }
            var sellTypeAll = that.screen_info.sellType;
            for (var i in sellTypeAll) {
                sellTypeAll[i].ischeck = false;
            }
            var isStagesAll = that.screen_info.isStages;
            for (var i in isStagesAll) {
                isStagesAll[i].ischeck = false;
            }
            var isInsuranceAll = that.screen_info.isInsurance;
            for (var i in isInsuranceAll) {
                isInsuranceAll[i].ischeck = false;
            }
            var levelTypeAll = that.screen_info.levelType;
            for (var i in levelTypeAll) {
                levelTypeAll[i].ischeck = false;
            }
            var pokemonTypeAll = that.screen_info.pokemonType;
            for (var i in pokemonTypeAll) {
                pokemonTypeAll[i].ischeck = false;
            }
            var professionTypeAll = that.screen_info.professionType;
            for (var i in professionTypeAll) {
                professionTypeAll[i].ischeck = false;
            }
            var schoolTypeAll = that.screen_info.schoolType;
            for (var i in schoolTypeAll) {
                schoolTypeAll[i].ischeck = false;
            }
            that.getGoodsInfo(that.request);
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 获取区服
        getOperation(client_id) {
            var that = this;
            that.$axios
                .post("/api/operation", {
                    client_id: client_id,
                    category_id: that.request.category_id
                })
                .then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var platform = res.data.data; //平台
                            for (var i in platform) {
                                platform[i].ischeck = false;
                            }
                            that.operation_info = platform;
                            that.seleOpe = [];
                            that.showOperation = true;
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 获取区服
        getServer(operation_id) {
            var that = this;
            that.$axios
                .post("/api/area_server", {
                    operation_id: operation_id
                })
                .then(function(res) {
                    console.log(res);
                    if (res.data.data.server_info == "") {
                        that.showArea = false;
                        that.server_info = res.data.data.area_info;
                        for (var i in that.server_info) {
                            that.server_info[i].ischeck = false;
                        }
                    } else {
                        that.showArea = true;
                        for (var i in res.data.data.area_info) {
                            if (i == 0) {
                                res.data.data.area_info[i].ischeck = true;
                                continue;
                            }
                            res.data.data.area_info[i].ischeck = false;
                        }
                        for (var i in res.data.data.server_info) {
                            res.data.data.server_info[i].ischeck = false;
                        }
                        that.area_info = res.data.data.area_info;
                        that.server_all = res.data.data.server_info;
                        that.getArea(that.area_info[0].area_id);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 获取服务器
        getArea(area_id) {
            var that = this;
            var all = that.server_all;
            var info = (that.server_info = []);
            for (var i in all) {
                if (area_id == all[i].area_id) {
                    all[i].ischeck = false;
                    info.push(all[i]);
                }
            }
            var areaAll = that.area_info;
            for (var i in areaAll) {
                if (areaAll[i].area_id == area_id) {
                    that.seleAreaText.name = areaAll[i].area_name;
                    that.seleAreaText.id = areaAll[i].area_id;
                    areaAll[i].ischeck = true;
                    continue;
                }
                areaAll[i].ischeck = false;
            }
        },
        // 获取数据
        getGoodsInfo(request, flag) {
            var that = this;
            that.$axios
                .post("/api/goods_info", request)
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            if(flag){
                                if(data == ''){
                                    that.miniRefresh.endUpLoading(true);
                                }else{
                                    that.miniRefresh.endUpLoading(false);
                                    for (var i in res.data.data.data) {
                                        that.goodsInfo.push(
                                            res.data.data.data[i]
                                        );
                                    }
                                } 
                            }else{
                                if(data == ""){
                                    that.showNoData = true;
                                    that.goodsInfo = "";
                                    that.miniRefresh.endDownLoading();
                                }else{
                                    that.goodsInfo = res.data.data.data;
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
        getGonfig(category_id) {
            var that = this;
            that.$axios
                .post("/api/search_config", {
                    category_id: category_id
                })
                .then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var deal_type = res.data.data.deal_type;
                            for (var i in deal_type) {
                                deal_type[i].ischeck = false;
                                if (deal_type[i].name == "成品号") {
                                    deal_type[i].ischeck = true;
                                    that.request.deal_type = deal_type[i].value;
                                }
                            }
                            that.account_info = deal_type;
                            var client_idAll = res.data.data.client_id;
                            for (var i in client_idAll) {
                                if (client_idAll[i].alias == "苹果") {
                                    client_idAll[i].ischeck = true;
                                    that.getOperation(client_idAll[i].value); //调用获取平台接口
                                    that.request.client_id =
                                        client_idAll[i].value;
                                    continue;
                                }
                                client_idAll[i].ischeck = false;
                            }
                            that.phone_info = client_idAll;
                            var account_bind = res.data.data.account_bind;
                            for (var i in account_bind) {
                                account_bind[i].ischeck = false;
                            }
                            that.screen_info.accountBind = account_bind;
                            var sell_type = res.data.data.sell_type;
                            for (var i in sell_type) {
                                sell_type[i].ischeck = false;
                            }
                            that.screen_info.sellType = sell_type;
                            var role_level = res.data.data.role_level;
                            for (var i in role_level) {
                                role_level[i].ischeck = false;
                            }
                            that.screen_info.levelType = role_level;
                            // 调用商品列表接口
                            that.getGoodsInfo(that.request);
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        goDetail(goods_id) {
            this.$router.push({
                name: "Details",
                query: { goods_id: goods_id }
            });
        },
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: false,
                    bounceTime: 500,
                    callback: () => {
                        that.request.page = 1;
                        that.getGoodsInfo(that.request);
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
                        if(that.request.page <= that.pages){
                            that.getGoodsInfo(that.request, "push");
                        }else{
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    components: {
        Header,
        myScroll,
        NoData
    },
    // 修改列表页的meta值，false时再次进入页面会重新请求数据。
    beforeRouteLeave(to, from, next) {
        if (to.path == "/details") {
            from.meta.keepAlive = true;
        } else {
            from.meta.keepAlive = false;
        }
        next();
    },
    mounted() {
        var that = this;
        var opt = sessionStorage.getItem("opt");
        if (opt) {
            that.request.category_id = opt;
            that.getGonfig(opt);
        } else {
            that.$router.go(-1);
        }
        that.refresh();
    }
};
</script>

<style scoped>
.good-screen-wrap {
    max-width: 12rem;
    margin: 0 auto;
    /* position: relative; */
}

/* 筛选 */
.screen-title {
    background: #ffffff;
    margin-bottom: 0.2rem;
    position: fixed;
    top: 0.88rem;
    left: 0;
    right: 0;
    z-index: 66;
}
.screen-title-top,
.screen-title-bottom {
    display: flex;
    justify-content: space-around;
}
.screen-title-top {
    color: #333333;
    font-size: 0.28rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.screen-title-bottom {
    color: #666666;
    font-size: 0.24rem;
    height: 0.9rem;
}
.title-top-cell img {
    width: 0.2rem;
    height: 0.11rem;
    margin-left: 0.14rem;
    vertical-align: middle;
}
.title-top-cell span {
    vertical-align: middle;
}
.title-bottom-cell {
    width: 2rem;
    height: 0.5rem;
    background: #f6f8fe;
    border-radius: 0.04rem;
    text-align: center;
    margin: auto 0;
}
.title-bottom-cell img {
    width: 0.2rem;
    height: 0.1rem;
    margin: auto 0 auto 0.14rem;
}
.title-bottom-cell span {
    display: inline-block;
    line-height: 0.5rem;
}

/* 遮罩 */
.goodscreen-shade {
    position: fixed;
    left: 0;
    top: 2.5rem;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
}

/* 筛选弹出框 -- 公共样式 */
.screen-box {
    background: #ffffff;
    border-top: 0.01rem solid #e5e5e5;
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 1.65rem;
    right: 0;
    z-index: 6;
}
/* =========================== */
/* 账号类型 */
.account-type-box {
    font-size: 0.26rem;
    padding-left: 0.3rem;
}
.account-type-box .account-type-strip:nth-last-child(1) {
    border: 0;
}
.account-type-strip {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.black-color {
    color: #666666;
}
.red-color {
    color: #fe7649;
}
/* 手机系统 */
.phone-type-box {
    font-size: 0.26rem;
    padding-left: 0.3rem;
}
.phone-type-box .phone-type-strip:nth-last-child(1) {
    border: 0;
}
.phone-type-strip {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
/* ====服务器==== */
.server-type-box {
}
.sele-server {
    height: 0.9rem;
    background: #f3f3f3;
}
.sele-null {
    background: #ffffff;
    font-size: 0.28rem;
    color: #bcbcbc;
    text-align: center;
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
.scroll-view {
    max-height: 3.5rem;
    overflow-y: auto;
}
.sele-server-box {
    padding: 0 0.2rem;
    height: 0.9rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.sele-server-box div {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.17rem;
    color: #fe7649;
    border: 1px solid #ff855d;
    background-color: #ffdbcf;
    background-image: url(../../static/img/goodscreen/false_tag.png);
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
    margin-right: 0.4rem;
}
.server-operation {
    display: flex;
    justify-content: flex-start;
}
.server-operation-box {
    width: 25%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    height: 4.1rem;
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
}
.red-border {
    color: #fe7649;
    background-image: url(../../static/img/goodscreen/vertical.png);
    background-repeat: no-repeat;
    background-size: 0.16rem 0.4rem;
    background-position: 0 70%;
}
.black-border {
    color: #666666;
}
/* 区服搜索 */
.area-type-search {
    position: relative;
    text-align: center;
    width: 4.95rem;
    height: 0.6rem;
    margin: 0 auto 0.2rem;
}
.area-type-search input {
    width: 4.95rem;
    height: 0.6rem;
    font-size: 0.24rem;
    margin: 0;
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
    font-size: 0.24rem;
    padding-left: 0.3rem;
    height: 3rem;
    overflow-y: auto;
}
.area-type-strip {
    display: inline-block;
    padding: 0 0.15rem;
    line-height: 0.6rem;
    margin: 0 0.2rem 0.3rem 0;
    border: 0.01rem solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
}
.red-bg {
    color: #fe7649;
    border: 1px solid #ff855d;
    background-color: #ffdbcf;
    background-image: url(../../static/img/goodscreen/false_tag.png);
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
}
.black-bg {
    border: 1px solid #d2d2d2;
    background: #ffffff;
}
/* 服务器确认按钮
    .area-type-btn{
        width:1.89rem;
        text-align:center;
        line-height: .6rem;
        height:.6rem;
        color:#FFFFFF;
        font-size:.26rem;
        margin:.1rem auto .4rem;
        -webkit-border-radius:.3rem;
        -moz-border-radius: .3rem;
        border-radius: .3rem;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
        -webkit-box-shadow: .06rem .05rem .09rem  #FD895C;
        -moz-box-shadow: .06rem .05rem .09rem #FD895C;
        box-shadow: .06rem .05rem .09rem #FD895C;
    } */
/* ============================ 筛选 ======================== */
.screen-type-box {
    padding: 0.3rem 0;
}
.screen-type-strip {
    display: flex;
    justify-content: flex-start;
}
.screen-strip-left {
    display: inline-block;
    width: 22.7%;
    font-size: 0.26rem;
    color: #666666;
    padding-left: 0.2rem;
    vertical-align: top;
}
.screen-strip-right {
    display: inline-block;
    width: 76%;
    vertical-align: top;
    margin-bottom: 0.3rem;
}
.screen-strip-right input::-webkit-outer-spin-button,
.raise-price input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
/* 价格输入 */
.input-price-left {
    line-height: 0.6rem;
}
.input-price-right {
    font-size: 0.26rem;
    color: #333333;
}
.input-price-right input {
    width: 1.4rem;
    height: 0.6rem;
    margin: 0 0.14rem 0 0;
    font-size: 0.26rem;
    padding: 0.1rem;
}
.input-price-right span {
    margin-right: 0.14rem;
}
/* 价格排序 */
.sort-left-text {
    padding-top: 0.1rem;
}
.screen-sort {
    font-size: 0.26rem;
    color: #333333;
    display: inline-block;
    margin-right: 0.3rem;
}
.screen-sort span {
    vertical-align: middle;
}
.screen-sort-check {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.13rem;
    vertical-align: middle;
}
.screen-sort-ico {
    width: 0.12rem;
    height: 0.25rem;
    vertical-align: middle;
}
/* 筛选类型 */
.screen-strip-box {
    display: inline-block;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.15rem;
    margin-right: 0.35rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    color: #666666;
}
/* 筛选确认 */
.screen-type-bottom {
    text-align: center;
    margin-bottom: 0.2rem;
}
.ok-screen-btn {
    display: inline-block;
    width: 1.89rem;
    text-align: center;
    line-height: 0.6rem;
    height: 0.6rem;
    color: #ffffff;
    font-size: 0.26rem;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
    /* -webkit-box-shadow: 3px 3px 6px #fd895c;
    -moz-box-shadow: 3px 3px 6px #fd895c;
    box-shadow: 3px 3px 6px #fd895c; */
}
.no-screen-btn {
    display: inline-block;
    width: 1.89rem;
    text-align: center;
    line-height: 0.6rem;
    height: 0.6rem;
    color: #ffffff;
    font-size: 0.26rem;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
    background: #c6c6c6;
    margin-left: 0.5rem;
}

/* 筛选下栏------ */
.bottom-screen-box {
    padding: 0.3rem 0.2rem;
}
.bottom-screen-box div {
    margin-bottom: 0.3rem;
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

.goodsList {
    /* max-height: 11.45rem; */
    /* height: 100vh; */
    margin-top: 0.8rem;
    /* overflow-y: scroll; */
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
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
}
/* 详情 -- 保障*/
.goods-strip-content {
    margin-bottom: 0.15rem;
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
    float: right;
    text-align: right;
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
    padding: 0.02rem 0.06rem;
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


/*搜索*/
.titInp {
    width: 5.8rem;
    height: 0.88rem;
    margin: 0 auto;
    position: fixed;
    top:0;
    left:calc(50% - 2.9rem);
    z-index:999999;
    line-height:.88rem;
}
.search-title {
    background:#ffffff;
    width: 5.8rem;
    height: 0.66rem;
    font-size: 0.26rem;
    padding: 0 0.6rem;
    margin: 0;
    border-top-left-radius: 0.33rem;
    border-top-right-radius: 0.33rem;
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;
    background:#ffffff;
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
    top: 0.32rem;
    right: 0.25rem;
}
</style>