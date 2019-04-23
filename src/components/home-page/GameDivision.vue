<template>
    <!-- 专区模块 -->
    <div class="game-division">
      <!--金币号-->
        <div class="division-cell cell-mh" @click="goGold()">
            <img src="../../../static/img/chunk/jbh.png" alt="金币号专区">
        </div>
      <!--寄租-->
        <div class="division-cell cell-dh" @click="goRentOut()">
            <img src="../../../static/img/chunk/zh.png" alt="账号寄租专区">
        </div>
      <!--藏宝阁-->
        <div class="division-cell cell-clx" @click="goArea('1')">
            <img src="../../../static/img/chunk/cbg.png" alt="藏宝阁分期">
        </div>
      <!--充值-->
        <div class="division-cell expect-content" @click="goArea(2)">
            <img src="../../../static/img/chunk/recharge.png" alt="app充值专区">
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameDivision",
        methods:{
          goArea(flag) {
            var that = this;
            if(flag == 1){
              that.$router.push({name: 'CbgStage'});
            }else{
              that.$router.push({name: 'SpecialArea', params: {type: flag}});
            }
          },
          goGold() {
            var that = this;
            that.$router.push({name: 'GoldGoods'});
          },
          goRentOut(){
              var that = this;
              that.$router.push({name:'RentOutPage'})
          }
        }
    }
</script>

<style scoped>
    .game-division{
        text-align:center;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .division-cell{
        width:3.45rem;
        height:1.3rem;
        text-align:center;
        background:#FFFFFF;
        overflow: hidden;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6 ;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom: .2rem;
    }
    .division-cell img{
        width:100%;
        height:100%;
    }
</style>
