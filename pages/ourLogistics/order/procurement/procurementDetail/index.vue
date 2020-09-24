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
						<view class="ot-daile-mast">{{order.state}}</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">{{order.order_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">供应商:</view>
					<view class="demo7  grace-no-scale">{{order.supplier_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">{{order.area}},{{order.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">{{order.tax}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale">{{order.price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7  grace-no-scale"> {{order.total_price}}={{order.price}}*{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">库存:</view>
					<view class="demo7  grace-no-scale">{{order.remainder_num}}/{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">付款方式:</view>
					<view class="demo7  grace-no-scale">{{order.trade_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">{{order.transport_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">仓库:</view>
					<view class="demo7  grace-no-scale">{{order.supplier_store_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">仓库地址:</view>
					<view class="demo7  grace-no-scale">{{order.supplier_store_address}}</view>
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
	var _self
	export default {
		data() {
			return {
				order:[],
				id:''
			}
		},
		onLoad(option){
			_self = this
			_self.id = option.id
			uni.request({
				url:this.$webUrl+"/logistics/supplierOrderDetail",
				data:{id:_self.id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.order = res.data
				}
			})
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../procurementInvoice/index?id='+_self.id,
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";
</style>
