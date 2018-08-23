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
                <div class="right-opt" @click="showPop('moblie')">
                    <span v-text="sellOptData.moblie"></span>
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
        <div class="okBtn">下一步</div>
        <!-- 弹出框 -->
                <!-- 商品类型 -->
        <div id="sheet-merchand" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="mui-table-view">
                <li class="mui-table-view-cell option-gray">
                    <a href="#">请选择商品类型</a>
                </li>
                <!-- 商品类型 -->
                <li class="mui-table-view-cell option-black" v-for="item in optionData.merchand" @click="seleMerchand(item.key)" v-text="item.name"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="mui-table-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-merchand">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
                <!-- 手机系统 -->
        <div id="sheet-moblie" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="mui-table-view">
                <li class="mui-table-view-cell option-gray">
                    <a href="#">请选择商品类型</a>
                </li>
                <!-- 手机系统 -->
                <li class="mui-table-view-cell option-black" v-for="item in optionData.moblie" @click="seleMoblie(item.key)" v-text="item.name"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="mui-table-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-moblie">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
                <!-- 服务器 -->
        <div id="sheet-server" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <div class="screen-box server-type-box" >
            <!-- 平台 -->
            <div class="server-operation-box">
                <div class="operation-type-strip" v-for="(item,index) in optionData.operation_info" :class="item.ischeck?'red-border':'black-border'" v-text="item.name" @click="seleOperation(index)"></div>
            </div>
            <!-- 区服 -->
            <div class="server-area-box">
                <div class="area-type-search">
                    <input type="text" placeholder="搜索">
                    <img class="search-area-ico" src="../../../static/img/search_ico.png" alt="">
                </div>
                <div class="area-type-content">
                    <div class="area-type-strip" v-for="(item,index) in optionData.area_info" :class="item.ischeck?'red-bg':'black-bg'" v-text="item.name" @click="seleArea(index)"></div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'SellOption',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部log
                        showShare:3,//1搜索2分享3菜单
                        showBg:false,//是否显示背景
                        title:"我要卖",
                    }
                },
                sellOptData:{
                    gameLog:'./static/img/mh_ico.png',
                    gameName:'梦幻西游',
                    merchand:'未选择',
                    moblie:'未选择',
                    server:'未选择',
                },
                optionData:{
                    merchand:[{
                        key:1,
                        name:'成品号',
                        ischeck:false
                    },{
                        key:2,
                        name:'半成品',
                        ischeck:false
                    }],
                    moblie:[{
                        key:1,
                        name:'安卓',
                        ischeck:false
                    },{
                        key:2,
                        name:'苹果',
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
                }


            }
        },
        methods: {
            // 显示那个下拉菜单
            showPop(flag){
                mui('#sheet-'+flag).popover('toggle');
            },
            // 选择商品类型
            seleMerchand(ind){
                var that = this;
                mui('#sheet-merchand').popover('toggle');
                var merchand = this.optionData.merchand;
                for(var i in merchand){
                    if(ind == merchand[i].key){
                        merchand[i].ischeck = true;
                        that.sellOptData.merchand = merchand[i].name;
                        continue;
                    }
                    merchand[i].ischeck = false;
                }
            },
            // 选择手机系统
            seleMoblie(ind){
                var that = this;
                mui('#sheet-moblie').popover('toggle');
                var moblie = this.optionData.moblie;
                for(var i in moblie){
                    if(ind == moblie[i].key){
                        moblie[i].ischeck = true;
                        that.sellOptData.moblie = moblie[i].name;
                        continue;
                    }
                    moblie[i].ischeck = false;
                }
            },
            // 选择服务器--平台
            seleOperation(ind){
                var operationAll = this.optionData.operation_info;
                for(var i in operationAll){
                    operationAll[i].ischeck = false;
                }
                operationAll[ind].ischeck = true;
            },
            // 选择服务器--区服
            seleArea(ind){
                mui('#sheet-server').popover('toggle');
                var areaAll = this.optionData.area_info;
                for(var i in areaAll){
                    areaAll[i].ischeck = false;
                }
                areaAll[ind].ischeck = true;

            },
        }

    }
</script>
<style scoped>
    .sellOption-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .sellOpt-top{
        height:5rem;
        background-image:url(../../../static/img/sell/header_bg.png);
        background-repeat:no-repeat;
        background-size:100% 5rem;
    }
    .game-sign{
        text-align:center;
        margin-top:.5rem;
        font-size:.28rem;
    }
    .game-sign img{
        width:1.11rem;
        height:1.11rem;
        margin-bottom:.1rem;
    }
    .sellOpt-content{
        padding: 0 .2rem;
    }
    .opt-cell{
        line-height: .9rem;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding:0 .2rem;
    }
    .left-text{
        font-size:.26rem;
        color:#666666;
    }
    .right-opt{
        width:3rem;
        text-align: right;
        float:right;
        font-size:.24rem;
        color:#999999;
    }
    .right-opt img{
        width:.13rem;
        height:.24rem;
        vertical-align: middle;
        margin-left:.2rem;
        margin-top:-0.05rem;
    }
    .right-opt span{
        vertical-align: middle;
    }







    /* 弹出框 */
    .option-gray{
        color:#666666;
        font-size:.28rem;
    }
    .option-black{
        color:#333333;
        font-size:.28rem;
        font-weight: 100;
    }


    /* 下一步 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.3rem auto 0;
        width:6.5rem;
        text-align: center;
        line-height: .8rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #FD915F;
        -moz-box-shadow: .06rem .05rem .09rem #FD915F;
        box-shadow: .06rem .05rem .09rem #FD915F;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }



    
    /* ====服务器==== */
    .server-type-box{
        background:#F3F3F3 ;
        height:4.5rem;
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
        height: 100%;
    }
    .red-border{
        color:#FE7649;
        background-image:url(../../../static/img/goodscreen/vertical.png);
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
        background-image: url(../../../static/img/goodscreen/false_tag.png);
        background-repeat:no-repeat;
        background-size:.3rem .25rem;
        background-position:right bottom;
    }
    .black-bg{
        border:.01rem solid #D2D2D2;
        background: #FFFFFF;
    }
</style>
