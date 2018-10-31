<template>
    <!-- 详情轮播图 -->
    <div class="swiper-wrap">
        <div class="swiper-container" id="swiper-content-photo">
            <div class="swiper-wrapper">
                <div class="swiper-slide present-page" v-for="item in imgList">
                    <img :src="item.img_url" alt="" preview>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div id="swiper-container3"></div>
    </div>
</template>

<script>
export default {
    name: "Swiper",
    props: ["imgList"],
    data() {
        return {
            list:null,
        };
    },
    methods: {
        swiper() {
            var mySwiper_photo = new Swiper ('#swiper-content-photo',{
                // loop:true,
                autoplay : 3000,
                pagination:'.swiper-pagination',
                autoplayDisableOnInteraction:false,//用户操作完是否自动切换

            });
        }
    },
    mounted() {
        var that = this;
        var timer = setInterval(function(){
            if(that.imgList != ''){
                that.swiper();
                that.$previewRefresh();
                clearInterval(timer);
            }
        },1000)
    }
};
</script>

<style scoped>
.swiper-wrap {
    width: 100%;
    height: 4rem;
}
.present-page{
    height: 4rem;
    overflow: hidden;
}
.present-page img{
    width: 100%;
    height: auto;
}
</style>