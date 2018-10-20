<template>
    <!-- 银行卡管理 -->
    <div class="cardmanage-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="cardmanage-content">
            <div class="add-card" v-if="pageType==1">
                <img src="../../../../static/img/assets-manage/bank_card.png" alt="" @click="addCard">
                <div>您还未绑定任何银行卡，请先完成绑定</div>
            </div>
            <div class="manange-card" v-else-if="pageType==2">
                <div class="manange-top">
                    <img src="../../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请选择默认账户</span>
                </div>
                <div class="manange-content">
                    <div class="manange-strip" v-for="item in cardData" @click="seleBank(item.account_id)">
                        <img class="bank-ico" :src="item.withdraw_method == 1?'../../../../static/img/assets-manage/yl.png':'../../../../static/img/assets-manage/zfb.png'" alt="">
                        <div class="bank-info" v-if="item.withdraw_method == 1">
                            <div class="bank-name" v-text="item.open_bank"></div>
                            <div class="bank-num">银行卡：<span v-text="item.account"></span></div>
                        </div>
                        <div class="bank-info" v-else-if="item.withdraw_method == 2">
                            <div class="bank-name" v-text="item.name"></div>
                            <div class="bank-num">账户：<span v-text="item.account"></span></div>
                        </div>
                        <img v-show="item.is_default == 1" class="ok-ico" src="../../../../static/img/assets-manage/ok_ico.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import Loading from "@/components/multi/Loading";
    export default {
        name:'CardManage',
        components:{
            Header,
            Loading
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:4,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                        title:"选择银行卡",
                        identify:null,
                    }
                },
                showLoading:false,
                pageType:1 ,//控制页面是添加银行卡还是选择银行卡----
                cardData:[]
            }
        },
        mounted(){
            var that = this;
            if(that.$route.query.type){
                if(that.$route.query.type == 1){
                    that.pageType = 2;
                }else{
                    that.$router.go(-1);
                }
            }else{
                that.$router.go(-1);
            }
            that.comData.showTitle.identify = that.$route.query.identify;
            if(this.pageType == 1){
                this.comData.showTitle.showShare = 5;
            }else{
                this.comData.showTitle.showShare = 4;
                this.comData.showTitle.title = "账户管理";
                that.getData();
            }
        },
        methods:{
            addCard(){
                this.$router.push({name:'UserAuthentication',query:{type:this.$route.query.identify}});
            },
            // 选择默认账户
            seleBank(opt){
                var that = this;
                var cardData = that.cardData;
                that.showLoading = true;
                that.$axios.post(process.env.API_HOST+"default_account",{
                    account_id:opt,
                }).then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            var cardData = that.cardData;
                            for(var i in cardData){
                                if(opt == cardData[i].account_id){
                                    cardData[i].is_default = 1;
                                    continue;
                                }
                                cardData[i].is_default = 2;
                            }
                        }
                        that.showLoading = false;
                        mui.toast(res.data.msg, {duration: "short",type: "div"});
                        that.$router.go(-1);
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+"account_info").then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.cardData = res.data.data;
                        }
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>
<style scoped>
    .cardmanage-wrap{
        max-width: 12rem;
        margin:0 auto;
        padding-top:.88rem;
    }
    .cardmanage-content{
        font-size:.26rem;
        color:#333333;
        padding:.2rem;
    }
    .add-card{
        text-align: center;
    }
    .add-card img{
        width:1.57rem;
        height:1.26rem;
        margin:3rem 0 .7rem;
    }

    .manange-card{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
    }
    .manange-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .manange-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .manange-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .manange-content{
        padding-left:.2rem;
    }
    .manange-strip{
        padding:.2rem 0;
        border-bottom:.01rem solid #E5E5E5;
        position: relative;
    }
    .bank-ico{
        width:.58rem;
        height:.58rem;
        vertical-align: middle;
        margin-right:.2rem;
    }
    .bank-info{
        display: inline-block;
        vertical-align: middle;
        line-height: .4rem;
        font-size:.26rem;
    }
    .bank-name{
        color:#333333;
    }
    .bank-num{
        color:#666666;
    }
    .ok-ico{
        width:.28rem;
        height:.2rem;
        position: absolute;
        right:.2rem;
        top:calc(50% - .1rem);
    }
</style>
