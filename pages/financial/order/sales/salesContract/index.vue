<template>
	<view class="">
		<view class="grace-body">
			<view class="ot-home-qx mn">
				<text></text>
				<text>合同信息</text>
			</view>
			<form bindsubmit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">合同编号</view>
					<input type="text" class="input" name="bianhao" value="XJX_20190900007" placeholder="请输入运费" />
				</view>
				<view class="grace-items">
					<view class="grace-label">合同日期</view>
					<input type="text" class="input" name="riqi" value="2019-09-04" placeholder="请输入附加费" />
				</view>
				<view class="grace-items">
					<view class="grace-label">操作</view>
					<view class="other">
						<button type="primary" class="grace-button" size="mini">下载</button>

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
							<image :src="img+'zanwu1.png'" />
						</view>
						<view class="text">供应商上传的合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display">
						<image :src="idCard1" @tap="previewImg1"></image>
					</view>
				</view>
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg2">
						<view class="img">
							<image :src="img+'zanwu1.png'" />
						</view>
						<view class="text">采购上传的合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display1">
						<image :src="idCard2" @tap="previewImg2"></image>
					</view>
				</view>
			</view>
			<view class="ot-home-qx mn">
				<text></text>
				<text>发票信息</text>
			</view>
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">发票信息</view>
					<input type="text" class="input" name="fapiao" value="1111111" placeholder="请输入运费" />
				</view>
			</form>
			<view style="margin-top:50rpx;">
				<button type="primary" class="grace-button grace-border-radius" @tap="hanleClick">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import common from "../../../../../common/common.js"
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				idCard1: '',
				display: false,
				idCard2: '',
				display1: false,
				dateValue: '2019-08-21'
			}
		},
		methods: {
			hanleClick() {
				uni.navigateTo({
					url: '../salesPay/index',
				})
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				console.log(JSON.stringify(e.detail.value));
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1]
				});
			},
			previewImg2: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard2]
				});
			},
			bindDateChange: function(e) {
				this.dateValue=e.detail.value
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
