<template>
    <!-- 电子合同 -->
    <div class="pact-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="pact-content">
            <div class="pact-cell">
                <div class="pact-strip" @click="goSign('ture')">
                    <div class="left-strip">
                        <span>需要我签名</span>
                        <span class="gray-color">(<span v-text="sign_num"></span>)</span>
                    </div>
                    <div class="right-strip">
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="pact-strip" @click="goSign('ed')">
                    <div class="left-strip">
                        <span>已签约合同</span>
                        <span class="gray-color">(<span v-text="end_num"></span>)</span>
                    </div>
                    <div class="right-strip">
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Pact",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                    title: "电子合同"
                }
            },
            sign_num:0,
            end_num:0,
            is_identify:null,
        };
    },
    methods:{
        goSign(flag){
            var that = this;
            if(that.is_identify != 1){
                that.$router.push({name:'UserAuthentication',query:{type:that.is_identify}})
            }else{
                if(flag == 'ture'){
                    that.$router.push({name:'Signature'})
                }else{
                    that.$router.push({name:'Signed'})
                }
            }
        },
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"contract_info").then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.sign_num = res.data.data.sign_contract;
                        that.end_num = res.data.data.end_contract;
                        that.is_identify = res.data.data.is_identify;
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getData()
    }
};
</script>
<style scoped>
.pact-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top:.88rem;
}
.pact-content {
    padding: 0.2rem;
}
.pact-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left: 0.2rem;
}
.pact-strip {
    font-size: 0.26rem;
    line-height: 0.9rem;
    color:#666666;
    border-bottom: 0.01rem solid #e5e5e5;
    position: relative;
}
.right-strip {
    position:absolute;
    right:.2rem;
    top:0;
}
.right-strip img {
    width: 0.13rem;
    height: 0.24rem;
}
.gray-color{
    color:#999999;
}
</style>
