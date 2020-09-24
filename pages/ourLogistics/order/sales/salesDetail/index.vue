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
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">{{sal.order_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">{{sal.area}},{{sal.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">{{sal.tax}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale">{{sal.price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7  grace-no-scale">{{r!=null?r.related_num*sal.price:sal.num*sal.price}}={{sal.price}} *{{r!=null?r.related_num:sal.num}}</view>
				</view>
			</view>
		</view>
		
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">其它信息</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">{{sal.customer_name}},</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货情况:</view>
					<view class="demo7  grace-no-scale"> {{r!=null?r.related_num:(sal.num-sal.remainder_num)}}/{{r!=null?r.related_num:sal.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">付款方式:</view>
					<view class="demo7  grace-no-scale">{{sal.trade_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">{{l!=null?l.transport_type:sal.transport_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">收货地址:</view>
					<view class="demo7  grace-no-scale">{{sal.transport_address}}</view>
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
				info:[],
				l:[],
				r:[],
				sal:[],
				sup:[],
				rid:'',
				t:''
			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			_self.rid = id
			var t = option.t
			_self.t = t
			uni.request({
				url:this.$webUrl+"/logistics/saleDetail",
				data:{id:id,t:t},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.info=res.data
					_self.l=res.data.l
					_self.r=res.data.r
					_self.sal=res.data.sal
					_self.sup=res.data.sup
				}
			})
		},
		methods:{
			handleClick(){
				uni.navigateTo({
					url: '../salesLogistics/index?id='+_self.rid+"&t="+_self.t,
				});
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";
</style>
