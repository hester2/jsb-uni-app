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
					<view class="demo7  grace-no-scale">
						<text> {{order.sup_order_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7">
						<view class="ot-daile-mast">{{order.state}}</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">采购日期:</view>
					<view class="demo7">
						<text>{{order.supplier_time}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">供应商:</view>
					<view class="demo7  grace-no-scale">{{order.supplier_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">{{order.product}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">采购单价:</view>
					<view class="demo7  grace-no-scale">{{order.supplier_price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货数量:</view>
					<view class="demo7  grace-no-scale">{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">提货地址:</view>
					<view class="demo7 ">{{order.supplier_store_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7">
						<text>{{order.transport_type}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售单号:</view>
					<view class="demo7  grace-no-scale">
						<text>{{order.sal_order_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7">
						<view class="ot-daile-mast">{{order.state}}</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售日期:</view>
					<view class="demo7  grace-no-scale">
						{{order.sale_time}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">{{order.customer_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客服:</view>
					<view class="demo7  grace-no-scale"> {{order.salesman_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机姓名:</view>
					<view class="demo7  grace-no-scale">{{order.driver_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机电话:</view>
					<view class="demo7  grace-no-scale">{{order.driver_tel}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系电话:</view>
					<view class="demo7  grace-no-scale"> {{order.salesman_tel}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">送货地址:</view>
					<view class="demo7  grace-no-scale">{{order.transport_address}}</view>
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
	var _self;
	export default {
		data() {
			return {
				order: [],
				daId: 0
			}
		},
		onLoad(option) {
			this.daId = option.id
			_self = this
			uni.request({
				url: this.$webUrl + "/logistics/orderDtail",
				data: {
					id: this.daId
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var data = res.data
					for(var s in data){
						if(data[s]==null){
							data[s]=''
						}
					}
					
					_self.order = data
					console.log(res.data)
				}
			})
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../salesLogisticsDetail/index?id=' +this.daId,
				});
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";

	.grace-no-scale text {
		color: #FF4F4F;
	}

	.ot-button {
		margin-top: 20upx;
		padding: 10upx 20upx;
		overflow: hidden;
	}
</style>
