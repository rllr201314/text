<template>
    <!-- 热门游戏 -->
    <div class="hot-game-wrap">
        <div class="hot-game-title">
            <div class="title-txt">热门游戏</div>
        </div>
        <div class="hot-game-content">
            <div class="hot-game-cell" v-for="item in hot_game" @click="goSellOption(item.category_id)">
                <img :src="item.game_logo" alt="">
                <div v-text="item.game_name"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HotGame",
    props:['hot_game'],
    data() {
        return {
            hotGame: []
        };
    },
    methods: {
        goSellOption(opt) {
            var that = this;
            sessionStorage.buyOrsell == 1
            //买
            that.$router.push({ name: "GoodScreen",query:{opt}});
            sessionStorage.opt = opt;
        },
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"category")
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.hotGame = res.data.data.is_hot;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        // this.getData();
    }
};
</script>

<style scoped>
.hot-game-wrap {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.3rem;
}
.hot-game-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.title-txt {
    background-image: url("../../../static/img/board_mark_big.png");
    background-repeat: no-repeat;
    background-size: 1.49rem 0.21rem;
    background-position: 50%;
    text-align: center;
    width: 1.49rem;
    color: #fc604e;
    font-size: 0.26rem;
    margin: 0 auto;
}
.hot-game-content {
    display: flex;
    justify-content: space-around;
    height: 1.98rem;
}
.hot-game-cell {
    font-size: 0.24rem;
    color: #666666;
    text-align: center;
    margin: auto 0;
}
.hot-game-cell img {
    width: 1.05rem;
    height: 1.06rem;
    border-radius: .1rem;
}
</style>