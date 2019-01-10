<template>
  <div class="wrap">
    <Header v-bind:show-title="showTitle"></Header>
    <img class="active-img" :src="imgUrl"/>
  </div>
</template>

<script>
  import Header from "../home-page/Header";

  export default {
    name: "SpecialArea",
    components: {Header},
    data() {
      return {
        showTitle: {
          showBack: false,
          showLogo: 2,
          showBg: true,
          title: "",
        },
        titles: [
          "游戏账号寄租",
          "藏宝阁分期",
          "APP充值",
        ],
        imgUrl: '',
        imgs: [
          "../../../static/img/home-page/renting.png",
          "../../../static/img/home-page/treasure_house.png",
          "../../../static/img/home-page/recharge.png",
        ],
      }
    },
    mounted() {
      var that = this;
      var type = that.$route.query.type;
      that.showTitle.title = that.titles[type];
      that.imgUrl = that.imgs[type];
    }
  }
</script>

<style scoped>
  .active-img {
    width: 100%;
    height: 100%;
  }
</style>
