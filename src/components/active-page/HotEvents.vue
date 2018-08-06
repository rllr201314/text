<template>
    <div class="hot-active-wrap">
        <div class="hot-active-title">
            <div class="title-txt">热门活动</div>
        </div>
        <div class="hot-active-content">
            <div class="hot-active-cell" v-for="(item,index) in activeList">
                <div class="hot-active-cell-left">
                    <img :src="item.imgSrc" alt="">
                </div>
                <div class="hot-active-cell-right">
                    <div class="active-title">
                        <div class="active-status-title " v-if="item.statusData != 3">
                            <span v-if="item.statusData == 1">离活动结束还有</span>
                            <span v-else>离活动开始还有</span>
                            <span :class="item.statusData == 1?'end-active-tit':'start-active-tit'" v-text="item.hours" ></span>小时
                            <span :class="item.statusData == 1?'end-active-tit':'start-active-tit'" v-text="item.minute"></span>分钟
                        </div>
                        <div class="active-status" :class="item.statusData == 1?'active-status-going':''" v-if="item.statusData == 1">进行中</div>
                        <div class="active-status" :class="item.statusData == 2?'active-status-start':''" v-else-if="item.statusData == 2">未开始</div>
                        <div class="active-status" :class="item.statusData == 3?'active-status-end':''" v-else-if="item.statusData == 3">已结束</div>
                    </div>
                    <div class="participation-num">
                        <img src="../../../static/img/hot_ico.png" alt="">
                        <div class="participation-num-text">已参与 <span class="red-color" v-text="item.num_people"></span> 人</div>
                    </div>
                    <div class="active-content" v-text="item.text"></div>
                    <div class="participation-btn" v-if="item.statusData != 3" :class="item.statusData == 1?'end-btn':'start-btn'">立即参与</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotEvents",
        data(){
            return{
                activeList:[{
                    imgSrc:'../../../static/img/hot_active_ico.png',
                    statusData:1,
                    hours:2,
                    minute:34,
                    num_people:10,
                    text:'竞品装备，全神宠系列竞品装备全神宠系列',
                },{
                    imgSrc:'../../../static/img/hot_active_ico.png',
                    statusData:2,
                    hours:2,
                    minute:34,
                    num_people:0,
                    text:'竞品装备，全神宠系列竞品装备全神宠系列',
                },{
                    imgSrc:'../../../static/img/hot_active_ico.png',
                    statusData:3,
                    hours:2,
                    minute:34,
                    num_people:233,
                    text:'竞品装备，全神宠系列竞品装备全神宠系列',
                }]
            }
        }
    }
</script>

<style scoped>
    .hot-active-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem  #D6D6D6;
        box-shadow: .06rem .05rem .09rem  #D6D6D6;
        margin-bottom: .3rem;
    }
    /*标题栏*/
    .hot-active-title{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .title-txt{
        background-image:url("../../../static/img/board_mark_big.png");
        background-repeat: no-repeat;
        background-size:1.49rem .21rem;
        background-position: 50% ;
        text-align:center;
        width:1.49rem;
        color:#FC604E;
        font-size:.26rem;
        margin: 0 auto;
    }
    /*内容*/
    .hot-active-cell{
        padding:.2rem .2rem .3rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .hot-active-cell-left,.hot-active-cell-right{
        display:inline-block;
        vertical-align: middle;
    }
    .hot-active-cell-left{
        width:2.4rem;
        height:2.4rem;
        margin-right:.21rem;
    }
    .hot-active-cell-left img{
        width:2.4rem;
        height:2.4rem;
    }
    /*右边*/
    .hot-active-cell-right{
        width:3.99rem;
        height:2.2rem;
    }
    /*活动状态*/
    .active-title{
        margin-bottom: .01rem;
    }
    .active-title::after{
        display:block;
        clear: both;
        content: '';
    }
    .active-status-title{
        color:#666666;
        font-size:.24rem;
        display: inline-block;
    }
    .end-active-tit{
        color:#FF5E5E;
        font-size:.26rem;
    }
    .start-active-tit{
        color:#45C773;
        font-size:.26rem;
    }
    /*右边标题*/
    .active-status{
        width:.64rem;
        color:#FFFFFF;
        font-size:.2rem;
        text-align: center;
        line-height:.27rem;
        float:right;
    }
    .active-status-going{
        background:#FF5E5E;
    }
    .active-status-start{
        background:#45C773;
    }
    .active-status-end{
        background:#B5B5B5;
    }
    /*参与人数*/
    .participation-num{
        margin-bottom: .05rem;
    }
    .participation-num img{
        width:.16rem;
        height:.24rem;
        vertical-align: middle;
    }
    .participation-num-text{
        color:#999999;
        font-size:.24rem;
        display:inline-block;
        vertical-align: middle;
    }
    /*红色字体*/
    .red-color{
        color:#FE7649;
    }
    /*描述*/
    .active-content{
        color:#333333;
        font-size:.26rem;
        margin-bottom: .05rem;
    }
    /*参与按钮*/
    .participation-btn{
        width:1.1rem;
        height:.44rem;
        line-height:.44rem;
        font-size:.22rem;
        color:#FFFFFF;
        text-align:center;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
    }
    .start-btn{
        background:#CDCDCD;
    }
    .end-btn{
        background:#FE7649;
    }
</style>