<template>
	<view class="">
		<view class="grace-body">
			<view class="ot-home-qx mn">
				<text></text>
				<text>合同信息</text>
			</view>
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">合同编号</view>
					<input type="text" disabled class="input" name="bianhao" value="XJX_20190900007" />
				</view>
				<view class="grace-items">
					<view class="grace-label">合同日期</view>
					<input type="text" disabled class="input" name="riqi" value="2019-09-04" />
				</view>
				<view class="grace-items">
					<view class="grace-label">操作</view>
					<view class="other">
						<button type="primary" class="grace-button" size="mini">下载</button>
						<button type="primary" class="grace-button" size="mini" @tap="handleDel">删除</button>
					</view>
				</view>
				<view class="grace-items">
					<button type="warn" class="grace-button ot-buttons" @tap="handleClick" size="mini">生成合同</button>
				</view>
			</form>
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传合同</text>
			</view>
			<view class="ot-logis-fl">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg1">
						<view class="img">
							<image :src="img+'danju.png'" />
						</view>
						<view class="text">客户上传合同</view>
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
						<view class="text">我方上传合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display1">
						<image :src="idCard2" @tap="previewImg2"></image>
						<view class="ot-tem-del" @tap.stop="deleteImage(1)">
							<image :src="img+'del11.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<form @submit="formSubmit">
				<view class="ot-home-qx mn">
					<text></text>
					<text>发票信息</text>
				</view>
				<view class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">发票信息</view>
						<input type="text" class="input" name="fapiao" value="1111111" placeholder="请输入运费" />
					</view>
				</view>
				<view style="margin-top:30upx;" class="ot-contract-btn">
					<button type="primary" formType="submit" class="grace-button grace-border-radius" >提交</button>
					<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">下一步</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import common from "../../../../../common/common.js"
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				idCard1: '',
				display: false,
				idCard2: '',
				display1: false,
			}
		},
		created() {
			_self = this
		},
		methods: {
			handleDel(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除订单',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认删除!",
								icon: "none"
							});
						} else if (sm.cancel) {}
					}
				})
			},
			bindCompanyChange: function(e) {
				//console.log(e);
				this.companyIndex = e.detail.value
			},
			bindCarChange: function(e) {
				//console.log(e);
				this.carIndex = e.detail.value
			},
			bindDriverChange: function(e) {
				//console.log(e);
				this.driverIndex = e.detail.value
			},

			handleClick() {

			},
			formSubmit(e){
				uni.showToast({
					title:'发票信息提交成功',
					 icon:"none"
				})
				var formData = e.detail.value;
				//console.log(JSON.stringify(e.detail.value));
			},
			selectImg1: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard1 = res.tempFilePaths[0]
						// 因底层限制一次上传一个
						uni.showLoading({
							title: "上传中"
						});
						var uploadTask1 = uni.uploadFile({
							url: '',
							filePath: _self.idCard1,
							fileType: 'image',
							name: 'data',
							success: function(uploadFileRes) {
								// 上传成功后返回服务器端保存的路径
								_self.display = true
								//console.log(uploadFileRes.data);
								uni.hideLoading();
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
								//console.log(uploadFileRes.data);
								uni.hideLoading();
								_self.display1 = true
							}
						});
					}
				})
			},
			previewImg1: function() {
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0
				});
			},
			previewImg2: function() {
				uni.previewImage({
					urls: [_self.idCard2],
					current: 0
				});
			},
			handleChange() {
				uni.navigateTo({
					url: '../moneyPay/index',
				})
			},
			deleteImage(o) {
				var that = this;
				switch (o) {
					case 0:
						var idCard1 = that.idCard1;
						uni.showModal({
							title: '系统提醒',
							content: '确定要删除此图片吗？',
							success: function(res) {
								if (res.confirm) {
									idCard1 = '';
									//console.log('删除成功')
									that.display = false
								} else if (res.cancel) {
									return false;
								}
								that.idCard1 = idCard1
							}
						})
						break;
					case 1:
						var idCard2 = that.idCard2;
						uni.showModal({
							title: '系统提醒',
							content: '确定要删除此图片吗？',
							success: function(res) {
								if (res.confirm) {
									idCard2 = '';
									//console.log('删除成功')
									that.display1 = false
								} else if (res.cancel) {
									return false;
								}
								that.idCard2 = idCard2
							}
						})
						break;
				}
			}

		}
	}
</script>

<style>
	@import "../../../../../common/css/contract.css";

	.grace-idcard-uper-btn {
		position: relative;
	}

	.grace-items .other button:nth-of-type(1) {
		boder: 1px solid #ccc;
		background-color: transparent !important;
		color: #666;
	}

	.ot-button-fixed {
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		height: 100rpx;
		background-color: #fff;
		box-shadow: 2upx 2upx 12upx #ccc;
		display: flex;
		justify-content: space-between;
		margin: 0px;
	}

	.ot-button-fixed button {
		width: 30%;
		height: 65upx;
		line-height: 65upx;
		font-size: 32upx;
		margin: 0px;
	}

	.ot-button-fixed button:nth-of-type(2) {
		border: 2upx solid #ff5722;
		background-color: transparent !important;
		color: #ff5722;
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
	.ot-contract-btn{
		display: flex;
		justify-content: space-between;
		background-color: #fff;
	}
	.ot-contract-btn button{
		width: 25%;
		height: 64upx;
		line-height: 64upx;
		margin: 0px;
	}
	.ot-contract-btn button:nth-of-type(2){
		border:2upx solid #ff5722;
		background-color: transparent !important;
		color: #ff5722;
	}
	.ot-buttons{
		padding: 0px 20upx;
	}
</style>
