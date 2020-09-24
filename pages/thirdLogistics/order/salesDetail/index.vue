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
						<text>{{order.sup_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7">
						<view class="ot-daile-mast">{{order.sup_state}}</view>
					</view>
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
					<view class="demo6">配货数量:</view>
					<view class="demo7  grace-no-scale">{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">提货地址:</view>
					<view class="demo7  grace-no-scale"> {{order.from_area}} {{order.supplier_store_adderss}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">{{order.transport_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售单号:</view>
					<view class="demo7">
						<text>{{order.sal_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7">
						<view class="ot-daile-mast">{{order.sal_state}}</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售日期:</view>
					<view class="demo7  grace-no-scale">{{order.sale_time}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客服:</view>
					<view class="demo7  grace-no-scale">{{order.salesman_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户名称:</view>
					<view class="demo7  grace-no-scale">{{order.customer_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系方式:</view>
					<view class="demo7  grace-no-scale">{{order.customer_tel}}</view>
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
	var _self
	export default{
		data(){
			return{
				order:{},
				id:''
			}
		},
		onLoad(option){
			_self=this
			var id=option.id
			_self.id=id
			uni.request({
				url:this.$webUrl+"/logistics/order/orderDetail",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.order=res.data
				}
			})
		},
		methods:{
			handleClick(){
				uni.navigateTo({
					url: '../salesLogisticsDetail/index?id='+_self.id,
				});
			}
		}
	}
</script>

<style>
	@import "../../../../common/css/orderDetail.css";
	.ot-daile-mast{
		width: 100upx !important;
	}
</style>
