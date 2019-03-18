<template>
  <div class="wrap">
    <Header v-bind:show-title="showTitle"></Header>
    <img class="gold-top" src="../../../static/img/home-page/gold_top.png">
    <div class="page-center">
      <div class="page-center-content">
        <div class="layout-title title">
          <div class="server">服务器</div>
          <div class="gold">金币数</div>
          <div class="bind">绑定状态</div>
          <div class="price">价格</div>
        </div>
        <div>
          <div class="layout-title content" v-for="gold in golds">
            <div class="server" v-text="gold.server"></div>
            <div class="gold" v-text="gold.gold_num"></div>
            <div class="bind" v-text="gold.bind"></div>
            <div class="price">￥<span v-text="gold.price"></span></div>
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
    },
    metaInfo:{
      title:'金币物资号_梦幻西游_看个号',
      meta:[{
        name:'keywords',
        content:'梦幻西游,金币号,物资号'
      }]
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
  .title{
    /* text-align: left; */
    color: #3E96B5;
    font-size: 15px;
  }
  .server{
    width:25%;
  }
  .gold{
    width:30%;
  }
  .bind{
    padding-left:1%;
    width:20%;
  }
  .price{
    padding-left:5%;
    width:25%;
  }
  .content{
    font-size: 12px;
    padding-top: 10px;
  }
</style>
