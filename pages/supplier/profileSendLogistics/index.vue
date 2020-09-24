<template>
	<view class="grace-body">
		<view class="ot-home-qx mn">
			<text></text>
			<text>基本信息</text>
		</view>
		<form bindsubmit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">运费</view>
				<input type="text" class="input" name="yunfei" />
			</view>
			<view class="grace-items">
				<view class="grace-label">附加费</view>
				<input type="text" class="input" name="fujia" />
			</view>
			<view class="grace-items">
				<view class="grace-label">选择物流</view>
				<view class="other">
					<picker @change="bindDriverChange" :value="driverIndex" :range="driver" name="siji">
						<text>{{driver[driverIndex]}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<button type="warn" class="grace-button ot-buttons" @tap="handleClick" size="mini">指定物流</button>
			</view>
		</form>
		<view class="ot-home-qx mn">
			<text></text>
			<text>上传单据</text>
		</view>
		<view class="ot-logis-fl">

			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg1">
					<view class="img">
						<image :src="img+'fahuodan.png'" />
					</view>
					<view class="text">上传出库单据</view>
				</view>
				<view class="grace-idcard-preview" v-if="display">
					<image :src="idCard1" @tap="previewImg1"></image>
				</view>
			</view>
		</view>
		<view style="margin-top:50upx;">
			<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">提交</button>
		</view>
	</view>
</template>

<script>
	import common from '../../../common/common.js'
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				carIndex: 0,
				car: ['请选择', ],
				driverIndex: 0,
				driver: ['请选择', ],
				idCard1: '',
				display: false,
			}
		},
		methods: {
			bindCarChange: function(e) {
				console.log(e);
				this.carIndex= e.detail.value
			},
			bindDriverChange: function(e) {
				console.log(e);
				this.driverIndex= e.detail.value
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				console.log(JSON.stringify(e.detail.value));
			},
			handleClick() {

			},
			selectImg1: function() {
				var _self=this
				this.display= true
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard1= res.tempFilePaths[0]
					}
				})
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				var uploadTask1 = wx.uploadFile({
					url: '',
					filePath: _self.idCard1,
					fileType: 'image',
					name: 'data',
					success: function(uploadFileRes) {
						// 上传成功后返回服务器端保存的路径
						console.log(uploadFileRes.data);
						uni.hideLoading();
					}
				});
			},

			previewImg1: function() {
				var _self=this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0 
				});
			},
		}
	}
</script>

<style>
	.grace-body {
		box-sizing: border-box;
		padding: 0upx 30upx;
		border-top: 2upx solid #e0e0e0;
		width: 100%;
	}

	button {
		background-color: #ff5722 !important;
	}

	.ot-buttons {
		margin: 10upx 0px;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 30upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 15upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30upx;
	}

	.grace-idcard-items {
		background: #fff;
		padding: 30upx 0;
		box-sizing: border-box;
		width: 45%;
		display: flex;
		border-radius: 10upx;
		align-items: flex-start;
	}

	.grace-idcard-uper-btn {
		width: 100%;
		background: #fff;
		box-shadow: 2upx 2upx 12upx #ccc;
		padding-bottom: 10upx;
		border-radius: 10upx;
		text-align: center;
		position: relative;
		border: 2upx dashed #f1f1f1;
		float: left;
	}

	.grace-idcard-uper-btn .img {
		width: 74upx;
		height: 74upx;
		margin: 0 auto;
		margin-top: 25upx;
	}

	.grace-idcard-uper-btn .img image {
		width: 74upx;
		height: 74upx;
	}

	.grace-idcard-uper-btn .text {
		width: 100%;
		margin-top: 3upx;
		text-align: center;
		line-height: 2em;
		color: #999;
		float: left;
	}

	.grace-idcard-preview {
		width: 42%;
		position: absolute;
		height: 164upx;
		border-radius: 10upx;
	}

	.grace-idcard-preview image {
		width: 100%;
		height: 100%
	}

	button {
		background-color: #ff5722 !important;
	}

	.button-hover[type=primary] {
		background-color: #ff5722;
	}

	.grace-idcard-uper-btn1 {
		width: 100%;
		height: 392upx;
		border-radius: 10upx;
		text-align: center;
		position: relative;
		border: 2upx dashed #f1f1f1;
		float: left;

	}



	.grace-idcard-uper-btn1 image {
		width: 100%;
		height: 100%;
	}

	.ot-center {
		text-align: center;
		color: #666;
		margin: 10upx 0px;
	}

	.ot-certi-fa {
		color: #666;
		margin-bottom: 20upx;
		display: flex;
		font-size: 26upx;
	}

	.grace-idcard-preview1 {
		width: 668upx;
		position: absolute;
		height: 396upx;
		top: 96upx;
		left: 42upx;
	}

	.grace-idcard-preview1 image {
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}

	.hq {
		top: 564upx;
	}

	.ot-certi-fa image {
		margin-right: 10upx;
	}

	.ot-logis-fl {
		display: flex;
		justify-content: space-between;
	}

	.grace-border-radius {
		border-radius: 10upx;
	}

	.grace-form .grace-items .input {
		padding: 0px;
	}
	
	.grace-form .grace-items{
		border:none !important;
	}
</style>
