<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">型号:</view>
					<view class="demo7  grace-no-scale">香港，N1841H</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">100.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流公司:</view>
					<view class="demo7  grace-no-scale">恒辉物流</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机:</view>
					<view class="demo7  grace-no-scale">李海平</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">车牌号:</view>
					<view class="demo7  grace-no-scale">民C55927</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机手机:</view>
					<view class="demo7  grace-no-scale">13178259977</view>
				</view>
				<view class="grace-space">
					<button type="primary" class="grace-button btn" size="mini" bindtap="handleChange">定位</button>
					<button type="primary" class="grace-button btn" size="mini" bindtap="handleChangegj">轨迹</button>
					<button type="primary" class="grace-button btn" size="mini" bindtap="handleChangesh">实时监控</button>
				</view>
				<view></view>
			</view>
		</view>
		<view class="ot-button">
			<button type="warn" bindtap="handleClick" class="grace-button">
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
			handleChange() {
				uni.navigateTo({
					url: '../salesPositioning/index',
				})
			},
			handleChangegj() {
				uni.navigateTo({
					url: '../salesTrajectory/index',
				})
			},
			handleChangesh() {
				uni.navigateTo({
					url: '../salesMonitoring/index',
				})
			},
			handleClick() {
				uni.navigateTo({
					url: '../salesInvoice/index',
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/logistics.css";
</style>
