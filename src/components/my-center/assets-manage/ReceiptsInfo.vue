<template>
    <!-- 收入明细详情 -->
    <div class="receiptInfo-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="receiptInfo-content">
            <div class="receiptInfo-num">
                <div class="left">流水号</div>
                <div class="right" v-text="infoData.num"></div>
            </div>
            <div class="receiptInfo">
                <div class="strip">
                    <div class="left">类型</div>
                    <div class="right" v-text="infoData.type"></div>
                </div>
                <div class="strip">
                    <div class="left">金额</div>
                    <div class="right" v-text="infoData.price"></div>
                </div>
                <div class="strip">
                    <div class="left">时间</div>
                    <div class="right" v-text="infoData.time"></div>
                </div>
                <div class="strip">
                    <div class="left">余额</div>
                    <div class="right" v-text="infoData.balance"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'ReceiptsAll',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                        title:"收支明细",
                    }
                },
                infoData:{
                    num:'20118393939393939393',
                    type:'收入',
                    price:'+2000.0元',
                    time:'2018-09-09 9:00:00',
                    balance:'0.0元',
                }

                
            }
        },
        methods:{
            
        }
    }
</script>
<style scoped>
    .receiptAll-wrap{
        max-width: 12rem;
        margin:0 auto;
    }
    .receiptInfo-content{
        font-size:.26rem;
        background:#ffffff;
        padding-left:.2rem;
    }
    .receiptInfo-num{
        line-height: .9rem;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .left,.right{
        display: inline-block;
    }
    .left{
        color:#666666;
    }
    .right{
        color:#333333;
    }
    .receiptInfo{
        line-height: .45rem;
        padding:.2rem 0;
        padding-right:.2rem;
    }
    .right{
        float:right;
    }
</style>
