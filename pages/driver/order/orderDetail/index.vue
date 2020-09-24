<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
						<view class="ot-daile-ft">
							<view class="ot-daile-mast">{{order.state}}</view>
						</view>
					</view>
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
					<view class="demo6">装货地址:</view>
					<view class="demo7  grace-no-scale">{{order.from_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">品名:</view>
					<view class="demo7  grace-no-scale"> {{order.category}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产地/型号:</view>
					<view class="demo7  grace-no-scale">{{order.area}}/{{order.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">{{order.num}}</view>
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
					<view class="demo6">送货地址:</view>
					<view class="demo7  grace-no-scale">{{order.to_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">车辆要求:</view>
					<view class="demo7  grace-no-scale">{{order.mark}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">卸货地址:</view>
					<view class="demo7  grace-no-scale">{{order.to_area}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流客服/电话:</view>
					<view class="demo7  grace-no-scale">施玉婷/580117</view>
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
				order:[]
			}
		},
		onLoad(option){
			_self =this
			var id=option.id
			uni.request({
				url:this.$webUrl+"/driver/orderDetail",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.order=res.data
				}
			})
		},
		methods: {
		}
	}
</script>

<style>
	@import "../../../../common/css/orderDetail.css";

	.ot-daile-mast {
		width: 100upx !important;
	}
</style>
