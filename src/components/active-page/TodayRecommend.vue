<template>
    <div class="today-recommend-wrap">
        <div class="today-recommend-title">
            <div class="title-txt">今日推荐</div>
        </div>
        <div class="today-recommend-content">
            <div class="today-recommend-content-cell" v-for="item in todayRecommendList">
                <img :src="item.imgSrc" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TodayRecommend",
        data(){
            return{
                todayRecommendList:[{
                    imgSrc:'./static/img/today-recommend-1.png',
                },{
                    imgSrc:'./static/img/today-recommend-2.png',
                },{
                    imgSrc:'./static/img/today-recommend-1.png',
                }]
            }
        }
    }
</script>

<style scoped>
    .today-recommend-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem  #D6D6D6;
        box-shadow: .06rem .05rem .09rem  #D6D6D6;
        padding-bottom: .2rem;
    }
    /*标题栏*/
    .today-recommend-title{
        line-height:.7rem;
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
    .today-recommend-content .today-recommend-content-cell:nth-last-child(1){
        margin-bottom: 0;
    }
    .today-recommend-content-cell{
        width:7.1rem;
        height:2.4rem;
        margin-bottom:.2rem;
    }
    .today-recommend-content-cell img{
        width:7.1rem;
        height:2.4rem;
    }
</style>