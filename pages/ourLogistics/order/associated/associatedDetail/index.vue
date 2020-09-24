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
		      <view class="demo6">采购日期:</view>
		      <view class="demo7  grace-no-scale">{{order.supplier_time}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">供应商:</view>
		      <view class="demo7  grace-no-scale">{{order.supplier_name}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">产地/型号:</view>
		      <view class="demo7  grace-no-scale">{{order.area}}/{{order.code}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">订单类型:</view>
		      <view class="demo7  grace-no-scale">{{order.tax}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">采购单价:</view>
		      <view class="demo7  grace-no-scale">{{order.sup_price}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">总金额:</view>
		      <view class="demo7  grace-no-scale">{{order.sup_price*order.related_num}}={{order.sup_price}} *{{order.related_num}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">采购单号:</view>
		      <view class="demo7  grace-no-scale">{{order.sup_no}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">关联数量:</view>
		      <view class="demo7  grace-no-scale">{{order.related_num}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">销售单号:</view>
		      <view class="demo7  grace-no-scale">{{order.sal_no}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">销售日期:</view>
		      <view class="demo7  grace-no-scale">{{order.sale_time}}</view>
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
		created(){
			_self=this
		},
		onLoad(option){
			var rid =option.rid
			var type=option.type
			uni.request({
				url:this.$webUrl+"/logistics/order/relatedDetail",
				data:{rid:rid,type:type},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.order=res.data
				}
			})
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";
</style>
