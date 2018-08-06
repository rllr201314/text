<template>
    <div class="swiper-wrap">
        <div class="swiper-container" id="swiper-content">
            <div class="swiper-wrapper">
                <div class="swiper-slide present-page" v-for="(item,index) in imgList">
                    <img :src="item.name" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Swiper",
        data(){
            return{
                imgList:[
                    {name:'static/img/swiper_cont.png'},
                    {name:'static/img/today-recommend-1.png'},
                    {name:'static/img/today-recommend-2.png'},
                    {name:'static/img/today-recommend-1.png'}]
            }
        },
        mounted(){
            var mySwiper = new Swiper ('#swiper-content', {
                loop:true,
                autoplay : 3000,
                // initialSlide :0,//第一个显示的图片默认为0
                autoplayDisableOnInteraction:false,//用户操作完是否自动切换
                pagination : '.swiper-pagination',
            })
        }
    }
</script>

<style scoped>
    .swiper-wrap{
        width:100%;
        height:4rem;
    }
    .present-page img{
        width:100%;
        height:4rem;
    }
</style>