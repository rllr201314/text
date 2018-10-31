<template>
    <!-- 填写出售信息页 -->
    <div class="sellInfo-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="sellInfo-content">
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>商品资料</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-lefttext">商品标题</span>
                        <input type="text" placeholder="请输入商品标题(20字以内)" v-model="requestData.goods_title" maxlength="20">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">角色等级</span>
                        <input type="number" placeholder="请输入角色等级" v-model="requestData.role_level" oninput="if(value.length>3)value=value.slice(0,3)">
                    </div>
                    <div class="sell-strip" @click="showPop('faction')">
                        <span class="sell-lefttext">职业</span>
                        <div class="right-opt">
                            <span v-text="seleData.faction"></span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip" @click="showPop('sex')">
                        <span class="sell-lefttext">角色性别</span>
                        <div class="right-opt">
                            <span v-text="seleData.sex"></span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-des">商品描述</span>
                        <textarea name="des" id="arbdes" cols="25" rows="3" placeholder="请对商品进行描述(200字以内)" v-model="requestData.goods_description" maxlength="200"></textarea>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>商品标签</span>
                            <span class="red-color">（打上标签，买家更容易搜到哦）</span>
                        </div>
                        <div class="sell-strip-content">
                            <div class="seleTag" v-for="item in sellData.showTag" v-text="item.tag_content"></div>
                            <div class="addTag" @click="addTagFn">＋添加</div>
                        </div>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>上传图片</span>
                            <span class="red-color">（单张图片不能超过2M,最多可上传9张图片）</span>
                        </div>
                        <div class="upimg-content">
                            <div class="img-cell" v-for="(item,index) in sellData.upimgAll.imgSrc">
                                <img :src="item" alt="">
                                <div class="delImg" @click="delImg(index)">
                                    <img src="../../../static/img/order/delete_img.png" alt="">
                                </div>
                            </div>
                            <div class="upimg-cell">
                                <img src="../../../static/img/order/add_img.png" alt="">
                                <input type="file" id="upImg" accept="image/*" multiple  @change="addImg">
                            </div>
                        </div>
                    </div>
                    <!-- <div class="sell-strip">
                        <span class="sell-video">视频看号外链</span>
                        <input type="url" placeholder="复制视频外链通用代码，推荐使用优酷" v-model="requestData.video_url">
                    </div> -->
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>账号信息</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip" @click="showPop('accountType')">
                        <span class="sell-lefttext">账号类型</span>
                        <div class="right-opt">
                            <span v-text="seleData.accountType"></span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip account-bind">
                        <span class="sell-lefttext">账号绑定</span>
                        <div class="strip-radio-right">
                            <div class="screen-sort" v-for="item in sellData.seleSafeData.safe" @click="seleSafe(item.value)">
                                <img class="screen-sort-check" :src="item.ischeck?sellData.seleSafeData.imgSrc.Ok:sellData.seleSafeData.imgSrc.No" alt="">
                                <span v-text="item.name"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 价格设定 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>价格设定</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-lefttext">是否可议价</span>
                        <div class="strip-radio-right">
                            <div class="opera" v-for="item in sellData.sellType.sell" @click="seleSell(item.value)">
                                <img :src="item.ischeck?sellData.sellType.imgSrc.Ok:sellData.sellType.imgSrc.No" alt="">
                                <span v-text="item.name"></span>
                            </div>
                        </div>
                    </div>
                    <div class="sell-strip" v-show="requestData.sell_type == 2">
                        <span class="sell-lefttext">商品最高价</span>
                        <input type="number" placeholder="填写商品最高的出价" v-model="requestData.goods_price" oninput="if(value.length>7)value=value.slice(0,7)">
                    </div>
                    <div class="sell-strip" v-show="requestData.sell_type == 2">
                        <span class="sell-lefttext">商品最低价</span>
                        <input type="number" placeholder="填写可以接受最低的议价价格" v-model="requestData.min_price" oninput="if(value.length>7)value=value.slice(0,7)">
                    </div>
                    <div class="sell-strip" v-show="requestData.sell_type == 1">
                        <span class="sell-lefttext">商品售价</span>
                        <input type="number" placeholder="填写商品价格" v-model="requestData.goods_price" oninput="if(value.length>7)value=value.slice(0,7)">
                    </div>
                    <!-- /////88888888888888888888888888888888888888888888888888888888888888888888888888888888888888 -->
                    <div class="sell-strip" v-if="safeOrCompact.showSafe">
                        <div>
                            <div class="sell-left">保险服务</div>
                            <div class="strip-radio-right">
                                <div class="opera" @click="seleOpera('safe')">
                                    <img :src="sellData.optSafe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                    <span>是</span>
                                </div>
                                <div class="opera" @click="seleOpera('nosafe')" v-if="safeOrCompact.showNoSafe">
                                    <img :src="sellData.optSafe?'../../../static/img/order/nocheck.png':'../../../static/img/order/okcheck.png'" alt="">
                                    <span>否</span>
                                </div>
                            </div>
                        </div>
                        <div class="safe-hint">
                            <div class="sell-left">(保险费用为总价的{{safeOrCompact.parcent}}%)</div>
                            <div class="strip-radio-right">合同费封顶￥{{safeOrCompact.maxPrice}}</div>
                            <div class="strip-radio-right">

                            </div>
                        </div>
                    </div>
                    <div class="sell-strip" v-if="safeOrCompact.showCompact">
                        <div>
                            <div class="sell-left">合同服务</div>
                            <div class="strip-radio-right">
                                <div class="opera" @click="seleOpera('safe')">
                                    <img :src="sellData.optSafe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                    <span>是</span>
                                </div>
                                <div class="opera" @click="seleOpera('nosafe')" v-if="safeOrCompact.showNoCompact">
                                    <img :src="sellData.optSafe?'../../../static/img/order/nocheck.png':'../../../static/img/order/okcheck.png'" alt="">
                                    <span>否</span>
                                </div>
                            </div>
                        </div>
                        <div class="safe-hint">
                            <div class="sell-left">(合同费用为总价的{{safeOrCompact.parcent}}%)</div>
                            <div class="strip-radio-right">合同费封顶￥{{safeOrCompact.maxPrice}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>帐号安全验证</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-video">游戏帐号</span>
                        <input type="text" placeholder="请输入游戏帐号" v-model="requestData.account">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-video">游戏密码</span>
                        <input type="password" placeholder="请输入游戏密码" v-model="requestData.password">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-video">联系人手机号</span>
                        <input type="number" placeholder="请输入手机号，客服将会与您联系" v-model="requestData.mobile">
                    </div>
                    <div class="sell-strip wechat">
                        <span class="sell-video">微信账号</span>
                        <input type="text" placeholder="电话无法联系时，可以通过微信联系您" v-model="requestData.wx">
                    </div>
                </div>
            </div>
        </div>
        <div class="nextBtn" @click="addGoods">下一步</div>
        <div class="tag-wrap" v-show="showTagAll">
            <div class="sele-tag-wrap">
                <div class="sele-tit">已选标签（
                    <span v-text="sellData.seleTag.length"></span>/5）</div>
                <div class="sele-con">
                    <div class="sele-tag" v-for="item in sellData.seleTag" v-text="item.tag_content" @click="seleTagCon(item.tag_id)"></div>
                </div>
            </div>
            <!-- 可选择菜单 -->
            <div class="screen-box server-type-box">
                <!-- 标签大类 -->
                <div class="server-operation-box">
                    <div class="operation-type-strip" v-for="item in sellData.tagType" :class="item.ischeck?'red-border':'black-border'" v-text="item.tag_name" @click="seleTagType(item.tag_type_id)"></div>
                </div>
                <!-- 标签小类 -->
                <div class="server-area-box">
                    <div class="area-type-search">
                        <input type="text" placeholder="搜索">
                        <img class="search-area-ico" src="../../../static/img/search_ico.png" alt="">
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in sellData.tagContent" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.tag_content" @click="seleTagCon(item.tag_id)"></div>
                    </div>
                    <div class="screen-type-bottom">
                        <div class="ok-screen-btn" @click="affirmTag">确认</div>
                        <div class="no-screen-btn" @click="cancelTag">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shade" v-show="showTagAll"></div>
        <!-- 弹出框 -->
        <!-- 职业 -->
        <div id="sheet-faction" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择职业</div>
                </li>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in sellData.faction" @click="seleType(item.faction_id,'faction')" v-text="item.faction_name"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-faction">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
        <!-- 角色性别 -->
        <div id="sheet-sex" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择角色类别</div>
                </li>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in sellData.sex" @click="seleType(item.value,'sex')" v-text="item.name"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-sex">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
        <!-- 账号类型 -->
        <div id="sheet-accountType" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择账号类型</div>
                </li>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in sellData.accountType" @click="seleType(item.value,'accountType')" v-text="item.name"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-accountType">取消</a>
                </li>
            </ul>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: "SellInfo",
    components: {
        Header,
        Loading
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部log
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "我要卖"
                }
            },
            showLoading:false,
            editOrpublish:null,
            showTagAll: false,
            seleData: {
                faction: "未选择",
                sex: "未选择",
                accountType: "未选择"
            },
            safeOrCompact: {
                //-------------------------------------------------------------------**********************************************
                showSafe: false, //显示保险
                showNoSafe: false, //显示可以选择
                showCompact: false, //显示保险
                showNoCompact: false, //显示可以选择
                parcent: "",
                isMax: false,
                maxPrice: ""
            },
            oldData:{},//编辑商品旧数据
            sellData: {
                seleTag: [], //选择的标签
                showTag: [], //确认选择的标签
                // 标签类
                tagType: [],
                // 标签内容
                tagContent: [],
                upimgAll: {
                    imgSrc: [],
                    imgData: {
                        accept: "image/jpeg, image/png, image/jpg"
                    }
                },
                // 是否购买保险
                optSafe: true,
                // 账号绑定
                seleSafeData: {
                    imgSrc: {
                        Ok: "./static/img/goodscreen/okcheck.png",
                        No: "./static/img/goodscreen/nocheck.png"
                    },
                    safe: []
                },
                accountType: [], //账号类型
                faction: [], //职业
                sex: [], //性别
                sellType: {
                    imgSrc: {
                        Ok: "./static/img/order/okcheck.png",
                        No: "./static/img/order/nocheck.png"
                    },
                    sell: []
                }
            },
            category_id:'',
            upData: {},
            requestData: {
                deal_type: "",
                category_id: "",
                operation_id: "",
                area_id: "",
                server_id: "",
                goods_title: "",
                goods_description: "",
                role_level: "",
                faction_id: "",
                person_sex: "",
                tag: "",
                account_type: "",
                account_bind: "",
                is_safe: "",
                is_compact: "",
                sell_type: "",
                goods_price: "",
                min_price: "",
                account: "",
                password: "",
                mobile: "",
                wx: "",
                images: [],
                goods_id:null,
            }
        };
    },
    methods: {
        // 添加图片
        addImg(event) {
            var that = this;
            var imgSrcArr = that.sellData.upimgAll.imgSrc;
            var imgLen = imgSrcArr.length;
            if (imgLen >= 9) {
               mui.toast("图片选择到达上限", { duration: "short", type: "div" });
            } else if (imgLen < 9) {
                var imgArr = [];
                var fileLen = event.target.files.length;
                var allLen = imgLen + fileLen;
                if (allLen > 9) {
                    var addImg = 9 - imgLen;
                    for (var i = 0; i < addImg; i++) {
                        imgArr.push(event.target.files[i]);
                    }
                    mui.toast("图片选择超过上限,只保存9张", { duration: "short", type: "div" });
                }else {
                    imgArr = event.target.files;
                }
                for (var i = 0; i < imgArr.length; i++) {
                    let type = imgArr[i].type; //文件的类型，判断是否是图片
                    let size = imgArr[i].size; //文件的大小，判断图片的大小
                    if (that.sellData.upimgAll.imgData.accept.indexOf(type) == -1) {
                        mui.toast("请选择我们支持的图片格式！", { duration: "short", type: "div" });
                        return false;
                    }
                    if (size > 2097152) {
                        mui.toast("请选择2M以内的图片！", { duration: "short", type: "div" });
                        return false;
                    }
                    var reader = new FileReader();
                    reader.readAsDataURL(imgArr[i]);

                    var fileName = imgArr[i].name;
                    reader.onload = function(e) {
                        // var imgMsg = {
                        //     name: fileName, //获取文件名
                        //     img_url: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        // };
                        imgSrcArr.push(this.result);
                    };
                }
            }
        },
        delImg(ind) {
            var that = this;
            var imgList = that.sellData.upimgAll.imgSrc;
            imgList.splice(ind, 1);
        },
        // 账号绑定
        seleSafe(flag) {
            var safeArr = this.sellData.seleSafeData.safe;
            if (flag == "4") {
                for (var i in safeArr) {
                    if (flag == safeArr[i].value) {
                        safeArr[i].ischeck = true;
                        continue;
                    }
                    safeArr[i].ischeck = false;
                }
            } else {
                for (var i in safeArr) {
                    if (flag == safeArr[i].value) {
                        safeArr[i].ischeck = true;
                    }
                    if (safeArr[i].value == "4") {
                        safeArr[i].ischeck = false;
                    }
                }
            }
        },
        // 选择是否议价
        seleSell(flag) {
            var that = this;
            var sell = that.sellData.sellType.sell;
            for (var i in sell) {
                if (sell[i].value == flag) {
                    that.requestData.sell_type = sell[i].value; //赋值
                    sell[i].ischeck = true;
                    continue;
                }
                sell[i].ischeck = false;
            }
        },
        // 保险
        seleOpera(flag) {
            if (flag == "safe") {
                this.sellData.optSafe = true;
            } else if (flag == "nosafe") {
                this.sellData.optSafe = false;
            }
        },
        // 选择标签大类-----------------------------------------------------------------
        seleTagType(tag_type_id) {
            var tagType = this.sellData.tagType;
            for (var i in tagType) {
                if (tag_type_id == tagType[i].tag_type_id) {
                    tagType[i].ischeck = true;
                    continue;
                }
                tagType[i].ischeck = false;
            }
            this.getTagCon(tag_type_id);
        },
        // 选择小类
        seleTagCon(tag_id) {
            var that = this;
            var tagContent = that.sellData.tagContent;
            var seleTag = that.sellData.seleTag;
            // console.log(seleTag)
            for (var i in tagContent) {
                if (tagContent[i].tag_id == tag_id) {
                    if (tagContent[i].ischeck) {
                        tagContent[i].ischeck = false;
                        for (var j in seleTag) {
                            if (seleTag[j].tag_id == tag_id) {
                                seleTag.splice(j, 1);
                            }
                        }
                    } else {
                        if (seleTag.length < 5) {
                            that.sellData.seleTag.push(tagContent[i]);
                            tagContent[i].ischeck = true;
                        } else {
                            mui.alert("最多只能选择五个标签哦！","提示","确认","","div");
                        }
                    }
                    break;
                }
            }
        },
        //   确认选择标签
        affirmTag() {
            var that = this;
            that.sellData.showTag = [];
            var seleTag = that.sellData.seleTag;
            for (var i in seleTag) {
                that.sellData.showTag.push(seleTag[i]);
            }
            this.showTagAll = false;
            $("body").css("overflow", "");
        },
        //   取消
        cancelTag() {
            var that = this;
            that.sellData.seleTag = [];
            var showTag = that.sellData.showTag;
            for (var i in showTag) {
                that.sellData.seleTag.push(showTag[i]);
            }
            this.showTagAll = false;
            $("body").css("overflow", "");
        },
        // 添加标签
        addTagFn() {
            var that = this;
            this.showTagAll = true;
            $("body").css("overflow", "hidden");
            var tagCon = that.sellData.tagContent;
            var seleTag = that.sellData.seleTag;
            for (var i in tagCon) {
                tagCon[i].ischeck = false;
            }
            // 再判断
            for (var i in seleTag) {
                for (var x in tagCon) {
                    if (seleTag[i].tag_id == tagCon[x].tag_id) {
                        tagCon[x].ischeck = true;
                    }
                }
            }
        },
        // 显示那个弹出框
        showPop(flag) {
            mui("#sheet-" + flag).popover("toggle");
        },
        // 选择职业 -- 角色类别 -- 账号类型
        seleType(opt, flag) {
            var that = this;
            mui("#sheet-" + flag).popover("toggle");
            // 职业
            if (flag == "faction") {
                var faction = that.sellData.faction;
                for (var i in faction) {
                    if (opt == faction[i].faction_id) {
                        that.requestData.faction_id = faction[i].faction_id;
                        that.seleData.faction = faction[i].faction_name;
                    }
                }
            } else if (flag == "sex") {
                //角色性别
                var sex = that.sellData.sex;
                for (var i in sex) {
                    if (opt == sex[i].value) {
                        that.requestData.person_sex = sex[i].value;
                        that.seleData.sex = sex[i].name;
                    }
                }
            } else if (flag == "accountType") {
                //账号类型
                var accountType = that.sellData.accountType;
                for (var i in accountType) {
                    if (opt == accountType[i].value) {
                        that.requestData.account_type = accountType[i].value;
                        that.seleData.accountType = accountType[i].name;
                    }
                }
            }
        },
        // 获取标签小类
        getTagCon(tag_type_id) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"tag_content", {
                    category_id: that.category_id,
                    tag_type_id: tag_type_id
                })
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var tagAll = res.data.data;
                            var seleTag = that.sellData.seleTag;
                            // 先赋值
                            for (var i in tagAll) {
                                tagAll[i].ischeck = false;
                            }
                            // 再判断
                            for (var i in seleTag) {
                                for (var x in tagAll) {
                                    if (seleTag[i].tag_id == tagAll[x].tag_id) {
                                        tagAll[x].ischeck = true;
                                    }
                                }
                            }
                            that.sellData.tagContent = tagAll;
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 发布商品
        addGoods() {
            var that = this;
            var that_req = that.requestData;                              
            if (that_req.goods_title == "") {
                mui.alert("请输入商品标题", "提示", "确认", "", "div");
                return false;
            }
            if (that_req.role_level == "") {
                mui.alert("请输入游戏等级", "提示", "确认", "", "div");
                return false;
            } else {
                if (that_req.role_level > 999) {
                    mui.alert("请输入正确的游戏等级","提示","确认", "","div");
                    return false;
                }
            }
            if (that_req.faction_id == "") {
                mui.alert("请选择职业", "提示", "确认", "", "div");
                return false;
            }
            if (that_req.person_sex == "") {
                mui.alert("请选择角色性别", "提示", "确认", "", "div");
                return false;
            }
            if (that_req.goods_description == "") {
                mui.alert("请输入商品描述", "提示", "确认", "", "div");
                return false;
            } else if (that_req.goods_description.length > 120) {
                mui.alert("商品描述最多可以输入120字", "提示","确认","","div");
                return false;
            }

            var tagAll = that.sellData.showTag;
            // if (tagAll.length == 0) {
            //     mui.alert("请选择商品标签", "提示", "确认", "", "div");
            //     return false;
            // } else
            if(tagAll.length > 0) {
                var str = "";
                for (var i in tagAll) {
                    str += "," + tagAll[i].tag_id;
                }
                that_req.tag = str.substring(1);
            }
            // var upImg = that.sellData.upimgAll.imgSrc;
            // if (upImg.length == 0) {
            //     mui.alert("请选择商品图片", "提示", "确认", "", "div");
            //     return false;
            // } else {
            //     for(var i in upImg){
            //         that_req.images.push(upImg[i].img_url);
            //     }
            // }
            that_req.images = that.sellData.upimgAll.imgSrc;

            // 账号类型
            if (that_req.account_type == "") {
                mui.alert("请选择账号类型", "提示", "确认", "", "div");
                return false;
            }
            // 账号绑定
            var safe = this.sellData.seleSafeData.safe;
            var safe_flag = false;
            var safe_str = "";
            for (var i in safe) {
                if (safe[i].ischeck == true) {
                    safe_flag = true;
                    safe_str += "," + safe[i].value;
                }
            }
            if (safe_flag) {
                that_req.account_bind = safe_str.substring(1);
            } else {
                mui.alert("请选择账号绑定", "提示", "确认", "", "div");
                return false;
            }
            // 议价还是一口价 -- 价格
            if (that_req.sell_type == 1) {
                if (that_req.goods_price == "") {
                    mui.alert("请输入商品价格", "提示", "确认", "", "div");
                    return false;
                }
            } else if (that_req.sell_type == 2) {
                if (that_req.goods_price == "") {
                    mui.alert("请输入可议价最高价格","确认","","div");
                    return false;
                } else if (that_req.min_price == "") {
                    mui.alert("请输入可议价最低价格","提示","确认","","div");
                    return false;
                }
            }
            // 合同还是保险
            var compact = that.safeOrCompact.showCompact;
            var noCompact = that.safeOrCompact.showNoCompact;
            var safe = that.safeOrCompact.showSafe;
            var noSafe = that.safeOrCompact.showNoSafe;
            if (compact) {
                // console.log('合同');
                that_req.is_compact = 1;
                if (noCompact) {
                    // console.log('可选合同');
                    var isSell = that.sellData.optSafe;
                    if (!isSell) {
                        // console.log('不买合同');
                        that_req.is_compact = 2;
                    }
                }
                that_req.is_safe = 2;
            } else if (safe) {
                // console.log('保险');
                that_req.is_safe = 1;
                if (noSafe) {
                    // console.log('可选保险');
                    var isSell = that.sellData.optSafe;
                    if (!isSell) {
                        // console.log('不买保险');
                        that_req.is_safe = 2;
                    }
                }
                that_req.is_compact = 2;
            }
            // 账号
            if (that_req.account == "") {
                mui.alert("未输入账号", "提示", "确认", "", "div");
                return false;
            }
            // 密码
            if (that_req.password == "") {
                mui.alert("未输入密码", "提示", "确认", "", "div");
                return false;
            }
            // 手机
            if (that_req.mobile == "") {
                mui.alert("请输入手机号", "提示", "确认", "", "div");
                return false;
            } else {
                var phoneReg = /^1[3-9][0-9]{9}$/g;
                if (!that_req.mobile.match(phoneReg)) {
                    mui.alert("您输入的手机号不正确","提示","确定","","div");
                    return false;
                }
            }
            // 微信
            if (that_req.wx == "") {
                mui.alert("请输入微信账号", "提示", "确认", "", "div");
                return false;
            }else{
                var reg = /[\u4e00-\u9fa5]/g;
                if(that_req.wx.match(reg)){
                    mui.alert("请输入正确微信账号", "提示", "确认", "", "div");
                    return false;
                }
            }
            // console.log(that_req);
            // let config = {
            //     headers: { "Content-Type": "multipart/form-data" }
            // };
            // let param = new FormData();
            // console.log(that_req.images);
            // for(var i in that_req){
            //     if(i == 'images'){
            //         for(var x in that_req.images){
            //             // console.log("img")
            //              param.append('images[]',that_req.images[x])
            //         }
            //     }else{
            //         param.append(i,that_req[i])
            //     }
            // }
            var url = null;
            if(that.editOrpublish == 1){
                url = 'add_goods';
            }else if(that.editOrpublish == 2){
                url = 'edit_goods';
                // that_req.goods_id = that.goods_id;
            }
            that.showLoading = true;
            that.$axios.post(process.env.API_HOST+url,that_req)
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        that.showLoading = false;
                        if(res.data.code == 200){
                            mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.push({name:'MyCenter'});
                            },'div');
                        }else{
                            mui.alert(res.data.msg,'提示','确认','','div');
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 判断合同还是保险
        judgeInfo(chargeInfo) {
            var that = this;
            var compact_rate = chargeInfo.compact_rate;

            var force_compact = chargeInfo.force_compact;
            var force_safe = chargeInfo.force_safe;
            var is_bind = chargeInfo.is_bind;
            var is_compact = chargeInfo.is_compact;
            var is_safe = chargeInfo.is_safe;
            var max_compact = chargeInfo.max_compact;
            var max_safe = chargeInfo.max_safe;
            var safe_rate = chargeInfo.safe_rate;
            // 是否显示合同
            if (force_compact == 1) {
                that.safeOrCompact.showCompact = true;
                that.safeOrCompact.showNoCompact = false;
            } else if (force_compact == 2) {
                if (is_compact == 1) {
                    that.safeOrCompact.showCompact = true;
                    that.safeOrCompact.showNoCompact = true;
                } else if (is_compact == 2) {
                    that.safeOrCompact.showCompact = false;
                    that.safeOrCompact.showNoCompact = false;
                }
            }
            if (that.safeOrCompact.showCompact == true) {
                that.safeOrCompact.parcent = parseInt(compact_rate * 100);
                that.safeOrCompact.isMax = true;
                that.safeOrCompact.maxPrice = max_compact;
            }

            // 是否显示保险
            if (force_safe == 1) {
                that.safeOrCompact.showSafe = true;
                that.safeOrCompact.showNoSafe = false;
            } else if (force_safe == 2) {
                if (is_safe == 1) {
                    that.safeOrCompact.showSafe = true;
                    that.safeOrCompact.showNoSafe = true;
                } else if (is_safe == 2) {
                    that.safeOrCompact.showSafe = false;
                    that.safeOrCompact.showNoSafe = false;
                }
            }
            if (that.safeOrCompact.showSafe == true) {
                that.safeOrCompact.parcent = parseInt(safe_rate * 100);
                that.safeOrCompact.isMax = true;
                that.safeOrCompact.maxPrice = max_safe;
            }
        },
        getTagType(){
            var that = this;
            // 请求标签大类
            that.$axios
                .post(process.env.API_HOST+"tag_type", {
                    category_id: that.category_id
                })
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var tagType = res.data.data;
                            for (var i in tagType) {
                                if (i == 0) {
                                    tagType[0].ischeck = true;
                                    continue;
                                }
                                tagType[i].ischeck = false;
                            }
                            that.sellData.tagType = tagType;
                            that.getTagCon(tagType[0].tag_type_id);
                        }else if(res.data.code == 401){
                            // 登录状态过期
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
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        getConfig(opt,flag){
            var that = this;
            // 请求选择参数
            // console.log(opt)
            that.$axios
                .post(process.env.API_HOST+"other_config", {
                    category_id: opt.category_id,
                    operation_id: opt.operation_id
                })
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data;
                            // 发布
                            if(flag == 1){
                                var safe = data.account_bind; 
                                for (var i in safe) {
                                    safe[i].ischeck = false;
                                }
                                that.sellData.seleSafeData.safe = safe;//账号绑定
                                var sellType = data.sell_type;
                                for (var i in sellType) {
                                    if (sellType[i].name == "一口价") {
                                        that.requestData.sell_type = sellType[i].value;
                                        sellType[i].ischeck = true;
                                        continue;
                                    }
                                    sellType[i].ischeck = false;
                                }
                                that.sellData.sellType.sell = sellType; //是否议价
                                that.sellData.sex = data.person_sex; //角色性别
                                that.sellData.faction = data.faction; //职业
                                that.sellData.accountType = data.account_type; //账号类型
                                that.judgeInfo(data.chargeInfo);
                            }else if(flag == 2){//编辑
                                var oldData = that.oldData;
                                var safe = data.account_bind;
                                for(var i in safe){
                                    safe[i].ischeck = false;
                                    for(var j in oldData.account_bind){
                                        if(safe[i].value == oldData.account_bind[j]){
                                            safe[i].ischeck = true;
                                            break;
                                        }
                                    }
                                }
                                that.sellData.seleSafeData.safe = safe;//账号绑定
                                
                                var sellType = res.data.data.sell_type;
                                for (var i in sellType) {
                                    if (sellType[i].value == oldData.sell_type) {
                                        that.requestData.sell_type = sellType[i].value;
                                        sellType[i].ischeck = true;
                                        continue;
                                    }
                                    sellType[i].ischeck = false;
                                }
                                that.sellData.sellType.sell = sellType; //是否议价
                                // 角色性别
                                for(var i in data.person_sex){
                                    if(data.person_sex[i].value == oldData.person_sex){
                                        that.requestData.person_sex = data.person_sex[i].value;
                                        that.seleData.sex = data.person_sex[i].name;
                                    }
                                }
                                // 职业
                                for(var i in data.faction){
                                    if(data.faction[i].faction_id == oldData.faction_id){
                                        that.requestData.faction_id = data.faction[i].faction_id;
                                        that.seleData.faction = data.faction[i].faction_name;
                                    }
                                }
                                // 账号类型
                                for(var i in data.account_type){
                                    if(data.account_type[i].value == oldData.account_type){
                                        that.requestData.account_type = data.account_type[i].value;
                                        that.seleData.accountType = data.account_type[i].name;
                                    }
                                }
                                that.sellData.showTag = oldData.tag;
                                that.sellData.seleTag = oldData.tag;
                                // 图片
                                for(var i in oldData.images){
                                    that.sellData.upimgAll.imgSrc.push(oldData.images[i].img_url);
                                }
                                that.sellData.sex = data.person_sex; //角色性别
                                that.sellData.faction = data.faction; //职业
                                that.sellData.accountType = data.account_type; //账号类型
                                that.judgeInfo(data.chargeInfo);//判断合同还是保险
                            }
                        }else if(res.data.code == 401){
                            // 登录状态过期
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
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        getRedact(goods_id){
            var that = this;
            // console.log(that.$router);
            that.$axios.post(process.env.API_HOST+"get_goods",{
                goods_id:goods_id
            }).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.showLoading = false;
                        // console.log(res.data.data);
                        var data = res.data.data;
                        that.category_id = data.category_id;
                        var that_req = that.requestData;
                        that_req.deal_type = data.deal_type; //商品类型
                        that_req.category_id = data.category_id;
                        that_req.operation_id = data.operation_id;
                        that_req.area_id = data.area_id;
                        if (data.server_id != "") {
                            that_req.server_id = data.server_id;
                        }
                        that_req.goods_price = parseInt(data.goods_price);
                        that_req.min_price = parseInt(data.min_price);
                        that_req.role_level = data.role_level;
                        that_req.goods_title = data.goods_title;
                        that_req.goods_description = data.goods_description;
                        that_req.mobile = data.mobile;
                        that_req.wx = data.wx;
                        that_req.video_url = data.video_url;
                        that.oldData = data;//编辑商品旧数据
                        
                        that.getConfig(that_req,2);//请求选择参数
                        that.getTagType();//请求标签大类
                    }else if(res.data.code == 401){
                        // 登录状态过期
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
                        mui.alert(res.data.msg,'提示','确认',() =>{
                            that.$router.go(-1);
                        },'div')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        var that = this;
        // 图片多选 判断手机类型
        if (getIos()) {
            $("#upImg").removeAttr("capture");
        }
        function getIos() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iPhone\sOS/i) == "iphone os") {
                return true;
            } else {
                return false;
            }
        }
        var token = this.$store.state.token;
        if (token == undefined || token == "") {
            mui.alert(
                "请先登陆",
                "提示",
                "确认",
                function() {
                    that.$router.push({ name: "AccountLogin" });
                },
                "div"
            );
            return false;
        }
        var opt = that.$route.query;
        // console.log(opt);
        // 判断有没有传参过来

        if(JSON.stringify(opt) == "{}"){
            that.$router.go(-1); 
        } else {
            if(opt.flag == 1){
                that.category_id = opt.category_id;
                that.requestData.category_id = opt.category_id;
                that.requestData.deal_type = opt.deal_type;
                that.requestData.operation_id = opt.operation_id;
                that.requestData.area_id = opt.area_id;
                that.requestData.server_id = opt.server_id;
                that.getTagType();//获取标签大类
                that.comData.showTitle.title = "我要卖";
                that.getConfig(opt,opt.flag);//请求选择参数
                that.editOrpublish = 1;
            }else if(opt.flag == 2){
                that.showLoading = true;
                that.getRedact(opt.g);
                that.comData.showTitle.title = "编辑";
                that.editOrpublish = 2;
                that.requestData.goods_id = opt.g;
            }else{
                that.$router.go(-1); 
            }
        }
    }
};
</script>
<style scoped>
.sellInfo-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top:.88rem;
}

.sellInfo-content {
    padding: 0.2rem;
}

.sellInfo-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}

.sell-cell-top {
    line-height: 0.7rem;
    border-bottom: 1px solid #e5e5e5;
}

.sell-cell-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}

.sell-cell-top img {
    width: 0.08rem;
    height: 0.25rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}

.sell-cell-content {
    padding-left: 0.2rem;
}

.sell-strip {
    font-size: 0.26rem;
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}

.sell-lefttext {
    width: 1.5rem;
    line-height: 0.9rem;
    display: inline-block;
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
    margin-top: -0.03rem;
}

.right-opt span {
    vertical-align: middle;
    display: inline-block;
    line-height: 0.9rem;
}

.sell-des {
    vertical-align: top;
    width: 1.3rem;
    margin: 0.25rem 0 0;
    display: inline-block;
}

#arbdes {
    border: none;
    width: 5.3rem;
    height: 1.5rem;
    padding: 0;
    font-size: 0.24rem;
    margin: 0.25rem 0 0.1rem;
    vertical-align: middle;
}

.sell-strip-title {
    margin-top: 0.2rem;
}

.sell-strip-content {
    padding: 0.15rem 0;
}

.red-color {
    color: #ff5e5e;
}

.sell-strip-content div {
    line-height: 0.6rem;
    padding: 0 0.17rem;
    display: inline-block;
    border-radius: 0.06rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    margin: 0 0.35rem 0.3rem 0;
}

.addTag {
    border: 1px solid #d2d2d2;
    color: #999999;
}

.seleTag {
    border: 1px solid #ff855d;
    color: #fe7649;
    background: #ffdbcf;
}

/* 上传图片 */
.upimg-content {
    padding: 0.2rem 0 0;
}

.img-cell {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
}

.img-cell img {
    width: 1.5rem;
    height: 1.5rem;
}

.delImg {
    position: absolute;
    top: -0.1rem;
    right: -0.1rem;
    z-index: 1;
}

.delImg img {
    width: 0.32rem;
    height: 0.32rem;
}

.upimg-cell {
    vertical-align: top;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
    padding: 0;
    overflow: hidden;
}

.upimg-cell img {
    width: 1.5rem;
    height: 1.5rem;
}

#upImg {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    opacity: 0;
}

.sell-video {
    display: inline-block;
    line-height: 0.9rem;
    margin-right: 0.1rem;
}

/* 账号信息  账号绑定*/
.screen-sort {
    font-size: 0.26rem;
    color: #333333;
    display: inline-block;
    margin-right: 0.2rem;
}

.screen-sort span {
    vertical-align: middle;
}

.screen-sort-check {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.03rem;
    vertical-align: middle;
}

/* 购买保险 */
.sell-left {
    padding: 0.2rem 0;
    display: inline-block;
    vertical-align: middle;
}

/* 价格设定 是否可议价 */
/* 选项 */
.strip-radio-right {
    display: inline-block;
}

.opera {
    display: inline-block;
    margin-left: 0.7rem;
}

.opera img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}

.opera span {
    font-size: 0.26rem;
    color: #333333;
    vertical-align: middle;
}

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0 auto 0.3rem;
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

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 4.7rem;
    height: 0.6rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

input[type="number"] {
    -moz-appearance: textfield;
}

::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

:-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

::-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

:-ms-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

.tag-wrap {
    position: fixed;
    top: 0.9rem;
    left: 0;
    right: 0;
    z-index: 9;
}

.shade {
    position: fixed;
    top: 0.9rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background: rgba(0, 0, 0, 0.3);
}

.sele-tag-wrap {
    background: #ffffff;
    padding: 0.4rem 0.2rem 0.26rem;
}

.sele-tit {
    color: #333333;
    font-size: 0.26rem;
}

.sele-con {
    height: 1.8rem;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 0.2rem;
}

.sele-con div {
    margin: 0 0.4rem 0.2rem 0;
}

.sele-tag {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.15rem;
    margin-right: 0.4rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    color: #fe7649;
    border: 1px solid #ff855d;
    background-color: #ffdbcf;
    background-image: url(../../../static/img/goodscreen/false_tag.png);
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
}

/* ====服务器==== */
.server-type-box {
    background: #f3f3f3;
    height: 7rem;
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
    width: 75%;
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
    position: relative;
    text-align: center;
    margin-bottom: 0.3rem;
}

.area-type-search input {
    width: 4.95rem;
    height: 0.6rem;
    font-size: 0.24rem;
    padding-left: 0.4rem;
    border: 1px solid #dcdcdc;
}

.search-area-ico {
    width: 0.19rem;
    height: 0.19rem;
    position: absolute;
    left: 0.45rem;
    top: 0.2rem;
}

/* 区服 */
.area-type-content {
    color: #666666;
    font-size: 0.24rem;
    padding-left: 0.3rem;
    height: 4.8rem;
    padding-bottom: 0.2rem;
    overflow-y: auto;
}

.area-type-strip {
    display: inline-block;
    padding: 0 0.15rem;
    line-height: 0.6rem;
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

.account-bind {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
}

.account-bind div {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
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

.screen-type-bottom {
    text-align: center;
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
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd895c;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd895c;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd895c;
    margin-right: 0.5rem;
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
}
</style>
