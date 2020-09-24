<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
					<view class="ot-daile-ft">
						<view class="ot-daile-yt" @tap="handleTg">通过审核</view>
						<view class="ot-daile-ask" @tap="handleJu">拒绝审核</view>
						<view class="ot-daile-mast">已完成</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">CG_156592504</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">厦门市即刻塑料有限公司,15686654235</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">福联,7042</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">含税</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">6.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale"> 8500.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7  grace-no-scale">51000.00=8500.00 *6.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货情况:</view>
					<view class="demo7  grace-no-scale">6.00/6.00</view>
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
					<view class="demo6">收货地址:</view>
					<view class="demo7  grace-no-scale">福建省泉州市晋江市磁灶镇坝头村坝头工业区5号</view>
				</view>
			</view>
		</view>
		<view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一步
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
					url: '../salesContract/index',
				})
			},
			handleTg() {
				console.log('fff')
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否通过审核',
					success: function(sm) {
						if (sm.confirm) {} else if (sm.cancel) {}
					}
				})
			},
			handleJu() {
				console.log('fff')
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否拒绝审核',
					success: function(sm) {
						if (sm.confirm) {} else if (sm.cancel) {}
					}
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";
</style>
