<template>
    <!-- 申请理赔 -->
    <div class="apply-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="apply-con">
            <div class="apply-cell">
                <div class="cell-tit">
                    <img src="../../static/img/goodscreen/vertical.png" alt="">
                    <span>请提交理赔申请信息</span>
                </div>
                <div class="cell-con">
                    <div class="sell-strip">
                        <span class="sell-lefttext">手机号</span>
                        <input type="number" placeholder=" 请填写您的绑定手机号">
                        <div class="right-opt">
                            <span class="orange-color">前往认证</span>
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">理赔事由</span>
                        <div class="right-opt">
                            <span>请选择事由</span>
                            <img src="../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-des">商品描述</span>
                        <textarea name="des" id="arbdes" cols="25" rows="3" placeholder="请对商品进行描述"></textarea>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>上传截图</span>
                            <span class="red-color">（单张图片不能超过10M,最多可上传5张图片）</span>
                        </div>
                        <div class="upimg-content">
                            <div class="img-cell" v-for="(item,index) in upImgAll.imgSrc">
                                <img :src="item.base64" alt="">
                                <div class="delImg" @click="delImg(index)">
                                    <img src="../../static/img/order/delete_img.png" alt="">
                                </div>
                            </div>
                            <div class="upimg-cell">
                                <img src="../../static/img/order/add_img.png" alt="">
                                <input type="file" id="upImg" accept="image/*" multiple capture @change="addImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nextBtn">提交申请</div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "ApplySettlement",
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
                    title: "申请理赔"
                }
            },
            upImgAll: {
                imgSrc: [],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg"
                }
            }
        };
    },
    methods: {
        // 添加图片
        addImg(event) {
            var that = this;
            var imgSrcArr = that.upImgAll.imgSrc;
            if (imgSrcArr.length >= 5) {
                mui.alert(
                    "图片上传到达上限",
                    "提示",
                    "确认",
                    function() {
                        return;
                    },
                    "div"
                );
            } else if (imgSrcArr.length < 5) {
                var arr = [];
                let imgArr = event.target.files;
                console.log(imgArr);
                for (var i = 0; i < imgArr.length; i++) {
                    let type = imgArr[i].type; //文件的类型，判断是否是图片
                    let size = imgArr[i].size; //文件的大小，判断图片的大小
                    if (that.upImgAll.imgData.accept.indexOf(type) == -1) {
                        mui.alert(
                            "请选择我们支持的图片格式！",
                            "提示",
                            "确认",
                            null,
                            "div"
                        );
                        return false;
                    }
                    if (size > 3145728) {
                        mui.alert(
                            "请选择3M以内的图片！",
                            "提示",
                            "确认",
                            null,
                            "div"
                        );
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
            }
        },
        delImg(ind) {
            var imgList = this.upImgAll.imgSrc;
            imgList.splice(ind, 1);
        }
    }
};
</script>
<style scoped>
.apply-wrap {
    max-width: 12rem;
    margin: 0 auto;
}
.apply-con {
    padding: 0.2rem;
}

.apply-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.cell-tit {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.cell-tit span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.cell-tit img {
    width: 0.16rem;
    height: 0.4rem;
    margin: 0.1rem 0 0 0.17rem;
    vertical-align: middle;
}
.cell-con {
    padding-left: 0.2rem;
}
.sell-strip {
    font-size: 0.26rem;
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
    position: relative;
}
.sell-lefttext {
    width: 1.3rem;
    line-height: 0.9rem;
    display: inline-block;
}
.right-opt {
    /* width: 3rem; */
    text-align: right;
    font-size: 0.24rem;
    color: #999999;
    display: inline-block;
    position: absolute;
    right: 0.2rem;
    top: 0;
}
.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
    margin-left: 0.2rem;
    margin-top: -0.03rem;
}
.right-opt span {
    vertical-align: middle;
    display: inline-block;
    line-height: 0.9rem;
}
.orange-color {
    text-decoration: underline;
    color: #fe7649;
}
.red-color {
    color: #ff5e5e;
}
.sell-des {
    vertical-align: top;
    width: 1.3rem;
    margin: 0.25rem 0 0;
    display: inline-block;
}
#arbdes {
    border: none;
    width: 5.3rem;
    padding: 0;
    font-size: 0.24rem;
    margin: 0.25rem 0 .2rem;
    vertical-align: middle;
}

/* 上传图片 */
.upimg-content {
    padding: 0.2rem 0 0;
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

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0 auto 0.3rem;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 3rem;
    height: 0.6rem;
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
</style>
