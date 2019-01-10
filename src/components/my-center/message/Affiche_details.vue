<template>
    <div class="wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="details-con">
            <div class="con-title">
                <div v-text="info.title"></div>
                <div v-text="info.create_time"></div>
            </div>
            <div class="con-des" v-html="info.content" :class="info.content?'con-detail':''"></div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name:'Affichee_Details',
    data(){
        return {
            showTitle: {
                showBack: false,
                showLogo: 2,
                showShare: 3, //1搜索2分享3菜单
                showBg: true,
                title: "",
            },
            info:{},
        }
    },
    components:{
        Header,
    },
    methods:{
        // 判断是不是JSON字符串
        isobjStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        },
        getData(article_id){
            var that = this;
            that.$axios.post(process.env.API_HOST+"article_info",{
                article_id:article_id
            }).then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.info = res.data.data;
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        var that = this;
        var sign = that.$route.query.sign;
        if(that.$route.query.article){
            that.showTitle.title = that.$route.query.type;
            that.getData(that.$route.query.article)
        }else{
            that.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.details-con{
    background:#ffffff;
    padding:0 .3rem;
}
.con-title{
    text-align: center;
    padding:.4rem 0 .2rem;
    border-bottom:1px solid #E5E5E5;
}
.con-title :first-child{
    font-size:.3rem;
    font-weight: bold;
    color:#333333;
    line-height: .5rem;
}
.con-title :last-child{
    font-size:.24rem;
    color:#999999;
    line-height: .5rem;
}
.con-des{
    min-height:4rem;
    padding:.28rem 0;
    font-size:.26rem;
    color:#666666;
}
.con-detail>img{
    width:100%;
    height:100%;
}
</style>
