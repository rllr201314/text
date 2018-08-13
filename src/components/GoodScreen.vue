<template>
    <!-- 商品列表 商品筛选  -->
    <div class="good-screen-wrap">
        <Header v-bind:showTitle="copmonentsData.showTitle"></Header>
        <div class="screen-title">
            <div class="screen-title-top">
                <div class="title-top-cell" v-for="(item,index) in screenTop" @click="topScreen(item.flag,index)">
                    <span class="title-top-title" v-text="item.tit_top_text"></span>
                    <img class="title-top-img" :src="item.tit_top_src" alt="">
                </div>
            </div>
            <div class="screen-title-bottom">
                <div class="title-bottom-cell" v-for="(item,index) in screenBottom" @click="bottomScreen(item.flag,index)">
                    <span class="title-bottom-title" v-text="item.tit_bottom_text"></span>
                    <img class="title-bottom-img" :src="item.tit_bottom_src" alt="">
                </div>
            </div>
        </div>
        <!-- 商品列表 -->
        <GoodsList v-bind:goodsList="copmonentsData.goodsList"></GoodsList>
        <!-- 账号 -->
        <div class="screen-box account-type-box" v-show="screenInfoAll[0].isShow">
            <div class="account-type-strip" v-for="(item,index) in account_info" :class="item.ischeck?'red-color':'black-color'" v-text="item.name" @click="seleAccount(index)" ></div>
        </div>
        <!-- 手机型号 -->
        <div class="screen-box phone-type-box" v-show="screenInfoAll[1].isShow">
            <div  class="phone-type-strip" v-for="(item,index) in phone_info" :class="item.ischeck?'red-color':'black-color'" v-text="item.name" @click="selePhone(index)" ></div>
        </div>
        <!-- 服务器 -->
        <div class="screen-box server-type-box" v-show="screenInfoAll[2].isShow">
            <!-- 平台 -->
            <div class="server-operation-box">
                <div class="operation-type-strip" v-for="(item,index) in operation_info" :class="item.ischeck?'red-border':'black-border'" v-text="item.name" @click="seleOperation(index)"></div>
            </div>
            <!-- 区服 -->
            <div class="server-area-box">
                <div class="area-type-search">
                    <input type="text" placeholder="搜索">
                    <img class="search-area-ico" src="../../static/img/search_ico.png" alt="">
                </div>
                <div class="area-type-content">
                    <div class="area-type-strip" v-for="(item,index) in area_info" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.name" @click="seleArea(index)"></div>
                </div>
                <!-- <div class="area-type-btn">确认</div> -->
            </div>
        </div>
        <!-- 筛选 -->
        <div class="screen-box screen-type-box" v-show="screenInfoAll[3].isShow">
            <div class="screen-type-strip">
                <div class="screen-strip-left input-price-left">价格范围</div>
                <div class="screen-strip-right input-price-right">
                    <input class="downPrice" type="number"><span>——</span><input class="upPrice" type="number">元
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
                    <div class="screen-strip-box" v-for="item in screen_info.accountBind" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('accountBind',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">图片状态</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.imgStatus" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('imgStatus',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">视频状态</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.videoStatus" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('videoStatus',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">售价类型</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.sellType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('sellType',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">是否可分期</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.isStages" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('isStages',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">保险情况</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.isInsurance" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('isInsurance',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-strip">
                <div class="screen-strip-left">等级</div>
                <div class="screen-strip-right">
                    <div class="screen-strip-box" v-for="item in screen_info.levelType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('levelType',item.name)"></div>
                </div>
            </div>
            <div class="screen-type-bottom">
                <div class="ok-screen-btn">确认</div>
                <div class="no-screen-btn">取消</div>
            </div>
        </div>
        <!-- 神兽 -->
        <div class="screen-box bottom-screen-box pokemon-type-box" v-show="screenInfoAll[4].isShow">
            <div class="screen-strip-box" v-for="item in screen_info.pokemonType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('pokemon',item.name)"></div>
        </div>
        <!-- 职业 -->
        <div class="screen-box bottom-screen-box profession-type-box" v-show="screenInfoAll[5].isShow">
            <div class="screen-strip-box" v-for="item in screen_info.professionType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('profession',item.name)"></div>
        </div>
        <!-- 门派 -->
        <div class="screen-box bottom-screen-box school-type-box" v-show="screenInfoAll[6].isShow">
            <div class="screen-strip-box" v-for="item in screen_info.schoolType" v-text="item.name" :class="item.ischeck?'red-bg':'black-bg'" @click="seleScreen('school',item.name)"></div>
        </div>
        <!-- 遮罩 -->
        <div class="goodscreen-shade" v-show="screenInfoAll[7].isShow" @click="hiddenScreenFun()"></div>
    </div>
</template>

<script>
    import Header from '@/components/home-page/Header' //头部
    import GoodsList from '@/components/auction-details/GoodsList' //商品列表
    export default {
        name: "GoodScreen",
        data(){
            return{
                // 组件的数据
                copmonentsData:{
                    // Header
                    showTitle:{
                        showBack:false,
                        showLogo:3,//显示头部inp
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,
                        title:"",
                    },
                    // 商品列表
                    goodsList:{
                        showSafe:true,
                        goodsInfo:[{
                            isBoutique:true,
                            goods_type:'成品号',
                            account_type:'安卓',
                            area:'安卓一区',
                            goods_des:'贵6小号可议价，手快有手慢无',
                            goods_safe:['./static/img/goodscreen/safe_ico.png','./static/img/goodscreen/stages_ico.png','./static/img/goodscreen/verify.png'],
                            goods_price:'￥600',
                            isBargain:true
                        }]
                    },
                },
                // 筛选---之上
                screenTop:[{
                    flag:'account',
                    tit_top_text:'账号',
                    tit_top_src:'./static/img/goodscreen/downempty.png',
                    ischeck:false
                },{
                    flag:'phone',
                    tit_top_text:'苹果',
                    tit_top_src:'./static/img/goodscreen/downempty.png',
                    ischeck:false
                },{
                    flag:'server',
                    tit_top_text:'服务器',
                    tit_top_src:'./static/img/goodscreen/downempty.png',
                    ischeck:false
                },{
                    flag:'screen',
                    tit_top_text:'筛选',
                    tit_top_src:'./static/img/goodscreen/downempty.png',
                    ischeck:false
                }],
                // 筛选---之下
                screenBottom:[{
                    flag:'pokemon',
                    tit_bottom_text:'神兽',
                    tit_bottom_src:'./static/img/goodscreen/downsolid.png',
                    ischeck:false
                },{
                    flag:'profession',
                    tit_bottom_text:'职业',
                    tit_bottom_src:'./static/img/goodscreen/downsolid.png',
                    ischeck:false
                },{
                    flag:'school',
                    tit_bottom_text:'门派',
                    tit_bottom_src:'./static/img/goodscreen/downsolid.png',
                    ischeck:false
                }],
                // 选择筛选需要的条件---------
                screenInfoAll:[{
                    name:'account',
                    isShow:false,//是否显示选择--账号--选项块
                },{
                    name:'phone',
                    isShow:false,//是否显示选择--手机--选项块
                },{
                    name:'server',
                    isShow:false,//是否显示选择--服务器--选项块
                },{
                    name:'screen',
                    isShow:false,//是否显示选择--筛选--选项块
                },{
                    name:'pokemon',
                    isShow:false,//是否显示----神兽--选项块
                },{
                    name:'profession',
                    isShow:false,//是否显示---职业--选项块
                },{
                    name:'school',
                    isShow:false,//是否显示--学校--选项块
                },{
                    name:'Shade',
                    isShow:false,//是否显示遮罩
                }],
                // 账号类型
                account_info:[{
                    name:'账号',
                    ischeck:false
                },{
                    name:'首充号',
                    ischeck:false
                },{
                    name:'道具',
                    ischeck:false
                },{
                    name:'游戏币',
                    ischeck:false
                },{
                    name:'代练',
                    ischeck:false
                }],
                // 手机系统
                phone_info:[{
                    name:'苹果',
                    ischeck:false
                },{
                    name:'安卓',
                    ischeck:false
                }],
                // 平台
                operation_info:[{
                    name:'不限',
                    ischeck:false
                },{
                    name:'一区',
                    ischeck:true
                },{
                    name:'二区',
                    ischeck:false
                },{
                    name:'三区',
                    ischeck:false
                },{
                    name:'四区',
                    ischeck:false
                },{
                    name:'五区',
                    ischeck:false
                }],
                // 服务器
                area_info:[{
                    name:'苹果哈哈哈哈哈一区',
                    ischeck:false
                },{
                    name:'苹果一区',
                    ischeck:false
                },{
                    name:'苹果一区',
                    ischeck:false
                },{
                    name:'苹果一区',
                    ischeck:false
                },{
                    name:'苹果一区',
                    ischeck:false
                },{
                    name:'苹果一区',
                    ischeck:false
                }],
                // 筛选条件
                screen_info:{
                    // 单选----选择价格排序
                    sortPrice:{
                        sortSrc:{
                            sortPriceOk:'./static/img/goodscreen/okcheck.png',
                            sortPriceNo:'./static/img/goodscreen/nocheck.png'
                        },
                        ischeck:{
                            downSort:false,
                            upSort:false,
                            moreSort:false
                        }
                    },
                    // 单选----账号绑定
                    accountBind:[{
                        name:'绑定手机号',
                        ischeck:false
                    },{
                        name:'绑定邮箱',
                        ischeck:false
                    },{
                        name:'绑定身份证',
                        ischeck:false
                    }],
                    // 单选--是否有图
                    imgStatus:[{
                        name:'有图',
                        ischeck:false
                    },{
                        name:'无图',
                        ischeck:false
                    }],
                    // 视频状态
                    videoStatus:[{
                        name:'有视频',
                        ischeck:false
                    },{
                        name:'无视频',
                        ischeck:false
                    }],
                    // 售价类型
                    sellType:[{
                        name:'一口价',
                        ischeck:false
                    },{
                        name:'可议价',
                        ischeck:false
                    }],
                    // 是否分期
                    isStages:[{
                        name:'可分期',
                        ischeck:false
                    },{
                        name:'不可分期',
                        ischeck:false
                    }],
                    // 保险情况
                    isInsurance:[{
                        name:'有保险',
                        ischeck:false
                    },{
                        name:'无保险',
                        ischeck:false
                    }],
                    // 等级
                    levelType:[{
                        name:'50~90级',
                        ischeck:false
                    },{
                        name:'90~120级',
                        ischeck:false
                    }],
                    // 神兽
                    pokemonType:[{
                        name:'超级英雄辜',
                        ischeck:false
                    },{
                        name:'超级英雄辜',
                        ischeck:false
                    },{
                        name:'超级英雄辜',
                        ischeck:false
                    },{
                        name:'超级英雄辜',
                        ischeck:false
                    },{
                        name:'超级英雄辜',
                        ischeck:false
                    }],
                    // 职业
                    professionType:[{
                        name:'战士',
                        ischeck:false
                    },{
                        name:'射手',
                        ischeck:false
                    },{
                        name:'法师',
                        ischeck:false
                    },{
                        name:'刺客',
                        ischeck:false
                    },{
                        name:'辅助',
                        ischeck:false
                    }],
                    // 门派
                    schoolType:[{
                        name:'西北大',
                        ischeck:false
                    },{
                        name:'西安交大',
                        ischeck:false
                    },{
                        name:'陕师范',
                        ischeck:false
                    },{
                        name:'外国语',
                        ischeck:false
                    },{
                        name:'西北工业',
                        ischeck:false
                    }]
                } 
            }
        },
        methods:{
            // 上一栏选项
            topScreen(flag,index){
                var screentop = this.screenTop;
                var screenbottom = this.screenBottom;
                // 点击时让其他的变成未选状态
                for(var i in screenbottom){
                    screenbottom[i].tit_bottom_src = './static/img/goodscreen/downsolid.png';
                    screenbottom[i].ischeck = false;
                }
                for(var i in screentop){
                    screentop[i].tit_top_src ='./static/img/goodscreen/downempty.png';
                    if(i == index){
                        continue;
                    }
                    screentop[i].ischeck = false;
                }
                // 点击
                if(screentop[index].ischeck){
                    screentop[index].tit_top_src ='./static/img/goodscreen/downempty.png';
                    screentop[index].ischeck = false;
                }else{
                    screentop[index].tit_top_src = './static/img/goodscreen/upempty.png';
                    screentop[index].ischeck = true;
                }
                this.showScreenFun(flag);//显示哪一个筛选框
            },
            // 下一栏选项
            bottomScreen(flag,index){
                var screenbottom = this.screenBottom;
                var screentop = this.screenTop;
                // 点击时让其他的变成未选状态
                for(var i in screentop){
                    screentop[i].tit_top_src ='./static/img/goodscreen/downempty.png';
                    screentop[i].ischeck = false;
                }
                for(var i in screenbottom){
                    screenbottom[i].tit_bottom_src = './static/img/goodscreen/downsolid.png';
                    if(i == index){
                        continue;
                    }
                    screenbottom[i].ischeck = false;
                }
                // 点击
                if(screenbottom[index].ischeck){
                     screenbottom[index].tit_bottom_src ='./static/img/goodscreen/downsolid.png';
                    screenbottom[index].ischeck = false;
                }else{
                    screenbottom[index].tit_bottom_src = './static/img/goodscreen/upsolid.png';
                    screenbottom[index].ischeck = true;
                }
                this.showScreenFun(flag);//显示哪一个筛选框
            },
            // 显示哪一个筛选框的方法
            showScreenFun(flag){
                console.log(flag);
                var showInfoAll = this.screenInfoAll;//筛选框集合
                // 判断显示哪一个筛选条件
                for(var i in showInfoAll){
                    if(showInfoAll[i].name == flag){
                        showInfoAll[i].isShow = !showInfoAll[i].isShow;
                        continue;
                    }
                    showInfoAll[i].isShow = false;
                }
                // 判断遮罩是否显示
                for(var i in showInfoAll){
                    if(showInfoAll[i].isShow == true){
                        showInfoAll[7].isShow = true;
                        break;
                    }else{
                        showInfoAll[7].isShow = false;
                    }
                }
            },
            // 隐藏---遮罩+筛选框
            hiddenScreenFun(){
                var showInfoAll = this.screenInfoAll;//筛选框集合
                var screentop = this.screenTop;
                var screenbottom = this.screenBottom;
                for(var i in showInfoAll){
                    showInfoAll[i].isShow = false;
                }
                 // 点击时让---上/下--栏选项变成未选状态
                for(var i in screentop){
                    screentop[i].tit_top_src ='./static/img/goodscreen/downempty.png';
                    screentop[i].ischeck = false;
                }
                for(var i in screenbottom){
                    screenbottom[i].tit_bottom_src = './static/img/goodscreen/downsolid.png';
                    screenbottom[i].ischeck = false;
                }
            },
            // 选择账号类型
            seleAccount(ind){
                var accountAll = this.account_info;
                for(var i in accountAll){
                    accountAll[i].ischeck = false;
                }
                accountAll[ind].ischeck = true;

                this.hiddenScreenFun();//隐藏筛选
            },
            // 选择手机系统
            selePhone(ind){
                var phoneAll = this.phone_info;
                for(var i in phoneAll){
                    phoneAll[i].ischeck = false;
                }
                phoneAll[ind].ischeck = true;

                this.hiddenScreenFun();//隐藏筛选
            },
            // 选择服务器--平台
            seleOperation(ind){
                var operationAll = this.operation_info;
                for(var i in operationAll){
                    operationAll[i].ischeck = false;
                }
                operationAll[ind].ischeck = true;
            },
            // 选择服务器--区服
            seleArea(ind){
                var areaAll = this.area_info;
                for(var i in areaAll){
                    areaAll[i].ischeck = false;
                }
                areaAll[ind].ischeck = true;
                
                this.hiddenScreenFun();//隐藏筛选
            },
            // 筛选--排序
            seleSort(flag){
                var sortArr = this.screen_info.sortPrice.ischeck;
                for(var i in sortArr){
                    sortArr[i] = false;
                }
                if(flag == 'down'){
                   sortArr.downSort = true;
                }else if(flag == 'up'){
                    sortArr.upSort = true;
                }else if(flag == 'more'){
                    sortArr.moreSort = true;
                }
            },
            // 筛选--类型
            seleScreen(flag,seleTag){
                if(flag == 'accountBind'){
                    var accountBindAll = this.screen_info.accountBind;
                    for(var i in accountBindAll){
                        if(seleTag == accountBindAll[i].name){
                            accountBindAll[i].ischeck = true;
                            continue;
                        }
                        accountBindAll[i].ischeck = false;
                    }
                }else if(flag == 'imgStatus'){
                    var imgStatusAll = this.screen_info.imgStatus;
                    for(var i in imgStatusAll){
                        if(seleTag == imgStatusAll[i].name){
                            imgStatusAll[i].ischeck = true;
                            continue;
                        }
                        imgStatusAll[i].ischeck = false;
                    }
                }else if(flag == 'videoStatus'){
                    var videoStatusAll = this.screen_info.videoStatus;
                    for(var i in videoStatusAll){
                        if(seleTag == videoStatusAll[i].name){
                            videoStatusAll[i].ischeck = true;
                            continue;
                        }
                        videoStatusAll[i].ischeck = false;
                    }
                }else if(flag == 'sellType'){
                    var sellTypeAll = this.screen_info.sellType;
                    for(var i in sellTypeAll){
                        if(seleTag == sellTypeAll[i].name){
                            sellTypeAll[i].ischeck = true;
                            continue;
                        }
                        sellTypeAll[i].ischeck = false;
                    }
                }else if(flag == 'isStages'){
                    var isStagesAll = this.screen_info.isStages;
                    for(var i in isStagesAll){
                        if(seleTag == isStagesAll[i].name){
                            isStagesAll[i].ischeck = true;
                            continue;
                        }
                        isStagesAll[i].ischeck = false;
                    }
                }else if(flag == 'isInsurance'){
                    var isInsuranceAll = this.screen_info.isInsurance;
                    for(var i in isInsuranceAll){
                        if(seleTag == isInsuranceAll[i].name){
                            isInsuranceAll[i].ischeck = true;
                            continue;
                        }
                        isInsuranceAll[i].ischeck = false;
                    }
                }else if(flag == 'levelType'){
                    var levelTypeAll = this.screen_info.levelType;
                    for(var i in levelTypeAll){
                        if(seleTag == levelTypeAll[i].name){
                            levelTypeAll[i].ischeck = true;
                            continue;
                        }
                        levelTypeAll[i].ischeck = false;
                    }
                }else if(flag == 'pokemon'){
                    console.log(seleTag);
                    var pokemonTypeAll = this.screen_info.pokemonType;
                    for(var i in pokemonTypeAll){
                        if(seleTag == pokemonTypeAll[i].name){
                            pokemonTypeAll[i].ischeck = true;
                            this.hiddenScreenFun();//隐藏筛选
                            continue;
                        }
                        pokemonTypeAll[i].ischeck = false;
                    }
                }else if(flag == 'profession'){
                    var professionTypeAll = this.screen_info.professionType;
                    for(var i in professionTypeAll){
                        if(seleTag == professionTypeAll[i].name){
                            professionTypeAll[i].ischeck = true;
                            
                            this.hiddenScreenFun();//隐藏筛选
                            continue;
                        }
                        professionTypeAll[i].ischeck = false;
                    }
                }else if(flag == 'school'){
                    var schoolTypeAll = this.screen_info.schoolType;
                    for(var i in schoolTypeAll){
                        if(seleTag == schoolTypeAll[i].name){
                            schoolTypeAll[i].ischeck = true;
                            
                            this.hiddenScreenFun();//隐藏筛选
                            continue;
                        }
                        schoolTypeAll[i].ischeck = false;
                    }
                }
            }
        },
        components:{
            Header,
            GoodsList,
        }
    }
</script>

<style scoped>
    /* 筛选 */
    .screen-title{
        background:#FFFFFF;
        margin-bottom:.2rem;
    }
    .screen-title-top,.screen-title-bottom{
        display:flex;
        justify-content:space-around;
    }
    .screen-title-top{
        color:#333333;
        font-size:.28rem;
        height: .8rem;
        line-height: .8rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .screen-title-bottom{
        color:#666666;
        font-size:.24rem;
        height: .9rem;
    }
    .title-top-cell img{
        width:.2rem;
        height:.11rem;
        margin-left:.14rem;
        vertical-align: middle;
    }
    .title-top-cell span{
        vertical-align: middle;
    }
    .title-bottom-cell{
        width:2rem;
        height:.5rem;
        background:#F6F8FE;
        border-radius: .04rem;
        text-align:center;
        margin:auto 0;
    }
    .title-bottom-cell img{
        width:.2rem;
        height:.10rem;
        margin:auto 0 auto .14rem;
    }
    .title-bottom-cell span{
        display:inline-block;
        line-height: .5rem;
    }

    
    /* 遮罩 */
    .goodscreen-shade{
        position:fixed;
        left:0;
        top:2.5rem;
        right:0;
        bottom:0;
        background:rgba(0,0,0,0.5);
        z-index: 4;
    }

    /* 筛选弹出框 -- 公共样式 */
    .screen-box{
        border-top:.01rem solid #E5E5E5;
        background:#FFFFFF;
        position: fixed;
        left:0;
        top:2.5rem;
        right:0;
        z-index:6;
    }
    /* =========================== */
    /* 账号类型 */
    .account-type-box{
        font-size:.26rem;
        padding-left:.3rem;
    }
    .account-type-box .account-type-strip:nth-last-child(1){
        border:0;
    }
    .account-type-strip{
        line-height:.9rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .black-color{
        color:#666666;
    }
    .red-color{
        color:#FE7649;
    }
    /* 手机系统 */
    .phone-type-box{
        font-size:.26rem;
        padding-left:.3rem;
    }
    .phone-type-box .phone-type-strip:nth-last-child(1){
        border:0;
    }
    .phone-type-strip{
        line-height:.9rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    /* ====服务器==== */
    .server-type-box{
        background:#F3F3F3 ;
    }
    .server-operation-box{
        width:23.7%;
        text-align:center;
        display:inline-block;
        vertical-align: top;
    }
    .operation-type-strip{
        font-size:.26rem;
        color:#666666;
        line-height: .7rem;
    }
    .server-area-box{
        width:75%;
        display:inline-block;
        background:#FFFFFF;
        vertical-align: top;
        padding-top: .3rem;
    }
    .red-border{
        color:#FE7649;
        background-image:url(../../static/img/goodscreen/vertical.png);
        background-repeat:no-repeat;
        background-size:.16rem .4rem;
        background-position: 0 70%;
    }
    .black-border{
        color:#666666;
    }
    /* 区服搜索 */
    .area-type-search{
        position: relative;
        text-align: center;
    }
    .area-type-search input{
        width:4.95rem;
        height:.6rem;
        font-size:.24rem;
    }
    .search-area-ico{
        width:.19rem;
        height:.19rem;
        position:absolute;
        left:.45rem;
        top:.2rem;
    }
    /* 区服 */
    .area-type-content{
        color:#666666;
        font-size:.24rem;
        padding-left:.3rem;
    }
    .area-type-strip{
        display:inline-block;
        padding:0 .15rem;
        line-height: .6rem;
        margin:0 .2rem .3rem 0;
        border:.01rem solid #D2D2D2;
        -webkit-border-radius:.06rem;
        -moz-border-radius: .06rem;
        border-radius: .06rem;
    }
    .red-bg{
        color:#FE7649;
        border:.01rem solid #FF855D;
        background-color:#FFDBCF;
        background-image: url(../../static/img/goodscreen/false_tag.png);
        background-repeat:no-repeat;
        background-size:.3rem .25rem;
        background-position:right bottom;
    }
    .black-bg{
        border:.01rem solid #D2D2D2;
        background: #FFFFFF;
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
    .screen-type-box{
        padding:.3rem 0;
    }
    .screen-type-strip{
        
    }
    .screen-strip-left{
        display:inline-block;
        width:22.7%;
        font-size:.26rem;
        color:#666666;
        padding-left:.2rem;
        vertical-align: top;
    }
    .screen-strip-right{
        display:inline-block;
        width:76%;
        vertical-align: top;
        margin-bottom: .3rem;
    }
    .screen-strip-right input::-webkit-outer-spin-button,.raise-price input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    /* 价格输入 */
    .input-price-left{
        line-height: .6rem;
    }
    .input-price-right{
        font-size:.26rem;
        color:#333333;
    }
    .input-price-right input{
        width:1.4rem;
        height:.6rem;
        margin:0 .14rem 0 0;
        font-size:.26rem;
        padding:0.1rem;
    }
    .input-price-right span{
        margin-right: .14rem;
    }
    /* 价格排序 */
    .sort-left-text{
        padding-top:.1rem;
    }
    .screen-sort{
        font-size:.26rem;
        color:#333333;
        display:inline-block;
        margin-right:.3rem;
    }
    .screen-sort span{
        vertical-align: middle;
    }
    .screen-sort-check{
        width:.28rem;
        height:.28rem;
        margin-right:.13rem;
        vertical-align: middle;
    }
    .screen-sort-ico{
        width:.12rem;
        height:.25rem;
        vertical-align: middle;
    }
    /* 筛选类型 */
    .screen-strip-box{
        display:inline-block;
        line-height: .6rem;
        font-size:.24rem;
        padding:0 .15rem;
        margin-right: .4rem;
        -webkit-border-radius: .06rem;
        -moz-border-radius: .06rem;
        border-radius: .06rem;
        color:#666666;
    }
    /* 筛选确认 */
    .screen-type-bottom{
        text-align: center;
    }
    .ok-screen-btn{
        display: inline-block;
        width:1.89rem;
        text-align:center;
        line-height: .6rem;
        height:.6rem;
        color:#FFFFFF;
        font-size:.26rem;
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
        margin-right:.5rem;
    }
    .no-screen-btn{
        display: inline-block;
        width:1.89rem;
        text-align:center;
        line-height: .6rem;
        height:.6rem;
        color:#FFFFFF;
        font-size:.26rem;
        -webkit-border-radius:.3rem;
        -moz-border-radius: .3rem;
        border-radius: .3rem;
        background:#C6C6C6;
    }

    /* 筛选下栏------ */
    .bottom-screen-box {
        padding:.3rem .2rem;
    }
    .bottom-screen-box div{
        margin-bottom:.3rem;
    }

    /* ==========placeholder========= */
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.24rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.24rem;
    }
</style>