<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">型号:</view>
					<view class="demo7  grace-no-scale">{{order.area}}，{{order.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流公司:</view>
					<view class="demo7  grace-no-scale">{{order.logistics_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机:</view>
					<view class="demo7  grace-no-scale">{{order.driver_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">车牌号:</view>
					<view class="demo7  grace-no-scale">{{order.plate_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机手机:</view>
					<view class="demo7  grace-no-scale">{{order.driver_tel}}</view>
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
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				order: {},

			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			uni.request({
				url: this.$webUrl + "/logistics/order/orderDetail",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.order = res.data
				}
			})
		}
	}
</script>

<style>
	@import "../../../../../common/css/logistics.css";
</style>
