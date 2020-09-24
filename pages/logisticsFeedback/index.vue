<template>
	<view class="conainer">
		<form @submit="formSubmit">
			<view class="ot-feedback-main">
				<textarea value="" maxlength="200" name="yijian" placeholder-style="color:#C0C0C0;line-height:40upx" v-model="textVal" placeholder="请简单描述您的问题和意见,若功能异常,上传页面,截图更快解决哦...." /> <text class="text">{{textVal.length}}/200</text> <view class="ot-feedback-on">
					<graceSelectImgAndUpload :maxFileNumber="9" :uploading="uploading" ref="selectimgandupload" 
								@uploaded="imgLoaded" @change="imgsChange" @uploaderror="uploaderror" :items="selectedimgs" 
								:canadd="canadd" uploadServerUrl="https://wqh.easy.echosite.cn/api/file/uploadFile"></graceSelectImgAndUpload>
			</view>
		</view>
		<view class="ot-feedback-atai">
			<text>请留下至少一种联系方式，方便我们联系哦~</text>
			<view class="ot-feedback-qd">
				<input type="number" value="" name='phone' placeholder="手机号" placeholder-class="placeholder"/>
				<input type="email" value="" name="email" placeholder="邮箱"  placeholder-class="placeholder"/>
			</view>
		</view>
		<view class="ot-button">
			<button type="primary" formType="submit" >立即反馈</button>
		</view>
		</form>
	</view>
</template>

<script>
	import graceSelectImgAndUpload from "../../graceUI/components/graceSelectImgAndUpload.vue";
	var _self;
	export default{
		components:{
			graceSelectImgAndUpload
			},
		data(){
			return{
				textVal:'',
				selectedimgs : [],
				uploading : false,
				canadd : true,
			}
		},
		created() {
			_self=this
		},
		methods:{
			imgsChange : function (imgs){
				_self.selectedimgs = imgs;
				console.log(imgs)
				},
				imgLoaded : function(res){
						console.log(res);
						console.log(_self.textVal);
						// 提交数据 图片信息保存在 res 内[ 数组形式 ]
						// 内容保存在 textVal
						//连接 api 提交即可
						//提交成功页面跳转
					},
					uploaderror : function(){
								uni.showToast({
									title:'上传失败'
								})
								_self.uploading = false;
								_self.canadd = true;
							},
					formSubmit(e){
						console.log(e)
						console.log(_self.selectedimgs)
						}
		}
	}
</script>

<style>
	page{
		background-color: #eee;
	}
	.conainer{
		box-sizing: border-box;
		padding: 30upx 20upx;
	}
	.ot-feedback-main{
		background-color: #fff;
		box-sizing: border-box;
		padding: 30upx 30upx;
		border-radius: 10upx;
		position: relative;
	}
	.ot-feedback-main textarea{
		width: 100%;
		font-size: 28upx;
		color: #3C3C3C;
		height:120upx;
	}
	.ot-feedback-main .text{
		position: absolute;
		top: 130upx;
		right: 20upx;
		color: #3C3C3C;
		font-size: 26upx;
	}
	.ot-feedback-on{
		width: 100%;
		margin-top: 40upx;
	}
	
	.ot-button{
		box-sizing: border-box;
		padding: 30upx 20upx;
	}
		
	.ot-button button{
		height: 74upx;
		line-height: 74upx;
		border-radius: 40upx;
		margin-top: 40upx;
		background-color: #ff5722 !important;
	}
			
	.ot-feedback-atai{
		box-sizing: border-box;
		padding: 30upx 0px;
	}
	.ot-feedback-atai text{
		color: #5B5B5B;
	}
	.ot-feedback-qd{
		display: flex;
		justify-content: space-between;
		margin-top: 30upx;
	}
	.ot-feedback-qd input{
		width: 45%;
		border: 2upx solid #e0e0e0;
		height: 60upx;
		line-height: 60upx;
		display: block;
		background-color: #fff;
		font-size: 26upx;
		box-sizing: border-box;
		padding-left: 60upx;
		
	}
	.ot-feedback-qd input:nth-of-type(1){
		background-image: url('http://assets.jinsubao.cn/icon-feed_1.png');
		background-repeat: no-repeat;
		background-size: 10%;
		background-position-x: 15upx;
		background-position-y: 13upx;
	}
	.ot-feedback-qd input:nth-of-type(2){
		background-image: url('http://assets.jinsubao.cn/icon-feed_2.png');
		background-repeat: no-repeat;
		background-size: 10%;
		background-position-x: 15upx;
		background-position-y: 18upx;
	}
	.placeholder{
		color: #C0C0C0 !important;
	}
</style>
