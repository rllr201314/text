<template>
    <!-- 专区模块 -->
    <div class="game-division">
        <div class="division-cell cell-mh" @click="goArea('mh')">
            <img src="../../../static/img/chunk/jbh.png" alt="">
        </div>
        <div class="division-cell cell-dh" @click="goArea('dh')">
            <img src="../../../static/img/chunk/zh.png" alt="">
        </div>
        <div class="division-cell cell-clx" @click="goArea('clx')">
            <img src="../../../static/img/chunk/cbg.png" alt="">
        </div>
        <div class="division-cell expect-content">
            <img src="../../../static/img/chunk/hs.png" alt="">
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
        overflow: hidden;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6 ;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom: .2rem;
    }
    .division-cell img{
        width:100%;
        height:100%;
    }
</style>