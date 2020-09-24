<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">出款金额:</view>
					<view class="demo7  grace-no-scale">680000.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">出款日期:</view>
					<view class="demo7  grace-no-scale">2019-08-17</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7  grace-no-scale">已到账</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button ot-pay-btn" size="mini" @tap="previewImg1">预览</button>
						<button type="primary" class="grace-button ot-pay-bth" size="mini"  @tap="handleDel">删除</button>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idCard1: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2997502425,1125939591&fm=26&gp=0.jpg',
			}
		},
		methods: {
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0 
				});
			},
			handleClick() {
				uni.navigateTo({
					url: '../salesLogistics/index',
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderPay.css";
</style>
