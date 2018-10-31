<template>
    <div class="nodata-wrap">
        <!-- <Header v-bind:showTitle="showTitle"></Header> -->
        <img src="../../../static/img/warn/nodata.png" alt="">
        <div v-if="!noType">暂时没有数据哦！</div>
        <div class="btn" v-else @click="goDetails">开启新版</div>
    </div>
</template>
<script>
    // import Header from '@/components/home-page/Header'
    export default {
        name:'NoData',
        components:{
            // Header,
        },
        data(){
            return {
                // showTitle:{
                //     showBack:false,
                //     showLogo:2,//显示头部title文字
                //     showShare:'',//1搜索2分享3菜单
                //     showBg:true,//是否显示背景
                //     title:"梦幻西游活动专区",
                // },
                noType:false,
            }
        },
        methods:{
            goDetails(){
                var str = String(this.$route.path).split('goods_id/')[1];
                var a = str.split('.html')[0];
                this.$router.push({name:'Details',query:{goods_id:a,type:'old'}});
            }
        },
        mounted(){
            // var url = this.$route.path;
            // if(url.split('goods_id/')[1]){
            //     var id = url.split('.html')[0];
            //     this.$router.push({name:'Details',query:{goods_id:id}});
            // }
        }
    }
</script>
<style scoped>
    .nodata-wrap{
        font-size:.26rem;
        color:#999999;
        text-align:center;
    }
    .nodata-wrap img{
        width:3.55rem;
        height:1.75rem;
        margin:3rem 0 .77rem;
    }
    .btn{
        font-size:.36rem;
        color:#ff7e4a;
        text-decoration: underline;
        margin-bottom:1rem;
    }   
</style>