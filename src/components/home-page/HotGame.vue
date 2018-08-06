<template>
    <div class="hot-game-wrap">
        <div class="hot-game-title">
            <div class="title-txt">热门游戏</div>
        </div>
        <div class="hot-game-content">
            <div class="hot-game-cell">
                <img src="../../../static/img/mh_ico.png" alt="">
                <div>梦幻西游</div>
            </div>
            <div class="hot-game-cell">
                <img src="../../../static/img/clx_ico.png" alt="">
                <div>梦幻西游</div>
            </div>
            <div class="hot-game-cell">
                <img src="../../../static/img/clx_ico.png" alt="">
                <div>梦幻西游</div>
            </div>
            <div class="hot-game-cell">
                <img src="../../../static/img/mh_ico.png" alt="">
                <div>梦幻西游</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotGame"
    }
</script>

<style scoped>
    .hot-game-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.3rem;
    }
    .hot-game-title{
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
    .hot-game-content{
        display: flex;
        justify-content: space-around;
        height:1.98rem;
    }
    .hot-game-cell{
        font-size:.24rem;
        color:#666666;
        text-align: center;
        margin:auto 0;
    }
    .hot-game-cell img{
        width:1.05rem;
        height:1.06rem;
    }
</style>