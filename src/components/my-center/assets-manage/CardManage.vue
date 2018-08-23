<template>
    <!-- 银行卡管理 -->
    <div class="cardmanage-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="cardmanage-content">
            <div class="add-card" v-if="pageType==1">
                <img src="../../../../static/img/assets-manage/bank_card.png" alt="">
                <div>您还未绑定任何银行卡，请先完成绑定</div>
            </div>
            <div class="manange-card" v-else-if="pageType==2">
                <div class="manange-top">
                    <img src="../../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请选择默认银行卡</span>
                </div>
                <div class="manange-content">
                    <div class="manange-strip" v-for="item in cardData" @click="seleBank(item.key)">
                        <img class="bank-ico" :src="item.bank_ico" alt="">
                        <div class="bank-info">
                            <div class="bank-name" v-text="item.bank_name"></div>
                            <div class="bank-num" v-text="item.bank_num"></div>
                        </div>
                        <img v-show="item.isSele" class="ok-ico" src="../../../../static/img/assets-manage/ok_ico.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'CardManage',
        components:{
            Header,
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
                    }
                },
                pageType:1  ,//控制页面是添加银行卡还是选择银行卡----
                cardData:[{
                    key:1,
                    bank_ico:'./static/img/assets-manage/gs_ico.png',
                    bank_name:'中国工商银行',
                    bank_num:'储蓄卡(6217********0788)',
                    isSele:true,
                },{
                    key:2,
                    bank_ico:'./static/img/assets-manage/zg_ico.png',
                    bank_name:'中国银行',
                    bank_num:'储蓄卡(6217********0788)',
                    isSele:false,
                }]
            }
        },
        mounted(){
            if(this.pageType == 1){
                this.comData.showTitle.showShare = 5;
            }else{
                this.comData.showTitle.showShare = 4;
                this.comData.showTitle.title = "银行卡管理";
            }
        },
        methods:{
            seleBank(opt){
                var cardData = this.cardData;
                for(var i in cardData){
                    if(opt == cardData[i].key){
                        cardData[i].isSele = true;
                        continue;
                    }
                    cardData[i].isSele = false;
                }
            }
        }
    }
</script>
<style scoped>
    .cardmanage-wrap{
        max-width: 12rem;
        margin:0 auto;
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
        width:.57rem;
        height:.57rem;
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
