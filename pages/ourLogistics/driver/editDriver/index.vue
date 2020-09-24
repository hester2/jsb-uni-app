<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<input type="text" name="d.id" :value="driver.id" v-show="false">
					<view class="grace-label">司机:</view>
					<input type="text" class="input" name="d.name" :value="driver.name" />
				</view>
				<view class="grace-items ">
					<view class="grace-label">身份证号:</view>
					<input type="text " class="input " name="d.card_no" :value="driver.card_no" />
				</view>
				<view class="grace-items">
					<view class="grace-label">联系电话:</view>
					<input type="text" class="input" name="d.tel" :value="driver.tel" />
				</view>
				<view class="ot-f">
					<view class="ot-flex">
						<view class="grace-items ot-button">
							<button type="primary" class="grace-button" size="mini" @tap="selectImg1">上传身份证</button>
						</view>
						<input type='text' name="d.card_front" :value="card_front" v-show="false">
						<view class="grace-idcard-preview">
							<image :src="idCard1" @tap="previewImg1"></image>
						</view>
					</view>
					<view class="ot-flex">
						<input type='text' name="d.license" :value="license" v-show="false">
						<view class="grace-items ot-button">
							<button type="primary" class="grace-button" size="mini" @tap="selectImg2">上传驾驶证</button>
						</view>
						<view class="grace-idcard-preview">
							<image :src="idCard2" @tap="previewImg2"></image>
						</view>
					</view>
					<view class="ot-flex">
						<view class="grace-items ot-button">
							<input type='text' name="d.qualifications" :value="qualifications" v-show="false">
							<button type="primary" class="grace-button" size="mini" @tap="selectImg3">上传从业资格证</button>
						</view>
						<view class="grace-idcard-preview">
							<image :src="idCard3" @tap="previewImg3"></image>76
						</view>
					</view>
				</view>
				<view class="ot-btn">
					<button formType="submit" type="primary" class="grace-button">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				idCard1: 'http://assets.jinsubao.cn/photos.png',
				idCard2: 'http://assets.jinsubao.cn/photos.png',
				idCard3: 'http://assets.jinsubao.cn/photos.png',
				driver: {},
				card_front: '',
				license: '',
				qualifications: ''
			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			uni.request({
				url: this.$webUrl + "/logistics/findDriver",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var data = res.data
					if (data.card_front != null) {
						_self.idCard1 = _self.$webUrl + '/file/getUploadFile?fileName=' + data.card_front
						_self.card_front = data.card_front
					}
					if (data.license != null) {
						_self.idCard2 = _self.$webUrl + '/file/getUploadFile?fileName=' + data.license
						_self.license = data.license
					}
					if (data.qualifications != null) {
						_self.idCard3 = _self.$webUrl + '/file/getUploadFile?fileName=' + data.qualifications
						_self.qualifications = data.qualifications
					}
					for (var s in data) {
						if (data[s] == null) {
							data[s] = ""
						}
					}
					_self.driver = data
				}
			})
		},
		created() {
			_self = this
		},
		methods: {
			selectImg1: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: '上传中'
						})
						_self.idCard1 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 8
							},
							success: function(uploadFileRes) {
								_self.card_front = uploadFileRes.data
								console.log(uploadFileRes.data)
								uni.hideLoading()
							}
						});
					}
				})
			},
			selectImg2: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: '上传中'
						})
						_self.idCard2 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 8
							},
							success: function(uploadFileRes) {
								_self.license = uploadFileRes.data
								uni.hideLoading()
							}
						});
					}
				})
			},
			selectImg3: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: '上传中'
						})
						_self.idCard3 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 8
							},
							success: function(uploadFileRes) {
								_self.qualifications = uploadFileRes.data
								uni.hideLoading()
							}
						});
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
			previewImg2: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard2],
					current: 0
				});
			},
			previewImg3: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard3],
					current: 0
				});
			},
			formSubmit: function(e) {
				var rule = [{
					name: "d.tel",
					checkType: "phoneno",
					checkRule: "",
					errorMsg: "请输入联系电话"
				}];
				var formData = e.detail.value;
				if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formData['d.card_no']))) {
					uni.showToast({
						title: '身份证号码有误',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				var checkRes = graceChecker.check(formData, rule);
				console.log(formData)
				if (checkRes) {
					this.$router.go(-1)
					uni.request({
						url: this.$webUrl + "/logistics/updateDriver",
						data: formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if (res.data) {
								uni.showToast({
									title: '更新成功'
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
		}
	}
</script>

<style>
	.grace-idcard-preview image {
		width: 90%;
		height: 205rpx;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0px 25rpx;
	}

	.grace-margin-top {
		margin-top: 0px;
	}

	.grace-button {
		background-color: #FF5722 !important;
		margin: 0px;
		padding: 0px 20upx;
	}

	.ot-flex {
		width: 36%;
		margin-bottom: 10rpx;
	}

	.ot-f {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between
	}

	.ot-flex:nth-of-type(even) .grace-items {
		justify-content: flex-end;
	}

	.ot-flex:nth-of-type(even) .grace-idcard-preview {
		display: flex;
		justify-content: flex-end;
	}

	.grace-form .grace-items {
		border: none
	}

	.ot-button button {
		height: 52upx;
		line-height: 52upx;
	}
	.ot-btn button{
		line-height: 74upx;
		height: 74upx;
		box-sizing: border-box;
		padding: 0px 25upx;
	}
</style>
