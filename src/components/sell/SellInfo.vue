<template>
    <!-- 填写出售信息页 -->
    <div class="sellInfo-wrap">
        <Header v-bind:showTitle="comData.showTitle"></Header>
        <div class="sellInfo-content">
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>商品资料</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-lefttext">商品标题</span>
                        <input type="number" placeholder="请输入商品标题">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">角色等级</span>
                        <input type="number" placeholder="请输入角色等级">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">职业</span>
                        <div class="right-opt" >
                            <span>未选择</span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">角色性别</span>
                        <div class="right-opt" >
                            <span>未选择</span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-des">商品描述</span>
                        <textarea name="des" id="arbdes" cols="25" rows="3" placeholder="请对商品进行描述"></textarea>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>商品标题</span><span class="red-color">（打上标签，买家更容易搜到哦）</span>
                        </div>
                        <div class="sell-strip-content">
                            <div class="seleTag" v-for="item in sellData.seleTag" v-text="item"></div>
                            <div class="addTag">＋添加</div>
                        </div>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>上传图片</span><span class="red-color">（单张图片不能超过10M,最多可上传10张图片）</span>
                        </div>
                        <div class="upimg-content">
                            <div class="img-cell"  v-for="(item,index) in sellData.upimgAll.imgSrc">
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
                    <div class="sell-strip">
                        <span class="sell-video">视频看号外链</span>
                        <input type="text" placeholder="复制视频外链通用代码，推荐使用优酷">
                    </div>
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>账号信息</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-lefttext">账号类型</span>
                        <div class="right-opt" >
                            <span>未选择</span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">账号绑定</span>
                        <div class="strip-radio-right">
                            <div class="screen-sort" v-for="item in sellData.seleSafe.safe" @click="seleSafe(item.name)">
                                <img class="screen-sort-check" :src="item.ischeck?sellData.seleSafe.imgSrc.Ok:sellData.seleSafe.imgSrc.No" alt="">
                                <span v-text="item.name"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 价格设定 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>价格设定</span>
                </div>
                <div class="sell-cell-content">
                     <div class="sell-strip">
                        <span class="sell-lefttext">是否可议价</span>
                        <div class="strip-radio-right">
                            <div class="opera" @click="seleOpera('stage')">
                                <img :src="sellData.optStage.stage?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>一口价</span>
                            </div>
                            <div class="opera" @click="seleOpera('nostage')">
                                <img :src="sellData.optStage.nostage?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>可议价</span>
                            </div>
                        </div>
                    </div>
                     <div class="sell-strip">
                        <span class="sell-lefttext">商品最高价</span>
                        <input type="number" placeholder="填写商品最高的出价">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">商品最低价</span>
                        <input type="number" placeholder="填写可以接受最低的议价价格">
                    </div>
                    <div class="sell-strip">
                        <div class="sell-left">
                            <div>是否为买家购买保险</div>
                            <div>(保险费用为总价的10%)</div>
                        </div>
                        <div class="strip-radio-right">
                            <div class="opera" @click="seleOpera('safe')">
                                <img :src="sellData.optSafe.safe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>是</span>
                            </div>
                            <div class="opera" @click="seleOpera('nosafe')">
                                <img :src="sellData.optSafe.nosafe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                                <span>否</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>帐号安全验证</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-video">游戏帐号</span>
                        <input type="number" placeholder="请输入游戏帐号">
                    </div>
                    <div class="sell-strip">
                        <span class="sell-video">游戏密码</span>
                        <input type="text" placeholder="请输入游戏密码">
                    </div>
                     <div class="sell-strip">
                        <span class="sell-video">联系人手机号</span>
                        <input type="number" placeholder="请输入手机号，客服将会与您联系">
                    </div>
                     <div class="sell-strip">
                        <span class="sell-video">微信账号(选填)</span>
                        <input type="text" placeholder="电话无法联系时，可以通过微信联系您">
                    </div>
                </div>
            </div>
        </div>
        <div class="nextBtn">下一步</div>
    </div>
    
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'SellInfo',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    showTitle:{
                        showBack:false,
                        showLogo:2,//显示头部log
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                        title:"我要卖",
                    }
                },
                sellData:{
                    seleTag:['hh','dddd'],
                    upimgAll:{
                        imgSrc:[],
                        imgData:{
                            accept:'image/gif, image/jpeg, image/png, image/jpg',
                        },
                    },
                    // 是否购买保险
                    optSafe:{
                        safe:true,
                        nosafe:false
                    },
                    // 是否分期
                    optStage:{
                        stage:true,
                        nostage:false,
                    },
                    // 账号绑定
                    seleSafe:{
                        imgSrc:{
                            Ok:'./static/img/goodscreen/okcheck.png',
                            No:'./static/img/goodscreen/nocheck.png'
                        },
                        safe:[{
                            name:'身份证',
                            ischeck:false,
                        },{
                            name:'手机号',
                            ischeck:false,
                        },{
                            name:'邮箱',
                            ischeck:false,
                        },{
                            name:'无绑定',
                            ischeck:false
                        }]
                    },
                }
            }
        },
        methods:{
            // 添加图片
            addImg(event){
                console.log(event)
                var that = this;
                var imgSrcArr =  that.sellData.upimgAll.imgSrc;
                var arr = [];
                let imgArr=event.target.files;  
                for(var i = 0;i<imgArr.length;i++){
                    let type=imgArr[i].type;//文件的类型，判断是否是图片  
                    let size=imgArr[i].size;//文件的大小，判断图片的大小
                    if(that.sellData.upimgAll.imgData.accept.indexOf(type) == -1){
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
                var imgList = this.sellData.upimgAll.imgSrc;
                imgList.splice(ind,1);
            },
            // 账号绑定
            seleSafe(flag){
                var safeArr = this.sellData.seleSafe.safe;
                
                console.log(flag)
                if(flag == '无绑定'){
                    for(var i in safeArr){
                        if(flag == safeArr[i].name){
                            safeArr[i].ischeck = true;
                            continue;
                        }
                        safeArr[i].ischeck = false;
                    }
                }else{
                    for(var i in safeArr){
                        if(flag == safeArr[i].name){
                            safeArr[i].ischeck = true;
                        }
                        if(safeArr[i].name == "无绑定"){
                            safeArr[i].ischeck = false;
                        }
                    }
                }
                
            },
            // 选择是否议价
            seleOpera(flag){
                // 保险
                if(flag == 'safe'){
                    this.sellData.optSafe.safe = true;
                    this.sellData.optSafe.nosafe = false;
                }else if(flag == 'nosafe'){
                    this.sellData.optSafe.safe = false;
                    this.sellData.optSafe.nosafe = true;
                }
                // 分期
                if(flag == 'nostage'){
                    this.sellData.optStage.stage = false;
                    this.sellData.optStage.nostage = true;
                }else if(flag == 'stage'){
                    this.sellData.optStage.stage = true;
                    this.sellData.optStage.nostage = false;
                }
            },
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
    .sellInfo-wrap{
        max-width:12rem;
        margin:0 auto;
    }
    .sellInfo-content{
        padding:.2rem;
    }
    .sellInfo-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    .sell-cell-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .sell-cell-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .sell-cell-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .sell-cell-content{
        padding-left:.2rem;
    }

    .sell-strip{
        font-size:.26rem;
        color:#666666;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .sell-lefttext{
        width:1.3rem;
        line-height: .9rem;
        display: inline-block;
    }
    .right-opt{
        width:3rem;
        text-align: right;
        float:right;
        font-size:.24rem;
        color:#999999;
    }
    .right-opt img{
        width:.13rem;
        height:.24rem;
        vertical-align: middle;
        margin-left:.2rem;
        margin-top:-0.03rem;
    }
    .right-opt span{
        vertical-align: middle;
        display: inline-block;
        line-height: .9rem;
    }
    .sell-des{
        vertical-align: top;
        width:1.3rem;
        margin:.25rem 0 0;
        display: inline-block;
    }
    #arbdes{
        border:none;
        width:5.3rem;
        padding:0;
        font-size:.24rem;
        margin:.25rem 0 0;
        vertical-align: middle;
    }
    .sell-strip-title{
        margin-top:.2rem;
    }
    .sell-strip-content{
        padding:.15rem 0;
    }
    .red-color{
        color:#FF5E5E;
    }
    .sell-strip-content div{
        line-height: .6rem;
        padding:0 .17rem;
        display:inline-block;
        border-radius: .06rem;
        -webkit-border-radius: .06rem;
        -moz-border-radius: .06rem;
        margin-right:.35rem;
    }
    .addTag{
        border:.01rem solid #D2D2D2;
        color:#999999;
    }
    .seleTag{
        border:.01rem solid #FF855D;
        color:#FE7649;
        background:#FFDBCF;
    }

    /* 上传图片 */
    .upimg-content{
        padding:.2rem 0 0;
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
        padding:0;
        overflow: hidden;
    }
    .upimg-cell img{
        width:1.5rem;
        height:1.5rem;
    }
    #upImg{
        width:1.5rem;
        height:1.5rem;
        display: inline-block;
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        z-index:3;
        opacity: 0;
    }
    .sell-video{
        display: inline-block;
        line-height: .9rem;
        margin-right:.1rem;
    }
    /* 账号信息  账号绑定*/
    .screen-sort{
        font-size:.26rem;
        color:#333333;
        display:inline-block;
        margin-right:.2rem;
    }
    .screen-sort span{
        vertical-align: middle;
    }
    .screen-sort-check{
        width:.28rem;
        height:.28rem;
        margin-right:.03rem;
        vertical-align: middle;
    }
    /* 购买保险 */
    .sell-left{
        padding:.2rem 0;
        display: inline-block;
        vertical-align: middle;
    }



    /* 价格设定 是否可议价 */
    /* 选项 */
    .strip-radio-right{
        display: inline-block;
    }
    .opera{
        display: inline-block;
        margin-left:.7rem;
    }
    .opera img{
        width:.22rem;
        height:.22rem;
        vertical-align: middle;
    }
    .opera span{
        font-size:.26rem;
        color:#333333;
        vertical-align: middle;
    }



    /* 下一步 */
    .nextBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:0 auto .3rem;
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









    /* ==========input========= */
    input{
        margin:0;
        padding:.1rem;
        font-size:.26rem;
        border:none;
        width:4.7rem;
        height:.6rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.26rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.26rem;
    }
</style>
