<template>
	<view class="grace-body">
		<view class="ot-home-qx mn">
			<text></text>
			<text>合同信息</text>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">合同编号</view>
				<input type="text" disabled class="input" name="bianhao" value="" />
			</view>
			<view class="grace-items">
				<view class="grace-label">上传日期</view>
				<input type="text" disabled class="input" name="hdDate" value="" />
			</view>
			<view class="grace-items">
				<view class="grace-label">操作</view>
				<view class="other">
					<button type="primary" class="grace-button"  size="mini" @tap="handleDel">删除</button>
				</view>
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
					<view class="text">合同1</view>
				</view>
				<view class="grace-idcard-preview" v-if="display">
					<image :src="idCard1" @tap="previewImg1"></image>
				</view>
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn">
					<view class="img">
						<image :src="img+'fahuodan.png'" />
					</view>
					<view class="text">合同2</view>
				</view>
				<view class="grace-idcard-preview" v-if="display1">
					<image :src="idCard2" @tap="previewImg2"></image>
				</view>
			</view>
		</view>
		<view style="margin-top:50upx;" class="ot-button">
			<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">下一步</button>
		</view>
	</view>

</template>

<script>
	var  graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	import common from '../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				idCard1: '',
				display: false,
				idCard2: '',
				display1: true,
			}
		},
		created() {
			_self = this;
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
			selectImg1: function() {
				// 如果能上传图片了 这个display打开就应该在上传成功后打开，否则就显示不了
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
	@import "../../../common/css/contract.css";
	.ot-button button{
		height: 74upx !important;
		line-height: 74upx !important;
	}
</style>
