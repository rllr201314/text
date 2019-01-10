<template>
  <div class="wrap">
    <Header v-bind:show-title="showTitle"></Header>
    <img class="gold-top" src="../../../static/img/home-page/gold_top.png">
    <div class="page-center">
      <div class="page-center-content">
        <div class="layout-title">
          <div class="item-width-left">
            服务器
          </div>
          <div class="item-width-right">
            金币数
          </div>
          <div class="item-width-right">
            绑定状态
          </div>
          <div class="item-width-center">
            价格
          </div>
        </div>
        <div>
          <div class="layout-title" v-for="gold in golds">
            <div class="item-width-value-left" v-text="gold.server"></div>
            <div class="item-width-value-right" v-text="gold.gold_num"></div>
            <div class="item-width-value-right" v-text="gold.bind"></div>
            <div class="item-width-value-center">￥<span v-text="gold.price"></span></div>
          </div>
        </div>
      </div>
    </div>
    <LinkServer></LinkServer>
  </div>
</template>

<script>
  import Header from "@/components/home-page/Header";
  import LinkServer from "@/components/common/LinkServer";

  export default {
    name: "GoldGoods",
    components: {Header, LinkServer},
    data() {
      return {
        showTitle: {
          showBack: false,
          showLogo: 2,
          showBg: true,
          title: "金币号专区",
        },
        golds: [],
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var that = this;
        that.$axios.post(process.env.API_HOST + "gold_info").then((res) => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.golds = res.data.data;
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

  .gold-top {
    width: 100%;
    height: auto;
    display: block;
  }

  .page-center {
    padding: 0.2rem;
    background-image: url(../../../static/img/home-page/gold_bottom.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: auto;
    min-height: 7.5rem;
  }

  .page-center-content {
    border: 1px dashed #999;
    padding: 0.1rem;
    border-radius: 0.1rem;
  }

  .layout-title {
    display: flex;
    flex-direction: row;
  }

  .item-width-left {
    width: 30%;
    text-align: left;
    color: #3E96B5;
    font-size: 15px;
  }

  .item-width-center {
    width: 30%;
    text-align: center;
    color: #3E96B5;
    font-size: 15px;
  }

  .item-width-right {
    width: 20%;
    text-align: left;
    color: #3E96B5;
    font-size: 15px;
  }

  .item-width-value-left {
    width: 30%;
    text-align: left;
    font-size: 12px;
    padding-top: 10px;
  }

  .item-width-value-center {
    width: 30%;
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
  }

  .item-width-value-right {
    width: 20%;
    text-align: left;
    font-size: 12px;
    padding-top: 10px;
  }
</style>
