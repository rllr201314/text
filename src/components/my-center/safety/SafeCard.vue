<template>
    <!-- 安全认证之手机 -->
    <div class="safe-authentic-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="safe-authentic-tit">
            <img class="safe-status" src="../../../../static/img/my-center/safe/two.png" alt="">
        </div>
        <div class="safe-authentic-content">
            <div class="safe-cell">
                <div class="safe-cell-tit" v-if="false">
                    <div class="upimg-cell">
                        <img :src="upimg.user_card" alt="">
                        <input type="file" id="upImg" accept="image/*" capture @change="addImg">
                    </div>
                </div>
                <div class="safe-strip">
                    <span class="strip-left">姓名</span>
                    <input type="text" placeholder="请填写您的姓名" v-model="username">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">身份证号</span>
                    <input type="number" placeholder="请填写您的身份证号" v-model="id_num">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">银行卡</span>
                    <input type="number" placeholder="请填写您实名开户的银行卡账号" v-model="card_num">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">联系电话</span>
                    <input type="number" placeholder="请填写您的联系电话" v-model="mobile">
                </div>
            </div>
        </div>
        <div class="okBtn" @click="nextBtn">下一步</div>
        <div class="statement">
            <span class="statement-tit">声明：</span>
            <span>本认证信息已接入公安系统，对于一切认证身份均具有法律效力</span>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SafeCard",
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
                    title: "安全认证"
                }
            },
            username: "",
            id_num: "",
            card_num: "",
            mobile: "",
            upimg: {
                user_card: "./static/img/my-center/safe/user_card.png",
                imgData: "image/gif, image/jpeg, image/png, image/jpg"
            }
        };
    },
    methods: {
        addImg(event) {
            console.log(event);
            var that = this;
            var arr = [];
            let imgArr = event.target.files[0];
            let type = imgArr.type; //文件的类型，判断是否是图片
            let size = imgArr.size; //文件的大小，判断图片的大小
            if (that.upimg.imgData.indexOf(type) == -1) {
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
                mui.alert("请选择3M以内的图片！", "提示", "确认", null, "div");
                return false;
            }

            var reader = new FileReader();
            reader.readAsDataURL(imgArr);

            var fileName = imgArr.name;
            reader.onload = function(e) {
                var imgMsg = {
                    name: fileName, //获取文件名
                    base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                };
                that.upimg.user_card = imgMsg.base64;
            };
        },
        nextBtn() {
            var that = this;
            var request = {};
            request.name = that.username;
            request.id_no = that.id_num;
            request.bank_account = that.card_num;
            request.mobile = that.mobile;
            request.verify_code = that.$route.query.code;
            that.$axios
                .post(process.env.API_HOST+"authentic_four",request)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            mui.toast(res.data.msg, { duration: "short",type: "div"});
                            // 跳页面
                        } else {
                            mui.toast(res.data.msg, {
                                duration: "short",
                                type: "div"
                            });
                            if (res.data.code == 401) {
                                that.$router.push({ name: "AccountLogin" });
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style scoped>
.safe-authentic-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top: 0.88rem;
}
.safe-authentic-content {
    padding: 0.2rem;
}
.safe-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left: 0.2rem;
    margin-bottom: 0.2rem;
}
.safe-authentic-tit {
    text-align: center;
    padding: 0.5rem 0 0.18rem;
}
.safe-status {
    width: 6.3rem;
    height: 1rem;
}
.safe-cell-tit {
    padding: 0.4rem 0;
}
.upimg-cell {
    vertical-align: top;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    padding: 0;
    overflow: hidden;
    margin: 0 auto;
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

.safe-strip {
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    line-height: 0.9rem;
}
.strip-left {
    width: 1.5rem;
    display: inline-block;
    font-size: 0.26rem;
}

/* 提交申请 */
.okBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.5rem auto 0;
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
.statement {
    font-size: 0.24rem;
    margin: 0.3rem auto 0;
    width: 6.5rem;
    color: #999999;
}
.statement-tit {
    color: #666666;
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 4rem;
    height: 0.6rem;
    vertical-align: middle;
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
