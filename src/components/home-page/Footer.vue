<template>
    <div class="footer">
        <div>看个号7*24小时为您提供安全快捷的服务</div>
        <div>浙网文（2018）9053-741号</div>
        <div>陕ICP备19006831号-1</div>
        <div><img src="../../../static/img/footer/beian.png" alt=""><span>晋公网安备14072902000115号</span></div>
        <div>增值电信业务经营许可证：浙B2-20180197</div>
        <div>西安看个号网络科技有限公司@2018-2028</div>
        <div>kangehao.com版权所有</div>
        <div class="footer-link">
          <a href="http://www.epicc.com.cn/?cmpid=2seb2pzBT00002" target="_blank">
            <img src="../../../static/img/footer/ic_link_picc.png" alt="中国人民保险"/>
          </a>
          <a href="https://www.yunhetong.com/" target="_blank">
            <img src="../../../static/img/footer/ic_link_yht.png" alt="云合同"/>
          </a>
          <a id="_pingansec_bottomimagesmall_shiming"
             href="http://si.trustutn.org/info?sn=592181121037343847839&certType=1" target="_blank">
            <img src="http://v.trustutn.org/images/cert/bottom_small_img.png" alt="认证联盟"/>
          </a>
        </div>
        <div class="footer-link">
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=14072902000115" target="_blank">
            <img src="../../../static/img/footer/ic_link_wjb.png" alt="网警备案"/>
          </a>
          <a href="http://webscan.360.cn/index/checkwebsite?url=www.kangehao.com" target="_blank">
            <img src="../../../static/img/footer/ic_link_360.png" alt="360可信网站"/>
          </a>
          <a href="http://www.zjwhsc.com/zjwh/QR_Place_Info.aspx?Place_Guid=be5fce830e1b4e7e9e77253f9ac545af" target="_blank">
            <img src="../../../static/img/footer/ic_link_www.png" alt="文网文"/>
          </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style >
    .footer{
        padding:0.25rem 0 0.05rem;
        background: #535353;
        text-align: center;
    }
    .footer div{
        color:#CCCCCC;
        font-size: 0.22rem;
        margin-bottom: 0.2rem ;
        line-height: 0.25rem;
    }
    .footer img{
        width:.3rem;
        height:.3rem;
        vertical-align: middle;
        margin-right:.1rem;
    }
    .footer span{
        vertical-align: middle;
    }

    .footer-link{
      width: 100%;
    }
    .footer-link a{
      width: 30%;
    }

    .footer-link img{
      width: 20%;
      height: 0.5rem;
    }
</style>
