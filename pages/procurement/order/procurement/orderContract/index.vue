<template>
	<view class="grace-body">
		<view class="ot-home-qx mn">
			<text></text>
			<text>合同信息</text>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">合同编号</view>
				<input type="text" class="input" name="bianhao" value="XJX_20190900007" placeholder="请输入运费" />
			</view>
			<view class="grace-items">
				<view class="grace-label">合同日期</view>
				<input type="text" class="input" name="riqi" value="2019-09-04" placeholder="请输入附加费" />
			</view>

		</form>
		<view class="ot-home-qx mn">
			<text></text>
			<text>上传合同</text>
		</view>
		<view class="ot-logis-fl">
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn">
					<view class="img">
						<image :src="img+'zanwu1.png'" />
					</view>
					<view class="text">客户上传的合同</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard1" @tap="previewImg1"></image>
				</view>
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn">
					<view class="img">
						<image :src="img+'zanwu1.png'" />
					</view>
					<view class="text">我方上传的合同</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard2" @tap="previewImg2"></image>
				</view>
			</view>
		</view>
		<view style="margin-top:50upx;">
			<button type="primary" class="grace-button grace-border-radius" @tap="hanleClick">下一步</button>
		</view>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				idCard1: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786741331,312930537&fm=26&gp=0.jpg',
				idCard2: '',
			}
		},
		created() {
			_self=this
		},
		methods: {
			hanleClick(){
				uni.navigateTo({
					url: '../orderPay/index',
				});
			},
			handleDel(e) {
				var index = e.currentTarget.dataset.id;
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
			selectImg1: function() {
				wx.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard1= res.tempFilePaths[0]
					}
				})
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
						console.log(uploadFileRes.data);
						uni.hideLoading();
					}
				});
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
					url: '../salesInvoice/index',
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/contract.css";

	.grace-items .other button:nth-of-type(1) {
		boder: 1px solid #ccc;
		background-color: transparent !important;
		color: #666;
	}
</style>
