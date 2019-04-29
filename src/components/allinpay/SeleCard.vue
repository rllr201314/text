<template>
    <div class="allinpay-wrap wrap">
        <Header :showTitle="showTitle"></Header>
        <div class="pay-tit">
            <img src="../../../static/img/pay/allinpay-log.png" alt="通联支付" />
        </div>
        <div class="card-hint">请选择已绑定的银行卡</div>
        <div class="card-cell" v-for="(item,index) in card_info" :key="index">
            <div class="card-name" v-text="item.bank_name"></div>
            <div class="card-type" v-if="item.card_type == '00'">储蓄卡</div>
            <div class="card-type" v-else-if="item.card_type == '02'">信用卡</div>
            <div class="card-num" v-text="item.bank_no"></div>
            <img :src="item.issele?'../../../static/img/pay/seleCard.png':'../../../static/img/pay/noSeleCard.png'" :alt="item.issele?'已选':'未选'" @click="seleCard(index)">
        </div>
        <div class="add-card-btn" @click="addCard()">添加银行卡</div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "AllinpaySelect",
    components: {
        Header
    },
    watch:{
    },
    methods:{
        // 选择银行卡页面
        seleCard(index){
            var that = this;
            for(let i=0;i<that.card_info.length;i++){
                if(i == index){
                    that.card_info[i].issele = !that.card_info[i].issele;
                    if(that.card_info[i].issele){
                        that.bank_id = that.card_info[i].bank_id;
                    }
                    continue;
                }
                that.card_info[i].issele = false;
            }
        },
        addCard(){
            this.$router.push({path:'/allinpay-addinfo'});
        },
        getData(){
            var that = this;
            that.$axios.post(`${that.baseURL}sign_info`).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){
                        for(var i in res.data.data){
                            res.data.data[i].issele = false;
                        }
                        that.card_info = res.data.data;
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted(){
        this.getData();
    },
    data() {
        return {
            showTitle: {
                showBack: false, //显示后退按钮
                showLogo: 2, //不显示头部log
                showShare: "", //1搜索2分享
                showBg: true, //是否显示背景
                title: "银行卡",
                goBack: ""
            },
            card_info:[],
            bank_id:''
        };
    }
};
</script>
<style lang="scss" scoped>
.allinpay-wrap {
    background: #ffffff;
   .pay-tit {
        text-align: center;
        font-size: 0.24rem;
        color: #999999;
        font-style: italic;
        img {
            width: 2.94rem;
            height: 1.22rem;
        }
    }
    .card-hint{
        color:#999999;font-size:.24rem;margin:0 0 .2rem .4rem;
    }
    .card-cell{
        background:#666666;width:6.86rem;height:2.24rem;border-radius:.1rem;color:#FFFFFF;margin:0 0 .3rem .4rem;
        padding:.4rem 0 0 1rem;
        -webkit-box-shadow: 0 0 .12rem #4C7ACD;
        -moz-box-shadow:  0 0 .12rem #4C7ACD;
        box-shadow: 0 0 .12rem #4C7ACD;
        position:relative;
        img{
            width:.33rem;height:.33rem;position:absolute;top:.9rem;right:.66rem;
        }
        .card-name{
            font-size:.28rem;
        }
        .card-type{
            font-size:.18rem;
        }
        .card-num{
            font-size:.36rem;margin-top:.3rem;
        }
    }
    .add-card-btn{
        width:6.86rem;height:.98rem;border-radius:.1rem;color:#22AFFE;font-size:.3rem;margin-left:.4rem;text-align:center;line-height:.98rem;
        -webkit-box-shadow: 0 0 .15rem #999999;
        -moz-box-shadow:  0 0 .15rem #999999;
        box-shadow: 0 0 .15rem #999999;
    }
}
</style>

