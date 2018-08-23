<template>
    <!-- 首页轮播图 -->
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
                imgList:[{name:'static/img/swiper_cont.png'},{name:'static/img/mh_ico.png'},{name:'static/img/swiper_cont.png'},{name:'static/img/swiper_cont.png'}]
            }
        },
        mounted(){
            var mySwiper = new Swiper ('#indexSwiper', {
                loop:true,
                autoplay : 3000,
                // initialSlide :0,//第一个显示的图片默认为0
                autoplayDisableOnInteraction:false,//用户操作完是否自动切换

                effect : 'coverflow',//切换方式

                slidesPerView: 'auto',//自适应放几个
                loopedSlides:4,//设置sildesPerView 就要设置 loopedSlides 为slids的个数
                
                centeredSlides: true,
                coverflow: {
                    rotate: 40,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : false,
                }
            })
        }
    }
</script>

<style scoped>
#indexSwiper{
    width:100%;
}
.swiper-slide{
    width:6.3rem;
    height:3.16rem;
}
.swiper-slide img{
    width:6.3rem;
    height:3.16rem;
}
</style>