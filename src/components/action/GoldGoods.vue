<template>
  <div class="active-wrap">
    <Header v-bind:show-title="showTitle"></Header>
    <img class="gold-top" src="../../../static/img/home-page/gold_top.png">
    <div class="page-center">
      <div class="page-center-content">
        <div class="layout-title">
          <div class="item-width-left">
            服务器
          </div>
          <div class="item-width-center">
            价格
          </div>
          <div class="item-width-right">
            绑定状态
          </div>
        </div>
        <div>
          <div class="layout-title" v-for="gold in golds">
            <div class="item-width-value-left">
              {{gold.server}}
            </div>
            <div class="item-width-value-center">
              {{gold.price}}
            </div>
            <div class="item-width-value-right">
              {{gold.bind}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../home-page/Header";

  export default {
    name: "GoldGoods",
    components: {Header},
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
        that.$axios.post(process.env.API_HOST + "gold_list")
          .then(res => {
            // console.log(res);
            if (res.data.status == 200) {
              // if (res.data.code == 200) {
                that.golds = res.data.data;
              // }
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
    }
  }
</script>

<style scoped>
  .active-wrap {
    max-width: 12rem;
    margin: 0 auto;
    padding-top: .88rem;
  }

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
    width: 50%;
    text-align: left;
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
    width: 50%;
    text-align: left;
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
