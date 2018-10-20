<template>
    <!-- 详情轮播图 -->
    <div class="swiper-wrap">
        <div class="swiper-container" id="swiper-content">
            <div class="swiper-wrapper">
                <div class="swiper-slide present-page" v-for="(item,index) in list">
                    <img :src="item.img_url" preview>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Swiper",
    data() {
        return {
            list:[]
        };
    },
    props: ["imgList"],
    methods: {
        swiper() {
            var mySwiper = new Swiper ('#swiper-content', {
                loop:true,
                autoplay : 3000,
                // initialSlide :0,//第一个显示的图片默认为0
                autoplayDisableOnInteraction:true,//用户操作完是否自动切换
                pagination : '.swiper-pagination',
            })
        }
    },
    mounted() {
        var that = this;
        var time = setInterval(function(){
            if(that.imgList != ''){
                that.swiper();
                that.$previewRefresh();
                that.list = JSON.parse(JSON.stringify(that.imgList));
                clearInterval(time);
            }
        },300)
    }
};
</script>

<style scoped>
.swiper-wrap {
    width: 100%;
    height: 4rem;
}
.present-page img {
    width: 100%;
    height: 4rem;
}
</style>