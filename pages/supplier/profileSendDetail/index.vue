<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
					<view class="ot-daile-mast">未收货</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">CG_156592504</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系电话:</view>
					<view class="demo7  grace-no-scale">13605927777</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">3,3</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货数量(吨):</view>
					<view class="demo7  grace-no-scale">0.01</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">付款方式:</view>
					<view class="demo7  grace-no-scale">货到付款</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">自提</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">提货仓库地址:</view>
					<view class="demo7  grace-no-scale">佛山乐从万顺仓库，佛山乐从万顺仓库</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客服:</view>
					<view class="demo7  grace-no-scale">老张</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系电话:</view>
					<view class="demo7  grace-no-scale">13605926666</view>
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

			}
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../profileSendLogistics/index',
				})
			},
		}
	}
</script>

<style>
	@import "../../../common/css/orderDetail.css"
</style>
