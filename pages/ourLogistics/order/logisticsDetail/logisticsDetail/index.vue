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
						<view class="ot-daile-mast">{{o.state}}</view>
					</view>
					
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流单号:</view>
					<view class="demo7  grace-no-scale ot-color">{{o.order_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7">
						<text>{{o.sale_transport_type}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">采购单号:</view>
					<view class="demo7  grace-no-scale ot-color">{{o.supplier_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">品名:</view>
					<view class="demo7">
						<text>{{o.category}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产地型号:</view>
					<view class="demo7  grace-no-scale">{{o.area}},{{o.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">装货日期:</view>
					<view class="demo7  grace-no-scale">{{o.create_time.substring(0,10)}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">装货地址:</view>
					<view class="demo7 ">{{o.supplier_store_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">{{o.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">{{o.transport_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">销售单号:</view>
					<view class="demo7  grace-no-scale ot-color">
						<text> {{o.sale_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">卸货地址:</view>
					<view class="demo7  grace-no-scale"> {{o.transport_address}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客服:</view>
					<view class="demo7  grace-no-scale"> {{o.salesman_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系电话:</view>
					<view class="demo7  grace-no-scale"> {{o.salesman_tel}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">发布日期:</view>
					<view class="demo7  grace-no-scale">{{o.sale_time.substring(0,10)}} </view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">运费:</view>
					<view class="demo7  grace-no-scale"> {{o.freight}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">附加费:</view>
					<view class="demo7  grace-no-scale"> {{o.additional}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">车辆要求:</view>
					<view class="demo7  grace-no-scale"> </view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">{{o.order_type}} </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default{
		data(){
			return{
				id:0,
				o:[]
			}
		},
		onLoad(option) {
			_self=this
			_self.id=option.id
			_self.o=JSON.parse(option.detail)
			console.log(_self.o)
		},
		methods:{
			
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";
	.ot-color{
		color: #FF3535 !important;
	}
</style>
