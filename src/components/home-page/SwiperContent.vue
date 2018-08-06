<template>
    <div class="swiper-index-wrap">
        <div class="swiper-container" id="indexSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in imgList">
                        <img :src="item.name" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SwiperContent",
        data(){
            return{
                imgList:[{name:'static/img/swiper_cont.png'},{name:'static/img/swiper_cont.png'},{name:'static/img/swiper_cont.png'},{name:'static/img/swiper_cont.png'}]
            }
        },
        mounted(){
            var mySwiper = new Swiper ('#indexSwiper', {
                loop:true,
                autoplay : 3000,
                // initialSlide :0,//第一个显示的图片默认为0
                autoplayDisableOnInteraction:false,//用户操作完是否自动切换

                effect : 'coverflow',
                slidesPerView: 3,
                centeredSlides: true,
                coverflow: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows : false
                }
            })
        }
    }
</script>

<style scoped>
#indexSwiper{
    /*width:7.5rem;*/
    /*height:3.16rem;*/
}
.swiper-slide{
}
.swiper-slide img{
    height:150px;
}
</style>