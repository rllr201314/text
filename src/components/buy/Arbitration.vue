<template>
    <!-- 申请仲裁 -->
    <div class="arbitration-wrap">
        <Header v-bind:showTitle="componentsData.showTitle"></Header>
        <div class="arbitration-content">
            <div class="arbitration-cell">
                <div class="arbitration-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>订单详情</span>
                </div>
                <div class="arbitration-info-content">
                    <div class="info-content-top">
                        <div class="bar">
                            <div class="text-left">订单编号</div>
                            <div class="text-left">商品名称</div>
                            <div class="text-left">所属游戏</div>
                            <div class="text-left">账号类型</div> 
                            <div class="text-left">客户端</div>
                            <div class="text-left">服务器</div>
                            <div class="text-left">价格</div>
                        </div>
                        <div class="matter">
                            <div class="text-right" v-text="arbData.orderInfo.orderNumber"></div>
                            <div class="text-right" v-text="arbData.orderInfo.goodsName"></div>
                            <div class="text-right" v-text="arbData.orderInfo.goodsType"></div>
                            <div class="text-right" v-text="arbData.orderInfo.accountType"></div>
                            <div class="text-right" v-text="arbData.orderInfo.client"></div>
                            <div class="text-right" v-text="arbData.orderInfo.server"></div>
                            <div class="text-right red-color" v-text="arbData.orderInfo.price"></div>
                        </div>
                    </div>
                    <div class="info-content-bottom" v-text="arbData.arbCause"></div>
                </div>
            </div>

            <div class="arbitration-cell">
                <div class="arbitration-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请提交仲裁信息</span>
                </div>
                <div class="arbitration-info-content">
                    <div class="arbitration-strip">
                        <span class="arbbar">手机号</span>
                        <input type="number" placeholder="请填写您的绑定手机号">
                        <span class="arbbar-right orange">前往认证</span>
                    </div>
                    <div class="arbitration-strip">
                        <span class="arbbar">仲裁事件</span>
                        <div class="arbbar-right">
                            <span>请选择事由</span>
                            <img class="nextBtn" src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="arb-strip">
                        <span class="arbbar">情况描述</span>
                        <textarea name="des" id="arbdes" cols="25" rows="2" placeholder="请对当前情况进行说明，方便客服处理"></textarea>
                    </div>
                    <div class="arb-strip addImgBox">
                        <div class="uptitle">
                            <span class="titleText">上传截图</span>
                            <span class="red-color">（单张图片不能超过10M，最多可上传5张图片）</span>
                        </div>
                        <div class="upbottom">
                            <div class="img-cell"  v-for="(item,index) in arbData.upimgAll.imgSrc">
                                <img :src="item.base64" alt="">
                                <div class="delImg" @click="delImg(index)">
                                    <img src="../../../static/img/order/delete_img.png" alt="">
                                </div>
                            </div>
                            <div class="upimg-cell">
                                <img src="../../../static/img/order/add_img.png" alt="">
                                <input type="file" id="upImg" accept="image/*" multiple capture @change="addImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="okBtn">提交申请</div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'//头部
    export default {
        name:'Arbitration',
        components:{
            Header,
        },
        data(){
            return {
                componentsData:{
                    showTitle:{
                        showBack:false,//显示后退按钮
                        showLogo:2,//不显示头部log
                        showShare:3,//1搜索2分享
                        showBg:true,//是否显示背景
                        title:"申请仲裁",
                    }
                },
                arbData:{
                    arbCause:'（分期未还清）',
                    orderInfo:{
                        orderNumber:'1124345344',
                        goodsName:'大话西游88888',
                        goodsType:'大话西游',
                        accountType:'安卓',
                        client:'安卓端',
                        server:'田间汪汪汪',
                        price:'￥123.00'
                    },
                    upimgAll:{
                        imgSrc:[],
                        imgData:{
                            accept:'image/gif, image/jpeg, image/png, image/jpg',
                        },
                    }
                }
            }
        },
        methods:{
            addImg(event){
                console.log(event)
                var that = this;
                var imgSrcArr =  that.arbData.upimgAll.imgSrc;
                var arr = [];
                let imgArr=event.target.files;  
                for(var i = 0;i<imgArr.length;i++){
                    let type=imgArr[i].type;//文件的类型，判断是否是图片  
                    let size=imgArr[i].size;//文件的大小，判断图片的大小
                    if(that.arbData.upimgAll.imgData.accept.indexOf(type) == -1){
                        mui.alert('请选择我们支持的图片格式！','提示','确认',null,'div')
                        return false;  
                    }  
                    if(size>3145728){
                        mui.alert('请选择3M以内的图片！','提示','确认',null,'div')
                        return false;  
                    }

                    var reader = new FileReader();
                    reader.readAsDataURL(imgArr[i]);

                    var fileName = imgArr[i].name;
	                reader.onload = function(e){
		            	var imgMsg = {
		            		name : fileName,//获取文件名
		            		base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
		                }
                        imgSrcArr.push(imgMsg);
                        
                    }
                }   
            },
            delImg(ind){
                var imgList = this.arbData.upimgAll.imgSrc;
                imgList.splice(ind,1);
            }
        },
        mounted(){
            if (getIos()) {
                $('#upImg').removeAttr("capture");
            }
            function getIos() {
                var ua=navigator.userAgent.toLowerCase();
                if (ua.match(/iPhone\sOS/i) == "iphone os") {
                    return true;
                }else {
                    return false;
                }
            }
        }
    }
</script>
<style scoped>
    .arbitration-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .arbitration-content{
        padding:.2rem;
    }
    
    .arbitration-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    
    .arbitration-info-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    
    .arbitration-info-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .arbitration-info-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }

    .arbitration-info-content{
        padding:0 0 0 .2rem;
        font-size:.24rem;
        color:#666666;
    }
    .info-content-top{
        padding:.3rem 0 .2rem;
    }
    .info-content-bottom{
        line-height: .7rem;
        text-align:center;
        border-top:.01rem solid #E5E5E5;
    }

    .bar,.matter{
        display: inline-block;
        vertical-align: top;
    }
    .bar{
        width:1.3rem;
        color:#999999;
    }
    .matter{
        width:calc(100% - 1.5rem);
    }
    .red-color{
        color:#FF5E5E;
    }
    .arbitration-strip{
        line-height:.9rem;
        padding-right:.2rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .arbitration-strip span{
        display:inline-block;
    }
    .arbbar{
        display: inline-block;
        width:1.3rem;
        vertical-align: top;
    }
    .arbitration-strip input{
        width:2.4rem;
        border:none;
        padding:.1rem 0;
        margin:0;
    }
    .nextBtn{
        width:.11rem;
        height:.23rem;
        vertical-align: middle;
    }
    .arbbar-right{
        float:right;
    }
    .arbbar-right span{
        color:#999999;
        vertical-align: middle;
        margin-right:.2rem;
    }
    .arb-strip{
        padding:.3rem 0;
    }
    #arbdes{
        border:none;
        width:5.3rem;
        padding:0;
        font-size:.24rem;
        margin:0;
    }
    .addImgBox{
        padding:.01rem;
        border-top:.01rem solid #E5E5E5;
    }
    .upbottom{
        margin-top:.2rem;
    }
    .img-cell{
        width:1.5rem;
        height:1.5rem;
        position:relative;
        display: inline-block;
        margin: 0 .3rem .3rem 0;
    }
    .img-cell img{
        width:1.5rem;
        height:1.5rem;
    }
    .delImg{
        position:absolute;
        top:-0.1rem;
        right:-0.1rem;
        z-index:1;
    }
    .delImg img{
        width:.32rem;
        height:.32rem;
    }
    .upimg-cell{
        vertical-align: top;
        text-align:center;
        width:1.5rem;
        height:1.5rem;
        position:relative;
        display: inline-block;
        margin: 0 .3rem .3rem 0;
        overflow: hidden;
    }
    .upimg-cell img{
        width:1.5rem;
        height:1.5rem;
    }
    #upImg{
        width:1.5rem;
        height:1.5rem;
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        z-index:3;
        opacity: 0;
    }
    /* 提交申请 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.1rem auto .3rem;
        width:6.5rem;
        text-align: center;
        line-height: .8rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #FD915F;
        -moz-box-shadow: .06rem .05rem .09rem #FD915F;
        box-shadow: .06rem .05rem .09rem #FD915F;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }



    .orange{
        color:#FE7649 !important;
        text-decoration: underline;
    }
    /* ==========input========= */
    input{
        font-size:.24rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.24rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.24rem;
    }
</style>
