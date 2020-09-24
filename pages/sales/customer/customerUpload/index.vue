<template>
	<view class="">
		<view class="grace-news-list ot-padding">
			<view class="ot-Dtailes-host">
				<form @submit="formSubmit2">
					<view class="ot-photo-left">
						<view class="grace-list hl">
							<view class="grace-space-between">
								<view class="demo6 ot-btn">
									<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg1">上传营业执照</button>
								</view>
							</view>
							<view class="grace-space-between">
								<view class="grace-idcard-preview">
									<view>
										<image v-if="business_license_file_id==''?true:false" src="img+'photos2.png'" mode=""></image>
										<image v-if="business_license_file_id==''?false:true" :src="$webUrl+'/file/getUploadFile?fileName='+business_license_file_id"
										 @tap="previewImg1"></image>
									</view>
								</view>
								<input type="text" hidden="true" name="c.id" v-bind:value="id">
								<input type="text" hidden="true" name="c.business_license_file_id" v-bind:value="business_license_file_id">
							</view>
						</view>
					</view>
					<view class="ot-sub-btn">
						<button formType="submit" type="primary">立即提交</button>
					</view>
				</form>
			</view>
			<view class="ot-Dtailes-host">
				<form @submit="formSubmit3">
					<view class="ot-photo-left">
						<view class="grace-list hl">
							<view class="grace-space-between">
								<view class="demo6 ot-btn">
									<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg2">身份证正面照</button>
								</view>
							</view>
							<view class="grace-space-between">
								<view class="grace-idcard-preview">
									<view>
										<image v-if="front_idcard_file_id==''?true:false" src="img+'photos2.png'" mode=""></image>
										<image v-if="front_idcard_file_id==''?false:true" :src="$webUrl+'/file/getUploadFile?fileName='+front_idcard_file_id"
										 @tap="previewImg2"></image>
									</view>
									<input type="text" hidden="true" name="c.id" v-bind:value="id">
									
									<input type="text" hidden="true" name="c.front_idcard_file_id" v-bind:value="front_idcard_file_id">
								</view>
							</view>
						</view>
						<view class="grace-list hl">
							<view class="grace-space-between">
								<view class="demo6 ot-btn">
									<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg3">身份证反面照</button>
								</view>
							</view>
							<view class="grace-space-between">
								<view class="grace-idcard-preview">
									<view>
										<image v-if="back_idcard_file_id==''?true:false" src="img+'photos2.png'" mode=""></image>
										<image v-if="back_idcard_file_id==''?false:true" :src="$webUrl+'/file/getUploadFile?fileName='+back_idcard_file_id"
										 @tap="previewImg3"></image>
									</view>
									
									<input type="text" hidden="true" name="c.back_idcard_file_id" v-bind:value="back_idcard_file_id">
								</view>
							</view>
						</view>
					</view>
					<view class="ot-sub-btn">
						<button formType="submit" type="primary" >立即提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				back_idcard_file_id: '',
				front_idcard_file_id: '',
				business_license_file_id: '',
				id:0,
			}
		},
		onLoad(option) {
			_self =this
			_self.id =option.id
			uni.request({
				url:this.$webUrl+"/sale/findCustomer",
				data:{id:_self.id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					console.log(res.data)
					_self.business_license_file_id=res.data.business_license_file_id
					_self.front_idcard_file_id = res.data.front_idcard_file_id
					_self.back_idcard_file_id = res.data.back_idcard_file_id
				}
			})
		},
		methods: {
			formSubmit2: function(e) {
				var formData = e.detail.value;
				uni.request({
					url: _self.$webUrl + "/sale/updateCustomer",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.info = res.data
						if (res.statusCode == 200) {
							uni.showToast({
								title: '提	交成功'
							})
						} else {
							uni.showToast({
								title: '提交失败',
								icon: 'none'
							})
						}
					},

					complete() {
						uni.hideLoading()
					}
				});
			},
			formSubmit3: function(e) {
				var formData = e.detail.value;
				uni.showLoading({
					title: '提交中'
				})
				uni.request({
					url: _self.$webUrl + "/sale/updateCustomer",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.info = res.data
						if (res.statusCode == 200) {
							uni.showToast({
								title: '提交成功'
							})
						} else {
							uni.showToast({
								title: '提交失败',
								icon: 'none'
							})
						}
					},

					complete() {
						uni.hideLoading()
					}
				});
			},
			selectImg1: function() {
				var _self = this
				uni.chooseImage({

					success(res) {
						uni.showLoading({
							title: "上传中"
						});
							
				
						// uni.request({
						// 	method:"POST",
						// 	url:_self.$webUrl+"/file/uploadFile",
						// 	data:res.tempFiles[0],
						// 	success(res){

						// 	}
						// })
						const uploadTask = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								_self.business_license_file_id = res.data
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								})
							},
							complete(res) {
								uni.hideLoading()
							}
						});

					}
				})
			},
			selectImg2: function() {
				var _self = this
				uni.chooseImage({
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								_self.front_idcard_file_id = res.data
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								})
							},
							complete(res) {
								wx.hideLoading()
							}
						})

					}
				})
			},
			selectImg3: function() {
				var _self = this
				uni.chooseImage({
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								_self.back_idcard_file_id = res.data
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								})
							},
							complete(res) {
								wx.hideLoading()
							}
						})

					}
				})
			},
			



			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.$webUrl + "/file/getUploadFile?fileName=" + _self.business_license_file_id],
					current: 0
				});
			},
			previewImg2: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.$webUrl + "/file/getUploadFile?fileName=" + _self.front_idcard_file_id],
					current: 0
				});
			},
			previewImg3: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.$webUrl + "/file/getUploadFile?fileName=" + _self.back_idcard_file_id],
					current: 0
				});
			},
		}
	}
</script>

<style>
	page{
		background-color: #eee;
	}
	.ot-Dtailes-host {
		background-color: #fff;
		padding: 20upx 0upx;
		border-radius: 10upx;
		margin-bottom: 40upx;
		box-sizing: border-box;
	}

	.ot-pay-bto {
		background-color: #5ca7e2 !important;
		padding: 0px 10upx !important;
	}

	.grace-idcard-preview view:nth-of-type(1) image {
		width: 100%;
		display: block;
		height: 170upx;
	}

	.grace-idcard-preview view:nth-of-type(1) {
		display: flex;
		flex-direction: column;
	}

	.grace-idcard-preview view:nth-of-type(1) {
		display: flex;
		flex-direction: column;
		width: 200upx;
	}

	.ot-photo-left {
		display: flex;
		align-items: center;
	}

	.hl {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
		width: 50%;
		padding: 0px 0upx !important;
		box-sizing: border-box;
		border-radius: 10upx;
	}

	.hl:nth-of-type(1) {
		border-right: 1px dashed #ccc;
	}
	.hl:last-of-type {
		border-right: 1px dashed #ccc;
	}

	.ot-padding {
		padding: 25upx;
		width: 100%;
		box-sizing: border-box;
	}

	.ot-sub-btn {
		padding: 22upx 60upx;
		padding-bottom: 10upx;
	}
	
	.ot-sub-btn button{
		line-height: 75upx;
		background-color: #ff5722 !important;
		border-radius: 10upx !important;
	}
	.ot-btn button{
		height: 50upx;
		line-height: 50upx;
	}
</style>
