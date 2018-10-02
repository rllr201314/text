<template>
    <div class="message-all-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="message-all-con">
            <div class="message-strip">
                <div class="left">
                    <img src="../../../../static/img/message.png" alt="">
                    <div class="message-title">
                        <div class="title">asfadsfdsa</div>
                        <div class="gray-color">fadsdsa</div>
                    </div>
                </div>
                <div class="gray-color">1561651</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"
export default {
    name:'MessageAll',
    data(){
        return {
            showTitle:{
                showBack: false,
                showLogo: 2, 
                showShare: 3, //1搜索2分享3菜单
                showBg: true,
                title: "消息",
            }
        }
    },
    components:{
        Header,
    },
    methods:{

    },
    mounted(){

    }
}
</script>
<style scoped>
.message-all-wrap{
    max-width: 12rem;
    margin: 0 auto;
    padding-top:.88rem;
}
.message-all-con{
    padding-left:.2rem;
    background:#FFFFFF;
}
.message-strip{
    padding-right:.2rem;
    display:flex;
    height:1.2rem;
    align-items:center;
    justify-content:space-between;
    border-bottom:1px solid #E5E5E5;
}
.left img{
    width:.88rem;
    height:.88rem;
    vertical-align: middle;
    margin-right:.3rem;
}
.message-title{
    display:inline-block;
    vertical-align: middle;
}
.title{
    font-size:.28rem;
    color:#333333;
}
.gray-color{
    font-size:.24rem;
    color:#999999;
}
</style>

