<template>
    <!-- 出售页 -->
    <div class="sell-page-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="sell-page-content">
            <div class="search">
                <img class="search-ico" src="../../../static/img/search_ico.png" alt="">
                <input class="search-input" type="text" placeholder="请输入游戏名称">
                <img class="empty-ico" src="../../../static/img/empty_ico.png" alt="" @click="emptyFun()">
            </div>
            <div class="search-history">
                <div class="search-history-title">
                    <div class="search-histoty-title-text">近期搜索</div>
                    <img src="../../../static/img/delete_ico.png" alt="">
                </div>
                <div class="search-history-content">
                    <div class="search-history-tag" v-for="(item,index) in historyNameList" v-text="item.name"></div>
                </div>
            </div>
            <div class="game-classfiy-wrap">
                <div class="game-classfiy-top">
                    <div class="game-classfiy-top-cell" v-for="item in gameClassfiy" v-text="item.name" :class="item.sele?'red-bg':''"></div>
                </div>
                <div class="game-classfiy-bottom">
                    <div class="game-classfiy-bottom-list" v-for="item in gameList">
                        <div class="list-left">
                            <img :src="item.gameListSrc" alt="">
                        </div>
                        <div class="list-right">
                            <div class="list-info-title" v-text="item.gameListTit"></div>
                            <div class="list-info-left" v-text="item.gameInfoLeft"></div>
                            <div class="list-info-right" v-text="item.gameInfoRight"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/home-page/Header'
    export default {
        name: "SellPage",
        data(){
            return{
                showTitle:{
                    showBack:false,
                    showLogo:2,//显示头部log
                    showShare:3,//1搜索2分享3菜单
                    showBg:true,//是否显示背景
                    title:"我要卖",
                },
                historyNameList:[{
                    name:'梦幻西游',
                },{
                    name:'梦幻西游之梦幻西游',
                },{
                    name:'梦幻西游',
                },{
                    name:'梦幻西游之梦幻西游',
                },{
                    name:'梦幻西游',
                }],
                gameClassfiy:[{name:'热',sele:true},{name:'A',sele:false},{name:'B',sele:false},{name:'C',sele:false},
                            {name:'D',sele:false},{name:'E',sele:false},{name:'F',sele:false},
                            {name:'G',sele:false},{name:'H',sele:false},{name:'I',sele:false},{name:'J',sele:false},{name:'K',sele:false},
                            {name:'L',sele:false},{name:'M',sele:false},{name:'N',sele:false},{name:'O',sele:false},{name:'P',sele:false},
                            {name:'Q',sele:false},{name:'R',sele:false},{name:'S',sele:false},{name:'T',sele:false},{name:'U',sele:false},
                            {name:'V',sele:false},{name:'W',sele:false},{name:'X',sele:false},{name:'Y',sele:false},{name:'Z',sele:false}],
                gameList:[{
                    gameListSrc:'./static/img/mh_ico.png',
                    gameListTit:'梦幻西游',
                    gameInfoLeft:'代练',
                    gameInfoRight:'成品号'
                },{
                    gameListSrc:'./static/img/mh_ico.png',
                    gameListTit:'大话西游',
                    gameInfoLeft:'代练',
                    gameInfoRight:'成品号'
                },{
                    gameListSrc:'./static/img/mh_ico.png',
                    gameListTit:'梦幻西游',
                    gameInfoLeft:'代练',
                    gameInfoRight:'成品号'
                },{
                    gameListSrc:'./static/img/mh_ico.png',
                    gameListTit:'大话西游',
                    gameInfoLeft:'代练',
                    gameInfoRight:'成品号'
                }]
            }
        },
        components:{
            Header,
        },
        methods:{
            //一键清空
            emptyFun(){
                $('.search-input').val('');
            }
        }
    }
</script>

<style scoped>
    .sell-page-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .sell-page-content{
        padding:.2rem;
    }
    /*搜索*/
    .search{
        width:7.1rem;
        height:.76rem;
        text-align: center;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        position: relative;
        margin:0 auto .3rem;
    }
    .search-input{
        width:7.1rem;
        height:.76rem;
        padding:0 .52rem;
        margin:0;
    }
    .search-ico{
        width:.32rem;
        height:.27rem;
        position: absolute;
        top:.25rem;
        left:.23rem;
    }
    .empty-ico{
        width:.23rem;
        height:.24rem;
        position: absolute;
        top:.25rem;
        right:.25rem;
    }
    /*搜索历史*/
    .search-history-title div{
        color:#333333;
        font-size:.26rem;
        display: inline-block;
    }
    .search-history-title img{
        width:.26rem;
        height:.26rem;
        float: right;
        margin:.1rem .1rem 0 0;
    }
    .search-history-content{
        padding:.2rem 0;
        font-size:.26rem;
    }
    .search-history-tag{
        background:#FFFFFF;
        color:#333333;
        min-width:1.5rem;
        text-align:center;
        padding:.15rem .3rem;
        display:inline-block;
        margin:0 .2rem .2rem 0;
        border-top-left-radius: .4rem;
        border-bottom-left-radius: .4rem;
        border-top-right-radius: .4rem;
        border-bottom-right-radius: .4rem;
    }

    /*游戏分类*/
    .game-classfiy-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        padding:.2rem;
    }
    .game-classfiy-top{
        /*height: 2.58rem;*/
        font-size:.24rem;
        color:#666666;
    }
    .game-classfiy-top .game-classfiy-top-cell{
        display: inline-block;
        width: .6rem;
        height:.6rem;
        line-height: .6rem;
        text-align: center;
    }
    .red-bg{
        color:#ffffff;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        -webkit-box-shadow: .01rem 0 .04rem #FC604E;
        -moz-box-shadow: .01rem 0 .04rem #FC604E;
        box-shadow: .01rem 0 .04rem #FC604E;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }

    .game-classfiy-bottom-list{
        border-top: .01rem solid #E5E5E5;
        /*height:1.21rem;*/
        padding:.2rem 0;
    }
    .list-left,.list-right{
        display:inline-block;
        vertical-align: top;
    }
    .list-left{
        width:.86rem;
        height:.87rem;
    }
    .list-left img{
        width:.86rem;
        height:.87rem;
    }
    .list-right{
        width:5rem;
    }
    .list-info-title{
        color:#333333;
        font-size:.26rem;
    }
    .list-info-left,.list-info-right{
        display:inline-block;
        font-size:.24rem;
        color: #ffffff;
        text-align:center;
        line-height:.36rem;
        padding:0 .11rem;
    }
    .list-info-left{
        background:-webkit-linear-gradient(#FD915F,#FF7064);
        background:-o-linear-gradient(#FD915F,#FF7064);
        background:-moz-linear-gradient(#FD915F,#FF7064);
        background:linear-gradient(to right, #FD915F , #FF7064);
    }
    .list-info-right{
        background:-webkit-linear-gradient(#FEAB49,#FFCC4B);
        background:-o-linear-gradient(#FEAB49,#FFCC4B);
        background:-moz-linear-gradient(#FEAB49,#FFCC4B);
        background:linear-gradient(to right, #FEAB49 , #FFCC4B);
    }
</style>