<template>
    <!-- 冻结资产明细 -->
    <div class="frost-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="frost-content">
            <div class="frost-cell">
                <div class="frost-strip" v-for="item in frostData">
                    <div class="frost-strip-tit" v-text="item.title">冻结金额</div>
                    <div class="frost-strip-cen">
                        <span class="cen-ico" :class="item.issuc?'green-bg':'red-bg'"  v-text="item.ico"></span>
                        <span class="time" v-text="item.time"></span>
                        <span class="price" v-text="item.price"></span>
                    </div>
                    <div class="frost-strip-bot">
                        <span>备注：</span>
                        <span class="remark" v-text="item.remark"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'Frost',
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
                        title:"冻结资金明细",
                    }
                },
                frostData:[{
                    title:'冻结金额',
                    ico:'提现中',
                    time:'2018-08-09  9:00:00',
                    price:'1000.00元',
                    remark:'收款账户  工商银行 6110*********12312',
                    issuc:true,
                },{
                    title:'冻结金额',
                    ico:'提现中',
                    time:'2018-08-09  9:00:00',
                    price:'1000.00元',
                    remark:'收款账户  工商银行 6110*********12312',
                    issuc:false,
                },{
                    title:'冻结金额',
                    ico:'提现中',
                    time:'2018-08-09  9:00:00',
                    price:'1000.00元',
                    remark:'收款账户  工商银行 6110*********12312',
                    issuc:true,
                },{
                    title:'冻结金额',
                    ico:'提现中',
                    time:'2018-08-09  9:00:00',
                    price:'1000.00元',
                    remark:'收款账户  工商银行 6110*********12312',
                    issuc:false,
                }]
            }
        }
    }
</script>
<style scoped>
    .frost-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .frost-content{
        padding:.2rem;
    }
    .frost-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        padding-left:.2rem;
    }
    .frost-strip{
        color:#333333;
        padding:.2rem 0;
        border-bottom:.01rem solid #E5E5E5;
    }
    .frost-strip-tit{
        font-size:.28rem;
        line-height: .4rem;
    }
    .frost-strip-cen{
        line-height: .5rem;
        position: relative;
    }
    .frost-strip-cen span{
        display: inline-block;
    }
    .cen-ico{
        padding:.03rem;
        margin-right:.1rem;
        font-size:.2rem;
        line-height: .2rem;
        color:#FFFFFF;
        vertical-align: middle;
    }
    .green-bg{
        background:#FE7649;
    }
    .red-bg{
        background:#45C773;
    }
    .time{
        color:#999999;
        font-size:.24rem;
        vertical-align: middle;
    }
    .price{
        color:#333333;
        font-size:.26rem;
        position:absolute;
        right:.2rem;
        top:0;
    }
    .frost-strip-bot{
        color:#666666;
        font-size:.26rem;
    }
    .remark{
        color:#999999;
        font-size:.24rem;
    }
</style>
