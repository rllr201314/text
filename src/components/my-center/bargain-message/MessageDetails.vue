<template>
    <div class="messageADetails-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="messageDetails-con">
            <div class="sortTit">
                <span class="titText">出价记录</span>
                <div class="sort-wrap">
                    <div class="sele-sort">
                        <img src="../../../../static/img/goodscreen/sort_ico.png" alt="">
                        <span>按照价格排序</span>
                    </div>
                    <div class="sele-sort">
                        <img src="../../../../static/img/goodscreen/sort_ico.png" alt="">
                        <span>按照时间排序</span>
                    </div>
                </div>
            </div>
            <div class="message-cell" v-for="item in messageData">
                <div class="message-strip top">
                    <span class="left-text">买家</span>
                    <span class="right-text" v-text="item.phone"></span>
                    <span class="time" v-text="item.time"></span>
                </div>
                <div class="message-strip">
                    <span class="left-text">出价</span>
                    <span class="right-text red-color" v-text="item.bid"></span>
                </div>
                <div class="message-strip">
                    <span class="left-text">原价</span>
                    <span class="right-text" v-text="item.price"></span>
                </div>
                <div class="btn" :class="item.isSuc?'red-bg':'gray-bg'" v-text="item.isSuc?'同意':'已拒绝'"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "MessageAll",
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
                    title: "收到的议价消息"
                }
            },
            messageData:[{
                phone:'1232***123123',
                bid:'￥133232',
                price:'￥133232',
                time:'2017-08-09  12:20',
                isSuc:true,
            },{
                phone:'1232***123123',
                bid:'￥133232',
                price:'￥133232',
                time:'2017-08-09  12:20',
                isSuc:false,
            },{
                phone:'1232***123123',
                bid:'￥133232',
                price:'￥133232',
                time:'2017-08-09  12:20',
                isSuc:true,
            }]
        };
    }
};
</script>
<style scoped>
.messageADetails-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.messageDetails-con {
    padding: 0 0.2rem;
}
.sortTit {
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #333333;
    position: relative;
}

.sort-wrap {
    color: #999999;
    font-size: 0.24rem;
    position: absolute;
    top: 0;
    right: 0;
}
.sort-wrap .sele-sort:nth-child(1) {
    margin-right: 0.6rem;
}
.sele-sort {
    display: inline-block;
}
.sele-sort img {
    width: 0.22rem;
    height: 0.23rem;
    margin-right: 0.1rem;
}

.message-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    font-size: 0.26rem;
    position: relative;
}
.message-strip {
    line-height: 0.5rem;
}
.message-strip span {
    display: inline-block;
}
.top {
    position: relative;
}
.time {
    font-size: 0.24rem;
    color: #999999;
    position: absolute;
    right: 0;
    top: 0;
}
.left-text {
    width: 1.5rem;
    color:#666666;
}
.red-color{
    color:#FF5E5E;
}
.btn{
    width:1.1rem;
    line-height: .44rem;
    font-size:.22rem;
    text-align:center;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    color:#FFFFFF;
    position: absolute;
    top:.9rem;
    right:.7rem;
}
.red-bg{
    background:#FE7649;
    -webkit-box-shadow:  1px 1px 5px #FE7649;
    -moz-box-shadow: 1px 1px 5px #FE7649;
    box-shadow: 1px 1px 5px #FE7649;
}
.gray-bg{
    background: #C6C6C6;
}
</style>
