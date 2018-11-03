<template>
    <div class="dial-wrap">
        <Header v-bind:showTitle="showTitle"></Header>
        <div class="dial-content">
            <div class="dial-cell">
                <img class="dial" src="../../../static/img/action/dial-con.png" alt="">
                <img class="pointer" src="../../../static/img/action/pointer.png" alt="" @click="raffleFn">
                <div class="hint">
                    <span>您还有</span><span class="num" v-text="num"></span><span>次抽奖机会</span>
                </div>
            </div>
            <div class="cell">
                <div class="tit">中奖名单</div>
                <div class="con list">

                </div>
            </div>
            <div class="cell">
                <div class="tit">活动规则</div>
                <div class="con rule">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: "Dial",
    components: {
        Header,
        Loading
    },
    data() {
        return {
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部title文字
                // showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
                title: "抽奖"
            },
            num:2,
        };
    },
    methods: {
        raffleFn() {
            var that = this;
            var data = [0, 1, 2, 3, 4, 5, 6, 7];

            data = data[Math.floor(Math.random() * data.length)];
            console.log(data);
            switch (data) {
                case 1:
                    that.rotateFunc(1, 157, "恭喜你中了 <em>一等奖</em>");
                    break;
                case 2:
                    that.rotateFunc(2, 65, "恭喜你中了 <em>二等奖</em>");
                    break;
                case 3:
                    that.rotateFunc(3, 335, "恭喜你中了 <em>三等奖</em>");
                    break;
                case 4:
                    that.rotateFunc(4, 247, "恭喜你中了 <em>四等奖</em>");
                    break;
                case 5:
                    that.rotateFunc(5, 114, "谢谢参与，请再接再厉");
                    break;
                case 6:
                    that.rotateFunc(6, 24, "谢谢参与，请再接再厉");
                    break;
                case 7:
                    that.rotateFunc(7, 292, "谢谢参与，请再接再厉");
                    break;
                default:
                    that.rotateFunc(0, 203, "恭喜你中了 <em>参与奖</em>");
            }
        },
        rotateFunc(awards,spend, text){

            // $plateBtn.stopRotate();
            $('.dial').stopRotate();
			$('.dial').rotate({
				angle: 0,
				duration: 9000,
				animateTo: spend + 1440, //angle是图片上各奖项对应的角度，1440是让指针固定旋转4圈
				// callback: function () {
				// 	$resultTxt.html(text);
				// 	$result.show();
                // },
            });
        }
    }
};
</script>
<style scoped>
.dial-wrap {
    padding-top: 0.88rem;
}
.dial-content {
    width: 100%;
    height: 27rem;
    background: url("../../../static/img/action/dial-bg.png");
    background-size: 100% 27rem;
    /* background-position:center center; */
    padding-top: 2.6rem;
}
.dial-cell {
    background: url("../../../static/img/action/dial-box.png");
    width: 7.5rem;
    height: 9.49rem;
    background-size: 100% 9.49rem;
    position: relative;
}

.dial {
    width: 4.76rem;
    height: 4.76rem;
    position: absolute;
    top: 2.935rem;
    left: 1.54rem;
}
.pointer {
    width: 1.37rem;
    height: 1.61rem;
    position: absolute;
    top: 4.38rem;
    left: 3.22rem;
}
.hint{
    position: absolute;
    bottom:0;
    left:0;right:0;
    font-size:.38rem;
    color:#ffffff;
    text-align:center;
}
.num{
    display: inline-block;
    width:.6rem;
    height:.75rem;
    font-size:.59rem;
    overflow: hidden;
    line-height: .7rem;
    background:#2D03A1;
}
.hint span{
    vertical-align: middle;
}

.cell{
    text-align:center;
    margin-top:.6rem;
}
.tit{
    width:2.65rem;
    height:.39rem;
    font-size:.39rem;
    /* line-height: . */
    background:url('../../../static/img/action/tit-bg.png');
    background-size:2.65rem .39rem;
    color:#ffffff;
    margin:0 auto;
}
.con{
    width:6.62rem;
    margin:0 auto;
    padding:.35rem;
    margin-top:.34rem;
}
.list{
    height:2.65rem;
    background:#2D03A1;
}
.rule{
    min-height:3rem;
    border:2px solid rgba(46,143,229,1);
    border-radius:15px;
}
</style>
