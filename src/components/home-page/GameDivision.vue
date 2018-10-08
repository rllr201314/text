<template>
    <!-- 专区模块 -->
    <div class="game-division">
        <div class="division-cell cell-mh">
            <div class="division-big" @click="goArea('mh')">
                <div class="division-left">
                    <div class="dCell-top">梦幻分期专区</div>
                    <div class="dCell-bottom">随心购 找回包赔</div>
                </div>
                <img src="../../../static/img/mh_cont.png" alt="">
            </div>
        </div>
        <div class="division-cell cell-dh">
            <div class="division-big" @click="goArea('dh')">
                <div class="division-left">
                    <div class="dCell-top">大话化无专区</div>
                    <div class="dCell-bottom">寻找最大的优惠</div>
                </div>
                <img src="../../../static/img/dh_cont.png" alt="">
            </div>
        </div>
        <div class="division-cell cell-clx">
            <div class="division-big" @click="goArea('clx')">
                <div class="division-left">
                    <div class="dCell-top">楚楚香首充专区</div>
                    <div class="dCell-bottom">随心购 找回包赔</div>
                </div>
                <img src="../../../static/img/clx_cont.png" alt="">
            </div>
        </div>
        <div class="division-cell expect-content">
                <div class="expect-c">
                    <img src="../../../static/img/expect_ico.png" alt="">
                    <div>敬请期待</div>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameDivision",
        methods:{
            goArea(flag){
                var that = this;
                if(flag == 'mh'){
                    that.$router.push({name:'ActiveArea',query:{tit:'梦幻西游活动专区'}})
                }else if(flag == 'dh'){
                    that.$router.push({name:'ActiveArea',params:{tit:'大话西游活动专区'}})
                }else if(flag == 'clx'){
                    that.$router.push({name:'ActiveArea',params:{tit:'楚留香活动专区'}})
                }
            }
        }
    }
</script>

<style scoped>
    .game-division{
        text-align:center;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .division-cell{
        width:3.45rem;
        height:1.3rem;
        text-align:center;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6 ;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom: .2rem;
    }
    .division-big{
        margin-top:.25rem;
    }
    .division-left{
        display:inline-block;
        vertical-align: middle;
    }
    .division-big img{
        vertical-align: middle;
    }
    .cell-mh img{
        width:1.04rem;
        height:.39rem;
    }
    .cell-dh img{
        width:1.22rem;
        height:.38rem;
    }
    .cell-clx img{
        width:.83rem;
        height:.47rem;
    }
    .dCell-top{
        color:#333333;
        font-size:.26rem;
    }
    .dCell-bottom{

        color:#999999;
        font-size:.24rem;
    }
    .expect-c{
        margin-top:.2rem;
    }
    .expect-content img{
        width:.67rem;
        height:.52rem;
    }
    .expect-content div{
        color:#666666;
        font-size:.22rem;
    }
</style>