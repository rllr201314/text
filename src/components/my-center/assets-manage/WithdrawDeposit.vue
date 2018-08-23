<template>
    <!-- 提现 -->
    <div class="withdraw-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="withdraw-title">
            <div class="auciton-status" @click="seleWithStatus('balance')" :class="withdrawStatus?'red-border':''">余额提现</div>
            <div class="auciton-status" @click="seleWithStatus('nobalance')" :class="withdrawStatus?'':'red-border'">押金提现</div>
        </div>
        <div class="withdraw-content">
            <!-- 余额提现 -->
            <div class="balance-wrap" v-show="withdrawStatus">
                <div class="card-strip withdraw-cell">
                    <div class="left-strip">银行卡</div>
                    <div class="right-strip">
                        <span v-text="balanceData.cardNum"></span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class=" withdraw-cell">
                    <div class="withdraw-strip">
                        <div class="left-strip">可提现金额</div>
                        <div class="right-strip">
                            <span v-text="balanceData.price"></span>
                            <span class="blue-color">全部提取</span>
                        </div>
                    </div>
                    <div class="withdraw-strip">
                        <div class="left-strip">提现金额</div>
                        <div class="right-strip">
                            <input type="number" placeholder="0">
                            <span>元</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 押金提现 -->
            <div class="balance-wrap" v-show="!withdrawStatus">
                <div class="card-strip withdraw-cell">
                    <div class="left-strip">银行卡</div>
                    <div class="right-strip">
                        <span v-text="nobalanceData.cardNum"></span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class=" withdraw-cell">
                    <div class="withdraw-strip">
                        <div class="left-strip">可提现金额</div>
                        <div class="right-strip">
                            <span v-text="nobalanceData.price"></span>
                            <span class="blue-color">全部提取</span>
                        </div>
                    </div>
                    <div class="withdraw-strip">
                        <div class="left-strip">提现金额</div>
                        <div class="right-strip">
                            <input type="number" placeholder="0">
                            <span>元</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hint">提现申请提交后，余额将被暂时冻结（无法使用）</div>
        </div>
        
        <div class="okBtn">预计24小时内到账，确认提现</div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'WithdrawDeposit',
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
                        title:"提现",
                    }
                },
                withdrawStatus:true,
                balanceData:{
                    cardNum:'工商银行储蓄卡 301************30',
                    price:'￥1000.50元',
                    inpPrice:''
                },
                nobalanceData:{
                    cardNum:'工商银行储蓄卡 301*****22*****30',
                    price:'￥100011111.50元',
                    inpPrice:''
                }
            }
        },
        methods:{
            seleWithStatus(flag){
                if(flag == 'balance'){
                    this.withdrawStatus = true;
                }else if(flag == 'nobalance'){
                    this.withdrawStatus = false;
                }
            }
        }
    
    }
</script>
<style scoped>

    .withdraw-title{
        background:#FFFFFF;
        font-size:.26rem;
        color:#333333;
    }
    .withdraw-title div{
        display: inline-block;
        width:49.3%;
        text-align: center;
        line-height: .8rem;
    }
    .red-border{
        color:#FF7E4A;
        border-bottom:.04rem solid #FF7E4A;
    }
    .withdraw-content{
        padding:.2rem;
    }
    .withdraw-cell{
        font-size:.26rem;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding:0 0 0 .2rem;
        position: relative;
    }
    .left-strip,.right-strip{
        display: inline-block;
    }
    .card-strip{
        line-height:.9rem;
    }
    .left-strip{
        color:#666666;
    }
    .right-strip{
        color:#333333;
        position:absolute;
        right:.2rem;
        top:0;
    }
    .right-strip img{
        width:.13rem;
        height:.24rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .right-strip span{
        vertical-align: middle;

    }

    .withdraw-strip{
        line-height:.9rem;
        border-bottom:.01rem solid #E5E5E5;
        position: relative;
    }
    .blue-color{
        color:#4AC0F4;
        font-size:.28rem;
        margin-left:.2rem;
    }

    .hint{
        color:#999999;
        font-size:.24rem;
        text-align:center;
        line-height:.6rem;
    }


    /* 提交申请 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.2rem auto 0;
        width:6.5rem;
        text-align: center;
        line-height: .8rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #FD915F;
        -moz-box-shadow: .06rem .05rem .09rem #FD915F;
        box-shadow: .06rem .05rem .09rem #FD915F;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
    /* ==========input========= */
    input{
        font-size:.26rem;
        border:none;
        text-align:right;
        padding:0;
        margin:0 .03rem 0 0;
        width:3rem;
        height:.9rem;
        line-height: .9rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.26rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.26rem;
    }
</style>
