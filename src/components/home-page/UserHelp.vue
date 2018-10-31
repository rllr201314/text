<template>
    <!-- 用户帮助 -->
    <div class="user-help">
        <div class="is-service" @click="toLink('authent')">
            <img src="../../../static/img/eye_ico.png" alt="">
            <span>真假客服鉴定</span>
        </div>
        <div class="vertical"></div>
        <div class="consult">
            <a href="https://web.jiaxincloud.com/gray/mobile.html?&thirdJson={}&bg=FD8159&dialogLogo=0&dialogType=1&dialogMode=1&lang=cn&blinkTitle=1&orgName=mglhodd3enu2mg&appName=kgh431&appChannel=20003&quoteUrl=https://web.jiaxincloud.com&pageTitle=看个号客服&pageUrl=https://web.jiaxincloud.com/onekey.html?id=mglhodd3enu2mg&appName=kgh431&appChannel=20003&alone=1&jump=true&jump=true">
                <img src="../../../static/img/dialog_ico.png" alt="">
                <span>在线咨询</span>
            </a>
        </div>
        <div class="vertical"></div>
        <div class="sell" @click="toLink('sell')">
            <img src="../../../static/img/sell_ico.png" alt="">
            <span>我要卖</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserHelp",
        methods:{
            toLink(flag){
                var that = this;
                if(flag == 'authent'){
                    that.$router.push({name:'Authenticity'})
                }else if(flag == 'sell'){
                    that.$router.push({name:'Sell'});
                    sessionStorage.buyOrsell = 2;
                }
            }
        }
    }
</script>

<style scoped>
    .user-help{
        height: .7rem;
        color:#666666;
        font-size:.24rem;
        display: flex;
        justify-content: space-around;
        margin-bottom: .2rem;
        background:#FFFFFF;
    }
    .user-help div{
        margin: auto 0;
    }
    .user-help div span{
       vertical-align: middle;
    }
    .user-help div img{
         vertical-align: middle;
    }
    .is-service img{
        width:.35rem;
        height:.22rem;
    }
    .vertical{
        width:1px;
        height:.18rem;
        background:#B0B0B0;
        margin:auto 0;
    }
    .consult img{
        width:.28rem;
        height:.28rem;
    }
    .consult span{
        color:#666666;
    }
    .sell img{
        width:.26rem;
        height:.27rem;
    }
</style>