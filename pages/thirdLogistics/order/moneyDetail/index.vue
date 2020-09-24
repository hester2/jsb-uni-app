<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">采购单号:</view>
					<view class="demo7">
						<text>CG_1565925044971</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7">
						<view class="ot-daile-mast">已到账</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">供应商:</view>
					<view class="demo7  grace-no-scale">中化石化销售有限公司</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">福联,7042</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货数量:</view>
					<view class="demo7  grace-no-scale">1.20</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">提货地址:</view>
					<view class="demo7  grace-no-scale"> 福建省,厦门市,思明区 中石油龙江易发贸易仓</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">自提</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售单号:</view>
					<view class="demo7">
						<text>XJX_20190910001</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7">
						<view class="ot-daile-mast">已下单</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售日期:</view>
					<view class="demo7  grace-no-scale">老张</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系方式:</view>
					<view class="demo7  grace-no-scale">2019-09-17</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户名称:</view>
					<view class="demo7  grace-no-scale">厦门市华克塑料有限公司</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系方式:</view>
					<view class="demo7  grace-no-scale">17459885252</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">送货地址:</view>
					<view class="demo7  grace-no-scale">思明路径到</view>
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
					url: '../salesLogisticsDtaile/index',
				});
			}
		}
	}
</script>

<style>
	@import "../../../../common/css/orderDetail.css";

	.ot-daile-mast {
		width: 100upx !important;
	}
</style>
