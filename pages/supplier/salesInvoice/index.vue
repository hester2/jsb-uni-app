<template>
	<view class="ot-Dtailes-host">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">开票公司</view>
					<input type="text" class="input" name="com" placeholder="请输入开票公司" />
				</view>
				<view class="grace-items">
					<view class="grace-label">税号</view>
					<input type="text" class="input" name="ein" placeholder="请输入纳税人识别号" />
				</view>
				<view class="grace-items">
					<view class="grace-label">联系方式</view>
					<input type="text" class="input" name="phoneno" placeholder="请输入手机号码" />
				</view>
				<view class="grace-items">
					<view class="grace-label">开户行</view>
					<input type="text" class="input" name="where" placeholder="请输入开户行" />
				</view>
				<view class="grace-items">
					<view class="grace-label">账号</view>
					<input type="text" class="input" name="account" placeholder="请输入账号" />
				</view>
				<view class="grace-items">
					<view class="grace-label">收件地址</view>
					<input type="text" class="input" name="address" placeholder="请输入收件地址" />
				</view>
				<view class="grace-items">
					<view class="grace-label">开票联系人</view>
					<input type="text" class="input" name="nickname" placeholder="请输入联系人" />
				</view>
				<view class="grace-items">
					<view class="grace-label">发票号</view>
					<input type="text" class="input" name="invoice" placeholder="请输入发票号" />
				</view>
				<view class="grace-items grace-noborder">
					<view class="clien other">
						<textarea placeholder="备注..." name="desc"></textarea>
					</view>
				</view>
				<view class="grace-items ot-submit-img">
					<view @tap="selectImg1">上传发票</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard1" @tap="previewImg1" mode="widthFix"></image>
				</view>
				<view style="padding:22upx 0;">
					<button formType="submit" type="primary" style="width:100%;">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				genderIndex: 0,
				gender: ['请选择', '男', '女'],
				dateValue: "请选择",
				idCard1: 'http://assets.jinsubao.cn/photos.png'
			}
		},
		methods: {
			selectImg1: function() {
				var _self = this
				wx.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard1=res.tempFilePaths[0]
					}
				})
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0 
				});
			},
			uploadCards: function(e) {
				var _self = this
				if (this.idCard1 == 'http://assets.jinsubao.cn/photos.png') {
					uni.showToast({
						title: "请选择照片",
						icon: "none"
					});
					return;
				}
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				console.log(this.idCard1)
				var uploadTask2 = uni.uploadFile({
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

			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "phoneno",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "请输入手机号码"
					},
					{
						name: "com",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入开票公司"
					},
					{
						name: "ein",
						checkType: "int",
						checkRule: "1,20",
						errorMsg: "请输入纳税人识别号"
					},
					{
						name: "where",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入开户行"
					},
					{
						name: "account",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入账号"
					},
					{
						name: "address",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入收件地址"
					},
					{
						name: "nickname",
						checkType: "string",
						checkRule: "1,3",
						errorMsg: "姓名应为1-3个字符"
					},
					{
						name: "invoice",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入发票号"
					},

				];
				//进行表单检查
				this.uploadCards()
				var formData = e.detail.value;
				console.log(e.detail.value)
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					uni.navigateTo({
						url: '../SalesOrder/SalesOrder',
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style>
	.grace-body{
		width: 100%;
		
	}
	.ot-Dtailes-host {
		margin: 35upx 20upx;
		background-color: #fff;
		padding: 0px 25upx;
		border-radius: 10upx;
		padding-bottom: 30upx;
	}

	.icon-dingdan:before {
		content: "\e608";
	}

	.hj.grace-list .items .icons {
		color: #5ca7e2;
		font-size: 36upx !important;
	}

	.hj .items {
		border-bottom: 1px solid #F8F8F8;
	}

	page {
		background-color: #eee;
	}

	.ot-Dtailes-host {
		margin: 20upx 20upx;
		background-color: #fff;
		padding: 0px 20upx;
		border-radius: 10upx;
	}
	
	.grace-form .grace-items{
		border:none;
	}

	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}

	.grace-form textarea {
		font-size: 30upx;
	}

	button {
		background-color: #fe5722 !important;
	}

	.ot-submit-img {
		display: flex;
		flex-direction: row;
		justify-content: flex-start !important;
	}

	.ot-submit-img view {
		margin-right: 30upx;
		line-height: 60upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
		color: #fff;
		background-color: #fe5722 !important;
	}

	.grace-idcard-preview image {
		width: 25%;
	}

	.grace-form .grace-items .grace-label {
		width: 140upx;
	}

	.grace-list .items .body {
		padding: 0px;
		border: none;
	}
</style>
