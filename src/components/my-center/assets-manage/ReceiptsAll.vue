<template>
    <!-- 收入明细列表 -->
    <div class="receiptAll-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="seleTitle">
            <div :class="receiptData.seleData.all?'red-title':'black-title'" @click="seleTitle('all')">全部</div>
            <div :class="receiptData.seleData.come?'red-title':'black-title'" @click="seleTitle('come')">支出</div>
            <div :class="receiptData.seleData.enter?'red-title':'black-title'" @click="seleTitle('enter')">收入</div>
        </div>
        <div class="receiptAll-content">
            <div class="receiptAll-cell">
                <div class="receiptAll-strip" v-for="item in receiptData.cellData">
                    <div class="receiptAll-des" v-text="item.des"></div>
                    <div class="receiptAll-time" v-text="item.time">2018-08-09  9:00</div>
                    <div class="receiptAll-price" :class="item.istrue?'green-color':'black-color'" v-text="item.price"></div>
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

                receiptData:{
                    seleData:{
                        all:true,
                        come:false,
                        enter:false,
                    },
                    cellData:[],
                    allData:[{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:true,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:false,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:true,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:false,
                    }],
                    comeData:[{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:false,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:false,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:false,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:false,
                    }],
                    enterData:[{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:true,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:true,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:true,
                    },{
                        des:'余额支付',
                        time:'2018-08-09  9:00',
                        price:'+59',
                        istrue:true,
                    }],
                }
                
            }
        },
        mounted(){
            this.receiptData.cellData = this.receiptData.allData;
        },
        methods:{
            seleTitle(opt){
                if(opt == 'all'){
                    this.receiptData.seleData.all = true;
                    this.receiptData.seleData.come = false;
                    this.receiptData.seleData.enter = false;
                    this.receiptData.cellData = this.receiptData.allData;
                }else if(opt == 'come'){
                    this.receiptData.seleData.all = false;
                    this.receiptData.seleData.come = true;
                    this.receiptData.seleData.enter = false;
                    this.receiptData.cellData = this.receiptData.comeData;
                }else if(opt == 'enter'){
                    this.receiptData.seleData.all = false;
                    this.receiptData.seleData.come = false;
                    this.receiptData.seleData.enter = true;
                    this.receiptData.cellData = this.receiptData.enterData;
                }
            }
        }
    }
</script>
<style scoped>
    .receiptAll-wrap{
        max-width: 12rem;
        margin:0 auto;
    }
    .seleTitle{
        display: flex;
        text-align:center;
        line-height:.8rem;
        font-size:.26rem;
        background:#FFFFFF;
    }
    .seleTitle div{
        width:100%;
    }
    .red-title{
        color:#FF7E4A;
        border-bottom:.05rem solid #FF7E4A;
    }


    .receiptAll-content{
        padding:.2rem;
    }
    .receiptAll-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        padding-left:.2rem;
    }
    .receiptAll-strip{
        border-bottom:.01rem solid #E5E5E5;
        position: relative;
        height: 1.1rem;
        padding:.25rem 0;
    }
    .receiptAll-price{
        font-size:.26rem;
        line-height: 1.1rem;
        position: absolute;
        top:0;
        right:.2rem;
    }
    .black-color{
        color:#333333;
    }
    .green-color{
        color:#45C773;
    }
    
    .receiptAll-des{
        font-size:.26rem;
        color:#333333;
        margin-bottom: .1rem;
    }
    .receiptAll-time{
        font-size:.24rem;
        color:#999999;
    }


</style>
