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
					<input type="text" name="sid" :value="order.sale_order_id" v-show="false">
					<input type="text" name="logisticsOrderId" :value="order.id" v-show="false">
					<input type="text" name="type" :value="order.order_type" v-show="false">
					<input type="text" name="o.id" :value="order.related_order_id" v-show="false">
					<input type="text" class="input" name="o.freight" placeholder="请输入运费" :value="order.freight==null?'':order.freight" />
				</view>
				<view class="grace-items">
					<view class="grace-label">附加费(元/吨)</view>
					<input type="text" class="input" name="o.surcharge" placeholder="请输入附加费" :value="order.additional==null?'':order.additional" />
				</view>
				<view class="grace-items">
					<view class="grace-label">物流公司</view>
					<view class="other">
						<picker @change="bindCompanyChange" :value="companyIndex" :range="company" :range-key="'name'" name="gongsi">
							<text>{{company[companyIndex].name}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">选择车辆</view>
					<view class="other">
						<picker @change="bindCarChange" :value="carIndex" :range="car" :range-key="'plate_no'" name="car">
							<text>{{car[carIndex].plate_no}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">选择司机</view>
					<view class="other">
						<picker @change="bindDriverChange" :value="driverIndex" :range="driver" :range-key="'name'" name="siji">
							<text>{{driver[driverIndex].name}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">物流单号</view>
					<input type="text" class="input" name="o.logisticsFileNum" placeholder="请输入物流单号" :value="order.logistics_file_num==null?'':order.logistics_file_num" />
				</view>
				<view class="grace-items">
					<view class="grace-label">中石油/中石化单号</view>
					<input type="text" class="input" name="o.psNum" placeholder="请输入中石油/中石化单号" :value="order.ps_num==null?'':order.ps_num" />
				</view>
				<view class="grace-items">
					<button type="warn" formType="submit" class="grace-button ot-buttons" @tap="handleClick" size="mini">发货</button>
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
						<view class="ot-tem-del" @tap.stop="deleteImage(0)">
							<image :src="img+'del11.png'"></image>
						</view>
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
						<view class="ot-tem-del" @tap.stop="deleteImage(1)">
							<image :src="img+'del11.png'"></image>
						</view>
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
						<view class="ot-tem-del" @tap.stop="deleteImage(2)">
							<image :src="img+'del11.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="ot-button">
				<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	import common from "../../../../../common/common.js"
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				companyIndex: 0,
				company: [{
					name: '请选择'
				}],
				carIndex: 0,
				car: [{
					plate_no: '请选择'
				}],
				driverIndex: 0,
				driver: [{
					name: '请选择'
				}],
				idCard1: '',
				display: false,
				idCard2: '',
				display1: false,
				idCard3: '',
				display2: false,
				tmpCar: [{
					plate_no: '请选择'
				}],
				tmpDriver: [{
					name: '请选择'
				}],
				order: {}
			}
		},
		onLoad(option) {
			var id = option.id
			uni.request({
				url: this.$webUrl + "/logistics/order/logisticsList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.company = _self.company.concat(res.data)
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/order/orderDetail",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					if (res.data.invoice_file_id != null) {
						_self.display = true
					}
					if (res.data.deposit_file_id != null) {
						_self.display1 = true
					}
					if (res.data.sign_file_id != null) {
						_self.display2 = true
					}
					_self.order = res.data
					_self.idCard1 = _self.$webUrl + "/file/getUploadFile?fileName=" + res.data.invoice_file_id
					_self.idCard2 = _self.$webUrl + "/file/getUploadFile?fileName=" + res.data.deposit_file_id
					_self.idCard3 = _self.$webUrl + "/file/getUploadFile?fileName=" + res.data.sign_file_id
				}
			})
		},
		created() {
			_self = this
		},
		methods: {
			bindCompanyChange: function(e) {
				var index = e.detail.value
				_self.companyIndex = index
				console.log(_self.companyIndex)
				uni.request({
					url: this.$webUrl + "/logistics/order/driverList",
					data: {
						id: _self.company[_self.companyIndex].id
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.driver = _self.tmpDriver.concat(res.data)
					}
				})
				uni.request({
					url: this.$webUrl + "/logistics/order/carList",
					data: {
						id: _self.company[_self.companyIndex].id
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.car = _self.tmpCar.concat(res.data)
					}
				})

			},
			bindCarChange: function(e) {
				_self.carIndex = e.detail.value
			},
			bindDriverChange: function(e) {
				_self.driverIndex = e.detail.value
			},
			deleteImage(o) {
				switch (o) {
					case 0:
						uni.showModal({
							title: '系统提醒',
							content: '确定要删除此图片吗？',
							success: function(res) {
								if (res.confirm) {
									_self.idCard1 = '';
									_self.display = false
								} else if (res.cancel) {
									return false;
								}
							}
						})
						break;
					case 1:
						uni.showModal({
							title: '系统提醒',
							content: '确定要删除此图片吗?',
							success(res) {
								if (res.confirm) {
									_self.idCard2 = '';
									_self.display1 = false
								} else if (res.cancel) {
									return false;
								}
							}
						})
						break;
					case 2:
						uni.showModal({
							title: '系统提醒',
							content: '确定要删除此图片？',
							success(res) {
								if (res.confirm) {
									_self.idCard3 = '';
									_self.display2 = false
								} else if (res.cancel) {
									return false;
								}
							}
						})
						break;
				}
			},
			formSubmit: function(e) {
				var rule = [];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				formData["o.logisticsId"] = _self.company[_self.companyIndex].id
				formData["o.driverId"] = _self.driver[_self.driverIndex].id
				formData["o.plate_no"] = _self.car[_self.carIndex].plate_no
				if (_self.companyIndex == 0) {
					formData["o.logisticsId"] = ""
				}
				if (_self.driverIndex == 0) {
					formData["o.driverId"] = ""
				}
				if (_self.carIndex == 0) {
					formData["o.plate_no"] = ""
				}
				if (checkRes) {
					uni.request({
						url: this.$webUrl + '/logistics/order/doDelivery',
						data: formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if (res.statusCode == 200) {
								if (res.data) {
									uni.showToast({
										title: '发货成功'
									})
								}
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
			handleClick() {

			},
			selectImg1: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
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
								uni.request({
									url: _self.$webUrl + "/logistics/order/uploadFile",
									data: {
										"o.id": _self.order.related_order_id,
										type: _self.order.order_type,
										"o.invoice_file_id": uploadFileRes.data
									},
									header: {
										'Access-Token': uni.getStorageSync("token")
									},
									success(res) {
										_self.display = true
										if (res.statusCode == 200) {
											if (res.data) {
												uni.showToast({
													title: '上传成功'
												})
											}
										}
									},
									complete() {
										uni.hideLoading()
									}
								})
							}
						});
					}
				})
			},
			selectImg2: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard2 = res.tempFilePaths[0]
						uni.showLoading({
							title: "上传中"
						});

						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 8
							},
							success: function(uploadFileRes) {
								uni.request({
									url: _self.$webUrl + "/logistics/order/uploadFile",
									data: {
										"o.id": _self.order.related_order_id,
										type: _self.order.order_type,
										"o.deposit_file_id": uploadFileRes.data
									},
									header: {
										'Access-Token': uni.getStorageSync("token")
									},
									success(res) {
										_self.display1 = true
										if (res.statusCode == 200) {
											if (res.data) {
												uni.showToast({
													title: '上传成功'
												})

											}
										}
									},
									complete() {
										uni.hideLoading()
									}
								})
							}
						});
					}
				})

			},
			selectImg3: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
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
								uni.request({
									url: _self.$webUrl + "/logistics/order/uploadSign",
									data: {
										"o.id": _self.order.sale_order_id,
										type: _self.order.order_type,
										"o.sign_file_id": uploadFileRes.data
									},
									header: {
										'Access-Token': uni.getStorageSync("token")
									},
									success(res) {
										_self.display2 = true
										if (res.statusCode == 200) {
											if (res.data) {
												uni.showToast({
													title: '上传成功'
												})

											}
										}
									},
									complete() {
										uni.hideLoading()
									}
								})
							}
						});
					}
				})

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
					url: '../salesLogistics/index?id=' + _self.order.id,
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

	button {
		background-color: #ff5722 !important;
	}

	.ot-buttons {
		margin: 10upx 0px;
		height: 60upx;
		line-height: 60upx;
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

	.grace-form .grace-items {
		border: none;
	}

	.ot-tem-del {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 50rpx;
		height: 50rpx;
		bottom: 0px;
		right: 0rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ot-tem-del image {
		width: 35rpx !important;
		height: 35rpx !important;
	}
	.ot-button button{
		height: 74upx !important;
		line-height: 74upx !important;
	}
</style>
