<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
					<view class="ot-daile-mast">已完成</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">XS_1567147511768</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">小米</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">大庆,6097</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">不含</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale"> 7000.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7  grace-no-scale">70000.00=7000.00 *10.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货情况:</view>
					<view class="demo7  grace-no-scale">0.00/10.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">付款方式:</view>
					<view class="demo7  grace-no-scale">款到发货</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">自提</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">收货地址:</view>
					<view class="demo7  grace-no-scale">江西南昌</view>
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
					url: '../moneyContract/index',
				})
			},
		}
	}
</script>

<style>
   @import "../../../../../common/css/orderDetail.css";
   .ot-daile-mast{
	   width: 100upx;
   }
</style>
