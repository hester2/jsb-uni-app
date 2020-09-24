<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">司机:</view>
					<input type="text" class="input" name="d.name" value="" />
				</view>
				<view class="grace-items">
					<view class="grace-label">身份证号:</view>
					<input type="text" class="input" name="d.card_no" value="" />
				</view>
				<view class="grace-items ">
					<view class="grace-label ">联系电话:</view>
					<input type="text " class="input " name="d.tel" value="" />
				</view>
				<view class="ot-f">
					<view class="ot-flex">
						<view class="grace-items">
							<input type='text' name="d.card_front" :value="card_front" v-show="false">
							
							<button type="primary" class="grace-button" size="mini" @tap="selectImg1">上传身份证</button>
						</view>
						<view class="grace-idcard-preview">
							<image :src="idCard1" @tap="previewImg1"></image>
						</view>
					</view>
					<input type='text' name="d.license" :value="license" v-show="false">
					
					<view class="ot-flex">
						<view class="grace-items">
							<button type="primary" class="grace-button" size="mini" @tap="selectImg2">上传驾驶证</button>
						</view>
						<view class="grace-idcard-preview">
							<image :src="idCard2" @tap="previewImg2"></image>
						</view>
					</view>
					<input type='text' name="d.qualifications" :value="qualifications" v-show="false">
					
					<view class="ot-flex">
						<view class="grace-items">
							<button type="primary" class="grace-button" size="mini" @tap="selectImg3">上传从业资格证</button>
						</view>
						<view class="grace-idcard-preview">
							<image :src="idCard3" @tap="previewImg3"></image>
						</view>
					</view>
				</view>
				<view style="padding:22rpx 0;">
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
				card_front:'',
				license:'',
				qualifications:''
			}
		},
		created() {
			_self = this
		},
		methods: {
			selectImg1() {
				uni.chooseImage({
					count: 1,
					success(res) {
						_self.idCard1 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl+"/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData:{
								type:8
							},
							success: function(uploadFileRes) {	
								_self.card_front = uploadFileRes.data
								uni.hideLoading()
							}
						});
					}
				})
			},
			selectImg2() {
				uni.chooseImage({
					count: 1,
					success(res) {
						_self.idCard2 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl+"/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData:{
								type:8
							},
							success: function(uploadFileRes) {	
								_self.license = uploadFileRes.data
								uni.hideLoading()
							}
						});
					}
				})
			},
			selectImg3() {
				uni.chooseImage({
					count: 1,
					success(res) {
						_self.idCard3 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl+"/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData:{
								type:8
							},
							success: function(uploadFileRes) {	
								_self.qualifications = uploadFileRes.data
								uni.hideLoading()
							}
						});
					}
				})
			},
			previewImg1() {
				uni.previewImage({
					urls: _self.idCard1,
					current: 0
				})
			},
			previewImg2() {
				uni.previewImage({
					urls: _self.idCard2,
					current: 0
				})
			},
			previewImg3() {
				uni.previewImage({
					urls: _self.idCard3,
					current: 0
				})
			},
			formSubmit(e) {
				var rule = [
				];
				var formData = e.detail.value
				formData.phone=uni.getStorageSync("phoneno")
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
			uni.request({
				url:this.$webUrl+"/logistics/addDriver",
				data:formData,
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					if(res.data){
						uni.showToast({
							title:'添加成功'
						})
					}
				}
			})
					this.$router.go(-1)
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
</style>
