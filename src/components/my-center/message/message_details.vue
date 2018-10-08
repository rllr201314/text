<template>
    <div class="mes-details-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="details-con">
            <div class="con-title">
                <div v-text="info.title"></div>
                <div v-text="info.create_time"></div>
            </div>
            <div class="con-des" v-text="info.content"></div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name:'Message_Details',
    data(){
        return {
            showTitle: {
                showBack: false,
                showLogo: 2,
                showShare: 3, //1搜索2分享3菜单
                showBg: true,
                title: "系统消息"
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
        getData(msg_id){
            var that = this;
            that.$axios.post('/api/msg_content',{
                msg_id:msg_id
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        var that = this;
        var sign = that.$route.query.sign;
        if(sessionStorage.getItem('sign') == sign){
            if(that.isobjStr(sign)){
                that.info = JSON.parse(sign);
                that.getData(that.info.msg_id)
            }else{
                that.$router.go(-1);
            }
        }else{
            that.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.mes-details-wrap{
    max-width: 12rem;
    margin: 0 auto;
    padding-top: 0.88rem;
}
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
    text-indent:.2rem;
    padding:.28rem 0;
    font-size:.26rem;
    color:#666666;
}
</style>
