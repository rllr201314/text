<template>
    <!-- 公告 -->
    <div class="notice-wrap">
        <div class="notice-top">
            <div class="notice-title">公告</div>
        </div>
        <div class="notice-content">
            <div class="notice-content-text" v-for="item in text" v-text="item.name"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        data(){
            return{
                text:[{name:'1.2018-9-10看个号平台改版了'},{name:'1.2018-9-10看个号平台改版了'}]
            }
        }
    }
</script>

<style scoped>
    .notice-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.3rem;
    }
    .notice-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .notice-title{
        width:.98rem;
        /*height:.21rem;*/
        background-image:url("../../../static/img/board_mark.png");
        background-repeat:no-repeat;
        background-size:.98rem .21rem;
        background-position:50%;
        text-align:center;
        color:#FE7649;
        font-size:.26rem;
        margin:0 auto;
    }
    .notice-content{
        padding:0 .22rem .25rem;
        color:#666666;
        font-size:.24rem;
    }
    .notice-content-text{
        margin-top:.25rem;
    }
</style>