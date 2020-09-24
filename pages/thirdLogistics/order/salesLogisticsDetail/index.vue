<template>
	<view class="">
		<view class="grace-body">
			<view class="ot-home-qx mn">
				<text></text>
				<text>物流信息</text>
			</view>
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">运费(元/吨)</view>
					<input type="text" class="input" name="yunfei" placeholder="请输入运费" />
				</view>
				<view class="grace-items">
					<view class="grace-label">附加费(元/吨)</view>
					<input type="text" class="input" name="fujia" placeholder="请输入附加费" />
				</view>
				<view class="grace-items">
					<view class="grace-label">物流公司</view>
					<view class="other">
						<picker @change="bindCompanyChange" :value="companyIndex" :range="company" name="gongsi">
							<text>{{company[companyIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">选择车辆</view>
					<view class="other">
						<picker @change="bindCarChange" :value="carIndex" :range="car" name="car">
							<text>{{car[carIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">选择司机</view>
					<view class="other">
						<picker @change="bindDriverChange" :value="driverIndex" :range="driver" name="siji">
							<text>{{driver[driverIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">物流单号</view>
					<input type="text" class="input" name="fujia" placeholder="请输入物流单号" />
				</view>
				<view class="grace-items">
					<view class="grace-label">中石油/中石化单号</view>
					<input type="text" class="input" name="fujia" placeholder="请输入中石油/中石化单号" />
				</view>
				<view class="grace-items">
					<button type="warn" class="grace-button ot-buttons" @tap="handleClick" size="mini">发货</button>
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
							<image :src="img+'danju.png'" />
						</view>
						<view class="text">上传发货通知书</view>
					</view>
					<view class="grace-idcard-preview" v-if="display">
						<image :src="idCard1" @tap="previewImg1"></image>
					</view>
				</view>
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg2">
						<view class="img">
							<image :src="img+'fahuodan.png'" />
						</view>
						<view class="text">上传出库单据</view>
					</view>
					<view class="grace-idcard-preview" v-if="display1">
						<image :src="idCard2" @tap="previewImg2"></image>
					</view>
				</view>
			</view>
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传签收单</text>
			</view>
			<view class="ot-logis-fl">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg3">
						<view class="img">
							<image :src="img+'danju.png'" />
						</view>
						<view class="text">上传签收单</view>
					</view>
					<view class="grace-idcard-preview" v-if="display2">
						<image :src="idCard3" @tap="previewImg3"></image>
					</view>
				</view>
			</view>
			<view style="margin-top:50upx;">
				<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import common from "../../../../common/common.js"
	var _self;
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				companyIndex: 0,
				company: ['请选择', '恒辉物流', '其它物流'],
				carIndex: 0,
				car: ['请选择', ],
				driverIndex: 0,
				driver: ['请选择', ],
				idCard1: '',
				display: false,
				idCard2: '',
				display1: false,
				idCard3: '',
				display2: false,
			}
		},
		created() {
			_self=this
		},
		methods: {
			bindCompanyChange: function(e) {
				console.log(e);
				this.setData({
					companyIndex: e.detail.value
				});
			},
			bindCarChange: function(e) {
				console.log(e);
				this.setData({
					carIndex: e.detail.value
				});
			},
			bindDriverChange: function(e) {
				console.log(e);
				this.setData({
					driverIndex: e.detail.value
				});
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "yunfei",
						checkType: "int",
						checkRule: "1,5",
						errorMsg: 运费不能为空
					},
					{
						name: "fujia",
						checkType: "int",
						checkRule: "1,5",
						errorMsg: "附加费不能为空"
					},
					{
						name: "gongsi",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择物流公司"
					},
					{
						name: "car",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择车辆"
					},
					{
						name: "siji",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择司机"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			handleClick() {

			},
			selectImg1: function() {
				this.display = true
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard1 = res.tempFilePaths[0]
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
			selectImg2: function() {
				this.display1 = true
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard2 = res.tempFilePaths[0]
					}
				})
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				var uploadTask2 = uni.uploadFile({
					url: '',
					filePath: _self.idCard2,
					fileType: 'image',
					name: 'data',
					success: function(uploadFileRes) {
						// 上传成功后返回服务器端保存的路径
						console.log(uploadFileRes.data);
						uni.hideLoading();
					}
				});
			},
			selectImg3: function() {
				this.display2 = true
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard3 = res.tempFilePaths[0]
					}
				})
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				var uploadTask3 = uni.uploadFile({
					url: '',
					filePath: _self.idCard3,
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
				uni.previewImage({
					urls: [_self.idCard1]
				});
			},
			previewImg2: function() {
				uni.previewImage({
					urls: [_self.idCard2]
				});
			},
			previewImg3: function() {
				uni.previewImage({
					urls: [_self.idCard3]
				});
			},
			handleChange() {
				uni.navigateTo({
					url: '../salesLogistics/index',
				})
			},
		}
	}
</script>

<style>
	.grace-body {
		box-sizing: border-box;
		padding: 0upx 30upx;
		border-top: 2upx solid #e0e0e0;
	}

	.ot-buttons {
		margin: 10upx 0px;
		height: 50upx;
		line-height: 50upx;
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
		height: 170upx;
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

	.grace-form .grace-items .grace-label {
		width: 180upx;
	}
	.grace-form .grace-items{
		border:none;
	}
</style>
