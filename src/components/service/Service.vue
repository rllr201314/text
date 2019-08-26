<template>
    <div class="wrap service-wrap">
        <Head :showTitle="showTitle"></Head>
        <div class="service-detail" ref="chattingContent">
            <!-- <div class="item left">
                <img class="header-img" src="../../../static/img/service/kgh-icon.png" />
                <span class="angle"></span>
                <span class="message">爱你呦</span>
            </div>
            <div class="chart-timer">2019-5-17</div>
            <div class="item right">
                <img class="header-img" src="../../../static/img/service/user-icon.png" />
                <span class="angle"></span>
                <span class="message">爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦爱你呦</span>
            </div>-->
            <div v-for="(item,index) in charts" :key="index">
            <div class="chart-timer" v-text="item.timeStr"></div>
                <div class="item" :class="item.className == 'in'?'left':'right'">
                    <img
                        class="header-img"
                        :src="item.className == 'in'?'../../../static/img/service/kgh-icon.png':'../../../static/img/service/user-icon.png'"
                    />
                    <span class="angle"></span>
                    <span class="message" v-text="item.data"></span>
                </div>
            </div>
        </div>
        <div class="input-box">
            <input type="text" placeholder="请输入文字" @keyup.enter="sendMessage" v-model="txt" />
            <img src="../../../static/img/service/send.png" alt="发送" @click="sendMessage" />
        </div>
    </div>
</template>

<script>
import Head from "@/components/home-page/Header";
import Easemob from "@/utils/Easemob";
import { mapGetters } from 'vuex'
export default {
    components: {
        Head
    },
    data() {
        return {
            showTitle: {
                showBack: false,
                showLogo: 2, //显示头部title文字
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
                title: "客服1号"
            },
            im: new Easemob(),
            toId: "test3",
            txt: '',
        };
    },
    computed: {
        // 用户
        rosterList() {
            return this.GET_IM_CHART_ROSTERLIST || []
        },
        groupList() {
            return this.GET_IM_CHART_GROUPLIST || []
        },
        // 聊天数据
        charts() {
            console.log('調用获取聊天记录')
            return this.GET_IM_CHART_DIALOG_GROUP_MESSAGE(this.toId) || []
        },
        ...mapGetters({
            GET_IM_CHART_DIALOG_GROUP_MESSAGE: 'GET_IM_CHART_DIALOG_GROUP_MESSAGE',
        })
    },
    watch: {
        charts(val, oldVal) {
            console.log("获取完毕")
            console.log(val)
            this.scrollToBottom()
        }
    },
    created() {
        // 初始im 登录
        this.im.login('test1', '123456')
    },
    methods: {
        sendMessage() {
            var that = this;
            console.log('1')
            // 只做了单聊的会话 single  
            that.im.sendTextMessage(this.txt, this.toId, () => {
                this.txt = ''
            })
        },
        scrollToBottom() {
            console.log('a')
            this.$nextTick(_ => {
                this.$refs['chattingContent'].scrollTop = this.$refs['chattingContent'].scrollHeight
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.service-wrap {
    background: #f6f8fe;
    .service-detail {
        height: calc(100vh - 1.85rem);
        overflow-y: scroll;
        padding: 0.2rem;
        /* 聊天item采用flex布局*/
        // font-size: 0;
        .item {
            display: flex;
            margin-bottom: 0.2rem;
        }
        .message {
            max-width: 4.6rem;
            display: flex;
            min-height: 0.7rem;
            padding: 0.1rem 0.2rem;
            align-items: center;
            font-size: 0.26rem;
        }
        .angle {
            width: 0;
            height: 0;
            border-top: 0.1rem solid transparent;
            border-bottom: 0.1rem solid transparent;
            z-index: 1;
        }
        .left {
            flex-direction: row;
            .angle {
                margin: 0.3rem 0 0 0.2rem;
                border-right: 0.15rem solid #ffffff;
            }
            .message {
                color: #333333;
                background: #ffffff;
                box-shadow: 0px 0.03rem 0.07rem 0px rgba(199, 199, 199, 0.35);
            }
        }
        .right {
            flex-direction: row-reverse;
            .angle {
                margin: 0.3rem 0.2rem 0 0;
                border-left: 0.15rem solid #fd8159;
            }
            .message {
                color: #ffffff;
                background: #fd8159;
                box-shadow: 0px 0.03rem 0.07rem 0px rgba(253, 89, 129, 0.35);
            }
        }
        .header-img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
        }

        .chart-timer {
            text-align: center;
            color: #616161;
            font-size: 0.26rem;
            margin-bottom: 0.1rem;
        }
    }
    .input-box {
        max-width: 640px;
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        padding: 0.15rem 0.32rem 0.15rem 0.2rem;
        align-items: center;
        background: #ffffff;
        box-shadow: 0 0.03rem 0.07rem 0 rgba(221, 221, 221, 0.35);
        input {
            flex: 1;
            height: 0.64rem;
            border: 1px solid #e5e5e5;
            padding: 0.03rem 0.2rem;
            outline: none;
            margin: 0;
            font-size: 0.24rem;
        }
        img {
            width: 0.53rem;
            height: 0.49rem;
            margin-left: 0.15rem;
        }
    }
}
</style>