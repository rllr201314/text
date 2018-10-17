<template>
    <!-- 收货 -->
    <div class="take-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="take-content">
            <div class="take-cell">
                <div class="goods-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>订单详情</span>
                </div>
                <div class="goods-info-con">
                    <img class="goods-ico" :src="goodsInfo.game_logo" alt="">
                    <div class="goods-info-des">
                        <span v-text="goodsInfo.goods_title"></span>
                        <img src="../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
            <!-- 订单号，分期情况，实际支付 -->
            <div class="take-cell">
                <div class="goodsInfo">
                    <div class="goodsInfo-left">订单号</div>
                    <div class="goodsInfo-right">
                        <span v-text="goodsInfo.order_sn"></span>
                        <span class="blue-color" :data-clipboard-text="goodsInfo.order_sn" @click="copyFn()" id="copy">[复制]</span>
                    </div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">总支付金额</div>
                    <div class="goodsInfo-right red-color">￥<span v-text="goodsInfo.goods_amount"></span></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">保险费</div>
                    <div class="goodsInfo-right">￥<span v-text="goodsInfo.goods_safe"></span></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">合同费</div>
                    <div class="goodsInfo-right">￥<span v-text="goodsInfo.goods_compact"></span></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">平台手续费</div>
                    <div class="goodsInfo-right">￥<span v-text="goodsInfo.goods_charge"></span></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">结算总金额</div>
                    <div class="goodsInfo-right red-color">￥<span v-text="goodsInfo.income_amount"></span></div>
                </div>
            </div>
            <!-- 状态 -->
            <div class="take-status-img-cell">
                <img v-for="item in takeData.takeTypeImg" v-if="item.key == takeType" :src="item.imgsrc" alt="">
            </div>
            <!-- 收货状态 -->
            <div class="take-cell">
                <div class="take-status-title">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>收货状态</span>
                    <span class="award" v-if=" goodsInfo.is_arbitrate == 2">仲裁中</span>
                </div>
                <div class="take-cell-content">
                    <div class="confirm-receipt">
                        <div v-if="false">
                            <div class="upimg-content">
                                <div class="img-cell" v-for="(item,index) in upimgAll.imgSrc">
                                    <img :src="item.base64" alt="">
                                    <div class="delImg" @click="delImg(index)">
                                        <img src="../../../static/img/order/delete_img.png" alt="">
                                    </div>
                                </div>
                                <div class="upimg-cell">
                                    <img src="../../../static/img/order/add_img.png" alt="">
                                    <input type="file" id="upImg" accept="image/*" multiple capture @change="addImg">
                                </div>
                            </div>
                            <div class="upImgBtn">提交验货</div><span class="upImg-hint">（最多上传8张图片）</span>
                        </div>
                        <div class="intie" v-if="takeType == -1">
                            <span>等待买家确认交易</span>
                        </div>
                        <div class="intie" v-if="takeType == 1||　takeType == 2">
                            <img src="../../../static/img/order/speed.png" alt="">
                            <span>客服正在为您火速换绑中，请您耐心等待</span>
                        </div>
                    </div>
                    <div v-if="takeType == 3 && is_end == 2">
                        <div class="text-center">您已发货成功，等待买家确认收货</div>
                        <div class="cargo" v-if="false">确认交易</div>
                    </div>
                    <div v-if="takeType == 3 && is_end == 1">
                        <div class="text-center">买家已确认收货</div>
                    </div>
                </div>
            </div>
            <div class="take-bottom">
                交易过程中，如有任何疑问，请及时
                <a href="https://web.jiaxincloud.com/gray/mobile.html?&thirdJson={}&bg=FD8159&dialogLogo=0&dialogType=1&dialogMode=1&lang=cn&blinkTitle=1&orgName=mglhodd3enu2mg&appName=kgh431&appChannel=20003&quoteUrl=https://web.jiaxincloud.com&pageTitle=看个号客服&pageUrl=https://web.jiaxincloud.com/onekey.html?id=mglhodd3enu2mg&appName=kgh431&appChannel=20003&alone=1&jump=true&jump=true"><span class="orange-color">咨询客服</span></a>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
export default {
    name: "TakeDelivery",
    components: {
        Header
    },
    data() {
        return {
            componentsData: {
                showTitle: {
                    showBack: false, //显示后退按钮
                    showLogo: 2, //不显示头部log
                    showShare: 3, //1搜索2分享
                    showBg: true, //是否显示背景
                    title: "收货"
                }
            },
            goodsInfo:{},
            is_end:'',
            takeType: '', //1-提交截图 2-等待买家确认 3-换绑 4-确认收货
            takeData: {
                takeTypeImg: [
                    {
                        key: 0,
                        imgsrc: "./static/img/sell/one.png"
                    },
                    {
                        key: -1,
                        imgsrc: "./static/img/sell/two.png"
                    },
                    {
                        key: 1,
                        imgsrc: "./static/img/sell/three.png"
                    },
                    {
                        key: 2,
                        imgsrc: "./static/img/sell/three.png"
                    },
                    {
                        key: 3,
                        imgsrc: "./static/img/sell/four.png"
                    }
                ],
                gamePrint: 8,
                email: "dsjjf@126.com",
                phone: "15659894465"
            },
            upimgAll: {
                imgSrc: [],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg"
                }
            }
        };
    },
    methods: {
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function(e) {
                clipboard.destroy();
                console.log("成功");
                mui.toast("复制成功", { duration: "short", type: "div" });
            });
            clipboard.on("error", function(e) {
                clipboard.destory();
                console.log("失败");
                mui.toast("请重新点击复制", { duration: "short", type: "div" });
            });
        },
        // 添加图片
        addImg(event) {
            console.log(event);
            var that = this;
            var imgSrcArr = that.upimgAll.imgSrc;
            var arr = [];
            let imgArr = event.target.files;
            for (var i = 0; i < imgArr.length; i++) {
                let type = imgArr[i].type; //文件的类型，判断是否是图片
                let size = imgArr[i].size; //文件的大小，判断图片的大小
                if (that.upimgAll.imgData.accept.indexOf(type) == -1) {
                    mui.alert("请选择我们支持的图片格式！","提示","确认",null,"div");
                    return false;
                }
                if (size > 3145728) {
                    mui.alert("请选择3M以内的图片！","提示","确认",null,"div");
                    return false;
                }

                var reader = new FileReader();
                reader.readAsDataURL(imgArr[i]);

                var fileName = imgArr[i].name;
                reader.onload = function(e) {
                    var imgMsg = {
                        name: fileName, //获取文件名
                        base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                    };
                    imgSrcArr.push(imgMsg);
                };
            }
        },
        delImg(ind) {
            var imgList = this.upimgAll.imgSrc;
            imgList.splice(ind, 1);
        },
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"seller_trade_status",{
                order_id:that.$route.query.order,
            }).then((res)=>{
                console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.goodsInfo = res.data.data;
                        that.takeType = res.data.data.bind_status;
                        that.is_end = res.data.data.is_end;
                        if(that.is_end == 1){
                            that.takeType = 3;
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
    },
    mounted(){
        this.getData();
    }
};
</script>
<style>
.take-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top:.88rem;
}
.take-content {
    padding: 0.2rem 0.2rem 0;
}
.take-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.goods-info-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.goods-info-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
    vertical-align: middle;
}
.goods-info-top img {
    width: 0.13rem;
    height: 0.35rem;
    margin: 0.1rem 0 0 0.17rem;
    vertical-align: middle;
}
.goods-info-con {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #666666;
}
.goods-ico {
    width: 0.79rem;
    height: 0.79rem;
    margin: 0 0.2rem;
    vertical-align: middle;
}
.goods-info-des {
    width: calc(100% - 1.5rem);
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    vertical-align: middle;
    position: relative;
}
.goods-info-des img {
    width: 0.11rem;
    height: 0.23rem;
    position: absolute;
    top: 0.15rem;
    right: 0;
}
.take-cell .goodsInfo:nth-last-child(1) {
    border: none;
}
.goodsInfo {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 0.2rem;
    padding-right: 0.2rem;
}
.goodsInfo-left,
.goodsInfo-right {
    display: inline-block;
    font-size: 0.26rem;
}
.goodsInfo-left {
    color: #666666;
}

.goodsInfo-right {
    color: #333333;
    float: right;
}
.blue-color {
    color: #4ac0f4;
    font-size: 0.28rem;
    margin-left: 0.1rem;
}

.red-color {
    color: #ff5e5e !important;
}
.take-status-img-cell {
    text-align: center;
    width: 6.51rem;
    height: 0.95rem;
    margin: 0.2rem auto;
}
.take-status-img-cell img {
    width: 6.51rem;
    height: 0.95rem;
}

.take-status-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.take-status-title span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
    margin-right: 0.2rem;
}
.take-status-title .red-color {
    font-size: 0.24rem;
}
.take-status-title img {
    width: 0.13rem;
    height: 0.29rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}
.take-status-title .award {
    float: right;
    font-size: 0.24rem;
    color: #999999;
}
.take-cell-content {
    font-size: 0.26rem;
    color: #666666;
    padding: 0.35rem 0.2rem;
}
.text-center {
    text-align: center;
}
.cargo {
    max-width: 1.4rem;
    color: #ffffff;
    line-height: 0.44rem;
    text-align: center;
    background: #fe7649;
    font-size: 0.22rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin: 0.2rem auto 0;
}
.affirming {
    max-width: 1.1rem;
    color: #ffffff;
    line-height: 0.44rem;
    text-align: center;
    background: #c6c6c6;
    font-size: 0.22rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin: 0.2rem auto 0;
}
.confirm-title span {
    color: #999999;
}

.accountText {
    line-height: 0.5rem;
    color: #333333;
}
.accountText span {
    width: 1.3rem;
    display: inline-block;
    text-align: right;
    padding-right: 0.1rem;
    color: #666666;
}

.take-bottom {
    font-size: 0.24rem;
    color: #999999;
    text-align: center;
}

.orange-color {
    color: #fe7649 !important;
    text-decoration: underline;
}

/* 上传图片 */
.upimg-content {
    padding: 0.1rem 0 0;
}
.img-cell {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
}
.img-cell img {
    width: 1.5rem;
    height: 1.5rem;
}
.delImg {
    position: absolute;
    top: -0.1rem;
    right: -0.1rem;
    z-index: 1;
}
.delImg img {
    width: 0.32rem;
    height: 0.32rem;
}
.upimg-cell {
    vertical-align: top;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
    padding: 0;
    overflow: hidden;
}
.upimg-cell img {
    width: 1.5rem;
    height: 1.5rem;
}
#upImg {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    opacity: 0;
}
.upImgBtn{
    display: inline-block;
    padding:0 .12rem;
    color: #ffffff;
    line-height: 0.44rem;
    text-align: center;
    background: #fe7649;
    font-size: 0.22rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin-right:.1rem;
}
.upImg-hint{
    color:#999999;
    font-size:.22rem;
}

/* ==========input========= */
input[type="password"] {
    font-size: 0.26rem;
    padding: 0.1rem;
    margin: 0;
    width: 2.56rem;
    height: 0.5rem;
    line-height: 0.5rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}

.intie {
    text-align: center;
}
.intie img {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
}
.intie span {
    vertical-align: middle;
}
</style>
