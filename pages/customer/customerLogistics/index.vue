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
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button btn" size="mini" @tap="handleChange">定位</button>
						<button type="primary" class="grace-button btn" size="mini" @tap="handleChangegj">轨迹</button>
						<button type="primary" class="grace-button btn" size="mini" @tap="handleChangesh">实时监控</button>
					</view>
				</view>

			</view>
		</view>
		<!-- <view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一页
			</button>
		</view> -->
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
					url: '../customerPositioning/index',
				})
			},
			handleChangegj() {
				uni.navigateTo({
					url: '../customerTrajectory/index',
				})
			},
			handleChangesh() {
				uni.navigateTo({
					url: '../customerMonitoring/index',
				})
			},
			handleClick() {
				uni.navigateTo({
					url: '../customerInvoice/index',
				});
			}
		}
	}
</script>

<style>
	@import "../../../common/css/logistics.css";
</style>
