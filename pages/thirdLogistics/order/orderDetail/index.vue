<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
					<view class="ot-daile-mast">{{order.state}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流单号:</view>
					<view class="demo7">
						<text>{{order.order_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">发布日期:</view>
					<view class="demo7  grace-no-scale">{{order.release_date}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">{{order.order_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">采购单号:</view>
					<view class="demo7  grace-no-scale">{{order.sup_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">品名/型号:</view>
					<view class="demo7 ">{{order.category}}/{{order.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">装货日期:</view>
					<view class="demo7  grace-no-scale"></view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">装货地址:</view>
					<view class="demo7 ">{{order.supplier_store_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7">
						<text>10</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">运费:</view>
					<view class="demo7  grace-no-scale">{{order.freight}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">附加费:</view>
					<view class="demo7  grace-no-scale">{{order.additional}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售单号:</view>
					<view class="demo7  grace-no-scale">
						<text> {{order.sal_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">卸货地址:</view>
					<view class="demo7  grace-no-scale">{{order.transport_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">{{order.customer_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客服:</view>
					<view class="demo7  grace-no-scale">{{order.salesman_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系电话:</view>
					<view class="demo7  grace-no-scale">{{order.customer_mobile}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default{
		data(){
			return{
				order:{}
			}
		},
		onLoad(option){
			_self=this
			var id=option.id
			uni.request({
				url:this.$webUrl+"/logistics/order/orderDetail",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					console.log(res.data)
					_self.order=res.data
				}
			})
		},
	}
</script>

<style>
	@import "../../../../common/css/orderDetail.css";
	.grace-no-scale text{
	  color: #FF4F4F;
	}
</style>
